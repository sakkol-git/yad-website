import React from "react";

interface PortalPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A standardized layout wrapper for all User Portal pages.
 * Ensures consistent padding, max-width constraints, and stacking.
 */
export function PortalPageLayout({ children, className = "" }: PortalPageLayoutProps) {
  return (
    <div
      className={`space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${className}`}
    >
      {children}
    </div>
  );
}
