import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function ImpactPaths() {
  return (
    <section
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low/50"
      id="pathways"
    >
      <div className="max-w-container-max mx-auto">
        <RevealOnScroll y={20} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-label-bold text-label-bold tracking-wider uppercase mb-2 block">
            Take Action
          </span>
          <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-primary">
            Choose Your Impact Path
          </h2>
        </RevealOnScroll>
        <StaggerGroup y={28} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fund */}
          <div className="relative group rounded-md overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 z-0 bg-surface/60 backdrop-blur-xl border border-outline-variant/30 shadow-ambient transition-colors duration-300 group-hover:border-outline-variant/60"></div>
            <div className="absolute inset-0 z-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"></div>
            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6 text-on-secondary-container transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">
                  volunteer_activism
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-3">
                Fund the Future
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                Your financial support directly fuels youth-led ecological
                projects, workshops, and community infrastructure.
              </p>
              <Link
                className="text-secondary font-label-bold text-label-bold flex items-center gap-2 group-hover:gap-3 transition-[transform,box-shadow,border-color] duration-300 ease-out"
                href="/donate"
              >
                Make a Donation{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -z-10 group-hover:bg-secondary/10 transition-colors" />
            </div>
          </div>

          {/* Mentor */}
          <div className="relative group rounded-md overflow-hidden hover:scale-[1.02] transition-transform duration-300 md:-translate-y-4">
            <div className="absolute inset-0 z-0 bg-surface/60 backdrop-blur-xl border border-outline-variant/30 shadow-ambient transition-colors duration-300 group-hover:border-outline-variant/60"></div>
            <div className="absolute inset-0 z-0 bg-tertiary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"></div>
            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mb-6 text-on-tertiary-fixed transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">
                  school
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-3">
                Mentor &amp; Teach
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                Share your expertise. We need passionate individuals to lead
                workshops on sustainability, tech, and leadership.
              </p>
              <Link
                className="text-tertiary font-label-bold text-label-bold flex items-center gap-2 group-hover:gap-3 transition-[transform,box-shadow,border-color] duration-300 ease-out"
                href="#volunteer"
              >
                Apply to Mentor{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl -z-10 group-hover:bg-tertiary/10 transition-colors" />
            </div>
          </div>

          {/* Partner */}
          <div className="relative group rounded-md overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 z-0 bg-surface/60 backdrop-blur-xl border border-outline-variant/30 shadow-ambient transition-colors duration-300 group-hover:border-outline-variant/60"></div>
            <div className="absolute inset-0 z-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"></div>
            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-on-primary-fixed transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">
                  handshake
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-3">
                Institutional Partnerships
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                Align your organization with our mission. We collaborate with
                schools, corporations, and NGOs to scale our impact.
              </p>
              <Link
                className="text-primary font-label-bold text-label-bold flex items-center gap-2 group-hover:gap-3 transition-[transform,box-shadow,border-color] duration-300 ease-out"
                href="#partner"
              >
                Partner With Us{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10 group-hover:bg-primary/10 transition-colors" />
            </div>
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}
