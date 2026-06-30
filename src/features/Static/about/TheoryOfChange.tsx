"use client";

import { useRef } from "react";
import { useInViewAnimation } from "@/shared/hooks/useInViewAnimation";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { CHART_HEX } from "@/shared/constants/infographic-tokens";

const COLUMNS = [
  {
    id: "donors",
    icon: "volunteer_activism",
    title: "Donors & Partners",
    subtitle: "Inputs",
    color: "primary" as const,
    items: ["Scholarship Funding", "Operational Grants", "In-kind Support"],
  },
  {
    id: "programs",
    icon: "hub",
    title: "YAD Programs",
    subtitle: "Activities",
    color: "secondary" as const,
    items: ["DLTC Dormitory", "Porridge for Hope", "Community Schools"],
  },
  {
    id: "graduates",
    icon: "emoji_events",
    title: "Empowered Youth",
    subtitle: "Outcomes",
    color: "tertiary" as const,
    items: ["94% Career Placement", "University Graduates", "Community Leaders"],
  },
  {
    id: "cambodia",
    icon: "public",
    title: "A Better Cambodia",
    subtitle: "Impact",
    color: "primary" as const,
    items: ["Reduced Youth Poverty", "Civic Participation", "Systemic Change"],
  },
];

const COLOR_MAP = {
  primary: {
    bg: "bg-primary-container/20",
    border: "border-primary/30",
    icon: CHART_HEX.primary,
    iconBg: `${CHART_HEX.primaryContainer}33`,
    title: "text-primary",
    arrow: CHART_HEX.primary,
  },
  secondary: {
    bg: "bg-secondary-container/20",
    border: "border-secondary/30",
    icon: CHART_HEX.secondary,
    iconBg: `${CHART_HEX.secondaryContainer}66`,
    title: "text-secondary",
    arrow: CHART_HEX.secondary,
  },
  tertiary: {
    bg: "bg-tertiary-container/20",
    border: "border-tertiary/30",
    icon: CHART_HEX.tertiary,
    iconBg: `${CHART_HEX.tertiaryContainer}66`,
    title: "text-tertiary",
    arrow: CHART_HEX.tertiary,
  },
};

// Horizontal animated arrow between columns
function ArrowConnector({
  isInView,
  delay,
  color,
}: {
  isInView: boolean;
  delay: number;
  color: string;
}) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 w-12">
      <svg width="48" height="24" viewBox="0 0 48 24" overflow="visible">
        {/* Animated horizontal line */}
        <line
          x1="0"
          y1="12"
          x2="40"
          y2="12"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="40"
          strokeDashoffset={isInView ? "0" : "40"}
          strokeLinecap="round"
          style={{
            transition: `stroke-dashoffset 0.7s cubic-bezier(0.05, 0.7, 0.1, 1) ${delay}ms`,
          }}
        />
        {/* Arrowhead */}
        <polygon
          points="38,7 48,12 38,17"
          fill={color}
          opacity={isInView ? 1 : 0}
          style={{
            transition: `opacity 0.3s ease ${delay + 400}ms`,
          }}
        />
      </svg>
    </div>
  );
}

export function TheoryOfChange() {
  const [ref, isInView] = useInViewAnimation<HTMLElement>({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="bg-surface-container-lowest border-t border-outline-variant/30 py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Section Header */}
        <RevealOnScroll className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-6 h-[1px] bg-primary" />
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
              Theory of Change
            </span>
          </div>
          <TextReveal
            as="h2"
            text="How your support creates change."
            className="text-[2.5rem] md:text-[3.5rem] text-primary tracking-tighter leading-[1.0] mb-4"
          />
          <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-2xl">
            Every dollar donated follows a clear, measurable pathway from input to lasting societal
            impact. This is our accountability framework.
          </p>
        </RevealOnScroll>

        {/* Flow Diagram */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
          {COLUMNS.map((col, i) => {
            const colors = COLOR_MAP[col.color];
            const isLast = i === COLUMNS.length - 1;

            return (
              <div key={col.id} className="flex flex-row lg:flex-col lg:flex-1 items-center">
                {/* Card */}
                <div
                  className={`flex-1 w-full p-6 border rounded-sm ${colors.bg} ${colors.border} transition-all duration-700`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(24px)",
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  {/* Subtitle label */}
                  <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-on-surface-variant/60 block mb-3">
                    {col.subtitle}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center mb-4"
                    style={{ backgroundColor: colors.iconBg }}
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={{ color: colors.icon }}
                    >
                      {col.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold tracking-tight mb-4 ${colors.title}`}>
                    {col.title}
                  </h3>

                  {/* Items */}
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: colors.icon }}
                        />
                        <span className="text-xs text-on-surface-variant font-light leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile: downward arrow */}
                {!isLast && (
                  <div className="flex lg:hidden items-center justify-center w-12 py-1">
                    <svg width="24" height="36" viewBox="0 0 24 36">
                      <line
                        x1="12" y1="0" x2="12" y2="28"
                        stroke={colors.arrow}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="28"
                        strokeDashoffset={isInView ? "0" : "28"}
                        style={{ transition: `stroke-dashoffset 0.7s ease ${i * 150}ms` }}
                      />
                      <polygon
                        points="6,26 12,36 18,26"
                        fill={colors.arrow}
                        opacity={isInView ? 1 : 0}
                        style={{ transition: `opacity 0.3s ease ${i * 150 + 500}ms` }}
                      />
                    </svg>
                  </div>
                )}

                {/* Desktop: rightward arrow connector */}
                {!isLast && (
                  <ArrowConnector
                    isInView={isInView}
                    delay={i * 150 + 600}
                    color={CHART_HEX.primary}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom attribution */}
        <RevealOnScroll className="mt-10 pt-6 border-t border-outline-variant/30 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant/60 font-light">
            Based on the Logical Framework Approach (LFA) — the international standard for NGO impact reporting.
          </p>
          <a
            href="/about/financials"
            className="text-xs font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1"
          >
            View Full Financials
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </RevealOnScroll>

        {/* Accessibility: hidden data table */}
        <table className="sr-only" aria-label="YAD Theory of Change framework">
          <thead><tr><th>Stage</th><th>Name</th><th>Outputs</th></tr></thead>
          <tbody>
            {COLUMNS.map((col) => (
              <tr key={col.id}>
                <td>{col.subtitle}</td>
                <td>{col.title}</td>
                <td>{col.items.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
