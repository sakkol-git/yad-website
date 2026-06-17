import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/shared/constants/navigation";
import { COPYRIGHT_TEXT, SITE_TAGLINE, REGISTERED_TEXT } from "@/shared/constants/site";
import { Facebook, Send, Mail, Phone, MapPin } from "lucide-react";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { NewsletterSignup } from "@/shared/components/ui/NewsletterSignup";

interface FooterProps {
  variant?: "full" | "minimal" | "rich";
}

export default function Footer({ variant = "full" }: FooterProps) {
  if (variant === "minimal") {
    return (
      <footer className="w-full py-8 text-center bg-surface-container-lowest border-t border-surface-variant text-on-surface-variant font-body-md text-body-md text-sm">
        <RevealOnScroll y={30}>
          <p>{COPYRIGHT_TEXT}</p>
          <div className="flex justify-center gap-4 mt-2">
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms
          </Link>
          <Link href="/get-involved" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        </RevealOnScroll>
      </footer>
    );
  }

  return (
    <footer className="bg-surface-container-highest dark:bg-primary/5 rounded-t-md mt-auto pt-20 pb-8 border-t-8 border-primary relative overflow-hidden">
      <RevealOnScroll y={30}>
      {/* Decorative subtle background element */}
      <div className="absolute top-0 right-0 w-[150vw] max-w-[500px] aspect-square bg-primary/5 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto relative z-10">
        
        {/* Newsletter Section */}
        <div className="mb-16">
          <NewsletterSignup />
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Brand & Mission */}
          <div className="flex flex-col items-start text-left gap-6 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="bg-surface p-2 rounded-lg shadow-sm border border-outline-variant/30">
                <Image
                  src="/assets/images/yad_logo.png"
                  alt="YAD Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
                YAD
              </span>
            </Link>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {SITE_TAGLINE}
            </p>
            <div className="flex gap-3 mt-2">
              <a href="https://www.facebook.com/profile.php?id=61571829685466" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant shadow-sm border border-outline-variant/20 transition-all duration-300 hover:-translate-y-1">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://t.me/Youthadvancementfordevelopment" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant shadow-sm border border-outline-variant/20 transition-all duration-300 hover:-translate-y-1">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col items-start text-left gap-6">
            <h3 className="font-title-lg text-title-lg font-bold text-on-surface relative inline-block w-fit">
              Explore
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all w-fit">Home</Link>
              <Link href="/about" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all w-fit">About Us</Link>
              <Link href="/programs" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all w-fit">Programs</Link>
              <Link href="/impact" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all w-fit">Our Impact</Link>
            </div>
          </div>

          {/* Column 3: Get Involved */}
          <div className="flex flex-col items-start text-left gap-6">
            <h3 className="font-title-lg text-title-lg font-bold text-on-surface relative inline-block w-fit">
              Get Involved
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/services" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all w-fit">Services</Link>
              <Link href="/event" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all w-fit">Events</Link>
              <Link href="/partner" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all w-fit">Partners</Link>
              <Link href="/get-involved" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all w-fit">Volunteer</Link>
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div className="flex flex-col items-start text-left gap-6">
            <h3 className="font-title-lg text-title-lg font-bold text-on-surface relative inline-block w-fit">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-tertiary rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-5 mt-2">
              <a href="https://maps.app.goo.gl/5AhtYGNDRfVjH8cY8" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary group-hover:text-on-primary text-primary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors pt-1">
                  YAD Cambodia (View on Map)
                </span>
              </a>
              <a href="tel:+85599332289" className="flex items-center gap-3 group">
                <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary group-hover:text-on-primary text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                  (+855) 99 332 289
                </span>
              </a>
              <a href="mailto:info@yadkh.org" className="flex items-center gap-3 group">
                <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary group-hover:text-on-primary text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                  info@yadkh.org
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-outline-variant/40 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 text-left">
            <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              {COPYRIGHT_TEXT}
            </p>
            <span className="hidden md:inline text-outline-variant">•</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {REGISTERED_TEXT}
            </p>
          </div>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
      </RevealOnScroll>
    </footer>
  );
}
