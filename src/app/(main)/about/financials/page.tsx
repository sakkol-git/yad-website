import { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/shared/lib/supabase/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { AllocationDonut } from "@/features/Static/financials/charts/AllocationDonut";
import { GrowthBarChart } from "@/features/Static/financials/charts/GrowthBarChart";
import { EfficiencyBars } from "@/features/Static/financials/charts/EfficiencyBars";

export const metadata: Metadata = {
  title: "Financial Transparency | YAD Cambodia",
  description: "Review our annual reports, fund allocations, and financial transparency.",
};

import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";

async function AnnualReportsList() {
  const supabase = new SupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  }
  let reports: any[] | null = null;
  try {
    const { data, error } = await supabase
      .from("annual_reports")
      .select("*")
      .order("year", { ascending: false });

    if (!error) {
      reports = data;
    } else {
      console.error("Supabase fetch error:", error);
    }
  } catch (err) {
    console.error("Database connection failed:", err);
  }

  if (reports && reports.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {reports.map((report: any) => (
          <Card
            key={report.id}
            className="bg-surface-container-low border border-outline-variant/30 hover:border-outline transition-colors shadow-none rounded-none"
          >
            <CardHeader>
              <CardTitle className="text-primary text-xl font-light">{report.title}</CardTitle>
              <CardDescription className="text-on-surface-variant uppercase tracking-widest text-xs font-bold mt-1">
                FY {report.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={report.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full"
              >
                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-none border-outline-variant/50 hover:bg-surface-variant/30 text-on-surface font-medium"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Download PDF
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low border border-outline-variant/30 p-10 text-center">
      <span className="material-symbols-outlined text-4xl text-on-surface-variant/70 mb-4">
        description
      </span>
      <h3 className="font-headline-sm text-on-surface mb-2">Reports Coming Soon</h3>
      <p className="text-on-surface-variant mb-4 font-light">
        We are currently finalizing our audited financial reports for the recent fiscal years.
      </p>
      <p className="text-xs text-on-surface-variant/70 uppercase tracking-widest">
        *Historical Annual General Reports for 2015 and 2017 are available upon request for legacy
        transparency.
      </p>
    </div>
  );
}

function ReportsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="bg-surface-container-low border border-outline-variant/30 shadow-none rounded-none"
        >
          <CardHeader>
            <div className="h-6 bg-surface-variant/30 rounded-none w-3/4 animate-pulse mb-2"></div>
            <div className="h-4 bg-surface-variant/30 rounded-none w-1/4 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-10 bg-surface-variant/30 rounded-none w-full animate-pulse"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function FinancialsPage() {
  return (
    <main className="pb-section-gap bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-container-max">
        {/* Editorial Page Header */}
        <div className="pt-36 pb-20 lg:pt-48 lg:pb-28 border-b border-outline-variant/30 mb-16">
          <RevealOnScroll className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-6 h-[1px] bg-primary" />
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                Transparency
              </span>
            </div>
            <TextReveal
              as="h1"
              text="Financial Transparency."
              className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-on-surface tracking-tighter leading-[1.0] mb-8"
            />
            <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
              We believe in radical transparency. Track how every dollar is invested to empower
              Cambodian youth.
            </p>
          </RevealOnScroll>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          {/* Fund Allocation Section — Interactive Donut */}
          <RevealOnScroll className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="kicker-label text-on-surface-variant/70">
                Current Fund Allocation
              </span>
              <div className="flex-1 h-[1px] bg-outline-variant/30" />
            </div>

            <p className="text-2xl md:text-3xl text-on-surface font-light leading-relaxed tracking-tight mb-12">
              We maximize our impact by keeping overhead low. For every dollar donated, 80 cents
              goes directly into our programs and directly benefits the communities we serve.
            </p>

            <AllocationDonut />
          </RevealOnScroll>

          {/* Year-over-Year Growth — Interactive Bar Chart */}
          <RevealOnScroll className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="kicker-label text-on-surface-variant/70">Year-over-Year Growth</span>
              <div className="flex-1 h-[1px] bg-outline-variant/30" />
            </div>

            <p className="text-2xl md:text-3xl text-on-surface font-light leading-relaxed tracking-tight mb-12">
              Our reach has grown consistently every year, reflecting deepening trust from our
              communities and donors.
            </p>

            <GrowthBarChart />
          </RevealOnScroll>

          {/* Cost-per-Outcome — Efficiency Bars */}
          <RevealOnScroll className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="kicker-label text-on-surface-variant/70">Cost Per Outcome</span>
              <div className="flex-1 h-[1px] bg-outline-variant/30" />
            </div>

            <p className="text-2xl md:text-3xl text-on-surface font-light leading-relaxed tracking-tight mb-12">
              Radical transparency means showing exactly what your donation delivers. Every dollar
              is accounted for.
            </p>

            <EfficiencyBars />
          </RevealOnScroll>

          {/* Historical Data Section */}
          <RevealOnScroll className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="kicker-label text-on-surface-variant/70">
                Historical Data (2015)
              </span>
              <div className="flex-1 h-[1px] bg-outline-variant/30" />
            </div>
            <p className="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed tracking-tight">
              Transparency has been our core value since our inception as the Attitude Centre for
              Education (ACE). In 2015, our total income was{" "}
              <strong className="text-on-surface font-medium">$57,504.15</strong>, driven heavily by
              Grants (42%) and Individual Donors (38%). Our total program expenses were{" "}
              <strong className="text-on-surface font-medium">$57,461.23</strong>, with 46% directly
              funding the Dormitory and Leadership Center.
            </p>
          </RevealOnScroll>

          {/* Annual Reports Section */}
          <RevealOnScroll className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="kicker-label text-on-surface-variant/70">Annual Reports</span>
              <div className="flex-1 h-[1px] bg-outline-variant/30" />
            </div>
            <p className="text-xl text-on-surface-variant font-light leading-relaxed tracking-tight mb-12">
              Download our comprehensive annual reports to see detailed breakdowns of our
              financials, impact metrics, and stories from the field.
            </p>

            <Suspense fallback={<ReportsSkeleton />}>
              <AnnualReportsList />
            </Suspense>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
