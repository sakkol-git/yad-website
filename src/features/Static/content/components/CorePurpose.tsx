import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/Card";

export function CorePurpose() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
            Our Core Purpose
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Driving sustainable change through three foundational pillars of
            youth empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <Card className="hover-lift flex flex-col h-full">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">
                  school
                </span>
              </div>
              <CardTitle className="mb-4">Education Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Bridging the gap for underprivileged students through scholarships,
                learning materials, and accessible tutoring programs.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift flex flex-col h-full">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">
                  devices
                </span>
              </div>
              <CardTitle className="mb-4">Digital Literacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Equipping youth with the technological skills required to thrive
                in the modern economy and solve local challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift flex flex-col h-full">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">
                  diversity_3
                </span>
              </div>
              <CardTitle className="mb-4">Community Leadership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Fostering a sense of civic duty by involving youth directly in
                local development and ecological projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
