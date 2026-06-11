"use client";

import { Button } from "@/shared/components/ui/Button";

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
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="font-headline-md text-headline-md text-primary mb-4">
          Reserve Your Experience
        </h2>
        <p className="text-on-surface-variant font-body-md text-body-md">
          Complete your booking details below. All proceeds support YAD
          educational initiatives in the local community.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Booking Form */}
        <div className="lg:col-span-8">
          <form className="space-y-8">
            {/* Step 1: Stay Details */}
            <div className="bg-surface-container-lowest rounded-lg p-8 shadow-ambient relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
              <h3 className="font-headline-md text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="bg-secondary-container text-on-secondary-container w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </span>
                Stay Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel>Check-in Date</FormLabel>
                  <FormInput type="date" required />
                </div>
                <div>
                  <FormLabel>Check-out Date</FormLabel>
                  <FormInput type="date" required />
                </div>
                <div>
                  <FormLabel>Number of Guests</FormLabel>
                  <FormSelect>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests (Max)</option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel>Dietary Requirements</FormLabel>
                  <FormSelect>
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
            <div className="bg-surface-container-lowest rounded-lg p-8 shadow-ambient relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-tertiary-fixed-dim" />
              <h3 className="font-headline-md text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="bg-tertiary-container text-on-tertiary-container w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </span>
                Guest Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel>First Name</FormLabel>
                  <FormInput type="text" required placeholder="Jane" />
                </div>
                <div>
                  <FormLabel>Last Name</FormLabel>
                  <FormInput type="text" required placeholder="Doe" />
                </div>
                <div className="md:col-span-2">
                  <FormLabel>Email Address</FormLabel>
                  <FormInput type="email" required placeholder="jane@example.com" />
                </div>
                <div className="md:col-span-2">
                  <FormLabel>Special Requests / Notes</FormLabel>
                  <FormTextarea rows={3} placeholder="Any specific needs or questions?" />
                </div>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="bg-surface-container-lowest rounded-lg p-8 shadow-ambient relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary-container" />
              <h3 className="font-headline-md text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </span>
                Payment
              </h3>

              {/* Payment Method Toggle */}
              <div className="flex gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 border-2 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-surface-container-low ${
                    paymentMethod === "card"
                      ? "border-secondary bg-secondary/5"
                      : "border-surface-container-highest"
                  }`}
                >
                  <span className={`material-symbols-outlined text-3xl ${paymentMethod === "card" ? "text-secondary" : "text-on-surface-variant"}`}>
                    credit_card
                  </span>
                  <span className="font-label-bold text-label-bold text-on-surface">
                    Credit Card
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("khqr")}
                  className={`flex-1 border-2 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-surface-container-low ${
                    paymentMethod === "khqr"
                      ? "border-secondary bg-secondary/5"
                      : "border-surface-container-highest"
                  }`}
                >
                  <span className={`material-symbols-outlined text-3xl ${paymentMethod === "khqr" ? "text-secondary" : "text-on-surface-variant"}`}>
                    qr_code_scanner
                  </span>
                  <span className="font-label-bold text-label-bold text-on-surface">
                    KHQR
                  </span>
                </button>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-6">
                  <div>
                    <FormLabel>Card Number</FormLabel>
                    <FormInput type="text" placeholder="0000 0000 0000 0000" icon="credit_card" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormInput type="text" placeholder="MM/YY" />
                    </div>
                    <div>
                      <FormLabel>CVC</FormLabel>
                      <FormInput type="text" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {/* KHQR Form */}
              {paymentMethod === "khqr" && (
                <div className="text-center py-6">
                  <div className="bg-surface-container p-6 rounded-lg inline-block mb-4 shadow-sm">
                    <div className="w-48 h-48 bg-surface-variant rounded-md flex items-center justify-center border-4 border-white">
                      <span className="material-symbols-outlined text-6xl text-outline">
                        qr_code_2
                      </span>
                    </div>
                  </div>
                  <p className="font-body-md text-on-surface-variant">
                    Scan with any Bakong-supported app to pay instantly.
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="rounded-full shadow-ambient hover:scale-105 px-10 w-full md:w-auto text-lg"
              >
                Confirm &amp; Pay $45.00
              </Button>
            </div>
          </form>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-4">
          <div className="bg-tertiary text-on-tertiary rounded-lg p-8 shadow-ambient sticky top-32">
            <h4 className="font-headline-md text-xl mb-6">
              Booking Summary
            </h4>
            <div className="flex gap-4 mb-8">
              <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 relative">
                <Image
                  alt="Interior of a minimalist Cambodian homestay room"
                  src="/assets/images/yad-2.png"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <h5 className="font-label-bold text-base">
                  YAD Community Homestay
                </h5>
                <p className="text-on-tertiary-container text-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-base">
                    location_on
                  </span>
                  Siem Reap Province
                </p>
              </div>
            </div>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between border-b border-on-tertiary-fixed-variant pb-4">
                <span className="text-on-tertiary-container">Dates</span>
                <span className="font-bold text-right">Select dates</span>
              </div>
              <div className="flex justify-between border-b border-on-tertiary-fixed-variant pb-4">
                <span className="text-on-tertiary-container">Guests</span>
                <span className="font-bold">1 Guest</span>
              </div>
              <div className="flex justify-between border-b border-on-tertiary-fixed-variant pb-4">
                <span className="text-on-tertiary-container">
                  Rate per night
                </span>
                <span>$15.00</span>
              </div>
            </div>
            <div className="space-y-2 mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$45.00</span>
              </div>
              <div className="flex justify-between text-secondary-fixed">
                <span>Community Contribution</span>
                <span>100%</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-on-tertiary-fixed-variant">
              <span className="font-headline-md text-xl">
                Total (USD)
              </span>
              <span className="font-display-lg text-3xl font-bold text-secondary-fixed">
                $45.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
