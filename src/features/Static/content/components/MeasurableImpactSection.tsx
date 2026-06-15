import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function MeasurableImpactSection() {
  return (
    <section className="relative py-8 lg:py-16 bg-surface overflow-hidden">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-left">
        {/* Impact Feature Box */}
        <RevealOnScroll y={32} className="relative bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-xl border border-outline/10 mb-16 max-w-4xl mx-auto overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
              Our Measurable Impact on the Community
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Over the years, our measurable impact has reverberated across multiple provinces in Cambodia. We have successfully transitioned hundreds of high-potential students from high-risk environments into stable, thriving educational pathways. Our alumni network is a testament to the success of our model. Graduates of YAD programs have gone on to secure meaningful, well-paying employment in the tech sector, pursue advanced higher education degrees, and most importantly, return to their home communities to serve as inspiring mentors for the next generation.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
              When you engage with YAD—whether through volunteering, partnering, or supporting our funding—you are doing far more than funding an isolated program. You are directly investing in a sustainable cycle of youth empowerment, long-term economic development, and profound societal transformation across Cambodia.
            </p>
          </div>
        </RevealOnScroll>

        {/* Call to Action Buttons */}
        <StaggerGroup y={20} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-center text-lg"
          >
            Learn About Our Mission
          </Link>
          <Link
            href="/programs"
            className="w-full sm:w-auto px-8 py-4 border-2 border-outline/30 bg-transparent text-on-surface font-bold rounded-lg hover:bg-surface-variant hover:border-outline/60 hover:-translate-y-0.5 transition-all duration-300 text-center text-lg"
          >
            Explore Our Programs
          </Link>
        </StaggerGroup>

      </div>
    </section>
  );
}
