"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import heroImg from "../../../../public/assets/images/yad-5.png";

export function ImpactHero() {
  return (
    <section className="relative w-full bg-surface pt-36 pb-16 lg:pt-48 lg:pb-20 overflow-hidden border-b border-outline-variant/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-container-max">
        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Typographic Focus */}
          <div className="lg:col-span-5 flex flex-col z-10">
            <RevealOnScroll delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-[1px] bg-primary" />
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                  Impact Report 2026
                </span>
              </div>
            </RevealOnScroll>

            {/* Massive, Tension-filled Headline */}
            <TextReveal
              as="h1"
              text="Measuring what Matters."
              className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] mb-6"
              delay={0.2}
            />

            {/* Subtext */}
            <RevealOnScroll delay={0.3}>
              <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-sm mb-10">
                Beyond the numbers, our true impact is measured in trajectories changed. We believe
                in radical transparency and rigorous evaluation of every dollar spent and every life
                touched.
              </p>
            </RevealOnScroll>
          </div>

          {/* Right Column: Cinematic Image */}
          <div className="lg:col-span-7 relative h-[50vh] lg:h-[60vh] max-h-[600px] min-h-[400px] w-full mt-10 lg:mt-0">
            <RevealOnScroll delay={0.3} className="w-full h-full relative rounded-2xl overflow-hidden shadow-ambient border border-outline-variant/20">
              <Image
                src={heroImg}
                alt="Students learning and building their future"
                fill
                placeholder="blur"
                className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
