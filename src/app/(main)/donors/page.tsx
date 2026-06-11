import { createClient } from '@/shared/lib/supabase/server';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 animate-fade-in-up">
            <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
            Our Supporters
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline-lg font-bold text-on-surface mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Empowering Change, <br className="hidden md:block" />
            <span className="text-primary">Together.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            We extend our deepest gratitude to the generous individuals, families, and organizations who believe in our mission and make our work in Cambodia possible.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link href="/donate">
              <Button size="lg" className="rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all text-base px-8 h-14">
                Become a Donor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Donors Grid */}
      <section className="container max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        {validDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validDonors.map((donor, index) => (
              <div 
                key={donor.id} 
                className="bg-surface rounded-3xl p-8 shadow-ambient border border-outline-variant/30 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(index % 6) * 100}ms` }}
              >
                <div className="w-20 h-20 rounded-full bg-primary-container/30 text-primary-container flex items-center justify-center mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {donor.amount && donor.amount > 1000 ? 'workspace_premium' : 'favorite'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">{donor.name}</h3>
                
                {donor.description && (
                  <p className="text-sm text-on-surface-variant font-medium italic mt-2 line-clamp-3">
                    "{donor.description}"
                  </p>
                )}
                
                <div className="mt-6 pt-6 border-t border-outline-variant/30 w-full flex justify-center items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Verified Supporter
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface rounded-3xl p-12 text-center shadow-sm border border-outline-variant/30">
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
      <section className="container max-w-4xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-2xl font-bold text-on-surface mb-8">Transparency & Trust</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </section>
    </main>
  );
}
