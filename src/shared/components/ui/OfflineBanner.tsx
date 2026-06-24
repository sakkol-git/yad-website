"use client";

import { useNetworkStatus } from "@/shared/hooks/useNetworkStatus";

export function OfflineBanner() {
  const { isOnline } = useNetworkStatus();
  
  return (
    <div 
      className={`
        fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]
        bg-surface/80 backdrop-blur-xl border border-outline-variant/30
        shadow-ambient rounded-md px-6 py-3
        flex items-center gap-3
        transition-[opacity,transform] duration-300 ease-in-out
        ${isOnline ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}
      `}
      role="alert"
      aria-live="assertive"
    >
      <span className="w-2 h-2 rounded-full bg-error animate-pulse" aria-hidden="true" />
      <p className="font-label-md text-sm text-on-surface">
        You&apos;re offline. Some features may be unavailable.
      </p>
    </div>
  );
}
