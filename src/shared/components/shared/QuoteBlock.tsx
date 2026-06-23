"use client";

import { useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap, EASE } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import type { ReactNode } from "react";

interface QuoteBlockProps {
  children: ReactNode;
  className?: string;
}

export function QuoteBlock({ children, className }: QuoteBlockProps) {
  const quoteRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!quoteRef.current || reduced) return;
    gsap.fromTo(quoteRef.current, {
      scale: 0,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: EASE.snappy,
      onComplete: () => {
        if (quoteRef.current) {
          quoteRef.current.style.willChange = "auto";
        }
      },
      scrollTrigger: {
        trigger: quoteRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: quoteRef, dependencies: [reduced] });

  return (
    <blockquote
      className={cn(
        "relative bg-surface-container-low rounded-lg p-6 border-l-4 border-secondary",
        className
      )}
    >
      <span
        ref={quoteRef}
        className="absolute top-4 left-5 text-secondary/20 font-bold select-none"
        style={{ 
          fontSize: "4rem", 
          lineHeight: 1,
          ...(reduced ? {} : { opacity: 0, transform: "scale(0)", willChange: "transform, opacity" })
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <div className="font-body-lg text-body-lg text-on-surface italic pl-4 relative z-10">
        {children}
      </div>
    </blockquote>
  );
}
