import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function VisionSection() {
  return (
    <section className="relative py-section-gap bg-surface overflow-hidden">
      <div className="container relative mx-auto px-margin-mobile md:px-margin-desktop max-w-6xl text-left">

        {/* Section Header */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <TextReveal 
            as="h2" 
            text="Empowering Youth in Cambodia for a Better Tomorrow" 
            className="font-headline-lg text-headline-lg text-on-surface mb-6" 
          />
          <div className="w-24 h-1.5 bg-primary rounded-full mx-auto opacity-80" />
        </RevealOnScroll>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <StaggerGroup y={24} className="flex flex-col space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary">
              A Vision for Sustainable Development
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Youth Advancement for Development (YAD) is a non-governmental organization in Phnom Penh, Cambodia. We break the cycle of poverty through education, digital innovation, and grassroots community support.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              We believe every child deserves equitable access to quality education. Through partnerships with local schools, international donors, and volunteers, YAD creates a holistic ecosystem that bridges the educational gap.
            </p>
          </StaggerGroup>

          <StaggerGroup y={24} className="flex flex-col space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary">
              Core Initiatives Transforming Lives
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Our <strong className="font-semibold text-on-surface">Dormitory &amp; Youth Training Program</strong> provides safe housing for students relocating from rural provinces to pursue higher education in the city.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Our <strong className="font-semibold text-on-surface">Digital Innovation bootcamps</strong> equip youth with coding, digital literacy, and modern workplace skills for the evolving Cambodian tech sector.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Our <strong className="font-semibold text-on-surface">Slum Community Education</strong> initiative brings mobile classrooms and resources directly to high-risk, underprivileged communities.
            </p>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
