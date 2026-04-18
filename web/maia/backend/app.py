"""
OpenMAIA — FastAPI Backend
Serves the React frontend and runs mammography inference.

Run:
    uvicorn app:app --host 0.0.0.0 --port 8000

Project layout:
    openmaia/
    ├── backend/
    │   ├── app.py              ← this file
    │   └── inference.py        ← model loading + inference logic
    ├── frontend/
    │   └── build/              ← React production build (npm run build)
    ├── models/
    │   ├── mass_yolo.onnx
    │   ├── calc_yolo.onnx
    │   ├── mass_patch.onnx
    │   ├── calc_patch.onnx
    │   └── inference_config.json
    └── uploads/                ← temp directory for uploaded images
"""

import os
import uuid
import time
import json
import base64
from pathlib import Path
from io import BytesIO

from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import numpy as np
from PIL import Image

from inference import MammographyInference

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="OpenMAIA",
    description="Open-source Mammography AI Assistant — inference API",
    version="0.1.0",
)

# CORS — allow React dev server (localhost:3000) during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",    # React dev server
        "http://localhost:5173",    # Vite dev server
        "http://localhost:8000",    # same origin
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"
UPLOADS_DIR = BASE_DIR / "uploads"
FRONTEND_DIR = BASE_DIR / "frontend" / "build"

UPLOADS_DIR.mkdir(exist_ok=True)

# ---------------------------------------------------------------------------
# Load models at startup
# ---------------------------------------------------------------------------

engine = None


@app.on_event("startup")
async def load_models():
    """Load ONNX models into memory once at startup."""
    global engine
    print("Loading inference engine...")
    engine = MammographyInference(MODELS_DIR)
    print(f"✓ Inference engine ready")
    print(f"  YOLO models: {engine.yolo_loaded}")
    print(f"  Patch models: {engine.patch_loaded}")


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------

class Detection(BaseModel):
    """A single detected region."""
    x1: float
    y1: float
    x2: float
    y2: float
    confidence: float
    label: str              # 'mass_benign', 'mass_malignant', 'calc_benign', 'calc_malignant'
    source: str             # 'yolo' or 'patch'
    iou: Optional[float] = None


class AnalysisResponse(BaseModel):
    """Full analysis result returned to the frontend."""
    # Image metadata
    image_id: str
    filename: str
    width: int
    height: int

    # Detections from both models
    detections: list[Detection]

    # Classification summary
    classification: str                 # 'benign', 'malignant', 'uncertain'
    classification_confidence: float    # 0-1

    # Risk (placeholder — requires EHR fusion model)
    risk_score: Optional[float] = None
    risk_level: Optional[str] = None

    # Heatmap as base64 PNG (from patch classifier probability map)
    heatmap_base64: Optional[str] = None

    # Timing
    inference_time_ms: float
    model_info: dict


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/api/health")
async def health():
    """Health check — also reports which models are loaded."""
    return {
        "status": "ok",
        "models": {
            "yolo_mass": engine.yolo_mass is not None if engine else False,
            "yolo_calc": engine.yolo_calc is not None if engine else False,
            "patch_mass": engine.patch_mass is not None if engine else False,
            "patch_calc": engine.patch_calc is not None if engine else False,
        }
    }


@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze(
    file: UploadFile = File(...),
    confidence_threshold: float = Query(0.5, ge=0.0, le=1.0),
    use_yolo: bool = Query(True),
    use_patch: bool = Query(True),
    # Optional EHR fields for risk calculation
    patient_age: Optional[int] = Query(None),
    breast_density: Optional[str] = Query(None),
    prior_biopsy: Optional[bool] = Query(None),
    family_history: Optional[bool] = Query(None),
):
    """
    Main analysis endpoint.

    Accepts a mammogram image (DICOM, PNG, JPEG) and returns:
    - Bounding box detections from YOLO and/or patch classifier
    - Classification (benign/malignant) with confidence
    - Probability heatmap as base64 PNG
    - Inference timing

    The React frontend calls this with FormData containing the image file
    and optional query parameters for thresholds and EHR data.
    """
    if engine is None:
        raise HTTPException(503, "Models not loaded yet")

    # Validate file type
    allowed_types = {"image/jpeg", "image/png", "image/dicom", "application/dicom",
                     "application/octet-stream"}
    # Be lenient with content type — DICOM files often come as octet-stream
    ext = Path(file.filename).suffix.lower()
    allowed_extensions = {".jpg", ".jpeg", ".png", ".dcm", ".dicom"}
    if ext not in allowed_extensions:
        raise HTTPException(400, f"Unsupported file type: {ext}. Use JPEG, PNG, or DICOM.")

    # Save upload temporarily
    image_id = str(uuid.uuid4())[:8]
    upload_path = UPLOADS_DIR / f"{image_id}{ext}"

    contents = await file.read()
    with open(upload_path, "wb") as f:
        f.write(contents)

    try:
        # Run inference
        t0 = time.time()

        result = engine.run(
            image_path=str(upload_path),
            confidence_threshold=confidence_threshold,
            use_yolo=use_yolo,
            use_patch=use_patch,
            ehr_data={
                "age": patient_age,
                "breast_density": breast_density,
                "prior_biopsy": prior_biopsy,
                "family_history": family_history,
            }
        )

        inference_ms = (time.time() - t0) * 1000

        # Build response
        detections = [
            Detection(
                x1=d["box"][0],
                y1=d["box"][1],
                x2=d["box"][2],
                y2=d["box"][3],
                confidence=d["confidence"],
                label=d["label"],
                source=d["source"],
            )
            for d in result["detections"]
        ]

        # Encode heatmap as base64 PNG
        heatmap_b64 = None
        if result.get("heatmap") is not None:
            heatmap = result["heatmap"]
            # Normalize to 0-255 and create a color-mapped image
            heatmap_norm = (heatmap * 255).astype(np.uint8)
            heatmap_img = Image.fromarray(heatmap_norm, mode="L")
            buffer = BytesIO()
            heatmap_img.save(buffer, format="PNG")
            heatmap_b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

        return AnalysisResponse(
            image_id=image_id,
            filename=file.filename,
            width=result["width"],
            height=result["height"],
            detections=detections,
            classification=result["classification"],
            classification_confidence=result["classification_confidence"],
            risk_score=result.get("risk_score"),
            risk_level=result.get("risk_level"),
            heatmap_base64=heatmap_b64,
            inference_time_ms=round(inference_ms, 1),
            model_info=result["model_info"],
        )

    finally:
        # Clean up uploaded file
        if upload_path.exists():
            upload_path.unlink()


# ---------------------------------------------------------------------------
# Serve React frontend (production build)
# ---------------------------------------------------------------------------

# In production: Flask/FastAPI serves the React build as static files
# In development: React dev server runs separately on port 3000

if FRONTEND_DIR.exists():
    # Serve static assets (JS, CSS, images)
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR / "static"), name="static")

    # Catch-all: serve index.html for any non-API route (React Router support)
    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        """Serve React app for any non-API route."""
        # Don't intercept API routes
        if full_path.startswith("api/"):
            raise HTTPException(404)

        # Try to serve the exact file first (for favicon.ico, manifest.json, etc.)
        file_path = FRONTEND_DIR / full_path
        if file_path.is_file():
            return FileResponse(file_path)

        # Otherwise serve index.html (let React Router handle the route)
        return FileResponse(FRONTEND_DIR / "index.html")
else:
    @app.get("/")
    async def no_frontend():
        return {
            "message": "OpenMAIA API is running. No frontend build found.",
            "hint": "Run 'npm run build' in frontend/ and copy build/ to frontend/build/",
            "docs": "/docs",
        }


# ---------------------------------------------------------------------------
# Run directly
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
