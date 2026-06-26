import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { ImpactPathCard } from "@/features/Static/impact/ImpactPathCard";
import { PATHS } from "@/shared/constants/impact";

export function ImpactPaths() {
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-surface-container-lowest"
      id="pathways"
    >
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 border-b border-outline-variant/30 pb-10">
          <RevealOnScroll y={20}>
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-primary">
                Take Action
              </span>
            </div>
          </RevealOnScroll>
          <TextReveal 
            as="h2" 
            text="Choose Your Impact Path." 
            className="text-[3.5rem] md:text-[4.5rem] text-primary tracking-tighter leading-[1.0] mb-6" 
          />
        </div>
        <StaggerGroup y={28} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PATHS.map((path) => (
            <ImpactPathCard key={path.title} {...path} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
