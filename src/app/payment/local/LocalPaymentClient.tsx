"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressIndicator } from "@/features/Entities/donations/components/ProgressIndicator";
import { submitGenericLocalPaymentAction } from "@/server/actions/payment.actions";
import { Button } from "@/shared/components/ui/Button";
import { GenericPaymentDetails } from "@/server/actions/payment.actions";
import { KHQR } from "./components/KHQR";
import { BankAccountDetails } from "./components/BankAccountDetails";
import { PaymentSummary } from "../components/PaymentSummary";

interface LocalPaymentClientProps {
  paymentDetails: GenericPaymentDetails;
}

export function LocalPaymentClient({ paymentDetails }: LocalPaymentClientProps) {
  const router = useRouter();
  const [referenceId, setReferenceId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"khqr" | "bank_transfer">("khqr");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id, name, email, amount, description, type } = paymentDetails;
  const memoPrefix = type === "donation" ? "YAD" : "BKG";
  const memoCode = `${memoPrefix}-${id.substring(0, 8).toUpperCase()}`;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceId.trim()) {
      setError("Please enter your transaction ID or reference number.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await submitGenericLocalPaymentAction(
        id,
        type,
        referenceId.trim(),
        paymentMethod,
      );
      if (res.success) {
        router.push(`/payment/success?id=${id}&type=${type}`);
      } else {
        throw new Error(res.error || "Failed to submit verification");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check details and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-gutter">
      {/* Main Payment Section */}
      <div className="w-full lg:w-2/3">
        <ProgressIndicator currentStep={2} />

        <div className="bg-surface rounded-md p-6 md:p-12 border border-outline-variant/30 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-8">
            <h2 className="text-2xl font-light text-on-surface tracking-tight">
              Cambodian Local Payment
            </h2>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to options
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 text-error rounded-md border border-error/30 kicker-label">
              {error}
            </div>
          )}

          {/* Payment Method Sub-selection Tabs */}
          <div className="flex border-b border-outline-variant/30 mb-8 gap-6">
            <button
              onClick={() => setPaymentMethod("khqr")}
              className={`pb-3 kicker-label border-b-2 transition-colors duration-150 cursor-pointer ${
                paymentMethod === "khqr"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Scan KHQR Code
            </button>
            <button
              onClick={() => setPaymentMethod("bank_transfer")}
              className={`pb-3 kicker-label border-b-2 transition-colors duration-150 cursor-pointer ${
                paymentMethod === "bank_transfer"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Bank Transfer Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left section: QR or Bank Account Info */}
            <div className="flex flex-col items-center">
              {paymentMethod === "khqr" ? (
                <KHQR amount={amount} />
              ) : (
                <BankAccountDetails copiedField={copiedField} copyToClipboard={copyToClipboard} />
              )}
            </div>

            <div className="w-full">
              <h3 className="text-xl font-light text-on-surface tracking-tight mb-4">
                Verify Your Payment
              </h3>
              <p className="text-sm font-light text-on-surface-variant mb-8 leading-relaxed">
                Please perform the transfer first. To complete your verification, copy the
                transaction reference details and paste your bank transaction ID below:
              </p>

              <div className="space-y-4 mb-8">
                {/* Reference Code to include in transfer */}
                <div className="p-4 bg-primary text-white border border-outline-variant/30 rounded-md flex justify-between items-center">
                  <div>
                    <span className="kicker-label block opacity-80 mb-1">
                      Required Transfer Description / Memo
                    </span>
                    <span className="text-lg font-mono font-light tracking-widest">{memoCode}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(memoCode, "memo")}
                    className="bg-white text-primary kicker-label px-4 py-2 rounded-md hover:bg-white/90 transition-colors duration-150 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedField === "memo" ? "check" : "content_copy"}
                    </span>
                    {copiedField === "memo" ? "Copied" : "Copy Description"}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block kicker-label text-on-surface mb-2">
                    Bank Transaction ID / Reference Number <span className="text-primary">*</span>
                  </label>
                  <input
                    className="w-full bg-transparent border border-outline-variant/50 rounded-md px-4 py-3 text-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-150"
                    placeholder="e.g. 123456 or FT26152..."
                    required
                    type="text"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                  />
                  <span className="text-xs font-light text-on-surface-variant mt-2 block tracking-wide">
                    Copy this code from your bank app receipt screen after completing the transfer.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full rounded-md bg-primary text-white hover:bg-primary/90 h-12 kicker-label transition-colors duration-150 flex items-center gap-2 justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting for Verification...
                    </>
                  ) : (
                    <>
                      Confirm & Submit Payment
                      <span className="material-symbols-outlined text-base">verified</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Side summary column */}
      <PaymentSummary paymentDetails={paymentDetails}>
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-xl text-primary">info</span>
          <div>
            <p className="kicker-label text-on-surface mb-1">
              What Happens Next?
            </p>
            <p className="text-xs font-light text-on-surface-variant leading-relaxed mt-0.5">
              After submitting your Transaction ID, our financial team will verify it. This process
              typically takes under 2 hours. You will receive an official confirmation email once
              confirmed.
            </p>
          </div>
        </div>
      </PaymentSummary>
    </div>
  );
}
