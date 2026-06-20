import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Dormitory & Leadership Training Centre (DLTC) | YAD Programs",
  description: "Learn about YAD's Dormitory & Leadership Training Centre (DLTC) providing housing, scholarships, and life skills training to marginalized Cambodian youth.",
};

export default function DLTCPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Programs", url: "https://yadkh.org/programs" },
    { name: "DLTC", url: "https://yadkh.org/programs/dltc" },
  ];

  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="mb-12">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-4">
          Dormitory and Leadership Training Centre (DLTC)
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          The DLTC is a core program of Youth Advancement for Development (YAD) supporting marginalized Cambodian youths from remote provinces and urban slum communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-headline-md text-headline-md text-secondary mb-4">Program Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Currently supporting <strong>18 talented students</strong>, the DLTC provides far more than just a place to sleep. We offer comprehensive housing, scholarships, and an immersive environment focused on leadership and life skills to ensure successful university access and graduation.
          </p>

          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Support for Poor Students</h3>
          <ul className="list-disc pl-5 mb-8 space-y-2 text-on-surface-variant">
            <li>Dormitory housing at the DLTC in central Phnom Penh</li>
            <li>Bicycles for transport to and from classes</li>
            <li>University Scholarships</li>
          </ul>

          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Activities and Services</h3>
          <ul className="list-disc pl-5 mb-6 space-y-2 text-on-surface-variant">
            <li>A leadership training based, self-governance model for all residents</li>
            <li>Weekly leadership seminars on conflict resolution, mental health, and job seeking</li>
            <li>Extensive life skills training and programs</li>
            <li>English and computer classes</li>
            <li>Expert Guest speakers</li>
          </ul>
        </div>
        
        <div className="bg-surface-container rounded-xl overflow-hidden shadow-ambient p-4">
          <img 
            src="/assets/images/yad-6.png" 
            alt="Students waving from balconies of the DLTC building" 
            className="w-full h-auto rounded-lg"
          />
          <p className="text-sm text-center mt-3 text-on-surface-variant italic">
            One of the YAD programs, Dormitory and Leadership Training Centre
          </p>
        </div>
      </div>
    </main>
  );
}
