import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | YAD Cambodia",
  description: "Terms and conditions for using the Youth Advancement for Development (YAD) website.",
};

export default function TermsOfServicePage() {
  return (
    <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary mb-8">
          Terms of Service
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
          Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <div className="prose prose-lg text-on-surface-variant prose-headings:text-on-surface prose-headings:font-headline-md prose-headings:mb-4 max-w-none space-y-8">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Youth Advancement for Development ("YAD") website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2>2. Use of Content</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of YAD Cambodia or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or modify any content without explicit written permission.
            </p>
          </section>

          <section>
            <h2>3. Donations</h2>
            <p>
              All donations made through our website are voluntary and non-refundable. By donating, you confirm that you are authorized to use the payment method provided. We use secure third-party processors and do not store your full financial information.
            </p>
          </section>

          <section>
            <h2>4. Limitation of Liability</h2>
            <p>
              YAD provides this website on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the website's operation or the information contained within it. We will not be liable for any damages arising from the use of this site.
            </p>
          </section>

          <section>
            <h2>5. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page with an updated effective date. Your continued use of the site constitutes acceptance of the modified terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
