import type { Metadata } from "next";
import { OrganizationSchema } from "@/shared/components/seo/OrganizationSchema";
import { WebSiteSchema } from "@/shared/components/seo/WebSiteSchema";
import { HomeHero } from "@/features/Static/homepage/HomeHero";
import { PartnerLogos } from "@/features/Static/homepage/PartnerLogos";
import { ImpactPreview } from "@/features/Static/impact/ImpactPreview";
import { ProgramCards } from "@/features/Static/homepage/ProgramCards";
import { CommunityVoices } from "@/features/Static/homepage/CommunityVoices";
import { HomeCTA } from "@/features/Static/homepage/HomeCTA";
import { VisionSection } from "@/features/Static/homepage/VisionSection";
import { MeasurableImpactSection } from "@/features/Static/homepage/MeasurableImpactSection";
import { CambodiaImpactMap } from "@/features/Static/impact/CambodiaImpactMap/CambodiaImpactMap";

export const metadata: Metadata = {
  title: "YAD | Youth Advancement for Development — NGO in Cambodia",
  description: "Youth Advancement for Development (YAD) is an independent Cambodian NGO focused on youth empowerment, housing, leadership training, and community education.",
  openGraph: {
    title: "YAD | Youth Advancement for Development — NGO in Cambodia",
    description: "Youth Advancement for Development (YAD) is an independent Cambodian NGO focused on youth empowerment, housing, leadership training, and community education.",
    url: "https://yadkh.org/",
  },
};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Youth Advancement for Development (YAD)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Youth Advancement for Development (YAD), previously known as the Attitude Centre for Education (ACE), is an independent Cambodian NGO that provides education, housing, training, and work experience to disadvantaged youth in Cambodia."
        }
      },
      {
        "@type": "Question",
        "name": "What programs does YAD Cambodia offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "YAD offers comprehensive Dormitory & Leadership Training, Porridge for Hope nutrition programs, and Community Schools teaching Life Skills and English in slum communities."
        }
      },
      {
        "@type": "Question",
        "name": "How can I volunteer or donate to YAD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can support YAD's mission by visiting our Donate or Get Involved pages. We welcome international donors, volunteers, and those looking to stay at our Homestay."
        }
      },
      {
        "@type": "Question",
        "name": "Where is YAD located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "YAD is headquartered in Phnom Penh, Cambodia, but our impact and mobile education programs reach underprivileged communities across multiple provinces."
        }
      },
      {
        "@type": "Question",
        "name": "Why is youth empowerment important in Cambodia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Empowering youth is critical for Cambodia's future leaders. By providing housing, education, and life skills, we help students secure meaningful employment and uplift their communities."
        }
      }
    ]
  };

  return (
    <main id="main-content">
      <OrganizationSchema />
      <WebSiteSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeHero />
      <PartnerLogos />
      <VisionSection />
      <CambodiaImpactMap />
      <ProgramCards />
      <MeasurableImpactSection />
      <ImpactPreview />
      <CommunityVoices />
      <HomeCTA />
    </main>
  );
}