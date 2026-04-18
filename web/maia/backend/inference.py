"""
OpenMAIA — Inference Engine

Loads ONNX models for YOLO detection and patch-based classification.
Runs both pipelines on a mammogram and merges results.

Supports graceful degradation: if only some models are available,
it runs what it can and reports which models were used.
"""

import os
import json
import numpy as np
from pathlib import Path
from PIL import Image
from typing import Optional


class MammographyInference:
    """
    Combined inference engine for mammography analysis.

    Loads available ONNX models from the models/ directory:
    - mass_yolo.onnx       → YOLO mass detector
    - calc_yolo.onnx       → YOLO calcification detector
    - mass_patch.onnx      → EfficientNet mass patch classifier
    - calc_patch.onnx      → EfficientNet calcification patch classifier

    Any subset of models can be present — the engine uses what's available.
    """

    def __init__(self, models_dir: str):
        self.models_dir = Path(models_dir)

        # Try to import onnxruntime (CPU-only is fine)
        try:
            import onnxruntime as ort
            self.ort = ort
            # Use CPU execution provider (matches design doc requirement)
            self.providers = ["CPUExecutionProvider"]
        except ImportError:
            print("⚠ onnxruntime not installed. Install with: pip install onnxruntime")
            self.ort = None
            self.providers = []

        # Load whatever models are available
        self.yolo_mass = self._load_model("mass_yolo.onnx")
        self.yolo_calc = self._load_model("calc_yolo.onnx")
        self.patch_mass = self._load_model("mass_patch.onnx")
        self.patch_calc = self._load_model("calc_patch.onnx")

        # Load inference config if available
        config_path = self.models_dir / "inference_config.json"
        if config_path.exists():
            with open(config_path) as f:
                self.config = json.load(f)
        else:
            self.config = self._default_config()

    @property
    def yolo_loaded(self) -> list[str]:
        loaded = []
        if self.yolo_mass: loaded.append("mass")
        if self.yolo_calc: loaded.append("calc")
        return loaded

    @property
    def patch_loaded(self) -> list[str]:
        loaded = []
        if self.patch_mass: loaded.append("mass")
        if self.patch_calc: loaded.append("calc")
        return loaded

    def _load_model(self, filename: str):
        """Load an ONNX model if it exists."""
        if self.ort is None:
            return None
        path = self.models_dir / filename
        if not path.exists():
            print(f"  Model not found: {filename} (skipping)")
            return None
        try:
            session = self.ort.InferenceSession(str(path), providers=self.providers)
            print(f"  ✓ Loaded {filename}")
            return session
        except Exception as e:
            print(f"  ✗ Failed to load {filename}: {e}")
            return None

    def _default_config(self) -> dict:
        return {
            "patch_size": 224,
            "stride_inference": 112,
            "min_tissue_fraction": 0.3,
            "nms_iou_threshold": 0.3,
            "normalize_mean": [0.485, 0.456, 0.406],
            "normalize_std": [0.229, 0.224, 0.225],
            "yolo_input_size": 640,
        }

    # ------------------------------------------------------------------
    # Image loading
    # ------------------------------------------------------------------

    def load_image(self, image_path: str) -> tuple[np.ndarray, int, int]:
        """Load image from path. Handles JPEG, PNG, and basic DICOM.
        Returns (grayscale_array, width, height)."""
        ext = Path(image_path).suffix.lower()

        if ext in (".dcm", ".dicom"):
            return self._load_dicom(image_path)
        else:
            img = Image.open(image_path).convert("L")
            arr = np.array(img)
            return arr, img.width, img.height

    def _load_dicom(self, path: str) -> tuple[np.ndarray, int, int]:
        """Load DICOM file. Requires pydicom."""
        try:
            import pydicom
        except ImportError as exc:
            raise ValueError(
                "DICOM support not available — install pydicom "
                "(uncomment it in backend/requirements.txt)"
            ) from exc

        ds = pydicom.dcmread(path)
        arr = ds.pixel_array.astype(np.float32)
        # Handle photometric interpretation (MONOCHROME1 is inverted)
        photometric = getattr(ds, "PhotometricInterpretation", "")
        if photometric == "MONOCHROME1":
            arr = arr.max() - arr
        # Normalize to 0-255
        arr = ((arr - arr.min()) / (arr.max() - arr.min() + 1e-8) * 255).astype(np.uint8)
        if arr.ndim == 3:
            arr = arr[..., 0]
        h, w = arr.shape[:2]
        return arr, w, h

    # ------------------------------------------------------------------
    # YOLO inference
    # ------------------------------------------------------------------

    def run_yolo(self, img_gray: np.ndarray, model, abnormality_type: str,
                 confidence_threshold: float) -> list[dict]:
        """Run YOLO ONNX model on a mammogram.

        YOLO ONNX expects: [batch, channels, height, width] float32 normalized 0-1
        Returns: list of detection dicts
        """
        if model is None:
            return []

        input_size = self.config.get("yolo_input_size", 640)
        h_orig, w_orig = img_gray.shape[:2]

        # Preprocess: resize, convert to RGB, normalize
        img_resized = np.array(
            Image.fromarray(img_gray).convert("RGB").resize(
                (input_size, input_size), Image.Resampling.BILINEAR
            )
        ).astype(np.float32) / 255.0

        # HWC → CHW → NCHW
        img_input = np.transpose(img_resized, (2, 0, 1))[np.newaxis, ...]

        # Run inference
        input_name = model.get_inputs()[0].name
        output_name = model.get_outputs()[0].name
        outputs = model.run([output_name], {input_name: img_input})[0]

        # Parse YOLO output
        # Ultralytics ONNX output shape: [1, num_detections, 6] or [1, 6, num_detections]
        detections = self._parse_yolo_output(
            outputs, w_orig, h_orig, input_size,
            abnormality_type, confidence_threshold
        )

        return detections

    def _parse_yolo_output(self, output, w_orig, h_orig, input_size,
                           abnormality_type, conf_threshold) -> list[dict]:
        """Parse YOLO ONNX output into detection dicts."""
        detections = []

        # Handle different YOLO output formats
        if output.ndim == 3:
            output = output[0]  # remove batch dim

        # Ultralytics format: [num_classes+4, num_detections] transposed
        if output.shape[0] < output.shape[1]:
            output = output.T  # now [num_detections, num_classes+4]

        for row in output:
            if len(row) >= 6:
                # Format: [x_center, y_center, width, height, conf, class_id]
                x_c, y_c, w, h = row[0], row[1], row[2], row[3]
                conf = row[4]
                cls_id = int(row[5])
            elif len(row) >= 5:
                # Format: [x_center, y_center, width, height, class_scores...]
                x_c, y_c, w, h = row[0], row[1], row[2], row[3]
                class_scores = row[4:]
                cls_id = int(np.argmax(class_scores))
                conf = float(class_scores[cls_id])
            else:
                continue

            if conf < conf_threshold:
                continue

            # Scale from input_size back to original image dimensions
            scale_x = w_orig / input_size
            scale_y = h_orig / input_size

            x1 = (x_c - w / 2) * scale_x
            y1 = (y_c - h / 2) * scale_y
            x2 = (x_c + w / 2) * scale_x
            y2 = (y_c + h / 2) * scale_y

            # Clamp to image bounds
            x1 = max(0, min(x1, w_orig))
            y1 = max(0, min(y1, h_orig))
            x2 = max(0, min(x2, w_orig))
            y2 = max(0, min(y2, h_orig))

            # Label: {type}_{pathology}
            pathology = "malignant" if cls_id == 1 else "benign"
            label = f"{abnormality_type}_{pathology}"

            detections.append({
                "box": [float(x1), float(y1), float(x2), float(y2)],
                "confidence": float(conf),
                "label": label,
                "source": "yolo",
            })

        return detections

    # ------------------------------------------------------------------
    # Patch classifier inference
    # ------------------------------------------------------------------

    def run_patch_classifier(self, img_gray: np.ndarray, model,
                             abnormality_type: str,
                             confidence_threshold: float) -> tuple[list[dict], np.ndarray]:
        """Run sliding window patch classifier.

        Returns: (detections, heatmap)
        - detections: list of dicts with merged bounding boxes
        - heatmap: 2D probability map same size as input image
        """
        if model is None:
            return [], np.zeros(img_gray.shape[:2])

        ps = self.config.get("patch_size", 224)
        stride = self.config.get("stride_inference", 112)
        mean = np.array(self.config.get("normalize_mean", [0.485, 0.456, 0.406]))
        std = np.array(self.config.get("normalize_std", [0.229, 0.224, 0.225]))
        min_tissue = self.config.get("min_tissue_fraction", 0.3)

        h, w = img_gray.shape[:2]

        # Accumulate probability heatmap
        prob_map = np.zeros((h, w), dtype=np.float32)
        count_map = np.zeros((h, w), dtype=np.float32)

        # Collect all valid patches for batch inference
        patch_coords = []
        patch_inputs = []

        for y in range(0, h - ps + 1, stride):
            for x in range(0, w - ps + 1, stride):
                patch = img_gray[y:y + ps, x:x + ps]

                # Skip background-heavy patches
                if np.mean(patch > 20) < min_tissue:
                    continue

                # Convert to RGB float, normalize
                patch_rgb = np.stack([patch, patch, patch], axis=-1).astype(np.float32) / 255.0
                patch_norm = (patch_rgb - mean) / std
                patch_chw = np.transpose(patch_norm, (2, 0, 1)).astype(np.float32)

                patch_coords.append((x, y))
                patch_inputs.append(patch_chw)

        if not patch_inputs:
            return [], np.zeros((h, w))

        # Batch inference
        input_name = model.get_inputs()[0].name
        output_name = model.get_outputs()[0].name
        batch_size = 128

        all_probs = []
        for i in range(0, len(patch_inputs), batch_size):
            batch = np.stack(patch_inputs[i:i + batch_size])
            logits = model.run([output_name], {input_name: batch})[0]
            # Softmax → lesion probability
            exp_logits = np.exp(logits - np.max(logits, axis=1, keepdims=True))
            probs = exp_logits / exp_logits.sum(axis=1, keepdims=True)
            all_probs.extend(probs[:, 1])  # class 1 = lesion

        # Build heatmap and collect candidates
        candidate_boxes = []
        candidate_scores = []

        for (x, y), prob in zip(patch_coords, all_probs):
            prob_map[y:y + ps, x:x + ps] += prob
            count_map[y:y + ps, x:x + ps] += 1

            if prob >= confidence_threshold:
                candidate_boxes.append([x, y, x + ps, y + ps])
                candidate_scores.append(float(prob))

        # Normalize heatmap
        count_map[count_map == 0] = 1
        heatmap = prob_map / count_map

        # NMS
        detections = []
        if candidate_boxes:
            boxes = np.array(candidate_boxes)
            scores = np.array(candidate_scores)
            nms_thresh = self.config.get("nms_iou_threshold", 0.3)
            keep = self._nms(boxes, scores, nms_thresh)

            for idx in keep:
                detections.append({
                    "box": boxes[idx].tolist(),
                    "confidence": float(scores[idx]),
                    "label": f"{abnormality_type}_lesion",
                    "source": "patch",
                })

        return detections, heatmap

    def _nms(self, boxes: np.ndarray, scores: np.ndarray, threshold: float) -> list[int]:
        """Non-maximum suppression."""
        if len(boxes) == 0:
            return []

        x1, y1, x2, y2 = boxes[:, 0], boxes[:, 1], boxes[:, 2], boxes[:, 3]
        areas = (x2 - x1) * (y2 - y1)
        order = scores.argsort()[::-1]
        keep = []

        while len(order) > 0:
            i = order[0]
            keep.append(i)
            if len(order) == 1:
                break

            xx1 = np.maximum(x1[i], x1[order[1:]])
            yy1 = np.maximum(y1[i], y1[order[1:]])
            xx2 = np.minimum(x2[i], x2[order[1:]])
            yy2 = np.minimum(y2[i], y2[order[1:]])

            inter = np.maximum(0, xx2 - xx1) * np.maximum(0, yy2 - yy1)
            iou = inter / (areas[i] + areas[order[1:]] - inter)

            mask = iou <= threshold
            order = order[1:][mask]

        return keep

    # ------------------------------------------------------------------
    # Main inference pipeline
    # ------------------------------------------------------------------

    def run(self, image_path: str, confidence_threshold: float = 0.5,
            use_yolo: bool = True, use_patch: bool = True,
            ehr_data: Optional[dict] = None) -> dict:
        """
        Run full inference pipeline on a mammogram.

        1. Load and preprocess image
        2. Run YOLO detectors (mass + calc) if available
        3. Run patch classifiers (mass + calc) if available
        4. Merge all detections
        5. Compute overall classification
        6. Return structured results

        Returns dict matching the AnalysisResponse schema.
        """
        # Load image
        img_gray, width, height = self.load_image(image_path)

        all_detections = []
        heatmaps = []
        models_used = []

        # --- YOLO detection ---
        if use_yolo:
            if self.yolo_mass:
                dets = self.run_yolo(img_gray, self.yolo_mass, "mass", confidence_threshold)
                all_detections.extend(dets)
                models_used.append("yolo_mass")

            if self.yolo_calc:
                dets = self.run_yolo(img_gray, self.yolo_calc, "calc", confidence_threshold)
                all_detections.extend(dets)
                models_used.append("yolo_calc")

        # --- Patch classifier ---
        if use_patch:
            if self.patch_mass:
                dets, hmap = self.run_patch_classifier(
                    img_gray, self.patch_mass, "mass", confidence_threshold
                )
                all_detections.extend(dets)
                heatmaps.append(hmap)
                models_used.append("patch_mass")

            if self.patch_calc:
                dets, hmap = self.run_patch_classifier(
                    img_gray, self.patch_calc, "calc", confidence_threshold
                )
                all_detections.extend(dets)
                heatmaps.append(hmap)
                models_used.append("patch_calc")

        # Merge heatmaps (max across all models)
        combined_heatmap = None
        if heatmaps:
            combined_heatmap = np.max(np.stack(heatmaps), axis=0)

        # Overall classification
        classification, class_conf = self._compute_classification(all_detections)

        # Risk score (placeholder — needs EHR fusion model)
        risk_score, risk_level = self._compute_risk(
            classification, class_conf, ehr_data
        )

        return {
            "width": width,
            "height": height,
            "detections": all_detections,
            "classification": classification,
            "classification_confidence": class_conf,
            "risk_score": risk_score,
            "risk_level": risk_level,
            # Until a trained EHR-fusion risk model is wired in, clearly label
            # this value as a heuristic so the frontend can surface the caveat.
            "risk_model_type": "heuristic",
            "heatmap": combined_heatmap,
            "model_info": {
                "models_used": models_used,
                "yolo_input_size": self.config.get("yolo_input_size", 640),
                "patch_size": self.config.get("patch_size", 224),
                "confidence_threshold": confidence_threshold,
                "compute": "CPU",
                "risk_model_type": "heuristic",
            },
        }

    def _compute_classification(self, detections: list[dict]) -> tuple[str, float]:
        """Derive overall classification from all detections."""
        if not detections:
            return "normal", 0.0

        # Find the highest-confidence malignant detection
        mal_confs = [
            d["confidence"] for d in detections
            if "malignant" in d["label"]
        ]
        ben_confs = [
            d["confidence"] for d in detections
            if "benign" in d["label"]
        ]
        # Patch classifier outputs generic "lesion" labels
        lesion_confs = [
            d["confidence"] for d in detections
            if "lesion" in d["label"]
        ]

        if mal_confs:
            return "malignant", float(max(mal_confs))
        elif lesion_confs:
            # Patch classifier detected something but didn't classify pathology
            return "suspicious", float(max(lesion_confs))
        elif ben_confs:
            return "benign", float(max(ben_confs))
        else:
            return "normal", 0.0

    def _compute_risk(self, classification: str, confidence: float,
                      ehr_data: Optional[dict]) -> tuple[Optional[float], Optional[str]]:
        """
        Placeholder risk calculation.

        A real implementation would use a trained risk model with EHR fusion.
        This uses a simple heuristic for demo purposes.
        """
        if classification == "normal":
            return None, None

        # Base risk from model output
        base_risk = confidence * 0.25 if classification == "malignant" else confidence * 0.10

        # Adjust for EHR factors (simple heuristic)
        if ehr_data:
            age = ehr_data.get("age")
            if age and age > 50:
                base_risk *= 1.2
            if ehr_data.get("family_history"):
                base_risk *= 1.3
            if ehr_data.get("breast_density") in ("C", "D"):
                base_risk *= 1.15

        risk = min(base_risk, 0.95)  # cap at 95%

        if risk > 0.20:
            level = "high"
        elif risk > 0.10:
            level = "elevated"
        else:
            level = "average"

        return round(risk, 4), level
