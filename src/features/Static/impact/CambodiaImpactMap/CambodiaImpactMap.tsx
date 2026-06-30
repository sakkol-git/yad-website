"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useRef } from "react";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { IMPACT_NODES, type ImpactNode } from "@/shared/constants/infographic-tokens";
import { ProvinceTooltip } from "./ProvinceTooltip";
import { ProvinceStatsPanel } from "./ProvinceStatsPanel";
import "./cambodia-impact-map.css";

const CambodiaMapClient = dynamic(() => import("./CambodiaMapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-surface-container-lowest">
      <div className="flex flex-col items-center gap-3">
        <span className="material-symbols-outlined text-primary animate-spin">refresh</span>
        <span className="text-sm font-label-bold uppercase tracking-widest text-on-surface-variant">Loading Map</span>
      </div>
    </div>
  ),
});

export function CambodiaImpactMap() {
  const [activeNode, setActiveNode] = useState<ImpactNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ImpactNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [sectionRef, isInView] = useInViewAnimation<HTMLElement>({ threshold: 0.2 });

  const maxStudents = Math.max(...IMPACT_NODES.map((n) => n.studentsReached));

  const handleNodeHover = useCallback((node: ImpactNode | null) => {
    setHoveredNode(node);
  }, []);

  const handleNodeClick = useCallback((node: ImpactNode) => {
    setActiveNode((prev) => (prev?.id === node.id ? null : node));
  }, []);

  const handleMapMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // Active provinces — provinces where YAD operates
  const activeProvinceNames = new Set(IMPACT_NODES.map((n) => n.geoName));

  return (
    <section
      ref={sectionRef}
      className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap"
    >
      {/* Section Header */}
      <RevealOnScroll className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-[1px] bg-primary" />
          <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
            Where We Work
          </span>
        </div>
        <TextReveal
          as="h2"
          text="Reaching Youth Across Cambodia."
          className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] text-primary tracking-tighter leading-[1.0] mb-4"
        />
        <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-2xl">
          From the capital to remote provinces, YAD builds pathways to education and opportunity for
          Cambodia&apos;s most vulnerable youth.
        </p>
      </RevealOnScroll>

      {/* Map + Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Map Column */}
        <div
          ref={mapContainerRef}
          className="lg:col-span-8 relative bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-ambient transition-shadow duration-500"
          onMouseMove={handleMapMouseMove}
          style={{ minHeight: 400 }}
        >
          {isInView && (
            <CambodiaMapClient
              nodes={IMPACT_NODES}
              activeProvinceNames={activeProvinceNames}
              activeNode={activeNode}
              hoveredNode={hoveredNode}
              maxStudents={maxStudents}
              onHoverNode={handleNodeHover}
              onClickNode={handleNodeClick}
            />
          )}

          {/* Tooltip overlay */}
          {hoveredNode && <ProvinceTooltip node={hoveredNode} x={tooltipPos.x} y={tooltipPos.y} />}

          {/* Accessibility: hidden data table */}
          <table className="sr-only" aria-label="YAD Cambodia impact locations">
            <thead>
              <tr>
                <th>Location</th>
                <th>Students Reached</th>
                <th>Programs</th>
                <th>Key Metric</th>
              </tr>
            </thead>
            <tbody>
              {IMPACT_NODES.map((node) => (
                <tr key={node.id}>
                  <td>{node.name}</td>
                  <td>{node.studentsReached}</td>
                  <td>{node.programTypes.join(", ")}</td>
                  <td>{node.keyMetric}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats Panel Column */}
        <div className="lg:col-span-4">
          <ProvinceStatsPanel
            nodes={IMPACT_NODES}
            activeNodeId={activeNode?.id ?? null}
            onSelectNode={handleNodeClick}
          />
        </div>
      </div>

      {/* Bottom Summary Strip */}
      <RevealOnScroll className="mt-8 pt-6 border-t border-outline-variant/30 grid grid-cols-3 gap-6">
        <div className="flex flex-col">
          <span className="kicker-label text-on-surface-variant/70 font-bold mb-1">
            Locations
          </span>
          <span className="text-lg font-medium text-on-surface">{IMPACT_NODES.length} Active</span>
        </div>
        <div className="flex flex-col">
          <span className="kicker-label text-on-surface-variant/70 font-bold mb-1">
            Total Students
          </span>
          <span className="text-lg font-medium text-on-surface">
            {IMPACT_NODES.reduce((s, n) => s + n.studentsReached, 0).toLocaleString()}+
          </span>
        </div>
        <div className="flex flex-col">
          <span className="kicker-label text-on-surface-variant/70 font-bold mb-1">
            Programs Active
          </span>
          <span className="text-lg font-medium text-on-surface">
            {new Set(IMPACT_NODES.flatMap((n) => n.programTypes)).size} Types
          </span>
        </div>
      </RevealOnScroll>
    </section>
  );
}
