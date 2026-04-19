interface BoundingBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: string;
  showLabel?: boolean;
  index?: number;
}

export function BoundingBox({ x, y, width, height, label, confidence, color, showLabel = true, index = 0 }: BoundingBoxProps) {
  const labelOffset = index * 20; // stagger labels by 20px each

  return (
    <div
      className="absolute border-2 pointer-events-none"
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        width: `${width * 100}%`,
        height: `${height * 100}%`,
        borderColor: color,
      }}
    >
      {showLabel && (
        <div
          className="absolute left-0 px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap"
          style={{
            top: `${-18 - labelOffset}px`,
            backgroundColor: color,
            color: '#0b0f14',
          }}
        >
          {label} {(confidence * 100).toFixed(0)}%
        </div>
      )}
    </div>
  );
}