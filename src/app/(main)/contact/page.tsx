import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with YAD Cambodia. Reach out for partnerships, inquiries, or more information about our NGO programs in Phnom Penh.",
  openGraph: {
    title: "Contact Us | YAD Cambodia",
    description:
      "Get in touch with YAD Cambodia. Reach out for partnerships, inquiries, or more information about our NGO programs in Phnom Penh.",
    url: "https://yadkh.org/contact",
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Contact Us", url: "https://yadkh.org/contact" },
  ];

  return (
    <main className="flex-grow pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 border-b border-outline-variant/30 pb-10">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-6 h-[1px] bg-primary" />
            <span className="kicker-label text-primary">Reach Out</span>
          </div>
          <TextReveal
            as="h1"
            text="Get in Touch."
            className="text-[3.5rem] md:text-[4.5rem] text-primary tracking-tighter leading-[1.0] mb-6"
          />
          <p className="text-base md:text-lg text-on-surface-variant font-light max-w-2xl mx-auto leading-relaxed">
            We are always looking for new partners, volunteers, and supporters who share our vision
            of empowering Cambodian youth. Reach out to us using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Information */}
          <div className="flex flex-col gap-8">
            <div className="bg-surface p-8 border border-outline-variant/30 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <TextReveal
                as="h2"
                text="Our Office"
                className="text-2xl font-light text-primary tracking-tight mb-8"
              />

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-xl">
                    location_on
                  </span>
                  <div>
                    <h3 className="kicker-label text-on-surface mb-2">
                      Headquarters
                    </h3>
                    <p className="text-sm font-light text-on-surface-variant leading-relaxed">
                      #123 Street 456, Sangkat Toul Tom Poung 1<br />
                      Khan Chamkarmon, Phnom Penh
                      <br />
                      Cambodia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-xl">mail</span>
                  <div>
                    <h3 className="kicker-label text-on-surface mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:info@yadkh.org"
                      className="text-sm font-light text-primary hover:underline"
                    >
                      info@yadkh.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-xl">phone</span>
                  <div>
                    <h3 className="kicker-label text-on-surface mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+85512345678"
                      className="text-sm font-light text-primary hover:underline"
                    >
                      +855 12 345 678
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-surface-container-lowest p-8 border border-outline-variant/30">
              <TextReveal
                as="h2"
                text="Business Hours"
                className="text-xl font-light text-on-surface tracking-tight mb-6"
              />
              <div className="flex justify-between text-sm font-light text-on-surface-variant mb-3 border-b border-outline-variant/30 pb-3">
                <span>Monday - Friday</span>
                <span>8:00 AM - 5:00 PM (ICT)</span>
              </div>
              <div className="flex justify-between text-sm font-light text-on-surface-variant">
                <span>Saturday - Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface p-8 md:p-12 border border-outline-variant/30">
            <TextReveal
              as="h2"
              text="Send a Message"
              className="text-2xl font-light text-on-surface tracking-tight mb-8"
            />
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
