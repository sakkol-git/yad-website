import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function HomeCTA() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 mb-20">
      <RevealOnScroll y={36} className="max-w-7xl mx-auto bg-primary text-on-primary rounded-[2.5rem] lg:rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-on-primary-fixed-variant opacity-95 z-0" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/80 rounded-full mix-blend-overlay blur-[80px] z-0 opacity-60 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-tertiary/80 rounded-full mix-blend-overlay blur-[80px] z-0 opacity-60 animate-pulse" style={{ animationDelay: "1s" }} />

        <StaggerGroup y={20} className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/20">
            <span className="material-symbols-outlined text-4xl text-white drop-shadow-md" aria-hidden="true">
              favorite
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.05]">Invest in Potential</h2>
          <p className="text-xl md:text-2xl text-on-primary/90 max-w-3xl mb-12 font-light leading-relaxed">
            Whether you choose to fund a scholarship, mentor a student, or
            partner with our initiatives, your involvement is the catalyst for
            lasting change.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="secondary" size="lg" className="px-10 py-6 text-lg font-medium hover:scale-105 shadow-[0_0_30px_rgba(224,140,0,0.5)] transition-all duration-300" asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-6 text-lg font-medium bg-white/5 hover:bg-white/15 text-white border-white/30 hover:scale-105 backdrop-blur-md transition-all duration-300" asChild>
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </StaggerGroup>
      </RevealOnScroll>
    </section>
  );
}
