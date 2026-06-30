"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

export function HorizontalScrollSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current || reduced) return;

      // Bail out on mobile
      if (window.innerWidth < 768) return;

      const track = trackRef.current;
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    },
    { scope: containerRef, dependencies: [reduced] },
  );

  return (
    <div ref={containerRef} className={className} style={{ overflow: "hidden" }}>
      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform md:will-change-auto md:w-max max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory"
      >
        {children}
      </div>
    </div>
  );
}
