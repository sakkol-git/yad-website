"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const CAROUSEL_IMAGES = [
  {
    src: "/assets/images/yad-1.png",
    alt: "Energetic young Cambodian changemaker",
  },
  {
    src: "/assets/images/yad-2.png",
    alt: "Smiling children representing community hope",
  },
  {
    src: "/assets/images/yad-4.png",
    alt: "Smiling children representing community hope",
  },
  {
    src: "/assets/images/yad-5.png",
    alt: "Smiling children representing community hope",
  },
  {
    src: "/assets/images/yad-6.png",
    alt: "Smiling children representing community hope",
  },
  {
    src: "/assets/images/yad-7.png",
    alt: "Smiling children representing community hope",
  },
];

export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % CAROUSEL_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[921px] flex items-center pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden bg-surface-container-lowest">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary-container/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />

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
          <h1 className="font-display-lg text-[4rem] lg:text-[5rem] text-primary mb-2 leading-[1.1] font-bold tracking-tight">
            Empower<br />
            <span className="text-secondary">Tomorrow!</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-display text-primary/80 mb-6 font-medium">
            Shape Cambodia&apos;s Future
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed">
            Each small action you take today sets off a wave of positive
            change for the future of our communities. We are building a
            nurturing ecosystem for young changemakers to thrive in
            sustainable development.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="primary" size="lg" className="rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Explore More
            </Button>
            <button className="flex items-center gap-3 group text-on-surface font-medium hover:text-primary transition-colors">
              <div className="w-14 h-14 rounded-full bg-surface shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-2xl ml-1">
                  play_arrow
                </span>
              </div>
              Watch Demo
            </button>
          </div>
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

          <div className="relative z-10 w-full lg:w-[115%] max-w-[750px] aspect-square lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-surface group">
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

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {CAROUSEL_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white/90"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
