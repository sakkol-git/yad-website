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
import { useGlowFollow } from "@/shared/hooks/useGlowFollow";

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

const VOICES_DATA = [
  {
    quote: "The digital literacy program completely changed my trajectory. I now have the skills to build websites and help local businesses transition online.",
    initial: "S",
    name: "Sokhem",
    role: "Alumni, 2023 Cohort"
  },
  {
    quote: "Living in the YAD dormitory provided me the safe space and community I needed to focus entirely on my university studies.",
    initial: "C",
    name: "Charya",
    role: "Current Resident"
  }
];

function VoiceCard({ voice }: { voice: typeof VOICES_DATA[number] }) {
  const { cardRef, glowRef, handleMouseMove, handleMouseLeave } = useGlowFollow();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group shrink-0 w-[85vw] md:w-[600px] rounded-md overflow-hidden"
    >
      {/* Card background */}
      <div className="
        absolute inset-0 z-0
        bg-surface-container-high dark:bg-surface-container-high 
        backdrop-blur-xl shadow-ambient border border-outline-variant/30 
        transition-[transform,border-color] duration-300 ease-out 
        group-hover:-translate-y-1 group-hover:border-outline-variant/60
      " />

      {/* Cursor-following ambient glow */}
      <div
        ref={glowRef}
        className="absolute w-48 h-48 rounded-full bg-primary/8 blur-2xl pointer-events-none transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2 z-[1]"
        style={{
          left: "var(--glow-x, 50%)",
          top: "var(--glow-y, 50%)",
          opacity: 0,
        }}
      />

      {/* Static tint on hover */}
      <div className="
        absolute inset-0 z-0
        bg-primary/[0.04]
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300 ease-out
        pointer-events-none
      " />

      <div className="p-10 md:p-12 relative z-10 flex flex-col h-full justify-between gap-10">
        <QuoteIcon colorClass="text-outline-variant/30" />
        <p className="text-xl md:text-2xl text-on-surface leading-relaxed font-light relative z-10 italic">
          &quot;{voice.quote}&quot;
        </p>
        <div className="flex items-center gap-4 mt-auto">
          <div className="w-12 h-12 bg-surface-variant/30 flex items-center justify-center">
            <span className="text-primary font-light text-lg rounded-full bg-surface-container-high dark:bg-surface-container-high border border-outline-variant/30 ">{voice.initial}</span>
          </div>
          <div>
            <div className="font-medium text-base text-on-surface">
              {voice.name}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mt-1">
              {voice.role}
            </div>
          </div>
        </div>
      </div>
    </div>
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

      <HorizontalScrollSection className="pl-4 sm:pl-6 lg:pl-8 max-w-[1400px] mx-auto py-8">
        {VOICES_DATA.map((voice, idx) => (
          <VoiceCard key={idx} voice={voice} />
        ))}
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
