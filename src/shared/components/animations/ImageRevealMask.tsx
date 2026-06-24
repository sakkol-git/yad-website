"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, GSAP_PRESETS } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

export function ImageRevealMask({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: GSAP_PRESETS.CINEMATIC.duration,
          ease: GSAP_PRESETS.CINEMATIC.ease,
          onComplete: () => {
            if (ref.current) {
              ref.current.style.willChange = "auto";
            }
          },
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref, dependencies: [reduced] }
  );

  const initialStyle = reduced ? { overflow: "hidden" } : {
    overflow: "hidden",
    clipPath: "inset(100% 0% 0% 0%)",
    willChange: "clip-path"
  };

  return (
    <div ref={ref} className={className} style={initialStyle as React.CSSProperties}>
      {children}
    </div>
  );
}
