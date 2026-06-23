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
    <section className="py-24 md:py-32 bg-surface relative overflow-hidden border-t border-outline-variant/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <RevealOnScroll className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="block text-primary uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
              Community Voices
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-primary tracking-tighter leading-[1.0]">
              Hear from the <br className="hidden md:block" /> Future Leaders.
            </h2>
          </div>
          <p className="text-base text-on-surface-variant font-light max-w-md leading-relaxed">
            Real stories from the students and alumni whose lives have been transformed through our strategic interventions.
          </p>
        </RevealOnScroll>
      </div>

      <HorizontalScrollSection className="pl-4 sm:pl-6 lg:pl-8 max-w-[1400px] mx-auto">
        <div className="bg-surface border border-outline-variant/30 relative shrink-0 w-[85vw] md:w-[600px] transition-all duration-500 overflow-hidden group">
          <div className="p-10 md:p-12 relative z-10 flex flex-col h-full justify-between gap-10">
            <QuoteIcon colorClass="text-outline-variant/30" />
            <p className="text-xl md:text-2xl text-on-surface leading-relaxed font-light relative z-10 italic">
              &quot;The digital literacy program completely changed my trajectory.
              I now have the skills to build websites and help local businesses
              transition online.&quot;
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 bg-surface-variant/30 flex items-center justify-center">
                <span className="text-primary font-light text-lg">S</span>
              </div>
              <div>
                <div className="font-medium text-base text-on-surface">
                  Sokhem
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mt-1">
                  Alumni, 2023 Cohort
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant/30 relative shrink-0 w-[85vw] md:w-[600px] transition-all duration-500 overflow-hidden group">
          <div className="p-10 md:p-12 relative z-10 flex flex-col h-full justify-between gap-10">
            <QuoteIcon colorClass="text-outline-variant/30" />
            <p className="text-xl md:text-2xl text-on-surface leading-relaxed font-light relative z-10 italic">
              &quot;Living in the YAD dormitory provided me the safe space and
              community I needed to focus entirely on my university studies.&quot;
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 bg-surface-variant/30 flex items-center justify-center">
                <span className="text-primary font-light text-lg">C</span>
              </div>
              <div>
                <div className="font-medium text-base text-on-surface">
                  Charya
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mt-1">
                  Current Resident
                </div>
              </div>
            </div>
          </div>
        </div>
      </HorizontalScrollSection>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <RevealOnScroll y={20} className="mt-20">
          <Link
            className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.1em] text-[10px] font-bold hover:text-secondary transition-colors group w-fit"
            href="/about"
          >
            Read more student stories
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
