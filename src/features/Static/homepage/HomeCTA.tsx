import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function HomeCTA() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop mb-20">
      <RevealOnScroll y={36} className="max-w-4xl mx-auto bg-primary text-white border border-outline-variant/30 rounded-md-md p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-90 z-0" />

        <StaggerGroup y={20} className="relative z-10 flex flex-col items-center text-center">
          <div className="w-6 h-[1px] bg-white mb-6" />
          <TextReveal as="h2" text="Invest in Potential" className="text-4xl md:text-5xl font-light tracking-tighter mb-6" />
          <p className="text-sm font-light leading-relaxed text-white/90 max-w-2xl mb-10">
            Whether you choose to fund a scholarship, mentor a student, or
            partner with our initiatives, your involvement is the catalyst for
            lasting change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/donate">Fund a Future</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </StaggerGroup>
      </RevealOnScroll>
    </section>
  );
}
