"use client";

import { useEffect } from "react";
import { Button } from "@/shared/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-error/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="bg-surface/60 backdrop-blur-xl shadow-ambient border border-outline-variant/30 p-12 md:p-16">
          <div className="w-16 h-16 bg-error/10 flex items-center justify-center mx-auto mb-8 border border-error/20">
            <span className="material-symbols-outlined text-[32px] text-error" aria-hidden="true">warning</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light text-on-surface tracking-tight mb-4">
            Something Went Wrong
          </h1>
          
          <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-10">
            Something didn&apos;t work as expected. Our team has been notified. Please try again.
          </p>

          <Button 
            onClick={() => reset()} 
            variant="default" 
            size="lg" 
            className="w-full bg-error text-white rounded-md uppercase tracking-widest text-[10px] font-bold h-14 hover:bg-error/90 transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-[16px] mr-2" aria-hidden="true">refresh</span>
            Try Again
          </Button>
        </div>
      </div>
    </main>
  );
}
