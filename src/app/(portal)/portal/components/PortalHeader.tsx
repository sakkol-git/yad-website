'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PortalHeaderProps {
  logoutAction: (formData: FormData) => void;
}

export function PortalHeader({ logoutAction }: PortalHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant/30 sticky top-0 z-40">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/portal/dashboard" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-secondary rounded-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-on-secondary text-[20px]">group</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-on-surface group-hover:text-secondary transition-colors duration-300">YAD<span className="text-secondary">Portal</span></span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/portal/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px] flex items-center">
                Overview
              </Link>
              <Link href="/portal/bookings" className="px-4 py-2 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px] flex items-center">
                My Bookings
              </Link>
              <Link href="/portal/donations" className="px-4 py-2 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px] flex items-center">
                My Donations
              </Link>
              <Link href="/portal/volunteer" className="px-4 py-2 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px] flex items-center">
                Volunteer
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" title="Back to Website" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md border border-outline-variant/50 text-sm font-medium text-on-surface hover:bg-surface-container hover:border-outline-variant transition-colors duration-200 ease-in-out min-h-[44px]">
              <span className="material-symbols-outlined text-[18px]">public</span>
              <span className="hidden lg:inline">Website</span>
            </Link>
            
            <button className="relative p-2 rounded-md text-on-surface-variant hover:bg-surface-container hover:text-secondary transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            
            <form action={logoutAction} className="hidden sm:block">
              <button title="Sign Out" type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md border border-outline-variant/50 text-sm font-medium text-on-surface hover:bg-error-container hover:text-error hover:border-error-container transition-colors duration-200 ease-in-out min-h-[44px]">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span className="hidden lg:inline">Sign Out</span>
              </button>
            </form>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-on-surface-variant hover:bg-surface-container transition-colors duration-300 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface-container-lowest">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link onClick={() => setMobileMenuOpen(false)} href="/portal/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px]">
              Overview
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/portal/bookings" className="block px-3 py-2 rounded-md text-base font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px]">
              My Bookings
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/portal/donations" className="block px-3 py-2 rounded-md text-base font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px]">
              My Donations
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/portal/volunteer" className="block px-3 py-2 rounded-md text-base font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px]">
              Volunteer
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/" className="sm:hidden block px-3 py-2 rounded-md text-base font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-300 min-h-[44px]">
              Back to Website
            </Link>
            <form action={logoutAction} className="sm:hidden block">
              <button type="submit" className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-error hover:bg-error-container transition-colors duration-300 min-h-[44px]">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
