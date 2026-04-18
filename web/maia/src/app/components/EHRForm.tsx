interface EHRFormProps {
  age: string;
  density: string;
  priorBiopsy: string;
  familyHistory: string;
  onAgeChange: (value: string) => void;
  onDensityChange: (value: string) => void;
  onPriorBiopsyChange: (value: string) => void;
  onFamilyHistoryChange: (value: string) => void;
}

export function EHRForm({
  age,
  density,
  priorBiopsy,
  familyHistory,
  onAgeChange,
  onDensityChange,
  onPriorBiopsyChange,
  onFamilyHistoryChange,
}: EHRFormProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-[1.8px]">
        Optional EHR Data
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
        <div className="flex flex-col gap-0.5">
          <label className="text-[var(--color-text-secondary)] text-[10px] font-semibold uppercase tracking-[0.8px]">
            Age
          </label>
          <input
            type="text"
            placeholder="e.g. 52"
            value={age}
            onChange={(e) => onAgeChange(e.target.value)}
            className="h-[34px] px-3 bg-[var(--color-bg-panel)] border border-[var(--color-border-default)] rounded-md text-[var(--color-text-primary)] text-xs placeholder:text-[#757575]"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-[var(--color-text-secondary)] text-[10px] font-semibold uppercase tracking-[0.8px]">
            Density
          </label>
          <select
            value={density}
            onChange={(e) => onDensityChange(e.target.value)}
            className="h-[34px] px-3 bg-[var(--color-bg-panel)] border border-[var(--color-border-default)] rounded-md text-[var(--color-text-primary)] text-xs"
          >
            <option value="">—</option>
            <option value="a">A - Almost entirely fatty</option>
            <option value="b">B - Scattered fibroglandular</option>
            <option value="c">C - Heterogeneously dense</option>
            <option value="d">D - Extremely dense</option>
          </select>
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-[var(--color-text-secondary)] text-[10px] font-semibold uppercase tracking-[0.8px]">
            Prior Biopsy
          </label>
          <select
            value={priorBiopsy}
            onChange={(e) => onPriorBiopsyChange(e.target.value)}
            className="h-[34px] px-3 bg-[var(--color-bg-panel)] border border-[var(--color-border-default)] rounded-md text-[var(--color-text-primary)] text-xs"
          >
            <option value="">—</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-[var(--color-text-secondary)] text-[10px] font-semibold uppercase tracking-[0.8px]">
            Family Hx
          </label>
          <select
            value={familyHistory}
            onChange={(e) => onFamilyHistoryChange(e.target.value)}
            className="h-[34px] px-3 bg-[var(--color-bg-panel)] border border-[var(--color-border-default)] rounded-md text-[var(--color-text-primary)] text-xs"
          >
            <option value="">—</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </div>
  );
}
