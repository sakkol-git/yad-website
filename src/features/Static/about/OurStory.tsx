"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { CHART_HEX } from "@/shared/constants/infographic-tokens";

const ERAS = [
  {
    period: "2010 — 2014",
    label: "The Origin",
    title: "Attitude Centre for Education",
    abbr: "ACE",
    description:
      "Our journey began with a simple but profound mission: teaching Life Skills and English to children in poverty-stricken communities. Operating as an independent Cambodian NGO, we focused entirely on bringing accessible education to urban slums where traditional schooling was out of reach.",
    stat: "30",
    statLabel: "first students",
    programs: ["Life Skills", "English Literacy", "Urban Slum Outreach"],
  },
  {
    period: "2015 — 2021",
    label: "The Expansion",
    title: "Advanced Centre for Empowerment",
    abbr: "ACE 2.0",
    description:
      "As our impact grew, so did our vision. Rebranding to the Advanced Centre for Empowerment, we launched three pillars serving university students, malnourished children, and international volunteers.",
    stat: "400+",
    statLabel: "youth supported",
    programs: ["DLTC Dormitory", "Porridge for Hope", "Social Enterprise"],
  },
  {
    period: "2022 — Now",
    label: "Present Day",
    title: "Youth Advancement for Development",
    abbr: "YAD",
    description:
      "Today, we move forward under our new banner with modernised digital literacy and sustainable community development programmes, while remaining true to our core mission: to empower Cambodia's next generation of leaders.",
    stat: "743+",
    statLabel: "students empowered",
    programs: ["Digital Literacy", "Leadership Training", "Career Placement"],
  },
];

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (reduced) {
        // Show everything immediately
        if (lineRef.current) {
          gsap.set(lineRef.current, { strokeDashoffset: 0 });
        }
        nodeRefs.current.forEach((n) => n && gsap.set(n, { scale: 1, opacity: 1 }));
        cardRefs.current.forEach((c) => c && gsap.set(c, { opacity: 1, x: 0 }));
        return;
      }

      // Animate the vertical SVG line drawing downward
      if (lineRef.current) {
        const totalLength = lineRef.current.getTotalLength?.() ?? 600;
        gsap.set(lineRef.current, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1.2,
          },
        });
      }

      // Staggered node + card reveals
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        gsap.from(node, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: cardRefs.current[i] ?? sectionRef.current,
            start: "top 75%",
          },
        });
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -40 : 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
          },
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      ref={sectionRef}
      id="our-history"
      className="bg-surface py-20 lg:py-32 scroll-mt-32 border-t border-outline-variant/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Section Header */}
        <RevealOnScroll className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-outline-variant/30 pb-8">
          <TextReveal
            as="h2"
            text="Our evolution."
            className="text-[2.5rem] md:text-[3.5rem] text-on-surface tracking-tighter leading-[1.0] max-w-md"
          />
          <p className="text-base text-on-surface-variant font-light max-w-sm leading-relaxed">
            From grassroots community education to a comprehensive empowerment network — our journey defined by a singular commitment.
          </p>
        </RevealOnScroll>

        {/* Timeline Grid */}
        <div className="relative">

          {/* SVG vertical spine — desktop only */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block pointer-events-none" style={{ width: 2 }}>
            <svg width="2" height="100%" className="overflow-visible">
              <line
                ref={lineRef}
                x1="1" y1="0" x2="1" y2="100%"
                stroke={CHART_HEX.primary}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Mobile: simple left-border line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-[2px] md:hidden"
            style={{ backgroundColor: `${CHART_HEX.outlineVariant}` }}
          />

          <div className="space-y-16 lg:space-y-24">
            {ERAS.map((era, i) => {
              const isRight = i % 2 === 0; // Desktop: alternates left/right
              return (
                <div key={era.abbr} className="relative">

                  {/* Desktop layout: alternating sides */}
                  <div className={`hidden md:grid grid-cols-2 gap-16 items-center ${isRight ? "" : ""}`}>
                    
                    {/* Left content (or spacer) */}
                    <div className={isRight ? "text-right" : "col-start-2 row-start-1"}>
                      {isRight && (
                        <div
                          ref={(el) => { cardRefs.current[i] = el; }}
                          className="inline-block text-right"
                        >
                          <EraCard era={era} align="right" />
                        </div>
                      )}
                    </div>

                    {/* Center node */}
                    <div className={`${isRight ? "col-start-2" : "col-start-1"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}>
                      <svg width="48" height="48" viewBox="0 0 48 48" className="overflow-visible">
                        {/* Pulse ring */}
                        <circle cx="24" cy="24" r="18" fill={CHART_HEX.primaryContainer} opacity="0.25"
                          className="impact-node-pulse"
                          style={{ transformOrigin: "24px 24px" }}
                        />
                        {/* Solid node */}
                        <circle
                          ref={(el) => { nodeRefs.current[i] = el; }}
                          cx="24" cy="24" r="10"
                          fill={CHART_HEX.primary}
                          stroke={CHART_HEX.primaryContainer}
                          strokeWidth="3"
                        />
                        {/* Year label */}
                        <text
                          x="24" y="-8"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="700"
                          fontFamily="inherit"
                          fill={CHART_HEX.onSurface}
                          letterSpacing="0.1em"
                        >
                          {era.period.split("—")[0].trim()}
                        </text>
                      </svg>
                    </div>

                    {/* Right content (or spacer) */}
                    <div className={isRight ? "hidden" : "col-start-2"}>
                      <div ref={(el) => { cardRefs.current[i] = el; }}>
                        <EraCard era={era} align="left" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile layout: single column with left border */}
                  <div className="flex gap-8 md:hidden pl-20">
                    {/* Mobile node */}
                    <div className="absolute left-8 top-1 -translate-x-1/2">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <circle
                          ref={(el) => { if (!nodeRefs.current[i]) nodeRefs.current[i] = el; }}
                          cx="12" cy="12" r="7"
                          fill={CHART_HEX.primary}
                          stroke={CHART_HEX.primaryContainer}
                          strokeWidth="2.5"
                        />
                      </svg>
                    </div>
                    <div ref={(el) => { if (!cardRefs.current[i]) cardRefs.current[i] = el; }}>
                      <EraCard era={era} align="left" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Era Content Card ──────────────────────────────────────────────────────────
function EraCard({
  era,
  align,
}: {
  era: (typeof ERAS)[number];
  align: "left" | "right";
}) {
  return (
    <div className={`max-w-[480px] ${align === "right" ? "ml-auto" : ""}`}>
      {/* Label + Period */}
      <div className={`flex items-center gap-3 mb-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
          {era.label}
        </span>
        <div className="flex-1 h-[1px] bg-outline-variant/30" />
        <span className="text-xs tabular-nums font-light text-on-surface-variant">{era.period}</span>
      </div>

      {/* ABbr Badge */}
      <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-primary/30 text-primary mb-4 rounded-sm">
        {era.abbr}
      </span>

      {/* Title */}
      <h3 className={`text-2xl md:text-3xl text-on-surface tracking-tight leading-tight mb-3 ${align === "right" ? "text-right" : ""}`}>
        {era.title}
      </h3>

      {/* Description */}
      <p className={`text-sm text-on-surface-variant font-light leading-relaxed mb-5 ${align === "right" ? "text-right" : ""}`}>
        {era.description}
      </p>

      {/* Stat badge */}
      <div className={`flex items-center gap-4 mb-5 ${align === "right" ? "justify-end" : ""}`}>
        <span className="text-3xl font-light tabular-nums text-primary tracking-tighter">{era.stat}</span>
        <span className="text-xs text-on-surface-variant font-light">{era.statLabel}</span>
      </div>

      {/* Program pills */}
      <div className={`flex flex-wrap gap-2 ${align === "right" ? "justify-end" : ""}`}>
        {era.programs.map((p) => (
          <span
            key={p}
            className="text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 bg-primary-container/20 text-on-primary-container rounded-sm"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
