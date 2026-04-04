interface MetadataItem {
  label: string;
  value: string;
}

interface MetadataPanelProps {
  metadata: MetadataItem[];
}

export function MetadataPanel({ metadata }: MetadataPanelProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-[1.8px]">
        DICOM Metadata
      </h3>
      <div className="bg-[var(--color-bg-darker)] rounded-lg p-3.5 flex flex-col gap-2">
        {metadata.map((item, index) => (
          <div key={index} className="flex items-start justify-between h-4">
            <span className="text-[var(--color-text-secondary)] text-xs">{item.label}</span>
            <span className="text-[var(--color-text-primary)] text-xs font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
