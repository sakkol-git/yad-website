"use client";

import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

export function OurStory() {
  return (
    <section className="bg-surface py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              Our Story & Evolution
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              From grassroots community education to a comprehensive empowerment network, our journey has been defined by our commitment to Cambodia's next generation of leaders.
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative border-l-4 border-secondary/30 ml-4 md:ml-12 pl-8 md:pl-12 space-y-16 py-8">
          {/* Era 1: The Beginning */}
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute -left-[43px] md:-left-[59px] bg-secondary w-5 h-5 rounded-full border-4 border-surface shadow-sm" />
              <div className="bg-surface-container-low p-8 rounded-xl shadow-ambient border border-outline-variant/30">
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary font-label-bold rounded-full text-sm mb-4">
                  The Origin
                </span>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">
                  Attitude Centre for Education (ACE)
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Our journey began with a simple but profound mission: teaching Life Skills and English to children in poverty-stricken communities. Operating as an independent Cambodian NGO, we focused entirely on bringing accessible education to urban slums where traditional schooling was out of reach.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Era 2: The Expansion */}
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute -left-[43px] md:-left-[59px] bg-secondary w-5 h-5 rounded-full border-4 border-surface shadow-sm" />
              <div className="bg-surface-container-low p-8 rounded-xl shadow-ambient border border-outline-variant/30">
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary font-label-bold rounded-full text-sm mb-4">
                  The Expansion
                </span>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">
                  Advanced Centre for Empowerment (ACE)
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                  As our impact grew, so did our vision. Rebranding to the Advanced Centre for Empowerment, we scaled our operations to support older youth. We launched three major pillars:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body-md text-on-surface-variant">
                  <li><strong>The DLTC:</strong> A Dormitory and Leadership Training Centre for talented university students.</li>
                  <li><strong>Porridge for Hope:</strong> A grassroots nutrition program combatting malnutrition in children under 5.</li>
                  <li><strong>Social Enterprise:</strong> An international homestay and volunteering program to fund our local operations sustainably.</li>
                </ul>
              </div>
            </div>
          </RevealOnScroll>

          {/* Era 3: The Future */}
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute -left-[43px] md:-left-[59px] bg-primary w-6 h-6 rounded-full border-4 border-surface shadow-sm" />
              <div className="bg-surface-container p-8 rounded-xl shadow-ambient border-2 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
                <span className="inline-block px-3 py-1 bg-primary text-on-primary font-label-bold rounded-full text-sm mb-4 shadow-sm">
                  Present Day
                </span>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">
                  Youth Advancement for Development (YAD)
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Today, we move forward under our new banner: <strong>Youth Advancement for Development (YAD) Cambodia</strong>. We have modernized our approach to include digital literacy and sustainable community development, while remaining true to our core mission: To empower a new generation of young leaders and advance the abilities of Cambodia's future changemakers.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
