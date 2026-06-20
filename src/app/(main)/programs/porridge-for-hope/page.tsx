import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Porridge for Hope | YAD Programs",
  description: "Discover YAD's Porridge for Hope program, a nutrition initiative combating malnutrition in Cambodian children since 2016.",
};

export default function PorridgeForHopePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Programs", url: "https://yadkh.org/programs" },
    { name: "Porridge for Hope", url: "https://yadkh.org/programs/porridge-for-hope" },
  ];

  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="mb-12">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-4">
          Porridge for Hope
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Combating malnutrition and strengthening communities through consistent nutritional support since 2016.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-headline-md text-headline-md text-secondary mb-4">Nutrition &amp; Food Security</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            The Porridge for Hope program has had enormous success and greatly improved the lives of many individuals in the community. Targeting primarily children aged 5 years and under (alongside older children at other centres), this initiative ensures vital nutritional milestones are met.
          </p>

          <div className="bg-surface-container-low p-6 rounded-lg mb-6 border border-surface-container-high">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_dining</span>
              Program Delivery
            </h3>
            <ul className="space-y-3 text-on-surface-variant">
              <li><strong>Frequency:</strong> Twice a month</li>
              <li><strong>Reach:</strong> More than 100 children per session</li>
              <li><strong>Locations:</strong> Youth Leaders Centre (YLC) and other YAD community centres</li>
            </ul>
          </div>

          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Community Integration</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            In a beautiful display of cross-program integration, the porridge is lovingly cooked and served by the university residents of our Dormitory and Leadership Training Centre (DLTC), allowing them to give back directly to the community.
          </p>
        </div>
        
        <div className="bg-surface-container rounded-xl overflow-hidden shadow-ambient p-4 h-fit">
          <img 
            src="/assets/images/yad-1.png" 
            alt="Over 100 children receiving porridge at the Youth Leaders Centre" 
            className="w-full h-auto rounded-lg"
          />
          <p className="text-sm text-center mt-3 text-on-surface-variant italic">
            Children from the community receiving their bi-monthly nutrition support.
          </p>
        </div>
      </div>
    </main>
  );
}
