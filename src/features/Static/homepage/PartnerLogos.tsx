import { SafeImage } from "@/shared/components/ui/SafeImage";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { PARTNERS } from "@/shared/constants/homepage";

export function PartnerLogos() {
  return (
    <section className="py-12 md:py-16 bg-surface border-y border-outline-variant/30 overflow-hidden">
      <RevealOnScroll className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <p className="text-center font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-8">
          Trusted by international organizations and local partners
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16 opacity-70">
          {PARTNERS.map((partner, index) => (
            <div
              key={index}
              className="relative w-24 sm:w-32 md:w-40 h-12 sm:h-16 hover:scale-105 transition-colors duration-200 ease-in-out opacity-80 hover:opacity-100"
            >
              <SafeImage
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
                unoptimized
                loading="lazy"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
              />
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
