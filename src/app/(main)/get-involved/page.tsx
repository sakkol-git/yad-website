import type { Metadata } from "next";
import { GetInvolvedHero } from "@/features/Static/content/components/GetInvolvedHero";
import { ImpactPaths } from "@/features/Static/content/components/ImpactPaths";
import { QuickFormSection } from "@/features/Static/content/components/QuickFormSection";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Join YAD in empowering youth for sustainable development. Fund, mentor, or partner with us to create waves of positive change.",
};

export default function GetInvolvedPage() {
  return (
    <main>
      <GetInvolvedHero />
      <ImpactPaths />
      <QuickFormSection />
    </main>
  );
}
