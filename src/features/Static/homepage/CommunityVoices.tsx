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
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[150vw] max-w-[500px] aspect-square bg-tertiary-container/30 rounded-full blur-3xl -z-10 -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-0 right-0 w-[180vw] max-w-[600px] aspect-square bg-secondary-container/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4" />

      <RevealOnScroll className="max-w-container-max mx-auto text-center mb-10 md:mb-16 relative">
        <span className="text-tertiary font-label-bold text-label-bold tracking-wider uppercase mb-2 block">
          Community Voices
        </span>
        <TextReveal as="h2" text="Hear from the Future Leaders" className="font-headline-lg text-headline-lg text-primary max-w-2xl mx-auto" />
        
        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-6 text-on-surface-variant font-label-md animate-pulse">
          <span className="material-symbols-outlined text-sm">swipe_left</span>
          <span>Swipe to read more</span>
        </div>
      </RevealOnScroll>

      <HorizontalScrollSection className="max-w-container-max mx-auto">
        <Card className="bg-surface border border-surface-variant relative shrink-0 w-[85vw] md:w-[600px]">
          <CardContent className="p-8 pt-8">
            <QuoteIcon colorClass="text-tertiary/20" />
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 relative z-10 italic">
              &quot;The digital literacy program completely changed my trajectory.
              I now have the skills to build websites and help local businesses
              transition online.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-tertiary-container flex items-center justify-center">
                <span className="text-on-tertiary-container font-bold text-lg">S</span>
              </div>
              <div>
                <div className="font-label-bold text-label-bold text-on-surface">
                  Sokhem
                </div>
                <div className="font-body-md text-body-md text-sm text-on-surface-variant">
                  Alumni, 2023 Cohort
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface border border-surface-variant relative shrink-0 w-[85vw] md:w-[600px] md:translate-y-8">
          <CardContent className="p-8 pt-8">
            <QuoteIcon colorClass="text-secondary/20" />
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 relative z-10 italic">
              &quot;Living in the YAD dormitory provided me the safe space and
              community I needed to focus entirely on my university studies.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-container flex items-center justify-center">
                <span className="text-on-secondary-container font-bold text-lg">C</span>
              </div>
              <div>
                <div className="font-label-bold text-label-bold text-on-surface">
                  Charya
                </div>
                <div className="font-body-md text-body-md text-sm text-on-surface-variant">
                  Current Resident
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
