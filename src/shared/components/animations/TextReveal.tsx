"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}

export function TextReveal({ text, className, as: Tag = "h2", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      const spans = ref.current?.querySelectorAll<HTMLElement>(".word-inner");
      if (!spans?.length) return;

      if (reduced) {
        gsap.set(spans, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.from(spans, {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: EASE.snappy,
        stagger: 0.045,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref, dependencies: [reduced, delay] }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] mr-[0.25em]">
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </Comp>
  );
}
