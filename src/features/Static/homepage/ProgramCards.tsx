import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

const PROGRAMS = [
  {
    id: "dormitory",
    index: "01",
    title: "Dormitory & Leadership",
    description:
      "Housing, scholarships, and extensive life skills for promising students from remote provinces. We build the infrastructure necessary for the next generation of Cambodian leaders to thrive in university and beyond.",
    imageSrc: "/assets/images/yad-2.png",
    imageAlt: "Students in the YAD Dormitory & Leadership program",
    href: "/programs/dormitory",
    priority: true,
  },
  {
    id: "porridge",
    index: "02",
    title: "Porridge for Hope",
    description:
      "Combating malnutrition with bi-monthly nutrition programs for children in extreme poverty, ensuring food security as the absolute foundation for learning and cognitive development.",
    imageSrc: "/assets/images/yad-4.png",
    imageAlt: "Children in the Porridge for Hope nutrition program",
    href: "/programs/porridge",
    priority: false,
  },
  {
    id: "community-schools",
    index: "03",
    title: "Community Schools",
    description:
      "Taking English and essential Life Skills education directly to urban slum communities, reaching children where access to formal public schooling is logistically or financially impossible.",
    imageSrc: "/assets/images/yad-5.png",
    imageAlt: "Community schools education session in Phnom Penh",
    href: "/programs/community-schools",
    priority: false,
  },
];

export function ProgramCards() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-container-max mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Header */}
        <RevealOnScroll className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="block text-primary uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
              Strategic Interventions
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-primary tracking-tighter leading-[1.0]">
              Three Pillars of <br className="hidden md:block" /> Lasting Change.
            </h2>
          </div>
          <p className="text-base text-on-surface-variant font-light max-w-md leading-relaxed">
            Each program is meticulously designed to dismantle a specific systemic barrier preventing Cambodia&apos;s youth from reaching their absolute potential.
          </p>
        </RevealOnScroll>

        {/* Editorial Program List */}
        <div className="flex flex-col gap-24 md:gap-32">
          {PROGRAMS.map((program, idx) => {
            const isEven = idx % 2 !== 0;
            return (
              <div 
                key={program.id} 
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                
                {/* Image Area */}
                <div className={`lg:col-span-7 ${isEven ? "lg:order-last" : ""}`}>
                  <RevealOnScroll>
                    <ImageRevealMask className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden group">
                      <Image
                        src={program.imageSrc}
                        alt={program.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority={program.priority}
                      />
                      <div className="absolute inset-0 bg-surface-tint/5 mix-blend-multiply" />
                    </ImageRevealMask>
                  </RevealOnScroll>
                </div>

                {/* Text Content */}
                <div className="lg:col-span-5 flex flex-col">
                  <RevealOnScroll delay={0.2}>
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="text-3xl text-outline-variant/50 font-light">
                        {program.index}
                      </span>
                      <div className="h-px bg-outline-variant/30 flex-1" />
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-light text-on-surface mb-6 tracking-tight">
                      {program.title}
                    </h3>
                    
                    <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-10">
                      {program.description}
                    </p>
                    
                    <Link
                      href={program.href}
                      className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.1em] text-[10px] font-bold hover:text-secondary transition-colors group w-fit"
                    >
                      Read Full Overview
                      <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                        arrow_right_alt
                      </span>
                    </Link>
                  </RevealOnScroll>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}