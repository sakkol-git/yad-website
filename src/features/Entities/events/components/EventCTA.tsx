import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export function EventCTA() {
  return (
    <section className="py-24 bg-surface border-t border-outline-variant/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="bg-primary p-12 md:p-24 text-center rounded-md relative overflow-hidden shadow-2xl">
          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-bl-full -z-0 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-tr-full -z-0 blur-3xl pointer-events-none" />

          <div className="flex items-center justify-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-[1px] bg-white/30" />
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-white/70">
              Get Involved
            </span>
            <div className="w-12 h-[1px] bg-white/30" />
          </div>
          
          <TextReveal 
            as="h2" 
            text="Ready to make an Impact?" 
            className="text-[3rem] md:text-[4rem] text-on-primary tracking-tighter leading-[1.0] mb-8 relative z-10" 
          />
          
          <RevealOnScroll delay={0.2} className="relative z-10">
            <p className="text-lg md:text-xl text-on-primary/80 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Whether you want to volunteer on the ground, lend your skills, or
              support our initiatives financially, there&apos;s a place for you in
              our movement.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                variant="default"
                size="lg"
                className="rounded-md bg-secondary text-on-secondary hover:bg-secondary/90 h-14 px-8 text-sm uppercase tracking-wider font-bold transition-all duration-300 ease-in-out hover:-translate-y-1 shadow-lg"
                asChild
              >
                <Link href="/get-involved">Join Our Next Event</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md border-white/50 text-white hover:bg-white hover:text-primary h-14 px-8 text-sm uppercase tracking-wider font-bold transition-all duration-300 ease-in-out hover:-translate-y-1"
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
