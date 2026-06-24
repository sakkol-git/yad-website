"use client";

import { useState, useTransition } from "react";
import { FormInput } from "@/shared/components/ui/FormInput";
import { FormLabel } from "@/shared/components/ui/FormLabel";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { submitQuickFormAction } from "@/server/actions/contact.actions";

export function QuickFormSection() {
  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitQuickFormAction(formData);
      if (result.error) {
        setErrorMessage(result.error);
        setFormState("error");
      } else {
        setFormState("success");
      }
    });
  };

  if (formState === "success") {
    return (
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-surface">
        <div className="max-w-3xl mx-auto border border-outline-variant/30 p-12 text-center bg-surface-container-low">
          <h2 className="font-headline-lg text-4xl text-primary mb-6 tracking-tight">
            Submission Received
          </h2>
          <p className="font-body-lg text-on-surface-variant mb-10 leading-relaxed">
            Your interest has been registered. Our operations team will review your profile and respond within 48 hours to discuss deployment or partnership.
          </p>
          <Button variant="outline" className="uppercase tracking-widest text-xs" onClick={() => setFormState("idle")}>
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-surface-container-lowest">
      <RevealOnScroll className="max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="block text-primary uppercase tracking-[0.2em] font-label-bold text-xs mb-4">
            Take Action
          </span>
          <TextReveal as="h2" text="Initiate Contact" className="font-headline-lg text-4xl lg:text-5xl text-primary mb-6 tracking-tight" />
          <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Provide your operational details below. Our team will evaluate your profile and match your capabilities with our highest-priority systemic needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-surface border border-outline-variant/30 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FormLabel htmlFor="quick-first-name" className="text-xs uppercase tracking-widest mb-2 font-label-bold">First Name</FormLabel>
              <FormInput id="quick-first-name" name="firstName" type="text" className="rounded-md border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-primary bg-transparent px-0 focus:ring-0" required aria-required="true" disabled={isPending} aria-invalid={formState === "error"} aria-describedby={formState === "error" ? "quick-form-error" : undefined} />
            </div>
            <div>
              <FormLabel htmlFor="quick-last-name" className="text-xs uppercase tracking-widest mb-2 font-label-bold">Last Name</FormLabel>
              <FormInput id="quick-last-name" name="lastName" type="text" className="rounded-md border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-primary bg-transparent px-0 focus:ring-0" required aria-required="true" disabled={isPending} aria-invalid={formState === "error"} aria-describedby={formState === "error" ? "quick-form-error" : undefined} />
            </div>
          </div>
          
          <div>
            <FormLabel htmlFor="quick-email" className="text-xs uppercase tracking-widest mb-2 font-label-bold">Email Address</FormLabel>
            <FormInput id="quick-email" name="email" type="email" className="rounded-md border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-primary bg-transparent px-0 focus:ring-0" required aria-required="true" disabled={isPending} aria-invalid={formState === "error"} aria-describedby={formState === "error" ? "quick-form-error" : undefined} />
          </div>

          <fieldset disabled={isPending}>
            <legend className="text-xs uppercase tracking-widest mb-4 font-label-bold">Primary Objective</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="cursor-pointer">
                <input className="peer sr-only" name="interest" type="radio" value="fund" />
                <div className="text-center px-4 py-4 border border-outline-variant/30 text-on-surface-variant font-label-bold text-sm uppercase tracking-widest peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary transition-colors">
                  Fund Projects
                </div>
              </label>
              <label className="cursor-pointer">
                <input className="peer sr-only" name="interest" type="radio" value="mentor" defaultChecked />
                <div className="text-center px-4 py-4 border border-outline-variant/30 text-on-surface-variant font-label-bold text-sm uppercase tracking-widest peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary transition-colors">
                  Field Volunteer
                </div>
              </label>
              <label className="cursor-pointer">
                <input className="peer sr-only" name="interest" type="radio" value="partner" />
                <div className="text-center px-4 py-4 border border-outline-variant/30 text-on-surface-variant font-label-bold text-sm uppercase tracking-widest peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary transition-colors">
                  Partnership
                </div>
              </label>
            </div>
          </fieldset>

          <div>
            <FormLabel htmlFor="quick-message" className="text-xs uppercase tracking-widest mb-2 font-label-bold">Operational Context (Optional)</FormLabel>
            <textarea
              id="quick-message"
              name="message"
              rows={3}
              disabled={isPending}
              className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 transition-colors duration-200 ease-in-out resize-y text-on-surface font-body-md"
            ></textarea>
          </div>

          <div
            id="quick-form-error"
            role="alert"
            aria-live="assertive"
            className={`p-4 text-sm transition-opacity duration-200 ${
              formState === "error" ? "bg-error/10 border border-error/30 text-error opacity-100" : "opacity-0 pointer-events-none h-0 m-0 py-0 border-0"
            }`}
          >
            {errorMessage || "Placeholder"}
          </div>

          <div className="pt-6">
            <Button
              className="w-full bg-primary text-on-primary hover:bg-surface-inverse hover:text-white uppercase tracking-widest text-sm relative min-w-[160px]"
              type="submit"
              size="lg"
              disabled={isPending}
              aria-busy={isPending}
              aria-disabled={isPending}
            >
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${isPending ? "opacity-0" : "opacity-100"}`}>
                Submit Dispatch
              </span>
              <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-150 ${isPending ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Transmitting...
              </span>
            </Button>
          </div>
        </form>
      </RevealOnScroll>
    </section>
  );
}
