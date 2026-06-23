import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function VisionSection() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Massive, Clean Editorial Headline */}
        <RevealOnScroll className="mb-20 md:mb-32">
          <h2 className="text-5xl md:text-6xl lg:text-[5rem] text-on-surface tracking-tight leading-[1.05] max-w-5xl">
            Empowering youth in Cambodia <br className="hidden md:block" />
            for a <span className="font-semibold italic">better tomorrow.</span>
          </h2>
        </RevealOnScroll>

        {/* Asymmetrical Layout: 5 columns left (Mission), 6 columns right (Initiatives) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">

          {/* Left Column: The Mission (Typographic Focus) */}
          {/* FIXED: Removed RevealOnScroll to prevent the invisible bug. */}
          <div className="lg:col-span-5 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-on-surface" />
              <span className="uppercase tracking-widest text-xs font-semibold text-on-surface">
                Our Mission
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-light text-on-surface leading-snug mb-8">
              Youth Advancement for Development (YAD) is an independent NGO providing education, housing, and opportunity to disadvantaged youth.
            </h3>

            <div className="space-y-6 text-on-surface-variant font-light leading-relaxed max-w-md">
              <p>
                Previously known as the Attitude Centre for Education (ACE), we go beyond basic charity. We provide the structural support needed to create lasting generational change.
              </p>
              <p>
                From teaching Life Skills and English to slum children to providing accommodation, Leadership Skills, and university support, our work advances the abilities of Cambodia&apos;s future leaders.
              </p>
            </div>
          </div>

          {/* Right Column: Core Initiatives (Editorial List) */}
          <div className="lg:col-span-6 lg:col-start-7">
            <StaggerGroup y={20} className="flex flex-col w-full">

              <div className="hidden lg:flex items-center gap-3 mb-8 opacity-0 pointer-events-none">
                {/* Spacer to align with the left column's top element */}
                <span className="uppercase tracking-widest text-xs font-semibold">Initiatives</span>
              </div>

              {/* Initiative 01 */}
              <div className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-8 py-8 border-t border-outline-variant/40 transition-colors hover:border-on-surface/30">
                <span className="text-sm font-medium text-on-surface-variant/50 group-hover:text-primary transition-colors shrink-0 pt-1">
                  01
                </span>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium text-on-surface mb-3">
                    Dormitory & Leadership
                  </h4>
                  <p className="text-on-surface-variant font-light leading-relaxed">
                    Providing safe housing, comprehensive scholarships, and extensive life skills training for talented university students from remote, underserved provinces.
                  </p>
                </div>
              </div>

              {/* Initiative 02 */}
              <div className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-8 py-8 border-t border-outline-variant/40 transition-colors hover:border-on-surface/30">
                <span className="text-sm font-medium text-on-surface-variant/50 group-hover:text-primary transition-colors shrink-0 pt-1">
                  02
                </span>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium text-on-surface mb-3">
                    Porridge for Hope & Schools
                  </h4>
                  <p className="text-on-surface-variant font-light leading-relaxed">
                    Combating child malnutrition while simultaneously bringing basic education directly to poverty-stricken communities, reaching hundreds of children every week.
                  </p>
                </div>
              </div>

              {/* Initiative 03 */}
              <div className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-8 py-8 border-t border-b border-outline-variant/40 transition-colors hover:border-on-surface/30">
                <span className="text-sm font-medium text-on-surface-variant/50 group-hover:text-primary transition-colors shrink-0 pt-1">
                  03
                </span>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium text-on-surface mb-3">
                    Professionals & Volunteers
                  </h4>
                  <p className="text-on-surface-variant font-light leading-relaxed">
                    Developing workforce readiness and fostering international, cross-cultural exchange through our self-sustaining, community-integrated Homestay enterprise.
                  </p>
                </div>
              </div>

            </StaggerGroup>
          </div>

        </div>
      </div>
    </section>
  );
}