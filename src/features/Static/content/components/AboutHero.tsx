import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

export function AboutHero() {
  return (
    <header className="relative pt-32 pb-16 md:pt-48 md:pb-20 px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-surface/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-surface/10 to-transparent" />
      </div>

      <RevealOnScroll className="relative z-10 max-w-container-max mx-auto text-center">
        <span className="text-secondary font-label-bold text-label-bold tracking-wider uppercase mb-6 block">
          Who We Are
        </span>
        <TextReveal as="h1" text="We Are the Youth Advancement for Development" className="font-display-lg text-display-lg text-primary mb-8 max-w-4xl mx-auto" />
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Founded in 2024, YAD is a youth-led, grassroots organization
          dedicated to nurturing the next generation of Cambodian leaders through
          education, innovation, and community support.
        </p>
      </RevealOnScroll>
    </header>
  );
}
