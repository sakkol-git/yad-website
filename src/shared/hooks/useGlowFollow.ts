import { useRef, useCallback } from "react";

/**
 * useGlowFollow — Glassmorphic ambient glow that follows cursor within a card.
 *
 * Usage: Attach cardRef to the card container and glowRef to an absolutely
 * positioned div inside it. Connect handleMouseMove / handleMouseLeave to
 * the card's onMouseMove / onMouseLeave events.
 *
 * The glow position is driven by CSS custom properties (--glow-x, --glow-y)
 * set directly on the glow element for maximum performance.
 */
export function useGlowFollow() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.setProperty("--glow-x", `${x}px`);
    glow.style.setProperty("--glow-y", `${y}px`);
    glow.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.opacity = "0";
  }, []);

  return { cardRef, glowRef, handleMouseMove, handleMouseLeave };
}
