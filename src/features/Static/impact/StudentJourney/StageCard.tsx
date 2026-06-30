"use client";

import { JOURNEY_STAGES, CHART_HEX } from "@/shared/constants/infographic-tokens";

interface StageCardProps {
  stage: (typeof JOURNEY_STAGES)[number];
  isActive: boolean;
  index: number;
}

export function StageCard({ stage, isActive, index }: StageCardProps) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isActive
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      <div
        className={`relative p-6 border rounded-sm transition-colors duration-300 ${
          isActive
            ? "bg-surface border-primary/30"
            : "bg-surface-container-low border-outline-variant/30"
        }`}
      >
        {/* Stage number */}
        <span className="absolute -top-3 left-4 bg-surface px-2 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
          Stage {index + 1}
        </span>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-sm flex items-center justify-center"
            style={{
              backgroundColor: isActive ? CHART_HEX.primary : CHART_HEX.surfaceVariant,
              color: isActive ? "#ffffff" : CHART_HEX.onSurfaceVariant,
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            <span className="material-symbols-outlined text-[20px]">{stage.icon}</span>
          </div>
          <h4 className="text-base font-bold text-on-surface tracking-tight">{stage.title}</h4>
        </div>

        {/* Description */}
        <p className="text-sm text-on-surface-variant font-light leading-relaxed mb-4">
          {stage.description}
        </p>

        {/* Stat */}
        <div className="flex items-end gap-2 mb-2">
          <span className="text-3xl font-light text-primary tracking-tighter tabular-nums">
            {stage.statNumber}
          </span>
          <span className="text-xs text-on-surface-variant font-light pb-1">{stage.statLabel}</span>
        </div>

        {/* Donor impact callout */}
        {stage.donorImpact && (
          <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-secondary">volunteer_activism</span>
            <span className="text-xs text-secondary font-bold">{stage.donorImpact}</span>
          </div>
        )}
      </div>
    </div>
  );
}
