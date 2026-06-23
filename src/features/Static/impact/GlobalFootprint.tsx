import { Card, CardContent } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { AnimatedCounter } from "@/shared/components/animations/AnimatedCounter";
import { getImpactStatsAction } from "@/server/actions/impact.actions";

export async function GlobalFootprint() {
  const stats = await getImpactStatsAction();

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
      <RevealOnScroll className="mb-16">
        <TextReveal as="h2" text="Our Global Footprint" className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4" />
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Tracking our collective journey towards a more sustainable and
          equitable future. Data updated quarterly.
        </p>
      </RevealOnScroll>
      <StaggerGroup stagger={0.08} y={12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Big Stat Card */}
        <Card className="col-span-1 md:col-span-2 bg-surface-container-low p-0 shadow-ambient hover:shadow-ambient-hover group border-0">
          <CardContent className="flex flex-col justify-between h-full p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  nature_people
                </span>
              </div>
              <span className="px-4 py-1 rounded-full bg-surface text-primary font-label-bold text-sm">
                Communities Reached
              </span>
            </div>
            <div>
              <div className="font-display-lg text-6xl md:text-display-lg text-primary mb-2">
                <AnimatedCounter value={stats.communitiesReached} suffix="+" />
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Active local sustainability projects led by youth organizers.
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Small Stat Card 1 */}
        <Card className="col-span-1 bg-tertiary-fixed p-0 shadow-ambient hover:shadow-ambient-hover group border-0">
          <CardContent className="flex flex-col justify-between h-full p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center text-on-tertiary-fixed group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                  school
                </span>
              </div>
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg text-on-tertiary-fixed mb-2">
                <AnimatedCounter value={stats.youthHoused} suffix="+" />
              </div>
              <p className="font-body-md text-body-md text-on-tertiary-fixed-variant">
                Youth housed and supported through our dormitory program.
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Small Stat Card 2 */}
        <Card className="col-span-1 bg-primary-fixed p-0 shadow-ambient hover:shadow-ambient-hover group border-0">
          <CardContent className="flex flex-col justify-between h-full p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center text-on-primary-fixed group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                  location_on
                </span>
              </div>
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg text-on-primary-fixed mb-2">
                <AnimatedCounter value={stats.provincesReached} suffix="+" />
              </div>
              <p className="font-body-md text-body-md text-on-primary-fixed-variant">
                Provinces reached with education and training programs.
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Interactive Chart Card */}
        <Card className="col-span-1 md:col-span-2 bg-surface-container-highest p-0 shadow-ambient relative overflow-hidden border-0">
          <CardContent className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="font-headline-md text-headline-md text-primary">
                Youth Engagement Growth
              </h3>
              <Button variant="ghost" size="icon" className="text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </Button>
            </div>
            <div className="flex-grow flex items-end gap-2 relative z-10">
              <div
                className="w-1/6 bg-secondary-fixed rounded-md h-1/4 hover:bg-secondary transition-colors cursor-pointer"
                title="2020"
              />
              <div
                className="w-1/6 bg-secondary-fixed rounded-md h-1/3 hover:bg-secondary transition-colors cursor-pointer"
                title="2021"
              />
              <div
                className="w-1/6 bg-secondary-fixed rounded-md h-1/2 hover:bg-secondary transition-colors cursor-pointer"
                title="2022"
              />
              <div
                className="w-1/6 bg-secondary-fixed rounded-md h-3/4 hover:bg-secondary transition-colors cursor-pointer"
                title="2023"
              />
              <div
                className="w-1/6 bg-primary rounded-md h-full relative group cursor-pointer"
                title="2024 (Current)"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 rounded shadow-ambient text-xs font-label-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Peak Engagement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </StaggerGroup>
    </section>
  );
}
