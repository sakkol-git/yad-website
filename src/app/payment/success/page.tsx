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
        type = (session.metadata?.type as "donation" | "booking") || "donation";

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
      isValidSession =
        status === "Completed" ||
        status === "Confirmed" ||
        status === "Processing" ||
        status === "Pending Confirmation";
      isPending = status === "Processing" || status === "Pending Confirmation";
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center p-gutter pt-32 pb-20 relative overflow-hidden min-h-[80vh]">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

      <div className="max-w-2xl w-full bg-surface rounded-md p-8 md:p-12 border border-outline-variant/30 text-center relative z-10">
        {/* Icon */}
        <div className="mb-8 flex justify-center animate-pop-in">
          <div
            className={`w-24 h-24 rounded-md border flex items-center justify-center ${
              isPending
                ? "border-primary bg-primary/5"
                : isValidSession
                  ? "border-primary bg-primary/5"
                  : "border-outline-variant bg-surface"
            }`}
          >
            <span
              className={`material-symbols-outlined text-5xl ${
                isPending
                  ? "text-primary"
                  : isValidSession
                    ? "text-primary"
                    : "text-on-surface-variant"
              }`}
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              {isPending ? "pending" : isValidSession ? "check_circle" : "help"}
            </span>
          </div>
        </div>

        {/* Dynamic Headlines & Content based on Workflow Type */}
        {type === "donation" ? (
          <>
            <h1 className="text-[3rem] font-light text-primary tracking-tighter leading-[1.0] mb-6 animate-fade-up delay-100">
              {isPending
                ? "Donation Pending Verification"
                : isValidSession
                  ? "Thank You for Your Impact!"
                  : "Donation Received"}
            </h1>
            <p className="text-base text-on-surface-variant font-light mb-10 animate-fade-up delay-200 leading-relaxed">
              {isPending ? (
                <>
                  We have received your local payment details for a donation of{" "}
                  <strong className="text-primary font-bold">${amount.toFixed(2)}</strong> from{" "}
                  <strong className="text-on-surface font-bold">{donorOrGuestName}</strong>.
                  <br />
                  <span className="text-sm block mt-4 p-4 bg-surface rounded-md border border-outline-variant/30 text-on-surface-variant">
                    Transaction Ref:{" "}
                    <strong className="font-mono text-primary font-bold">{refId}</strong>. Our
                    finance team will verify the transfer shortly.
                  </span>
                </>
              ) : isValidSession ? (
                <>
                  Thank you,{" "}
                  <strong className="text-on-surface font-bold">{donorOrGuestName}</strong>! Your
                  contribution of{" "}
                  <strong className="text-primary font-bold">${amount.toFixed(2)}</strong> will
                  provide safe housing and education support for a student in Cambodia.
                </>
              ) : (
                "We have received your donation intent, but we couldn't automatically verify the payment status. If you completed the payment, you will receive an email confirmation shortly."
              )}
            </p>
          </>
        ) : (
          /* Booking success layout */
          <>
            <h1 className="text-[3rem] font-light text-primary tracking-tighter leading-[1.0] mb-6 animate-fade-up delay-100">
              {isPending
                ? "Booking Payment Pending"
                : isValidSession
                  ? "Booking Payment Successful!"
                  : "Booking Reservation Received"}
            </h1>
            <p className="text-base text-on-surface-variant font-light mb-10 animate-fade-up delay-200 leading-relaxed">
              {isPending ? (
                <>
                  We have received your bank transfer reference details for a booking amount of{" "}
                  <strong className="text-primary font-bold">${amount.toFixed(2)}</strong> under the
                  name <strong className="text-on-surface font-bold">{donorOrGuestName}</strong>.
                  <br />
                  <span className="text-sm block mt-4 p-4 bg-surface rounded-md border border-outline-variant/30 text-on-surface-variant">
                    Reference ID:{" "}
                    <strong className="font-mono text-primary font-bold">{refId}</strong>. Your
                    booking status will be updated to "Confirmed" once our team approves the
                    transfer.
                  </span>
                </>
              ) : isValidSession ? (
                <>
                  Thank you,{" "}
                  <strong className="text-on-surface font-bold">{donorOrGuestName}</strong>! Your
                  homestay reservation payment of{" "}
                  <strong className="text-primary font-bold">${amount.toFixed(2)}</strong> is
                  complete. Your reservation is now officially confirmed.
                </>
              ) : (
                "We received your booking details, but we are awaiting payment confirmation. You will receive an email confirmation once the invoice is cleared."
              )}
            </p>
          </>
        )}

        {/* Dynamic Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up delay-300">
          <Button
            variant="outline"
            size="lg"
            className="rounded-md border-primary text-primary hover:bg-primary hover:text-white kicker-label h-12 transition-colors px-8"
            asChild
          >
            <Link href="/">Back to Homepage</Link>
          </Button>
          {type === "booking" && (
            <Button
              variant="default"
              size="lg"
              className="rounded-md bg-primary text-white hover:bg-primary/90 h-12 kicker-label transition-colors duration-150 px-8"
              asChild
            >
              <Link href="/portal/bookings">Go to Bookings Dashboard</Link>
            </Button>
          )}
        </div>

        {/* Social Share for Donations only */}
        {type === "donation" && (
          <div className="pt-8 border-t border-outline-variant/30 animate-fade-up delay-400">
            <p className="kicker-label text-on-surface-variant mb-4">
              Share Your Impact
            </p>
            <div className="flex justify-center gap-4">
              <Button
                aria-label="Share on Facebook"
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-md border border-outline-variant/30 bg-surface text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </Button>
              <Button
                aria-label="Share on Twitter"
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-md border border-outline-variant/30 bg-surface text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
              </Button>
              <Button
                aria-label="Copy Link"
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-md border border-outline-variant/30 bg-surface text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">link</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
