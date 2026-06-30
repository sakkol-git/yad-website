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

        <div className="bg-surface rounded-md p-6 md:p-12 border border-outline-variant/30 relative overflow-hidden">
          <h2 className="text-2xl font-light text-on-surface tracking-tight mb-8 border-b border-outline-variant/30 pb-4">
            Choose Payment Method
          </h2>

          {/* Payment Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Card Option (International) */}
            <button
              onClick={() => setSelectedMethod("card")}
              className={`flex flex-col items-start text-left p-6 rounded-md border transition-colors duration-150 cursor-pointer ${
                selectedMethod === "card"
                  ? "border-primary bg-primary text-white"
                  : "border-outline-variant/50 bg-transparent hover:border-primary hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`material-symbols-outlined text-2xl ${selectedMethod === "card" ? "text-white" : "text-primary"}`}
                >
                  credit_card
                </span>
                <span
                  className={`uppercase tracking-widest text-[10px] font-bold ${selectedMethod === "card" ? "text-white" : "text-on-surface"}`}
                >
                  International Card
                </span>
              </div>
              <p
                className={`text-sm font-light mb-4 flex-grow ${selectedMethod === "card" ? "text-white/80" : "text-on-surface-variant"}`}
              >
                Pay securely using Credit/Debit card (Visa, Mastercard, etc.), Google Pay, or Apple
                Pay.
              </p>
              <div className="flex gap-2 mt-auto">
                <span
                  className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-md border ${selectedMethod === "card" ? "border-white/30 text-white" : "border-outline-variant/50 text-on-surface-variant"}`}
                >
                  VISA
                </span>
                <span
                  className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-md border ${selectedMethod === "card" ? "border-white/30 text-white" : "border-outline-variant/50 text-on-surface-variant"}`}
                >
                  MC
                </span>
                <span
                  className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-md border ${selectedMethod === "card" ? "border-white/30 text-white" : "border-outline-variant/50 text-on-surface-variant"}`}
                >
                  G-Pay
                </span>
                <span
                  className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-md border ${selectedMethod === "card" ? "border-white/30 text-white" : "border-outline-variant/50 text-on-surface-variant"}`}
                >
                  Apple
                </span>
              </div>
            </button>

            {/* Local Bank Transfer Option */}
            <button
              onClick={() => setSelectedMethod("local")}
              className={`flex flex-col items-start text-left p-6 rounded-md border transition-colors duration-150 cursor-pointer ${
                selectedMethod === "local"
                  ? "border-primary bg-primary text-white"
                  : "border-outline-variant/50 bg-transparent hover:border-primary hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`material-symbols-outlined text-2xl ${selectedMethod === "local" ? "text-white" : "text-primary"}`}
                >
                  qr_code_scanner
                </span>
                <span
                  className={`uppercase tracking-widest text-[10px] font-bold ${selectedMethod === "local" ? "text-white" : "text-on-surface"}`}
                >
                  Bakong KHQR & Local Bank
                </span>
              </div>
              <p
                className={`text-sm font-light mb-4 flex-grow ${selectedMethod === "local" ? "text-white/80" : "text-on-surface-variant"}`}
              >
                Pay via Cambodian banks (ABA, Wing, ACLEDA, etc.) by scanning the KHQR code or
                performing a bank transfer.
              </p>
              <div className="flex gap-2 mt-auto">
                <span
                  className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-md border ${selectedMethod === "local" ? "border-white/30 text-white" : "border-outline-variant/50 text-on-surface-variant"}`}
                >
                  KHQR
                </span>
                <span
                  className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-md border ${selectedMethod === "local" ? "border-white/30 text-white" : "border-outline-variant/50 text-on-surface-variant"}`}
                >
                  ABA
                </span>
                <span
                  className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-md border ${selectedMethod === "local" ? "border-white/30 text-white" : "border-outline-variant/50 text-on-surface-variant"}`}
                >
                  Bakong
                </span>
              </div>
            </button>
          </div>

          {/* Action description panels */}
          {selectedMethod === "card" ? (
            <div className="space-y-6 p-8 bg-surface border border-outline-variant/30 rounded-md text-center animate-fade-in mt-8">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">
                credit_card
              </span>
              <h3 className="text-xl font-light text-on-surface tracking-tight">
                Proceed to Secure Card Payment
              </h3>
              <p className="text-sm font-light text-on-surface-variant max-w-md mx-auto leading-relaxed">
                You will be redirected to our dedicated card checkout page where you can pay
                securely using Visa, Mastercard, Google Pay, or Apple Pay.
              </p>
              <div className="pt-4">
                <Button
                  onClick={handleProceedStripe}
                  variant="default"
                  size="lg"
                  className="rounded-md bg-primary text-white hover:bg-primary/90 h-12 uppercase tracking-widest text-[10px] font-bold px-8 flex items-center gap-2 transition-colors duration-150 mx-auto"
                >
                  Continue to Card Payment
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 p-8 bg-surface border border-outline-variant/30 rounded-md text-center animate-fade-in mt-8">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">
                account_balance
              </span>
              <h3 className="text-xl font-light text-on-surface tracking-tight">
                Proceed to Cambodian Local Payment
              </h3>
              <p className="text-sm font-light text-on-surface-variant max-w-md mx-auto leading-relaxed">
                You will be presented with our official Bakong KHQR code and ABA bank account
                details, and be able to input your bank transfer reference ID to verify your
                payment.
              </p>
              <div className="pt-4">
                <Button
                  onClick={handleProceedLocal}
                  variant="default"
                  size="lg"
                  className="rounded-md bg-primary text-white hover:bg-primary/90 h-12 uppercase tracking-widest text-[10px] font-bold px-8 flex items-center gap-2 transition-colors duration-150 mx-auto"
                >
                  Continue to Local Payment
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side summary column */}
      <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
        <div className="sticky top-24 bg-surface rounded-md p-8 border border-outline-variant/30 relative overflow-hidden">
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
              <span className="material-symbols-outlined text-xl text-primary">verified_user</span>
              <div>
                <p className="uppercase tracking-widest text-[10px] font-bold text-on-surface mb-1">
                  Secure & Trusted
                </p>
                <p className="text-xs font-light text-on-surface-variant leading-relaxed">
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
