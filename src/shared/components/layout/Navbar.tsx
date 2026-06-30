"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/shared/constants/navigation";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import { createClient } from "@/shared/lib/supabase/client";
import { useMagneticHover } from "@/shared/hooks/useMagneticHover";
import { gsap } from "@/shared/lib/animations/gsap-config";
import { ImpactTicker } from "@/shared/components/ui/ImpactTicker";
import { useScrollHide } from "@/shared/hooks/useScrollHide";
import { useFocusTrap } from "@/shared/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/shared/hooks/useLockBodyScroll";

type NavLink = { href: string; label: string; subLinks?: { href: string; label: string }[] };

function MobileNavAccordion({ link, pathname }: { link: NavLink; pathname: string }) {
  const isActive = pathname === link.href;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`py-3 px-4 rounded-md transition-colors flex justify-between items-center border border-transparent ${
          isActive || isExpanded
            ? "bg-surface-container border-outline-variant/30 text-primary font-bold text-[10px] uppercase tracking-widest"
            : "text-on-surface font-light text-sm uppercase tracking-widest hover:bg-surface-container hover:border-outline-variant/30"
        }`}
        aria-expanded={isExpanded}
        aria-controls={`submenu-${link.label.replace(/\s+/g, "-").toLowerCase()}`}
      >
        {link.label}
        <span
          className={`material-symbols-outlined transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>
      <div
        id={`submenu-${link.label.replace(/\s+/g, "-").toLowerCase()}`}
        className={`grid transition-[background-color,border-color,backdrop-filter] duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-2 mb-2" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col pl-4 pr-2 py-1 gap-1 ml-4 border-l border-outline-variant/30">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {link.subLinks?.map((sub: any) => {
              const isSubActive = pathname === sub.href;
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={`py-2.5 px-4 rounded-md transition-colors ${
                    isSubActive
                      ? "text-primary font-bold bg-surface-container/50 text-[10px] uppercase tracking-widest"
                      : "text-on-surface-variant font-light text-[10px] uppercase tracking-widest hover:text-primary hover:bg-surface-container/50"
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
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { user, role, isLoading } = useAuth();
  const {
    ref: ctaRef,
    handleMouseMove: ctaMouseMove,
    handleMouseLeave: ctaMouseLeave,
  } = useMagneticHover(0.25);

  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const { isScrolled, isHidden } = useScrollHide(isMenuOpen);
  useLockBodyScroll(isMenuOpen);
  useFocusTrap(drawerRef, isMenuOpen);

  // Pulse animation for "Fund a Future" CTA
  useEffect(() => {
    const hasPulsed = sessionStorage.getItem("cta-pulsed");
    if (hasPulsed || !ctaRef.current) return;

    const timer = setTimeout(() => {
      if (ctaRef.current) {
        gsap
          .timeline()
          .to(ctaRef.current, { scale: 1.05, duration: 0.2, ease: "power2.out" })
          .to(ctaRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
        sessionStorage.setItem("cta-pulsed", "true");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [ctaRef]);



  // Automatically close mobile menu and desktop dropdowns when navigating to a new route
  useEffect(() => {
    if (isMenuOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMenuOpen(false);
    }

    // Force close desktop hover dropdowns
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 150);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);



  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-in-out ${
        isScrolled
          ? "bg-surface/60 backdrop-blur-xl border-b border-outline-variant/30 shadow-ambient"
          : "bg-transparent border-transparent"
      } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      aria-label="Main navigation"
    >
      <ImpactTicker />
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-3 md:py-4 max-w-[1440px] mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className={`flex items-center gap-3 z-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary rounded-md text-primary`}
        >
          <Image
            src="/assets/images/yad_logo.png"
            alt="YAD Logo"
            width={44}
            height={44}
            className={`w-10 h-10 md:w-11 md:h-11 object-contain transition-[background-color,border-color,backdrop-filter] duration-300 hover:scale-105`}
            priority
          />
          <span className="text-xl md:text-2xl font-bold tracking-widest uppercase">YAD</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-medium">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || link.subLinks?.some((sub) => pathname === sub.href);
            return (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                  {link.subLinks && (
                    <span
                      className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  )}
                </Link>

                {link.subLinks && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-[background-color,border-color,backdrop-filter] duration-200 z-50 ${isNavigating ? "opacity-0 invisible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"}`}
                  >
                    <div className="w-56 bg-surface/85 backdrop-blur-2xl shadow-xl shadow-black/10 rounded-md border border-outline-variant/50 overflow-hidden flex flex-col py-2">
                      {link.subLinks.map((subLink) => {
                        const isSubActive = pathname === subLink.href;
                        return (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            onClick={() => {
                              if (document.activeElement instanceof HTMLElement) {
                                document.activeElement.blur();
                              }
                            }}
                            className={`px-4 py-3 text-sm text-center transition-colors ${
                              isSubActive
                                ? "text-primary font-bold bg-surface-container-high uppercase tracking-widest text-[10px]"
                                : "text-on-surface font-light hover:text-primary hover:bg-surface-container-high"
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
            <div className="w-24 h-10 bg-surface-variant/50 animate-pulse rounded-md" />
          ) : user ? (
            <div className="relative group">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-[background-color,border-color,backdrop-filter] focus:outline-none focus:border-primary text-[10px] font-bold tracking-widest uppercase border-outline-variant/30 bg-surface hover:bg-surface-container text-on-surface`}
                aria-haspopup="true"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  account_circle
                </span>
                <span className="max-w-[100px] truncate">My Account</span>
                <span
                  className="material-symbols-outlined text-base text-on-surface-variant group-hover:rotate-180 transition-transform"
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>

              <div
                className={`absolute right-0 top-full pt-2 w-64 transition-[background-color,border-color,backdrop-filter] duration-200 z-50 ${isNavigating ? "opacity-0 invisible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"}`}
              >
                <div className="bg-surface/85 backdrop-blur-2xl border border-outline-variant/50 dark:border-white/20 shadow-xl shadow-black/10 rounded-md flex flex-col overflow-hidden">
                  <div className="px-4 py-3 bg-surface-container-high/50 border-b border-surface-variant/50">
                    <p className="text-sm font-semibold text-on-surface truncate">{user.email}</p>
                    <p className="text-xs text-on-surface-variant capitalize mt-0.5">
                      {role} Access
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href={role === "admin" ? "/admin/dashboard" : "/portal/dashboard"}
                      onClick={() => {
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                      }}
                      className="px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-high hover:text-primary transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-lg">dashboard</span> Dashboard
                    </Link>
                    <button
                      onClick={(e) => {
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-on-surface hover:bg-error/10 hover:text-error transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className={`text-sm font-medium transition-colors px-2 text-on-surface-variant hover:text-primary`}
            >
              Log In
            </Link>
          )}

          <Button
            variant="primary"
            asChild
            ref={ctaRef as React.Ref<HTMLButtonElement>}
            onMouseMove={ctaMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
            onMouseLeave={ctaMouseLeave as unknown as React.MouseEventHandler<HTMLButtonElement>}
          >
            <Link href="/donate">Fund a Future</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 -mr-2 flex items-center justify-center rounded-md transition-colors z-50 focus:outline-none focus:border-primary border border-transparent text-on-surface hover:border-outline-variant/30`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
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
        ref={drawerRef}
        aria-modal="true"
        role="dialog"
        className={`lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-surface border-l border-outline-variant/30 z-50 flex flex-col h-[100svh] overflow-hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-outline-variant/30">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Menu</span>
          <button
            className="text-on-surface p-2 -mr-2 flex items-center justify-center rounded-md border border-transparent hover:border-outline-variant/30 transition-colors focus:outline-none focus:border-primary"
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

              if (!hasSubLinks) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-3 px-4 rounded-md transition-colors flex justify-between items-center border border-transparent ${
                      isActive
                        ? "bg-surface-container border-outline-variant/30 text-primary font-bold text-[10px] uppercase tracking-widest"
                        : "text-on-surface font-light text-sm uppercase tracking-widest hover:bg-surface-container hover:border-outline-variant/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return <MobileNavAccordion key={link.href} link={link} pathname={pathname} />;
            })}
          </div>

          {/* Mobile Auth & CTA Footer */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col gap-4 pb-8">
            {isLoading ? (
              <div className="w-full h-12 bg-surface-variant/50 animate-pulse rounded-md" />
            ) : user ? (
              <div className="bg-surface border border-outline-variant/30 rounded-md p-4">
                <p className="text-sm font-semibold text-on-surface mb-3 truncate">
                  Hi, {user.email}
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={role === "admin" ? "/admin/dashboard" : "/portal/dashboard"}
                    className="flex items-center justify-center gap-2 py-2.5 bg-surface border border-surface-variant rounded-md text-[10px] font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">dashboard</span> Portal
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-surface border border-surface-variant rounded-md text-[10px] font-bold uppercase tracking-widest text-error hover:bg-error/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">logout</span> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/auth/login"
                  className="py-3 text-center border border-outline-variant/30 text-on-surface hover:bg-surface-container rounded-md transition-colors text-[10px] font-bold uppercase tracking-widest"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="py-3 text-center bg-surface-container text-on-surface hover:bg-surface-variant border border-transparent rounded-md transition-colors text-[10px] font-bold uppercase tracking-widest"
                >
                  Register
                </Link>
              </div>
            )}

            <Button
              variant="primary"
              asChild
              className="w-full h-[48px] text-[10px] font-bold uppercase tracking-widest rounded-md mt-2"
            >
              <Link href="/donate">Fund a Future</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
