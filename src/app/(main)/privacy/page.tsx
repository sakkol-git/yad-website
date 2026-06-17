import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | YAD Cambodia",
  description: "Learn how Youth Advancement for Development (YAD) protects and manages your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary mb-8">
          Privacy Policy
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
          Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <div className="prose prose-lg text-on-surface-variant prose-headings:text-on-surface prose-headings:font-headline-md prose-headings:mb-4 max-w-none space-y-8">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              Youth Advancement for Development ("YAD", "we", "our", or "us") respects your privacy. We collect personal information you provide to us directly, such as when you volunteer, donate, sign up for our newsletter, or contact us. This may include your name, email address, phone number, and payment information (processed securely by our payment partners).
            </p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to process donations, send updates about our programs, coordinate volunteer activities, and improve our services. We do not sell, rent, or lease your personal data to third parties.
            </p>
          </section>

          <section>
            <h2>3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, and unauthorized disclosure or access.
            </p>
          </section>

          <section>
            <h2>4. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete your personal data. If you wish to exercise these rights or unsubscribe from our communications, please contact us.
            </p>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <br />
              <strong>Email:</strong> info@yadkh.org <br />
              <strong>Address:</strong> Phnom Penh, Cambodia
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
