import { HomeHero } from "@/features/home/components/HomeHero";
import { ImpactPreview } from "@/features/home/components/ImpactPreview";
import { ProgramCards } from "@/features/home/components/ProgramCards";
import { CommunityVoices } from "@/features/home/components/CommunityVoices";
import { HomeCTA } from "@/features/home/components/HomeCTA";

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
