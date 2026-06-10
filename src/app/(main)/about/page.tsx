import { AboutHero } from "@/features/Static/content/components/AboutHero";
import { CorePurpose } from "@/features/Static/content/components/CorePurpose";
import { CommunityStructure } from "@/features/Entities/members/components/CommunityStructure";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <CorePurpose />
      <CommunityStructure />
    </main>
  );
}
