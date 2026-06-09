"use client";

import { FormInput } from "@/components/ui/FormInput";
import { FormLabel } from "@/components/ui/FormLabel";
import { Button } from "@/components/ui/Button";

export function QuickFormSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 ambient-shadow relative overflow-hidden border border-outline-variant/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 rounded-bl-full -z-10 blur-xl" />
        <div className="text-center mb-10">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            Start Your Journey
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            Fill out this quick form and our team will match you with the best
            opportunity to make a difference.
          </p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormLabel>First Name</FormLabel>
              <FormInput type="text" placeholder="Jane" required />
            </div>
            <div>
              <FormLabel>Last Name</FormLabel>
              <FormInput type="text" placeholder="Doe" required />
            </div>
          </div>
          <div>
            <FormLabel>Email Address</FormLabel>
            <FormInput type="email" placeholder="jane@example.com" required />
          </div>
          <div>
            <FormLabel className="mb-3">I want to...</FormLabel>
            <div className="flex flex-wrap gap-4">
              <label className="cursor-pointer relative">
                <input
                  className="peer sr-only"
                  name="interest"
                  type="radio"
                  value="fund"
                />
                <div className="px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:border-secondary transition-all hover:bg-surface-container">
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
                <div className="px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-tertiary-fixed peer-checked:text-on-tertiary-fixed peer-checked:border-tertiary transition-all hover:bg-surface-container">
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
                <div className="px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all hover:bg-surface-container">
                  Discuss Partnership
                </div>
              </label>
            </div>
          </div>
          <div className="pt-4">
            <Button
              className="w-full bg-primary text-on-primary font-label-bold text-label-bold rounded-full hover:bg-on-primary-fixed-variant transition-colors duration-300 shadow-md"
              type="submit"
              size="lg"
            >
              Submit Interest
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
