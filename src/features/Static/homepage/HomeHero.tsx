"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

export function HomeHero() {
  return (
    // REDUCED: Padding top and bottom tightened for better viewport fitting
    <section className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Typographic Focus (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col z-10">
            <RevealOnScroll delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-[1px] bg-primary" />
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                  Youth Advancement For Development
                </span>
              </div>
            </RevealOnScroll>

            {/* Massive, Tension-filled Headline */}
            <RevealOnScroll delay={0.2}>
              <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] mb-6">
                Empowering <br className="hidden md:block" />
                Cambodia&apos;s <br className="hidden md:block" />
                <span className="font-light italic text-on-surface-variant">
                  next generation
                </span> <br className="hidden lg:block" />
                of leaders.
              </h1>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.3}>
              <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-sm mb-10">
                We provide vital education, safe housing, and life skills to youth from remote provinces and urban slum communities. A foundation for systemic change.
              </p>
            </RevealOnScroll>

            {/* Sleek, Premium CTA */}
            <RevealOnScroll delay={0.4}>
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 px-8 py-5 rounded-none text-xs tracking-[0.2em] uppercase font-semibold transition-colors w-fit"
              >
                <Link href="/donate">Fund a Future</Link>
              </Button>
            </RevealOnScroll>
          </div>

          {/* Right Column: Un-obscured Cinematic Image (7 Columns) */}
          {/* REDUCED: Height changed from 80vh to 60vh with a hard max-height */}
          <div className="lg:col-span-7 relative h-[50vh] lg:h-[60vh] max-h-[600px] min-h-[400px] w-full mt-10 lg:mt-0">
            <RevealOnScroll delay={0.3} className="w-full h-full relative">
              <Image
                src="/assets/images/yad-2.png"
                alt="Young Cambodian student looking thoughtfully into the distance"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </RevealOnScroll>
          </div>
        </div>

        {/* Structured Architectural Trust Signals (Bottom Grid) */}
        <RevealOnScroll delay={0.5}>
          {/* REDUCED: Pulled this up closer to the hero content (mt-16 instead of mt-24) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 lg:mt-16 pt-8 border-t border-outline-variant/30">

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 font-bold mb-1.5">
                Established
              </span>
              <span className="text-base md:text-lg font-medium text-on-surface">
                2015
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 font-bold mb-1.5">
                Impact Radius
              </span>
              <span className="text-base md:text-lg font-medium text-on-surface">
                500+ Weekly
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 font-bold mb-1.5">
                Location
              </span>
              <span className="text-base md:text-lg font-medium text-on-surface">
                Phnom Penh, KH
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 font-bold mb-1.5">
                Status
              </span>
              <span className="flex items-center gap-2 text-base md:text-lg font-medium text-on-surface">
                <span className="w-1.5 h-1.5 rounded-full bg-[#749D89] animate-pulse" />
                Independent NGO
              </span>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}