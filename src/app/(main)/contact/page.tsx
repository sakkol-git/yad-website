import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { FormInput } from "@/shared/components/ui/FormInput";
import { Button } from "@/shared/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with YAD Cambodia. Reach out for partnerships, inquiries, or more information about our NGO programs in Phnom Penh.",
  openGraph: {
    title: "Contact Us | YAD Cambodia",
    description: "Get in touch with YAD Cambodia. Reach out for partnerships, inquiries, or more information about our NGO programs in Phnom Penh.",
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
        <div className="text-center mb-16">
          <h1 className="font-display-lg text-display-lg text-primary mb-6">Get in Touch</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            We are always looking for new partners, volunteers, and supporters who share our vision of empowering Cambodian youth. Reach out to us using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Information */}
          <div className="flex flex-col gap-8">
            <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Our Office</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">location_on</span>
                  <div>
                    <h3 className="font-label-bold text-label-bold text-on-surface mb-1">Headquarters</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      #123 Street 456, Sangkat Toul Tom Poung 1<br />
                      Khan Chamkarmon, Phnom Penh<br />
                      Cambodia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">mail</span>
                  <div>
                    <h3 className="font-label-bold text-label-bold text-on-surface mb-1">Email</h3>
                    <a href="mailto:info@yadkh.org" className="font-body-md text-body-md text-primary hover:underline">
                      info@yadkh.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">phone</span>
                  <div>
                    <h3 className="font-label-bold text-label-bold text-on-surface mb-1">Phone</h3>
                    <a href="tel:+85512345678" className="font-body-md text-body-md text-primary hover:underline">
                      +855 12 345 678
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/30">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Business Hours</h2>
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant mb-2">
                <span>Monday - Friday</span>
                <span>8:00 AM - 5:00 PM (ICT)</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Saturday - Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface rounded-2xl p-8 border border-outline-variant/30 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Send a Message</h2>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-label-bold text-[14px] text-on-surface">First Name <span className="text-error">*</span></label>
                  <FormInput id="firstName" name="firstName" required placeholder="John" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-label-bold text-[14px] text-on-surface">Last Name <span className="text-error">*</span></label>
                  <FormInput id="lastName" name="lastName" required placeholder="Doe" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-label-bold text-[14px] text-on-surface">Email Address <span className="text-error">*</span></label>
                <FormInput type="email" id="email" name="email" required placeholder="john@example.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-label-bold text-[14px] text-on-surface">Subject <span className="text-error">*</span></label>
                <select 
                  id="subject" 
                  name="subject" 
                  required
                  className="w-full bg-surface-container border border-outline-variant/50 rounded-md px-4 py-3 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select a topic</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donation">Donations</option>
                  <option value="media">Media & Press</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-label-bold text-[14px] text-on-surface">Message <span className="text-error">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-surface-container border border-outline-variant/50 rounded-md px-4 py-3 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="mt-4">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
