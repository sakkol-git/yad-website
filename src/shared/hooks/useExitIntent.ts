"use client";

import { useState, useEffect } from "react";

export function useExitIntent() {
  const [showExitToast, setShowExitToast] = useState(false);

  useEffect(() => {
    // Check if we've already shown it this session
    if (sessionStorage.getItem("exit-intent-shown")) {
      return;
    }

    let hasBeenOnPageLongEnough = false;
    
    // Gate: Must be on page for at least 30 seconds
    const timer = setTimeout(() => {
      hasBeenOnPageLongEnough = true;
    }, 30000);

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is moving toward the top of the viewport (y <= 0)
      if (e.clientY <= 0 && hasBeenOnPageLongEnough) {
        setShowExitToast(true);
        sessionStorage.setItem("exit-intent-shown", "true");
        
        // Auto-dismiss after 8 seconds
        setTimeout(() => {
          setShowExitToast(false);
        }, 8000);
      }
    };

    // Attach event listener to document
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const dismissExitToast = () => setShowExitToast(false);

  return { showExitToast, dismissExitToast };
}
