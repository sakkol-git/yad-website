"use client";

import { MAP_TOKENS, type ImpactNode } from "@/shared/constants/infographic-tokens";

interface ProvinceTooltipProps {
  node: ImpactNode;
  x: number;
  y: number;
}

export function ProvinceTooltip({ node, x, y }: ProvinceTooltipProps) {
  return (
    <div
      className="absolute z-30 pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -110%)",
      }}
    >
      <div
        className="bg-surface/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl px-5 py-4 shadow-ambient min-w-[220px]"
        style={{ color: MAP_TOKENS.tooltipText }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-outline-variant/30">
          <h4 className="text-sm font-bold text-on-surface tracking-tight">{node.name}</h4>
          <span className="kicker-label text-primary">
            {node.studentsReached} students
          </span>
        </div>

        {/* Programs */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {node.programTypes.map((type) => (
            <span
              key={type}
              className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 bg-primary-container/30 text-on-primary-container rounded-sm"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Key Metric */}
        <p className="text-xs text-on-surface-variant font-light leading-relaxed">
          {node.keyMetric}
        </p>

        {/* Tooltip arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-surface border-b border-r border-outline-variant/30 rotate-45" />
      </div>
    </div>
  );
}
