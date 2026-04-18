import { useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-[1.8px]">
        Image Upload
      </h3>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative h-[165px] rounded-xl border-2 border-dashed border-[var(--color-border-default)] cursor-pointer hover:border-[var(--color-accent-cyan)] transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".dcm,.png,.jpg,.jpeg"
          onChange={handleChange}
          className="hidden"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <p className="text-[var(--color-text-primary)] text-sm font-semibold">
            Drop mammogram here
          </p>
          <p className="text-[var(--color-text-secondary)] text-xs">
            Supports DICOM, PNG, JPEG
          </p>
        </div>
      </div>
    </div>
  );
}
