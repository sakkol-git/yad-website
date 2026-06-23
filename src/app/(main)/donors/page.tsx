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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validDonors = (donors || []) as any[];

  return (
    <main className="min-h-screen bg-surface-container-lowest pb-24">
      {/* Editorial Hero Section */}
      <section className="relative w-full bg-surface pt-24 pb-10 lg:pt-32 lg:pb-10 overflow-hidden border-b border-outline-variant/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Typographic Focus */}
            <div className="lg:col-span-5 flex flex-col z-10">
              <RevealOnScroll delay={0.1}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-6 h-[1px] bg-primary" />
                  <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary">
                    Our Supporters
                  </span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-primary tracking-tighter leading-[1.0] mb-6">
                  Empowering <br className="hidden md:block" />
                  change, <br className="hidden md:block" />
                  <span className="font-light italic text-on-surface-variant">
                    together.
                  </span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-sm mb-10">
                  We extend our deepest gratitude to the generous individuals, families, and organizations who believe in our mission and make our work in Cambodia possible.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default" size="lg" className="rounded-none bg-primary text-white h-12 px-6 hover:bg-primary/90 uppercase text-xs tracking-wider font-bold transition-all" asChild>
                    <Link href="/donate">Become a Donor</Link>
                  </Button>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column: Cinematic Image */}
            <div className="lg:col-span-7 relative h-[50vh] lg:h-[60vh] max-h-[600px] min-h-[400px] w-full mt-10 lg:mt-0">
              <RevealOnScroll delay={0.3} className="w-full h-full relative">
                <img
                  src="/assets/images/yad-5.png"
                  alt="Cambodian students and supporters"
                  className="w-full h-full object-cover object-center"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Donors Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-20 relative z-20">
        {validDonors.length > 0 ? (
          <StaggerGroup y={28} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-outline-variant/30">
            {validDonors.map((donor, index) => (
              <Link href={`/donors/${donor.id}`} key={donor.id} className="group block h-[400px] relative border-b border-r border-outline-variant/30 overflow-hidden cursor-pointer bg-surface">
                <div className="absolute inset-0 bg-surface-variant/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[64px] text-on-surface-variant/30">volunteer_activism</span>
                </div>
                {donor.avatar_url && (
                  <img
                    alt={`Portrait of ${donor.name}`}
                    src={donor.avatar_url}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Sharp gradient instead of a soft one */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Text Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start text-left">
                  <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-on-surface mb-2 border border-on-surface px-2 py-1">
                    {donor.country || 'Global'}
                  </span>
                  <h3 className="text-on-surface font-light tracking-tight text-2xl mb-2">
                    {donor.name}
                  </h3>
                  {donor.description && (
                    <p className="text-on-surface-variant text-sm font-light line-clamp-3">
                      {donor.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </StaggerGroup>
        ) : (
          <div className="bg-surface p-12 text-center border border-outline-variant/30">
            <div className="w-24 h-24 border border-outline-variant/30 mx-auto flex items-center justify-center mb-6 bg-surface-container-lowest">
              <span className="material-symbols-outlined text-[40px] text-primary">volunteer_activism</span>
            </div>
            <h3 className="text-xl md:text-2xl font-light text-on-surface tracking-tight mb-2 group-hover:text-primary transition-colors">Be the First!</h3>
            <p className="text-on-surface-variant font-light max-w-md mx-auto">
              Our public donor showcase is currently empty. Your generous contribution can help kickstart our mission and inspire others to give.
            </p>
          </div>
        )}
      </section>

      {/* Trust Section */}
      <RevealOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-20 text-center border-t border-outline-variant/30">
        <h2 className="text-3xl font-light tracking-tight text-on-surface mb-16">
          Transparency & <span className="italic text-on-surface-variant">Trust.</span>
        </h2>
        <StaggerGroup y={28} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-6">security</span>
            <h4 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Secure Donations</h4>
            <p className="text-sm text-on-surface-variant font-light max-w-xs">All transactions are fully encrypted and securely processed.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-6">pie_chart</span>
            <h4 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Direct Impact</h4>
            <p className="text-sm text-on-surface-variant font-light max-w-xs">100% of public donations go directly to funding our community projects.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-6">lock_person</span>
            <h4 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Privacy Respected</h4>
            <p className="text-sm text-on-surface-variant font-light max-w-xs">You have full control over whether your donation is displayed publicly or kept anonymous.</p>
          </div>
        </StaggerGroup>
      </RevealOnScroll>
    </main>
  );
}
