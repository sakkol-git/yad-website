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
          <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white/20 backdrop-blur-md backdrop-saturate-150 p-5 rounded-2xl z-20 shadow-lg border border-white/30 w-48 hidden lg:block">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-tertiary">
                code
              </span>
              <span className="font-label-bold text-label-bold text-on-surface">
                Tech Skills
              </span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2">
              <div className="bg-tertiary h-2 rounded-full w-4/5" />
            </div>
          </div>
        </div>
        <div className="lg:w-7/12 lg:pl-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary-fixed/30 text-tertiary font-label-bold text-label-bold border border-tertiary-fixed/50 mb-6">
            <span className="material-symbols-outlined text-lg">
              laptop_mac
            </span>
            Tech Focus
          </div>
          <TextReveal as="h2" text="Digital Innovation & IT Labs" className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6" />
          <RevealOnScroll delay={0.2}>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Bridging the digital divide by providing access to modern
              technology and vital digital literacy skills. Our fully equipped
              IT labs serve as hubs for coding, digital marketing, and
              essential computer skills training.
            </p>
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
                  <span className="font-body-md text-body-md text-on-surface">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Button variant="primary" className=" bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim hover:scale-105">
              View Curriculum
            </Button>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
