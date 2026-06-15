"use client";

import { useState } from "react";
import Link from "next/link";
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
    <section className="px-margin-mobile md:px-margin-desktop pb-section-gap relative z-20 -mt-32">
      <div className="max-w-container-max mx-auto">
        <div className="bg-surface/80 backdrop-blur-xl rounded-lg p-8 md:p-12 shadow-ambient border border-white/20">
          <RevealOnScroll className="mb-12 text-center">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Global Network, Local Impact
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              Our network spans international NGOs, local grassroots
              organizations, and corporate partners committed to youth
              advancement.
            </p>
          </RevealOnScroll>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-label-bold text-label-bold px-6 py-2 rounded-full transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Logo Grid */}
          <StaggerGroup y={28} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredPartners.map((partner) => (
              <Link
                key={partner.id}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-surface-container-low h-48 rounded-lg flex flex-col items-center justify-center p-6 shadow-ambient hover:scale-[1.02] transition-transform duration-300 border border-white/20 cursor-pointer group ${
                  partner.featured ? "lg:col-span-2" : ""
                }`}
              >
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    className="max-h-20 w-auto mb-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="material-symbols-outlined text-outline text-5xl mb-4 group-hover:text-primary transition-colors">
                    {partner.icon}
                  </span>
                )}
                <span className="font-headline-md text-base text-outline group-hover:text-primary transition-colors text-center">
                  {partner.name}
                </span>
              </Link>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
