"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, DURATION, TRIGGER_START } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  y?: number;          // px to travel from, default 40
  x?: number;          // px to travel horizontally, optional
  delay?: number;
  duration?: number;
  start?: string;      // ScrollTrigger start position
  as?: "div" | "section" | "article" | "span" | "p";
}

export function RevealOnScroll({
  children,
  className,
  y = 40,
  x,
  delay = 0,
  duration = DURATION.base,
  start = TRIGGER_START,
  as: Tag = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reduced) {
        gsap.set(ref.current, { opacity: 1, y: 0, x: 0 });
        return;
      }

      const fromVars: any = { opacity: 0 };
      if (x !== undefined) {
        fromVars.x = x;
      } else {
        fromVars.y = y;
      }

      gsap.fromTo(ref.current,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: EASE.smooth,
          onComplete: () => {
            if (ref.current) {
              ref.current.style.willChange = "auto";
            }
          },
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref, dependencies: [reduced, y, x, delay, duration, start] }
  );

  // Determine initial server-side styles to prevent FOUC
  const initialStyle = reduced ? {} : {
    opacity: 0,
    transform: x !== undefined ? `translateX(${x}px)` : `translateY(${y}px)`,
    willChange: "opacity, transform"
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={className} style={initialStyle}>
      {children}
    </Comp>
  );
}
