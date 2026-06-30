import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

/**
 * useMagneticHover — Apple-signature magnetic cursor attraction on primary CTAs.
 * The button subtly "attracts" the cursor on proximity, spring-releasing on leave.
 *
 * @param strength — How far (as proportion of cursor delta) the button moves. Default 0.3.
 */
export function useMagneticHover(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reduced || isTouch.current) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from cursor to button center, scaled by strength
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [strength, reduced],
  );

  const handleMouseLeave = useCallback(() => {
    if (reduced || isTouch.current) return;
    // Spring-back with elastic rubber-band physics
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  }, [reduced]);

  return { ref, handleMouseMove, handleMouseLeave };
}
