import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function HomeCTA() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop mb-20">
      <RevealOnScroll y={36} className="max-w-4xl mx-auto bg-primary text-on-primary rounded-3xl lg:rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-ambient">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-on-primary-fixed-variant opacity-90 z-0" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-fixed rounded-full mix-blend-overlay blur-3xl z-0 opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tertiary-fixed rounded-full mix-blend-overlay blur-3xl z-0 opacity-50" />

        <StaggerGroup y={20} className="relative z-10 flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-6xl mb-6 text-secondary-fixed drop-shadow-md" aria-hidden="true">
            favorite
          </span>
          <TextReveal as="h2" text="Invest in Potential" className="font-display-md text-display-md mb-6" />
          <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mb-10">
            Whether you choose to fund a scholarship, mentor a student, or
            partner with our initiatives, your involvement is the catalyst for
            lasting change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className=" hover:scale-105 shadow-md" asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button variant="outline" size="lg" className=" bg-surface/10 hover:bg-surface/20 text-on-primary border-on-primary/30 hover:scale-105 backdrop-blur-sm" asChild>
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </StaggerGroup>
      </RevealOnScroll>
    </section>
  );
}
