import { PartnerHero } from "@/features/partner/components/PartnerHero";
import { PartnerGrid } from "@/features/partner/components/PartnerGrid";
import { PartnerCTA } from "@/features/partner/components/PartnerCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners - Youth Advancement for Development",
  description: "Driving Change Through Strategic Partnerships.",
};

export default function PartnerPage() {
  return (
    <main className="flex-grow">
      <PartnerHero />
      <PartnerGrid />
      <PartnerCTA />
    </main>
  );
}
