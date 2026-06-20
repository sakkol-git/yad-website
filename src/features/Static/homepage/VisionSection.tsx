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
              OUR MISSION: TO EMPOWER A NEW GENERATION OF YOUNG LEADERS
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Youth Advancement for Development (YAD), previously known as the Attitude Centre for Education (ACE), is an independent Cambodian NGO that provides education, housing, training, and work experience to disadvantaged youth in Cambodia.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              From teaching Life Skills and English to slum children to providing accommodation, Leadership Skills, English and Life Skills to university students, our work advances the abilities and opportunities of Cambodia&apos;s future leaders.
            </p>
          </StaggerGroup>

          <StaggerGroup y={24} className="flex flex-col space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary">
              Core Initiatives Transforming Lives
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Our <strong className="font-semibold text-on-surface">Dormitory &amp; Leadership Training Centre (DLTC)</strong> provides safe housing, scholarships, and extensive life skills training for promising and talented university students from remote provinces and urban slum communities.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Our <strong className="font-semibold text-on-surface">Porridge for Hope &amp; Community Schools</strong> initiatives combat malnutrition and bring basic education directly to poverty-stricken communities, reaching hundreds of children weekly.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Our <strong className="font-semibold text-on-surface">Young Professionals &amp; Volunteer</strong> programs aim to develop workforce readiness and foster international cross-cultural exchange through our sustainable Homestay enterprise.
            </p>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
