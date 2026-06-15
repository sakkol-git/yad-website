import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

export function ImpactHero() {
  return (
    <section className="relative min-h-[819px] flex items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap overflow-hidden rounded-lg">
      <ImageRevealMask className="absolute inset-0 z-0">
        <Image
          alt="Lush green floating island with waterfalls and small wooden cabins against a bright sky, symbolizing a pristine, harmonious ecological future."
          className="w-full h-full object-cover object-right"
          src="/assets/images/yad-1.png"
          fill
          sizes="100vw"
          priority
        />
      </ImageRevealMask>
      <div className="absolute inset-0 z-10 hero-gradient w-full md:w-3/4" />
      <div className="relative z-20 max-w-2xl">
        <TextReveal as="h1" text="Metrics of Change" className="font-display-lg text-display-lg text-primary mb-6 leading-tight" />
        <RevealOnScroll delay={0.2}>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
            Every small action ripples outwards. Explore our real-time impact
            dashboard and the inspiring stories of young leaders driving
            sustainable development across communities.
          </p>
          <div className="flex gap-4">
            <Button variant="primary" size="lg" className=" gap-2 hover:scale-105 shadow-ambient">
              View Dashboard
              <span className="material-symbols-outlined">
                arrow_downward
              </span>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
