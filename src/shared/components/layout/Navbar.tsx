"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/shared/lib/animations/gsap-config";
import { useReducedMotion } from "@/shared/lib/animations/use-reduced-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/shared/constants/navigation";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import { createClient } from "@/shared/lib/supabase/client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, isLoading } = useAuth();
  
  const navRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  useGSAP(
    () => {
      if (!navRef.current || reduced) return;

      const nav = navRef.current;
      
      // Initially remove background classes
      nav.classList.remove("bg-surface/95", "backdrop-blur-md", "border-b", "border-surface-variant/40", "shadow-sm");

      // Background transition
      ScrollTrigger.create({
        start: "top -50px",
        end: 99999,
        onEnter: () => {
          nav.classList.add("bg-surface/95", "backdrop-blur-md", "border-b", "border-surface-variant/40", "shadow-sm");
        },
        onLeaveBack: () => {
          nav.classList.remove("bg-surface/95", "backdrop-blur-md", "border-b", "border-surface-variant/40", "shadow-sm");
        }
      });

      // Hide/Show transition
      ScrollTrigger.create({
        start: "top -120px",
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === 1) {
            gsap.to(nav, { yPercent: -100, duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
          } else {
            gsap.to(nav, { yPercent: 0, duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
          }
        }
      });
    },
    { scope: navRef, dependencies: [reduced] }
  );

  // Automatically close mobile menu when navigating to a new route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-surface-variant/40 shadow-sm transition-all duration-300"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-3 md:py-4 max-w-[1440px] mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        >
          <Image
            src="/assets/images/yad_logo.png"
            alt="YAD Logo"
            width={44}
            height={44}
            className="w-10 h-10 md:w-11 md:h-11 object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
          <span className="font-headline-md text-xl md:text-2xl font-bold text-primary tracking-tight">
            YAD
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || link.subLinks?.some((sub) => pathname === sub.href);
            return (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 py-2 text-sm transition-colors duration-200 ${isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                    }`}
                >
                  {link.label}
                  {link.subLinks && (
                    <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180" aria-hidden="true">
                      expand_more
                    </span>
                  )}
                </Link>

                {/* Sub-menu with invisible bridge to prevent accidental closing */}
                {link.subLinks && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                    <div className="w-56 bg-surface rounded-lg shadow-lg border border-surface-variant/50 overflow-hidden flex flex-col py-2">
                      {link.subLinks.map((subLink) => {
                        const isSubActive = pathname === subLink.href;
                        return (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className={`px-4 py-2.5 text-sm text-center transition-colors ${isSubActive
                              ? "text-primary font-semibold bg-primary/5"
                              : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                              }`}
                          >
                            {subLink.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Auth & CTA */}
        <div className="hidden lg:flex items-center gap-5">
          {isLoading ? (
            <div className="w-24 h-10 bg-surface-variant/50 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-variant/50 bg-surface hover:bg-surface-container transition-all focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                aria-haspopup="true"
              >
                <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">account_circle</span>
                <span className="max-w-[100px] truncate">My Account</span>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:rotate-180 transition-transform" aria-hidden="true">
                  expand_more
                </span>
              </button>

              <div className="absolute right-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                <div className="bg-surface rounded-lg shadow-xl border border-surface-variant/50 flex flex-col overflow-hidden">
                  <div className="px-4 py-3 bg-surface-container/30 border-b border-surface-variant/50">
                    <p className="text-sm font-semibold text-on-surface truncate">{user.email}</p>
                    <p className="text-xs text-on-surface-variant capitalize mt-0.5">{role} Access</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href={role === "admin" ? "/admin/dashboard" : "/portal/dashboard"}
                      className="px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-[18px]">dashboard</span> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-on-surface hover:bg-error/10 hover:text-error transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors px-2"
            >
              Log In
            </Link>
          )}

          <Button variant="primary" className=" shadow-sm hover:shadow-md transition-all" asChild>
            <Link href="/donate/flow">Donate Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-on-surface p-2 -mr-2 flex items-center justify-center rounded-md hover:bg-surface-container transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined text-3xl">{isMenuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile Navigation Backdrop */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-surface shadow-2xl z-50 flex flex-col h-[100svh] overflow-hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-4 py-3 md:py-4 border-b border-surface-variant/40">
          <span className="font-headline-md text-xl font-bold text-primary">Menu</span>
          <button
            className="text-on-surface p-2 -mr-2 flex items-center justify-center rounded-md hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* Mobile Links */}
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const hasSubLinks = !!link.subLinks;
              const [isExpanded, setIsExpanded] = useState(false); // Using inline state for accordions
              
              if (!hasSubLinks) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-3 px-4 rounded-lg font-medium text-base transition-colors flex justify-between items-center ${isActive ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-surface-container"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <div key={link.href} className="flex flex-col">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`py-3 px-4 rounded-lg font-medium text-base transition-colors flex justify-between items-center ${isActive || isExpanded ? "bg-surface-container text-primary" : "text-on-surface hover:bg-surface-container"
                      }`}
                    aria-expanded={isExpanded}
                  >
                    {link.label}
                    <span className={`material-symbols-outlined transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-1 mb-2" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col pl-4 pr-2 py-1 gap-1 ml-4 border-l-2 border-surface-variant/50">
                        {link.subLinks?.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`py-2.5 px-4 rounded-md text-sm transition-colors ${isSubActive
                                ? "text-primary font-semibold bg-primary/5"
                                : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"
                                }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Auth & CTA Footer */}
          <div className="mt-8 pt-6 border-t border-surface-variant/50 flex flex-col gap-4 pb-8">
            {isLoading ? (
              <div className="w-full h-12 bg-surface-variant/50 animate-pulse rounded-full" />
            ) : user ? (
              <div className="bg-surface-container/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-on-surface mb-3 truncate">Hi, {user.email}</p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={role === "admin" ? "/admin/dashboard" : "/portal/dashboard"}
                    className="flex items-center justify-center gap-2 py-2.5 bg-surface border border-surface-variant rounded-md text-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">dashboard</span> Portal
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-surface border border-surface-variant rounded-md text-sm font-medium text-error hover:bg-error/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/auth/login"
                  className="py-3 text-center font-medium border border-surface-variant text-on-surface hover:bg-surface-container rounded-full transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="py-3 text-center font-medium bg-surface-container text-on-surface hover:bg-surface-variant rounded-full transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            <Button variant="primary" size="lg" className="w-full text-lg shadow-sm" asChild>
              <Link href="/donate/flow">Donate Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}