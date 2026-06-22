"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";
import { ParallaxLayer } from "@/shared/components/animations/ParallaxLayer";

const CAROUSEL_IMAGES = [
  {
    src: "/assets/images/yad-2.png",
    alt: "Energetic young Cambodian changemaker",
  },
  {
    src: "/assets/images/yad-1.png",
    alt: "Smiling children representing community hope",
  },
  {
    src: "/assets/images/yad-4.png",
    alt: "Students collaborating in a digital innovation workshop",
  },
  {
    src: "/assets/images/yad-5.png",
    alt: "Community education session in progress",
  },
  {
    src: "/assets/images/yad-6.png",
    alt: "Youth training dormitory residents studying together",
  },
  {
    src: "/assets/images/yad-7.png",
    alt: "Volunteers working with children in community program",
  },
];

export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mq.matches) setIsPaused(true);
    const handler = (e: MediaQueryListEvent) => setIsPaused(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % CAROUSEL_IMAGES.length);
    }, 4000); // slightly slower transitions for a more premium feel
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative min-h-[100svh] lg:min-h-[921px] flex items-center pt-24 md:pt-32 pb-section-gap px-4 md:px-6 lg:px-8 overflow-hidden bg-surface-container-lowest">
      {/* Soft Background Decor instead of rigid shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[900px] h-[900px] bg-secondary/10 rounded-full blur-[150px] mix-blend-multiply opacity-60" />
      </div>

      <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center items-start pt-10 lg:pt-0">
          <TextReveal as="h1" delay={0.2} text="Empowering Cambodia's Next Generation of Leaders" className="font-display-lg text-[3.2rem] lg:text-[4.5rem] text-primary mb-6 leading-[1.05] font-extrabold tracking-tight" />

          <RevealOnScroll delay={0.5} y={24}>
            <p className="font-body-lg text-lg lg:text-xl text-on-surface-variant max-w-lg mb-8 leading-relaxed">
              Since 2015, we've provided vital education, safe housing, and life skills to youth from remote provinces and urban slum communities.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.7} y={16}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/donate">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className=" px-8 py-6 text-lg font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    Fund a Student's Future
                  </Button>
                </Link>
                <Link 
                  href="#impact-video" 
                  className="flex items-center gap-4 group text-on-surface-variant font-bold hover:text-on-surface transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-on-surface text-2xl ml-1 group-hover:text-primary transition-colors">
                      play_arrow
                    </span>
                  </div>
                  See Our Impact
                </Link>
              </div>

              {/* Micro-Proof */}
              <div className="flex items-center gap-3 mt-4 bg-surface-container-low/50 w-fit px-4 py-2 rounded-2xl border border-outline-variant/20 backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center relative z-[${10-i}]`}>
                      <span className="material-symbols-outlined text-[14px] text-primary">person</span>
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold z-0 text-on-surface">
                    +
                  </div>
                </div>
                <div className="text-sm font-medium text-on-surface-variant">
                  <span className="text-amber-400 mr-1 text-[16px]">★★★★★</span> 
                  Trusted by <strong className="text-on-surface">500+ volunteers</strong>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Right Content - Image Card */}
        <div className="relative flex justify-center items-center lg:justify-end mt-16 lg:mt-0">
          <ParallaxLayer speed={0.15} className="relative z-10 w-full max-w-[750px] aspect-[4/5] lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] group">
            <ImageRevealMask className="w-full h-full">
              <div aria-live="polite" className="sr-only">
                Showing slide {activeIndex + 1} of {CAROUSEL_IMAGES.length}: {CAROUSEL_IMAGES[activeIndex].alt}
              </div>
              {CAROUSEL_IMAGES.map((image, index) => (
                <Image
                  key={image.src}
                  alt={image.alt}
                  src={image.src}
                  fill
                  className={`object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105 ${
                    index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0} // NEXT.JS LCP OPTIMIZATION ENABLED
                  unoptimized={image.src.startsWith('http')}
                />
              ))}

              {/* Seamless gradient overlay at the bottom for controls visibility */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />

              {/* Carousel Controls */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-sm"
                  aria-label={isPaused ? "Play carousel" : "Pause carousel"}
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">
                    {isPaused ? "play_arrow" : "pause"}
                  </span>
                </button>
                {CAROUSEL_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </ImageRevealMask>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
