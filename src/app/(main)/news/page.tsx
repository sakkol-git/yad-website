import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { Button } from "@/shared/components/ui/Button";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Read the latest news, success stories, and updates from Youth Advancement for Development (YAD) Cambodia.",
  openGraph: {
    title: "News & Updates | YAD Cambodia",
    description:
      "Read the latest news, success stories, and updates from Youth Advancement for Development (YAD) Cambodia.",
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
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="max-w-container-max mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="kicker-label text-primary">Latest Updates</span>
              <div className="w-6 h-[1px] bg-primary" />
            </div>
          </RevealOnScroll>
          <TextReveal
            as="h1"
            text="News & Stories"
            className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] mb-6"
          />
          <RevealOnScroll delay={0.2}>
            <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
              Stay up to date with the impact of our programs, upcoming events, and stories from the
              youth leaders of Cambodia.
            </p>
          </RevealOnScroll>
        </div>

        {/* Clean Editorial Empty State */}
        <RevealOnScroll delay={0.4}>
          <div className="relative w-full max-w-4xl mx-auto border border-outline-variant/30 rounded-md bg-surface p-12 md:p-20 flex flex-col items-center text-center overflow-hidden transition-colors hover:border-outline-variant/50">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />

            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="kicker-label text-primary">Coming Soon</span>
              <div className="w-6 h-[1px] bg-primary" />
            </div>

            <TextReveal
              as="h2"
              text="Our Stories, Loading..."
              className="text-4xl md:text-5xl font-light text-primary tracking-tighter leading-[1.1] mb-6"
            />

            <p className="text-base text-on-surface-variant max-w-xl mx-auto mb-12 font-light leading-relaxed">
              We are actively building a space to share the powerful stories of our students,
              volunteers, and the communities we serve. Sign up below to be the first to know when
              we launch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-md text-xs tracking-[0.2em] uppercase font-semibold transition-colors group"
              >
                <Link href="#footer-newsletter" className="flex items-center justify-center gap-2">
                  Subscribe for Updates
                  <span className="material-symbols-outlined text-base group-hover:translate-y-1 transition-transform">
                    arrow_downward
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-outline-variant/30 hover:border-primary hover:bg-surface-container text-on-surface px-8 py-4 rounded-md text-xs tracking-[0.2em] uppercase font-semibold transition-colors"
              >
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </main>
  );
}
