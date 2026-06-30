"use client";

import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { CHART_HEX } from "@/shared/constants/infographic-tokens";
import { TeamMemberCard } from "./TeamMemberCard";
import type { TeamMember } from "@/features/Entities/members/types/member.types";

interface OrgChartTreeProps {
  founder: TeamMember | null;
  coFounders: TeamMember[];
}

export function OrgChartTree({ founder, coFounders }: OrgChartTreeProps) {
  const [ref, isInView] = useInViewAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className="relative w-full py-10 flex flex-col items-center">
      
      {/* Tier 1: Founder */}
      {founder && (
        <div 
          className="relative z-10 w-full max-w-[340px] transition-all duration-700 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(40px)"
          }}
        >
          <TeamMemberCard {...founder} href={`/about/governance/${founder.slug}`} />
        </div>
      )}

      {/* SVG Connecting Tree */}
      {founder && coFounders.length > 0 && (
        <div className="relative w-full h-[80px] md:h-[120px] flex items-center justify-center pointer-events-none my-4">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Main vertical spine from founder */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="50%"
              stroke={CHART_HEX.primary}
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={isInView ? "0" : "100"}
              style={{ transition: "stroke-dashoffset 0.6s ease 0.3s" }}
            />
            
            {/* Horizontal distribution bar */}
            <line
              x1="15%"
              y1="50%"
              x2="85%"
              y2="50%"
              stroke={CHART_HEX.primary}
              strokeWidth="2"
              strokeDasharray="100%"
              strokeDashoffset={isInView ? "0" : "100%"}
              style={{ transition: "stroke-dashoffset 0.8s ease 0.6s" }}
            />

            {/* Downward branches to co-founders */}
            {coFounders.map((_, i) => {
              // Calculate x-position based on number of cofounders (15% to 85%)
              const step = 70 / (coFounders.length > 1 ? coFounders.length - 1 : 1);
              const xPos = coFounders.length === 1 ? 50 : 15 + i * step;

              return (
                <line
                  key={i}
                  x1={`${xPos}%`}
                  y1="50%"
                  x2={`${xPos}%`}
                  y2="100%"
                  stroke={CHART_HEX.primary}
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={isInView ? "0" : "100"}
                  style={{ transition: `stroke-dashoffset 0.6s ease ${0.8 + i * 0.15}s` }}
                />
              );
            })}
          </svg>
        </div>
      )}

      {/* Tier 2: Co-Founders / Board */}
      {coFounders.length > 0 && (
        <div className="relative z-10 w-full flex flex-row flex-wrap justify-center items-start gap-8 md:gap-12">
          {coFounders.map((member, i) => (
            <div 
              key={member.id} 
              className="w-full max-w-[280px] transition-all duration-700 ease-out"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${1000 + i * 150}ms`
              }}
            >
              <TeamMemberCard {...member} href={`/about/governance/${member.slug}`} />
            </div>
          ))}
        </div>
      )}

      {/* Accountability Note */}
      <div 
        className="mt-20 pt-8 border-t border-outline-variant/30 text-center max-w-2xl transition-all duration-700 ease-out"
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
