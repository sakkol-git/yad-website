import Image from "next/image";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { AnimatedCounter } from "@/shared/components/animations/AnimatedCounter";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

export function ImpactPreview() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          
          {/* Image Side */}
          <div className="lg:col-span-7 relative z-10 group">
            <ImageRevealMask className="rounded-[2.5rem] overflow-hidden shadow-2xl relative h-[500px] lg:h-[600px] border border-outline-variant/30">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
              <Image
                alt="Cambodian youth collaborating"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                src="/assets/images/yad-6.png"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </ImageRevealMask>
            
            {/* Floating Glassmorphism Badge */}
            <div className="absolute -bottom-6 -right-2 lg:-right-12 z-20 bg-surface/90 backdrop-blur-xl p-5 md:p-6 rounded-[2rem] shadow-xl border border-outline-variant/30 flex items-center gap-4 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-secondary/20 to-secondary/5 text-secondary border border-secondary/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-2xl md:text-3xl">groups</span>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-secondary to-primary">
                  <AnimatedCounter value={1200} suffix="+" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Youth Empowered</div>
              </div>
            </div>
          </div>
          
          {/* Text Side (Overlapping on lg) */}
          <div className="lg:col-span-5 lg:-ml-12 relative z-20">
            <StaggerGroup y={30} className="bg-surface/90 backdrop-blur-2xl p-8 md:p-14 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-outline-variant/30 flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="uppercase tracking-widest text-xs font-semibold text-primary">
                  In Action
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-[1.1]">
                Sparking <span className="italic text-secondary">real-world change</span> through modern education.
              </h2>
              
              <p className="text-lg text-on-surface-variant leading-relaxed font-light mt-2">
                Witness the energy of Cambodia&apos;s next generation. Through
                our modern learning spaces, we provide the tools for digital
                literacy and leadership training that prepare students for
                meaningful careers.
              </p>
            </StaggerGroup>
          </div>
          
        </div>
      </div>
    </section>
  );
}
