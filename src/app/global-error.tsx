"use client";

import { Button } from "@/shared/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center relative overflow-hidden px-6">
          {/* 
            NOTE: Raw hex codes are used intentionally in this root-level error boundary.
            If the application fails catastrophically, CSS variables from globals.css 
            might not be loaded or evaluated. 
            #BA1A1A = error color
            #FDFDFD = surface color
          */}
          {/* Background ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#BA1A1A]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-lg mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-xl shadow-lg border border-black/10 p-12 md:p-16">
              <div className="w-16 h-16 bg-[#BA1A1A]/10 flex items-center justify-center mx-auto mb-8 border border-[#BA1A1A]/20">
                <span className="material-symbols-outlined text-[32px] text-[#BA1A1A]" aria-hidden="true">warning</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-light text-black tracking-tight mb-4">
                Something Went Wrong
              </h1>
              
              <p className="text-sm font-light text-gray-600 leading-relaxed mb-10">
                We encountered an unexpected problem. Please try refreshing the page.
              </p>

              <button 
                onClick={() => reset()} 
                className="w-full bg-[#BA1A1A] text-white flex items-center justify-center rounded-none uppercase tracking-widest text-[10px] font-bold h-14 hover:bg-[#BA1A1A]/90 transition-colors duration-150"
              >
                <span className="material-symbols-outlined text-[16px] mr-2" aria-hidden="true">refresh</span>
                Refresh Page
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
