import type { Metadata } from "next";
import Link from "next/link";
import { OrganizationSchema } from "@/shared/components/seo/OrganizationSchema";
import { WebSiteSchema } from "@/shared/components/seo/WebSiteSchema";
import { HomeHero } from "@/features/Static/content/components/HomeHero";
import { ImpactPreview } from "@/features/Static/content/components/ImpactPreview";
import { ProgramCards } from "@/features/Static/content/components/ProgramCards";
import { CommunityVoices } from "@/features/Static/content/components/CommunityVoices";
import { HomeCTA } from "@/features/Static/content/components/HomeCTA";

export const metadata: Metadata = {
  title: "YAD | Youth Advancement for Development — NGO in Cambodia",
  description: "Youth Advancement for Development (YAD) is a leading NGO in Cambodia focused on youth empowerment, digital innovation, and community education.",
  openGraph: {
    title: "YAD | Youth Advancement for Development — NGO in Cambodia",
    description: "Youth Advancement for Development (YAD) is a leading NGO in Cambodia focused on youth empowerment, digital innovation, and community education.",
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
          "text": "Youth Advancement for Development (YAD) is a premier NGO in Cambodia dedicated to breaking the cycle of poverty by empowering youth through education, digital innovation, and community support."
        }
      },
      {
        "@type": "Question",
        "name": "What programs does YAD Cambodia offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "YAD offers comprehensive Dormitory & Youth Training, cutting-edge Digital Innovation bootcamps for tech skills, and Slum Community Education for high-risk areas in Phnom Penh and beyond."
        }
      },
      {
        "@type": "Question",
        "name": "How can I volunteer or donate to YAD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can support YAD's mission by visiting our Donate or Get Involved pages on our website. We welcome international donors, local volunteers, and corporate partners to join our ecosystem."
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
          "text": "Empowering youth is critical for sustainable economic development in Cambodia. By providing education and digital skills, we help students secure meaningful employment and uplift their communities."
        }
      }
    ]
  };

  return (
    <main>
      <OrganizationSchema />
      <WebSiteSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeHero />

      <section className="relative py-24 lg:py-32 bg-surface overflow-hidden">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-left">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-6">
              Empowering Youth in Cambodia for a Better Tomorrow
            </h2>
            <div className="w-24 h-1.5 bg-primary rounded-full mx-auto opacity-80" />
          </div>

          {/* Two Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div className="flex flex-col space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                A Vision for Sustainable Cambodian Development
              </h3>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Youth Advancement for Development (YAD) is a premier non-governmental organization (NGO) operating in Phnom Penh, Cambodia. We are deeply committed to breaking the cycle of intergenerational poverty through a multi-faceted approach centered around sustainable education, digital innovation, and grassroots community-driven support systems. Operating in the heart of Cambodia, we recognize that the true future of the nation rests in the hands of its youth. Our core mission is to actively equip these young minds with the practical skills, vital resources, and unshakable confidence they need to emerge as the leaders of tomorrow.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                We steadfastly believe that every child—regardless of their socioeconomic background, geography, or current circumstances—deserves equitable access to high-quality education. The educational disparity in marginalized communities often stifles immense potential. Through strategic partnerships with local public schools, international philanthropic donors, and a network of passionate local volunteers, YAD creates a holistic ecosystem of growth that bridges this gap.
              </p>
            </div>

            <div className="flex flex-col space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                Core Initiatives Transforming Lives
              </h3>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Our approach is rooted in direct, high-impact intervention. We run comprehensive <strong className="font-semibold text-on-surface">Dormitory & Youth Training programs</strong> that provide safe, supportive havens for students relocating from remote rural provinces to the city for higher education. Without secure housing, the dream of a university degree is often unattainable.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Furthermore, to prepare our youth for the modern global economy, we spearhead cutting-edge <strong className="font-semibold text-on-surface">Digital Innovation bootcamps</strong>. These intensive technical training sessions focus on coding, digital literacy, and modern workplace technologies, ensuring that our graduates are highly competitive in the rapidly evolving Cambodian tech sector.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                At the grassroots level, our <strong className="font-semibold text-on-surface">Slum Community Education</strong> initiatives bring mobile classrooms and essential educational resources directly to high-risk, underprivileged communities, ensuring no child is left behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProgramCards />

      <section className="relative py-8 lg:py-16 bg-surface overflow-hidden">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-left">
          {/* Impact Feature Box */}
          <div className="relative bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-xl border border-outline/10 mb-16 max-w-4xl mx-auto overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
                Our Measurable Impact on the Community
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Over the years, our measurable impact has reverberated across multiple provinces in Cambodia. We have successfully transitioned hundreds of high-potential students from high-risk environments into stable, thriving educational pathways. Our alumni network is a testament to the success of our model. Graduates of YAD programs have gone on to secure meaningful, well-paying employment in the tech sector, pursue advanced higher education degrees, and most importantly, return to their home communities to serve as inspiring mentors for the next generation.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
                When you engage with YAD—whether through volunteering, partnering, or supporting our funding—you are doing far more than funding an isolated program. You are directly investing in a sustainable cycle of youth empowerment, long-term economic development, and profound societal transformation across Cambodia.
              </p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-center text-lg"
            >
              Learn About Our Mission
            </Link>
            <Link
              href="/programs"
              className="w-full sm:w-auto px-8 py-4 border-2 border-outline/30 bg-transparent text-on-surface font-bold rounded-lg hover:bg-surface-variant hover:border-outline/60 hover:-translate-y-0.5 transition-all duration-300 text-center text-lg"
            >
              Explore Our Programs
            </Link>
          </div>

        </div>
      </section>

      <ImpactPreview />
      <CommunityVoices />
      <HomeCTA />
    </main>
  );
}