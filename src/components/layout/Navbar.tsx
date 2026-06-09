"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/navigation";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-md transition-all duration-300"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
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
        <div className="hidden md:flex items-center gap-8 font-body-md text-body-md">
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

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="secondary-container" className="rounded-full shadow-sm hover:scale-105" asChild>
            <Link href="/donate">
              Donate
            </Link>
          </Button>
          <Button className="rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-sm hover:scale-105 hover:bg-tertiary-fixed-dim" asChild>
            <Link href="/get-involved">
              Join Us
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-primary p-2 rounded-full hover:bg-surface-container-highest transition-colors"
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>
    </nav>
  );
}
