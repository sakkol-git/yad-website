export function PartnerHero() {
  return (
    <section className="relative pt-32 pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0 z-0 opacity-80">
        {/* Abstract floating shapes for background texture */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-secondary-container opacity-30 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-primary-fixed-dim opacity-20 blur-3xl mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/60 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-container-max mx-auto text-center mt-12 mb-section-gap">
        <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full mb-8">
          <span className="material-symbols-outlined text-primary fill-icon text-sm">
            handshake
          </span>
          <span className="font-label-bold text-label-bold text-primary">
            Collaborative Impact
          </span>
        </div>
        <h1 className="font-display-lg text-display-lg text-primary mb-6 max-w-4xl mx-auto drop-shadow-sm leading-tight">
          Driving Change Through Strategic Partnerships
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          We collaborate with visionary organizations globally and locally to
          amplify our impact across Cambodia. Together, we are building
          sustainable futures for young changemakers.
        </p>
      </div>
    </section>
  );
}
