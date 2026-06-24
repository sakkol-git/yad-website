"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * CustomCursor — Apple/Tesla-signature branded cursor.
 *
 * - Dot: instant, precise, mix-blend-difference for contrast on any background.
 * - Ring: lagging trail that creates a sense of "weight".
 * - Ring expands on hover over interactive elements (a, button, [data-cursor-hover]).
 * - Click triggers a burst/compress animation.
 * - Hidden entirely on touch/pointer:coarse devices via CSS + JS guard.
 * - Fully hidden until first mouse movement to prevent flash at top-left (0,0).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default hidden (SSR safe)

  useEffect(() => {
    // Detect touch — SSR-safe
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return; // Don't initialise anything on touch devices
    setIsTouchDevice(false);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Dot follows instantly
      gsap.set(dot, { x: e.clientX, y: e.clientY });

      // Ring lags behind — creates trailing weight
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // Expand ring on interactive elements
    const onHoverIn = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.5, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onHoverOut = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    // Click burst
    const onClick = () => {
      gsap.timeline()
        .to(ring, { scale: 0.8, duration: 0.1, ease: "power3.in" })
        .to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    };

    const hoverEls = document.querySelectorAll<Element>("a, button, [data-cursor-hover]");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    // Use MutationObserver to re-attach on dynamic DOM changes
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll<Element>("a, button, [data-cursor-hover]");
      newEls.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot — instant, precise */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {/* Ring — lagging, weighted */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border border-primary/60 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
