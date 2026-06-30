"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { GROWTH_DATA, CHART_HEX } from "@/shared/constants/infographic-tokens";
import { CustomChartTooltip } from "./CustomChartTooltip";

type MetricKey = "studentsServed" | "graduates";

const METRIC_LABELS: Record<MetricKey, string> = {
  studentsServed: "Students Served",
  graduates: "Graduates",
};

const METRIC_COLORS: Record<MetricKey, string> = {
  studentsServed: CHART_HEX.primary,
  graduates: CHART_HEX.tertiary,
};

export function GrowthBarChart() {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("studentsServed");
  const [ref, isInView] = useInViewAnimation<HTMLDivElement>({ threshold: 0.3 });

  const chartData = GROWTH_DATA.map((d) => ({
    year: d.year,
    value: isInView ? d[activeMetric] : 0,
  }));

  return (
    <div ref={ref}>
      {/* Metric Toggle Tabs */}
      <div className="flex border-b border-outline-variant/30 mb-8 gap-6">
        {(Object.keys(METRIC_LABELS) as MetricKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveMetric(key)}
            className={`pb-3 font-bold text-[10px] uppercase tracking-widest border-b-2 transition-colors duration-150 cursor-pointer ${
              activeMetric === key
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {METRIC_LABELS[key]}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke={CHART_HEX.outlineVariant}
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: CHART_HEX.onSurfaceVariant, fontFamily: "inherit" }}
              tickLine={false}
              axisLine={{ stroke: CHART_HEX.outlineVariant }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: CHART_HEX.onSurfaceVariant, fontFamily: "inherit" }}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip content={<CustomChartTooltip />} />
            <ReferenceLine
              x={GROWTH_DATA[0].year}
              stroke={CHART_HEX.outlineVariant}
              strokeDasharray="3 3"
              label={{
                value: "Program Launch",
                position: "top",
                fontSize: 10,
                fill: CHART_HEX.onSurfaceVariant,
              }}
            />
            <Bar
              dataKey="value"
              name={METRIC_LABELS[activeMetric]}
              fill={METRIC_COLORS[activeMetric]}
              radius={[4, 4, 0, 0]}
              animationDuration={1400}
              animationEasing="ease-out"
              maxBarSize={56}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Accessibility: hidden data table */}
      <table className="sr-only" aria-label="Year-over-year growth data">
        <thead>
          <tr>
            <th>Year</th>
            <th>Students Served</th>
            <th>Graduates</th>
          </tr>
        </thead>
        <tbody>
          {GROWTH_DATA.map((d) => (
            <tr key={d.year}>
              <td>{d.year}</td>
              <td>{d.studentsServed}</td>
              <td>{d.graduates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
