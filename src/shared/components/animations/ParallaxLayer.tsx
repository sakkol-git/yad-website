"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.1 (subtle) – 0.4 (strong). Negative = moves up on scroll.
}

export function ParallaxLayer({ children, className, speed = 0.25 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;

      // Reduce speed for mobile devices
      const isMobile = window.innerWidth < 768;
      const actualSpeed = isMobile ? speed * 0.5 : speed;

      gsap.to(ref.current, {
        yPercent: actualSpeed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [reduced, speed] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
