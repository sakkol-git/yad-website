import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { ImpactHero } from "@/features/Static/content/components/ImpactHero";
import { GlobalFootprint } from "@/features/Static/content/components/GlobalFootprint";
import { VoicesOfImpact } from "@/features/Static/content/components/VoicesOfImpact";
import { RadicalTransparency } from "@/features/Static/content/components/RadicalTransparency";

export const metadata: Metadata = {
  title: "Our Impact & Stories",
  description: "Explore YAD's real-time impact dashboard and inspiring stories of young Cambodian leaders driving sustainable development and overcoming poverty.",
  openGraph: {
    title: "Our Impact & Stories | YAD Cambodia",
    description: "Explore YAD's real-time impact dashboard and inspiring stories of young Cambodian leaders driving sustainable development and overcoming poverty.",
    url: "https://yadkh.org/impact",
  },
};

export default function ImpactPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Our Impact", url: "https://yadkh.org/impact" },
  ];

  return (
    <main className="flex-grow pt-32 pb-section-gap">
      <BreadcrumbSchema items={breadcrumbs} />
      <ImpactHero />
      <GlobalFootprint />
      <VoicesOfImpact />
      <RadicalTransparency />
    </main>
  );
}
