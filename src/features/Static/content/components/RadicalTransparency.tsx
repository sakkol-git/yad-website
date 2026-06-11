import Link from "next/link";
import { Card, CardContent } from "@/shared/components/ui/Card";

export function RadicalTransparency() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-highest rounded-lg p-8 md:p-16 shadow-ambient">
      <div className="text-center mb-12">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          Radical Transparency
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          We believe in open books and clear impact. Dive into our annual
          reports and financial breakdowns to see exactly how contributions
          are utilized.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "description", title: "2023 Annual Report", desc: "Comprehensive overview of our projects, financials, and strategic goals.", action: "Download PDF", actionIcon: "download", color: "bg-primary-container text-on-primary-container" },
          { icon: "pie_chart", title: "Q4 Financial Summary", desc: "Detailed breakdown of income streams and program expenditures.", action: "View Online", actionIcon: "visibility", color: "bg-tertiary-container text-on-tertiary-container" },
          { icon: "verified_user", title: "Third-Party Audit", desc: "Independent verification of our operational metrics and fund allocation.", action: "Download PDF", actionIcon: "download", color: "bg-secondary-container text-on-secondary-container" },
        ].map((doc) => (
          <Link href="#" key={doc.title} className="group block h-full">
            <Card
              className="bg-surface p-0 flex flex-col items-center text-center hover:-translate-y-2 shadow-sm hover:shadow-ambient h-full"
            >
              <CardContent className="p-6 flex flex-col items-center h-full">
                <div
                  className={`w-16 h-16 rounded-full ${doc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {doc.icon}
                  </span>
                </div>
                <h3 className="font-body-lg font-bold text-primary mb-2">
                  {doc.title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  {doc.desc}
                </p>
                <span className="text-secondary font-label-bold flex items-center gap-1 mt-auto">
                  {doc.action}
                  <span className="material-symbols-outlined text-sm">
                    {doc.actionIcon}
                  </span>
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
