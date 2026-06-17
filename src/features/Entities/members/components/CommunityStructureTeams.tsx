import { TeamMemberCard } from './TeamMemberCard';
import { MembersRepository } from "@/server/repositories/members";
import { createClient } from "@/shared/lib/supabase/server";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import type { TeamMember } from "@/features/Entities/members/types/member.types";

const membersRepo = new MembersRepository();

function mapToTeamMember(row: any): TeamMember {
    return {
        id: row.id,
        slug: row.slug || '',
        category: row.type.toLowerCase(),
        name: `${row.first_name} ${row.last_name}`.trim(),
        role: row.role || '',
        description: row.bio || '',
        image: row.avatar_url || '',
        profile: row.profile as any,
    };
}

export async function CommunityStructureTeams() {
    const supabase = await createClient();

    const [dbResidents, dbAlumni] = await Promise.all([

        membersRepo.getPublicMembersByCategory(supabase, 'Resident'),
        membersRepo.getPublicMembersByCategory(supabase, 'Alumni'),
    ]);

    const residents = dbResidents.map(mapToTeamMember);
    const alumni = dbAlumni.map(mapToTeamMember);

    return (
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low/30">

            <div className="max-w-5xl mx-auto flex flex-col gap-[120px]">
                {/* Tier 3: The Residents (Dormitory) */}
                {residents.length > 0 && (
                    <div>
                        <RevealOnScroll className="text-center mb-12">
                            <h3 className="font-headline-md text-headline-md text-primary mb-2">
                                The Residents
                            </h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                The heart of YAD. 10 dedicated university students living and
                                learning together.
                            </p>
                        </RevealOnScroll>
                        <StaggerGroup y={28} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-stretch">
                            {residents.map((member) => (
                                <div key={member.id} className="w-full flex justify-center md:justify-start">
                                    <div className="w-full">
                                        <TeamMemberCard
                                            {...member}
                                            href={`/about/team/${member.slug}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </StaggerGroup>
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
                        <RevealOnScroll className="text-center mb-12">
                            <h3 className="font-headline-md text-headline-md text-primary mb-2">
                                Alumni Mentors
                            </h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Former residents who return to guide the next generation.
                            </p>
                        </RevealOnScroll>
                        <StaggerGroup y={28} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-stretch opacity-80 hover:opacity-100 transition-opacity duration-300">
                            {alumni.map((member) => (
                                <div key={member.id} className="w-full flex justify-center md:justify-start">
                                    <div className="w-full">
                                        <TeamMemberCard
                                            {...member}
                                            href={`/about/team/${member.slug}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </StaggerGroup>
                    </div>
                )}
            </div>
        </section>
    );
}
