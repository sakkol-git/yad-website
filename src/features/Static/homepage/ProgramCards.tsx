import Image from "next/image";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

export function ProgramCards() {
  return (
    <section className="relative z-20 mt-8 lg:-mt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <StaggerGroup y={32} scale={0.96} className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-surface/60 backdrop-blur-2xl rounded-[32px] p-8 border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-surface/80 transition-all duration-500 group relative flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <ImageRevealMask className="w-36 h-36 rounded-2xl mb-8 relative shadow-md group-hover:scale-105 transition-transform duration-500 bg-primary/10 border border-white/10">
            <Image
              alt="Students learning"
              className="w-full h-full object-cover"
              src="/assets/images/yad-2.png"
              fill
              sizes="144px"
            />
          </ImageRevealMask>
          <h3 className="text-2xl font-bold text-primary mb-3">
            Dormitory & Leadership
          </h3>
          <p className="text-on-surface-variant font-medium leading-relaxed">
            Housing, scholarships, and extensive life skills for promising students from remote provinces.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-surface/60 backdrop-blur-2xl rounded-[32px] p-8 border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-surface/80 transition-all duration-500 group relative flex flex-col items-center text-center overflow-hidden lg:translate-y-8">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <ImageRevealMask className="w-36 h-36 rounded-2xl mb-8 relative shadow-md group-hover:scale-105 transition-transform duration-500 bg-secondary/10 border border-white/10">
            <Image
              alt="Digital Innovation"
              className="w-full h-full object-cover"
              src="/assets/images/yad-4.png"
              fill
              sizes="144px"
            />
          </ImageRevealMask>
          <h3 className="text-2xl font-bold text-secondary mb-3">
            Porridge for Hope
          </h3>
          <p className="text-on-surface-variant font-medium leading-relaxed">
            Combating malnutrition with bi-monthly nutrition programs for children in extreme poverty.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-surface/60 backdrop-blur-2xl rounded-[32px] p-8 border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-surface/80 transition-all duration-500 group relative flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <ImageRevealMask className="w-36 h-36 rounded-2xl mb-8 relative shadow-md group-hover:scale-105 transition-transform duration-500 bg-tertiary/10 border border-white/10">
            <Image
              alt="Slum Education"
              className="w-full h-full object-cover"
              src="/assets/images/yad-5.png"
              fill
              sizes="144px"
            />
          </ImageRevealMask>
          <h3 className="text-2xl font-bold text-tertiary mb-3">
            Community Schools
          </h3>
          <p className="text-on-surface-variant font-medium leading-relaxed">
            Taking English and essential Life Skills education directly to urban slum communities.
          </p>
        </div>

      </StaggerGroup>
    </section>
  );
}
