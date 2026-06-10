import { HomeHero } from "@/features/Static/content/components/HomeHero";
import { ImpactPreview } from "@/features/Static/content/components/ImpactPreview";
import { ProgramCards } from "@/features/Static/content/components/ProgramCards";
import { CommunityVoices } from "@/features/Static/content/components/CommunityVoices";
import { HomeCTA } from "@/features/Static/content/components/HomeCTA";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <ProgramCards />
      <ImpactPreview />
      <CommunityVoices />
      <HomeCTA />
    </main>
  );
}
