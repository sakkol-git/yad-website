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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-surface mb-6 tracking-tight">
            Our Measurable Impact on the Community
          </h2>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            When you engage with YAD, you are directly investing in a sustainable cycle of youth empowerment and profound societal transformation.
          </p>
        </RevealOnScroll>

        {/* Bento Box Grid */}
        <StaggerGroup y={32} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Main Feature - Spans 2 columns on lg */}
          <div className="lg:col-span-2 bg-gradient-to-br from-primary-container to-surface-container p-8 md:p-10 rounded-3xl shadow-sm border border-outline-variant/30 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-primary/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[28px]">school</span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-3">Educational Pathways</h3>
                <p className="text-on-surface-variant leading-relaxed max-w-lg">
                  We have successfully transitioned hundreds of high-potential students from high-risk environments into stable, thriving educational pathways and universities.
                </p>
              </div>
            </div>
          </div>

          {/* Metric 1 */}
          <div className="bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/30 relative overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="flex flex-col h-full justify-center text-center">
              <span className="text-5xl font-black text-secondary mb-2">500+</span>
              <span className="text-on-surface-variant font-bold uppercase tracking-wider text-sm mt-2">Children Reached Weekly</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/30 relative overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="flex flex-col h-full justify-center text-center">
              <span className="text-5xl font-black text-tertiary mb-2">10+</span>
              <span className="text-on-surface-variant font-bold uppercase tracking-wider text-sm mt-2">Years of Impact</span>
            </div>
          </div>

          {/* Alumni Feature - Spans 2 columns on md/lg */}
          <div className="md:col-span-2 bg-surface-container-low p-8 md:p-10 rounded-3xl shadow-sm border border-outline-variant/30 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px]">work</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-2">Alumni Network & Employment</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Graduates of YAD programs secure meaningful employment in tech and business sectors, and return to their communities to serve as inspiring mentors for the next generation.
              </p>
            </div>
          </div>

        </StaggerGroup>
      </div>
    </section>
  );
}
