"use client";

import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

import Image from "next/image";
import { useState } from "react";
import { FormInput } from "@/shared/components/ui/FormInput";
import { FormLabel } from "@/shared/components/ui/FormLabel";
import { FormSelect } from "@/shared/components/ui/FormSelect";
import { FormTextarea } from "@/shared/components/ui/FormTextarea";

export function BookingSection() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "khqr">("card");

  return (
    <section
      id="booking-section"
      className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      <RevealOnScroll className="mb-16">
        <h2 className="text-[2.5rem] md:text-[3.5rem] text-on-surface tracking-tighter leading-[1.0] mb-4">
          Reserve your <span className="font-light italic text-on-surface-variant">Experience.</span>
        </h2>
        <p className="text-base text-on-surface-variant font-light max-w-xl">
          Complete your booking details below. All proceeds support YAD
          educational initiatives in the local community.
        </p>
      </RevealOnScroll>

      <StaggerGroup y={28} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Booking Form */}
        <div className="lg:col-span-8">
          <form className="space-y-8">
            {/* Step 1: Stay Details */}
            <div className="bg-surface border border-outline-variant/30 p-8 md:p-12">
              <h3 className="text-2xl text-on-surface font-light tracking-tight mb-8 flex items-center gap-4">
                <span className="w-8 h-8 border border-on-surface flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                Stay Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <FormLabel>Check-in Date</FormLabel>
                  <FormInput type="date" required className="rounded-none border-outline-variant/30" />
                </div>
                <div>
                  <FormLabel>Check-out Date</FormLabel>
                  <FormInput type="date" required className="rounded-none border-outline-variant/30" />
                </div>
                <div>
                  <FormLabel>Number of Guests</FormLabel>
                  <FormSelect className="rounded-none border-outline-variant/30">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests (Max)</option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel>Dietary Requirements</FormLabel>
                  <FormSelect className="rounded-none border-outline-variant/30">
                    <option value="none">None</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="halal">Halal</option>
                    <option value="other">Other (Specify in notes)</option>
                  </FormSelect>
                </div>
              </div>
            </div>

            {/* Step 2: Guest Information */}
            <div className="bg-surface border border-outline-variant/30 p-8 md:p-12">
              <h3 className="text-2xl text-on-surface font-light tracking-tight mb-8 flex items-center gap-4">
                <span className="w-8 h-8 border border-on-surface flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                Guest Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <FormLabel>First Name</FormLabel>
                  <FormInput type="text" required placeholder="Jane" className="rounded-none border-outline-variant/30" />
                </div>
                <div>
                  <FormLabel>Last Name</FormLabel>
                  <FormInput type="text" required placeholder="Doe" className="rounded-none border-outline-variant/30" />
                </div>
                <div className="md:col-span-2">
                  <FormLabel>Email Address</FormLabel>
                  <FormInput type="email" required placeholder="jane@example.com" className="rounded-none border-outline-variant/30" />
                </div>
                <div className="md:col-span-2">
                  <FormLabel>Special Requests / Notes</FormLabel>
                  <FormTextarea rows={3} placeholder="Any specific needs or questions?" className="rounded-none border-outline-variant/30" />
                </div>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="bg-surface border border-outline-variant/30 p-8 md:p-12">
              <h3 className="text-2xl text-on-surface font-light tracking-tight mb-8 flex items-center gap-4">
                <span className="w-8 h-8 border border-on-surface flex items-center justify-center text-[10px] font-bold">
                  3
                </span>
                Payment
              </h3>

              {/* Payment Method Toggle */}
              <div className="flex gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 border p-6 flex flex-col items-center justify-center gap-3 transition-colors ${
                    paymentMethod === "card"
                      ? "border-on-surface bg-on-surface text-surface"
                      : "border-outline-variant/30 text-on-surface-variant hover:border-on-surface hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    credit_card
                  </span>
                  <span className="uppercase tracking-[0.1em] text-[10px] font-bold">
                    Credit Card
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("khqr")}
                  className={`flex-1 border p-6 flex flex-col items-center justify-center gap-3 transition-colors ${
                    paymentMethod === "khqr"
                      ? "border-on-surface bg-on-surface text-surface"
                      : "border-outline-variant/30 text-on-surface-variant hover:border-on-surface hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    qr_code_scanner
                  </span>
                  <span className="uppercase tracking-[0.1em] text-[10px] font-bold">
                    KHQR
                  </span>
                </button>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-8">
                  <div>
                    <FormLabel>Card Number</FormLabel>
                    <FormInput type="text" placeholder="0000 0000 0000 0000" icon="credit_card" className="rounded-none border-outline-variant/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormInput type="text" placeholder="MM/YY" className="rounded-none border-outline-variant/30" />
                    </div>
                    <div>
                      <FormLabel>CVC</FormLabel>
                      <FormInput type="text" placeholder="123" className="rounded-none border-outline-variant/30" />
                    </div>
                  </div>
                </div>
              )}

              {/* KHQR Form */}
              {paymentMethod === "khqr" && (
                <div className="text-center py-6">
                  <div className="border border-outline-variant/30 p-6 inline-block mb-4">
                    <div className="w-48 h-48 bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-on-surface-variant">
                        qr_code_2
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-light text-on-surface-variant">
                    Scan with any Bakong-supported app to pay instantly.
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="rounded-none bg-on-surface text-surface hover:bg-surface-variant h-14 px-10 w-full md:w-auto uppercase tracking-wider text-xs font-bold transition-all"
              >
                Confirm &amp; Pay $45.00
              </Button>
            </div>
          </form>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-4">
          <div className="bg-on-surface text-surface p-8 md:p-12 sticky top-32">
            <h4 className="text-2xl font-light tracking-tight mb-8">
              Booking Summary
            </h4>
            <div className="flex gap-6 mb-10 pb-10 border-b border-surface/20">
              <div className="w-24 h-24 overflow-hidden shrink-0 relative">
                <Image
                  alt="Interior of a minimalist Cambodian homestay room"
                  src="/assets/images/yad-2.png"
                  fill
                  sizes="96px"
                  className="object-cover grayscale"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h5 className="font-bold text-sm tracking-widest uppercase mb-2">
                  YAD Homestay
                </h5>
                <p className="text-surface/70 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  Siem Reap
                </p>
              </div>
            </div>
            <div className="space-y-4 mb-10 text-sm font-light text-surface/80">
              <div className="flex justify-between pb-4 border-b border-surface/10">
                <span>Dates</span>
                <span className="text-surface font-normal text-right">Select dates</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-surface/10">
                <span>Guests</span>
                <span className="text-surface font-normal">1 Guest</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-surface/10">
                <span>Rate per night</span>
                <span className="text-surface font-normal">$15.00</span>
              </div>
            </div>
            <div className="space-y-3 mb-10 text-sm font-light text-surface/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$45.00</span>
              </div>
              <div className="flex justify-between text-surface font-normal">
                <span>Community Contribution</span>
                <span>100%</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-8 border-t border-surface/30">
              <span className="uppercase tracking-widest text-[10px] font-bold text-surface/70">
                Total (USD)
              </span>
              <span className="text-4xl font-light tracking-tighter">
                $45.00
              </span>
            </div>
          </div>
        </div>
      </StaggerGroup>
    </section>
  );
}
