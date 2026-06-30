import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { ImpactHero } from "@/features/Static/impact/ImpactHero";
import { GlobalFootprint } from "@/features/Static/impact/GlobalFootprint";
import { CambodiaImpactMap } from "@/features/Static/impact/CambodiaImpactMap/CambodiaImpactMap";
import { StudentJourneySection } from "@/features/Static/impact/StudentJourney/StudentJourneySection";
import { DonorCalculator } from "@/features/Static/impact/DonorCalculator";
import { VoicesOfImpact } from "@/features/Static/impact/VoicesOfImpact";

export const metadata: Metadata = {
  title: "Our Impact & Stories",
  description:
    "Explore YAD's real-time impact dashboard, interactive Cambodia map, student journey infographic, and inspiring stories of young Cambodian leaders driving sustainable development.",
  openGraph: {
    title: "Our Impact & Stories | YAD Cambodia",
    description:
      "Explore YAD's real-time impact dashboard, interactive Cambodia map, and inspiring stories of young Cambodian leaders driving sustainable development.",
    url: "https://yadkh.org/impact",
  },
};

export default function ImpactPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Our Impact", url: "https://yadkh.org/impact" },
  ];

  return (
    <main className="flex-grow pb-section-gap">
      <BreadcrumbSchema items={breadcrumbs} />
      <ImpactHero />
      <GlobalFootprint />
      <CambodiaImpactMap />
      <StudentJourneySection />
      <DonorCalculator />
      <VoicesOfImpact />
    </main>
  );
}
