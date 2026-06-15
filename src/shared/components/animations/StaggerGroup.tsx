"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, STAGGER, TRIGGER_START } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;   // optional scale-in, e.g. 0.95 → 1
  stagger?: number;
}

export function StaggerGroup({
  children,
  className,
  y = 32,
  scale,
  stagger = STAGGER.base,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const items = ref.current ? Array.from(ref.current.children) : [];
      if (!items.length) return;

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.from(items, {
        opacity: 0,
        y,
        ...(scale ? { scale } : {}),
        duration: 0.8,
        ease: EASE.smooth,
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: TRIGGER_START,
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref, dependencies: [reduced, y, scale, stagger] }
  );

  return <div ref={ref} className={className}>{children}</div>;
}
