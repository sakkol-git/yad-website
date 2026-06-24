import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export function PartnerCTA() {
  return (
    <section className="py-24 bg-surface border-t border-outline-variant/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="bg-on-surface p-12 md:p-24 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-surface/30" />
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-surface/70">
              Join Our Coalition
            </span>
            <div className="w-12 h-[1px] bg-surface/30" />
          </div>
          
          <TextReveal 
            as="h2" 
            text="Become a Partner." 
            className="text-[3rem] md:text-[4rem] text-surface tracking-tighter leading-[1.0] mb-8" 
          />
          
          <RevealOnScroll delay={0.2}>
            <p className="text-lg md:text-xl text-surface-variant font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Are you ready to invest in the next generation of leaders? Join our
              coalition and help us scale our proven development programs across
              communities that need them most.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                variant="default"
                size="lg"
                className="rounded-none bg-surface text-on-surface hover:bg-surface-variant h-14 px-8 text-sm uppercase tracking-wider font-bold transition-colors duration-200 ease-in-out"
                asChild
              >
                <Link href="/get-involved">Partner Inquiry</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-none border-surface text-surface hover:bg-surface hover:text-on-surface h-14 px-8 text-sm uppercase tracking-wider font-bold transition-colors duration-200 ease-in-out"
                asChild
              >
                <Link href="#">View Partnership Prospectus</Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
