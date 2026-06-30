import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

export function VoicesOfImpact() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-surface">
      <div className="max-w-container-max mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <RevealOnScroll>
              <span className="block text-primary uppercase tracking-[0.2em] font-label-bold text-xs mb-4">
                Frontline Stories
              </span>
            </RevealOnScroll>
            <TextReveal
              as="h2"
              text="Voices of Impact"
              className="font-headline-lg text-4xl lg:text-5xl text-primary mb-6 leading-tight tracking-tight"
            />
            <RevealOnScroll delay={0.1}>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Meet the young changemakers turning potential into reality. These are unfiltered
                stories from the frontlines of development in Cambodia.
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.2}>
            <Link
              href="/news"
              className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.1em] font-label-bold text-sm hover:text-secondary transition-colors group pb-2 border-b border-primary/20 hover:border-secondary"
            >
              Read All Dispatches
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_right_alt
              </span>
            </Link>
          </RevealOnScroll>
        </div>

        {/* Asymmetrical Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Main Feature */}
          <div className="lg:col-span-7 group cursor-pointer">
            <RevealOnScroll>
              <ImageRevealMask className="relative w-full aspect-[4/3] mb-8 overflow-hidden">
                <Image
                  alt="Young Cambodian woman smiling in a community program"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  src="/assets/images/yad-2.png"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </ImageRevealMask>
              <div className="max-w-xl">
                <span className="text-secondary font-label-bold text-xs uppercase tracking-widest mb-4 block">
                  Community Action
                </span>
                <h3 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight">
                  Sophea's Journey: Leading the Tech Workshop
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed mb-6">
                  How one student mobilized her peers to transform a forgotten classroom into a
                  thriving digital literacy hub that now trains over fifty students weekly.
                </p>
                <span className="text-xs font-label-bold uppercase tracking-widest text-on-surface-variant/60">
                  By Elena Rostova • 5 min read
                </span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Secondary Stories Stack */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12 pt-8 lg:pt-0 lg:border-l lg:border-outline-variant/30 lg:pl-8">
            <RevealOnScroll delay={0.2} className="group cursor-pointer">
              <div className="relative w-full aspect-video mb-6 overflow-hidden">
                <Image
                  alt="Students using computers"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  src="/assets/images/yad-4.png"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <span className="text-secondary font-label-bold text-xs uppercase tracking-widest mb-3 block">
                Innovation
              </span>
              <h4 className="font-headline-sm text-xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                Coding the Future in Rural Provinces
              </h4>
              <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-4">
                A new curriculum designed by alumni is bringing advanced digital skills to areas
                previously disconnected from the tech economy.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3} className="group cursor-pointer">
              <div className="relative w-full aspect-video mb-6 overflow-hidden">
                <Image
                  alt="Community gathering"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  src="/assets/images/yad-5.png"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <span className="text-secondary font-label-bold text-xs uppercase tracking-widest mb-3 block">
                Education
              </span>
              <h4 className="font-headline-sm text-xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                Slum Schools See Record Attendance
              </h4>
              <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-4">
                How combining nutrition programs with education is breaking the cycle of child labor
                in urban slums.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
