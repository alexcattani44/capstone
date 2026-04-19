import { BoundingBox } from "./BoundingBox";

interface BoundingBoxData {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: string;
}

interface CenterPanelProps {
  activeTab: "analysis" | "original" | "heatmap";
  onTabChange: (tab: "analysis" | "original" | "heatmap") => void;
  imageLoaded: boolean;
  imageUrl?: string;
  fileName?: string;
  boundingBoxes?: BoundingBoxData[];
  showBoundingBoxes?: boolean;
  showConfidenceLabels?: boolean;
  heatmapBase64?: string;
  showHeatmap?: boolean;
  heatmapIntensity?: number;
  inferenceTime?: string;
  analysisError?: string;
  progress?: number;
}

export function CenterPanel({
  activeTab,
  onTabChange,
  imageLoaded,
  imageUrl,
  fileName = "No image loaded",
  boundingBoxes = [],
  showBoundingBoxes = true,
  showConfidenceLabels = true,
  heatmapBase64,
  showHeatmap = false,
  heatmapIntensity = 0.6,
  inferenceTime,
  analysisError,
  progress,
}: CenterPanelProps) {
  const tabs = [
    { id: "analysis" as const, label: "Analysis View" },
    { id: "original" as const, label: "Original" },
    { id: "heatmap" as const, label: "Heatmap Only" },
  ];

  const showBoxes = activeTab === "analysis" && showBoundingBoxes;
  const showHeatOverlay =
    (activeTab === "analysis" || activeTab === "heatmap") &&
    showHeatmap &&
    heatmapBase64;
  const hasResults = inferenceTime != null;

  return (
    <div className="flex-1 bg-[var(--color-bg-dark)] flex flex-col relative">
      {/* Toolbar */}
      <div className="border-b border-[var(--color-border-default)] px-6 py-3 flex items-center justify-between">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-[11.6px] font-bold transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--color-accent-cyan-bg)] text-[var(--color-accent-cyan)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-panel)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-[var(--color-text-secondary)] text-xs">
          {fileName}
        </span>
      </div>

      {/* Image viewer */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden min-h-0">
        {/* Progress bar */}
        {progress != null && progress < 100 && (
          <div className="absolute top-0 left-0 right-0 z-20">
            <div
              className="h-1 bg-[var(--color-accent-cyan)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Error message */}
        {analysisError && (
          <div className="absolute top-4 left-4 right-4 z-20 bg-red-900/80 border border-red-500/40 rounded-lg px-4 py-3 text-sm text-red-200">
            {analysisError}
          </div>
        )}

        {imageLoaded && imageUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Mammogram image */}
            <img
              src={imageUrl}
              alt="Mammogram"
              className="max-w-full max-h-full object-contain"
              style={{ minHeight: '200px' }}
            />

            {/* Heatmap overlay — matches the image, not the container */}
            {showHeatOverlay && (
              <img
                src={`data:image/png;base64,${heatmapBase64}`}
                alt="Heatmap overlay"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                style={{ opacity: heatmapIntensity, mixBlendMode: "screen" }}
              />
            )}

            {/* Bounding boxes */}
            {showBoxes &&
              boundingBoxes.map((box, index) => (
                <BoundingBox
                  key={index}
                  {...box}
                  showLabel={showConfidenceLabels}
                />
              ))}
          </div>
        ) : (
          <div className="text-center opacity-50">
            <h2 className="text-[var(--color-text-primary)] text-xl font-semibold mb-2">
              No Image Loaded
            </h2>
            <p className="text-[var(--color-text-secondary)] text-[13px]">
              Upload a mammogram or load the demo to begin
            </p>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="border-t border-[var(--color-border-default)] px-6 py-2.5 flex items-center justify-between text-[11px] text-[var(--color-text-secondary)]">
        <div className="flex items-center gap-2">
          <div
            className={`size-1.5 rounded-full ${
              analysisError
                ? "bg-[var(--color-danger)]"
                : hasResults
                  ? "bg-[var(--color-success)]"
                  : "bg-[var(--color-text-secondary)]"
            }`}
          />
          <span>
            {analysisError
              ? "Analysis Failed"
              : hasResults
                ? "Analysis Complete — CPU Inference"
                : "Ready"}
          </span>
        </div>
        <span>{inferenceTime || "—"}</span>
      </div>
    </div>
  );
}
