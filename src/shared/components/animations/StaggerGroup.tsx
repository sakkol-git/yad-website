"use client";

import React, { useRef, useId, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, GSAP_PRESETS, TRIGGER_START } from "@/shared/lib/animations/gsap-config";
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
  stagger = GSAP_PRESETS.STAGGER.stagger.amount,
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

      gsap.fromTo(items, {
        opacity: 0,
        y,
        ...(scale ? { scale } : {}),
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: GSAP_PRESETS.STAGGER.duration,
        ease: GSAP_PRESETS.STAGGER.ease,
        stagger: {
          amount: stagger,
          from: GSAP_PRESETS.STAGGER.stagger.from,
          ease: GSAP_PRESETS.STAGGER.stagger.ease,
        },
        onComplete: () => {
          items.forEach((item) => {
            (item as HTMLElement).style.willChange = "auto";
          });
        },
        scrollTrigger: {
          trigger: ref.current,
          start: TRIGGER_START,
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref, dependencies: [reduced, y, scale, stagger] }
  );

  const id = useId().replace(/:/g, "");
  const styleId = `stagger-${id}`;

  return (
    <>
      {!reduced && (
        <style dangerouslySetInnerHTML={{ __html: `
          .${styleId} > * {
            opacity: 0;
            transform: translateY(${y}px) ${scale ? `scale(${scale})` : ''};
            will-change: opacity, transform;
          }
        `}} />
      )}
      <div ref={ref} className={`${className || ''} ${styleId}`}>{children}</div>
    </>
  );
}
