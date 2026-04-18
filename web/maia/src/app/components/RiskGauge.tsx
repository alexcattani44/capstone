interface RiskGaugeProps {
  percentage: number;
}

export function RiskGauge({ percentage }: RiskGaugeProps) {
  // percentage comes in as e.g. 18.4 meaning 18.4%
  const clampedPct = Math.max(0, Math.min(35, percentage));

  // Map the 0-35% risk range to 0-100% of the gauge arc
  // (risk scores are capped at ~35% by inference.py)
  const gaugePosition = (clampedPct / 35) * 100;

  // Arc geometry — 180° semicircle
  const cx = 100;
  const cy = 90;
  const r = 70;
  const strokeWidth = 12;

  // Convert gauge position to angle (0% = left, 100% = right)
  const angle = (gaugePosition / 100) * Math.PI;
  const needleAngle = Math.PI - angle;

  // Needle tip position
  const needleLen = r - strokeWidth / 2 - 4;
  const nx = cx + needleLen * Math.cos(needleAngle);
  const ny = cy - needleLen * Math.sin(needleAngle);

  // Arc helper
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

  // Color zones mapped to gauge percentages:
  //   0-10% risk  → "Average"  → 0-28.6% of gauge (10/35)
  //   10-20% risk → "Elevated" → 28.6-57.1% of gauge (10/35)
  //   20-35% risk → "High"     → 57.1-100% of gauge (15/35)
  const zones = [
    { start: 0, end: (10 / 35) * 100, color: "#2E7D32" },       // Average (green)
    { start: (10 / 35) * 100, end: (20 / 35) * 100, color: "#F9A825" },  // Elevated (yellow)
    { start: (20 / 35) * 100, end: 100, color: "#C62828" },      // High (red)
  ];

  // Glow color based on risk percentage (actual %, not gauge position)
  const glowColor =
    percentage < 10 ? "#66BB6A" : percentage < 20 ? "#FFB74D" : "#EF5350";

  // Tick positions at the threshold boundaries: 0%, 10%, 20%, 35%
  const tickValues = [0, 10, 20, 35];
  const tickGaugePositions = tickValues.map((v) => (v / 35) * 100);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <svg viewBox="0 0 200 120" className="w-[180px] h-[130px]">
        {/* Glow filter */}
        <defs>
          <filter id="needleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
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

        {/* Tick marks at threshold boundaries */}
        {tickGaugePositions.map((tick, i) => {
          const tickAngle = Math.PI - (tick / 100) * Math.PI;
          const innerR = r + strokeWidth / 2 + 2;
          const outerR = r + strokeWidth / 2 + 6;
          const ix = cx + innerR * Math.cos(tickAngle);
          const iy = cy - innerR * Math.sin(tickAngle);
          const ox = cx + outerR * Math.cos(tickAngle);
          const oy = cy - outerR * Math.sin(tickAngle);

          // Label position
          const labelR = r + strokeWidth / 2 + 14;
          const lx = cx + labelR * Math.cos(tickAngle);
          const ly = cy - labelR * Math.sin(tickAngle);

          return (
            <g key={i}>
              <line
                x1={ix}
                y1={iy}
                x2={ox}
                y2={oy}
                stroke="var(--color-text-secondary, #6b7a8d)"
                strokeWidth={1}
                opacity={0.5}
              />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-text-secondary, #6b7a8d)"
                fontSize="7"
                opacity={0.7}
              >
                {tickValues[i]}%
              </text>
            </g>
          );
        })}

        {/* Zone labels along the arc */}
        {[
          { label: "Low", pct: (5 / 35) * 100 },
          { label: "Elevated", pct: (15 / 35) * 100 },
          { label: "High", pct: (27.5 / 35) * 100 },
        ].map(({ label, pct }) => {
          const a = Math.PI - (pct / 100) * Math.PI;
          const labelR = r - strokeWidth / 2 - 10;
          const lx = cx + labelR * Math.cos(a);
          const ly = cy - labelR * Math.sin(a);
          return (
            <text
              key={label}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-text-secondary, #6b7a8d)"
              fontSize="7"
              fontWeight="600"
              letterSpacing="0.5"
              textTransform="uppercase"
            >
              {label}
            </text>
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