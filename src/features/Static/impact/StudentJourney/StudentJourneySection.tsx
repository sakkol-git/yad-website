"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { JOURNEY_STAGES, CHART_HEX } from "@/shared/constants/infographic-tokens";
import { StageCard } from "./StageCard";

export function StudentJourneySection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(reduced ? JOURNEY_STAGES.length - 1 : -1);

  // Desktop: GSAP ScrollTrigger drives progress + stage activation
  useGSAP(
    () => {
      if (reduced || !sectionRef.current || !progressRef.current) return;

      // Pin the section and drive progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom 60%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            // Determine which stage is active based on scroll progress
            const idx = Math.min(
              Math.floor(progress * JOURNEY_STAGES.length),
              JOURNEY_STAGES.length - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // Animate the vertical progress line
      tl.fromTo(
        progressRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none" }
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === sectionRef.current) t.kill();
        });
      };
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  // Reduced motion: show all stages immediately
  useEffect(() => {
    if (reduced) setActiveIndex(JOURNEY_STAGES.length - 1);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap"
    >
      {/* Section Header */}
      <RevealOnScroll className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-[1px] bg-primary" />
          <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
            The Student Pipeline
          </span>
        </div>
        <TextReveal
          as="h2"
          text="Journey of a Student."
          className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] text-primary tracking-tighter leading-[1.0] mb-4"
        />
        <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-2xl">
          From rural discovery to career placement — every stage of the YAD pipeline is designed
          to maximize each student&apos;s potential. Scroll to follow the journey.
        </p>
      </RevealOnScroll>

      {/* Journey Timeline */}
      <div className="relative">
        {/* Vertical progress line (left side) */}
        <div className="absolute left-6 md:left-10 top-0 bottom-0 w-[2px] bg-outline-variant/30">
          <div
            ref={progressRef}
            className="w-full origin-top"
            style={{
              backgroundColor: CHART_HEX.primary,
              height: "100%",
              transformOrigin: "top",
              transform: reduced ? "scaleY(1)" : "scaleY(0)",
            }}
          />
        </div>

        {/* Stage Cards — vertical timeline */}
        <div className="space-y-8 pl-16 md:pl-24">
          {JOURNEY_STAGES.map((stage, i) => {
            const isActive = i <= activeIndex;
            return (
              <div key={stage.id} className="relative">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[calc(2.5rem+5px)] md:-left-[calc(3.5rem+5px)] top-6 w-3 h-3 rounded-full border-2 transition-colors duration-300"
                  style={{
                    borderColor: CHART_HEX.primary,
                    backgroundColor: isActive ? CHART_HEX.primary : "transparent",
                  }}
                />
                <StageCard stage={stage} isActive={isActive} index={i} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessibility: hidden data table */}
      <table className="sr-only" aria-label="Student journey stages">
        <thead>
          <tr><th>Stage</th><th>Title</th><th>Description</th><th>Key Stat</th></tr>
        </thead>
        <tbody>
          {JOURNEY_STAGES.map((s, i) => (
            <tr key={s.id}><td>{i + 1}</td><td>{s.title}</td><td>{s.description}</td><td>{s.statNumber} {s.statLabel}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
