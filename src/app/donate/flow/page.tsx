import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/features/donate/components/ProgressIndicator";

export const metadata: Metadata = {
  title: "Donate",
  description: "Complete your donation to YAD Cambodia.",
};

export default function DonateFlowPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-20 flex flex-col lg:flex-row gap-gutter">
      {/* Left Column: Checkout Flow */}
      <div className="w-full lg:w-2/3">
        <ProgressIndicator currentStep={1} />

        <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-6 md:p-10 relative overflow-hidden">
          {/* STEP 1: Amount & Contact */}
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-6">
              Select Amount
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Button variant="outline" size="lg" className="border-transparent bg-surface-container hover:bg-surface-variant text-on-surface text-lg">
                $25
              </Button>
              <Button variant="primary" size="lg" className="bg-primary-container text-on-primary-container ring-2 ring-primary border-transparent text-lg hover:bg-primary-container">
                $50
              </Button>
              <Button variant="outline" size="lg" className="border-transparent bg-surface-container hover:bg-surface-variant text-on-surface text-lg">
                $100
              </Button>
            </div>
            <div className="mb-8 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body-lg text-body-lg text-on-surface-variant">
                $
              </span>
              <input
                className="stripe-input pl-8"
                placeholder="Custom Amount"
                type="number"
              />
            </div>

            <h2 className="font-headline-md text-headline-md text-primary mb-6">
              Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-2">
                  First Name
                </label>
                <input
                  className="stripe-input"
                  placeholder="Jane"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-2">
                  Last Name
                </label>
                <input
                  className="stripe-input"
                  placeholder="Doe"
                  required
                  type="text"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-label-bold text-label-bold text-on-surface mb-2">
                  Email Address
                </label>
                <input
                  className="stripe-input"
                  placeholder="jane.doe@example.com"
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="secondary" size="lg" className="rounded-full gap-2 hover:scale-105 px-8" asChild>
                <Link href="/donate/payment">
                  Continue to Payment{" "}
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Summary */}
      <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
        <div className="sticky top-24 bg-surface-container-low rounded-xl p-8 border border-surface-variant relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-20 rounded-bl-full -z-0" />
          <h3 className="font-headline-md text-headline-md text-primary mb-6 relative z-10">
            Summary
          </h3>
          <div className="flex justify-between items-end mb-6 border-b border-surface-variant pb-6 relative z-10">
            <span className="font-body-lg text-body-lg text-on-surface-variant">
              Total
            </span>
            <span className="font-display-lg text-display-lg text-primary">
              $50
            </span>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary">
                verified_user
              </span>
              <div>
                <p className="font-label-bold text-label-bold text-on-surface">
                  Secure Checkout
                </p>
                <p className="font-body-md text-body-md text-sm text-on-surface-variant">
                  Guaranteed safe &amp; encrypted by Stripe.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary">
                favorite
              </span>
              <div>
                <p className="font-label-bold text-label-bold text-on-surface">
                  Direct Impact
                </p>
                <p className="font-body-md text-body-md text-sm text-on-surface-variant">
                  100% of your donation funds local projects in Cambodia.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-surface-variant flex items-center justify-center gap-2 text-on-surface-variant opacity-70 relative z-10">
            <span className="font-label-bold text-label-bold text-xs uppercase tracking-wider">
              Powered by
            </span>
            <span className="font-bold text-lg tracking-tighter text-[#635BFF]">
              stripe
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
