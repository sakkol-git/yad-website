import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import Image from "next/image";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export const metadata: Metadata = {
  title: "Porridge for Hope | YAD Programs",
  description:
    "Discover YAD's Porridge for Hope program, a nutrition initiative combating malnutrition in Cambodian children since 2016.",
};

export default function PorridgeForHopePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Programs", url: "https://yadkh.org/programs" },
    { name: "Porridge for Hope", url: "https://yadkh.org/programs/porridge-for-hope" },
  ];

  return (
    <main className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-20 overflow-hidden border-b border-outline-variant/30">
      <RevealOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-container-max relative z-10">
        <BreadcrumbSchema items={breadcrumbs} />

        <div className="mb-16">
          <span className="block text-primary kicker-label mb-4">Programs</span>
          <TextReveal
            as="h1"
            text="Porridge for Hope"
            className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] font-light mb-6"
          />
          <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-3xl">
            Combating malnutrition and strengthening communities through consistent nutritional
            support since 2016.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <TextReveal
              as="h2"
              text="Nutrition & Food Security"
              className="text-4xl lg:text-5xl font-light text-secondary tracking-tighter leading-[1.0] mb-6"
            />
            <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed mb-8">
              The Porridge for Hope program has had enormous success and greatly improved the lives
              of many individuals in the community. Targeting primarily children aged 5 years and
              under (alongside older children at other centres), this initiative ensures vital
              nutritional milestones are met.
            </p>

            <div className="bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 hover:border-primary/40 transition-colors duration-300 p-8 rounded-md mb-8">
              <h3 className="text-2xl font-light text-on-surface tracking-tight mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">
                  local_dining
                </span>
                Program Delivery
              </h3>
              <ul className="space-y-3 text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
                <li>
                  <strong>Frequency:</strong> Twice a month
                </li>
                <li>
                  <strong>Reach:</strong> More than 100 children per session
                </li>
                <li>
                  <strong>Locations:</strong> Youth Leaders Centre (YLC) and other YAD community
                  centres
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-light text-on-surface tracking-tight mb-4">
              Community Integration
            </h3>
            <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed">
              In a beautiful display of cross-program integration, the porridge is lovingly cooked
              and served by the university residents of our Dormitory and Leadership Training Centre
              (DLTC), allowing them to give back directly to the community.
            </p>
          </div>

          <div className="bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 rounded-md overflow-hidden shadow-ambient p-4 group h-fit">
            <div className="rounded-sm overflow-hidden w-full h-auto">
              <Image
                src="/assets/images/yad-1.png"
                alt="Over 100 children receiving porridge at the Youth Leaders Centre"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                width={800}
                height={600}
              />
            </div>
            <p className="text-sm text-center mt-3 text-on-surface-variant italic">
              Children from the community receiving their bi-monthly nutrition support.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </main>
  );
}
