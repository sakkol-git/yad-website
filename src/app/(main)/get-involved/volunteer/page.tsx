import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export const metadata: Metadata = {
  title: "Volunteer With Us | YAD Programs",
  description: "Volunteer with Youth Advancement for Development (YAD) in Cambodia. Teach, build, and explore while staying at our central Phnom Penh homestay.",
};

export default function VolunteerPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Get Involved", url: "https://yadkh.org/get-involved" },
    { name: "Volunteer", url: "https://yadkh.org/get-involved/volunteer" },
  ];

  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="mb-12">
        <TextReveal 
          as="h1" 
          text="Volunteer With Us" 
          className="font-headline-lg text-headline-lg text-primary mb-4" 
        />
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Join us for a life-changing experience in Cambodia. Whether you have two weeks or two months, your time volunteering directly supports our youth empowerment programs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          <TextReveal 
            as="h2" 
            text="What You Will Do" 
            className="font-headline-md text-headline-md text-secondary mb-4" 
          />
          <ul className="list-disc pl-5 mb-8 space-y-2 text-on-surface-variant">
            <li>Learn about the YAD programs and visit our community schools</li>
            <li>Work on construction and painting projects to improve facilities</li>
            <li>Teach courses on health, hygiene, and English</li>
            <li>Volunteer with community events</li>
            <li>Take a Khmer cooking class with our DLTC students</li>
            <li>Participate in community exercise classes at the Riverside</li>
          </ul>

          <TextReveal 
            as="h2" 
            text="Cultural Excursions" 
            className="font-headline-md text-headline-md text-secondary mb-4" 
          />
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            During your time with us, we plan several excursions to must-see sights around Cambodia. In Phnom Penh, participants have the option to visit the breathtaking Royal Palace, the National Museum, and important historical sites like the Choeung Ek Killing Field and S-21 Toul Sleng Museum. We will introduce you to local cuisine and market shopping.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Cambodia prides itself on its temples, and we are happy to share our spectacular history during visits to Wat Phnom and Angkor Wat in Siem Reap. You&apos;ll have the option to experience a rural Khmer village homestay to immerse yourself in the culture!
          </p>
        </div>
        
        <div>
          <div className="bg-surface-container-low border border-surface-container-high rounded-xl p-6 shadow-sm">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">night_shelter</span>
              Accommodation Details
            </h3>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-on-surface-variant text-sm">
              <li>Air-conditioning or fan options</li>
              <li>Mattress, pillow, clean sheets provided</li>
              <li>Storage units for belongings</li>
              <li>Access to Tuk-Tuk transportation</li>
              <li>Great location in the middle of Phnom Penh</li>
              <li>Local staff and volunteers to assist you</li>
            </ul>

            <h4 className="font-label-bold text-label-bold text-on-surface mb-2 border-b pb-1">Nightly Cost</h4>
            <div className="text-sm text-on-surface-variant mb-4 space-y-1">
              <div className="flex justify-between"><span>Single Room:</span> <span>$7–$9</span></div>
              <div className="flex justify-between"><span>Double Room:</span> <span>$10–$12</span></div>
              <div className="flex justify-between"><span>Group Dorm:</span> <span>$8 per person</span></div>
            </div>

            <h4 className="font-label-bold text-label-bold text-on-surface mb-2 border-b pb-1">Daily Dining</h4>
            <div className="text-sm text-on-surface-variant mb-6 space-y-1">
              <div className="flex justify-between"><span>Breakfast:</span> <span>$2.00</span></div>
              <div className="flex justify-between"><span>Lunch:</span> <span>$3.50</span></div>
              <div className="flex justify-between"><span>Dinner:</span> <span>$2.00</span></div>
            </div>

            <Button variant="primary" className="w-full" asChild>
              <Link href="/apply">Apply to Volunteer</Link>
            </Button>
            <p className="text-xs text-on-surface-variant text-center mt-3 italic">
              All proceeds go towards funding YAD and helping the youth of Cambodia.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
