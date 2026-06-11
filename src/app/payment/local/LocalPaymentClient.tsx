"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressIndicator } from "@/features/Entities/donations/components/ProgressIndicator";
import { submitGenericLocalPaymentAction } from "@/server/actions/payment.actions";
import { Button } from "@/shared/components/ui/Button";
import { GenericPaymentDetails } from "@/server/actions/payment.actions";

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
      const res = await submitGenericLocalPaymentAction(id, type, referenceId.trim(), paymentMethod);
      if (res.success) {
        router.push(`/payment/success?id=${id}&type=${type}`);
      } else {
        throw new Error(res.error || "Failed to submit verification");
      }
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

        <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-6 md:p-10 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-surface-variant/30 pb-4 mb-6">
            <h2 className="font-headline-md text-headline-md text-primary">
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
            <div className="mb-6 p-4 bg-error-container text-error rounded-xl border border-error/20 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Payment Method Sub-selection Tabs */}
          <div className="flex border-b border-surface-variant/30 mb-8 gap-4">
            <button
              onClick={() => setPaymentMethod("khqr")}
              className={`py-3 px-4 font-label-bold text-label-bold text-sm border-b-2 transition-all cursor-pointer ${
                paymentMethod === "khqr"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Scan KHQR Code
            </button>
            <button
              onClick={() => setPaymentMethod("bank_transfer")}
              className={`py-3 px-4 font-label-bold text-label-bold text-sm border-b-2 transition-all cursor-pointer ${
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
                /* Beautiful Mock KHQR Frame */
                <div className="w-64 bg-red-600 rounded-2xl p-4 shadow-xl border-4 border-red-700 flex flex-col items-center select-none text-white relative">
                  {/* KHQR Header Banner */}
                  <div className="w-full flex items-center justify-between mb-3 px-1">
                    <span className="text-[10px] font-bold tracking-widest bg-white text-red-600 px-1.5 py-0.5 rounded-sm">
                      KHQR
                    </span>
                    <span className="text-[9px] font-semibold opacity-95 text-right">
                      Cambodian Unified QR
                    </span>
                  </div>

                  {/* QR Image Area */}
                  <div className="w-full bg-white rounded-xl p-3 flex flex-col items-center shadow-inner relative">
                    <svg viewBox="0 0 100 100" className="w-44 h-44 text-slate-800">
                      {/* Stylized QR Code Mock */}
                      <rect width="100" height="100" fill="white" />
                      {/* Corners */}
                      <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                      <rect x="8" y="8" width="19" height="19" fill="white" />
                      <rect x="11" y="11" width="13" height="13" fill="currentColor" />

                      <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                      <rect x="73" y="8" width="19" height="19" fill="white" />
                      <rect x="76" y="11" width="13" height="13" fill="currentColor" />

                      <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                      <rect x="8" y="73" width="19" height="19" fill="white" />
                      <rect x="11" y="76" width="13" height="13" fill="currentColor" />

                      {/* Small Bottom Right Position Finder */}
                      <rect x="75" y="75" width="10" height="10" fill="currentColor" />

                      {/* Random Mock QR Pixels */}
                      <path d="M 35 10 h 5 v 5 h -5 z M 45 5 h 5 v 5 h -5 z M 55 10 h 10 v 5 h -10 z M 40 20 h 10 v 10 h -10 z M 5 35 h 10 v 5 h -10 z M 20 40 h 5 v 5 h -5 z M 30 35 h 5 v 15 h -5 z M 40 45 h 15 v 5 h -15 z M 65 35 h 10 v 5 h -10 z M 85 35 h 10 v 5 h -10 z M 55 45 h 5 v 15 h -5 z M 10 50 h 10 v 5 h -10 z M 25 55 h 5 v 10 h -5 z M 35 60 h 15 v 5 h -15 z M 65 55 h 10 v 10 h -10 z M 80 50 h 15 v 5 h -15 z M 85 65 h 10 v 10 h -10 z M 45 75 h 5 v 10 h -5 z M 55 75 h 10 v 5 h -10 z M 35 85 h 15 v 5 h -15 z" fill="currentColor" />
                      
                      {/* Bakong stylization center logo */}
                      <rect x="42" y="42" width="16" height="16" rx="3" fill="#E11D48" />
                      <circle cx="50" cy="50" r="5" fill="white" />
                    </svg>
                    
                    {/* Amount Banner */}
                    <div className="mt-3 w-full bg-slate-50 border border-slate-200 py-1.5 rounded-lg text-center">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Amount to Scan
                      </span>
                      <span className="text-[17px] font-bold text-slate-800">
                        USD {amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* KHQR Footer Label */}
                  <div className="mt-3 text-center">
                    <p className="text-[12px] font-bold text-white tracking-wide">
                      YAD CAMBODIA ASSOCIATION
                    </p>
                    <p className="text-[9px] opacity-80 mt-0.5">
                      Scan with any banking app
                    </p>
                  </div>
                </div>
              ) : (
                /* Bank Account Details Card */
                <div className="w-full bg-surface-container-low border border-surface-variant/40 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary">account_balance</span>
                    <div>
                      <h4 className="font-bold text-[16px] text-on-surface">ABA Bank Transfer</h4>
                      <p className="text-xs text-on-surface-variant">Perform a direct local bank transfer</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Bank Name */}
                    <div className="p-3 bg-surface rounded-lg border border-surface-variant/20 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Bank Name</span>
                        <span className="text-sm font-bold text-on-surface">ABA Bank</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard("ABA Bank", "bank")}
                        className="text-primary hover:text-secondary p-1 flex items-center transition-colors cursor-pointer"
                        title="Copy Bank Name"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {copiedField === "bank" ? "check_circle" : "content_copy"}
                        </span>
                      </button>
                    </div>

                    {/* Account Name */}
                    <div className="p-3 bg-surface rounded-lg border border-surface-variant/20 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Account Name</span>
                        <span className="text-sm font-bold text-on-surface">YAD CAMBODIA ASSOCIATION</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard("YAD CAMBODIA ASSOCIATION", "name")}
                        className="text-primary hover:text-secondary p-1 flex items-center transition-colors cursor-pointer"
                        title="Copy Account Name"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {copiedField === "name" ? "check_circle" : "content_copy"}
                        </span>
                      </button>
                    </div>

                    {/* Account Number */}
                    <div className="p-3 bg-surface rounded-lg border border-surface-variant/20 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Account Number</span>
                        <span className="text-sm font-mono font-bold text-on-surface">000 123 456</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard("000123456", "number")}
                        className="text-primary hover:text-secondary p-1 flex items-center transition-colors cursor-pointer"
                        title="Copy Account Number"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {copiedField === "number" ? "check_circle" : "content_copy"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right section: Submission Verification Form */}
            <div className="w-full">
              <h3 className="font-title-md text-title-md text-on-surface mb-3">
                Verify Your Payment
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Please perform the transfer first. To complete your verification, copy the transaction reference details and paste your bank transaction ID below:
              </p>

              <div className="space-y-4 mb-6">
                {/* Reference Code to include in transfer */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-xs text-primary font-bold uppercase tracking-wider block">Required Transfer Description / Memo</span>
                    <span className="text-lg font-mono font-bold text-primary">{memoCode}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(memoCode, "memo")}
                    className="bg-primary text-on-primary text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-primary/95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedField === "memo" ? "check" : "content_copy"}
                    </span>
                    {copiedField === "memo" ? "Copied" : "Copy Description"}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface mb-2 text-sm">
                    Bank Transaction ID / Reference Number
                  </label>
                  <input
                    className="stripe-input w-full"
                    placeholder="e.g. 123456 or FT26152..."
                    required
                    type="text"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                  />
                  <span className="text-xs text-on-surface-variant mt-1.5 block">
                    Copy this code from your bank app receipt screen after completing the transfer.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full rounded-full gap-2 hover:scale-[1.02] transition-transform"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting for Verification...
                    </>
                  ) : (
                    <>
                      Confirm & Submit Payment
                      <span className="material-symbols-outlined">verified</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
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
                info
              </span>
              <div>
                <p className="font-label-bold text-label-bold text-on-surface text-sm">
                  What Happens Next?
                </p>
                <p className="font-body-md text-body-md text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  After submitting your Transaction ID, our financial team will verify it. This process typically takes under 2 hours. You will receive an official confirmation email once confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
