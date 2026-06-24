"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

/**
 * PageTransition — Apple-signature smooth page enter animation.
 *
 * Strategy: Rather than setting initial state to invisible (which causes FOUC on SSR),
 * we use GSAP to animate from a slight offset/opacity state after mount.
 * The content is visible by default; GSAP adds the "from" state via JS on the client only.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;

    // Kill any running tweens on this element
    gsap.killTweensOf(el);

    // Animate from slightly below + transparent to final position
    gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "opacity,transform",
      }
    );
  }, [pathname, reduced]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
