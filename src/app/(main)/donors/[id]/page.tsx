import { createClient } from '@/shared/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/Button';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: donor } = await supabase
    .from('donors')
    .select('name, description')
    .eq('id', params.id)
    .eq('is_public', true)
    .eq('status', 'Active')
    .single();

  if (!donor) {
    return {
      title: 'Donor Not Found',
    };
  }

  return {
    title: `${donor.name} - YAD Supporter`,
    description: donor.description || `Read about ${donor.name}'s support for YAD Cambodia.`,
  };
}

export default async function DonorDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: donor, error } = await supabase
    .from('donors')
    .select('*')
    .eq('id', params.id)
    .eq('is_public', true)
    .eq('status', 'Active')
    .single();

  const typedDonor = donor as any;

  if (error || !typedDonor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface-container-lowest pb-24 pt-24 lg:pt-32">
      <div className="container max-w-4xl mx-auto px-6">
        <Link href="/donors" className="inline-flex items-center gap-2 text-primary hover:underline font-medium mb-8">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back to All Donors
        </Link>
        
        <div className="bg-surface rounded-3xl p-8 md:p-12 shadow-ambient border border-outline-variant/30 relative overflow-hidden">
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[240px]">volunteer_activism</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
            {/* Avatar Column */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden relative shadow-lg bg-surface-variant/30 flex items-center justify-center border-4 border-surface">
                {typedDonor.avatar_url ? (
                  <Image 
                    src={typedDonor.avatar_url} 
                    alt={`Portrait of ${typedDonor.name}`} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 256px"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[80px] text-on-surface-variant/50">person</span>
                )}
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-grow text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Verified Supporter
              </div>
              
              <h1 className="text-3xl md:text-5xl font-headline-lg font-bold text-on-surface mb-2">
                {typedDonor.name}
              </h1>
              
              <p className="text-xl text-primary font-medium mb-6">
                {typedDonor.country || 'Global Supporter'}
              </p>

              {typedDonor.description && (
                <div className="prose prose-lg text-on-surface-variant mb-8 max-w-none">
                  <p className="italic font-medium leading-relaxed">
                    "{typedDonor.description}"
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant/30">
                <div>
                  <h4 className="text-sm font-label-bold text-on-surface-variant mb-1 uppercase tracking-wider">Donation Date</h4>
                  <p className="font-bold text-on-surface">
                    {typedDonor.donation_date ? new Date(typedDonor.donation_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Ongoing Support'}
                  </p>
                </div>
                {typedDonor.amount && (
                  <div>
                    <h4 className="text-sm font-label-bold text-on-surface-variant mb-1 uppercase tracking-wider">Contribution</h4>
                    <p className="font-bold text-primary flex items-center justify-center md:justify-start gap-1">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                      ${typedDonor.amount.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-primary-container/30 rounded-3xl p-8 md:p-12 border border-primary/10">
          <h3 className="text-2xl font-bold text-on-surface mb-4">Join {typedDonor.name} in Making a Difference</h3>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-8">
            Your support helps us continue our mission of empowering Cambodian youth through education and community development.
          </p>
          <Link href="/donate">
            <Button size="lg" className="rounded-full shadow-md hover:scale-105 transition-transform px-8">
              Become a Donor Today
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
