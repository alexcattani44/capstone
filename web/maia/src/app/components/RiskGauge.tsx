interface RiskGaugeProps {
  percentage: number;
}

export function RiskGauge({ percentage }: RiskGaugeProps) {
  // Calculate rotation angle (-90 to 90 degrees for 0-100%)
  const rotation = (percentage / 100) * 180 - 90;

  return (
    <div className="flex items-center justify-center h-[90px] w-full relative">
      {/* Semi-circle background */}
      <div className="relative w-[140px] h-[70px] overflow-hidden rounded-t-full">
        {/* Inner cutout */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] h-[50px] bg-[var(--color-bg-darker)] rounded-t-full" />
        
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 flex items-center justify-center"
          style={{
            width: '8.81px',
            height: '55.826px',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="flex-none"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'bottom center',
            }}
          >
            <div className="bg-white w-0.5 h-14 rounded-sm shadow-[0px_0px_6px_0px_rgba(255,255,255,0.3)]" />
          </div>
        </div>
      </div>
      
      {/* Percentage text */}
      <div className="absolute bottom-2 text-[var(--color-text-primary)] text-[22px] font-bold">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
}
