"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { ProgressIndicator } from "@/features/Entities/donations/components/ProgressIndicator";
import { createDonationDraftAction } from "@/server/actions/donate.actions";
import { toast } from "sonner";

export default function DonateFlowPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedAmounts = [25, 50, 100];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0 || !firstName || !lastName || !email || !consent) {
      toast.error("Please fill in all fields and provide consent.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create Donation Draft in DB
      const draftRes = await createDonationDraftAction(Number(amount), firstName, lastName, email);

      if (!draftRes.success || !draftRes.data) {
        throw new Error(draftRes.error || "Failed to create donation draft");
      }
      // 2. Redirect to intermediate Payment method selector page
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.push(`/payment?id=${(draftRes.data as any).id}&type=donation`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const displayAmount = amount || 0;

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-20 flex flex-col lg:flex-row gap-gutter">
      <div className="w-full lg:w-2/3">
        <ProgressIndicator currentStep={1} />

        <div className="bg-surface-container-lowest rounded-lg shadow-ambient p-6 md:p-10 relative overflow-hidden">
          {/* Donation Information Section */}
          <div className="mb-10 p-6 bg-surface-container-low border border-surface-variant rounded-lg">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-3">
              Donation Information
            </h3>
            <p className="text-sm text-on-surface-variant mb-4">
              <strong>Youth Advancement for Development Cambodia</strong>
              <br />
              <span className="inline-block mt-1 px-2 py-0.5 bg-tertiary-container text-on-tertiary-container rounded text-xs font-bold border border-tertiary/20">
                Registration number: [INSERT NGO REGISTRATION NUMBER]
              </span>
            </p>
            <p className="text-sm text-on-surface-variant italic mb-6">
              Tax deductibility depends on your country of residence and applicable laws. YAD Cambodia does not issue tax receipts for international jurisdictions. Please consult your tax advisor.
            </p>
            
            <div className="mb-4">
              <p className="text-sm font-label-bold mb-2 text-on-surface">Fund Allocation</p>
              <div className="flex h-3 w-full rounded-full overflow-hidden">
                <div className="bg-secondary" style={{ width: "80%" }} title="Programs & direct beneficiaries: 80%"></div>
                <div className="bg-primary" style={{ width: "15%" }} title="Operations & staff: 15%"></div>
                <div className="bg-tertiary" style={{ width: "5%" }} title="Fundraising & outreach: 5%"></div>
              </div>
              <div className="flex justify-between text-xs mt-2 text-on-surface-variant">
                <span><span className="inline-block w-2 h-2 rounded-full bg-secondary mr-1"></span>Programs: 80%</span>
                <span><span className="inline-block w-2 h-2 rounded-full bg-primary mr-1"></span>Operations: 15%</span>
                <span><span className="inline-block w-2 h-2 rounded-full bg-tertiary mr-1"></span>Fundraising: 5%</span>
              </div>
            </div>
            
            <a href="/about/financials" className="text-sm text-primary hover:underline font-semibold">
              Read our full financial transparency report →
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="font-headline-md text-headline-md text-primary mb-6">
              Select Amount
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {predefinedAmounts.map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant={amount === preset ? "primary" : "outline"}
                  onClick={() => setAmount(preset)}
                  size="lg"
                  className={amount === preset ? "bg-primary-container text-on-primary-container ring-2 ring-primary border-transparent text-lg hover:bg-primary-container" : "border-transparent bg-surface-container hover:bg-surface-variant text-on-surface text-lg"}
                >
                  ${preset}
                </Button>
              ))}
            </div>
            <div className="mb-8 relative">
              <label htmlFor="customAmount" className="sr-only">Custom Amount</label>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body-lg text-body-lg text-on-surface-variant">
                $
              </span>
              <input
                id="customAmount"
                className="stripe-input pl-8 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                placeholder="Custom Amount"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
              />
            </div>

            <h2 className="font-headline-md text-headline-md text-primary mb-6">
              Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block font-label-bold text-label-bold text-on-surface mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  className="stripe-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  placeholder="Jane"
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block font-label-bold text-label-bold text-on-surface mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="stripe-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  placeholder="Doe"
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block font-label-bold text-label-bold text-on-surface mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  className="stripe-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  placeholder="jane.doe@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-8 flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-surface-variant text-primary focus:ring-primary"
              />
              <label htmlFor="consent" className="text-sm text-on-surface-variant leading-tight">
                I understand this donation is made to Youth Advancement for Development (YAD) Cambodia, a registered Cambodian NGO.
              </label>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="secondary" size="lg" className=" gap-2 hover:scale-105 px-8" disabled={isLoading || !consent}>
                {isLoading ? "Processing..." : "Proceed to Secure Checkout"}
                {!isLoading && <span className="material-symbols-outlined">lock</span>}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
        <div className="sticky top-24 bg-surface-container-low rounded-lg p-8 border border-surface-variant relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-20 rounded-bl-full -z-0" />
          <h3 className="font-headline-md text-headline-md text-primary mb-6 relative z-10">
            Summary
          </h3>
          <div className="flex justify-between items-end mb-6 border-b border-surface-variant pb-6 relative z-10">
            <span className="font-body-lg text-body-lg text-on-surface-variant">
              Total
            </span>
            <span className="font-display-lg text-display-lg text-primary">
              ${displayAmount}
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

