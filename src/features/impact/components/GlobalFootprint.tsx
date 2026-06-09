import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function GlobalFootprint() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
      <div className="mb-16">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          Our Global Footprint
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Tracking our collective journey towards a more sustainable and
          equitable future. Data updated quarterly.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                245+
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
              <span className="material-symbols-outlined text-2xl">
                water_drop
              </span>
            </div>
          </div>
          <div>
            <div className="font-headline-lg text-headline-lg text-on-tertiary-fixed mb-2">
              1.2M
            </div>
            <p className="font-body-md text-body-md text-on-tertiary-fixed-variant">
              Liters of water conserved through new irrigation tech.
            </p>
          </div>
          </CardContent>
        </Card>
        {/* Small Stat Card 2 */}
        <Card className="col-span-1 bg-primary-fixed p-0 shadow-ambient hover:shadow-ambient-hover group border-0">
          <CardContent className="flex flex-col justify-between h-full p-8">
            <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center text-on-primary-fixed group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl">
                energy_savings_leaf
              </span>
            </div>
          </div>
          <div>
            <div className="font-headline-lg text-headline-lg text-on-primary-fixed mb-2">
              850k
            </div>
            <p className="font-body-md text-body-md text-on-primary-fixed-variant">
              Trees planted in deforested regions this year.
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
              className="w-1/6 bg-secondary-fixed rounded-t-lg h-1/4 hover:bg-secondary transition-colors cursor-pointer"
              title="2020"
            />
            <div
              className="w-1/6 bg-secondary-fixed rounded-t-lg h-1/3 hover:bg-secondary transition-colors cursor-pointer"
              title="2021"
            />
            <div
              className="w-1/6 bg-secondary-fixed rounded-t-lg h-1/2 hover:bg-secondary transition-colors cursor-pointer"
              title="2022"
            />
            <div
              className="w-1/6 bg-secondary-fixed rounded-t-lg h-3/4 hover:bg-secondary transition-colors cursor-pointer"
              title="2023"
            />
            <div
              className="w-1/6 bg-primary rounded-t-lg h-full relative group cursor-pointer"
              title="2024 (Current)"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 rounded shadow-ambient text-xs font-label-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Peak Engagement
              </div>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
