interface DetectionItemProps {
  name: string;
  type: string;
  confidence: number;
  color: string;
  iou: number;
}

export function DetectionItem({ name, type, confidence, iou, color }: DetectionItemProps) {
  return (
    <div className="flex items-center gap-2.5 py-2 border-b border-[rgba(42,53,68,0.4)] last:border-0">
      <div 
        className="size-2 rounded shrink-0" 
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-[var(--color-text-primary)] text-xs font-semibold">
          {name}
        </p>
        <p className="text-[var(--color-text-secondary)] text-[10px]">
          {type} · IoU {iou.toFixed(2)}
        </p>
      </div>
      <span 
        className="text-xs font-bold shrink-0"
        style={{ color }}
      >
        {confidence}%
      </span>
    </div>
  );
}
