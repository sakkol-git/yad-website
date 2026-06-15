"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/Card";

const PURPOSES = [
  {
    icon: "school",
    title: "Education Access",
    desc: "Bridging the gap for underprivileged students through scholarships, learning materials, and accessible tutoring programs.",
    color: "bg-primary-container text-on-primary-container"
  },
  {
    icon: "devices",
    title: "Digital Literacy",
    desc: "Equipping youth with the technological skills required to thrive in the modern economy and solve local challenges.",
    color: "bg-secondary-container text-on-secondary-container"
  },
  {
    icon: "diversity_3",
    title: "Community Leadership",
    desc: "Fostering a sense of civic duty by involving youth directly in local development and ecological projects.",
    color: "bg-tertiary-container text-on-tertiary-container"
  }
];

export function CorePurpose() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current || reduced || window.innerWidth < 768) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        scrub: true,
        pin: true,
      }
    });

    if (bgRef.current) {
      tl.to(bgRef.current, { scale: 1.08, ease: "none", duration: 1 }, 0);
    }

    panelsRef.current.forEach((panel, i) => {
      if (!panel) return;
      if (i > 0) gsap.set(panel, { opacity: 0, y: 50 });
    });

    const step = 1 / (PURPOSES.length - 1 || 1);
    
    for (let i = 0; i < PURPOSES.length - 1; i++) {
      const current = panelsRef.current[i];
      const next = panelsRef.current[i + 1];
      const startTime = i * step;
      
      tl.to(current, { opacity: 0, y: -50, duration: step * 0.4 }, startTime);
      tl.to(next, { opacity: 1, y: 0, duration: step * 0.4 }, startTime + step * 0.2);
    }
  }, { scope: containerRef, dependencies: [reduced] });

  return (
    <section ref={containerRef} className="relative min-h-[80vh] md:min-h-screen flex items-center py-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0 z-0 hidden md:block">
        <div ref={bgRef} className="w-full h-full relative origin-center">
          <Image
            src="/assets/images/yad-1.png"
            alt="Students in classroom"
            fill
            className="object-cover opacity-[0.15]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest via-surface-container-lowest/60 to-surface-container-lowest" />
        </div>
      </div>

      <div className="max-w-container-max mx-auto w-full relative z-10">
        <div className="text-center mb-16 md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-[120%] w-full">
          <RevealOnScroll>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              Our Core Purpose
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Driving sustainable change through three foundational pillars of
              youth empowerment.
            </p>
          </RevealOnScroll>
        </div>

        <div className="hidden md:block relative h-[350px] w-full max-w-2xl mx-auto">
          {PURPOSES.map((purpose, i) => (
            <div 
              key={i} 
              ref={el => { panelsRef.current[i] = el; }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <Card className="w-full shadow-2xl border-outline-variant/30 backdrop-blur-md bg-surface/90">
                <CardHeader className="text-center flex flex-col items-center pt-10">
                  <div className={`w-20 h-20 rounded-full ${purpose.color} flex items-center justify-center mb-6 shadow-sm`}>
                    <span className="material-symbols-outlined text-4xl">
                      {purpose.icon}
                    </span>
                  </div>
                  <CardTitle className="font-display-md text-display-md text-primary">{purpose.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-10 px-10">
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    {purpose.desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="md:hidden flex flex-col gap-8">
          {PURPOSES.map((purpose, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <Card className="hover-lift flex flex-col h-full bg-surface shadow-ambient border-outline-variant/30">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${purpose.color} flex items-center justify-center mb-6`}>
                    <span className="material-symbols-outlined text-3xl">
                      {purpose.icon}
                    </span>
                  </div>
                  <CardTitle className="mb-4">{purpose.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {purpose.desc}
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
