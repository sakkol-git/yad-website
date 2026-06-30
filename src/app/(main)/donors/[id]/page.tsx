import { createClient } from "@/shared/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Metadata } from "next";
import Image from "next/image";
import { TextReveal } from "@/shared/components/animations/TextReveal";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: donor } = await supabase
    .from("donors")
    .select("name, description")
    .eq("id", resolvedParams.id)
    .eq("is_public", true)
    .eq("status", "Active")
    .single();

  if (!donor) {
    return {
      title: "Donor Not Found",
    };
  }

  return {
    title: `${donor.name} - YAD Supporter`,
    description: donor.description || `Read about ${donor.name}'s support for YAD Cambodia.`,
  };
}

export default async function DonorDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: donor, error } = await supabase
    .from("donors")
    .select("*")
    .eq("id", resolvedParams.id)
    .eq("is_public", true)
    .eq("status", "Active")
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedDonor = donor as any;

  if (error || !typedDonor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pb-24 pt-24 lg:pt-32">
      <div className="container max-w-5xl mx-auto px-6">
        <Link
          href="/donors"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary kicker-label mb-12 transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to All Donors
        </Link>

        <div className="bg-surface rounded-md p-8 md:p-16 border border-outline-variant/30 relative overflow-hidden">
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[240px]">volunteer_activism</span>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-16 relative z-10 items-start">
            {/* Avatar Column */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-md overflow-hidden relative bg-transparent flex items-center justify-center border border-outline-variant/30">
                {typedDonor.avatar_url ? (
                  <Image
                    src={typedDonor.avatar_url}
                    alt={`Portrait of ${typedDonor.name}`}
                    className="absolute inset-0 w-full h-full object-cover text-transparent"
                    width={800}
                    height={600}
                  />
                ) : (
                  <span className="material-symbols-outlined text-[80px] text-on-surface-variant/30">
                    person
                  </span>
                )}
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-grow text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-outline-variant/50 text-primary kicker-label mb-6">
                <span className="material-symbols-outlined text-sm">verified</span>
                Verified Supporter
              </div>

              <TextReveal
                as="h1"
                text={typedDonor.name}
                className="text-4xl md:text-6xl font-light tracking-tighter text-on-surface mb-4 leading-none"
              />

              <p className="text-sm font-light uppercase tracking-widest text-primary mb-8">
                {typedDonor.country || "Global Supporter"}
              </p>

              {typedDonor.description && (
                <div className="mb-12 max-w-3xl border-l border-primary pl-6 text-left mx-auto md:mx-0">
                  <p className="text-2xl font-light tracking-tight text-on-surface leading-relaxed">
                    &ldquo;{typedDonor.description}&rdquo;
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30 text-left">
                <div>
                  <h4 className="kicker-label text-on-surface-variant mb-2">
                    Donation Date
                  </h4>
                  <p className="text-lg font-light text-on-surface">
                    {typedDonor.donation_date
                      ? new Date(typedDonor.donation_date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Ongoing Support"}
                  </p>
                </div>
                {typedDonor.amount && (
                  <div>
                    <h4 className="kicker-label text-on-surface-variant mb-2">
                      Contribution
                    </h4>
                    <p className="text-2xl font-light text-primary flex items-center justify-start gap-2">
                      <span className="material-symbols-outlined text-xl">favorite</span>$
                      {typedDonor.amount.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-surface border border-outline-variant/30 rounded-md p-8 md:p-16">
          <h3 className="text-3xl font-light text-on-surface tracking-tight mb-4">
            Join {typedDonor.name} in Making a Difference
          </h3>
          <p className="text-sm font-light text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            Your support helps us continue our mission of empowering Cambodian youth through
            education and community development.
          </p>
          <Link href="/donate">
            <Button
              size="lg"
              variant="default"
              className="rounded-md kicker-label px-10 h-14 bg-primary text-white hover:bg-primary/90 transition-colors duration-150"
            >
              Become a Donor Today
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
