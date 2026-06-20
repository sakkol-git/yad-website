import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";

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
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="mb-12">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-4">
          Homestay Program
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Experience authentic Cambodian culture while making a difference. Our Homestay is a social enterprise where 100% of proceeds fund YAD operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="font-headline-md text-headline-md text-secondary mb-4">Accommodation With Purpose</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Whether you are a short-term visitor, a volunteer, or looking for a long-term stay in Phnom Penh, our central location offers comfortable living alongside our community. By staying with us, you directly fund our youth empowerment programs.
          </p>

          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">What&apos;s Included</h3>
          <ul className="list-disc pl-5 mb-8 space-y-2 text-on-surface-variant">
            <li>Free Wi-Fi access</li>
            <li>Clean drinking water</li>
            <li>Hot water</li>
            <li>Room cleaning once a week</li>
            <li>Access to Tuk-Tuk transportation networks</li>
          </ul>

          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Authentic Khmer Dining</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            Guests at the homestay have the chance to try authentic, home-style Khmer food cooked by our university residents from the DLTC program. Residents are also happy to teach guests Khmer cooking techniques!
          </p>
          <ul className="list-disc pl-5 mb-8 space-y-2 text-on-surface-variant">
            <li><strong>Breakfast / Lunch / Dinner:</strong> $2.00 USD per meal</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-4 h-fit">
          <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-square bg-surface-variant flex items-center justify-center p-4 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2 block">bed</span>
              <p className="text-sm font-medium">Single Rooms</p>
            </div>
          </div>
          <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-square bg-surface-variant flex items-center justify-center p-4 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2 block">king_bed</span>
              <p className="text-sm font-medium">Double Rooms</p>
            </div>
          </div>
          <div className="col-span-2 bg-surface-container rounded-xl overflow-hidden shadow-sm">
            <div className="h-32 bg-surface-variant flex items-center justify-center p-4 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2 block">bunkbed</span>
              <p className="text-sm font-medium">Group &amp; Dormitory Rooms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tables */}
      <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-8 mb-12">
        <h2 className="font-headline-md text-headline-md text-center text-primary mb-8">Current Rates</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Short Term */}
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 border-b pb-2">Short Term (Nightly)</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-on-surface-variant font-label-bold text-label-bold">
                  <th className="py-2">Room Type</th>
                  <th className="py-2 text-right">Price (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest text-on-surface">
                <tr>
                  <td className="py-3">Single Room (Fan / Air-con)</td>
                  <td className="py-3 text-right font-medium">$7.00 / $9.00</td>
                </tr>
                <tr>
                  <td className="py-3">Double Room (Fan / Air-con)</td>
                  <td className="py-3 text-right font-medium">$10.00 / $12.00</td>
                </tr>
                <tr>
                  <td className="py-3">Group (Min 5 people)</td>
                  <td className="py-3 text-right font-medium">$6.00 per person</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Long Term */}
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 border-b pb-2">Long Term (Monthly)</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-on-surface-variant font-label-bold text-label-bold">
                  <th className="py-2">Room Type</th>
                  <th className="py-2 text-right">Price (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest text-on-surface">
                <tr>
                  <td className="py-3">Single Room (Fan / Air-con)</td>
                  <td className="py-3 text-right font-medium">$120.00 / $180.00</td>
                </tr>
                <tr>
                  <td className="py-3">Double Room (Fan / Air-con)</td>
                  <td className="py-3 text-right font-medium">$150.00 / $210.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-on-surface-variant text-center mt-6 italic">
          *Rates are subject to change. Please contact us to confirm current availability and pricing.
        </p>
      </div>

      <div className="text-center">
        <Button variant="primary" size="lg" asChild>
          <Link href="/contact">Book Your Stay</Link>
        </Button>
      </div>
    </main>
  );
}
