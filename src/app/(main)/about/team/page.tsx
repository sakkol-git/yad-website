import { Metadata } from "next";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { CommunityStructureTeams } from "@/features/Entities/members/components/CommunityStructureTeams";

export const metadata: Metadata = {
  title: "Leadership & Governance | YAD Cambodia",
  description: "Meet the dedicated team and board members driving youth empowerment at YAD Cambodia.",
};

export default function TeamPage() {
  return (
    <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-tertiary font-label-bold text-label-bold tracking-wider uppercase mb-2 block">
            Our Community
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary mb-6">
            Resident and Alumni Association
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            YAD is guided by a dedicated team of professionals and a volunteer Board of Directors committed to transparency, accountability, and sustainable impact.
          </p>
        </RevealOnScroll>

        <CommunityStructureTeams />

        <RevealOnScroll y={20} className="mt-24 max-w-4xl mx-auto bg-surface-container rounded-2xl p-8 md:p-12 text-center border border-outline-variant/40">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Commitment to Transparency</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-0">
            Our Board of Directors meets quarterly to review programmatic impact, financial health, and strategic direction. We adhere to global NGO standards for financial reporting and operational integrity.
          </p>
        </RevealOnScroll>
      </div>
    </main>
  );
}
