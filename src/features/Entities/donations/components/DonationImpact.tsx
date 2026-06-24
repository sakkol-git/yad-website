import Link from "next/link";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export function DonationImpact() {
  return (
    <section className="bg-surface border-t border-outline-variant/30 py-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <TextReveal 
          as="h2" 
          text="Your Impact" 
          className="text-[2.5rem] md:text-[3.5rem] tracking-tighter text-primary mb-12 leading-[1.0]" 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-surface p-8 rounded-none border border-outline-variant/30 hover:border-primary transition-colors duration-300">
            <div className="text-primary text-[3rem] font-light tracking-tighter mb-4">
              $25
            </div>
            <p className="text-sm font-light text-on-surface-variant leading-relaxed">
              Funds one month of nutritious meals for 5 children in our Porridge for Hope program.
            </p>
          </div>
          <div className="bg-surface p-8 rounded-none border-2 border-primary relative hover:bg-primary/5 transition-colors duration-300">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-none text-[10px] uppercase tracking-widest font-bold">
              Most Common
            </div>
            <div className="text-primary text-[3rem] font-light tracking-tighter mb-4">
              $50
            </div>
            <p className="text-sm font-light text-on-surface-variant leading-relaxed">
              Provides 1 month of safe housing, leadership training, and university access at our Dormitory and Leadership Training Centre.
            </p>
          </div>
          <div className="bg-surface p-8 rounded-none border border-outline-variant/30 hover:border-primary transition-colors duration-300">
            <div className="text-primary text-[3rem] font-light tracking-tighter mb-4">
              $100
            </div>
            <p className="text-sm font-light text-on-surface-variant leading-relaxed">
              Sponsors a Mobile Tutoring Unit, bringing basic literacy to over 100 children in marginalized urban slums.
            </p>
          </div>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-xs transition-colors pb-1 border-b border-primary/20 hover:border-primary"
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
