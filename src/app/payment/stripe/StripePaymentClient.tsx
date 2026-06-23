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

        <div className="bg-surface rounded-none p-6 md:p-12 border border-outline-variant/30 relative overflow-hidden">
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
        <div className="sticky top-24 bg-surface rounded-none p-8 border border-outline-variant/30 relative overflow-hidden">
          <h3 className="text-2xl font-light text-on-surface tracking-tight mb-6 relative z-10 border-b border-outline-variant/30 pb-4">
            Payment Summary
          </h3>

          <div className="space-y-4 mb-8 relative z-10 text-sm font-light text-on-surface-variant leading-relaxed">
            <div className="flex justify-between items-center">
              <span className="uppercase tracking-widest text-[10px] font-bold">Description</span>
              <span className="font-light text-on-surface text-right">{description}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="uppercase tracking-widest text-[10px] font-bold">Name</span>
              <span className="font-light text-on-surface text-right">{name}</span>
            </div>
            {email && (
              <div className="flex justify-between items-center">
                <span className="uppercase tracking-widest text-[10px] font-bold">Email</span>
                <span className="font-light text-on-surface text-right break-all">{email}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-end mb-8 relative z-10 pt-6 border-t border-outline-variant/30">
            <span className="uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-2">
              Total Amount
            </span>
            <span className="text-[3.5rem] font-light text-primary tracking-tighter leading-none">
              ${amount.toFixed(2)}
            </span>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[20px] text-primary">
                verified_user
              </span>
              <div>
                <p className="uppercase tracking-widest text-[10px] font-bold text-on-surface mb-1">
                  Stripe Secure
                </p>
                <p className="text-xs font-light text-on-surface-variant leading-relaxed mt-0.5">
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
