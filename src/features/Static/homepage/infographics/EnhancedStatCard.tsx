"use client";

import { AnimatedCounter } from "@/shared/components/animations/AnimatedCounter";
import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { CHART_HEX } from "@/shared/constants/infographic-tokens";

interface EnhancedStatCardProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
  /** 7-point sparkline data (trend over time) */
  sparklineData?: number[];
  /** Year-over-year change percentage */
  yoyDelta?: number;
  /** Optional human story hook */
  storyHook?: string;
}

/**
 * Mini sparkline rendered as a pure SVG polyline — no library needed.
 */
function MiniSparkline({ data }: { data: number[] }) {
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal || 1;
  const w = 120;
  const h = 40;
  const padding = 4;

  const points = data
    .map((val, i) => {
      const x = padding + (i / (data.length - 1)) * (w - padding * 2);
      const y = h - padding - ((val - minVal) / range) * (h - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  // Area fill path
  const firstX = padding;
  const lastX = padding + ((data.length - 1) / (data.length - 1)) * (w - padding * 2);
  const areaPath = `M ${firstX},${h} L ${points
    .split(" ")
    .map((p) => p)
    .join(" L ")} L ${lastX},${h} Z`;

  // Last data point coordinates
  const lastPoint = points.split(" ").pop()!;
  const [lx, ly] = lastPoint.split(",").map(Number);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      {/* Area fill */}
      <path d={areaPath} fill={CHART_HEX.primaryContainer} opacity={0.3} />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={CHART_HEX.primary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last data point dot */}
      <circle cx={lx} cy={ly} r={3} fill={CHART_HEX.primary} />
    </svg>
  );
}

export function EnhancedStatCard({
  value,
  suffix = "",
  decimals = 0,
  label,
  description,
  sparklineData,
  yoyDelta,
  storyHook,
}: EnhancedStatCardProps) {
  const [ref, isInView] = useInViewAnimation<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div
      ref={ref}
      className="group py-12 border-t border-outline-variant/30 first:border-t-0 lg:first:pt-0"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left: label + description */}
        <div className="max-w-xs">
          <h3 className="text-xl font-light text-on-surface mb-3 tracking-tight">{label}</h3>
          <p className="text-sm font-light text-on-surface-variant/80">{description}</p>
        </div>

        {/* Right: sparkline + counter + delta */}
        <div className="flex flex-col items-end gap-2">
          {/* Sparkline */}
          {sparklineData && sparklineData.length > 1 && (
            <div
              className={`transition-opacity duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}
            >
              <MiniSparkline data={sparklineData} />
            </div>
          )}

          {/* Counter */}
          <AnimatedCounter
            value={value}
            suffix={suffix}
            decimals={decimals}
            className="text-6xl md:text-7xl lg:text-8xl text-primary font-light tabular-nums tracking-tighter group-hover:text-secondary transition-colors duration-150 origin-bottom-right inline-block"
          />

          {/* YoY Delta */}
          {yoyDelta !== undefined && (
            <div
              className={`flex items-center gap-1 transition-all duration-500 delay-700 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <span
                className={`material-symbols-outlined text-sm ${
                  yoyDelta >= 0 ? "text-primary" : "text-error"
                }`}
              >
                {yoyDelta >= 0 ? "trending_up" : "trending_down"}
              </span>
              <span className="text-xs tabular-nums text-on-surface-variant font-light">
                {yoyDelta >= 0 ? "+" : ""}
                {yoyDelta}% from last year
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Human story hook */}
      {storyHook && (
        <div
          className={`mt-4 transition-all duration-500 delay-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-xs text-secondary hover:text-primary transition-colors cursor-pointer font-bold flex items-center gap-1">
            {storyHook}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>
      )}
    </div>
  );
}
