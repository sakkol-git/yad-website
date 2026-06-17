import { Card, CardContent } from "@/shared/components/ui/Card";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function RadicalTransparency() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-highest rounded-lg p-8 md:p-16 shadow-ambient">
      <RevealOnScroll className="text-center mb-12">
        <TextReveal as="h2" text="Radical Transparency" className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4" />
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          We believe in open books and clear impact. Our annual reports and
          financial breakdowns will be published here as they become available.
        </p>
      </RevealOnScroll>
      <StaggerGroup y={28} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "description", title: "Annual Report", desc: "Comprehensive overview of our projects, financials, and strategic goals.", action: "Coming Soon", color: "bg-primary-container text-on-primary-container" },
          { icon: "pie_chart", title: "Financial Summary", desc: "Detailed breakdown of income streams and program expenditures.", action: "Coming Soon", color: "bg-tertiary-container text-on-tertiary-container" },
          { icon: "verified_user", title: "Third-Party Audit", desc: "Independent verification of our operational metrics and fund allocation.", action: "Coming Soon", color: "bg-secondary-container text-on-secondary-container" },
        ].map((doc) => (
          <Card
            key={doc.title}
            className="bg-surface p-0 flex flex-col items-center text-center shadow-sm opacity-75 h-full"
          >
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div
                className={`w-16 h-16 rounded-full ${doc.color} flex items-center justify-center mb-6`}
              >
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                  {doc.icon}
                </span>
              </div>
              <h3 className="font-body-lg font-bold text-primary mb-2">
                {doc.title}
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                {doc.desc}
              </p>
              <span className="text-on-surface-variant/60 font-label-bold flex items-center gap-1 mt-auto text-sm">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">schedule</span>
                {doc.action}
              </span>
            </CardContent>
          </Card>
        ))}
      </StaggerGroup>
    </section>
  );
}
