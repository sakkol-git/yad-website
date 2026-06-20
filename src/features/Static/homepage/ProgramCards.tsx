import Image from "next/image";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

export function ProgramCards() {
  return (
    <section className="relative z-20 mt-8 lg:-mt-20 pb-section-gap px-margin-mobile md:px-margin-desktop">

      <StaggerGroup y={32} scale={0.96} className="w-full max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Card 1 */}
        <Card className="bg-surface-container backdrop-blur-xl border-white/20 hover:scale-[1.02] shadow-ambient">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <ImageRevealMask className="w-32 h-32 rounded-lg mb-6 bg-tertiary-fixed-dim relative">
              <Image
                alt="Students learning"
                className="w-full h-full object-cover"
                src="/assets/images/yad-2.png"
                fill
                sizes="128px"
              />
            </ImageRevealMask>
            <h3 className="font-headline-md text-headline-md text-tertiary mb-3">
              Dormitory &amp; Leadership Training
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Housing, scholarships, and extensive life skills for promising students.
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="bg-secondary-container/40 backdrop-blur-xl border-white/30 hover:scale-[1.02] shadow-ambient md:-translate-y-8">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <ImageRevealMask className="w-32 h-32 rounded-lg mb-6 bg-secondary-fixed relative">
              <Image
                alt="Digital Innovation"
                className="w-full h-full object-cover"
                src="/assets/images/yad-4.png"
                fill
                sizes="128px"
              />
            </ImageRevealMask>
            <h3 className="font-headline-md text-headline-md text-secondary mb-3">
              Porridge for Hope
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Combating malnutrition with bi-monthly nutrition programs for children.
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="bg-surface-container backdrop-blur-xl border-white/20 hover:scale-[1.02] shadow-ambient">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <ImageRevealMask className="w-32 h-32 rounded-lg mb-6 bg-surface-variant relative">
              <Image
                alt="Slum Education"
                className="w-full h-full object-cover"
                src="/assets/images/yad-5.png"
                fill
                sizes="128px"
              />
            </ImageRevealMask>
            <h3 className="font-headline-md text-headline-md text-primary mb-3">
              Community Schools
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Taking English and Life Skills education directly to slum communities.
            </p>
          </CardContent>
        </Card>
      </StaggerGroup>
    </section>
  );
}
