"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { gsap, ScrollTrigger, LENIS_EASE } from "./gsap-config";
import { useReducedMotion } from "./use-reduced-motion";

function GsapLenisSync({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return <>{children}</>;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Detect if device has a touch screen
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };
    setIsTouchDevice(checkTouch());
  }, []);

  // On reduced-motion or touch devices, skip Lenis entirely — fall back to native scroll.
  if (reducedMotion || isTouchDevice) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Adjusted from 0.1 for a more luxurious, softer scroll interpolation
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false, // never smooth touch scrolling — keep mobile native-feeling
        easing: LENIS_EASE,
      }}
    >
      <GsapLenisSync>{children}</GsapLenisSync>
    </ReactLenis>
  );
}
