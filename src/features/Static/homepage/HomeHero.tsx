"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import { useMagneticHover } from "@/shared/hooks/useMagneticHover";
import heroImg1 from "../../../../public/assets/images/yad-2.png";
import heroImg2 from "../../../../public/assets/images/yad-6.png";
import heroImg3 from "../../../../public/assets/images/yad-7.png";

const HERO_IMAGES = [
  { src: heroImg1, alt: "Young Cambodian student looking thoughtfully into the distance" },
  { src: heroImg2, alt: "Cambodian youth engaging in educational activities" },
  { src: heroImg3, alt: "Students participating in community programs" }
];

export function HomeHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reduced = useReducedMotion();

  // Parallax refs
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  // Magnetic hover for primary CTA
  const { ref: ctaRef, handleMouseMove, handleMouseLeave } = useMagneticHover(0.25);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Parallax depth — 3 layers at different rates for perceived 3D depth
  useGSAP(() => {
    if (reduced) return;
    if (!sectionRef.current || !headlineRef.current || !subheadlineRef.current || !imageColRef.current) return;

    // Headline moves at 30% of scroll speed (feels closest to camera)
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

    // Subheadline moves at 50% — feels further from camera
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

    // Image column moves at 20% — furthest layer
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.trigger === sectionRef.current ||
          t.vars.trigger === headlineRef.current ||
          t.vars.trigger === subheadlineRef.current ||
          t.vars.trigger === imageColRef.current
        ) {
          t.kill();
        }
      });
    };
  }, { scope: sectionRef, dependencies: [reduced] });

  return (
    // REDUCED: Padding top and bottom tightened for better viewport fitting
    <section ref={sectionRef} className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-10 overflow-hidden">
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
              <h1
                ref={headlineRef}
                className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] mb-6"
              >
                Empowering <br className="hidden md:block" />
                Cambodia&apos;s <br className="hidden md:block" />
                <span className="font-light italic text-on-surface-variant">
                  Future Leaders
                </span> <br className="hidden lg:block" />
              </h1>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.3}>
              <p
                ref={subheadlineRef}
                className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-sm mb-10"
              >
                We provide vital education, safe housing, and life skills to youth from remote provinces and urban slum communities. A foundation for systemic change.
              </p>
            </RevealOnScroll>

            {/* Sleek, Premium CTA */}
            <RevealOnScroll delay={0.4}>
              <Button
                asChild
                ref={ctaRef as React.Ref<HTMLButtonElement>}
                onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
                onMouseLeave={handleMouseLeave as unknown as React.MouseEventHandler<HTMLButtonElement>}
                className="bg-primary text-white hover:bg-primary/90 px-8 py-5 rounded-md text-xs tracking-[0.2em] uppercase font-semibold transition-colors w-fit"
              >
                <Link href="/donate">Fund a Future</Link>
              </Button>
            </RevealOnScroll>
          </div>

          {/* Right Column: Un-obscured Cinematic Image (7 Columns) */}
          {/* REDUCED: Height changed from 80vh to 60vh with a hard max-height */}
          <div ref={imageColRef} className="lg:col-span-7 relative h-[60vh] lg:h-[70vh] max-h-[600px] min-h-[400px] w-full mt-10 lg:mt-0 overflow-hidden">
            <RevealOnScroll delay={0.3} className="w-full h-full relative">
              {HERO_IMAGES.map((img, idx) => {
                const isCurrent = idx === currentImageIndex;
                const isPrevious = idx === (currentImageIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length;

                return (
                  <div
                    key={img.src.src}
                    className={`absolute inset-0 transition-colors duration-200 ease-in-out duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isCurrent
                      ? "opacity-100 z-10 translate-x-0 scale-100"
                      : isPrevious
                        ? "opacity-0 z-0 -translate-x-16 scale-105"
                        : "opacity-0 z-0 translate-x-16 scale-105"
                      }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      placeholder="blur"
                      className={`object-cover object-center transition-transform duration-[10000ms] ease-linear ${isCurrent ? "scale-110" : "scale-100"
                        }`}
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                );
              })}
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
                2024
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
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim animate-pulse" />
                Independent NGO
              </span>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}