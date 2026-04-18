import { DetectionItem } from './DetectionItem';
import { RiskGauge } from './RiskGauge';

interface Detection {
  name: string;
  type: string;
  confidence: number;
  color: string;
  source: string;
}

interface RightPanelProps {
  hasResults: boolean;
  detections?: Detection[];
  classification?: {
    label: string;
    confidence: number;
    description: string;
  };
  risk?: {
    level: string;
    percentage: number;
    assessment: string;
  };
  modelInfo?: {
    detection: string;
    classifier: string;
    riskModel: string;
    dataset: string;
    inference: string;
    compute: string;
  };
}

export function RightPanel({ 
  hasResults, 
  detections = [],
  classification,
  risk,
  modelInfo
}: RightPanelProps) {
  return (
    <div className="h-full overflow-auto border-l border-[var(--color-border-default)] p-6">
      {hasResults ? (
        <div className="flex flex-col gap-3.5">
          {/* Detection Section */}
          <div className="bg-[var(--color-bg-darker)] border border-[var(--color-border-default)] rounded-xl overflow-hidden">
            <div className="border-b border-[var(--color-border-default)] px-3.5 py-2.5 flex items-center justify-between">
              <h3 className="text-[var(--color-text-primary)] text-[11px] font-bold uppercase tracking-[0.8px]">
                Detection
              </h3>
              <span className="px-3 py-0.5 bg-[rgba(239,83,80,0.12)] text-[#ef5350] text-[9px] font-bold uppercase tracking-[0.5px] rounded-full">
                {detections.length} Found
              </span>
            </div>
            <div className="px-3.5 py-3">
              {detections.map((detection, index) => (
                <DetectionItem key={index} {...detection} />
              ))}
            </div>
          </div>

          {/* Classification Section */}
          {classification && (
            <div className="bg-[var(--color-bg-darker)] border border-[var(--color-border-default)] rounded-xl overflow-hidden">
              <div className="border-b border-[var(--color-border-default)] px-3.5 py-2.5 flex items-center justify-between">
                <h3 className="text-[var(--color-text-primary)] text-[11px] font-bold uppercase tracking-[0.8px]">
                  Classification
                </h3>
                <span className="px-3 py-0.5 bg-[rgba(239,83,80,0.12)] text-[#ef5350] text-[9px] font-bold uppercase tracking-[0.5px] rounded-full">
                  Review
                </span>
              </div>
              <div className="p-3.5">
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-[var(--color-text-primary)] text-xs font-semibold">
                    {classification.label}
                  </p>
                  <p className="text-[var(--color-text-primary)] text-lg font-bold">
                    {(classification.confidence * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="h-1.5 bg-[var(--color-bg-panel)] rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#ffb74d] to-[#ef5350]"
                    style={{ width: `${classification.confidence * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-[var(--color-text-secondary)] uppercase mb-3">
                  <span>Benign</span>
                  <span>Malignant</span>
                </div>
                <div className="bg-[var(--color-bg-panel)] border-l-[3px] border-[var(--color-accent-cyan)] rounded-lg p-3">
                  <p className="text-[10px] text-[var(--color-text-secondary)] leading-[1.5]">
                    <span className="font-bold">Grad-CAM Insight:</span> {classification.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Risk Section */}
          {risk && (
            <div className="bg-[var(--color-bg-darker)] border border-[var(--color-border-default)] rounded-xl overflow-hidden">
              <div className="border-b border-[var(--color-border-default)] px-3.5 py-2.5 flex items-center justify-between">
                <h3 className="text-[var(--color-text-primary)] text-[11px] font-bold uppercase tracking-[0.8px]">
                  5-Year Risk
                </h3>
                <span className="px-2 py-0.5 bg-[rgba(255,183,77,0.12)] text-[#ffb74d] text-[9px] font-bold uppercase tracking-[0.5px] rounded-full">
                  {risk.level}
                </span>
              </div>
              <div className="p-3.5">
                <RiskGauge percentage={risk.percentage} />
                <div className="flex justify-between pt-2 text-[9px] text-[var(--color-text-secondary)] uppercase tracking-[0.8px]">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
                <div className="bg-[var(--color-bg-panel)] border-l-[3px] border-[var(--color-accent-cyan)] rounded-lg p-2.5 mt-3">
                  <p className="text-[9px] text-[var(--color-text-secondary)] leading-[1.5]">
                    <span className="font-bold">Assessment:</span> {risk.assessment}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Model Info Section */}
          {modelInfo && (
            <div className="bg-[var(--color-bg-darker)] border border-[var(--color-border-default)] rounded-xl overflow-hidden">
              <div className="border-b border-[var(--color-border-default)] px-3.5 py-2.5">
                <h3 className="text-[var(--color-text-primary)] text-[11px] font-bold uppercase tracking-[0.8px]">
                  Model Info
                </h3>
              </div>
              <div className="px-3.5 py-3 flex flex-col gap-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--color-text-secondary)]">Detection</span>
                  <span className="text-[var(--color-text-primary)] font-semibold">{modelInfo.detection}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--color-text-secondary)]">Classifier</span>
                  <span className="text-[var(--color-text-primary)] font-semibold">{modelInfo.classifier}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--color-text-secondary)]">Risk Model</span>
                  <span className="text-[var(--color-text-primary)] font-semibold">{modelInfo.riskModel}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--color-text-secondary)]">Dataset</span>
                  <span className="text-[var(--color-text-primary)] font-semibold">{modelInfo.dataset}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--color-text-secondary)]">Inference</span>
                  <span className="text-[var(--color-text-primary)] font-semibold">{modelInfo.inference}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--color-text-secondary)]">Compute</span>
                  <span className="text-[var(--color-text-primary)] font-semibold">{modelInfo.compute}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full opacity-40">
          <div className="text-center">
            <div className="h-9" />
            <p className="text-[var(--color-text-secondary)] text-[13px]">
              Analysis results will appear here after
            </p>
            <p className="text-[var(--color-text-secondary)] text-[13px]">
              processing
            </p>
          </div>
        </div>
      )}
    </div>
  );
}