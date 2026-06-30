import Image from "next/image";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { AnimatedCounter } from "@/shared/components/animations/AnimatedCounter";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export function ImpactPreview() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <ImageRevealMask className="lg:col-span-7 rounded-md overflow-hidden relative h-[400px] border border-outline-variant/30">
            <Image
              alt="Cambodian youth collaborating"
              className="w-full h-full object-cover"
              src="/assets/images/yad-6.png"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </ImageRevealMask>
          <StaggerGroup y={28} className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-4 mb-2">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="kicker-label text-primary">Real-World Impact</span>
            </div>
            <TextReveal
              as="h2"
              text="Our Impact in Action"
              className="text-4xl md:text-5xl font-light text-primary tracking-tighter leading-[1.0]"
            />
            <p className="text-base text-on-surface-variant font-light leading-relaxed">
              Witness the energy of Cambodia&apos;s next generation. Through our modern learning
              spaces, we provide the tools for digital literacy and leadership training that spark
              real-world change.
            </p>
            <div className="flex items-center gap-3 text-primary mt-4 border border-outline-variant/30 px-4 py-3 self-start">
              <span className="material-symbols-outlined text-2xl">groups</span>
              <span className="uppercase tracking-widest text-xs font-bold">
                <AnimatedCounter value={1200} suffix="+" /> Youth Empowered This Year
              </span>
            </div>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
