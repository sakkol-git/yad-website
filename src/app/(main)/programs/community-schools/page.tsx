import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Community Schools | YAD Programs",
  description: "Learn about YAD's Community Schools and Slum Education programs bringing English and Life Skills to marginalized areas in Cambodia.",
};

export default function CommunitySchoolsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Programs", url: "https://yadkh.org/programs" },
    { name: "Community Schools", url: "https://yadkh.org/programs/community-schools" },
  ];

  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="mb-12">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-4">
          Community Schools &amp; Slum Education
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Taking education directly to where it&apos;s needed most. We provide vital English and Life Skills education to children in poverty-stricken urban slum communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-headline-md text-headline-md text-secondary mb-4">Bridging the Gap</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Our mobile tutoring units and pop-up classrooms ensure no child is left behind due to geographical or economic barriers. By teaching critical Life Skills and foundational English directly within slum communities, we advance the abilities and opportunities of Cambodia&apos;s most vulnerable youth.
          </p>

          <div className="bg-surface-container-low p-6 rounded-lg mb-6 border border-surface-container-high">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">school</span>
              Program Centers
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              We operate out of multiple dedicated community supports across Phnom Penh, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
              <li><strong>Rudi Boa Center</strong></li>
              <li><strong>Wat Than Heimberg Center</strong></li>
              <li><strong>Youth Leaders Centre (YLC)</strong></li>
            </ul>
          </div>

          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Mobile Tutoring Units</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Reaching over 500 children weekly in marginalized areas with basic literacy and numeracy programs. Our goal is to integrate 80% of participating children into formal schooling systems within 12 months.
          </p>
        </div>
        
        <div className="bg-surface-container rounded-xl overflow-hidden shadow-ambient p-4 h-fit">
          <Image 
            src="/assets/images/yad-5.png" 
            alt="Community education session in progress" 
            className="w-full h-auto rounded-lg"
            width={800} height={600} />
          <p className="text-sm text-center mt-3 text-on-surface-variant italic">
            Providing accessible learning resources to marginalized areas.
          </p>
        </div>
      </div>
    </main>
  );
}
