"use client";

import { useRouter } from "next/navigation";
import { ProgressIndicator } from "@/features/Entities/donations/components/ProgressIndicator";
import { StripeEmbeddedCheckout } from "@/features/Entities/donations/components/StripeEmbeddedCheckout";
import { GenericPaymentDetails } from "@/server/actions/payment.actions";

interface StripePaymentClientProps {
  paymentDetails: GenericPaymentDetails;
}

export function StripePaymentClient({ paymentDetails }: StripePaymentClientProps) {
  const router = useRouter();

  const { id, name, email, amount, description, type } = paymentDetails;

  return (
    <div className="flex flex-col lg:flex-row gap-gutter">
      {/* Main Checkout Section */}
      <div className="w-full lg:w-2/3">
        <ProgressIndicator currentStep={2} />

        <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-6 md:p-10 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-surface-variant/30 pb-4 mb-6">
            <h2 className="font-headline-md text-headline-md text-primary">
              International Card Payment
            </h2>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to options
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-on-surface-variant">
              Please enter your credit or debit card details below. All transaction information is securely encrypted and processed by Stripe.
            </p>

            <StripeEmbeddedCheckout
              id={id}
              type={type}
              amount={amount}
              email={email}
            />
          </div>
        </div>
      </div>

      {/* Side summary column */}
      <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
        <div className="sticky top-24 bg-surface-container-low rounded-xl p-8 border border-surface-variant relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-20 rounded-bl-full -z-0" />
          <h3 className="font-headline-md text-headline-md text-primary mb-6 relative z-10">
            Payment Summary
          </h3>
          
          <div className="space-y-4 mb-6 border-b border-surface-variant pb-6 relative z-10 text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Description</span>
              <span className="font-bold text-on-surface text-right">{description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Name</span>
              <span className="font-bold text-on-surface">{name}</span>
            </div>
            {email && (
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Email</span>
                <span className="font-semibold text-on-surface break-all text-right">{email}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-end mb-6 relative z-10">
            <span className="font-body-lg text-body-lg text-on-surface-variant">
              Total Amount
            </span>
            <span className="font-display-lg text-display-lg text-primary">
              ${amount.toFixed(2)}
            </span>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary">
                verified_user
              </span>
              <div>
                <p className="font-label-bold text-label-bold text-on-surface text-sm">
                  Stripe Secure
                </p>
                <p className="font-body-md text-body-md text-xs text-on-surface-variant mt-0.5">
                  Your payment is processed by Stripe, meeting PCI-DSS Level 1 compliance standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
