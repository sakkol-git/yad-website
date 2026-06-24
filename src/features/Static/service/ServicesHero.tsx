import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import heroImg from "../../../../public/assets/images/yad-1.png";
import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export function ServicesHero() {
  return (
    <section className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Typographic Focus (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col z-10">
            <RevealOnScroll delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-[1px] bg-primary" />
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                  Social Enterprise
                </span>
              </div>
            </RevealOnScroll>

            {/* Massive, Tension-filled Headline */}
            <TextReveal 
              as="h1" 
              text="Experience authentic Cambodia." 
              className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] mb-6" 
              delay={0.2} 
            />

            {/* Subtext */}
            <RevealOnScroll delay={0.3}>
              <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-sm mb-10">
                Immerse yourself in rural community life with the YAD Homestay. Your stay directly funds local youth advancement programs while offering you an unforgettable, genuine cultural connection.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="lg" className="bg-primary text-white hover:bg-primary/90 px-6 py-3 h-12 uppercase text-xs tracking-wider font-bold transition-colors duration-200 ease-in-out inline-flex items-center" asChild>
                  <a href="#booking-section">
                    Book Your Stay
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-md-md border-primary text-primary h-12 px-6 hover:bg-primary hover:text-white uppercase text-xs tracking-wider font-bold transition-colors duration-200 ease-in-out" asChild>
                  <Link href="/services/homestay">
                    View Detail
                  </Link>
                </Button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Un-obscured Cinematic Image (7 Columns) */}
          <div className="lg:col-span-7 relative h-[50vh] lg:h-[60vh] max-h-[600px] min-h-[400px] w-full mt-10 lg:mt-0">
            <RevealOnScroll delay={0.3} className="w-full h-full relative">
              <Image
                src={heroImg}
                alt="Traditional wooden Cambodian home elevated on stilts"
                fill
                placeholder="blur"
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </RevealOnScroll>
          </div>
        </div>

      </div>
    </section>
  );
}
