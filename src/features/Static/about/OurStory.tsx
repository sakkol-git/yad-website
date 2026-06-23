"use client";

import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

export function OurStory() {
  return (
    <section id="our-history" className="bg-surface py-20 lg:py-32 scroll-mt-32 border-t border-outline-variant/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px]">
        <RevealOnScroll>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-on-surface pb-8">
            <h2 className="text-[2.5rem] md:text-[3.5rem] text-on-surface tracking-tighter leading-[1.0] max-w-md">
              Our <br className="hidden md:block"/>
              <span className="font-light italic text-on-surface-variant">evolution.</span>
            </h2>
            <p className="text-base text-on-surface-variant font-light max-w-sm leading-relaxed">
              From grassroots community education to a comprehensive empowerment network, our journey has been defined by a singular commitment.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-0">
          {/* Era 1: The Beginning */}
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-16 border-b border-outline-variant/30">
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 font-bold block mb-2">
                  The Origin
                </span>
                <span className="text-xl md:text-2xl font-light text-on-surface">2010 - 2014</span>
              </div>
              <div className="md:col-span-9 flex flex-col">
                <h3 className="text-2xl md:text-3xl text-on-surface tracking-tight leading-tight mb-4">
                  Attitude Centre for Education (ACE)
                </h3>
                <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-2xl">
                  Our journey began with a simple but profound mission: teaching Life Skills and English to children in poverty-stricken communities. Operating as an independent Cambodian NGO, we focused entirely on bringing accessible education to urban slums where traditional schooling was out of reach.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Era 2: The Expansion */}
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-16 border-b border-outline-variant/30">
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 font-bold block mb-2">
                  The Expansion
                </span>
                <span className="text-xl md:text-2xl font-light text-on-surface">2015 - 2021</span>
              </div>
              <div className="md:col-span-9 flex flex-col">
                <h3 className="text-2xl md:text-3xl text-on-surface tracking-tight leading-tight mb-4">
                  Advanced Centre for Empowerment (ACE)
                </h3>
                <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-2xl mb-6">
                  As our impact grew, so did our vision. Rebranding to the Advanced Centre for Empowerment, we scaled our operations to support older youth. We launched three major pillars:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="border border-outline-variant/30 p-5 bg-surface-container-lowest">
                    <h4 className="text-xs uppercase tracking-[0.1em] font-bold text-on-surface mb-2">The DLTC</h4>
                    <p className="text-sm text-on-surface-variant font-light">A Dormitory and Leadership Training Centre for talented university students.</p>
                  </div>
                  <div className="border border-outline-variant/30 p-5 bg-surface-container-lowest">
                    <h4 className="text-xs uppercase tracking-[0.1em] font-bold text-on-surface mb-2">Porridge for Hope</h4>
                    <p className="text-sm text-on-surface-variant font-light">A grassroots nutrition program combatting malnutrition in children under 5.</p>
                  </div>
                  <div className="border border-outline-variant/30 p-5 bg-surface-container-lowest">
                    <h4 className="text-xs uppercase tracking-[0.1em] font-bold text-on-surface mb-2">Social Enterprise</h4>
                    <p className="text-sm text-on-surface-variant font-light">An international homestay and volunteering program to fund operations sustainably.</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Era 3: The Future */}
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-16">
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 font-bold block mb-2">
                  Present Day
                </span>
                <span className="text-xl md:text-2xl font-light text-on-surface">2022 - Now</span>
              </div>
              <div className="md:col-span-9 flex flex-col">
                <h3 className="text-2xl md:text-3xl text-on-surface tracking-tight leading-tight mb-4">
                  Youth Advancement for Development
                </h3>
                <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-2xl">
                  Today, we move forward under our new banner: <strong className="font-semibold text-on-surface">Youth Advancement for Development (YAD) Cambodia</strong>. We have modernized our approach to include digital literacy and sustainable community development, while remaining true to our core mission: To empower a new generation of young leaders and advance the abilities of Cambodia's future changemakers.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
