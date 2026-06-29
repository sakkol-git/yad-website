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
    <div className="relative border border-outline-variant/30 rounded-md overflow-hidden bg-surface group transition-colors hover:border-outline-variant/50">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 w-32 h-1 bg-primary transition-all duration-500 group-hover:w-full group-hover:opacity-50" />
      
      <div className="absolute inset-0 z-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

      <div className="p-10 lg:p-14 relative z-10 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 w-full flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-primary">
                Newsletter
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-primary tracking-tighter leading-[1.1] mb-4">
              Join Our Movement
            </h3>
            <p className="font-light text-base text-on-surface-variant max-w-md leading-relaxed">
              Subscribe to our newsletter for updates on our impact, inspiring stories, and ways to get involved.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md">
            {status === "success" ? (
              <div className="bg-success/10 border border-success/20 text-success p-6 rounded-md flex flex-col items-center justify-center text-center gap-3">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
                <p className="font-medium text-sm">{message}</p>
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
                    className="w-full bg-surface-container-lowest border-outline-variant/30 focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "loading" || !email}
                  aria-busy={status === "loading"}
                  aria-disabled={status === "loading" || !email}
                  className="shrink-0 relative min-w-[160px] h-[48px] bg-primary text-white hover:bg-primary/90 rounded-md text-xs tracking-[0.2em] uppercase font-semibold transition-colors"
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
              className={`text-xs mt-3 flex items-center justify-center lg:justify-start gap-1 transition-opacity duration-200 ${status === "error" ? "text-error opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
              {status === "error" && <span className="material-symbols-outlined text-[16px]">error</span>}
              {message || "Placeholder error"}
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
