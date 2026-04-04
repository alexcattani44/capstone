import { FileUpload } from "./FileUpload";
import { FileCard } from "./FileCard";
import { MetadataPanel } from "./MetadataPanel";
import { DisplayControls } from "./DisplayControls";
import { EHRForm } from "./EHRForm";

interface LeftPanelProps {
  metadata: Array<{ label: string; value: string }>;
  confidenceThreshold: number;
  heatmapIntensity: number;
  showBoundingBoxes: boolean;
  showHeatmap: boolean;
  showConfidenceLabels: boolean;
  age: string;
  density: string;
  priorBiopsy: string;
  familyHistory: string;
  onFileSelect: (file: File) => void;
  onConfidenceThresholdChange: (value: number) => void;
  onHeatmapIntensityChange: (value: number) => void;
  onShowBoundingBoxesChange: (value: boolean) => void;
  onShowHeatmapChange: (value: boolean) => void;
  onShowConfidenceLabelsChange: (value: boolean) => void;
  onAgeChange: (value: string) => void;
  onDensityChange: (value: string) => void;
  onPriorBiopsyChange: (value: string) => void;
  onFamilyHistoryChange: (value: string) => void;
  onAnalyze: () => void;
  onLoadDemo: () => void;
  isAnalyzing: boolean;
}

export function LeftPanel({
  metadata,
  confidenceThreshold,
  heatmapIntensity,
  showBoundingBoxes,
  showHeatmap,
  showConfidenceLabels,
  age,
  density,
  priorBiopsy,
  familyHistory,
  onFileSelect,
  onConfidenceThresholdChange,
  onHeatmapIntensityChange,
  onShowBoundingBoxesChange,
  onShowHeatmapChange,
  onShowConfidenceLabelsChange,
  onAgeChange,
  onDensityChange,
  onPriorBiopsyChange,
  onFamilyHistoryChange,
  onAnalyze,
  onLoadDemo,
  isAnalyzing,
}: LeftPanelProps) {
  // Determine if we should show file upload or file card
  const hasFile = metadata.some((m) => m.value !== "—");

  return (
    <div className="h-full overflow-y-auto custom-scrollbar border-r border-[var(--color-border-default)] p-6 flex flex-col gap-5">
      {hasFile ? (
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-[1.8px]">
            Image
          </h3>
          <FileCard
            fileName={
              metadata[0]?.label === "Patient ID"
                ? `patient_${metadata[0].value}_MLO.dcm`
                : "mammogram.dcm"
            }
            fileInfo={`DICOM · ${metadata.find((m) => m.label === "Image Size")?.value || "0 × 0"} · ${metadata.find((m) => m.label === "Bit Depth")?.value || "16-bit"}`}
          />
        </div>
      ) : (
        <FileUpload onFileSelect={onFileSelect} />
      )}
      <MetadataPanel metadata={metadata} />
      <DisplayControls
        confidenceThreshold={confidenceThreshold}
        heatmapIntensity={heatmapIntensity}
        showBoundingBoxes={showBoundingBoxes}
        showHeatmap={showHeatmap}
        showConfidenceLabels={showConfidenceLabels}
        onConfidenceThresholdChange={onConfidenceThresholdChange}
        onHeatmapIntensityChange={onHeatmapIntensityChange}
        onShowBoundingBoxesChange={onShowBoundingBoxesChange}
        onShowHeatmapChange={onShowHeatmapChange}
        onShowConfidenceLabelsChange={onShowConfidenceLabelsChange}
      />
      <EHRForm
        age={age}
        density={density}
        priorBiopsy={priorBiopsy}
        familyHistory={familyHistory}
        onAgeChange={onAgeChange}
        onDensityChange={onDensityChange}
        onPriorBiopsyChange={onPriorBiopsyChange}
        onFamilyHistoryChange={onFamilyHistoryChange}
      />
      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        // add cursor clickable when not analyzing, and not-allowed when analyzing
        className="w-full rounded-lg py-3.5 text-sm font-bold tracking-[0.3px] text-[#0b0f14] transition-opacity disabled:opacity-40 bg-[var(--color-accent-cyan)] hover:enabled:opacity-80 hover:enabled:cursor-pointer"
      >
        Analyze Mammogram
      </button>
      <button
        onClick={onLoadDemo}
        className="w-full rounded-lg py-3 bg-[var(--color-bg-panel)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] text-[13px] font-semibold hover:bg-[var(--color-bg-darker)] transition-colors"
      >
        Load Demo Image
      </button>
      <div className="bg-[var(--color-warning-bg)] border border-[var(--color-warning-border)] rounded-lg p-3.5">
        <p className="text-[var(--color-warning)] text-[11px] leading-[1.5]">
          <span>⚠ </span>
          <span className="font-bold">Research Prototype.</span>
          <span> This tool is not ready for clinical diagnosis.</span>
        </p>
      </div>
    </div>
  );
}
