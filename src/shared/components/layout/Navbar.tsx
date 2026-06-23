"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/shared/constants/navigation";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import { createClient } from "@/shared/lib/supabase/client";

type NavLink = { href: string; label: string; subLinks?: { href: string; label: string }[] };

// Extracted component to resolve React Hooks violation (useState inside loop)
function MobileNavAccordion({ link, pathname }: { link: NavLink, pathname: string }) {
  const isActive = pathname === link.href;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`py-3 px-4 rounded-lg font-medium text-base transition-colors flex justify-between items-center ${isActive || isExpanded ? "bg-surface-container text-primary" : "text-on-surface hover:bg-surface-container"
          }`}
        aria-expanded={isExpanded}
        aria-controls={`submenu-${link.label.replace(/\\s+/g, '-').toLowerCase()}`}
      >
        {link.label}
        <span className={`material-symbols-outlined transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </button>
      <div
        id={`submenu-${link.label.replace(/\\s+/g, '-').toLowerCase()}`}
        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-1 mb-2" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col pl-4 pr-2 py-1 gap-1 ml-4 border-l-2 border-surface-variant/50">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {link.subLinks?.map((sub: any) => {
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
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { user, role, isLoading } = useAuth();



  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background effect
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show effect
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current && !isMenuOpen) {
          setIsHidden(true); // scrolling down
        } else {
          setIsHidden(false); // scrolling up
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

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

  // Focus trap for mobile drawer
  useEffect(() => {
    if (!isMenuOpen || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    // Focus first element on open
    if (firstElement) {
      firstElement.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled
        ? "bg-surface border-b border-outline-variant/30"
        : "bg-transparent border-transparent"
        } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-3 md:py-4 max-w-[1440px] mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className={`flex items-center gap-3 z-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary rounded-none text-primary`}
        >
          <Image
            src="/assets/images/yad_logo.png"
            alt="YAD Logo"
            width={44}
            height={44}
            className={`w-10 h-10 md:w-11 md:h-11 object-contain transition-all duration-300 hover:scale-105`}
            priority
          />
          <span className="text-xl md:text-2xl font-bold tracking-widest uppercase">
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
                  className={`flex items-center gap-1 py-2 text-sm transition-colors duration-200 ${isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary"
                    }`}
                >
                  {link.label}
                  {link.subLinks && (
                    <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180" aria-hidden="true">
                      expand_more
                    </span>
                  )}
                </Link>

                {link.subLinks && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 ${isNavigating ? 'opacity-0 invisible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible'}`}>
                    <div className="w-56 bg-surface/75 backdrop-blur shadow-ambient rounded-md border border-outline-variant/30 overflow-hidden flex flex-col py-2">
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
                            className={`px-4 py-3 text-sm text-center transition-colors ${isSubActive
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
            <div className="w-24 h-10 bg-surface-variant/50 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="relative group">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-none border transition-all focus:outline-none focus:border-primary text-[10px] font-bold tracking-widest uppercase border-outline-variant/30 bg-surface hover:bg-surface-container text-on-surface`}
                aria-haspopup="true"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">account_circle</span>
                <span className="max-w-[100px] truncate">My Account</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:rotate-180 transition-transform" aria-hidden="true">
                  expand_more
                </span>
              </button>

              <div className={`absolute right-0 top-full pt-2 w-64 transition-all duration-200 z-50 ${isNavigating ? 'opacity-0 invisible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible'}`}>
                <div className="bg-surface-container-highest shadow-ambient rounded-md border border-outline-variant/30 flex flex-col overflow-hidden">
                  <div className="px-4 py-3 bg-surface-container-high/50 border-b border-surface-variant/50">
                    <p className="text-sm font-semibold text-on-surface truncate">{user.email}</p>
                    <p className="text-xs text-on-surface-variant capitalize mt-0.5">{role} Access</p>
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
                      <span className="material-symbols-outlined text-[18px]">dashboard</span> Dashboard
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
                      <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
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

          <Button variant="primary" asChild>
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 -mr-2 flex items-center justify-center rounded-none transition-colors z-50 focus:outline-none focus:border-primary border border-transparent text-on-surface hover:border-outline-variant/30`}
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
        ref={drawerRef}
        aria-modal="true"
        role="dialog"
        className={`lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-surface border-l border-outline-variant/30 z-50 flex flex-col h-[100svh] overflow-hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-outline-variant/30">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Menu</span>
          <button
            className="text-on-surface p-2 -mr-2 flex items-center justify-center rounded-none border border-transparent hover:border-outline-variant/30 transition-colors focus:outline-none focus:border-primary"
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
                    className={`py-3 px-4 rounded-none font-light text-base transition-colors flex justify-between items-center border border-transparent ${isActive ? "bg-surface-container border-outline-variant/30 text-primary font-bold text-[10px] uppercase tracking-widest" : "text-on-surface hover:bg-surface-container hover:border-outline-variant/30"
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