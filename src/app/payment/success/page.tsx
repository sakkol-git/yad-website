import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { stripe } from "@/lib/stripe";
import { getPaymentTargetAction } from "@/server/actions/payment.actions";

export const metadata: Metadata = {
  title: "Payment Confirmation | YAD Cambodia",
  description: "Your transaction details and verification status.",
};

interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id as string;
  const targetId = resolvedSearchParams.id as string;
  const targetType = resolvedSearchParams.type as "donation" | "booking";

  let amount = 0;
  let isValidSession = false;
  let isPending = false;
  let type: "donation" | "booking" = "donation";
  let donorOrGuestName = "";
  let refId = "";

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session && session.payment_status === "paid") {
        isValidSession = true;
        amount = session.amount_total ? session.amount_total / 100 : 0;
        type = session.metadata?.type as "donation" | "booking" || "donation";
        
        // Fetch target info using generic metadata
        const refIdFromMetadata = session.metadata?.referenceId;
        if (refIdFromMetadata) {
          const detailRes = await getPaymentTargetAction(refIdFromMetadata, type);
          if (detailRes.success && detailRes.data) {
            donorOrGuestName = detailRes.data.name;
          }
        }
      }
    } catch (err) {
      console.error("Error retrieving Stripe session inside generic success page:", err);
    }
  } else if (targetId && targetType) {
    type = targetType;
    const detailRes = await getPaymentTargetAction(targetId, type);
    if (detailRes.success && detailRes.data) {
      amount = detailRes.data.amount;
      donorOrGuestName = detailRes.data.name;
      refId = detailRes.data.referenceId || "";
      const status = detailRes.data.status;
      isValidSession = status === "Completed" || status === "Confirmed" || status === "Processing" || status === "Pending Confirmation";
      isPending = status === "Processing" || status === "Pending Confirmation";
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center p-gutter pt-32 pb-20 relative overflow-hidden min-h-[80vh]">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-tertiary-fixed/20 blur-[120px] pointer-events-none" />

      <div className="max-w-[600px] w-full bg-surface-container-lowest/80 backdrop-blur-md rounded-lg p-8 md:p-12 shadow-[0_8px_32px_rgba(65,104,55,0.05)] border border-surface-container/50 text-center relative z-10">
        
        {/* Icon */}
        <div className="mb-8 flex justify-center animate-pop-in">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
            isPending ? 'bg-tertiary-container shadow-[0_4px_20px_rgba(255,200,100,0.2)]' :
            isValidSession ? 'bg-secondary-container shadow-[0_4px_20px_rgba(191,236,174,0.4)]' : 'bg-surface-variant'
          }`}>
            <span
              className={`material-symbols-outlined text-5xl ${
                isPending ? 'text-tertiary text-amber-500' :
                isValidSession ? 'text-secondary' : 'text-on-surface-variant'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPending ? "pending" : isValidSession ? "check_circle" : "help"}
            </span>
          </div>
        </div>

        {/* Dynamic Headlines & Content based on Workflow Type */}
        {type === "donation" ? (
          <>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 animate-fade-up delay-100">
              {isPending 
                ? "Donation Pending Verification" 
                : isValidSession 
                  ? "Thank You for Your Impact!" 
                  : "Donation Received"}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 animate-fade-up delay-200">
              {isPending ? (
                <>
                  We have received your local payment details for a donation of{" "}
                  <strong className="text-secondary">${amount.toFixed(2)}</strong> from <strong className="text-on-surface">{donorOrGuestName}</strong>.
                  <br />
                  <span className="text-sm block mt-4 p-3 bg-surface-container rounded-md border border-surface-variant/30 text-on-surface-variant">
                    Transaction Ref: <strong className="font-mono text-primary">{refId}</strong>. Our finance team will verify the transfer shortly.
                  </span>
                </>
              ) : isValidSession ? (
                <>
                  Thank you, <strong className="text-on-surface">{donorOrGuestName}</strong>! Your contribution of{" "}
                  <strong className="text-secondary">${amount.toFixed(2)}</strong> will provide safe housing and education support for a student in Cambodia.
                </>
              ) : (
                "We have received your donation intent, but we couldn't automatically verify the payment status. If you completed the payment, you will receive an email confirmation shortly."
              )}
            </p>
          </>
        ) : (
          /* Booking success layout */
          <>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 animate-fade-up delay-100">
              {isPending 
                ? "Booking Payment Pending" 
                : isValidSession 
                  ? "Booking Payment Successful!" 
                  : "Booking Reservation Received"}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 animate-fade-up delay-200">
              {isPending ? (
                <>
                  We have received your bank transfer reference details for a booking amount of{" "}
                  <strong className="text-secondary">${amount.toFixed(2)}</strong> under the name <strong className="text-on-surface">{donorOrGuestName}</strong>.
                  <br />
                  <span className="text-sm block mt-4 p-3 bg-surface-container rounded-md border border-surface-variant/30 text-on-surface-variant">
                    Reference ID: <strong className="font-mono text-primary">{refId}</strong>. Your booking status will be updated to "Confirmed" once our team approves the transfer.
                  </span>
                </>
              ) : isValidSession ? (
                <>
                  Thank you, <strong className="text-on-surface">{donorOrGuestName}</strong>! Your homestay reservation payment of{" "}
                  <strong className="text-secondary">${amount.toFixed(2)}</strong> is complete. Your reservation is now officially confirmed.
                </>
              ) : (
                "We received your booking details, but we are awaiting payment confirmation. You will receive an email confirmation once the invoice is cleared."
              )}
            </p>
          </>
        )}

        {/* Dynamic Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up delay-300">
          <Button variant="outline" size="lg" className="border-primary/20 text-primary hover:bg-primary-fixed/10 rounded-full px-8" asChild>
            <Link href="/">Back to Homepage</Link>
          </Button>
          {type === "booking" && (
            <Button variant="primary" size="lg" className="rounded-full px-8" asChild>
              <Link href="/portal/bookings">Go to Bookings Dashboard</Link>
            </Button>
          )}
        </div>

        {/* Social Share for Donations only */}
        {type === "donation" && (
          <div className="pt-8 border-t border-surface-variant animate-fade-up delay-400">
            <p className="font-label-bold text-label-bold text-on-surface-variant mb-4 uppercase tracking-wider">
              Share Your Impact
            </p>
            <div className="flex justify-center gap-4">
              <Button
                aria-label="Share on Facebook"
                variant="ghost"
                size="icon"
                className="w-12 h-12 bg-surface-container rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed"
              >
                <span className="material-symbols-outlined">share</span>
              </Button>
              <Button
                aria-label="Share on Twitter"
                variant="ghost"
                size="icon"
                className="w-12 h-12 bg-surface-container rounded-full hover:bg-tertiary-fixed hover:text-on-tertiary-fixed"
              >
                <span className="material-symbols-outlined">chat_bubble</span>
              </Button>
              <Button
                aria-label="Copy Link"
                variant="ghost"
                size="icon"
                className="w-12 h-12 bg-surface-container rounded-full hover:bg-secondary-container hover:text-on-secondary-container"
              >
                <span className="material-symbols-outlined">link</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
