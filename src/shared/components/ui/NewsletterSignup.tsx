"use client";

import { useState } from "react";
import { Button } from "./Button";
import { FormInput } from "./FormInput";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe.");
      }

      setStatus("success");
      setMessage("Thank you for subscribing! We'll be in touch.");
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-md-full -z-10" />
      <div className="relative group rounded-md-md overflow-hidden">
        <div className="absolute inset-0 z-0 bg-surface/60 backdrop-blur-xl border border-outline-variant/30 shadow-ambient transition-colors duration-300 group-hover:border-outline-variant/60" />
        <div className="absolute inset-0 z-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

        <div className="p-8 relative z-10 text-center md:text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-md-bl-full -z-10 blur-2xl" />

          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="font-headline-md text-headline-md text-primary mb-2">
                Join Our Movement
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Subscribe to our newsletter for updates on our impact, inspiring stories, and ways to get involved.
              </p>
            </div>

            <div className="w-full lg:w-auto flex-1 max-w-md">
              {status === "success" ? (
                <div className="bg-success-container text-on-success-container p-4 rounded-md-md flex items-center gap-3">
                  <span className="material-symbols-outlined icon-fill">check_circle</span>
                  <p className="font-label-md text-label-md">{message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                    <FormInput
                      id="newsletter-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-required="true"
                      aria-describedby="newsletter-email-error"
                      disabled={status === "loading"}
                      className="w-full bg-surface-container-lowest"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === "loading" || !email}
                    aria-busy={status === "loading"}
                    aria-disabled={status === "loading" || !email}
                    className="shrink-0 relative min-w-[160px] h-[44px]"
                  >
                    <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${status === "loading" ? "opacity-0" : "opacity-100"}`}>
                      Subscribe
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-150 ${status === "loading" ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Subscribing...
                    </span>
                  </Button>
                </form>
              )}
              <p
                id="newsletter-email-error"
                role="alert"
                aria-live="polite"
                className={`font-label-md text-label-md mt-2 flex items-center justify-center sm:justify-start gap-1 transition-opacity duration-200 ${status === "error" ? "text-error opacity-100" : "opacity-0 pointer-events-none"
                  }`}
              >
                {status === "error" && <span className="material-symbols-outlined text-sm">error</span>}
                {message || "Placeholder error"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
