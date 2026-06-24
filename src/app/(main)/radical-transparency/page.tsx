import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { RadicalTransparency } from "@/features/Static/impact/RadicalTransparency";
import { reportsService } from "@/server/services/reports.service";
import { Database } from "@/shared/types/supabase";

type Report = Database["public"]["Tables"]["annual_reports"]["Row"];

export const metadata: Metadata = {
  title: "Radical Transparency & Annual Reports",
  description:
    "Explore YAD's annual reports and independent third-party audits. We are committed to an open-book policy.",
  openGraph: {
    title: "Radical Transparency | YAD Cambodia",
    description:
      "Explore YAD's annual reports and independent third-party audits. We are committed to an open-book policy.",
    url: "https://yadkh.org/radical-transparency",
  },
};

export default async function RadicalTransparencyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://yadkh.org" },
    { name: "Radical Transparency", url: "https://yadkh.org/radical-transparency" },
  ];

  // Fetch published reports (cached via unstable_cache + 'reports' tag, 1hr ISR)
  let reports: Report[] = [];
  try {
    reports = await reportsService.getPublicReports();
  } catch (err) {
    // Graceful degradation: render empty list rather than crashing the page
    console.error("[RadicalTransparencyPage] Failed to fetch reports:", err);
  }

  return (
    <main className="flex-grow pb-section-gap pt-24">
      <BreadcrumbSchema items={breadcrumbs} />
      <RadicalTransparency reports={reports} />
    </main>
  );
}
