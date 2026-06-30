import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

export function DigitalInnovation() {
  return (
    <section className="max-w-container-max mt-20 lg:mt-32 mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
        <div className="lg:w-5/12 relative">
          <div className="absolute inset-0 bg-tertiary-fixed rounded-md transform -translate-x-6 translate-y-6 z-0" />
          <ImageRevealMask className="relative z-10 w-full h-[450px]">
            <Image
              alt="Digital Innovation Lab"
              className="w-full h-full object-cover rounded-sm"
              src="/assets/images/yad-7.png"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </ImageRevealMask>
          {/* Floating feature card */}
          <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-surface/85 backdrop-blur-2xl border border-outline-variant/50 shadow-xl shadow-black/10 rounded-md z-20 w-48 hidden lg:block p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-tertiary text-xl">code</span>
              <span className="font-label-bold text-label-bold text-on-surface uppercase tracking-widest text-[10px]">
                Tech Skills
              </span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5">
              <div className="bg-tertiary h-1.5 rounded-full w-4/5" />
            </div>
          </div>
        </div>

        <div className="lg:w-7/12 lg:pl-12">
          <RevealOnScroll>
            <span className="block text-tertiary uppercase tracking-[0.2em] font-label-bold text-xs mb-4">
              Digital Innovation
            </span>
          </RevealOnScroll>

          <TextReveal
            as="h2"
            text="Bridging the Digital Divide."
            className="font-headline-lg text-4xl lg:text-5xl text-primary mb-8 leading-tight tracking-tight"
          />

          <RevealOnScroll delay={0.1}>
            <div className="space-y-6 font-body-lg text-on-surface-variant leading-relaxed text-lg mb-8">
              <p>
                Bridging the digital divide by providing access to modern technology and vital
                digital literacy skills. Our fully equipped IT labs serve as hubs for coding,
                digital marketing, and essential computer skills training.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <ul className="space-y-4 mb-8">
              {[
                "3 Fully equipped IT laboratories across the region.",
                "Comprehensive curriculum including basic IT to advanced programming.",
                "Partnered with local tech firms for direct internship pipelines.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-0.5">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              className="bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim transition-[color,background-color,border-color,opacity,transform] duration-200 ease-in-out active:scale-[0.97] active:opacity-90"
            >
              View Curriculum
            </Button>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
