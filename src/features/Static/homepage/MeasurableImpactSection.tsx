"use client";

import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { AnimatedCounter } from "@/shared/components/animations/AnimatedCounter";
import { METRICS } from "@/shared/constants/homepage";

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
              <p className="text-base font-light text-on-surface-variant leading-relaxed max-w-md">
                When you engage with YAD, you are directly investing in a sustainable cycle of youth empowerment and profound societal transformation. The numbers reflect individual lives forever changed.
              </p>
            </RevealOnScroll>
          </div>

          {/* Right: Data Visualization / Metrics Ribbon */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex flex-col">
              {METRICS.map((metric, index) => (
                <RevealOnScroll 
                  key={metric.label} 
                  delay={index * 0.15}
                  className="group py-12 border-t border-outline-variant/30 first:border-t-0 lg:first:pt-0 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                  <div className="max-w-xs">
                    <h3 className="text-xl font-light text-on-surface mb-3 tracking-tight">
                      {metric.label}
                    </h3>
                    <p className="text-sm font-light text-on-surface-variant/80">
                      {metric.description}
                    </p>
                  </div>
                  <AnimatedCounter 
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                    className="text-6xl md:text-7xl lg:text-8xl text-primary font-light tabular-nums tracking-tighter group-hover:scale-105 group-hover:text-secondary transition-colors duration-150 origin-bottom-right inline-block"
                  />
                </RevealOnScroll>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
