"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressIndicator } from "@/features/Entities/donations/components/ProgressIndicator";
import { Button } from "@/shared/components/ui/Button";
import { GenericPaymentDetails } from "@/server/actions/payment.actions";

interface PaymentSelectorClientProps {
  paymentDetails: GenericPaymentDetails;
}

export function PaymentSelectorClient({ paymentDetails }: PaymentSelectorClientProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"card" | "local">("card");

  const { id, name, email, amount, description, type } = paymentDetails;

  const handleProceedStripe = () => {
    router.push(`/payment/stripe?id=${id}&type=${type}`);
  };

  const handleProceedLocal = () => {
    router.push(`/payment/local?id=${id}&type=${type}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-gutter">
      {/* Main Payment Section */}
      <div className="w-full lg:w-2/3">
        <ProgressIndicator currentStep={2} />

        <div className="bg-surface-container-lowest rounded-lg ambient-shadow p-6 md:p-10 relative overflow-hidden">
          <h2 className="font-headline-md text-headline-md text-primary mb-6">
            Choose Payment Method
          </h2>

          {/* Payment Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Card Option (International) */}
            <button
              onClick={() => setSelectedMethod("card")}
              className={`flex flex-col items-start text-left p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedMethod === "card"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-surface-variant/40 bg-surface-container-low hover:border-surface-variant hover:bg-surface-container"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`material-symbols-outlined text-3xl ${selectedMethod === "card" ? "text-primary" : "text-on-surface-variant"}`}>
                  credit_card
                </span>
                <span className="font-label-bold text-label-bold text-lg text-on-surface">
                  International Card
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4 flex-grow">
                Pay securely using Credit/Debit card (Visa, Mastercard, etc.), Google Pay, or Apple Pay.
              </p>
              <div className="flex gap-2 opacity-80 mt-auto">
                <span className="text-xs font-semibold px-2 py-1 bg-surface-variant rounded">VISA</span>
                <span className="text-xs font-semibold px-2 py-1 bg-surface-variant rounded">MC</span>
                <span className="text-xs font-semibold px-2 py-1 bg-surface-variant rounded">G-Pay</span>
                <span className="text-xs font-semibold px-2 py-1 bg-surface-variant rounded">Apple</span>
              </div>
            </button>

            {/* Local Bank Transfer Option */}
            <button
              onClick={() => setSelectedMethod("local")}
              className={`flex flex-col items-start text-left p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedMethod === "local"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-surface-variant/40 bg-surface-container-low hover:border-surface-variant hover:bg-surface-container"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`material-symbols-outlined text-3xl ${selectedMethod === "local" ? "text-primary" : "text-on-surface-variant"}`}>
                  qr_code_scanner
                </span>
                <span className="font-label-bold text-label-bold text-lg text-on-surface">
                  Bakong KHQR & Local Bank
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4 flex-grow">
                Pay via Cambodian banks (ABA, Wing, ACLEDA, etc.) by scanning the KHQR code or performing a bank transfer.
              </p>
              <div className="flex gap-2 opacity-80 mt-auto">
                <span className="text-xs font-semibold px-2 py-1 bg-surface-variant/60 rounded text-primary">KHQR</span>
                <span className="text-xs font-semibold px-2 py-1 bg-surface-variant/60 rounded text-secondary">ABA</span>
                <span className="text-xs font-semibold px-2 py-1 bg-surface-variant/60 rounded">Bakong</span>
              </div>
            </button>
          </div>

          {/* Action description panels */}
          {selectedMethod === "card" ? (
            <div className="space-y-6 p-6 bg-surface-container rounded-2xl border border-surface-variant/30 text-center animate-fade-in">
              <span className="material-symbols-outlined text-5xl text-secondary mb-2">
                credit_card
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Proceed to Secure Card Payment
              </h3>
              <p className="text-on-surface-variant max-w-md mx-auto text-sm">
                You will be redirected to our dedicated card checkout page where you can pay securely using Visa, Mastercard, Google Pay, or Apple Pay.
              </p>
              <div className="pt-4">
                <Button
                  onClick={handleProceedStripe}
                  variant="primary"
                  size="lg"
                  className="rounded-full gap-2 px-8 hover:scale-105 transition-transform"
                >
                  Continue to Card Payment
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 p-6 bg-surface-container rounded-2xl border border-surface-variant/30 text-center animate-fade-in">
              <span className="material-symbols-outlined text-5xl text-secondary mb-2">
                account_balance
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Proceed to Cambodian Local Payment
              </h3>
              <p className="text-on-surface-variant max-w-md mx-auto text-sm">
                You will be presented with our official Bakong KHQR code and ABA bank account details, and be able to input your bank transfer reference ID to verify your payment.
              </p>
              <div className="pt-4">
                <Button
                  onClick={handleProceedLocal}
                  variant="primary"
                  size="lg"
                  className="rounded-full gap-2 px-8 hover:scale-105 transition-transform"
                >
                  Continue to Local Payment
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side summary column */}
      <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
        <div className="sticky top-24 bg-surface-container-low rounded-lg p-8 border border-surface-variant relative overflow-hidden">
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
                  Secure & Trusted
                </p>
                <p className="font-body-md text-body-md text-xs text-on-surface-variant mt-0.5">
                  We use state-of-the-art encryption to keep your transaction details fully secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
