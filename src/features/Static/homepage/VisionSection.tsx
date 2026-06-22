import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function VisionSection() {
  return (
    <section className="relative py-24 bg-surface overflow-hidden">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section Header */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-surface mb-6 tracking-tight">
            Empowering Youth in Cambodia for a Better Tomorrow
          </h2>
          <div className="w-24 h-1.5 bg-primary rounded-full mx-auto opacity-80" />
        </RevealOnScroll>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Mission Statement */}
          <StaggerGroup y={24} className="flex flex-col space-y-6 bg-surface-container-low p-8 md:p-12 rounded-3xl border border-outline-variant/30">
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-2">
              <span className="material-symbols-outlined text-[20px]">flag</span>
              Our Mission
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-on-surface leading-tight">
              To empower a new generation of young leaders
            </h3>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Youth Advancement for Development (YAD), previously known as the Attitude Centre for Education (ACE), is an independent Cambodian NGO that provides education, housing, training, and work experience to disadvantaged youth in Cambodia.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              From teaching Life Skills and English to slum children to providing accommodation, Leadership Skills, and university support, our work advances the abilities and opportunities of Cambodia&apos;s future leaders.
            </p>
          </StaggerGroup>

          {/* Right Column: Core Initiatives Timeline/List */}
          <StaggerGroup y={24} className="flex flex-col space-y-8">
            <div className="inline-flex items-center gap-2 text-secondary font-bold tracking-wider uppercase text-sm mb-2">
              <span className="material-symbols-outlined text-[20px]">star</span>
              Core Initiatives
            </div>

            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">apartment</span>
                </div>
                <div className="w-0.5 h-full bg-outline-variant/30 my-2 group-hover:bg-primary/30 transition-colors" />
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-bold text-on-surface mb-2">Dormitory & Leadership Training</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Provides safe housing, scholarships, and extensive life skills training for promising and talented university students from remote provinces.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">restaurant</span>
                </div>
                <div className="w-0.5 h-full bg-outline-variant/30 my-2 group-hover:bg-secondary/30 transition-colors" />
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-bold text-on-surface mb-2">Porridge for Hope & Schools</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Combats malnutrition and brings basic education directly to poverty-stricken communities, reaching hundreds of children weekly.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">diversity_3</span>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-on-surface mb-2">Young Professionals & Volunteers</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Develops workforce readiness and fosters international cross-cultural exchange through our sustainable Homestay enterprise.
                </p>
              </div>
            </div>

          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
