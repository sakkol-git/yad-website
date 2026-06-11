import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { AboutHero } from "@/features/Static/content/components/AboutHero";
import { CorePurpose } from "@/features/Static/content/components/CorePurpose";
import { CommunityStructure } from "@/features/Entities/members/components/CommunityStructure";

export const metadata: Metadata = {
  title: "About Our Mission",
  description: "Learn about Youth Advancement for Development (YAD) and our mission to empower Cambodian youth through education, technology, and community support.",
  openGraph: {
    title: "About Our Mission | YAD Cambodia",
    description: "Learn about Youth Advancement for Development (YAD) and our mission to empower Cambodian youth through education, technology, and community support.",
    url: "https://yadkh.org/about",
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "About Our Mission", url: "https://yadkh.org/about" },
  ];

  return (
    <main>
      <BreadcrumbSchema items={breadcrumbs} />
      <AboutHero />
      <CorePurpose />
      <CommunityStructure />
    </main>
  );
}
