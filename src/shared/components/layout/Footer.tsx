import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/shared/constants/navigation";
import { COPYRIGHT_TEXT, SITE_TAGLINE, REGISTERED_TEXT } from "@/shared/constants/site";
import { Facebook, Send, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

import { NewsletterSignup } from "@/shared/components/ui/NewsletterSignup";

interface FooterProps {
  variant?: "full" | "minimal" | "rich";
}

export default function Footer({ variant = "full" }: FooterProps) {
  if (variant === "minimal") {
    return (
      <footer className="w-full py-8 text-center bg-surface-container-lowest text-on-surface-variant font-body-md text-sm border-t border-outline-variant/30">
        <p>{COPYRIGHT_TEXT}</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link
            href="/privacy"
            className="hover:text-primary hover:underline underline-offset-4 transition-colors duration-150"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-primary hover:underline underline-offset-4 transition-colors duration-150"
          >
            Terms
          </Link>
          <Link
            href="/get-involved"
            className="hover:text-primary hover:underline underline-offset-4 transition-colors duration-150"
          >
            Contact
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface text-on-surface border-t border-outline-variant/30 mt-auto pt-24 pb-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-container-max relative z-10">
        {/* Newsletter Section */}
        <div id="footer-newsletter" className="mb-20">
          <NewsletterSignup />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Mission (Takes 4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left gap-8 lg:pr-12">
            <Link
              href="/"
              className="flex items-center gap-4 group w-fit focus-visible:outline-none"
            >
              <div className="relative flex items-center justify-center w-14 h-14 bg-surface-container rounded-md border border-outline-variant/30 transition-transform duration-500 group-hover:scale-105 group-hover:border-primary/40 group-hover:shadow-md">
                <Image
                  src="/assets/images/yad_logo.png"
                  alt="YAD Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain transition-transform"
                />
              </div>
              <span className="text-3xl font-display-md font-bold uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors duration-300">
                YAD
              </span>
            </Link>
            <p className="text-base font-light text-on-surface-variant leading-relaxed">
              {SITE_TAGLINE}
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61571829685466"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 border border-primary/10 text-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-colors duration-200 ease-in-out"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/Youthadvancementfordevelopment"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 border border-primary/10 text-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-colors duration-200 ease-in-out"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore (Takes 2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left gap-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-secondary">
              Explore
            </h3>
            <div className="flex flex-col gap-4 mt-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Programs", href: "/programs" },
                { label: "Our Impact", href: "/impact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center text-sm font-medium text-on-surface-variant hover:text-primary transition-colors w-fit"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-colors duration-200 ease-in-out text-secondary" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Get Involved (Takes 2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left gap-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-secondary">
              Get Involved
            </h3>
            <div className="flex flex-col gap-4 mt-4">
              {[
                { label: "Services", href: "/services" },
                { label: "Events", href: "/event" },
                { label: "Partners", href: "/partner" },
                { label: "Volunteer", href: "/get-involved" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center text-sm font-medium text-on-surface-variant hover:text-primary transition-colors w-fit"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-colors duration-200 ease-in-out text-secondary" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Information (Takes 4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left gap-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-secondary">
              Contact Us
            </h3>
            <div className="flex flex-col gap-5 mt-4">
              <a
                href="https://maps.app.goo.gl/5AhtYGNDRfVjH8cY8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group p-3 rounded-md hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/30 -ml-3"
              >
                <div className="flex-shrink-0 mt-1 bg-primary/10 p-2 rounded-md text-primary group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors leading-relaxed">
                  YAD Cambodia
                  <br />
                  <span className="text-xs text-secondary mt-1 block">
                    View on Google Maps &rarr;
                  </span>
                </span>
              </a>

              <a
                href="tel:+85599332289"
                className="flex items-center gap-4 group p-3 rounded-md hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/30 -ml-3"
              >
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md text-primary group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">
                  (+855) 99 332 289
                </span>
              </a>

              <a
                href="mailto:info@yadkh.org"
                className="flex items-center gap-4 group p-3 rounded-md hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/30 -ml-3"
              >
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">
                  info@yadkh.org
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p className="text-xs font-medium text-on-surface-variant">{COPYRIGHT_TEXT}</p>
            <span className="hidden md:inline text-outline-variant">•</span>
            <p className="text-xs font-medium text-on-surface-variant">{REGISTERED_TEXT}</p>
          </div>
          <div className="flex items-center gap-8">
            {FOOTER_LINKS.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-colors duration-150 after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
