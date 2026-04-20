import { use, useCallback, useEffect, useRef, useState } from "react";
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

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4;

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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [fitSize, setFitSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // reset zoom when image changes
  useEffect(() => {
    setZoom(1);
  }, [imageUrl]);

  const computeFitSize = useCallback(() => {
    const container = scrollContainerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;
    const { width, height } = container.getBoundingClientRect();
    const { width: imgWidth, height: imgHeight } = img.getBoundingClientRect();
    const scale = Math.min(width / imgWidth, height / imgHeight);
    const fitWidth = imgWidth * scale;
    const fitHeight = imgHeight * scale;
    setFitSize({ width: fitWidth, height: fitHeight });
  }, []);

  // Ctrl/Cmd + wheel to zoom toward cursor
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      const rect = container.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const contentX = container.scrollLeft + offsetX;
      const contentY = container.scrollTop + offsetY;

      // Smooth continuous zoom based on wheel delta
      const zoomFactor = Math.exp(-e.deltaY * 0.002);

      setZoom((prev) => {
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev * zoomFactor));
        if (next === prev) return prev;
        const ratio = next / prev;
        requestAnimationFrame(() => {
          container.scrollLeft = contentX * ratio - offsetX;
          container.scrollTop = contentY * ratio - offsetY;
        });
        return next;
      });
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  const onPanStart = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container || zoom <= 1) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
    };
  };

  useEffect(() => {
    if (!isPanning) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      container.scrollLeft = panStartRef.current.scrollLeft - dx;
      container.scrollTop = panStartRef.current.scrollTop - dy;
    };
    const onUp = () => setIsPanning(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isPanning]);

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
        {/* Zoom controls */}
        {imageLoaded && imageUrl && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((prev) => Math.max(MIN_ZOOM, prev - 0.1))}
              className="px-2 py-1.5 rounded-md text-[16px] font-bold transition-colors hover:bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)]"
            >
              -
            </button>
            <button
              onClick={() => setZoom((prev) => Math.min(MAX_ZOOM, prev + 0.1))}
              className="px-2 py-1.5 rounded-md text-[16px] font-bold transition-colors hover:bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)]"
            >
              +
            </button>
            <span className="text-[var(--color-text-secondary)]">
              {Math.round(zoom * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* File name */}
      <div className="border-b border-[var(--color-border-default)] px-6 py-3 flex items-center gap-2">
        <span className="text-[var(--color-text-secondary)] text-xs">
          {fileName}
        </span>
      </div>

      {/* Image viewer */}
      <div className="flex-1 relative min-h-0 min-w-0 flex overflow-hidden custom-scrollbar">
        <div
          ref={scrollContainerRef}
          onMouseDown={onPanStart}
          className={`flex-1 relative overflow-auto min-h-0 min-w-0 p-6 custom-scrollbar ${
            zoom > 1 ? (isPanning ? "cursor-grabbing" : "cursor-grab") : ""
          }`}
        >
          {/* Progress bar */}
          {progress != null && progress < 100 && (
            <div className="sticky top-0 left-0 z-20 -mx-6 -mt-6 mb-[-4px]">
              <div
                className="h-1 bg-[var(--color-accent-cyan)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Error message */}
          {analysisError && (
            <div className="sticky top-4 z-20 mb-4 bg-red-900/80 border border-red-500/40 rounded-lg px-4 py-3 text-sm text-red-200">
              {analysisError}
            </div>
          )}

          {imageLoaded && imageUrl ? (
            <div className="min-w-full min-h-full flex items-center justify-center">
              <div
                className="relative"
                style={{
                  width: fitSize ? fitSize.width * zoom : undefined,
                  height: fitSize ? fitSize.height * zoom : undefined,
                }}
              >
                <img
                  ref={imgRef}
                  src={imageUrl}
                  alt="Mammogram"
                  draggable={false}
                  onLoad={computeFitSize}
                  className="block w-full h-full select-none"
                />
                {showHeatOverlay && (
                  <img
                    src={`data:image/png;base64,${heatmapBase64}`}
                    alt="Heatmap Overlay"
                    draggable={false}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      opacity: heatmapIntensity,
                      mixBlendMode: "screen",
                    }}
                  />
                )}
                {showBoxes &&
                  boundingBoxes.map((box, i) => (
                    <BoundingBox
                      key={i}
                      {...box}
                      showLabel={showConfidenceLabels}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center opacity-50 pointer-events-none">
              <div>
                <h2 className="text-[var(--color-text-primary)] text-xl font-semibold mb-2">
                  No Image Loaded
                </h2>
                <p className="text-[var(--color-text-secondary)] text-[13px]">
                  Upload a mammogram or load the demo to begin
                </p>
              </div>
            </div>
          )}
        </div>
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
        <div className="flex items-center gap-3">
          <span>{inferenceTime || "—"}</span>
        </div>{" "}
      </div>
    </div>
  );
}
