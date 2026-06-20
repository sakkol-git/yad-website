import { Metadata } from 'next';
import { Suspense } from 'react';
import { createClient } from '@/shared/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';

export const metadata: Metadata = {
  title: 'Financial Transparency | YAD Cambodia',
  description: 'Review our annual reports, fund allocations, and financial transparency.',
};

async function AnnualReportsList() {
  const supabase = await createClient();
  
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  let reports: any[] | null = null;
  try {
    const { data, error } = await supabase
      .from('annual_reports')
      .select('*')
      .order('year', { ascending: false });
      
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
          <Card key={report.id} className="border border-surface-variant bg-surface transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-primary">{report.title}</CardTitle>
              <CardDescription className="text-on-surface-variant">FY {report.year}</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={report.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button variant="outline" className="w-full gap-2">
                  <span className="material-symbols-outlined text-[18px]">download</span>
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
    <div className="bg-surface-container-low border border-surface-variant rounded-lg p-10 text-center">
      <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">description</span>
      <h3 className="font-headline-sm text-on-surface mb-2">Reports Coming Soon</h3>
      <p className="text-on-surface-variant mb-4">
        We are currently finalizing our audited financial reports for the recent fiscal years.
      </p>
      <p className="text-sm text-on-surface-variant italic">
        *Historical Annual General Reports for 2015 and 2017 are available upon request for legacy transparency.
      </p>
    </div>
  );
}

function ReportsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border border-surface-variant bg-surface">
          <CardHeader>
            <div className="h-6 bg-surface-variant/50 rounded w-3/4 animate-pulse mb-2"></div>
            <div className="h-4 bg-surface-variant/50 rounded w-1/4 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-10 bg-surface-variant/50 rounded w-full animate-pulse"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function FinancialsPage() {
  return (
    <main>
      <section className="bg-primary pt-32 pb-16 px-margin-mobile md:px-margin-desktop text-center">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-4">Financial Transparency</h1>
        <p className="font-body-lg text-body-lg text-primary-container max-w-2xl mx-auto">
          We believe in radical transparency. Track how every dollar is invested to empower Cambodian youth.
        </p>
      </section>

      <section className="py-16 bg-surface-container-lowest">
        <div className="max-w-container-md mx-auto px-margin-mobile md:px-margin-desktop">
          
          {/* Historical Data Section */}
          <div className="mb-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Historical Data (2015)</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">
              Transparency has been our core value since our inception as the Attitude Centre for Education (ACE). In 2015, our total income was <strong>$57,504.15</strong>, driven heavily by Grants (42%) and Individual Donors (38%). Our total program expenses were <strong>$57,461.23</strong>, with 46% directly funding the Dormitory and Leadership Center.
            </p>
          </div>

          {/* Fund Allocation Section */}
          <div className="mb-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Current Fund Allocation</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">
              We maximize our impact by keeping overhead low. For every dollar donated, 80 cents goes directly into our programs and directly benefits the communities we serve.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-secondary-container border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-on-secondary-container text-4xl font-display-md">80%</CardTitle>
                  <CardDescription className="text-on-secondary-container/80 text-lg font-label-bold">Programs & Impact</CardDescription>
                </CardHeader>
                <CardContent className="text-on-secondary-container/70">
                  Direct funding for youth development, scholarships, and community projects.
                </CardContent>
              </Card>

              <Card className="bg-primary-container border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-on-primary-container text-4xl font-display-md">15%</CardTitle>
                  <CardDescription className="text-on-primary-container/80 text-lg font-label-bold">Operations</CardDescription>
                </CardHeader>
                <CardContent className="text-on-primary-container/70">
                  Essential staff, rent, utilities, and running our facilities smoothly.
                </CardContent>
              </Card>

              <Card className="bg-tertiary-container border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-on-tertiary-container text-4xl font-display-md">5%</CardTitle>
                  <CardDescription className="text-on-tertiary-container/80 text-lg font-label-bold">Fundraising</CardDescription>
                </CardHeader>
                <CardContent className="text-on-tertiary-container/70">
                  Marketing, outreach, and donor relations to ensure long-term sustainability.
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Annual Reports Section */}
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Annual Reports</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">
              Download our comprehensive annual reports to see detailed breakdowns of our financials, impact metrics, and stories from the field.
            </p>

            <Suspense fallback={<ReportsSkeleton />}>
              <AnnualReportsList />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
