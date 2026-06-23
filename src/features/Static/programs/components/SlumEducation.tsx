import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

export function SlumEducation() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-container-max mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left/Top: Massive Editorial Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <RevealOnScroll>
              <span className="block text-primary uppercase tracking-[0.2em] font-label-bold text-xs mb-4">
                Field Operations
              </span>
              <h2 className="font-headline-lg text-4xl lg:text-5xl text-primary mb-8 leading-tight tracking-tight">
                Taking the <br className="hidden lg:block"/> Classroom <br className="hidden lg:block"/> to the Crisis.
              </h2>
              
              <div className="space-y-6 font-body-lg text-on-surface-variant leading-relaxed text-lg">
                <p>
                  In urban slums, geography and economics conspire to keep children out of formal education. Waiting for them to come to school is not a strategy; we must take the school to them.
                </p>
                <p>
                  Our mobile tutoring programs deploy directly into marginalized communities, providing the critical literacy and numeracy foundations required to transition these students back into the formal educational system.
                </p>
              </div>

              <blockquote className="mt-12 pl-6 border-l-4 border-secondary">
                <p className="font-headline-sm text-2xl text-on-surface italic leading-relaxed mb-4">
                  "We don't just teach reading; we teach them that they have the right to be read to, the right to learn, and the right to a future."
                </p>
                <footer className="text-xs font-label-bold uppercase tracking-widest text-on-surface-variant/60">
                  — Lead Field Educator
                </footer>
              </blockquote>
            </RevealOnScroll>
          </div>

          {/* Right/Bottom: Immersive Media & Data */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <RevealOnScroll delay={0.2}>
              <ImageRevealMask className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden group">
                <Image
                  alt="A community education session in a local neighborhood"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  src="/assets/images/yad-4.png"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </ImageRevealMask>
              <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm font-label-bold uppercase tracking-widest text-on-surface-variant/60">
                <span>Phnom Penh, Cambodia</span>
                <span>Mobile Tutoring Unit Beta</span>
              </div>
            </RevealOnScroll>

            {/* Metric Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-outline-variant/30 pt-12">
              <RevealOnScroll delay={0.3}>
                <div className="font-display-md text-5xl text-primary mb-2 tabular-nums">500+</div>
                <h4 className="font-label-bold text-xs uppercase tracking-widest text-on-surface mb-2">Weekly Attendance</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Children reached consistently every week across four distinct urban zones.</p>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.4}>
                <div className="font-display-md text-5xl text-secondary mb-2 tabular-nums">80%</div>
                <h4 className="font-label-bold text-xs uppercase tracking-widest text-on-surface mb-2">Integration Rate</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Our goal for integrating participating children into formal schooling systems within 12 months.</p>
              </RevealOnScroll>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
