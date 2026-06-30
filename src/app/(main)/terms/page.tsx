import { Metadata } from "next";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
export const metadata: Metadata = {
  title: "Terms of Service | YAD Cambodia",
  description:
    "Terms and conditions for using the Youth Advancement for Development (YAD) website.",
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-surface pb-section-gap">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-container-max">
        {/* Editorial Page Header */}
        <div className="pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-outline-variant/30 mb-16 md:mb-24">
          <RevealOnScroll className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="kicker-label text-primary">Legal</span>
            </div>
            <TextReveal
              as="h1"
              text="Terms of Service."
              className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.0] mb-8"
            />
            <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
              Effective Date:{" "}
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </RevealOnScroll>
        </div>

        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <div className="space-y-16">
              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  1. Acceptance of Terms
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  By accessing and using the Youth Advancement for Development ("YAD") website, you
                  agree to be bound by these Terms of Service. If you do not agree with any part of
                  these terms, please do not use our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  2. Use of Content
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  All content on this website, including text, graphics, logos, and images, is the
                  property of YAD Cambodia or its content suppliers and is protected by
                  international copyright laws. You may not reproduce, distribute, or modify any
                  content without explicit written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  3. Donations
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  All donations made through our website are voluntary and non-refundable. By
                  donating, you confirm that you are authorized to use the payment method provided.
                  We use secure third-party processors and do not store your full financial
                  information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  4. Limitation of Liability
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  YAD provides this website on an "as is" and "as available" basis. We make no
                  warranties, expressed or implied, regarding the website's operation or the
                  information contained within it. We will not be liable for any damages arising
                  from the use of this site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  5. Changes to Terms
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Any changes
                  will be posted on this page with an updated effective date. Your continued use of
                  the site constitutes acceptance of the modified terms.
                </p>
              </section>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
