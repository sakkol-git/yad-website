"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/Card";

const PURPOSES = [
  {
    icon: "school",
    title: "Education Access",
    desc: "Bridging the gap for underprivileged students through scholarships, learning materials, and accessible tutoring programs.",
  },
  {
    icon: "devices",
    title: "Digital Literacy",
    desc: "Equipping youth with the technological skills required to thrive in the modern economy and solve local challenges.",
  },
  {
    icon: "diversity_3",
    title: "Community Leadership",
    desc: "Fostering a sense of civic duty by involving youth directly in local development and ecological projects.",
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
    <section ref={containerRef} className="relative min-h-[80vh] md:min-h-screen flex items-center py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-surface border-t border-outline-variant/30">
      <div className="absolute inset-0 z-0 hidden md:block">
        <div ref={bgRef} className="w-full h-full relative origin-center">
          <Image
            src="/assets/images/yad-1.png"
            alt="Students in classroom"
            fill
            className="object-cover opacity-[0.05] grayscale"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="max-w-container-max mx-auto w-full relative z-10">
        <div className="text-center mb-16 md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-[120%] w-full">
          <TextReveal 
            as="h2" 
            text="Core Purpose." 
            className="text-[2.5rem] md:text-[3.5rem] text-on-surface tracking-tighter leading-[1.0] mb-4" 
          />
          <RevealOnScroll delay={0.1}>
            <p className="text-base text-on-surface-variant font-light max-w-lg mx-auto leading-relaxed">
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
              <Card className="w-full border-none rounded-md bg-transparent shadow-none">
                <CardHeader className="text-center flex flex-col items-center pt-10">
                  <div className="w-16 h-16 border border-on-surface flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-3xl text-on-surface">
                      {purpose.icon}
                    </span>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl tracking-tight text-on-surface">{purpose.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-10 px-10">
                  <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-xl mx-auto">
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
              <Card className="flex flex-col h-full bg-transparent border border-outline-variant/30 rounded-md shadow-none">
                <CardHeader>
                  <div className="w-12 h-12 border border-on-surface flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-2xl text-on-surface">
                      {purpose.icon}
                    </span>
                  </div>
                  <CardTitle className="text-2xl tracking-tight text-on-surface mb-2">{purpose.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
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
