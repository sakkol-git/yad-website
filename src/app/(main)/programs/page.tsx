import type { Metadata } from "next";
import { ProgramsHero } from "@/features/Entities/programs/components/ProgramsHero";
import { DormitoryProgram } from "@/features/Entities/programs/components/DormitoryProgram";
import { DigitalInnovation } from "@/features/Entities/programs/components/DigitalInnovation";
import { SlumEducation } from "@/features/Entities/programs/components/SlumEducation";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore YAD's core programs: Dormitory & Youth Training, Digital Innovation, and Slum Community Education.",
};

export default function ProgramsPage() {
  return (
    <main className="pt-32 pb-section-gap">
      <ProgramsHero />
      <DormitoryProgram />
      <DigitalInnovation />
      <SlumEducation />
    </main>
  );
}
