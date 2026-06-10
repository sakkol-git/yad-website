"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/shared/constants/navigation";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import { logout } from "@/server/actions/auth.actions";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, isLoading } = useAuth();

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
            const isActive = pathname === link.href || link.subLinks?.some(sub => pathname === sub.href);
            return (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "text-secondary font-extrabold border-b-[3px] border-secondary pb-1 hover:scale-105 transition-transform duration-200"
                      : "text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-200"
                  }
                >
                  <span className="flex items-center gap-1">
                    {link.label}
                    {link.subLinks && <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>}
                  </span>
                </Link>
                {link.subLinks && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-surface rounded-xl shadow-lg border border-surface-variant/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden flex flex-col py-2">
                    {link.subLinks.map(subLink => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className={`px-4 py-2 hover:bg-surface-container transition-colors ${pathname === subLink.href ? 'text-secondary font-bold bg-secondary/5' : 'text-on-surface-variant hover:text-primary'}`}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          {isLoading ? (
            <div className="w-24 h-10 animate-pulse bg-surface-variant rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-4 border-r border-surface-variant pr-6">
              <Link href={role === 'admin' ? '/admin/dashboard' : '/portal/dashboard'} className="text-on-surface-variant hover:text-primary font-medium transition-colors">
                Dashboard
              </Link>
              <form action={logout}>
                <button type="submit" className="text-on-surface-variant hover:text-error font-medium transition-colors">
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-4 border-r border-surface-variant pr-6">
              <Link href="/get-involved" className="text-on-surface-variant hover:text-primary font-medium transition-colors">
                Join Us
              </Link>
            </div>
          )}
          <Button variant="primary" className="rounded-full shadow-sm hover:scale-105" asChild>
            <Link href="/auth/login">Login</Link>
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
          <div className="flex flex-col gap-2 mb-6 w-full">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || link.subLinks?.some(sub => pathname === sub.href);
              return (
                <div key={link.href} className="flex flex-col w-full">
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`py-4 px-4 w-full rounded-xl font-label-bold text-lg transition-colors flex justify-between items-center ${isActive
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface hover:bg-surface-container"
                      }`}
                  >
                    {link.label}
                  </Link>
                  {link.subLinks && (
                    <div className="flex flex-col pl-6 pr-2 py-2 gap-1 border-l-2 border-surface-variant ml-4 mt-1">
                      {link.subLinks.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`py-3 px-4 rounded-lg text-md transition-colors ${pathname === sub.href ? "text-secondary font-bold bg-secondary/5" : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-4 border-t border-surface-variant pt-6">
            <Button variant="primary" size="lg" className="w-full rounded-full" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="/donate">Donate</Link>
            </Button>
            {isLoading ? (
              <div className="w-full h-12 animate-pulse bg-surface-variant rounded-full" />
            ) : user ? (
              <div className="flex flex-col w-full gap-2">
                <Link href={role === 'admin' ? '/admin/dashboard' : '/portal/dashboard'} className="py-3 px-4 text-center font-medium text-on-surface hover:bg-surface-container rounded-xl transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <form action={logout} className="w-full">
                  <button type="submit" className="w-full py-3 px-4 text-center font-medium text-error hover:bg-error-container rounded-xl transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/get-involved" className="w-full py-3 px-4 text-center font-medium text-on-surface hover:bg-surface-container rounded-xl transition-colors" onClick={() => setIsMenuOpen(false)}>
                Join Us
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
