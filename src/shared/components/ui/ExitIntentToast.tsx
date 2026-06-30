"use client";

import Link from "next/link";
import { useExitIntent } from "@/shared/hooks/useExitIntent";

export function ExitIntentToast() {
  const { showExitToast, dismissExitToast } = useExitIntent();

  if (!showExitToast) return null;

  return (
    <div
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] max-w-sm w-full bg-surface/90 backdrop-blur-xl border border-outline-variant/30 shadow-ambient rounded-md p-6 animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out"
      role="dialog"
      aria-labelledby="exit-intent-title"
    >
      <button
        onClick={dismissExitToast}
        className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
        aria-label="Close message"
      >
        <span className="material-symbols-outlined text-xl">close</span>
      </button>

      <div className="flex flex-col gap-4">
        <h3 id="exit-intent-title" className="text-lg font-light text-primary pr-6">
          Before you go — a child is waiting for a sponsor today.
        </h3>

        <Link
          href="/donate"
          onClick={dismissExitToast}
          className="inline-flex items-center justify-center h-10 px-6 kicker-label bg-primary text-white hover:bg-primary/90 transition-colors w-fit"
        >
          Fund a Future
        </Link>
      </div>
    </div>
  );
}
