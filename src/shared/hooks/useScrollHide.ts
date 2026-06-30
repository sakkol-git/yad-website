import { useState, useEffect, useRef } from "react";

export function useScrollHide(isMenuOpen: boolean = false, threshold: number = 50, hideThreshold: number = 120) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background effect
      if (currentScrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show effect
      if (currentScrollY > hideThreshold) {
        const scrollDifference = currentScrollY - lastScrollY.current;
        // Require at least a 5px scroll to change state (prevents trackpad bounce glitch)
        if (Math.abs(scrollDifference) > 5) {
          if (scrollDifference > 0 && !isMenuOpen) {
            setIsHidden(true); // scrolling down
          } else {
            setIsHidden(false); // scrolling up
          }
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, threshold, hideThreshold]);

  return { isScrolled, isHidden };
}
