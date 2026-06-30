import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function VisionSection() {
  return (
    <section className="relative py-24 bg-surface overflow-hidden">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-outline-variant/30 pb-8">
          <TextReveal
            as="h2"
            text="Empowering Youth for a Better Tomorrow."
            className="text-[2.5rem] md:text-[3.5rem] text-primary tracking-tighter leading-[1.0] max-w-xl"
          />
          <RevealOnScroll delay={0.1}>
            <p className="text-base text-on-surface-variant font-light max-w-sm leading-relaxed">
              Our mission is to empower a new generation of young leaders and advance the abilities
              of Cambodia&apos;s future changemakers.
            </p>
          </RevealOnScroll>
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Mission Statement */}
          <StaggerGroup
            y={24}
            className="flex flex-col h-full bg-surface-container-lowest p-8 md:p-12 rounded-md border border-outline-variant/30 justify-center"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="kicker-label text-primary">Our Mission</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-on-surface tracking-tight leading-tight mb-6">
              To empower a new generation of young leaders
            </h3>
            <p className="text-base text-on-surface-variant font-light leading-relaxed mb-4">
              Youth Advancement for Development (YAD), previously known as the Attitude Centre for
              Education (ACE), is an independent Cambodian NGO that provides education, housing,
              training, and work experience to disadvantaged youth in Cambodia.
            </p>
            <p className="text-base text-on-surface-variant font-light leading-relaxed">
              From teaching Life Skills and English to slum children to providing accommodation,
              Leadership Skills, and university support, our work advances the abilities and
              opportunities of Cambodia&apos;s future leaders.
            </p>
          </StaggerGroup>

          {/* Right Column: Core Initiatives Timeline/List */}
          <StaggerGroup y={24} className="flex flex-col gap-10">
            <div className="inline-flex items-center gap-4 mb-2">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="kicker-label text-primary">Core Initiatives</span>
            </div>

            <div className="flex gap-6 group items-start">
              <div className="w-14 h-14 rounded-md border border-primary text-primary flex items-center justify-center shrink-0 bg-primary/5 transition-transform group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-2xl">apartment</span>
              </div>
              <div>
                <h4 className="text-xl font-light text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">
                  Dormitory & Leadership Training
                </h4>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed max-w-md">
                  Provides safe housing, scholarships, and extensive life skills training for
                  promising and talented university students from remote provinces.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group items-start border-t border-outline-variant/30 pt-10">
              <div className="w-14 h-14 rounded-md border border-primary text-primary flex items-center justify-center shrink-0 bg-primary/5 transition-transform group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
              <div>
                <h4 className="text-xl font-light text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">
                  Porridge for Hope & Schools
                </h4>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed max-w-md">
                  Combats malnutrition and brings basic education directly to poverty-stricken
                  communities, reaching hundreds of children weekly.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group items-start border-t border-outline-variant/30 pt-10">
              <div className="w-14 h-14 rounded-md border border-primary text-primary flex items-center justify-center shrink-0 bg-primary/5 transition-transform group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-2xl">diversity_3</span>
              </div>
              <div>
                <h4 className="text-xl font-light text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">
                  Young Professionals & Volunteers
                </h4>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed max-w-md">
                  Develops workforce readiness and fosters international cross-cultural exchange
                  through our sustainable Homestay enterprise.
                </p>
              </div>
            </div>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
