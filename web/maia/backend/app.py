"""
OpenMAIA — FastAPI Backend
Serves the React frontend and runs mammography inference.

Run locally:
    uvicorn app:app --host 0.0.0.0 --port 8000

Configuration (environment variables):
    MAIA_MODELS_DIR     Path to ONNX models directory (default: ../models relative to this file)
    MAIA_UPLOADS_DIR    Temp upload directory (default: ../uploads)
    MAIA_FRONTEND_DIR   Optional built frontend to serve (default: ../frontend/build, then ../dist)
    MAIA_CORS_ORIGINS   Comma-separated list of allowed CORS origins
                        (default: http://localhost:3000,http://localhost:5173,http://localhost:8000)
    MAIA_MAX_UPLOAD_MB  Max accepted upload size in MB (default: 25)
    MAIA_LOG_LEVEL      Logging level (default: INFO)

Expected project layout:
    web/maia/
    ├── backend/
    │   ├── app.py              ← this file
    │   └── inference.py        ← model loading + inference logic
    ├── dist/ or frontend/build/  ← React production build (optional, served if present)
    ├── models/                 ← ONNX files
    └── uploads/                ← temp directory for uploaded images
"""

import base64
import logging
import os
import time
import uuid
from contextlib import asynccontextmanager
from io import BytesIO
from pathlib import Path
from typing import Optional

import numpy as np
from fastapi import FastAPI, File, HTTPException, Query, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image
from pydantic import BaseModel, Field

from inference import MammographyInference

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

def _env_path(var: str, default: Path) -> Path:
    raw = os.environ.get(var)
    return Path(raw).expanduser().resolve() if raw else default

MODELS_DIR = _env_path("MAIA_MODELS_DIR", BASE_DIR / "models")
UPLOADS_DIR = _env_path("MAIA_UPLOADS_DIR", BASE_DIR / "uploads")

# Frontend build: prefer MAIA_FRONTEND_DIR, then Vite's dist/, then CRA's frontend/build/
_frontend_env = os.environ.get("MAIA_FRONTEND_DIR")
if _frontend_env:
    FRONTEND_DIR: Optional[Path] = Path(_frontend_env).expanduser().resolve()
elif (BASE_DIR / "dist").exists():
    FRONTEND_DIR = BASE_DIR / "dist"
elif (BASE_DIR / "frontend" / "build").exists():
    FRONTEND_DIR = BASE_DIR / "frontend" / "build"
else:
    FRONTEND_DIR = None

DEFAULT_ORIGINS = "https://alexcattani44-maia-backend.hf.space,http://localhost:3000,http://localhost:5173,http://localhost:8000,https://openmaia.vercel.app"
CORS_ORIGINS = [
    o.strip()
    for o in os.environ.get("MAIA_CORS_ORIGINS", DEFAULT_ORIGINS).split(",")
    if o.strip()
]

MAX_UPLOAD_MB = int(os.environ.get("MAIA_MAX_UPLOAD_MB", "25"))
MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024

LOG_LEVEL = os.environ.get("MAIA_LOG_LEVEL", "INFO").upper()

UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("maia")

# ---------------------------------------------------------------------------
# App lifespan — load models once at startup
# ---------------------------------------------------------------------------

engine: Optional[MammographyInference] = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    global engine
    logger.info("Loading inference engine from %s", MODELS_DIR)
    try:
        engine = MammographyInference(MODELS_DIR)
        logger.info(
            "Inference engine ready (yolo=%s, patch=%s)",
            engine.yolo_loaded,
            engine.patch_loaded,
        )
    except Exception as exc:  # noqa: BLE001 — log any startup failure and keep app alive
        logger.exception("Failed to initialize inference engine: %s", exc)
        engine = None
    yield
    logger.info("Shutting down")


app = FastAPI(
    title="OpenMAIA",
    description="Open-source Mammography AI Assistant — inference API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    try:
        response = await call_next(request)
    except Exception:
        logger.exception("Unhandled error on %s %s", request.method, request.url.path)
        raise
    duration_ms = (time.time() - start) * 1000
    logger.info(
        "%s %s → %d (%.1f ms)",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    return response


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".dcm", ".dicom"}
ALLOWED_DENSITIES = {"A", "B", "C", "D"}


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
    image_id: str
    filename: str
    width: int
    height: int

    detections: list[Detection]

    classification: str
    classification_confidence: float

    risk_score: Optional[float] = None
    risk_level: Optional[str] = None
    risk_model_type: str = Field(
        default="heuristic",
        description="'heuristic' — rule-based placeholder; 'model' — trained risk model",
    )

    heatmap_base64: Optional[str] = None

    inference_time_ms: float
    model_info: dict


class HealthResponse(BaseModel):
    status: str
    models: dict
    any_models_loaded: bool


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/api/health", response_model=HealthResponse)
async def health():
    """Health check — also reports which models are loaded."""
    if engine is None:
        return HealthResponse(
            status="degraded",
            models={
                "yolo_mass": False,
                "yolo_calc": False,
                "patch_mass": False,
                "patch_calc": False,
            },
            any_models_loaded=False,
        )

    models = {
        "yolo_mass": engine.yolo_mass is not None,
        "yolo_calc": engine.yolo_calc is not None,
        "patch_mass": engine.patch_mass is not None,
        "patch_calc": engine.patch_calc is not None,
    }
    any_loaded = any(models.values())
    return HealthResponse(
        status="ok" if any_loaded else "degraded",
        models=models,
        any_models_loaded=any_loaded,
    )


@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze(
    file: UploadFile = File(...),
    confidence_threshold: float = Query(0.5, ge=0.0, le=1.0),
    use_yolo: bool = Query(True),
    use_patch: bool = Query(True),
    # Optional EHR fields for risk calculation
    patient_age: Optional[int] = Query(None, ge=0, le=120),
    breast_density: Optional[str] = Query(None, max_length=1),
    prior_biopsy: Optional[bool] = Query(None),
    family_history: Optional[bool] = Query(None),
):
    """
    Main analysis endpoint.

    Accepts a mammogram image (DICOM, PNG, JPEG) and returns:
    - Bounding box detections from YOLO and/or patch classifier
    - Classification (benign/malignant/suspicious/normal) with confidence
    - Probability heatmap as base64 PNG
    - Heuristic 5-year risk score (labeled as such)
    - Inference timing
    """
    if engine is None:
        raise HTTPException(503, "Inference engine not initialized")

    if not any([engine.yolo_mass, engine.yolo_calc, engine.patch_mass, engine.patch_calc]):
        raise HTTPException(503, "No models loaded — backend is running but cannot analyze")

    # Validate filename and extension
    if not file.filename:
        raise HTTPException(400, "No filename provided")

    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            400,
            f"Unsupported file type: {ext or '(none)'}. Use JPEG, PNG, or DICOM.",
        )

    # Validate density if provided (query constraint above limits length only)
    density = breast_density.upper() if breast_density else None
    if density is not None and density not in ALLOWED_DENSITIES:
        raise HTTPException(
            400,
            f"Invalid breast_density: {breast_density!r}. Use one of A, B, C, D.",
        )

    # Read and size-check contents before touching disk
    contents = await file.read()
    if not contents:
        raise HTTPException(400, "Empty file upload")
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            413,
            f"File too large: {len(contents) / 1024 / 1024:.1f} MB "
            f"(max {MAX_UPLOAD_MB} MB)",
        )

    # Persist to a temp path under UPLOADS_DIR
    image_id = str(uuid.uuid4())[:8]
    upload_path = UPLOADS_DIR / f"{image_id}{ext}"

    try:
        upload_path.write_bytes(contents)
    except OSError as exc:
        logger.exception("Failed to write upload %s", upload_path)
        raise HTTPException(500, f"Could not save upload: {exc}") from exc

    try:
        t0 = time.time()
        try:
            result = engine.run(
                image_path=str(upload_path),
                confidence_threshold=confidence_threshold,
                use_yolo=use_yolo,
                use_patch=use_patch,
                ehr_data={
                    "age": patient_age,
                    "breast_density": density,
                    "prior_biopsy": prior_biopsy,
                    "family_history": family_history,
                },
            )
        except FileNotFoundError as exc:
            raise HTTPException(400, f"Could not read image: {exc}") from exc
        except ValueError as exc:
            raise HTTPException(400, f"Invalid image: {exc}") from exc
        except Exception as exc:  # noqa: BLE001
            logger.exception("Inference failed on %s", file.filename)
            raise HTTPException(500, f"Inference failed: {exc}") from exc

        inference_ms = (time.time() - t0) * 1000

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

        # Encode heatmap as base64 PNG (grayscale; frontend colormaps it)
        heatmap_b64: Optional[str] = None
        if result.get("heatmap") is not None:
            heatmap = result["heatmap"]
            heatmap_norm = np.clip(heatmap * 255, 0, 255).astype(np.uint8)
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
            risk_model_type=result.get("risk_model_type", "heuristic"),
            heatmap_base64=heatmap_b64,
            inference_time_ms=round(inference_ms, 1),
            model_info=result["model_info"],
        )

    finally:
        try:
            if upload_path.exists():
                upload_path.unlink()
        except OSError:
            logger.warning("Could not delete temp upload %s", upload_path)


# ---------------------------------------------------------------------------
# Global exception handler
# ---------------------------------------------------------------------------

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


# ---------------------------------------------------------------------------
# Serve React frontend (production build)
# ---------------------------------------------------------------------------

if FRONTEND_DIR and FRONTEND_DIR.exists():
    logger.info("Serving frontend from %s", FRONTEND_DIR)

    # Vite emits assets/ (not static/). Mount it if present.
    assets_dir = FRONTEND_DIR / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    static_dir = FRONTEND_DIR / "static"
    if static_dir.exists():
        app.mount("/static", StaticFiles(directory=static_dir), name="static")

    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        """Serve the built SPA, letting the router handle unknown routes."""
        if full_path.startswith("api/"):
            raise HTTPException(404)

        candidate = FRONTEND_DIR / full_path
        if candidate.is_file():
            return FileResponse(candidate)

        index = FRONTEND_DIR / "index.html"
        if index.exists():
            return FileResponse(index)
        raise HTTPException(404)
else:
    @app.get("/")
    async def no_frontend():
        return {
            "message": "OpenMAIA API is running. No frontend build found.",
            "hint": "Run 'npm run build' in web/maia/ to produce dist/, "
                    "or set MAIA_FRONTEND_DIR.",
            "docs": "/docs",
        }


# ---------------------------------------------------------------------------
# Run directly
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)