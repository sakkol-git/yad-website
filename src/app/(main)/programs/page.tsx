import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { ProgramsHero } from "@/features/Static/programs/components/ProgramsHero";
import { DormitoryProgram } from "@/features/Static/programs/components/DormitoryProgram";
import { DigitalInnovation } from "@/features/Static/programs/components/DigitalInnovation";
import { SlumEducation } from "@/features/Static/programs/components/SlumEducation";

export const metadata: Metadata = {
  title: "Our Programs",
  description: "Explore YAD's core NGO programs in Cambodia: Dormitory & Youth Training, Digital Innovation, and Slum Community Education.",
  openGraph: {
    title: "Our Programs | YAD Cambodia",
    description: "Explore YAD's core NGO programs in Cambodia: Dormitory & Youth Training, Digital Innovation, and Slum Community Education.",
    url: "https://yadkh.org/programs",
  },
};

export default function ProgramsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Our Programs", url: "https://yadkh.org/programs" },
  ];

  return (
    <main className="pb-section-gap">
      <BreadcrumbSchema items={breadcrumbs} />
      <ProgramsHero />
      <DormitoryProgram />
      <DigitalInnovation />
      <SlumEducation />
    </main>
  );
}
