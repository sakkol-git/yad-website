import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    force3D: true, // Forces GPU acceleration for perfectly smooth transforms
  });
}

export const EASE = {
  smooth: "power3.out",
  smoothInOut: "expo.inOut",
  snappy: "power4.out",
  linear: "none",
} as const;

export const DURATION = {
  fast: 0.4,
  base: 1.5,
  slow: 1.8,
  hero: 2.2,
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.12,
  loose: 0.2,
} as const;

// Default ScrollTrigger start position — content reveals once it's ~85% into view
export const TRIGGER_START = "top 85%";

// ---------------------------------------------------------------------------
// Apple/Tesla-signature physics-based animation presets
// ---------------------------------------------------------------------------

export const GSAP_PRESETS = {
  /**
   * CINEMATIC — Hero text and large reveals.
   * Extremely fast start, ultra-slow settle — authoritative and weighty.
   */
  CINEMATIC: {
    duration: 1.8,
    ease: "expo.out",
  },

  /**
   * REVEAL — Card entrances and section reveals.
   * Snappy entry, gentle landing.
   */
  REVEAL: {
    duration: 1.2,
    ease: "power4.out",
  },

  /**
   * MICRO — Hover responses and micro-interactions.
   * Must feel instant.
   */
  MICRO: {
    duration: 0.4,
    ease: "power2.out",
  },

  /**
   * EXIT — Elements leaving viewport.
   * Accelerates OUT — objects gain speed as they leave.
   */
  EXIT: {
    duration: 0.6,
    ease: "power2.in",
  },

  /**
   * STAGGER — Tesla-style sequential cascade for lists.
   * Stagger itself accelerates (reading direction, top to bottom).
   */
  STAGGER: {
    duration: 1.0,
    ease: "power3.out",
    stagger: {
      amount: 0.5,
      from: "start" as const,
      ease: "power1.in",
    },
  },
} as const;

// Lenis easing curve (expo-out) — used by lenis-provider
export const LENIS_EASE = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

export { gsap, ScrollTrigger };
