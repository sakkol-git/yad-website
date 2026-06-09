import type { Metadata } from "next";
import DonateHeader from "@/components/layout/DonateHeader";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment",
  description: "Enter your payment details to complete your donation to YAD Cambodia.",
};

export default function DonatePaymentPage() {
  return (
    <>
      <DonateHeader />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex flex-col lg:flex-row gap-gutter">
        {/* Left Column */}
        <div className="w-full lg:w-2/3">
          {/* Progress Indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-bold text-label-bold">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <span className="font-label-bold text-label-bold text-secondary hidden md:inline">Details</span>
            </div>
            <div className="h-px bg-surface-variant flex-grow" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold">2</div>
              <span className="font-label-bold text-label-bold text-primary hidden md:inline">Payment</span>
            </div>
            <div className="h-px bg-surface-variant flex-grow" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-label-bold text-label-bold">3</div>
              <span className="font-label-bold text-label-bold text-on-surface-variant hidden md:inline">Review</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-6 md:p-10 relative overflow-hidden">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">
              Payment Method
            </h2>
            <div className="bg-surface p-6 rounded-lg border border-surface-variant mb-8">
              <div className="mb-6">
                <label className="block font-label-bold text-label-bold text-on-surface mb-2">
                  Card Information
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    credit_card
                  </span>
                  <input className="stripe-input pl-10 border border-surface-variant bg-surface-container-lowest mb-[-1px] rounded-b-none" placeholder="Card number" required type="text" />
                </div>
                <div className="grid grid-cols-2">
                  <input className="stripe-input border border-surface-variant bg-surface-container-lowest rounded-t-none rounded-br-none border-r-0" placeholder="MM / YY" required type="text" />
                  <input className="stripe-input border border-surface-variant bg-surface-container-lowest rounded-t-none rounded-bl-none" placeholder="CVC" required type="text" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-label-bold text-label-bold text-on-surface mb-2">
                  Name on Card
                </label>
                <input className="stripe-input border border-surface-variant bg-surface-container-lowest" placeholder="Jane Doe" required type="text" />
              </div>
              <div className="pt-4 border-t border-surface-variant">
                <h3 className="font-label-bold text-label-bold text-on-surface mb-4">
                  Billing Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-label-bold text-on-surface-variant mb-1">Country</label>
                    <select className="stripe-input border border-surface-variant bg-surface-container-lowest">
                      <option>United States</option>
                      <option>Cambodia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-label-bold text-on-surface-variant mb-1">ZIP / Postal Code</label>
                    <input className="stripe-input border border-surface-variant bg-surface-container-lowest" placeholder="12345" required type="text" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="ghost" className="text-on-surface-variant hover:text-primary gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back
              </Button>
              <Button variant="primary" className="rounded-full gap-2 hover:scale-105 px-8">
                Review Donation <span className="material-symbols-outlined">arrow_forward</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <div className="sticky top-24 bg-surface-container-low rounded-xl p-8 border border-surface-variant relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-20 rounded-bl-full -z-0" />
            <h3 className="font-headline-md text-headline-md text-primary mb-6 relative z-10">Summary</h3>
            <div className="flex justify-between items-end mb-6 border-b border-surface-variant pb-6 relative z-10">
              <span className="font-body-lg text-body-lg text-on-surface-variant">Total</span>
              <span className="font-display-lg text-display-lg text-primary">$50</span>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <div>
                  <p className="font-label-bold text-label-bold text-on-surface">Secure Checkout</p>
                  <p className="font-body-md text-body-md text-sm text-on-surface-variant">Guaranteed safe &amp; encrypted by Stripe.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">favorite</span>
                <div>
                  <p className="font-label-bold text-label-bold text-on-surface">Direct Impact</p>
                  <p className="font-body-md text-body-md text-sm text-on-surface-variant">100% of your donation funds local projects in Cambodia.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-surface-variant flex items-center justify-center gap-2 text-on-surface-variant opacity-70 relative z-10">
              <span className="font-label-bold text-label-bold text-xs uppercase tracking-wider">Powered by</span>
              <span className="font-bold text-lg tracking-tighter text-[#635BFF]">stripe</span>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="minimal" />
    </>
  );
}
