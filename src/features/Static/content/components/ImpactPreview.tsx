import Image from "next/image";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { AnimatedCounter } from "@/shared/components/animations/AnimatedCounter";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

export function ImpactPreview() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <ImageRevealMask className="lg:col-span-7 rounded-lg overflow-hidden shadow-ambient relative h-[400px]">
            <Image
              alt="Cambodian youth collaborating"
              className="w-full h-full object-cover"
              src="/assets/images/yad-6.png"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </ImageRevealMask>
          <StaggerGroup y={28} className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Our Impact in Action
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Witness the energy of Cambodia&apos;s next generation. Through
              our modern learning spaces, we provide the tools for digital
              literacy and leadership training that spark real-world change.
            </p>
            <div className="flex items-center gap-2 text-secondary font-label-bold">
              <span className="material-symbols-outlined">groups</span>
              <span><AnimatedCounter value={1200} suffix="+" /> Youth Empowered This Year</span>
            </div>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
