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
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative min-h-[100svh] lg:min-h-[921px] flex items-center pt-24 md:pt-32 pb-section-gap px-4 md:px-6 lg:px-8 overflow-hidden bg-surface-container-lowest">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[150%] max-w-[600px] aspect-square bg-secondary-container/30 rounded-full blur-[60px] md:blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-10%] w-[180%] max-w-[800px] aspect-square bg-primary/10 rounded-full blur-[80px] md:blur-[120px]" />

        {/* Little sparkles/stars like in reference */}
        <div className="absolute top-[20%] left-[45%] text-primary/40 animate-pulse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
        <div className="absolute top-[40%] left-[8%] text-secondary/40 animate-pulse delay-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
        <div className="absolute bottom-[30%] right-[45%] text-primary/30 animate-pulse delay-500">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center items-start pt-10 lg:pt-0">
          <TextReveal as="h1" delay={0.2} text="Empowering Cambodia's Next Generation of Leaders" className="font-display-lg text-[3.2rem] lg:text-[4rem] text-primary mb-4 leading-[1.1] font-bold tracking-tight" />

          <RevealOnScroll delay={0.5} y={24}>
            <p className="font-body-lg text-lg text-on-surface-variant max-w-lg mb-6 leading-relaxed">
              Since 2015, we've provided vital education, safe housing, and life skills to youth from remote provinces and urban slum communities.
            </p>
            {/* Trust Signal */}
            <div className="flex items-center gap-2 mb-10 text-sm font-label-bold text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full border border-surface-container w-fit shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
              <span>Independent Cambodian NGO</span>
              <span className="mx-2 text-surface-container-high">|</span>
              <span className="material-symbols-outlined text-primary text-[18px]">groups</span>
              <span>500+ Children Reached Weekly</span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.7} y={16}>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/donate">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className=" px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Fund a Student's Future
                </Button>
              </Link>
              <Link 
                href="/get-involved/volunteer" 
                className="flex items-center gap-3 group text-on-surface font-medium hover:text-primary transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-surface shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-2xl ml-1">
                    volunteer_activism
                  </span>
                </div>
                Volunteer With Us
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        {/* Right Content - Image Card */}
        {/* Right Content - Image Card */}
        <div className="relative flex justify-center items-center lg:justify-start lg:-ml-8 xl:-ml-16 mt-16 lg:mt-0">
          {/* Decorative Blob Background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center lg:justify-center">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[195%] h-[195%] max-w-[1050px] text-secondary/20 fill-current -translate-x-4 lg:-translate-x-12">
              <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.2,-2.4C97.5,13.2,92.1,28.9,82.4,41.9C72.8,55,58.8,65.3,43.5,72.4C28.1,79.5,11.5,83.4,-4.4,81.4C-20.2,79.3,-35.1,71.3,-49.4,61.7C-63.6,52.1,-77.2,40.8,-84.9,26C-92.5,11.1,-94.3,-7.2,-88.3,-23.1C-82.3,-39,-68.5,-52.4,-53.4,-59.2C-38.3,-66.1,-21.9,-66.3,-5.2,-58.4C11.5,-50.5,23.1,-34.5,30.5,-83.4Z" transform="translate(100 100)" />
            </svg>

            {/* Outline blob offset */}
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute w-[190%] h-[190%] max-w-[1100px] text-secondary/40 stroke-current fill-transparent stroke-[0.5] -translate-x-4 lg:-translate-x-12 rotate-12">
              <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.2,-2.4C97.5,13.2,92.1,28.9,82.4,41.9C72.8,55,58.8,65.3,43.5,72.4C28.1,79.5,11.5,83.4,-4.4,81.4C-20.2,79.3,-35.1,71.3,-49.4,61.7C-63.6,52.1,-77.2,40.8,-84.9,26C-92.5,11.1,-94.3,-7.2,-88.3,-23.1C-82.3,-39,-68.5,-52.4,-53.4,-59.2C-38.3,-66.1,-21.9,-66.3,-5.2,-58.4C11.5,-50.5,23.1,-34.5,30.5,-83.4Z" transform="translate(100 100)" />
            </svg>
          </div>

          <ParallaxLayer speed={0.2} className="relative z-10 w-full max-w-[750px] aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-surface group">
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
                  className={`object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105 ${index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority={index === 0}
                  unoptimized={image.src.startsWith('http')}
                />
              ))}

              {/* Carousel Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-on-surface hover:bg-surface transition-colors shadow-sm"
                  aria-label={isPaused ? "Play carousel" : "Pause carousel"}
                >
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    {isPaused ? "play_arrow" : "pause"}
                  </span>
                </button>
                {CAROUSEL_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 md:h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-primary" : "w-3 md:w-2 bg-white/50 hover:bg-white/90"
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
