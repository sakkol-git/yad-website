import { TeamMemberCard } from "@/components/shared/TeamMemberCard";
import { getMembersByCategory } from "@/constants/team";

export function CommunityStructure() {
  const founders = getMembersByCategory("founder");
  const founder = founders.length > 0 ? founders[0] : null;
  const coFounders = getMembersByCategory("co-founder");
  const residents = getMembersByCategory("resident");
  const alumni = getMembersByCategory("alumni");

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low/30">
      <div className="max-w-container-max mx-auto text-center mb-20">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          Our Community Structure
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          YAD operates as a collaborative ecosystem, driven by passionate
          individuals committed to mutual growth.
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-[120px]">
        {/* Leadership Block (Tier 1 & Tier 2) */}
        <div className="flex flex-col gap-12 relative">
          {/* Tier 1: The Founder */}
          {founder && (
            <div className="relative">
              <div className="flex justify-center">
                <TeamMemberCard
                  {...founder}
                  size="lg"
                  href={`/about/team/${founder.slug}`}
                />
              </div>
              <div className="hidden md:block absolute left-1/2 -bottom-10 w-px h-10 bg-gradient-to-b from-primary/50 to-transparent -translate-x-1/2" />
            </div>
          )}

          {/* Tier 2: Co-Founders & Board */}
          {coFounders.length > 0 && (
            <div className="relative">
              <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20">
                {coFounders.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    {...member}
                    size="md"
                    borderColor="border-surface-container-highest"
                    href={`/about/team/${member.slug}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tier 3: The Residents (Dormitory) */}
        {residents.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h3 className="font-headline-md text-headline-md text-primary mb-2">
                The Residents
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                The heart of YAD. 10 dedicated university students living and
                learning together.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 items-start">
              {residents.map((member) => (
                <div key={member.id} className="w-full flex justify-center md:justify-start">
                  <div className="w-full">
                    <TeamMemberCard
                      {...member}
                      size="sm"
                      borderColor="border-surface-variant"
                      headlineClass="font-label-bold text-label-bold"
                      href={`/about/team/${member.slug}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 4: The Alumni Network */}
        {alumni.length > 0 && (
          <div className="pt-16 border-t border-surface-variant/50 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-4 text-on-surface-variant font-label-bold text-label-bold uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                public
              </span>
              Extended Network
            </div>
            <div className="text-center mb-12">
              <h3 className="font-headline-md text-headline-md text-primary mb-2">
                Alumni Mentors
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Former residents who return to guide the next generation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 items-start opacity-80 hover:opacity-100 transition-opacity duration-300">
              {alumni.map((member) => (
                <div key={member.id} className="w-full flex justify-center md:justify-start">
                  <div className="w-full">
                    <TeamMemberCard
                      {...member}
                      size="sm"
                      borderColor="border-surface"
                      headlineClass="font-label-bold text-body-md"
                      extra="mt-2"
                      href={`/about/team/${member.slug}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
