"use client";

import { MAP_TOKENS, type ImpactNode } from "@/shared/constants/infographic-tokens";

interface ImpactNodeProps {
  node: ImpactNode;
  index: number;
  isActive: boolean;
  onHover: (node: ImpactNode | null) => void;
  onClick: (node: ImpactNode) => void;
  /** Scale factor for the projection (used to size nodes proportionally) */
  maxStudents: number;
}

export function ImpactNodeMarker({
  node,
  index,
  isActive,
  onHover,
  onClick,
  maxStudents,
}: ImpactNodeProps) {
  // Radius proportional to studentsReached: min 6px, max 16px
  const minR = 6;
  const maxR = 16;
  const ratio = Math.min(node.studentsReached / maxStudents, 1);
  const r = minR + ratio * (maxR - minR);

  return (
    <g
      onMouseEnter={() => onHover(node)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick(node);
      }}
      tabIndex={0}
      role="button"
      aria-label={`${node.name}: ${node.studentsReached} students reached`}
      className="cursor-pointer focus-visible:outline-none"
    >
      {/* Pulse ring — animated background circle */}
      <circle
        r={r}
        fill={MAP_TOKENS.impactNodePulse}
        opacity={0.4}
        className="impact-node-pulse"
        data-delay={index % 4}
      />

      {/* Core node — solid circle */}
      <circle
        r={r * 0.6}
        fill={isActive ? MAP_TOKENS.impactNodeColor : MAP_TOKENS.impactNodePulse}
        stroke={MAP_TOKENS.impactNodeColor}
        strokeWidth={1.5}
        style={{
          transition: "fill 0.2s ease, r 0.2s ease",
        }}
      />
    </g>
  );
}
