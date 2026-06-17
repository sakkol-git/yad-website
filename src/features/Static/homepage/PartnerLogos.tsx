"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

const PARTNERS = [
  { name: "Partner 1", logo: "https://via.placeholder.com/200x80/f5f9f6/131c17?text=Partner+1" },
  { name: "Partner 2", logo: "https://via.placeholder.com/200x80/f5f9f6/131c17?text=Partner+2" },
  { name: "Partner 3", logo: "https://via.placeholder.com/200x80/f5f9f6/131c17?text=Partner+3" },
  { name: "Partner 4", logo: "https://via.placeholder.com/200x80/f5f9f6/131c17?text=Partner+4" },
  { name: "Partner 5", logo: "https://via.placeholder.com/200x80/f5f9f6/131c17?text=Partner+5" },
];

export function PartnerLogos() {
  return (
    <section className="py-12 md:py-16 bg-surface border-y border-outline-variant/30 overflow-hidden">
      <RevealOnScroll className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <p className="text-center font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-8">
          Trusted by international organizations and local partners
        </p>
        
        {/* Simple grid for few logos, CSS marquee if many. Using wrap for now. */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          {PARTNERS.map((partner, index) => (
            <div 
              key={index} 
              className="relative w-32 md:w-40 h-16 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 opacity-80 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
