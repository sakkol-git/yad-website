import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { BookingSection } from "@/features/Entities/bookings/BookingSection";

export const metadata: Metadata = {
  title: "Homestay Program | YAD Programs",
  description: "Stay with us at the YAD Homestay. An authentic Cambodian experience where all proceeds fund our NGO operations and youth programs.",
};

export default function HomestayPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Programs", url: "https://yadkh.org/programs" },
    { name: "Homestay", url: "https://yadkh.org/programs/homestay" },
  ];

  return (
    <main className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-20 overflow-hidden border-b border-outline-variant/30">
      <RevealOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <BreadcrumbSchema items={breadcrumbs} />

        <div className="mb-16">
          <span className="block text-primary uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
            Services
          </span>
          <TextReveal 
            as="h1" 
            text="Homestay Program" 
            className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] font-light mb-6" 
          />
          <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-3xl">
            Experience authentic Cambodian culture while making a difference. Our Homestay is a social enterprise where 100% of proceeds fund YAD operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <TextReveal 
              as="h2" 
              text="Accommodation With Purpose" 
              className="text-4xl lg:text-5xl font-light text-secondary tracking-tighter leading-[1.0] mb-6" 
            />
            <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed mb-8">
              Whether you are a short-term visitor, a volunteer, or looking for a long-term stay in Phnom Penh, our central location offers comfortable living alongside our community. By staying with us, you directly fund our youth empowerment programs.
            </p>

            <h3 className="text-2xl font-light text-on-surface tracking-tight mb-4">What&apos;s Included</h3>
            <ul className="list-disc pl-5 mb-10 space-y-2 text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
              <li>Free Wi-Fi access</li>
              <li>Clean drinking water</li>
              <li>Hot water</li>
              <li>Room cleaning once a week</li>
              <li>Access to Tuk-Tuk transportation networks</li>
            </ul>

            <h3 className="text-2xl font-light text-on-surface tracking-tight mb-4">Authentic Khmer Dining</h3>
            <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed mb-6">
              Guests at the homestay have the chance to try authentic, home-style Khmer food cooked by our university residents from the DLTC program. Residents are also happy to teach guests Khmer cooking techniques!
            </p>
            <ul className="list-disc pl-5 mb-10 space-y-2 text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
              <li><strong>Breakfast / Lunch / Dinner:</strong> $2.00 USD per meal</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 h-fit">
            <div className="bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 hover:border-primary/40 transition-colors duration-300 rounded-md-md overflow-hidden shadow-ambient group">
              <div className="aspect-square flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3 block group-hover:scale-110 transition-transform duration-300">bed</span>
                <p className="text-base font-light text-on-surface">Single Rooms</p>
              </div>
            </div>
            <div className="bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 hover:border-primary/40 transition-colors duration-300 rounded-md-md overflow-hidden shadow-ambient group">
              <div className="aspect-square flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3 block group-hover:scale-110 transition-transform duration-300">king_bed</span>
                <p className="text-base font-light text-on-surface">Double Rooms</p>
              </div>
            </div>
            <div className="col-span-2 bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 hover:border-primary/40 transition-colors duration-300 rounded-md-md overflow-hidden shadow-ambient group">
              <div className="h-32 flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3 block group-hover:scale-110 transition-transform duration-300">bunkbed</span>
                <p className="text-base font-light text-on-surface">Group &amp; Dormitory</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Tables */}
        <div className="bg-surface-container-high dark:bg-surface-container-high backdrop-blur-xl border border-outline-variant/30 rounded-md-md p-10 mb-40 shadow-ambient">
          <TextReveal 
            as="h2" 
            text="Current Rates" 
            className="text-4xl lg:text-5xl font-light text-center text-primary tracking-tighter leading-[1.0] mb-12" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Short Term */}
            <div>
              <h3 className="text-2xl font-light text-on-surface tracking-tight mb-6 border-b border-outline-variant/30 pb-4">Short Term (Nightly)</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-on-surface-variant font-label-bold text-label-bold">
                    <th className="py-2">Room Type</th>
                    <th className="py-2 text-right">Price (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-highest text-on-surface">
                  <tr className="group hover:bg-surface-container-low transition-colors duration-300">
                    <td className="py-3 px-2">Single Room (Fan / Air-con)</td>
                    <td className="py-3 px-2 text-right font-medium">$7.00 / $9.00</td>
                  </tr>
                  <tr className="group hover:bg-surface-container-low transition-colors duration-300">
                    <td className="py-3 px-2">Double Room (Fan / Air-con)</td>
                    <td className="py-3 px-2 text-right font-medium">$10.00 / $12.00</td>
                  </tr>
                  <tr className="group hover:bg-surface-container-low transition-colors duration-300">
                    <td className="py-3 px-2">Group (Min 5 people)</td>
                    <td className="py-3 px-2 text-right font-medium">$6.00 per person</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Long Term */}
            <div>
              <h3 className="text-2xl font-light text-on-surface tracking-tight mb-6 border-b border-outline-variant/30 pb-4">Long Term (Monthly)</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-on-surface-variant font-label-bold text-label-bold">
                    <th className="py-2">Room Type</th>
                    <th className="py-2 text-right">Price (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-highest text-on-surface">
                  <tr className="group hover:bg-surface-container-low transition-colors duration-300">
                    <td className="py-3 px-2">Single Room (Fan / Air-con)</td>
                    <td className="py-3 px-2 text-right font-medium">$120.00 / $180.00</td>
                  </tr>
                  <tr className="group hover:bg-surface-container-low transition-colors duration-300">
                    <td className="py-3 px-2">Double Room (Fan / Air-con)</td>
                    <td className="py-3 px-2 text-right font-medium">$150.00 / $210.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant text-center mt-6 italic">
            *Rates are subject to change. Please contact us to confirm current availability and pricing.
          </p>
        </div>
      </RevealOnScroll>
      <BookingSection />
    </main>
  );
}
