import Image from "next/image";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function ProgramCards() {
  return (
    <section className="relative z-20 mt-8 lg:-mt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <StaggerGroup y={32} scale={0.96} className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-32 h-32 rounded-2xl mb-8 relative overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-500 bg-primary/10">
            <Image
              alt="Students learning"
              className="w-full h-full object-cover"
              src="/assets/images/yad-2.png"
              fill
              sizes="128px"
            />
          </div>
          <h3 className="text-xl font-bold text-primary mb-3">
            Dormitory & Leadership
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Housing, scholarships, and extensive life skills for promising students from remote provinces.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center md:-translate-y-6">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-32 h-32 rounded-2xl mb-8 relative overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-500 bg-secondary/10">
            <Image
              alt="Digital Innovation"
              className="w-full h-full object-cover"
              src="/assets/images/yad-4.png"
              fill
              sizes="128px"
            />
          </div>
          <h3 className="text-xl font-bold text-secondary mb-3">
            Porridge for Hope
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Combating malnutrition with bi-monthly nutrition programs for children in extreme poverty.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-32 h-32 rounded-2xl mb-8 relative overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-500 bg-tertiary/10">
            <Image
              alt="Slum Education"
              className="w-full h-full object-cover"
              src="/assets/images/yad-5.png"
              fill
              sizes="128px"
            />
          </div>
          <h3 className="text-xl font-bold text-tertiary mb-3">
            Community Schools
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Taking English and essential Life Skills education directly to urban slum communities.
          </p>
        </div>

      </StaggerGroup>
    </section>
  );
}
