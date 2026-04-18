import { Slider } from './Slider';
import { Toggle } from './Toggle';

interface DisplayControlsProps {
  confidenceThreshold: number;
  heatmapIntensity: number;
  showBoundingBoxes: boolean;
  showHeatmap: boolean;
  showConfidenceLabels: boolean;
  onConfidenceThresholdChange: (value: number) => void;
  onHeatmapIntensityChange: (value: number) => void;
  onShowBoundingBoxesChange: (value: boolean) => void;
  onShowHeatmapChange: (value: boolean) => void;
  onShowConfidenceLabelsChange: (value: boolean) => void;
}

export function DisplayControls({
  confidenceThreshold,
  heatmapIntensity,
  showBoundingBoxes,
  showHeatmap,
  showConfidenceLabels,
  onConfidenceThresholdChange,
  onHeatmapIntensityChange,
  onShowBoundingBoxesChange,
  onShowHeatmapChange,
  onShowConfidenceLabelsChange,
}: DisplayControlsProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-[1.8px]">
        Display Controls
      </h3>
      <div className="flex flex-col gap-2">
        <Slider
          label="Confidence Threshold"
          value={confidenceThreshold}
          onChange={onConfidenceThresholdChange}
        />
        <div className="pt-0.5">
          <Slider
            label="Heatmap Intensity"
            value={heatmapIntensity}
            onChange={onHeatmapIntensityChange}
          />
        </div>
        <div className="flex flex-col">
          <Toggle
            label="Show Bounding Boxes"
            checked={showBoundingBoxes}
            onChange={onShowBoundingBoxesChange}
          />
          <Toggle
            label="Show Heatmap Overlay"
            checked={showHeatmap}
            onChange={onShowHeatmapChange}
          />
          <Toggle
            label="Show Confidence Labels"
            checked={showConfidenceLabels}
            onChange={onShowConfidenceLabelsChange}
          />
        </div>
      </div>
    </div>
  );
}
