"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export function DonationPortal() {
  return (
    <section id="options" className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap scroll-mt-24">
      <div className="max-w-3xl mx-auto bg-surface-container-lowest rounded-lg p-8 md:p-12 shadow-xl border border-surface-variant/30 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-surface shadow-sm">
              <span className="material-symbols-outlined text-primary text-4xl">volunteer_activism</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
              Make a Difference Today
            </h2>
            <p className="text-lg text-on-surface-variant max-w-xl mx-auto">
              Your contribution empowers Cambodian youth through safe housing, education, and skills training.
            </p>
          </div>

          <div className="space-y-8 max-w-xl mx-auto">
            <div className="pt-8">
              <Button variant="primary" size="lg" className="w-full rounded-full py-7 text-[18px] font-bold gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all bg-primary text-on-primary" asChild>
                <Link href={`/donate/flow`}>
                  Continue to Donation Details
                  <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                </Link>
              </Button>
              <p className="text-center text-sm text-on-surface-variant mt-6 flex items-center justify-center gap-2 font-medium">
                <span className="material-symbols-outlined text-lg opacity-70">verified_user</span>
                Secure payment options (Stripe, KHQR, Bank Transfer) available next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
