import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export function DonateHero() {
  return (
    <header className="relative px-margin-mobile md:px-margin-desktop py-12 md:py-16 max-w-container-max mx-auto text-center rounded-lg overflow-hidden mb-section-gap mx-4 md:mx-auto mt-28 shadow-2xl">
      {/* Background Image */}
      <Image
        src="/assets/images/yad-1.png"
        alt="Smiling Cambodian youth"
        fill
        className="object-cover"
        sizes="(max-width: 1440px) 100vw, 1440px"
        priority
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-surface/80 md:bg-surface/60 backdrop-blur-sm md:backdrop-blur-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent md:bg-gradient-to-r md:from-surface md:via-surface/80 md:to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto md:mx-0 md:text-left flex flex-col items-center md:items-start h-full justify-center px-4 md:px-12 py-2">
        <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary border border-secondary/30 font-label-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-4 backdrop-blur-md">
          <span className="material-symbols-outlined text-sm">volunteer_activism</span>
          Join 500+ Monthly Donors
        </div>

        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-4 leading-tight">
          Invest in Cambodia&apos;s <br className="hidden md:block" />
          <span className="text-secondary">Future Leaders</span>
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-6 text-lg">
          Your contribution directly funds safe housing, digital literacy, and community education for underprivileged youth. 100% of your donation creates local impact.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button variant="secondary" size="lg" className=" gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-primary transition-all px-8 text-lg" asChild>
            <Link href="/donate/flow">
              Donate Now
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </Button>
          <Button variant="outline" size="lg" className=" bg-surface/50 backdrop-blur-md hover:bg-surface text-primary border-primary/20 px-8 text-lg transition-all" asChild>
            <Link href="#options">
              Learn About Impact
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-6 mt-6 text-on-surface-variant/80 font-label-bold text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">verified_user</span>
            Secure Payment
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">favorite</span>
            Tax Deductible
          </div>
        </div>
      </div>
    </header>
  );
}
