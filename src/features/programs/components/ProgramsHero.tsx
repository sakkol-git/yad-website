import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function ProgramsHero() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap relative">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
        <div className="lg:w-1/2 flex flex-col gap-6 items-start z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-fixed/30 text-primary-container font-label-bold text-label-bold border border-secondary-fixed/50 backdrop-blur-sm">
            <span className="material-symbols-outlined text-lg">
              volunteer_activism
            </span>
            Core Initiatives
          </div>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary max-w-2xl leading-tight">
            Empowering Youth,
            <br />
            <span className="text-secondary">Building Futures.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Our core programs are designed to provide holistic support,
            practical skills, and educational foundation to youth in need,
            fostering sustainable development in our communities.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Button variant="primary" size="lg" className="rounded-full gap-2 group hover:scale-105 shadow-lg shadow-primary/20">
              Explore Programs
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Button>
            <Button variant="ghost" size="lg" className="rounded-full gap-2">
              <span className="material-symbols-outlined">
                play_circle
              </span>
              Watch Impact Video
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed/20 to-tertiary-fixed/20 rounded-[3rem] blur-2xl transform -rotate-3 scale-105 z-0" />
          <div className="relative z-10 w-full h-[500px]">
            <Image
              alt="Youth education and community building"
              className="w-full h-full object-cover rounded-[3rem] ambient-shadow"
              src="/assets/images/yad-5.png"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Floating Stat Badge */}
          <div className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-2xl z-20 ambient-shadow flex items-center gap-4 border border-white/40">
            <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                groups
              </span>
            </div>
            <div>
              <p className="font-headline-md text-headline-md text-primary m-0 leading-none">
                5,000+
              </p>
              <p className="font-label-bold text-label-bold text-on-surface-variant m-0 mt-1">
                Youth Reached
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
