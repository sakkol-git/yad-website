import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    force3D: true, // Forces GPU acceleration for perfectly smooth transforms
  });
}

export const EASE = {
  smooth: "power3.out", // Softened from expo.out for a smoother reveal
  smoothInOut: "expo.inOut",
  snappy: "power4.out",
  linear: "none",
} as const;

export const DURATION = {
  fast: 0.4,
  base: 1.2, // Increased from 0.9 to make the animation feel less abrupt
  slow: 1.5,
  hero: 2.2,
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.12,
  loose: 0.2,
} as const;

// Default ScrollTrigger start position — content reveals once it's ~85% into view
export const TRIGGER_START = "top 85%";

// Lenis easing curve (expo-out) — used by lenis-provider
export const LENIS_EASE = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

export { gsap, ScrollTrigger };
