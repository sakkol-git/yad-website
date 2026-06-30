"use client";

import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { TeamMemberCard } from "./TeamMemberCard";
import type { TeamMember } from "@/features/Entities/members/types/member.types";

interface OrgChartTreeProps {
  founder: TeamMember | null;
  coFounders: TeamMember[];
}

export function OrgChartTree({ founder, coFounders }: OrgChartTreeProps) {
  const [ref, isInView] = useInViewAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className="relative w-full py-10 flex flex-col items-center overflow-hidden">

      {/* Tier 1: Founder */}
      {founder && (
        <div className="flex flex-col items-center w-full relative z-10">
          <div
            className="w-full max-w-[340px] transition-all duration-700 ease-out"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(40px)"
            }}
          >
            <TeamMemberCard {...founder} href={`/about/governance/${founder.slug}`} />
          </div>

          {/* Main Trunk connecting Tier 1 to Tier 2 */}
          {coFounders.length > 0 && (
            <div
              className="w-[2px] h-10 md:h-16 bg-primary origin-top transition-transform duration-500 ease-out"
              style={{
                transform: isInView ? "scaleY(1)" : "scaleY(0)",
                transitionDelay: "0.3s"
              }}
            />
          )}
        </div>
      )}

      {/* Tier 2: Co-Founders / Board */}
      {coFounders.length > 0 && (
        <div className="w-full flex justify-center overflow-visible">
          {/* inline-flex automatically hugs the width of all cards + any gap the user sets! */}
          <div className="relative inline-flex flex-row flex-wrap justify-center gap-8 md:gap-20 lg:gap-80">
            
            {/* The Single Continuous Horizontal Line */}
            {coFounders.length > 1 && (
              <div 
                className="absolute top-0 h-[2px] bg-primary transition-transform duration-700 ease-out origin-center left-[130px] right-[130px] md:left-[140px] md:right-[140px]"
                style={{
                  transform: isInView ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: "0.8s"
                }}
              />
            )}

            {/* The Cards */}
            {coFounders.map((member, i) => (
              <div key={member.id} className="relative flex flex-col items-center w-[260px] md:w-[280px]">
                
                {/* Vertical Branch Down to this Card */}
                <div
                  className="w-[2px] h-10 md:h-16 bg-primary origin-top transition-transform duration-500 ease-out"
                  style={{
                    transform: isInView ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: `${1.1 + i * 0.15}s`
                  }}
                />

                {/* Card Container */}
                <div
                  className="w-full transition-all duration-700 ease-out"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(40px)",
                    transitionDelay: `${1.4 + i * 0.15}s`
                  }}
                >
                  <TeamMemberCard {...member} href={`/about/governance/${member.slug}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accountability Note */}
      <div
        className="mt-24 pt-8 border-t border-outline-variant/30 text-center max-w-2xl transition-all duration-700 ease-out"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "1.8s"
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/70 block mb-3">
          Organizational Accountability
        </span>
        <p className="text-sm text-on-surface-variant font-light leading-relaxed">
          The Board of Directors provides independent oversight and strategic governance, ensuring that all YAD initiatives align with our core mission and maintain the highest standards of financial integrity.
        </p>
      </div>

    </div>
  );
}
