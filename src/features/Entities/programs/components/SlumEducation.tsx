import Image from "next/image";
import { Card, CardContent } from "@/shared/components/ui/Card";

export function SlumEducation() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          Slum Community Education
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Taking education directly to where it&apos;s needed most. Our
          mobile tutoring programs and pop-up classrooms ensure no child is
          left behind due to geographical or economic barriers.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
        {/* Main Image Card */}
        <Card className="md:col-span-7 lg:col-span-8 p-0 border-0 rounded-[2rem] overflow-hidden relative group">
          <Image
            alt="Community Education"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="/assets/images/yad-4.png"
            fill
            sizes="(max-width: 768px) 100vw, 67vw"
          />
          <CardContent className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
            <div className="bg-primary/90 backdrop-blur-sm w-fit p-3 rounded-lg mb-4">
              <span className="material-symbols-outlined text-white text-3xl">
                school
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-white mb-2">
              Mobile Tutoring Units
            </h3>
            <p className="font-body-md text-body-md text-surface-container-low max-w-lg">
              Reaching over 500 children weekly in marginalized areas with
              basic literacy and numeracy programs.
            </p>
          </CardContent>
        </Card>
        {/* Stats/Info Cards */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          <Card className="bg-surface-container-low rounded-[2rem] p-0 h-1/2 flex flex-col justify-center border-surface-container-high hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  menu_book
                </span>
              </div>
              <h4 className="font-label-bold text-label-bold text-primary">
                Tutoring Goals
              </h4>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Our goal is to integrate 80% of participating children into
              formal schooling systems within 12 months.
            </p>
            </CardContent>
          </Card>
          <Card className="bg-secondary-fixed rounded-[2rem] p-0 border-0 h-1/2 flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:bg-secondary-fixed-dim transition-colors duration-300">
            <CardContent className="p-8 relative z-10">
              <h4 className="font-headline-md text-headline-md text-on-secondary-fixed mb-2">
                Volunteer
              </h4>
              <p className="font-body-md text-body-md text-on-secondary-fixed-variant mb-4">
                Join our community educators team.
              </p>
              <span className="material-symbols-outlined text-on-secondary-fixed bg-white/30 p-2 rounded-full group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </CardContent>
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-9xl text-white/20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
              diversity_3
            </span>
          </Card>
        </div>
      </div>
    </section>
  );
}
