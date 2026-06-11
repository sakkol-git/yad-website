import Link from "next/link";

export function DonationImpact() {
  return (
    <section className="bg-surface-container-low py-section-gap rounded-t-[3rem]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-headline-md text-headline-md text-primary mb-12">
          Your Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-surface-container-lowest p-8 rounded-lg ambient-shadow hover:-translate-y-2 transition-transform duration-300">
            <div className="text-secondary font-headline-lg text-headline-lg mb-2">
              $25
            </div>
            <p className="font-body-md text-body-md text-on-surface">
              Provides school supplies for one student for a semester.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-lg ambient-shadow hover:-translate-y-2 transition-transform duration-300 relative border-2 border-secondary/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-4 py-1 rounded-full text-xs font-label-bold">
              Most Common
            </div>
            <div className="text-secondary font-headline-lg text-headline-lg mb-2">
              $50
            </div>
            <p className="font-body-md text-body-md text-on-surface">
              Funds 1 month of safe housing and utilities for a student.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-lg ambient-shadow hover:-translate-y-2 transition-transform duration-300">
            <div className="text-secondary font-headline-lg text-headline-lg mb-2">
              $100
            </div>
            <p className="font-body-md text-body-md text-on-surface">
              Supports a complete digital literacy course enrollment.
            </p>
          </div>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-primary hover:text-secondary font-label-bold transition-colors pb-1 border-b-2 border-primary/20 hover:border-secondary"
          href="#"
        >
          View Annual Reports for Financial Transparency
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
