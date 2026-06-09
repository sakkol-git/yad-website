import { AboutHero } from "@/features/about/components/AboutHero";
import { CorePurpose } from "@/features/about/components/CorePurpose";
import { CommunityStructure } from "@/features/about/components/CommunityStructure";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <CorePurpose />
      <CommunityStructure />
    </main>
  );
}
