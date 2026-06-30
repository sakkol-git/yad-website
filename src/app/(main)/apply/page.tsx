"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { submitStudentApplicationAction } from "@/server/actions/apply.actions";
import { toast } from "sonner";

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitStudentApplicationAction(formData);

    if (!result.success || result.error) {
      toast.error(result.error || "Failed to submit application");
    } else {
      toast.success("Application submitted successfully!");
      setIsSuccess(true);
    }

    setIsSubmitting(false);
  }

  if (isSuccess) {
    return (
      <main>
        <section className="bg-primary pt-32 pb-16 px-6 text-center">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-4">
            Application Submitted
          </h1>
          <p className="font-body-lg text-body-lg text-primary-container max-w-2xl mx-auto">
            Thank you for applying to YAD Cambodia.
          </p>
        </section>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <span className="material-symbols-outlined text-6xl text-primary mb-6">check_circle</span>
          <h2 className="text-2xl font-bold text-on-surface mb-4">
            We've received your application!
          </h2>
          <p className="text-on-surface-variant mb-8">
            Our team will review your application and get back to you within 2-3 weeks.
          </p>
          <a href="/">
            <Button variant="primary">Return Home</Button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-primary pt-32 pb-16 px-margin-mobile md:px-margin-desktop text-center">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-4">
          Student Applications
        </h1>
        <p className="font-body-lg text-body-lg text-primary-container max-w-2xl mx-auto">
          Apply for our dormitory programs, scholarships, and youth development initiatives.
        </p>
      </section>

      <section className="py-16 bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <form
            onSubmit={handleSubmit}
            className="bg-surface border border-surface-variant rounded-md p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Application Form</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  aria-required="true"
                  type="text"
                  className="stripe-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  required
                  aria-required="true"
                  type="text"
                  className="stripe-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  type="email"
                  className="stripe-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  aria-required="true"
                  type="tel"
                  className="stripe-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  placeholder="+855 12 345 678"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="educationLevel" className="block text-sm font-bold mb-2">
                Current Education Level
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                required
                aria-required="true"
                className="stripe-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none bg-surface"
              >
                <option value="">Select your level...</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate (University)</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Vocational">Vocational Training</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-8">
              <label htmlFor="essay" className="block text-sm font-bold mb-2">
                Why do you want to join YAD Cambodia?
              </label>
              <p className="text-xs text-on-surface-variant mb-3">
                Please tell us about your goals, background, and how you hope to contribute to our
                community. (Min. 100 words)
              </p>
              <textarea
                id="essay"
                name="essay"
                required
                aria-required="true"
                rows={6}
                minLength={100}
                className="stripe-input min-h-[150px] resize-y focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none py-3"
                placeholder="I want to join YAD because..."
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                aria-disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
