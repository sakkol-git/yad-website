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
    <footer className="bg-surface border-t border-outline-variant/30 mt-auto pt-20 pb-8 relative overflow-hidden">
      <RevealOnScroll y={30}>
      <div className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto relative z-10">
        
        {/* Newsletter Section */}
        <div className="mb-16">
          <NewsletterSignup />
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Brand & Mission */}
          <div className="flex flex-col items-start text-left gap-6 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 group w-fit focus-visible:outline-none focus-visible:border-primary">
              <Image
                src="/assets/images/yad_logo.png"
                alt="YAD Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-2xl font-bold uppercase tracking-widest text-on-surface">
                YAD
              </span>
            </Link>
            <p className="text-sm font-light text-on-surface-variant leading-relaxed">
              {SITE_TAGLINE}
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://www.facebook.com/profile.php?id=61571829685466" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://t.me/Youthadvancementfordevelopment" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors duration-300">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col items-start text-left gap-6">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Explore
            </h3>
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/" className="text-sm font-light text-on-surface-variant hover:text-primary transition-colors w-fit">Home</Link>
              <Link href="/about" className="text-sm font-light text-on-surface-variant hover:text-primary transition-colors w-fit">About Us</Link>
              <Link href="/programs" className="text-sm font-light text-on-surface-variant hover:text-primary transition-colors w-fit">Programs</Link>
              <Link href="/impact" className="text-sm font-light text-on-surface-variant hover:text-primary transition-colors w-fit">Our Impact</Link>
            </div>
          </div>

          {/* Column 3: Get Involved */}
          <div className="flex flex-col items-start text-left gap-6">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Get Involved
            </h3>
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/services" className="text-sm font-light text-on-surface-variant hover:text-primary transition-colors w-fit">Services</Link>
              <Link href="/event" className="text-sm font-light text-on-surface-variant hover:text-primary transition-colors w-fit">Events</Link>
              <Link href="/partner" className="text-sm font-light text-on-surface-variant hover:text-primary transition-colors w-fit">Partners</Link>
              <Link href="/get-involved" className="text-sm font-light text-on-surface-variant hover:text-primary transition-colors w-fit">Volunteer</Link>
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div className="flex flex-col items-start text-left gap-6">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Contact Us
            </h3>
            <div className="flex flex-col gap-5 mt-2">
              <a href="https://maps.app.goo.gl/5AhtYGNDRfVjH8cY8" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-sm font-light text-on-surface-variant group-hover:text-primary transition-colors">
                  YAD Cambodia (View on Map)
                </span>
              </a>
              <a href="tel:+85599332289" className="flex items-center gap-4 group">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-light text-on-surface-variant group-hover:text-primary transition-colors">
                  (+855) 99 332 289
                </span>
              </a>
              <a href="mailto:info@yadkh.org" className="flex items-center gap-4 group">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-light text-on-surface-variant group-hover:text-primary transition-colors">
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
            <p className="text-xs font-light text-on-surface-variant">
              {COPYRIGHT_TEXT}
            </p>
            <span className="hidden md:inline text-outline-variant">•</span>
            <p className="text-xs font-light text-on-surface-variant">
              {REGISTERED_TEXT}
            </p>
          </div>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
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
