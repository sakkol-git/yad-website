"use client";

import { AnimatedCounter } from "@/shared/components/animations/AnimatedCounter";
import { type ImpactNode } from "@/shared/constants/infographic-tokens";

interface ProvinceStatsPanelProps {
  nodes: ImpactNode[];
  activeNodeId: string | null;
  onSelectNode: (node: ImpactNode) => void;
}

export function ProvinceStatsPanel({ nodes, activeNodeId, onSelectNode }: ProvinceStatsPanelProps) {
  const totalStudents = nodes.reduce((sum, n) => sum + n.studentsReached, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Panel Header */}
      <div className="mb-4 pb-4 border-b border-outline-variant/30">
        <span className="kicker-label text-on-surface-variant/70 block mb-1">Total Reach</span>
        <div className="text-3xl font-light text-primary tracking-tighter">
          <AnimatedCounter value={totalStudents} suffix="+" />
        </div>
        <span className="text-xs text-on-surface-variant font-light">
          students across {nodes.length} locations
        </span>
      </div>

      {/* Province Cards — scrollable list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 -mr-1 lg:max-h-[400px]">
        {nodes
          .sort((a, b) => b.studentsReached - a.studentsReached)
          .map((node) => {
            const isActive = activeNodeId === node.id;
            return (
              <button
                key={node.id}
                onClick={() => onSelectNode(node)}
                className={`w-full text-left p-4 rounded-sm border transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-primary-container/20 border-primary/40"
                    : "bg-surface border-outline-variant/30 hover:border-primary/30 hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className={`text-sm font-bold tracking-tight ${isActive ? "text-primary" : "text-on-surface"}`}
                  >
                    {node.name}
                  </h4>
                  <span
                    className={`text-lg font-light tabular-nums tracking-tighter ${isActive ? "text-primary" : "text-on-surface-variant"}`}
                  >
                    {node.studentsReached}
                  </span>
                </div>

                {/* Program type pills */}
                <div className="flex flex-wrap gap-1">
                  {node.programTypes.map((type) => (
                    <span
                      key={type}
                      className="text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 bg-surface-variant/50 text-on-surface-variant rounded-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                {/* Key metric — shown when active */}
                {isActive && (
                  <p className="mt-2 pt-2 border-t border-outline-variant/20 text-xs text-on-surface-variant font-light">
                    {node.keyMetric}
                  </p>
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}
