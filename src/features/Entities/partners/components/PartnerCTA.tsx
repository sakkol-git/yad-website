import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export function PartnerCTA() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto bg-primary-container rounded-xl p-12 md:p-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <TextReveal as="h2" text="Become a Partner" className="font-display-lg text-headline-lg md:text-display-lg text-primary-fixed mb-6" />
          <RevealOnScroll delay={0.2}>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-10">
              Are you ready to invest in the next generation of leaders? Join our
              coalition and help us scale our proven development programs across
              communities that need them most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
   variant="default"
   size="lg"
   className=" shadow-ambient hover:scale-105 bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim"
   asChild
   >
                <Link href="/get-involved">Partner Inquiry</Link>
              </Button>
              <Button
   variant="outline"
   size="lg"
   className=" border-2 border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-primary"
   asChild
   >
                <Link href="#">View Partnership Prospectus</Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
      </div>
    </section>
  );
}
