"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import type { PartnerItem } from "@/features/Entities/partners/types/partner.types";

const CATEGORIES = [
  "All Partners",
  "International NGOs",
  "Local Organizations",
  "Corporate Sponsors",
];

interface PartnerGridProps {
  partners: PartnerItem[];
}

export function PartnerGrid({ partners }: PartnerGridProps) {
  const [activeCategory, setActiveCategory] = useState("All Partners");

  const filteredPartners = partners.filter((partner) => {
    if (activeCategory === "All Partners") {
      // Exclude "Founding Partner" from typical category filters?
      // Actually, Founding Partner can just show up in "All Partners" 
      return true;
    }
    return partner.category === activeCategory;
  });

  return (
    <section className="bg-surface py-20 border-t border-outline-variant/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="mb-16">
          <RevealOnScroll className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl text-on-surface tracking-tight mb-4">
              Global <span className="font-light italic text-on-surface-variant">Network,</span> Local Impact.
            </h2>
            <p className="text-base font-light text-on-surface-variant max-w-xl">
              Our network spans international NGOs, local grassroots
              organizations, and corporate partners committed to youth
              advancement.
            </p>
          </RevealOnScroll>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`uppercase tracking-[0.1em] text-xs font-bold px-6 py-3 border transition-colors ${
                activeCategory === cat
                  ? "bg-on-surface text-surface border-on-surface"
                  : "bg-transparent text-on-surface-variant border-outline-variant/30 hover:border-on-surface hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Logo Grid */}
        <StaggerGroup y={28} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-outline-variant/30">
          {filteredPartners.map((partner) => (
            <Link
              key={partner.id}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center justify-center p-8 h-48 border-b border-r border-outline-variant/30 hover:bg-surface-container-lowest transition-colors cursor-pointer ${
                partner.featured ? "lg:col-span-2" : ""
              }`}
            >
              {partner.logoUrl ? (
                <div className="relative h-20 w-full mb-4">
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <span className="material-symbols-outlined text-outline text-4xl mb-4 group-hover:text-on-surface transition-colors">
                  {partner.icon}
                </span>
              )}
              <span className="text-sm font-light text-on-surface-variant group-hover:text-on-surface transition-colors text-center uppercase tracking-wider">
                {partner.name}
              </span>
            </Link>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
