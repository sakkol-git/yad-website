"use client";

import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { EnhancedStatCard } from "./infographics/EnhancedStatCard";
import { WaffleChart } from "./infographics/WaffleChart";

// TODO: Replace sparkline data with real YAD historical values
const ENHANCED_METRICS = [
  {
    value: 500,
    suffix: "+",
    label: "Children Reached Weekly",
    description: "Through nutrition and community education programs across urban slum communities.",
    sparklineData: [120, 180, 220, 300, 350, 420, 500],
    yoyDelta: 34,
    storyHook: "Meet Sreymom, one of 500+ children we reach every week →",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years of Impact",
    description: "Building youth leadership across Cambodia since 2014.",
    sparklineData: [1, 3, 4, 6, 7, 9, 10],
  },
  {
    value: 1.2,
    suffix: "K+",
    decimals: 1,
    label: "Youth Empowered",
    description: "With housing, scholarships, and life skills training.",
    sparklineData: [89, 200, 380, 560, 750, 980, 1200],
    yoyDelta: 28,
    storyHook: "Follow one student's complete journey through YAD →",
  },
];

// TODO: Replace with real YAD program distribution data
const WAFFLE_PROGRAMS = [
  { name: "Dormitory & Leadership", count: 480, colorKey: "primary" as const },
  { name: "Community Schools", count: 340, colorKey: "secondary" as const },
  { name: "Porridge for Hope", count: 380, colorKey: "tertiary" as const },
];

export function MeasurableImpactSection() {
  return (
    <section className="py-24 border-b border-outline-variant/30 bg-surface">
      <div className="max-w-container-max mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left: Editorial Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <TextReveal 
              as="h2" 
              text="Scale of Impact" 
              className="text-4xl lg:text-5xl font-light text-primary mb-6 tracking-tighter leading-[1.0]" 
            />
            <RevealOnScroll delay={0.1}>
              <p className="text-base font-light text-on-surface-variant leading-relaxed max-w-md mb-10">
                When you engage with YAD, you are directly investing in a sustainable cycle of youth empowerment and profound societal transformation. The numbers reflect individual lives forever changed.
              </p>
            </RevealOnScroll>

            {/* Waffle Chart — visual weight of impact */}
            <RevealOnScroll delay={0.3}>
              <div className="hidden lg:block">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/70">
                    Student Distribution
                  </span>
                  <div className="flex-1 h-[1px] bg-outline-variant/30" />
                </div>
                <WaffleChart
                  total={1200}
                  programs={WAFFLE_PROGRAMS}
                  cellValue={10}
                />
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Enhanced Data Metrics */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex flex-col">
              {ENHANCED_METRICS.map((metric, index) => (
                <EnhancedStatCard
                  key={metric.label}
                  value={metric.value}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                  label={metric.label}
                  description={metric.description}
                  sparklineData={metric.sparklineData}
                  yoyDelta={metric.yoyDelta}
                  storyHook={metric.storyHook}
                />
              ))}
            </div>
          </div>

          {/* Mobile Waffle Chart */}
          <div className="lg:hidden col-span-1">
            <RevealOnScroll>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/70">
                  Student Distribution
                </span>
                <div className="flex-1 h-[1px] bg-outline-variant/30" />
              </div>
              <WaffleChart
                total={1200}
                programs={WAFFLE_PROGRAMS}
                cellValue={10}
              />
            </RevealOnScroll>
          </div>
          
        </div>
      </div>
    </section>
  );
}
