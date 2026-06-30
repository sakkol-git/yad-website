import { Metadata } from "next";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { AlumniTeam } from "@/features/Entities/members/components/AlumniTeam";

export const metadata: Metadata = {
  title: "Alumni Mentors | YAD Cambodia",
  description: "Meet the former residents who return to guide the next generation at YAD Cambodia.",
};

export default function AlumniTeamPage() {
  return (
    <main className="pb-section-gap bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-container-max">
        {/* Editorial Page Header */}
        <div className="pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-outline-variant/30 mb-16">
          <RevealOnScroll className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                Extended Network
              </span>
            </div>
            <TextReveal
              as="h1"
              text="Alumni Mentors."
              className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.0] mb-8"
            />
            <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
              Former residents who return to guide the next generation, committed to transparency,
              accountability, and sustainable impact.
            </p>
          </RevealOnScroll>
        </div>

        <AlumniTeam />

        {/* Editorial Transparency Section */}
        <RevealOnScroll className="mt-32 border-t border-b border-outline-variant/30 py-16 md:py-24 max-w-4xl mx-auto text-center">
          <span className="kicker-label text-primary block mb-6">Commitment to Transparency</span>
          <p className="text-2xl md:text-3xl text-on-surface font-light leading-relaxed tracking-tight">
            Our Board of Directors meets quarterly to review programmatic impact, financial health,
            and strategic direction. We adhere to global NGO standards for financial reporting and
            operational integrity.
          </p>
        </RevealOnScroll>
      </div>
    </main>
  );
}
