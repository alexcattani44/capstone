import { useState, useCallback } from "react";
import {
  analyzeImage,
  checkHealth,
  type AnalysisResult,
  type AnalyzeOptions,
  type Detection,
} from "./openmaia";

// Re-export types so components can import from one place
export type { AnalysisResult, Detection, AnalyzeOptions };

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseMammogramAnalysisReturn {
  analyze: (file: File, options?: AnalyzeOptions) => Promise<void>;
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  progress: number;
  reset: () => void;
}

export function useMammogramAnalysis(): UseMammogramAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const analyze = useCallback(
    async (file: File, options: AnalyzeOptions = {}) => {
      setLoading(true);
      setError(null);
      setResult(null);
      setProgress(0);

      try {
        setProgress(10);
        const health = await checkHealth();
        //const health = { status: "ok" };

        if (health.status !== "ok") {
          throw new Error("Backend is not ready");
        }

        setProgress(30);

        setProgress(50);
        const analysisResult = await analyzeImage(file, options);

        setProgress(100);
        setResult(analysisResult);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Analysis failed. Is the backend running?";
        console.error("Analysis failed:", err);
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  return { analyze, result, loading, error, progress, reset };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert the heatmap_base64 from the API into an HTMLImageElement
 * for drawing on a canvas overlay.
 */
export function loadHeatmapImage(
  base64String: string,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!base64String) {
      reject(new Error("No heatmap data"));
      return;
    }
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = `data:image/png;base64,${base64String}`;
  });
}

/**
 * Draw detection bounding boxes on a canvas.
 */
interface DrawOptions {
  canvasWidth: number;
  canvasHeight: number;
  imageWidth: number;
  imageHeight: number;
  showLabels?: boolean;
  confidenceThreshold?: number;
}

const COLOR_MAP: Record<string, string> = {
  mass_malignant: "#EF5350",
  mass_benign: "#66BB6A",
  calc_malignant: "#FF7043",
  calc_benign: "#4FC3F7",
  mass_lesion: "#FFB74D",
  calc_lesion: "#FFB74D",
};

export function drawDetections(
  ctx: CanvasRenderingContext2D,
  detections: Detection[],
  options: DrawOptions,
) {
  const {
    canvasWidth,
    canvasHeight,
    imageWidth,
    imageHeight,
    showLabels = true,
    confidenceThreshold = 0,
  } = options;

  const scaleX = canvasWidth / imageWidth;
  const scaleY = canvasHeight / imageHeight;

  for (const det of detections) {
    if (det.confidence < confidenceThreshold) continue;

    const x1 = det.x1 * scaleX;
    const y1 = det.y1 * scaleY;
    const x2 = det.x2 * scaleX;
    const y2 = det.y2 * scaleY;
    const w = x2 - x1;
    const h = y2 - y1;

    const color = COLOR_MAP[det.label] || "#FFB74D";

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.strokeRect(x1, y1, w, h);
    ctx.setLineDash([]);

    if (showLabels) {
      const label = `${det.label.replace("_", " ")} ${Math.round(det.confidence * 100)}%`;
      ctx.font = '600 11px "DM Sans", sans-serif';
      const textWidth = ctx.measureText(label).width;

      ctx.fillStyle = color;
      ctx.fillRect(x1, y1 - 18, textWidth + 10, 18);

      ctx.fillStyle = "#0B0F14";
      ctx.fillText(label, x1 + 5, y1 - 5);
    }
  }
}
