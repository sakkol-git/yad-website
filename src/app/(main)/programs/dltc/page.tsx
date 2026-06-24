import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

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
    <main className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-20 overflow-hidden border-b border-outline-variant/30">
      <RevealOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="mb-16">
        <span className="block text-primary uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
          Programs
        </span>
        <TextReveal 
          as="h1" 
          text="Dormitory and Leadership Training Centre (DLTC)" 
          className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] font-light mb-6" 
        />
        <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-3xl">
          The DLTC is a core program of Youth Advancement for Development (YAD) supporting marginalized Cambodian youths from remote provinces and urban slum communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <TextReveal 
            as="h2" 
            text="Program Overview" 
            className="text-4xl lg:text-5xl font-light text-secondary tracking-tighter leading-[1.0] mb-6" 
          />
          <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed mb-8">
            Currently supporting <strong>18 talented students</strong>, the DLTC provides far more than just a place to sleep. We offer comprehensive housing, scholarships, and an immersive environment focused on leadership and life skills to ensure successful university access and graduation.
          </p>

          <h3 className="text-2xl font-light text-on-surface tracking-tight mb-4">Support for Poor Students</h3>
          <ul className="list-disc pl-5 mb-10 space-y-2 text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
            <li>Dormitory housing at the DLTC in central Phnom Penh</li>
            <li>Bicycles for transport to and from classes</li>
            <li>University Scholarships</li>
          </ul>

          <h3 className="text-2xl font-light text-on-surface tracking-tight mb-4">Activities and Services</h3>
          <ul className="list-disc pl-5 mb-8 space-y-2 text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
            <li>A leadership training based, self-governance model for all residents</li>
            <li>Weekly leadership seminars on conflict resolution, mental health, and job seeking</li>
            <li>Extensive life skills training and programs</li>
            <li>English and computer classes</li>
            <li>Expert Guest speakers</li>
          </ul>
        </div>
        
        <div className="bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 rounded-md-md overflow-hidden shadow-ambient p-4 group h-fit">
          <div className="rounded-md-sm overflow-hidden w-full h-auto">
            <Image 
              src="/assets/images/yad-6.png" 
              alt="Students waving from balconies of the DLTC building" 
              className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
              width={800} height={600} 
            />
          </div>
          <p className="text-sm text-center mt-3 text-on-surface-variant italic">
            One of the YAD programs, Dormitory and Leadership Training Centre
          </p>
        </div>
        </div>
      </RevealOnScroll>
    </main>
  );
}
