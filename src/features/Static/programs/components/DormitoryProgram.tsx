import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";
import Link from "next/link";

export function DormitoryProgram() {
  return (
    <section className="py-24 md:py-32 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left/Top: Immersive Media */}
          <div className="lg:col-span-7 flex flex-col gap-12 lg:order-last">
            <RevealOnScroll delay={0.2}>
              <ImageRevealMask className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden group">
                <Image
                  alt="Students gathered in the dormitory common area"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  src="/assets/images/yad-6.png"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </ImageRevealMask>
              <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm font-label-bold uppercase tracking-widest text-on-surface-variant/60">
                <span>Dormitory Hub</span>
                <span>Leadership Training Center</span>
              </div>
            </RevealOnScroll>

            {/* Metric Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-outline-variant/30 pt-12">
              <RevealOnScroll delay={0.3}>
                <div className="font-display-md text-5xl text-primary mb-2 tabular-nums">120</div>
                <h4 className="font-label-bold text-xs uppercase tracking-widest text-on-surface mb-2">Current Residents</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Promising students from remote provinces provided with safe, full-time accommodation.</p>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.4}>
                <div className="font-display-md text-5xl text-primary mb-2 tabular-nums">45+</div>
                <h4 className="font-label-bold text-xs uppercase tracking-widest text-on-surface mb-2">Training Modules</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Comprehensive curriculum covering leadership, digital literacy, and civic engagement.</p>
              </RevealOnScroll>
            </div>
          </div>

          {/* Right/Bottom: Massive Editorial Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:order-first">
            <RevealOnScroll>
              <span className="block text-primary uppercase tracking-[0.2em] font-label-bold text-xs mb-4">
                Infrastructure for Leaders
              </span>
            </RevealOnScroll>
            <TextReveal 
              as="h2" 
              text="More Than Just Housing." 
              className="font-headline-lg text-4xl lg:text-5xl text-primary mb-8 leading-tight tracking-tight" 
            />
            
            <RevealOnScroll delay={0.1}>
              <div className="space-y-6 font-body-lg text-on-surface-variant leading-relaxed text-lg">
                <p>
                  For promising students from remote, underserved provinces, the barrier to higher education isn't just tuition—it's the severe lack of safe, affordable accommodation in the capital.
                </p>
                <p>
                  Our Dormitory and Youth Training Center solves this infrastructure gap. But we don't stop at housing. We pair this stable living environment with an intensive leadership curriculum, ensuring these students graduate not just with degrees, but with the capacity to lead.
                </p>
              </div>

              <div className="mt-12">
                <Link
                  href="/programs/dltc"
                  className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.1em] font-label-bold text-sm hover:text-secondary transition-colors group pb-2 border-b border-primary/20 hover:border-secondary"
                >
                  Explore the Facility
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>

        </div>

      </div>
    </section>
  );
}
