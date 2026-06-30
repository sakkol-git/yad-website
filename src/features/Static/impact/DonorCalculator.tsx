"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { CHART_HEX } from "@/shared/constants/infographic-tokens";

// TODO: Replace with real YAD program costs
const IMPACT_TIERS = [
  { threshold: 23, label: "One mentorship package for a student", icon: "groups", description: "Pairing a student with a working professional for career guidance and life skills coaching." },
  { threshold: 42, label: "One month of safe dormitory housing", icon: "home", description: "Safe shelter, meals, utilities, and a supportive community for one student for an entire month." },
  { threshold: 120, label: "One semester of academic mentorship", icon: "school", description: "A full semester of guided academic support, tutoring, and professional development." },
  { threshold: 250, label: "Half a year of full scholarship", icon: "auto_stories", description: "Six months of tuition, housing, and mentorship — a transformative investment in one student's future." },
  { threshold: 500, label: "Career placement support for 3 graduates", icon: "work", description: "Complete career preparation including resume workshops, interview training, and employer connections." },
  { threshold: 847, label: "A full scholarship year for one student", icon: "emoji_events", description: "The complete YAD experience: housing, tuition, mentorship, and career placement for an entire year." },
];

export function DonorCalculator() {
  const [amount, setAmount] = useState(42);

  // Find the highest tier the current amount can fund
  const activeTier = useMemo(() => {
    let best = IMPACT_TIERS[0];
    for (const tier of IMPACT_TIERS) {
      if (amount >= tier.threshold) best = tier;
    }
    return best;
  }, [amount]);

  // Progress within the current tier to the next
  const currentTierIdx = IMPACT_TIERS.indexOf(activeTier);
  const nextTier = IMPACT_TIERS[currentTierIdx + 1];
  const progressToNext = nextTier
    ? Math.min(((amount - activeTier.threshold) / (nextTier.threshold - activeTier.threshold)) * 100, 100)
    : 100;

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
      <RevealOnScroll>
        <div className="bg-surface border border-outline-variant/30 rounded-sm p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-[1px] bg-primary" />
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
              Impact Calculator
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-light text-on-surface tracking-tight mb-2">
            See What Your Donation Funds
          </h3>
          <p className="text-sm text-on-surface-variant font-light mb-8">
            Move the slider or type an amount to see exactly how your contribution transforms lives.
          </p>

          {/* Slider + Input */}
          <div className="mb-8">
            <div className="flex items-end gap-4 mb-4">
              <span className="text-5xl md:text-6xl font-light text-primary tracking-tighter tabular-nums">
                ${amount}
              </span>
              <span className="text-sm text-on-surface-variant font-light pb-2">USD</span>
            </div>

            <input
              type="range"
              min={5}
              max={1000}
              step={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 rounded-none appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${CHART_HEX.primary} ${(amount / 1000) * 100}%, ${CHART_HEX.surfaceVariant} ${(amount / 1000) * 100}%)`,
              }}
              aria-label="Donation amount slider"
            />

            <div className="flex justify-between text-[10px] text-on-surface-variant/50 font-bold uppercase tracking-widest mt-2">
              <span>$5</span>
              <span>$1,000</span>
            </div>
          </div>

          {/* Active Impact Display */}
          <div className="bg-primary-container/10 border border-primary/20 rounded-sm p-6 mb-6 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0"
                style={{ backgroundColor: CHART_HEX.primary, color: "#ffffff" }}
              >
                <span className="material-symbols-outlined text-[24px]">{activeTier.icon}</span>
              </div>
              <div>
                <p className="text-base font-bold text-on-surface mb-1">
                  Your ${amount} covers:
                </p>
                <p className="text-lg font-light text-primary tracking-tight">
                  {activeTier.label}
                </p>
                <p className="text-sm text-on-surface-variant font-light mt-2 leading-relaxed">
                  {activeTier.description}
                </p>
              </div>
            </div>

            {/* Progress to next tier */}
            {nextTier && (
              <div className="mt-4 pt-4 border-t border-outline-variant/20">
                <div className="flex justify-between text-xs text-on-surface-variant mb-1.5">
                  <span className="font-light">
                    ${nextTier.threshold - amount} more unlocks:
                  </span>
                  <span className="font-bold">{nextTier.label}</span>
                </div>
                <div className="w-full h-1.5 bg-surface-variant/50 rounded-none overflow-hidden">
                  <div
                    className="h-full rounded-none transition-all duration-500"
                    style={{
                      width: `${progressToNext}%`,
                      backgroundColor: CHART_HEX.secondary,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <Button asChild className="w-full" size="lg">
            <Link href={`/donate?amount=${amount}`}>
              Donate ${amount} Now
            </Link>
          </Button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
