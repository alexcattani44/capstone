interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-2 w-full">
      <span className="text-[var(--color-text-primary)] text-[13px]">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-[22px] rounded-full transition-colors ${
          checked ? 'bg-[var(--color-accent-cyan)]' : 'bg-[var(--color-border-default)]'
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-[3px] size-4 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-[21px]' : 'translate-x-[3px]'
          }`}
        />
      </button>
    </div>
  );
}
