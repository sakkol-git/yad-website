import Image from "next/image";
import { Card, CardContent } from "@/shared/components/ui/Card";

export function ProgramCards() {
  return (
    <section className="relative z-20 -mt-20 pb-section-gap px-margin-mobile md:px-margin-desktop">

      <div className="w-full max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Card 1 */}
        <Card className="bg-slate-200 backdrop-blur-xl border-white/20 hover:scale-[1.02] shadow-ambient">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <div className="w-32 h-32 rounded-lg overflow-hidden mb-6 bg-tertiary-fixed-dim relative">
              <Image
                alt="Students learning"
                className="w-full h-full object-cover"
                src="/assets/images/yad-2.png"
                fill
                sizes="128px"
              />
            </div>
            <h3 className="font-headline-md text-headline-md text-tertiary mb-3">
              DYTP
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Developing youth leadership through hands-on community projects.
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="bg-secondary-container/40 backdrop-blur-xl border-white/30 hover:scale-[1.02] shadow-ambient md:-translate-y-8">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <div className="w-32 h-32 rounded-lg overflow-hidden mb-6 bg-secondary-fixed relative">
              <Image
                alt="Digital Innovation"
                className="w-full h-full object-cover"
                src="/assets/images/yad-4.png"
                fill
                sizes="128px"
              />
            </div>
            <h3 className="font-headline-md text-headline-md text-secondary mb-3">
              Digital Innovation
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Equipping the next generation with modern technological skills.
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="bg-slate-200 backdrop-blur-xl border-white/20 hover:scale-[1.02] shadow-ambient">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <div className="w-32 h-32 rounded-lg overflow-hidden mb-6 bg-surface-variant relative">
              <Image
                alt="Slum Education"
                className="w-full h-full object-cover"
                src="/assets/images/yad-5.png"
                fill
                sizes="128px"
              />
            </div>
            <h3 className="font-headline-md text-headline-md text-primary-container mb-3">
              Slum Education
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Providing accessible learning resources to marginalized areas.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
