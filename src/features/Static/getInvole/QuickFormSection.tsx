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
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-lg p-8 md:p-12 shadow-ambient border border-outline-variant/30 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl" aria-hidden="true">check_circle</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Thank You!
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8">
            Your interest has been submitted. Our team will review your information and get back to you within 2 business days.
          </p>
          <Button variant="outline" onClick={() => setFormState("idle")}>
            Submit Another
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <RevealOnScroll className="max-w-4xl mx-auto bg-surface-container-lowest rounded-lg p-8 md:p-12 shadow-ambient relative overflow-hidden border border-outline-variant/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 rounded-bl-full -z-10 blur-xl" />
        <div className="text-center mb-10">
          <TextReveal as="h2" text="Start Your Journey" className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4" />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            Fill out this quick form and our team will match you with the best
            opportunity to make a difference.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormLabel htmlFor="quick-first-name">First Name</FormLabel>
              <FormInput id="quick-first-name" name="firstName" type="text" placeholder="Jane" required disabled={isPending} />
            </div>
            <div>
              <FormLabel htmlFor="quick-last-name">Last Name</FormLabel>
              <FormInput id="quick-last-name" name="lastName" type="text" placeholder="Doe" required disabled={isPending} />
            </div>
          </div>
          <div>
            <FormLabel htmlFor="quick-email">Email Address</FormLabel>
            <FormInput id="quick-email" name="email" type="email" placeholder="jane@example.com" required disabled={isPending} />
          </div>
          <fieldset disabled={isPending}>
            <legend className="font-body-md text-body-md text-on-surface font-semibold mb-3">I want to...</legend>
            <div className="flex flex-wrap gap-4">
              <label className="cursor-pointer relative">
                <input
                  className="peer sr-only"
                  name="interest"
                  type="radio"
                  value="fund"
                />
                <div className="min-h-[44px] flex items-center justify-center px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:border-secondary transition-all hover:bg-surface-container">
                  Fund a Project
                </div>
              </label>
              <label className="cursor-pointer relative">
                <input
                  className="peer sr-only"
                  name="interest"
                  type="radio"
                  value="mentor"
                  defaultChecked
                />
                <div className="min-h-[44px] flex items-center justify-center px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-tertiary-fixed peer-checked:text-on-tertiary-fixed peer-checked:border-tertiary transition-all hover:bg-surface-container">
                  Volunteer / Mentor
                </div>
              </label>
              <label className="cursor-pointer relative">
                <input
                  className="peer sr-only"
                  name="interest"
                  type="radio"
                  value="partner"
                />
                <div className="min-h-[44px] flex items-center justify-center px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all hover:bg-surface-container">
                  Discuss Partnership
                </div>
              </label>
            </div>
          </fieldset>

          <div>
            <FormLabel htmlFor="quick-message">Message (Optional)</FormLabel>
            <textarea
              id="quick-message"
              name="message"
              rows={4}
              placeholder="Tell us a little more about how you'd like to get involved..."
              disabled={isPending}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y text-on-surface font-body-md text-body-md"
            ></textarea>
          </div>

          {formState === "error" && (
            <div className="p-4 bg-error/10 border border-error/20 text-error text-sm rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-lg" aria-hidden="true">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-4">
            <Button
              className="w-full bg-primary text-on-primary font-label-bold text-label-bold hover:bg-on-primary-fixed-variant hover:text-white transition-colors duration-300 shadow-md"
              type="submit"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit Interest"}
            </Button>
          </div>
        </form>
      </RevealOnScroll>
    </section>
  );
}
