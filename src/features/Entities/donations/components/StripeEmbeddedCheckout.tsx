"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { createStripeEmbeddedSession } from "@/server/actions/stripe.actions";

// Initialize loadStripe once outside of render cycle
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface StripeEmbeddedCheckoutProps {
  id: string;
  type: "donation" | "booking";
  amount: number;
  email: string;
}

export function StripeEmbeddedCheckout({ id, type, amount, email }: StripeEmbeddedCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await createStripeEmbeddedSession({
        type,
        referenceId: id,
        amount,
        customerEmail: email,
      });

      if (res.error) {
        setError(res.error);
      } else if (res.clientSecret) {
        setClientSecret(res.clientSecret);
      } else {
        setError("Failed to create Stripe Embedded session");
      }
    }

    fetchSession();
  }, [id, type, amount, email]);

  if (error) {
    return (
      <div className="p-6 text-center bg-error-container text-error rounded-md border border-error/20">
        <span className="material-symbols-outlined text-4xl mb-2 text-red-600">error</span>
        <p className="font-bold text-red-700">Payment Setup Failed</p>
        <p className="text-sm mt-1 text-red-600">{error}</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-on-surface-variant">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-medium text-sm">Initializing secure checkout...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface rounded-md overflow-hidden p-2 border border-outline-variant/30">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
