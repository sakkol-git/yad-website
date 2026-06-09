import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function ServicesHero() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Text Content */}
        <div className="lg:col-span-5 order-2 lg:order-1 z-10 relative mt-8 lg:mt-0">
          <div className="bg-surface/90 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-ambient lg:-mr-16 relative">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-bold text-label-bold mb-4 tracking-wider uppercase text-xs">
              YAD Projects
            </span>
            <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 leading-tight">
              Experience Authentic Cambodia.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Immerse yourself in rural community life with the YAD
              Homestay. Your stay directly funds local youth advancement
              programs while offering you an unforgettable, genuine cultural
              connection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg" className="rounded-full gap-2 shadow-md hover:scale-105" asChild>
                <a href="#booking-section">
                  Book Your Stay{" "}
                  <span className="material-symbols-outlined text-xl">
                    arrow_forward
                  </span>
                </a>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-full gap-2" asChild>
                <Link href="#">
                  View Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden shadow-ambient group">
            <Image
              alt="Traditional wooden Cambodian home elevated on stilts, surrounded by lush green tropical foliage"
              src="/assets/images/yad-1.png"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transform transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
}
