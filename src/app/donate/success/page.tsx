import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your donation to YAD has been processed successfully.",
};

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id as string;
  let amount = 50; // default for fallback
  let isValidSession = false;

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session && session.payment_status === "paid") {
        isValidSession = true;
        if (session.amount_total) {
          amount = session.amount_total / 100;
        }
      }
    } catch (err) {
      console.error("Error retrieving Stripe session:", err);
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center p-gutter pt-32 pb-20 relative overflow-hidden min-h-[70vh]">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-tertiary-fixed/20 blur-[120px] pointer-events-none" />

      <div className="max-w-[600px] w-full bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-[0_8px_32px_rgba(65,104,55,0.05)] border border-surface-container/50 text-center relative z-10">
        {/* Icon */}
        <div className="mb-8 flex justify-center animate-pop-in">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isValidSession ? 'bg-secondary-container shadow-[0_4px_20px_rgba(191,236,174,0.4)]' : 'bg-surface-variant'}`}>
            <span
              className={`material-symbols-outlined text-5xl ${isValidSession ? 'text-secondary' : 'text-on-surface-variant'}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isValidSession ? "check_circle" : "help"}
            </span>
          </div>
        </div>

        {/* Headlines */}
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 animate-fade-up delay-100">
          {isValidSession ? "Thank You for Your Impact!" : "Donation Received"}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 animate-fade-up delay-200">
          {isValidSession ? (
            <>
              Your contribution of{" "}
              <strong className="text-secondary">${amount.toFixed(2)}</strong> will provide safe housing and education support for a student in Cambodia.
            </>
          ) : (
            "We have received your donation intent, but we couldn't automatically verify the payment status. If you completed the payment, you will receive an email confirmation shortly."
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up delay-300">
          <Button variant="outline" size="lg" className="border-primary/20 text-primary hover:bg-primary-fixed/10 rounded-full px-8" asChild>
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>

        {/* Social Share */}
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
      </div>
    </main>
  );
}

