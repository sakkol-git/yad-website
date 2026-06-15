import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export function EventHero() {
  return (
    <div className="text-center mb-16 md:mb-24">
      <span className="inline-block px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-bold text-label-bold mb-6">
        Community Action
      </span>
      <TextReveal as="h1" text="Our Events" className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 font-bold" />
      <RevealOnScroll delay={0.2}>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Join us in creating sustainable change across Cambodia. Discover upcoming
          opportunities to get involved or explore the impact of our recent
          community initiatives.
        </p>
      </RevealOnScroll>
    </div>
  );
}
