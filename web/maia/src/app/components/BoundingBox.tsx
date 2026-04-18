interface BoundingBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: string;
  showLabel?: boolean;
}

export function BoundingBox({
  x,
  y,
  width,
  height,
  label,
  confidence,
  color,
  showLabel = true,
}: BoundingBoxProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      {/* Bounding box border */}
      <div
        className="absolute inset-0 border-2"
        style={{ borderColor: color }}
      />

      {showLabel !== false && (
        <div className="absolute -top-6 left-0 px-2 py-1 text-[11px] font-bold whitespace-nowrap">
          {label} {Math.round(confidence * 100)}%
        </div>
      )}
    </div>
  );
}
