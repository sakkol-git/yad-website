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
    <div className="bg-surface-container rounded-md p-8 shadow-ambient text-center md:text-left relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 blur-2xl" />

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
            <div className="bg-success-container text-on-success-container p-4 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined icon-fill">check_circle</span>
              <p className="font-label-md text-label-md">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <FormInput
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="w-full bg-surface-container-lowest"
                  aria-label="Email Address for Newsletter"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={status === "loading" || !email}
                className="shrink-0"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          )}
          {status === "error" && (
            <p className="text-error font-label-md text-label-md mt-2 flex items-center justify-center sm:justify-start gap-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
