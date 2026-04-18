export function Header() {
  return (
    <header className="sticky top-0 z-[2] h-16 w-full backdrop-blur-[10px] bg-[rgba(11,15,20,0.85)] border-b border-[var(--color-border-default)]">
      <div className="flex items-center justify-between h-full px-8">
        <div className="flex items-center gap-2.5">
          <div 
            className="flex items-center justify-center size-8 rounded-lg"
            style={{ backgroundImage: "linear-gradient(135deg, rgb(79, 195, 247) 0%, rgb(129, 212, 250) 100%)" }}
          >
            <span className="text-[#0b0f14] text-base font-bold">O</span>
          </div>
          <h1 className="text-[var(--color-text-primary)] text-[22px] font-bold">OpenMAIA</h1>
          <div className="ml-2 px-2 py-0.5 bg-[var(--color-accent-cyan-bg)] rounded">
            <span className="text-[var(--color-accent-cyan)] text-[10px] font-bold uppercase tracking-[1.5px]">
              Prototype
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[13px] text-[var(--color-text-secondary)]">
          <span>Open-Source Mammography AI Assistant</span>
          <span className="text-[var(--color-border-default)]">|</span>
          <span>v0.1.0</span>
        </div>
      </div>
    </header>
  );
}
