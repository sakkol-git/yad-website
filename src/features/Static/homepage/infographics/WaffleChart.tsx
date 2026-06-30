"use client";

import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { CHART_HEX } from "@/shared/constants/infographic-tokens";

interface WaffleChartProps {
  /** Total students to visualize */
  total: number;
  /** Breakdown by program type */
  programs: {
    name: string;
    count: number;
    colorKey: "primary" | "secondary" | "tertiary" | "surfaceVariant";
  }[];
  /** How many students each cell represents */
  cellValue?: number;
}

const COLOR_MAP: Record<string, string> = {
  primary: CHART_HEX.primary,
  secondary: CHART_HEX.secondary,
  tertiary: CHART_HEX.tertiary,
  surfaceVariant: CHART_HEX.surfaceVariant,
};

export function WaffleChart({ programs, cellValue = 10 }: WaffleChartProps) {
  const [ref, isInView] = useInViewAnimation<HTMLDivElement>({ threshold: 0.3 });

  // Build cell array with color assignments
  const cells: { color: string; programName: string }[] = [];
  for (const program of programs) {
    const cellCount = Math.round(program.count / cellValue);
    for (let i = 0; i < cellCount; i++) {
      cells.push({
        color: COLOR_MAP[program.colorKey] || CHART_HEX.surfaceVariant,
        programName: program.name,
      });
    }
  }

  return (
    <div ref={ref}>
      {/* Grid */}
      <div className="flex flex-wrap gap-[3px]">
        {cells.map((cell, i) => (
          <div
            key={i}
            className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-[1px]"
            title={`${cell.programName} (1 cell = ${cellValue} students)`}
            style={{
              backgroundColor: cell.color,
              opacity: isInView ? 1 : 0,
              transform: isInView ? "scale(1)" : "scale(0.6)",
              transition: `opacity 0.4s ease ${i * 20}ms, transform 0.4s ease ${i * 20}ms`,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-outline-variant/30">
        <span className="kicker-label text-on-surface-variant/70">
          Each square = {cellValue} students
        </span>
        <div className="flex flex-wrap gap-3 ml-auto">
          {programs.map((p) => (
            <div key={p.name} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-[1px]"
                style={{ backgroundColor: COLOR_MAP[p.colorKey] }}
              />
              <span className="text-xs text-on-surface-variant font-light">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility: hidden data table */}
      <table className="sr-only" aria-label="Student distribution by program">
        <thead>
          <tr>
            <th>Program</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p) => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
