"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't made a choice yet
    const consent = localStorage.getItem("yad-cookie-consent");
    if (!consent) {
      // Small delay to prevent layout shift jarring on immediate load
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("yad-cookie-consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("yad-cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-fade-up pointer-events-none">
      <div className="max-w-4xl mx-auto bg-surface-container-highest border border-outline-variant/40 rounded-md shadow-2xl p-6 pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">
              cookie
            </span>
            We value your privacy
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We use cookies to enhance your browsing experience, serve personalized content, and
            analyze our traffic. By clicking "Accept All", you consent to our use of cookies. For
            more details, see our{" "}
            <Link
              href="/privacy"
              className="text-primary hover:underline focus-visible:underline focus-visible:outline-none rounded-sm"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Button variant="outline" onClick={handleDecline} className="w-full sm:w-auto">
            Decline Optional
          </Button>
          <Button variant="primary" onClick={handleAccept} className="w-full sm:w-auto">
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
