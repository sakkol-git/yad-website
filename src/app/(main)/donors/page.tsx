import { createClient } from '@/shared/lib/supabase/server';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { TextReveal } from "@/shared/components/animations/TextReveal";

export const metadata = {
  title: 'Our Donors - YAD Cambodia',
  description: 'Recognizing the generous individuals and organizations that make our mission possible.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function DonorsShowcasePage() {
  const supabase = await createClient();

  // Fetch active, public donors
  const { data: donors, error } = await supabase
    .from('donors')
    .select('*')
    .eq('status', 'Active')
    .eq('is_public', true)
    .order('amount', { ascending: false, nullsFirst: false })
    .order('donation_date', { ascending: false });

  if (error) {
    console.error('Failed to fetch donors for showcase:', error);
  }

  const validDonors = (donors || []) as any[];

  return (
    <main className="min-h-screen bg-surface-container-lowest pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-primary/10">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="container relative z-10 max-w-5xl mx-auto px-6 text-center">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              Our Supporters
            </div>
          </RevealOnScroll>
          <TextReveal as="h1" text="Empowering Change, Together." className="text-4xl md:text-5xl lg:text-6xl font-headline-lg font-bold text-on-surface mb-6" />
          <RevealOnScroll delay={0.2}>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              We extend our deepest gratitude to the generous individuals, families, and organizations who believe in our mission and make our work in Cambodia possible.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/donate">
                <Button size="lg" className=" shadow-md hover:shadow-lg hover:scale-105 transition-all text-base px-8 h-14">
                  Become a Donor
                </Button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Donors Grid */}
      <section className="container max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        {validDonors.length > 0 ? (
          <StaggerGroup y={28} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validDonors.map((donor, index) => (
              <div
                key={donor.id}
                className="w-full flex justify-center"
              >
                <Link href={`/donors/${donor.id}`} className="group cursor-pointer block w-full max-w-[340px]">
                  <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px]">
                    <div className="absolute inset-0 bg-surface-variant/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[64px] text-on-surface-variant/50">volunteer_activism</span>
                    </div>
                    {donor.avatar_url && (
                      <img
                        alt={`Portrait of ${donor.name}`}
                        src={donor.avatar_url}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 text-transparent"
                      />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    {/* Text Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start text-left">
                      <h3 className="text-white font-bold text-2xl mb-1 group-hover:text-primary-100 transition-colors">
                        {donor.name}
                      </h3>
                      <span className="text-white bg-primary py-1 px-2 rounded-md text-center font-medium text-sm mb-3">
                        {donor.country || 'Global Supporter'}
                      </span>
                      {donor.description && (
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {donor.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </StaggerGroup>
        ) : (
          <div className="bg-surface rounded-xl p-12 text-center shadow-sm border border-outline-variant/30">
            <div className="w-24 h-24 rounded-full bg-surface-variant/30 mx-auto flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant">volunteer_activism</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-3">Be the First!</h3>
            <p className="text-on-surface-variant max-w-md mx-auto">
              Our public donor showcase is currently empty. Your generous contribution can help kickstart our mission and inspire others to give.
            </p>
          </div>
        )}
      </section>

      {/* Trust Section */}
      <RevealOnScroll className="container max-w-4xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-2xl font-bold text-on-surface mb-8">Transparency & Trust</h2>
        <StaggerGroup y={28} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[32px] text-primary mb-3">security</span>
            <h4 className="font-bold text-on-surface mb-2">Secure Donations</h4>
            <p className="text-sm text-on-surface-variant">All transactions are fully encrypted and securely processed.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[32px] text-primary mb-3">pie_chart</span>
            <h4 className="font-bold text-on-surface mb-2">Direct Impact</h4>
            <p className="text-sm text-on-surface-variant">100% of public donations go directly to funding our community projects.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[32px] text-primary mb-3">lock_person</span>
            <h4 className="font-bold text-on-surface mb-2">Privacy Respected</h4>
            <p className="text-sm text-on-surface-variant">You have full control over whether your donation is displayed publicly or kept anonymous.</p>
          </div>
        </StaggerGroup>
      </RevealOnScroll>
    </main>
  );
}
