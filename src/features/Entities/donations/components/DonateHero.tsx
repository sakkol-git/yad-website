"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import heroImg from "../../../../../public/assets/images/yad-4.png";

export function DonateHero() {
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  // Parallax depth — 3 layers at different rates for perceived 3D depth
  useGSAP(
    () => {
      if (reduced) return;
      if (
        !sectionRef.current ||
        !headlineRef.current ||
        !subheadlineRef.current ||
        !imageColRef.current
      )
        return;

      gsap.to(headlineRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(subheadlineRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(imageColRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 3,
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-surface pt-36 pb-16 lg:pt-48 lg:pb-20 overflow-hidden border-b border-outline-variant/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-container-max">
        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Typographic Focus */}
          <div className="lg:col-span-5 flex flex-col z-10">
            <RevealOnScroll delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-[1px] bg-primary" />
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                  100% of Donations Create Local Impact
                </span>
              </div>
            </RevealOnScroll>

            {/* Massive, Tension-filled Headline */}
            <div ref={headlineRef}>
              <TextReveal
                as="h1"
                text="Their Potential. Your Catalyst."
                className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] mb-6"
                delay={0.2}
              />
            </div>

            {/* Subtext */}
            <RevealOnScroll delay={0.3}>
              <p
                ref={subheadlineRef}
                className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-sm mb-10"
              >
                Transforming communities isn&apos;t just about charity; it&apos;s about structural
                investment. By funding education, secure housing, and digital literacy, you are
                directly engineering Cambodia&apos;s future leaders.
              </p>
            </RevealOnScroll>
          </div>

          {/* Right Column: Cinematic Image */}
          <div
            ref={imageColRef}
            className="lg:col-span-7 relative h-[50vh] lg:h-[60vh] max-h-[600px] min-h-[400px] w-full mt-10 lg:mt-0"
          >
            <RevealOnScroll delay={0.3} className="w-full h-full relative">
              <Image
                src={heroImg}
                alt="Students learning in a classroom, supported by community donations"
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
