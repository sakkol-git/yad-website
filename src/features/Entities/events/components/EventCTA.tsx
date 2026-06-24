import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export function EventCTA() {
  return (
    <section className="py-24 bg-surface border-t border-outline-variant/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="bg-on-surface p-12 md:p-24 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-surface/30" />
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-surface/70">
              Get Involved
            </span>
            <div className="w-12 h-[1px] bg-surface/30" />
          </div>
          
          <TextReveal 
            as="h2" 
            text="Ready to make an Impact?" 
            className="text-[3rem] md:text-[4rem] text-surface tracking-tighter leading-[1.0] mb-8" 
          />
          
          <RevealOnScroll delay={0.2}>
            <p className="text-lg md:text-xl text-surface-variant font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Whether you want to volunteer on the ground, lend your skills, or
              support our initiatives financially, there&apos;s a place for you in
              our movement.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                variant="default"
                size="lg"
                className="rounded-md-md bg-surface text-on-surface hover:bg-surface-variant h-14 px-8 text-sm uppercase tracking-wider font-bold transition-colors duration-200 ease-in-out"
                asChild
              >
                <Link href="/get-involved">Join Our Next Event</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md-md border-surface text-surface hover:bg-surface hover:text-on-surface h-14 px-8 text-sm uppercase tracking-wider font-bold transition-colors duration-200 ease-in-out"
                asChild
              >
                <Link href="/about">Become a Member</Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
