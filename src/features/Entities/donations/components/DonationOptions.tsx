"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export function DonationOptions() {
  const [selectedAmount, setSelectedAmount] = useState<number | "Custom">(50);
  const [customAmount, setCustomAmount] = useState<string>("");

  const amounts: (number | "Custom")[] = [25, 50, 100, 250, "Custom"];

  const currentAmount = selectedAmount === "Custom" ? Number(customAmount) || 0 : selectedAmount;

  return (
    <section id="options" className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap scroll-mt-24">
      <div className="max-w-3xl mx-auto bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-xl border border-surface-variant/30 relative overflow-hidden">
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
              Your contribution empowers Cambodian youth through safe housing, education, and skills training. Choose your amount to begin.
            </p>
          </div>

          <div className="space-y-8 max-w-xl mx-auto">
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-3 text-center uppercase tracking-wider">
                Select Donation Amount
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {amounts.map((amount) => {
                  const isSelected = selectedAmount === amount;
                  return (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-4 rounded-xl border-2 font-bold transition-all outline-none relative overflow-hidden ${isSelected
                          ? "border-primary bg-primary/10 text-primary shadow-sm scale-105"
                          : "border-outline-variant/50 text-on-surface-variant hover:border-primary/50 hover:text-primary focus:border-primary focus:text-primary hover:bg-surface-container"
                        }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-bl-lg" />
                      )}
                      {typeof amount === "number" ? `$${amount}` : amount}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedAmount === "Custom" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-bold text-on-surface-variant mb-2">
                  Custom Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-surface-container rounded-xl border border-surface-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface text-lg font-bold transition-all outline-none placeholder:font-normal"
                  />
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-outline-variant/20">
              <Button variant="primary" size="lg" className="w-full rounded-full py-7 text-[18px] font-bold gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all bg-primary text-on-primary" asChild>
                <Link href={`/donate/flow?amount=${currentAmount}`}>
                  Continue to Payment
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
