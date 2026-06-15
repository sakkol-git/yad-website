"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
  pinDuration?: string; // e.g. "+=100%" — how long (in viewport heights) to stay pinned
}

export function PinnedSection({ children, className, pinDuration = "+=100%" }: PinnedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;
      
      // Do not pin on mobile
      if (window.innerWidth < 768) return;
      
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: pinDuration,
        pin: true,
        pinSpacing: true,
      });
      return () => trigger.kill();
    },
    { scope: ref, dependencies: [reduced, pinDuration] }
  );

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
