"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function DonationOptions() {
  const [selectedAmount, setSelectedAmount] = useState<number | "Custom">(50);

  const amounts: (number | "Custom")[] = [25, 50, 100, "Custom"];

  return (
    <section id="options" className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Local Donations Card */}
        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 ambient-shadow flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-on-secondary-container text-3xl">
              qr_code_scanner
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Local Support
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Fast and secure donations via Bakong KHQR or direct bank transfer.
          </p>
          <div className="bg-surface-container rounded-lg p-6 w-full max-w-xs mb-8 flex flex-col items-center justify-center aspect-square border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="material-symbols-outlined text-primary/30 text-6xl mb-2">
              qr_code_2
            </span>
            <p className="text-sm text-on-surface-variant font-label-bold">
              KHQR Placeholder
            </p>
          </div>
          <p className="font-label-bold text-label-bold text-secondary mb-6">
            Scan to donate using any local banking app.
          </p>
          <div className="w-full text-left bg-surface-container-low p-6 rounded-lg">
            <h3 className="font-label-bold text-label-bold text-primary mb-4 border-b border-outline-variant/20 pb-2">
              Bank Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-on-surface-variant">ABA Bank</p>
                <p className="font-label-bold text-on-surface">
                  000 123 456
                </p>
              </div>
              <div>
                <p className="text-sm text-on-surface-variant">
                  Acleda Bank
                </p>
                <p className="font-label-bold text-on-surface">
                  1234-5678-9012
                </p>
              </div>
              <div className="pt-2">
                <p className="text-sm text-on-surface-variant">
                  Account Name
                </p>
                <p className="font-label-bold text-on-surface">
                  YAD Organization
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* International Donations Card */}
        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 ambient-shadow flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">
                public
              </span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-primary">
                Global Giving
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Secure card payments via Stripe.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {amounts.map((amount) => {
              const isSelected = selectedAmount === amount;
              return (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-lg border-2 font-label-bold transition-all outline-none relative overflow-hidden ${
                    isSelected
                      ? "border-secondary bg-secondary/5 text-secondary shadow-sm"
                      : "border-outline-variant text-on-surface-variant hover:border-secondary/50 hover:text-secondary/80 focus:border-secondary focus:text-secondary"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-bl-sm" />
                  )}
                  {typeof amount === "number" ? `$${amount}` : amount}
                </button>
              );
            })}
          </div>
          <div className="space-y-4 flex-grow">
            <div>
              <label className="block text-sm font-label-bold text-on-surface mb-1">
                Full Name
              </label>
              <input
                className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-secondary transition-all"
                placeholder="Jane Doe"
                type="text"
              />
            </div>
            <div>
              <label className="block text-sm font-label-bold text-on-surface mb-1">
                Email Address
              </label>
              <input
                className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-secondary transition-all"
                placeholder="jane@example.com"
                type="email"
              />
            </div>
          </div>
          <div className="mt-8">
            <Button variant="secondary" size="lg" className="w-full rounded-full gap-2 shadow-md hover:scale-[1.02]" asChild>
              <Link href={`/donate/flow?amount=${selectedAmount}`}>
                <span className="material-symbols-outlined">credit_card</span>
                Donate {typeof selectedAmount === "number" ? `$${selectedAmount}` : ""}
              </Link>
            </Button>
            <div className="flex justify-center items-center gap-4 mt-6 text-on-surface-variant opacity-60">
              <span className="material-symbols-outlined text-3xl">lock</span>
              <span className="text-sm font-label-bold">
                Secured by Stripe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
