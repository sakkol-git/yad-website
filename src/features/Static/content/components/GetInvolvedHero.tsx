import Image from "next/image";
import Link from "next/link";

export function GetInvolvedHero() {
  return (
    <header className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-6 lg:px-8 min-h-[100svh] md:min-h-[819px] flex items-center overflow-hidden">
      <div className="absolute right-0 top-0 w-[150vw] max-w-[600px] aspect-square bg-secondary-container/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute left-0 bottom-0 w-[180vw] max-w-[800px] aspect-square bg-tertiary-fixed/20 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4" />
      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl relative z-10">
          <h1 className="font-display-lg text-display-lg text-primary mb-6 leading-tight">
            Small Actions,
            <br />
            <span className="text-secondary">Big Impact</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
            Join YAD in empowering youth for sustainable development. Whether
            you want to fund the future, mentor the next generation, or build
            a partnership, your involvement creates waves of positive change.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold px-8 py-4 rounded-full hover:bg-secondary hover:text-on-secondary transition-colors duration-300 shadow-sm hover:shadow-md inline-flex items-center gap-2"
              href="#pathways"
            >
              Get Involved Today
              <span className="material-symbols-outlined text-sm">
                arrow_downward
              </span>
            </Link>
          </div>
        </div>
        <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-xl overflow-hidden ambient-shadow bg-surface-container-highest">
          <Image
            alt="Floating green island"
            className="w-full h-full object-cover object-center"
            src="/assets/images/yad-7.png"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        </div>
      </div>
    </header>
  );
}
