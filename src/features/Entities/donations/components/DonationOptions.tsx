"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { IMPACT_TIERS } from "@/shared/constants/donations";

export function DonationPortal() {
  return (
    <section id="options" className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-surface">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Manifesto & Trust */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="kicker-label text-primary">Direct Impact</span>
            </div>
          </RevealOnScroll>
          <TextReveal
            as="h2"
            text="Fund the Framework."
            className="text-[3.5rem] md:text-[4.5rem] text-primary tracking-tighter leading-[1.0] mb-8"
          />
          <RevealOnScroll delay={0.1}>
            <div className="space-y-6 text-base md:text-lg text-on-surface-variant font-light leading-relaxed mb-12">
              <p>
                We don't deal in generic charity. We deal in highly targeted, structural
                interventions.
              </p>
              <p>
                When you donate to YAD, you aren't just giving money; you are activating specific,
                measurable resources that dismantle barriers to education.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs font-label-bold uppercase tracking-widest text-on-surface-variant/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                Secure SSL
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">account_balance</span>
                Tax Deductible
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Right: Tangible Impact Tiers */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-6">
          <h3 className="kicker-label text-on-surface-variant mb-4">Choose Your Impact Level</h3>

          {IMPACT_TIERS.map((tier, index) => (
            <RevealOnScroll
              key={tier.amount}
              delay={index * 0.15}
              className="group relative bg-surface p-8 md:p-10 border border-outline-variant/30 hover:border-primary transition-colors cursor-pointer rounded-md"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="text-[4rem] text-primary font-light tracking-tighter shrink-0 group-hover:text-primary/80 transition-colors leading-none">
                  {tier.amount}
                </div>
                <div>
                  <h4 className="text-xl font-light text-on-surface tracking-tight mb-3">
                    {tier.title}
                  </h4>
                  <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-6">
                    {tier.description}
                  </p>
                  <Link
                    href={`/donate/flow?amount=${tier.amount.replace("$", "")}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Fund this tier
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                      arrow_right_alt
                    </span>
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          ))}

          {/* Custom Amount */}
          <RevealOnScroll delay={0.5} className="mt-6">
            <Link
              href="/donate/flow"
              className="block w-full text-center py-8 bg-surface border border-outline-variant/30 hover:bg-surface-container-low transition-colors font-bold text-xs uppercase tracking-[0.2em] text-on-surface rounded-md"
            >
              Enter a Custom Amount
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
