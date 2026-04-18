interface RiskGaugeProps {
  percentage: number;
}

export function RiskGauge({ percentage }: RiskGaugeProps) {
  const clampedPct = Math.max(0, Math.min(100, percentage));

  // Arc geometry — 180° semicircle
  const cx = 100;
  const cy = 90;
  const r = 70;
  const strokeWidth = 12;

  // Convert percentage to angle (0% = left, 100% = right)
  const angle = (clampedPct / 100) * Math.PI; // 0 to π
  const needleAngle = Math.PI - angle; // flip for SVG coords

  // Needle tip position
  const needleLen = r - strokeWidth / 2 - 4;
  const nx = cx + needleLen * Math.cos(needleAngle);
  const ny = cy - needleLen * Math.sin(needleAngle);

  // Arc helper: describes a semicircle arc from startAngle to endAngle
  const describeArc = (startPct: number, endPct: number) => {
    const startA = Math.PI - (startPct / 100) * Math.PI;
    const endA = Math.PI - (endPct / 100) * Math.PI;
    const x1 = cx + r * Math.cos(startA);
    const y1 = cy - r * Math.sin(startA);
    const x2 = cx + r * Math.cos(endA);
    const y2 = cy - r * Math.sin(endA);
    const largeArc = Math.abs(endPct - startPct) > 50 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Color zones: green (0-30%), yellow (30-60%), red (60-100%)
  const zones = [
    { start: 0, end: 30, color: "#2E7D32" },
    { start: 30, end: 60, color: "#F9A825" },
    { start: 60, end: 100, color: "#C62828" },
  ];

  // Active glow color based on percentage
  const glowColor =
    clampedPct < 30 ? "#66BB6A" : clampedPct < 60 ? "#FFB74D" : "#EF5350";

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <svg viewBox="0 0 200 110" className="w-[180px] h-[120px]">
        {/* Glow filter */}
        <defs>
          <filter id="needleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <path
          d={describeArc(0, 100)}
          fill="none"
          stroke="var(--color-bg-panel, #1a2332)"
          strokeWidth={strokeWidth + 2}
          strokeLinecap="round"
        />

        {/* Color zone arcs */}
        {zones.map((zone) => (
          <path
            key={zone.start}
            d={describeArc(zone.start, zone.end)}
            fill="none"
            stroke={zone.color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            opacity={0.5}
          />
        ))}

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const tickAngle = Math.PI - (tick / 100) * Math.PI;
          const innerR = r + strokeWidth / 2 + 2;
          const outerR = r + strokeWidth / 2 + 6;
          const ix = cx + innerR * Math.cos(tickAngle);
          const iy = cy - innerR * Math.sin(tickAngle);
          const ox = cx + outerR * Math.cos(tickAngle);
          const oy = cy - outerR * Math.sin(tickAngle);
          return (
            <line
              key={tick}
              x1={ix}
              y1={iy}
              x2={ox}
              y2={oy}
              stroke="var(--color-text-secondary, #6b7a8d)"
              strokeWidth={1}
              opacity={0.5}
            />
          );
        })}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke={glowColor}
          strokeWidth={2}
          strokeLinecap="round"
          filter="url(#needleGlow)"
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={4} fill={glowColor} opacity={0.9} />
        <circle
          cx={cx}
          cy={cy}
          r={2}
          fill="var(--color-bg-darker, #0b0f14)"
        />

        {/* Percentage text */}
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          dominantBaseline="hanging"
          fill="var(--color-text-primary, #e8edf3)"
          fontSize="18"
          fontWeight="700"
          fontFamily="inherit"
        >
          {percentage.toFixed(1)}%
        </text>
      </svg>
    </div>
  );
}