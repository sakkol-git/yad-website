"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { ALLOCATION_DATA, CHART_HEX } from "@/shared/constants/infographic-tokens";
import { CustomChartTooltip } from "./CustomChartTooltip";

const COLOR_MAP: Record<string, string> = {
  primary: CHART_HEX.primary,
  secondary: CHART_HEX.secondary,
  tertiary: CHART_HEX.tertiary,
  surfaceVariant: CHART_HEX.surfaceVariant,
};

export function AllocationDonut() {
  const [ref, isInView] = useInViewAnimation<HTMLDivElement>({ threshold: 0.4 });

  const chartData = ALLOCATION_DATA.map((d) => ({
    name: d.name,
    value: isInView ? d.percentage : 0,
    description: d.description,
    fill: COLOR_MAP[d.colorKey] || CHART_HEX.surfaceVariant,
  }));

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Chart */}
      <div className="relative w-full max-w-[320px] aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="62%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              animationBegin={0}
              animationDuration={1400}
              animationEasing="ease-out"
              stroke="none"
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.fill}
                  style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomChartTooltip valueFormatter={(v) => `${v}%`} />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-light text-primary tracking-tighter font-display-lg">
            100%
          </span>
          <span className="kicker-label text-on-surface-variant mt-1">of your donation</span>
        </div>
      </div>

      {/* Custom Legend — horizontal pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {ALLOCATION_DATA.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: COLOR_MAP[item.colorKey] }}
            />
            <span className="text-xs text-on-surface-variant font-light">
              {item.name} <span className="font-bold tabular-nums">{item.percentage}%</span>
            </span>
          </div>
        ))}
      </div>

      {/* Accessibility: hidden data table */}
      <table className="sr-only" aria-label="Donation allocation breakdown">
        <thead>
          <tr>
            <th>Category</th>
            <th>Percentage</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {ALLOCATION_DATA.map((d) => (
            <tr key={d.name}>
              <td>{d.name}</td>
              <td>{d.percentage}%</td>
              <td>{d.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
