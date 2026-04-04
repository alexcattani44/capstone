interface FileCardProps {
  fileName: string;
  fileInfo: string;
}

export function FileCard({ fileName, fileInfo }: FileCardProps) {
  return (
    <div className="bg-[var(--color-bg-panel)] border border-[var(--color-accent-cyan)] rounded-lg p-3 w-full">
      <h4 className="text-[var(--color-text-primary)] text-xs font-semibold mb-1">
        {fileName}
      </h4>
      <p className="text-[var(--color-text-secondary)] text-[10px]">
        {fileInfo}
      </p>
    </div>
  );
}
