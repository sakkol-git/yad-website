import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function MeasurableImpactSection() {
  return (
    <section className="relative py-16 lg:py-24 bg-surface-container-lowest overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-full bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5 blur-3xl opacity-50 pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-6 tracking-tight leading-[1.1]">
            Our Measurable Impact on the Community
          </h2>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            When you engage with YAD, you are directly investing in a sustainable cycle of youth empowerment and profound societal transformation.
          </p>
        </RevealOnScroll>

        {/* Bento Box Grid */}
        <StaggerGroup y={32} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Main Feature - Spans 2 columns on lg */}
          <div className="lg:col-span-2 bg-surface/60 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-ambient border border-outline-variant/30 relative overflow-hidden group hover:border-primary/40 hover:-translate-y-1 transition-all duration-500">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-primary/20 rounded-full blur-[60px] group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-700" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-[32px]">school</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-4">Educational Pathways</h3>
                <p className="text-on-surface-variant leading-relaxed max-w-xl text-lg font-light">
                  We have successfully transitioned hundreds of high-potential students from high-risk environments into stable, thriving educational pathways and universities.
                </p>
              </div>
            </div>
          </div>

          {/* Metric 1 */}
          <div className="bg-surface/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-ambient border border-outline-variant/30 relative overflow-hidden group hover:-translate-y-2 hover:border-secondary/40 transition-all duration-500">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-[40px] group-hover:bg-secondary/20 transition-all duration-500" />
            <div className="flex flex-col h-full justify-center text-center relative z-10">
              <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-secondary to-tertiary mb-2 drop-shadow-sm">500+</span>
              <span className="text-on-surface font-semibold uppercase tracking-widest text-xs mt-3">Children Reached Weekly</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-ambient border border-outline-variant/30 relative overflow-hidden group hover:-translate-y-2 hover:border-tertiary/40 transition-all duration-500">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-[40px] group-hover:bg-tertiary/20 transition-all duration-500" />
            <div className="flex flex-col h-full justify-center text-center relative z-10">
              <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-tertiary to-primary mb-2 drop-shadow-sm">10+</span>
              <span className="text-on-surface font-semibold uppercase tracking-widest text-xs mt-3">Years of Impact</span>
            </div>
          </div>

          {/* Alumni Feature - Spans 2 columns on md/lg */}
          <div className="md:col-span-2 bg-surface/60 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-ambient border border-outline-variant/30 relative overflow-hidden group hover:border-tertiary/40 hover:-translate-y-1 transition-all duration-500 flex flex-col sm:flex-row items-center gap-8">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-12 w-48 h-48 bg-tertiary/10 rounded-full blur-[50px] group-hover:bg-tertiary/20 transition-all duration-500" />
            <div className="w-16 h-16 bg-gradient-to-br from-tertiary/20 to-tertiary/5 border border-tertiary/20 text-tertiary rounded-full flex items-center justify-center shrink-0 shadow-inner relative z-10">
              <span className="material-symbols-outlined text-[32px]">work</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-on-surface mb-3">Alumni Network & Employment</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg font-light">
                Graduates of YAD programs secure meaningful employment in tech and business sectors, and return to their communities to serve as inspiring mentors for the next generation.
              </p>
            </div>
          </div>

        </StaggerGroup>
      </div>
    </section>
  );
}
