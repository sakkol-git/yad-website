"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import heroImg from "../../../../public/assets/images/yad-7.png";

export function GetInvolvedHero() {
  return (
    <section className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-10 overflow-hidden border-b border-outline-variant/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        
        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Focus */}
          <div className="lg:col-span-5 flex flex-col z-10">
            <RevealOnScroll delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-[1px] bg-primary" />
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                  Action & Engagement
                </span>
              </div>
            </RevealOnScroll>

            {/* Massive, Tension-filled Headline */}
            <RevealOnScroll delay={0.2}>
              <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] mb-6">
                Mobilize Your <br className="hidden md:block" />
                <span className="font-light italic text-on-surface-variant">Capital.</span>
              </h1>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.3}>
              <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-sm mb-10">
                Whether deploying financial capital, operational expertise, or your own time, your involvement with YAD is a direct investment in the systemic development of Cambodia's next generation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#pathways"
                  className="bg-primary text-white hover:bg-primary/90 px-6 py-3 h-12 uppercase text-xs tracking-wider font-bold transition-colors duration-200 ease-in-out inline-flex items-center"
                >
                  Explore Pathways
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Cinematic Image */}
          <div className="lg:col-span-7 relative h-[50vh] lg:h-[60vh] max-h-[600px] min-h-[400px] w-full mt-10 lg:mt-0">
            <RevealOnScroll delay={0.3} className="w-full h-full relative">
              <Image
                src={heroImg}
                alt="Volunteers engaged in community work"
                fill
                placeholder="blur"
                className="object-cover object-center"
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
