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
            <div className="mb-6 p-4 bg-error/10 text-error rounded-md border border-error/30 text-[10px] uppercase tracking-widest font-bold">
              {error}
            </div>
          )}

          {/* Payment Method Sub-selection Tabs */}
          <div className="flex border-b border-outline-variant/30 mb-8 gap-6">
            <button
              onClick={() => setPaymentMethod("khqr")}
              className={`pb-3 font-bold text-[10px] uppercase tracking-widest border-b-2 transition-colors duration-150 cursor-pointer ${
                paymentMethod === "khqr"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Scan KHQR Code
            </button>
            <button
              onClick={() => setPaymentMethod("bank_transfer")}
              className={`pb-3 font-bold text-[10px] uppercase tracking-widest border-b-2 transition-colors duration-150 cursor-pointer ${
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
                <div className="w-64 bg-red-600 rounded-md p-4 shadow-xl border-4 border-red-700 flex flex-col items-center select-none text-white relative">
                  {/* bg-red-600/border-red-700: Intentional KHQR national payment standard brand colors — not a design-token violation */}
                  {/* KHQR Header Banner */}
                  <div className="w-full flex items-center justify-between mb-3 px-1">
                    <span className="text-[10px] font-bold tracking-widest bg-on-primary text-primary px-1.5 py-0.5 rounded-sm">
                      KHQR
                    </span>
                    <span className="text-[9px] font-semibold opacity-95 text-right">
                      Cambodian Unified QR
                    </span>
                  </div>

                  {/* QR Image Area */}
                  <div className="w-full bg-white rounded-md p-3 flex flex-col items-center shadow-inner relative">
                    <svg viewBox="0 0 100 100" className="w-44 h-44 text-on-surface">
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
                      <path
                        d="M 35 10 h 5 v 5 h -5 z M 45 5 h 5 v 5 h -5 z M 55 10 h 10 v 5 h -10 z M 40 20 h 10 v 10 h -10 z M 5 35 h 10 v 5 h -10 z M 20 40 h 5 v 5 h -5 z M 30 35 h 5 v 15 h -5 z M 40 45 h 15 v 5 h -15 z M 65 35 h 10 v 5 h -10 z M 85 35 h 10 v 5 h -10 z M 55 45 h 5 v 15 h -5 z M 10 50 h 10 v 5 h -10 z M 25 55 h 5 v 10 h -5 z M 35 60 h 15 v 5 h -15 z M 65 55 h 10 v 10 h -10 z M 80 50 h 15 v 5 h -15 z M 85 65 h 10 v 10 h -10 z M 45 75 h 5 v 10 h -5 z M 55 75 h 10 v 5 h -10 z M 35 85 h 15 v 5 h -15 z"
                        fill="currentColor"
                      />

                      {/* Bakong stylization center logo */}
                      <rect x="42" y="42" width="16" height="16" rx="3" fill="#E11D48" />
                      <circle cx="50" cy="50" r="5" fill="white" />
                    </svg>

                    {/* Amount Banner */}
                    <div className="mt-3 w-full bg-surface-container-low border border-outline-variant/30 py-1.5 rounded-md text-center">
                      <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                        Amount to Scan
                      </span>
                      <span className="text-[17px] font-bold text-on-surface">
                        USD {amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* KHQR Footer Label */}
                  <div className="mt-3 text-center">
                    <p className="text-xs font-bold text-white tracking-wide">
                      YAD CAMBODIA ASSOCIATION
                    </p>
                    <p className="text-[9px] opacity-80 mt-0.5">Scan with any banking app</p>
                  </div>
                </div>
              ) : (
                /* Bank Account Details Card */
                <div className="w-full bg-transparent border border-outline-variant/50 rounded-md p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary">
                      account_balance
                    </span>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-on-surface mb-1">
                        ABA Bank Transfer
                      </h4>
                      <p className="text-xs font-light text-on-surface-variant">
                        Perform a direct local bank transfer
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Bank Name */}
                    <div className="p-4 bg-transparent rounded-md border border-outline-variant/30 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-on-surface-variant block uppercase tracking-widest font-bold mb-1">
                          Bank Name
                        </span>
                        <span className="text-sm font-light text-on-surface">ABA Bank</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard("ABA Bank", "bank")}
                        className="text-primary hover:text-primary/80 p-1 flex items-center transition-colors cursor-pointer"
                        title="Copy Bank Name"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {copiedField === "bank" ? "check" : "content_copy"}
                        </span>
                      </button>
                    </div>

                    {/* Account Name */}
                    <div className="p-4 bg-transparent rounded-md border border-outline-variant/30 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-on-surface-variant block uppercase tracking-widest font-bold mb-1">
                          Account Name
                        </span>
                        <span className="text-sm font-light text-on-surface">
                          YAD CAMBODIA ASSOCIATION
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard("YAD CAMBODIA ASSOCIATION", "name")}
                        className="text-primary hover:text-primary/80 p-1 flex items-center transition-colors cursor-pointer"
                        title="Copy Account Name"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {copiedField === "name" ? "check" : "content_copy"}
                        </span>
                      </button>
                    </div>

                    {/* Account Number */}
                    <div className="p-4 bg-transparent rounded-md border border-outline-variant/30 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-on-surface-variant block uppercase tracking-widest font-bold mb-1">
                          Account Number
                        </span>
                        <span className="text-lg font-mono font-light text-on-surface tracking-widest">
                          000 123 456
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard("000123456", "number")}
                        className="text-primary hover:text-primary/80 p-1 flex items-center transition-colors cursor-pointer"
                        title="Copy Account Number"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {copiedField === "number" ? "check" : "content_copy"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
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
                    <span className="text-[10px] font-bold uppercase tracking-widest block opacity-80 mb-1">
                      Required Transfer Description / Memo
                    </span>
                    <span className="text-lg font-mono font-light tracking-widest">{memoCode}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(memoCode, "memo")}
                    className="bg-white text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-md hover:bg-white/90 transition-colors duration-150 flex items-center gap-2 cursor-pointer"
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
                  <span className="text-[10px] font-light text-on-surface-variant mt-2 block tracking-wide">
                    Copy this code from your bank app receipt screen after completing the transfer.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full rounded-md bg-primary text-white hover:bg-primary/90 h-12 uppercase tracking-widest text-[10px] font-bold transition-colors duration-150 flex items-center gap-2 justify-center"
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
              <span className="material-symbols-outlined text-xl text-primary">info</span>
              <div>
                <p className="uppercase tracking-widest text-[10px] font-bold text-on-surface mb-1">
                  What Happens Next?
                </p>
                <p className="text-xs font-light text-on-surface-variant leading-relaxed mt-0.5">
                  After submitting your Transaction ID, our financial team will verify it. This
                  process typically takes under 2 hours. You will receive an official confirmation
                  email once confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
