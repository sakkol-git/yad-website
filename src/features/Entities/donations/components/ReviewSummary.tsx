import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export function ReviewSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
      {/* Left Column */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
        <div>
          <h1 className="text-[3.5rem] font-light text-primary tracking-tighter leading-none mb-6 border-b border-outline-variant/30 pb-4">
            Review Your Donation
          </h1>
          <p className="text-base text-on-surface-variant font-light leading-relaxed">
            Please review the details below before completing your contribution to Youth Advancement for Development.
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-surface rounded-md-md p-6 md:p-10 border border-outline-variant/30 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/30">
            <h2 className="text-2xl font-light text-primary tracking-tight">Donation Summary</h2>
            <Button variant="ghost" className="px-2 py-1 h-auto text-secondary hover:text-primary gap-1">
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Donor Info */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="block uppercase tracking-[0.2em] text-[10px] font-bold text-on-surface mb-2">Donor Name</span>
                <span className="text-lg font-light text-on-surface">Alex Mercer</span>
              </div>
              <div>
                <span className="block uppercase tracking-[0.2em] text-[10px] font-bold text-on-surface mb-2">Email Address</span>
                <span className="text-lg font-light text-on-surface">alex.mercer@example.com</span>
              </div>
              <div>
                <span className="block uppercase tracking-[0.2em] text-[10px] font-bold text-on-surface mb-2">Frequency</span>
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-md-md border border-primary/20 uppercase tracking-widest text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                  Monthly
                </span>
              </div>
            </div>
            {/* Payment Info */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="block uppercase tracking-[0.2em] text-[10px] font-bold text-on-surface mb-2">Payment Method</span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 border border-outline-variant/50 bg-transparent rounded-md-md flex items-center justify-center text-on-surface font-bold text-[10px] tracking-widest uppercase">
                    VISA
                  </div>
                  <span className="text-lg font-light text-on-surface">•••• 4242</span>
                </div>
              </div>
              <div>
                <span className="block uppercase tracking-[0.2em] text-[10px] font-bold text-on-surface mb-2">Billing Zip Code</span>
                <span className="text-lg font-light text-on-surface">90210</span>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="mt-10 pt-6 border-t border-outline-variant/30">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input defaultChecked className="peer appearance-none w-5 h-5 border border-outline-variant/50 rounded-md-md text-primary focus:ring-1 focus:ring-primary focus:ring-offset-background checked:bg-primary checked:border-primary transition-colors duration-150" type="checkbox" />
                <span className="material-symbols-outlined text-white absolute text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
              </div>
              <span className="text-sm font-light text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed">
                I agree to cover the 3% transaction fee so that 100% of my donation goes directly to the programs.
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 mt-4">
          <Button variant="outline" size="lg" className="w-full md:w-auto px-8 rounded-md-md border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-widest text-[10px] font-bold h-12 transition-colors" asChild>
            <Link href="/donate/payment">
              Back
            </Link>
          </Button>
          <Button variant="default" size="lg" className="w-full md:w-auto px-10 gap-2 hover:-translate-y-1 bg-primary hover:bg-primary/90 text-white rounded-md-md uppercase tracking-widest text-[10px] font-bold h-12 transition-colors duration-150" asChild>
            <Link href="/donate/success">
              <span className="material-symbols-outlined text-[16px]">lock</span>
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
        <div className="bg-primary text-white rounded-md-md border border-outline-variant/30 flex flex-col">
          <div className="h-48 relative overflow-hidden bg-primary">
            <Image
              alt="Smiling youth outdoors in sunlight"
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
              src="/assets/images/yad-1.png"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="inline-block bg-white text-primary font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-md-md mb-2">
                Impact Summary
              </span>
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-white/20 pb-6">
              <span className="text-sm font-light uppercase tracking-widest">Total Donation</span>
              <span className="text-[3rem] font-light tracking-tighter leading-none">
                $50<span className="text-2xl text-white/60">.00</span>
              </span>
            </div>
            <div className="bg-white/10 rounded-md-md border border-white/20 p-5 flex items-start gap-4">
              <div className="bg-white text-primary p-2 rounded-md-md shrink-0 flex items-center justify-center border border-white/20">
                <span className="material-symbols-outlined text-[20px]">psychiatry</span>
              </div>
              <p className="text-sm font-light leading-relaxed m-0">
                Your $50 monthly contribution provides essential learning materials for one student for an entire semester.
              </p>
            </div>
            <p className="text-sm font-light text-white/70 text-center italic mt-2">
              &ldquo;Thank you for investing in our future leaders.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
