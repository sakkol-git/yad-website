"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reduced) {
        ref.current.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
        return;
      }
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${obj.val.toLocaleString(undefined, {
              maximumFractionDigits: decimals,
            })}${suffix}`;
          }
        },
      });
    },
    { scope: ref, dependencies: [reduced, value, duration, prefix, suffix, decimals] },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
