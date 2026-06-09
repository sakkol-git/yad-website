import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ReviewSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
      {/* Left Column */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            Review Your Donation
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Please review the details below before completing your contribution to Youth Advancement for Development.
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-6 md:p-10 border border-surface-container-high relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none" />
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-surface-container">
            <h2 className="font-headline-md text-headline-md text-primary">Donation Summary</h2>
            <Button variant="ghost" className="px-2 py-1 h-auto text-secondary hover:text-primary gap-1">
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Donor Info */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="block font-label-bold text-label-bold text-outline mb-1 uppercase tracking-wider text-xs">Donor Name</span>
                <span className="font-body-lg text-body-lg text-on-surface">Alex Mercer</span>
              </div>
              <div>
                <span className="block font-label-bold text-label-bold text-outline mb-1 uppercase tracking-wider text-xs">Email Address</span>
                <span className="font-body-lg text-body-lg text-on-surface">alex.mercer@example.com</span>
              </div>
              <div>
                <span className="block font-label-bold text-label-bold text-outline mb-1 uppercase tracking-wider text-xs">Frequency</span>
                <span className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-bold text-label-bold text-sm">
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  Monthly
                </span>
              </div>
            </div>
            {/* Payment Info */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="block font-label-bold text-label-bold text-outline mb-1 uppercase tracking-wider text-xs">Payment Method</span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-surface-container-highest rounded flex items-center justify-center text-on-surface-variant font-label-bold text-xs">
                    VISA
                  </div>
                  <span className="font-body-lg text-body-lg text-on-surface">•••• 4242</span>
                </div>
              </div>
              <div>
                <span className="block font-label-bold text-label-bold text-outline mb-1 uppercase tracking-wider text-xs">Billing Zip Code</span>
                <span className="font-body-lg text-body-lg text-on-surface">90210</span>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="mt-10 pt-6 border-t border-surface-container">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input defaultChecked className="peer appearance-none w-6 h-6 border-2 border-outline rounded text-secondary focus:ring-secondary focus:ring-offset-background checked:bg-secondary checked:border-secondary transition-all" type="checkbox" />
                <span className="material-symbols-outlined text-on-secondary absolute text-sm opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
              </div>
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                I agree to cover the 3% transaction fee so that 100% of my donation goes directly to the programs.
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 mt-4">
          <Button variant="outline" size="lg" className="w-full md:w-auto rounded-full px-8" asChild>
            <Link href="/donate/payment">
              Back
            </Link>
          </Button>
          <Button variant="secondary" size="lg" className="w-full md:w-auto rounded-full px-10 gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-primary" asChild>
            <Link href="/donate/success">
              <span className="material-symbols-outlined">lock</span>
              Confirm &amp; Pay $50.00
            </Link>
          </Button>
        </div>
        <div className="text-center text-outline text-sm flex items-center justify-center gap-2 mt-2">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          Secure 256-bit SSL encryption
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <div className="lg:col-span-5 xl:col-span-4 sticky top-32">
        <div className="bg-primary text-on-primary rounded-xl overflow-hidden ambient-shadow flex flex-col">
          <div className="h-48 relative overflow-hidden bg-surface-tint">
            <Image
              alt="Smiling youth outdoors in sunlight"
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
              src="/assets/images/yad-1.png"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="inline-block bg-tertiary-container text-on-tertiary-container font-label-bold text-xs uppercase tracking-wide px-3 py-1 rounded-full mb-2 backdrop-blur-sm">
                Impact Summary
              </span>
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-on-primary/20 pb-6">
              <span className="font-body-lg text-body-lg text-on-primary/80">Total Donation</span>
              <span className="font-headline-lg text-headline-lg font-bold text-secondary-container">
                $50<span className="text-2xl text-on-primary/60">.00</span>
              </span>
            </div>
            <div className="bg-primary-container rounded-lg p-5 flex items-start gap-4">
              <div className="bg-secondary text-on-secondary p-2 rounded-full shrink-0">
                <span className="material-symbols-outlined">psychiatry</span>
              </div>
              <p className="font-body-md text-body-md text-on-primary-container m-0">
                Your $50 monthly contribution provides essential learning materials for one student for an entire semester.
              </p>
            </div>
            <p className="font-body-md text-body-md text-on-primary/70 text-center italic mt-2">
              &ldquo;Thank you for investing in our future leaders.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
