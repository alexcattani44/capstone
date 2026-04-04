/**
 * OpenMAIA — API client for the React frontend
 */

// const API_BASE =
//   process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";
const API_BASE = "http://localhost:8000";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Detection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
  label: string;
  source: string;
  iou?: number | null;
}

export interface ModelInfo {
  models_used: string[];
  yolo_input_size: number;
  patch_size: number;
  confidence_threshold: number;
  compute: string;
}

export interface AnalysisResult {
  image_id: string;
  filename: string;
  width: number;
  height: number;
  detections: Detection[];
  classification: string;
  classification_confidence: number;
  risk_score: number | null;
  risk_level: string | null;
  heatmap_base64: string | null;
  inference_time_ms: number;
  model_info: ModelInfo;
}

export interface HealthResponse {
  status: string;
  models: {
    yolo_mass: boolean;
    yolo_calc: boolean;
    patch_mass: boolean;
    patch_calc: boolean;
  };
}

export interface AnalyzeOptions {
  confidenceThreshold?: number;
  useYolo?: boolean;
  usePatch?: boolean;
  patientAge?: number;
  breastDensity?: string;
  priorBiopsy?: boolean;
  familyHistory?: boolean;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

export async function checkHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error("Backend not reachable");
  return res.json();
}

export async function analyzeImage(
  file: File,
  options: AnalyzeOptions = {},
): Promise<AnalysisResult> {
  const {
    confidenceThreshold = 0.5,
    useYolo = true,
    usePatch = true,
    patientAge,
    breastDensity,
    priorBiopsy,
    familyHistory,
  } = options;

  const params = new URLSearchParams();
  params.set("confidence_threshold", String(confidenceThreshold));
  params.set("use_yolo", String(useYolo));
  params.set("use_patch", String(usePatch));
  if (patientAge != null) params.set("patient_age", String(patientAge));
  if (breastDensity != null) params.set("breast_density", breastDensity);
  if (priorBiopsy != null) params.set("prior_biopsy", String(priorBiopsy));
  if (familyHistory != null)
    params.set("family_history", String(familyHistory));

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/analyze?${params.toString()}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}
