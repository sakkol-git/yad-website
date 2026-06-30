import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export const metadata: Metadata = {
  title: "Community Schools | YAD Programs",
  description:
    "Learn about YAD's Community Schools and Slum Education programs bringing English and Life Skills to marginalized areas in Cambodia.",
};

export default function CommunitySchoolsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Programs", url: "https://yadkh.org/programs" },
    { name: "Community Schools", url: "https://yadkh.org/programs/community-schools" },
  ];

  return (
    <main className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-20 overflow-hidden border-b border-outline-variant/30">
      <RevealOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-container-max relative z-10">
        <BreadcrumbSchema items={breadcrumbs} />

        <div className="mb-16">
          <span className="block text-primary kicker-label mb-4">Programs</span>
          <TextReveal
            as="h1"
            text="Community Schools & Slum Education"
            className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] font-light mb-6"
          />
          <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-3xl">
            Taking education directly to where it&apos;s needed most. We provide vital English and
            Life Skills education to children in poverty-stricken urban slum communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <TextReveal
              as="h2"
              text="Bridging the Gap"
              className="text-4xl lg:text-5xl font-light text-secondary tracking-tighter leading-[1.0] mb-6"
            />
            <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed mb-8">
              Our mobile tutoring units and pop-up classrooms ensure no child is left behind due to
              geographical or economic barriers. By teaching critical Life Skills and foundational
              English directly within slum communities, we advance the abilities and opportunities
              of Cambodia&apos;s most vulnerable youth.
            </p>

            <div className="bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 hover:border-primary/40 transition-colors duration-300 p-8 rounded-md mb-8">
              <h3 className="text-2xl font-light text-on-surface tracking-tight mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">school</span>
                Program Centers
              </h3>
              <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed mb-4">
                We operate out of multiple dedicated community supports across Phnom Penh,
                including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
                <li>
                  <strong>Rudi Boa Center</strong>
                </li>
                <li>
                  <strong>Wat Than Heimberg Center</strong>
                </li>
                <li>
                  <strong>Youth Leaders Centre (YLC)</strong>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-light text-on-surface tracking-tight mb-4">
              Mobile Tutoring Units
            </h3>
            <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed">
              Reaching over 500 children weekly in marginalized areas with basic literacy and
              numeracy programs. Our goal is to integrate 80% of participating children into formal
              schooling systems within 12 months.
            </p>
          </div>

          <div className="bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 rounded-md overflow-hidden shadow-ambient p-4 group h-fit">
            <div className="rounded-sm overflow-hidden w-full h-auto">
              <Image
                src="/assets/images/yad-5.png"
                alt="Community education session in progress"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                width={800}
                height={600}
              />
            </div>
            <p className="text-sm text-center mt-3 text-on-surface-variant italic">
              Providing accessible learning resources to marginalized areas.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </main>
  );
}
