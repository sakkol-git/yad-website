import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/Card";
import type { TeamMember } from "@/features/Entities/members/types/member.types";

interface MemberProfileProps {
  member: TeamMember;
}

export function MemberProfile({ member }: MemberProfileProps) {
  const { profile } = member;

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-16 md:gap-20 py-12">
      {/* Header Section: Role, Name, Description & Quote */}
      <section className="w-full flex justify-center">
        <div className="max-w-4xl flex flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label-bold text-label-bold text-xs tracking-wide uppercase">
              {member.role}
            </span>

            {/* Social Links Row next to Role Badge */}
            {profile?.socialLinks && (Object.keys(profile.socialLinks).length > 0) && (
              <div className="flex gap-2">
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-secondary-container transition-colors duration-200"
                  >
                    <span className="material-symbols-outlined text-lg">
                      work
                    </span>
                  </a>
                )}
                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter profile"
                    className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-secondary-container transition-colors duration-200"
                  >
                    <span className="material-symbols-outlined text-lg">
                      tag
                    </span>
                  </a>
                )}
                {profile.socialLinks.facebook && (
                  <a
                    href={profile.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook profile"
                    className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-secondary-container transition-colors duration-200"
                  >
                    <span className="material-symbols-outlined text-lg">
                      public
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>

          <h1 className="font-headline-lg text-headline-lg text-primary mb-4 leading-tight">
            {member.name}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
            {member.description}
          </p>

          {/* Elegant Blockquote style */}
          {profile?.quote && (
            <blockquote className="border-l-4 border-secondary/40 pl-6 my-4 max-w-2xl text-left">
              <p className="font-body-lg text-xl text-primary italic leading-relaxed">
                &ldquo;{profile.quote}&rdquo;
              </p>
            </blockquote>
          )}
        </div>
      </section>

      {/* Hero Grid Section: Photo & Vision/Experience */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 relative w-full aspect-square rounded-xl overflow-hidden shadow-ambient">
            <Image
              alt={`${member.name} — ${member.role} at YAD`}
              src={member.image}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Right Column: Vision & Experience block */}
          <div className="lg:col-span-7 flex">
            {(profile?.vision || (profile?.experience && profile.experience.length > 0)) && (
              <div className="bg-primary rounded-xl p-8 md:p-10 text-on-primary w-full flex flex-col justify-center">
                {profile.vision && (
                  <div className="mb-8">
                    <h2 className="font-headline-md text-2xl mb-4 text-on-primary font-bold">
                      Vision
                    </h2>
                    <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                      {profile.vision}
                    </p>
                  </div>
                )}

                {profile.experience && profile.experience.length > 0 && (
                  <div>
                    <h2 className="font-headline-md text-2xl mb-6 text-on-primary font-bold">
                      Experience
                    </h2>
                    <ul className="space-y-4">
                      {profile.experience.map((exp, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-secondary-fixed text-xl mt-0.5 shrink-0">
                            work_history
                          </span>
                          <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                            {exp}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      {profile?.biography && (
        <section className="w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-secondary rounded-full" />
            <h2 className="font-headline-md text-3xl text-primary">
              My Story
            </h2>
          </div>
          <div className="font-body-lg text-body-lg text-on-surface-variant max-w-full whitespace-pre-wrap leading-relaxed">
            {profile.biography}
          </div>
        </section>
      )}

      {/* Education & Achievements */}
      {((profile?.education && profile.education.length > 0) || (profile?.achievements && profile.achievements.length > 0)) && (
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {profile.education && profile.education.length > 0 && (
              <Card className="bg-surface-container-low border-surface-container-highest shadow-none flex flex-col h-full p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-secondary text-2xl">school</span>
                  <h3 className="font-headline-md text-xl text-primary m-0">Education</h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {profile.education.map((edu, i) => (
                    <li key={i} className="flex gap-3 items-start text-on-surface-variant font-body-md">
                      <span className="material-symbols-outlined text-lg mt-1 text-primary shrink-0">check_circle</span>
                      <span className="leading-relaxed">{edu}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {profile.achievements && profile.achievements.length > 0 && (
              <Card className="bg-surface-container-low border-surface-container-highest shadow-none flex flex-col h-full p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-secondary text-2xl">emoji_events</span>
                  <h3 className="font-headline-md text-xl text-primary m-0">Achievements</h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {profile.achievements.map((ach, i) => (
                    <li key={i} className="flex gap-3 items-start text-on-surface-variant font-body-md">
                      <span className="material-symbols-outlined text-lg mt-1 text-primary shrink-0">stars</span>
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

