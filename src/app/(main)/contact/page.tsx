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
        <div className="text-center mb-16 border-b border-outline-variant/30 pb-10">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-6 h-[1px] bg-primary" />
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-primary">
              Reach Out
            </span>
          </div>
          <h1 className="text-[3.5rem] md:text-[4.5rem] text-primary tracking-tighter leading-[1.0] mb-6">Get in Touch.</h1>
          <p className="text-base md:text-lg text-on-surface-variant font-light max-w-2xl mx-auto leading-relaxed">
            We are always looking for new partners, volunteers, and supporters who share our vision of empowering Cambodian youth. Reach out to us using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Information */}
          <div className="flex flex-col gap-8">
            <div className="bg-surface rounded-none p-8 border border-outline-variant/30 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <h2 className="text-2xl font-light text-primary tracking-tight mb-8">Our Office</h2>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-[20px]">location_on</span>
                  <div>
                    <h3 className="uppercase tracking-widest text-[10px] font-bold text-on-surface mb-2">Headquarters</h3>
                    <p className="text-sm font-light text-on-surface-variant leading-relaxed">
                      #123 Street 456, Sangkat Toul Tom Poung 1<br />
                      Khan Chamkarmon, Phnom Penh<br />
                      Cambodia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-[20px]">mail</span>
                  <div>
                    <h3 className="uppercase tracking-widest text-[10px] font-bold text-on-surface mb-2">Email</h3>
                    <a href="mailto:info@yadkh.org" className="text-sm font-light text-primary hover:underline">
                      info@yadkh.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-[20px]">phone</span>
                  <div>
                    <h3 className="uppercase tracking-widest text-[10px] font-bold text-on-surface mb-2">Phone</h3>
                    <a href="tel:+85512345678" className="text-sm font-light text-primary hover:underline">
                      +855 12 345 678
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-surface-container-lowest rounded-none p-8 border border-outline-variant/30">
              <h2 className="text-xl font-light text-on-surface tracking-tight mb-6">Business Hours</h2>
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
          <div className="bg-surface rounded-none p-8 md:p-12 border border-outline-variant/30">
            <h2 className="text-2xl font-light text-on-surface tracking-tight mb-8">Send a Message</h2>
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">First Name <span className="text-primary">*</span></label>
                  <FormInput id="firstName" name="firstName" required placeholder="John" className="rounded-none border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary h-12" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">Last Name <span className="text-primary">*</span></label>
                  <FormInput id="lastName" name="lastName" required placeholder="Doe" className="rounded-none border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary h-12" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">Email Address <span className="text-primary">*</span></label>
                <FormInput type="email" id="email" name="email" required placeholder="john@example.com" className="rounded-none border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">Subject <span className="text-primary">*</span></label>
                <select 
                  id="subject" 
                  name="subject" 
                  required
                  className="w-full bg-transparent border border-outline-variant/50 rounded-none px-4 h-12 text-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
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
                <label htmlFor="message" className="uppercase tracking-widest text-[10px] font-bold text-on-surface">Message <span className="text-primary">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-transparent border border-outline-variant/50 rounded-none px-4 py-3 text-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-y"
                />
              </div>

              <Button type="submit" variant="default" size="lg" className="mt-4 rounded-none bg-primary text-white hover:bg-primary/90 h-12 uppercase tracking-widest text-xs font-bold transition-all">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
