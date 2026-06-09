import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function DormitoryProgram() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
      <div className="bg-surface-container-lowest rounded-[3rem] p-8 md:p-16 ambient-shadow relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 border border-surface-container-low">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="lg:w-1/2 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-secondary-fixed flex items-center justify-center mb-6">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              home_work
            </span>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            Dormitory &amp; Youth Training Center
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-lg">
            Providing a safe, supportive living environment paired with
            intensive life-skills and vocational training. We ensure that
            vulnerable youth have the stability they need to focus on their
            personal and professional growth.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-surface p-4 rounded-xl border border-surface-container-high">
              <p className="font-headline-md text-headline-md text-secondary m-0">
                120
              </p>
              <p className="font-label-bold text-label-bold text-on-surface-variant m-0">
                Current Residents
              </p>
            </div>
            <div className="bg-surface p-4 rounded-xl border border-surface-container-high">
              <p className="font-headline-md text-headline-md text-secondary m-0">
                45
              </p>
              <p className="font-label-bold text-label-bold text-on-surface-variant m-0">
                Training Modules
              </p>
            </div>
          </div>
          <Button variant="link" className="px-0 no-underline hover:no-underline flex items-center gap-2 text-primary font-label-bold text-label-bold group">
            Learn about the center
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </Button>
        </div>
        <div className="lg:w-1/2 relative z-10 h-[400px]">
          <Image
            alt="Youth training center"
            className="w-full h-full object-cover rounded-[2rem] shadow-lg"
            src="/assets/images/yad-6.png"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
