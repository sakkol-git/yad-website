"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { HorizontalScrollSection } from "@/shared/components/animations/HorizontalScrollSection";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

function QuoteIcon({ colorClass }: { colorClass: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || reduced) return;
    gsap.from(ref.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: EASE.snappy,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: ref, dependencies: [reduced] });

  return (
    <span ref={ref} className={`material-symbols-outlined absolute top-8 right-8 text-4xl ${colorClass}`}>
      format_quote
    </span>
  );
}

export function CommunityVoices() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[800px] aspect-square bg-tertiary/5 rounded-full blur-[100px] -z-10 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] aspect-square bg-secondary/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4 pointer-events-none" />

      <RevealOnScroll className="max-w-7xl mx-auto text-center mb-16 md:mb-24 relative z-10">
        <span className="text-tertiary font-semibold text-sm tracking-widest uppercase mb-4 block">
          Community Voices
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary max-w-3xl mx-auto leading-[1.1] tracking-tight">
          Hear from the <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Future Leaders</span>
        </h2>
        
        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-6 text-on-surface-variant font-label-md animate-pulse">
          <span className="material-symbols-outlined text-sm">swipe_left</span>
          <span>Swipe to read more</span>
        </div>
      </RevealOnScroll>

      <HorizontalScrollSection className="max-w-7xl mx-auto">
        <div className="bg-surface/80 backdrop-blur-xl border border-outline-variant/30 shadow-ambient hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative shrink-0 w-[85vw] md:w-[600px] rounded-[2rem] hover:-translate-y-2 transition-all duration-500 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
          <div className="p-10 md:p-12 relative z-10">
            <QuoteIcon colorClass="text-tertiary/20" />
            <p className="text-xl md:text-2xl text-on-surface leading-relaxed font-light mb-10 relative z-10 italic">
              &quot;The digital literacy program completely changed my trajectory.
              I now have the skills to build websites and help local businesses
              transition online.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-tertiary/20 to-tertiary/5 border border-tertiary/20 flex items-center justify-center shadow-inner">
                <span className="text-tertiary font-bold text-xl">S</span>
              </div>
              <div>
                <div className="font-bold text-lg text-on-surface">
                  Sokhem
                </div>
                <div className="text-sm font-medium text-on-surface-variant/80 uppercase tracking-wider">
                  Alumni, 2023 Cohort
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface/80 backdrop-blur-xl border border-outline-variant/30 shadow-ambient hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative shrink-0 w-[85vw] md:w-[600px] md:translate-y-12 rounded-[2rem] hover:-translate-y-2 transition-all duration-500 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
          <div className="p-10 md:p-12 relative z-10">
            <QuoteIcon colorClass="text-secondary/20" />
            <p className="text-xl md:text-2xl text-on-surface leading-relaxed font-light mb-10 relative z-10 italic">
              &quot;Living in the YAD dormitory provided me the safe space and
              community I needed to focus entirely on my university studies.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 flex items-center justify-center shadow-inner">
                <span className="text-secondary font-bold text-xl">C</span>
              </div>
              <div>
                <div className="font-bold text-lg text-on-surface">
                  Charya
                </div>
                <div className="text-sm font-medium text-on-surface-variant/80 uppercase tracking-wider">
                  Current Resident
                </div>
              </div>
            </div>
          </div>
        </div>
      </HorizontalScrollSection>

      <RevealOnScroll y={20} className="mt-20 text-center">
        <Link
          className="inline-flex items-center gap-2 text-primary hover:text-secondary font-label-bold transition-colors pb-1 border-b-2 border-primary/20 hover:border-secondary"
          href="/about"
        >
          Read more student stories
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </Link>
      </RevealOnScroll>
    </section>
  );
}
