"use client";

import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { EFFICIENCY_DATA, CHART_HEX } from "@/shared/constants/infographic-tokens";

export function EfficiencyBars() {
  const [ref, isInView] = useInViewAnimation<HTMLDivElement>({ threshold: 0.4 });
  const maxCost = Math.max(...EFFICIENCY_DATA.map((d) => d.cost));

  return (
    <div ref={ref} className="space-y-6">
      {EFFICIENCY_DATA.map((item, i) => {
        const widthPercent = isInView ? (item.cost / maxCost) * 100 : 0;
        return (
          <div key={item.name} className="group">
            {/* Label Row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-primary-container/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <span className="text-sm font-light text-on-surface">{item.name}</span>
              </div>
              <span className="text-lg font-light tabular-nums text-primary tracking-tighter">
                ${item.cost.toLocaleString()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-surface-variant/50 rounded-none overflow-hidden">
              <div
                className="h-full rounded-none"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: CHART_HEX.primary,
                  transition: `width ${1.0 + i * 0.2}s cubic-bezier(0.05, 0.7, 0.1, 1)`,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Footer context */}
      <p className="text-xs text-on-surface-variant/70 font-light pt-4 border-t border-outline-variant/30">
        Cost-per-outcome metrics reflect direct program delivery costs, excluding shared overhead.
      </p>

      {/* Accessibility: hidden data table */}
      <table className="sr-only" aria-label="Program cost-per-outcome">
        <thead>
          <tr><th>Program</th><th>Cost (USD)</th></tr>
        </thead>
        <tbody>
          {EFFICIENCY_DATA.map((d) => (
            <tr key={d.name}><td>{d.name}</td><td>${d.cost}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
