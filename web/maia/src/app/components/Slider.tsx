interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function Slider({ label, value, onChange, min = 0, max = 1, step = 0.01 }: SliderProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[var(--color-text-secondary)] text-xs font-semibold">{label}</label>
      <div className="flex items-center gap-2.5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-1 bg-white rounded-lg appearance-none cursor-pointer slider"
        />
        <span className="text-[var(--color-accent-cyan)] text-[13px] font-semibold min-w-[38px] text-right">
          {value.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
