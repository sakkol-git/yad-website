import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { Button } from "@/shared/components/ui/Button";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

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
    <main className="flex-grow pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop bg-surface relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-40 right-1/4 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2" />

      <BreadcrumbSchema items={breadcrumbs} />

      <div className="max-w-container-max mx-auto relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <RevealOnScroll>
            <span className="inline-block border border-outline-variant/50 text-primary px-4 py-2 rounded-md font-bold text-[10px] tracking-widest uppercase mb-6 bg-surface/50 backdrop-blur-sm">
              Latest Updates
            </span>
          </RevealOnScroll>
          <TextReveal
            as="h1"
            text="News & Stories"
            className="font-display-lg text-display-lg text-primary mb-6"
          />
          <RevealOnScroll delay={0.2}>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
              Stay up to date with the impact of our programs, upcoming events, and stories from the youth leaders of Cambodia.
            </p>
          </RevealOnScroll>
        </div>

        {/* Premium Glassmorphic Empty State */}
        <RevealOnScroll delay={0.4}>
          <div className="relative w-full max-w-3xl mx-auto">
            {/* Animated Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-tertiary/20 blur-3xl opacity-60 rounded-full animate-pulse pointer-events-none" />
            
            <div className="bg-surface/60 backdrop-blur-xl backdrop-saturate-150 p-10 md:p-16 rounded-md shadow-2xl border border-white/40 dark:border-white/10 relative z-10 flex flex-col items-center justify-center text-center overflow-hidden group hover:border-primary/30 transition-colors duration-500">
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -z-10 blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-tr-full -z-10 blur-xl group-hover:bg-secondary/10 transition-colors duration-500" />

              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-8 shadow-inner border border-outline-variant/20 group-hover:scale-110 transition-transform duration-500 ease-out">
                <span className="material-symbols-outlined text-4xl text-primary" aria-hidden="true">
                  campaign
                </span>
              </div>
              
              <TextReveal
                as="h2"
                text="Our Blog is Coming Soon"
                className="font-headline-md text-headline-md text-on-surface mb-6"
              />
              
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-10 font-light leading-relaxed">
                We are actively working on a new content management system to bring you stories directly from our students, volunteers, and staff. Check back soon!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button variant="default" className="rounded-md uppercase tracking-widest text-[10px] font-bold group/btn" asChild>
                  <a href="#footer-newsletter" className="flex items-center justify-center gap-2">
                    Subscribe for Updates
                    <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </Button>
                <Button variant="outline" className="rounded-md uppercase tracking-widest text-[10px] font-bold border-outline-variant/50 hover:bg-surface-container" asChild>
                  <a href="/">
                    Return Home
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </div>
    </main>
  );
}
