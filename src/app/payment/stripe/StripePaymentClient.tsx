"use client";

import { useRouter } from "next/navigation";
import { ProgressIndicator } from "@/features/Entities/donations/components/ProgressIndicator";
import { StripeEmbeddedCheckout } from "@/features/Entities/donations/components/StripeEmbeddedCheckout";
import { GenericPaymentDetails } from "@/server/actions/payment.actions";
import { PaymentSummary } from "../components/PaymentSummary";

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

        <div className="bg-surface rounded-md p-6 md:p-12 border border-outline-variant/30 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-8">
            <h2 className="text-2xl font-light text-on-surface tracking-tight">
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

          <div className="space-y-8">
            <p className="text-sm font-light text-on-surface-variant leading-relaxed">
              Please enter your credit or debit card details below. All transaction information is
              securely encrypted and processed by Stripe.
            </p>

            <StripeEmbeddedCheckout id={id} type={type} amount={amount} email={email} />
          </div>
        </div>
      </div>

      {/* Side summary column */}
      <PaymentSummary paymentDetails={paymentDetails}>
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-xl text-primary">verified_user</span>
          <div>
            <p className="uppercase tracking-widest text-[10px] font-bold text-on-surface mb-1">
              Stripe Secure
            </p>
            <p className="text-xs font-light text-on-surface-variant leading-relaxed mt-0.5">
              Your payment is processed by Stripe, meeting PCI-DSS Level 1 compliance standards.
            </p>
          </div>
        </div>
      </PaymentSummary>
    </div>
  );
}
