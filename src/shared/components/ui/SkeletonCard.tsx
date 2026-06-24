"use client";

import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";

interface SkeletonCardProps {
  variant: "stat" | "list" | "activity";
  count?: number;
}

export function SkeletonCard({ variant, count = 3 }: SkeletonCardProps) {
  const reduced = useReducedMotion();
  const animationClass = reduced ? "bg-surface-container-highest" : "skeleton-shimmer";

  const renderContent = () => {
    switch (variant) {
      case "stat":
        return (
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-md-full ${animationClass}`} />
            <div className="flex flex-col gap-2 flex-1">
              <div className={`h-4 w-1/3 rounded-md-md ${animationClass}`} />
              <div className={`h-8 w-1/2 rounded-md-md ${animationClass}`} />
            </div>
          </div>
        );
      case "list":
        return (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-10 h-10 rounded-md-full ${animationClass}`} />
              <div className="flex flex-col gap-2 flex-1">
                <div className={`h-4 w-1/3 rounded-md-md ${animationClass}`} />
                <div className={`h-3 w-1/4 rounded-md-md ${animationClass}`} />
              </div>
            </div>
            <div className={`w-16 h-6 rounded-md-md ${animationClass}`} />
          </div>
        );
      case "activity":
        return (
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-md-full ${animationClass}`} />
            <div className="flex flex-col gap-2 flex-1">
              <div className={`h-4 w-full rounded-md-md ${animationClass}`} />
              <div className={`h-3 w-1/4 rounded-md-md ${animationClass}`} />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-surface/60 backdrop-blur-xl border border-outline-variant/30 shadow-ambient rounded-md-md p-6 relative overflow-hidden"
        >
          {renderContent()}
        </div>
      ))}
    </>
  );
}
