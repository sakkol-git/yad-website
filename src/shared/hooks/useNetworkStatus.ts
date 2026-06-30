"use client";

import { useState, useEffect } from "react";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Only access navigator when running on the client
    if (typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine);

      const goOnline = () => setIsOnline(true);
      const goOffline = () => setIsOnline(false);

      window.addEventListener("online", goOnline);
      window.addEventListener("offline", goOffline);

      // Detect slow connections (2G/3G) via Network Information API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const connection = (navigator as any).connection;
      const checkSpeed = () => {
        if (connection) {
          setIsSlowConnection(
            connection.effectiveType === "2g" ||
              connection.effectiveType === "slow-2g" ||
              connection.downlink < 1.5,
          );
        }
      };

      if (connection) {
        checkSpeed();
        connection.addEventListener("change", checkSpeed);
      }

      return () => {
        window.removeEventListener("online", goOnline);
        window.removeEventListener("offline", goOffline);
        if (connection) {
          connection.removeEventListener("change", checkSpeed);
        }
      };
    }
  }, []);

  return { isOnline, isSlowConnection };
}
