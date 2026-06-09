import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your donation to YAD has been processed successfully.",
};

export default function DonateSuccessPage() {
  return (
    <main className="flex-grow flex items-center justify-center p-gutter pt-32 pb-20 relative overflow-hidden min-h-[70vh]">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-tertiary-fixed/20 blur-[120px] pointer-events-none" />

      <div className="max-w-[600px] w-full bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-[0_8px_32px_rgba(65,104,55,0.05)] border border-surface-container/50 text-center relative z-10">
        {/* Icon */}
        <div className="mb-8 flex justify-center animate-pop-in">
          <div className="w-24 h-24 bg-secondary-container rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(191,236,174,0.4)]">
            <span
              className="material-symbols-outlined text-5xl text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
        </div>

        {/* Headlines */}
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 animate-fade-up delay-100">
          Thank You for Your Impact!
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 animate-fade-up delay-200">
          Your contribution of{" "}
          <strong className="text-secondary">$50</strong> will provide safe
          housing and education support for a student in Cambodia.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up delay-300">
          <Button variant="secondary" size="lg" className="rounded-full gap-2 hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(65,104,55,0.2)] px-8">
            <span className="material-symbols-outlined text-xl">
              download
            </span>
            Download Receipt
          </Button>
          <Button variant="outline" size="lg" className="border-primary/20 text-primary hover:bg-primary-fixed/10 rounded-full px-8">
            Back to Homepage
          </Button>
        </div>

        {/* Social Share */}
        <div className="pt-8 border-t border-surface-variant animate-fade-up delay-400">
          <p className="font-label-bold text-label-bold text-on-surface-variant mb-4 uppercase tracking-wider">
            Share Your Impact
          </p>
          <div className="flex justify-center gap-4">
            <Button
              aria-label="Share on Facebook"
              variant="ghost"
              size="icon"
              className="w-12 h-12 bg-surface-container rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed"
            >
              <span className="material-symbols-outlined">share</span>
            </Button>
            <Button
              aria-label="Share on Twitter"
              variant="ghost"
              size="icon"
              className="w-12 h-12 bg-surface-container rounded-full hover:bg-tertiary-fixed hover:text-on-tertiary-fixed"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
            </Button>
            <Button
              aria-label="Copy Link"
              variant="ghost"
              size="icon"
              className="w-12 h-12 bg-surface-container rounded-full hover:bg-secondary-container hover:text-on-secondary-container"
            >
              <span className="material-symbols-outlined">link</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
