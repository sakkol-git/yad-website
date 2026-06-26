import { Metadata } from "next";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { ResidentsTeam } from "@/features/Entities/members/components/ResidentsTeam";

export const metadata: Metadata = {
  title: "Residents | YAD Cambodia",
  description: "Meet the dedicated university students living and learning at YAD Cambodia.",
};

export default function ResidentTeamPage() {
  return (
    <main className="pb-section-gap bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Editorial Page Header */}
        <div className="pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-outline-variant/30 mb-16">
          <RevealOnScroll className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                Our Community
              </span>
            </div>
            <TextReveal 
              as="h1" 
              text="The Residents." 
              className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.0] mb-8" 
            />
            <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
              YAD is guided by a dedicated team of professionals and a volunteer Board of Directors committed to transparency, accountability, and sustainable impact.
            </p>
          </RevealOnScroll>
        </div>

        <ResidentsTeam />

        {/* Editorial Transparency Section */}
        <RevealOnScroll className="mt-32 border-t border-b border-outline-variant/30 py-16 md:py-24 max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary block mb-6">
            Commitment to Transparency
          </span>
          <p className="text-2xl md:text-3xl text-on-surface font-light leading-relaxed tracking-tight">
            Our Board of Directors meets quarterly to review programmatic impact, financial health, and strategic direction. We adhere to global NGO standards for financial reporting and operational integrity.
          </p>
        </RevealOnScroll>
      </div>
    </main>
  );
}
