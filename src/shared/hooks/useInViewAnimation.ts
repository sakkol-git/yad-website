"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface UseInViewAnimationOptions {
  /** Fraction of element visible before triggering (0-1). Default: 0.4 */
  threshold?: number;
  /** Only trigger once. Default: true */
  triggerOnce?: boolean;
  /** Root margin for early/late triggering */
  rootMargin?: string;
}

/**
 * Scroll-trigger hook for infographic components.
 * Returns [ref, isInView] — attach ref to the container element,
 * and use isInView to conditionally render/animate chart content.
 *
 * Respects prefers-reduced-motion by immediately returning true.
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewAnimationOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.4, triggerOnce = true, rootMargin = "0px" } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsInView(true);
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    // Respect reduced motion — show final state immediately
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, handleIntersect]);

  return [ref, isInView];
}
