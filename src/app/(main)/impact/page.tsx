import type { Metadata } from "next";
import { ImpactHero } from "@/features/impact/components/ImpactHero";
import { GlobalFootprint } from "@/features/impact/components/GlobalFootprint";
import { VoicesOfImpact } from "@/features/impact/components/VoicesOfImpact";
import { RadicalTransparency } from "@/features/impact/components/RadicalTransparency";

export const metadata: Metadata = {
  title: "Impact & Stories",
  description: "Explore YAD's real-time impact dashboard and inspiring stories of young leaders driving sustainable development.",
};

export default function ImpactPage() {
  return (
    <main className="flex-grow pt-32 pb-section-gap">
      <ImpactHero />
      <GlobalFootprint />
      <VoicesOfImpact />
      <RadicalTransparency />
    </main>
  );
}
