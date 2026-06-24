import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { Button } from "@/shared/components/ui/Button";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Read the latest news, success stories, and updates from Youth Advancement for Development (YAD) Cambodia.",
  openGraph: {
    title: "News & Updates | YAD Cambodia",
    description: "Read the latest news, success stories, and updates from Youth Advancement for Development (YAD) Cambodia.",
    url: "https://yadkh.org/news",
  },
};

export default function NewsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "News & Updates", url: "https://yadkh.org/news" },
  ];

  return (
    <main className="flex-grow pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <span className="text-tertiary font-label-bold text-label-bold tracking-wider uppercase mb-2 block">
            Latest Updates
          </span>
          <TextReveal
            as="h1"
            text="News & Stories"
            className="font-display-lg text-display-lg text-primary mb-6"
          />
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Stay up to date with the impact of our programs, upcoming events, and stories from the youth leaders of Cambodia.
          </p>
        </div>

        {/* Empty State / Placeholder */}
        <div className="bg-surface-container-low rounded-3xl p-12 text-center border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center min-h-[400px]">
          <span className="material-symbols-outlined text-6xl text-secondary-fixed-dim mb-4" aria-hidden="true">
            article
          </span>
          <TextReveal
            as="h2"
            text="Our Blog is Coming Soon"
            className="font-headline-md text-headline-md text-on-surface mb-4"
          />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-8">
            We are actively working on a new content management system to bring you stories directly from our students, volunteers, and staff.
          </p>
          <Button variant="primary" asChild>
            <a href="#footer-newsletter">
              Subscribe for Updates
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
