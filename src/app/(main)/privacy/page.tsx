import { Metadata } from "next";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
export const metadata: Metadata = {
  title: "Privacy Policy | YAD Cambodia",
  description: "Learn how Youth Advancement for Development (YAD) protects and manages your data.",
};

export default function PrivacyPolicyPage() {
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
              text="Privacy Policy."
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
                  1. Information We Collect
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  Youth Advancement for Development ("YAD", "we", "our", or "us") respects your
                  privacy. We collect personal information you provide to us directly, such as when
                  you volunteer, donate, sign up for our newsletter, or contact us. This may include
                  your name, email address, phone number, and payment information (processed
                  securely by our payment partners).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  2. How We Use Your Information
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  We use the information we collect to process donations, send updates about our
                  programs, coordinate volunteer activities, and improve our services. We do not
                  sell, rent, or lease your personal data to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  3. Data Security
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect
                  your personal information against accidental or unlawful destruction, loss,
                  alteration, and unauthorized disclosure or access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  4. Your Rights
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  Depending on your location, you may have the right to access, correct, or delete
                  your personal data. If you wish to exercise these rights or unsubscribe from our
                  communications, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light tracking-tight text-on-surface mb-6">
                  5. Contact Us
                </h2>
                <p className="text-base font-light text-on-surface-variant leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at: <br />
                  <br />
                  <strong className="font-bold text-on-surface">Email:</strong> info@yadkh.org{" "}
                  <br />
                  <strong className="font-bold text-on-surface">Address:</strong> Phnom Penh,
                  Cambodia
                </p>
              </section>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
