"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/navigation";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-lg border-b border-surface-variant/50 transition-all duration-300"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 md:py-6 max-w-container-max mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/assets/images/yad_logo.png"
            alt="YAD Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
            YAD
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-body-md text-body-md">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-secondary font-bold border-b-2 border-secondary pb-1 hover:scale-105 transition-transform duration-200"
                    : "text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="secondary-container" className="rounded-full shadow-sm hover:scale-105" asChild>
            <Link href="/donate">Donate</Link>
          </Button>
          <Button className="rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-sm hover:scale-105 hover:bg-tertiary-fixed-dim" asChild>
            <Link href="/get-involved">Join Us</Link>
          </Button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="lg:hidden text-primary h-12 w-12 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface border-b border-surface-variant shadow-xl flex flex-col py-6 px-4 md:px-6 animate-fade-up max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-4 px-4 w-full rounded-xl font-label-bold text-lg transition-colors ${isActive
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface hover:bg-surface-container"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-4 border-t border-surface-variant pt-6">
            <Button variant="secondary-container" size="lg" className="w-full rounded-full" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="/donate">Donate</Link>
            </Button>
            <Button size="lg" className="w-full rounded-full bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="/get-involved">Join Us</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
