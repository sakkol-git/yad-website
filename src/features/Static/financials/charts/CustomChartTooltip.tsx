"use client";

import { CHART_HEX } from "@/shared/constants/infographic-tokens";

interface CustomChartTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string;
  /** Custom formatter for the value display */
  valueFormatter?: (value: number) => string;
}

/**
 * Shared MD3-styled tooltip for all Recharts components.
 * Uses Surface Container High elevation styling.
 */
export function CustomChartTooltip({
  active,
  payload,
  label,
  valueFormatter = (v) => v.toLocaleString(),
}: CustomChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="bg-surface-container-high border border-outline-variant/30 rounded-sm px-4 py-3 shadow-lg"
      style={{ color: CHART_HEX.onSurface }}
    >
      {label && (
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-2">
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: entry.color || entry.fill }}
          />
          <span className="text-on-surface-variant font-light">{entry.name}:</span>
          <span className="font-bold text-on-surface tabular-nums">
            {valueFormatter(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
