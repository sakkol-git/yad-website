import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/Card";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
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
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <span className="inline-block border border-outline-variant/50 text-primary px-4 py-2 rounded-none font-bold text-[10px] tracking-widest uppercase bg-transparent">
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
                    className="w-10 h-10 border border-outline-variant/30 rounded-none bg-transparent flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-200"
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
                    className="w-10 h-10 border border-outline-variant/30 rounded-none bg-transparent flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-200"
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
                    className="w-10 h-10 border border-outline-variant/30 rounded-none bg-transparent flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-lg">
                      public
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-on-surface mb-6 leading-none">
            {member.name}
          </h1>
          <p className="text-lg font-light text-on-surface-variant mb-8 leading-relaxed max-w-3xl">
            {member.description}
          </p>

          {/* Elegant Blockquote style */}
          {profile?.quote && (
            <blockquote className="border-l border-primary pl-8 my-8 max-w-3xl text-left">
              <p className="text-2xl font-light text-on-surface tracking-tight leading-relaxed">
                &ldquo;{profile.quote}&rdquo;
              </p>
            </blockquote>
          )}
        </div>
      </section>

      <RevealOnScroll className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Left Column: Portrait */}
          <ImageRevealMask className="lg:col-span-5 relative w-full aspect-square rounded-none border border-outline-variant/30 overflow-hidden">
            <Image
              alt={`${member.name} — ${member.role} at YAD`}
              src={member.image}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top"
              priority
            />
          </ImageRevealMask>

          {/* Right Column: Vision & Experience block */}
          <div className="lg:col-span-7 flex">
            {(profile?.vision || (profile?.experience && profile.experience.length > 0)) && (
              <div className="bg-surface border border-outline-variant/30 rounded-none p-8 md:p-12 text-on-surface w-full flex flex-col justify-center">
                {profile.vision && (
                  <div className="mb-12">
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                      Vision
                    </h2>
                    <p className="text-lg font-light leading-relaxed">
                      {profile.vision}
                    </p>
                  </div>
                )}

                {profile.experience && profile.experience.length > 0 && (
                  <div>
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
                      Experience
                    </h2>
                    <ul className="space-y-6">
                      {profile.experience.map((exp, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="material-symbols-outlined text-primary text-xl shrink-0">
                            work_history
                          </span>
                          <p className="text-sm font-light leading-relaxed">
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
      </RevealOnScroll>

      {/* Biography Section */}
      {profile?.biography && (
        <RevealOnScroll className="w-full">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-light text-on-surface tracking-tight">
              My Story
            </h2>
          </div>
          <div className="text-sm font-light text-on-surface-variant max-w-4xl whitespace-pre-wrap leading-relaxed">
            {profile.biography}
          </div>
        </RevealOnScroll>
      )}

      {/* Education & Achievements */}
      {((profile?.education && profile.education.length > 0) || (profile?.achievements && profile.achievements.length > 0)) && (
        <section className="w-full">
          <StaggerGroup y={28} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-12">
            {profile.education && profile.education.length > 0 && (
              <div className="bg-surface border border-outline-variant/30 rounded-none flex flex-col h-full p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8 border-b border-outline-variant/30 pb-4">
                  <span className="material-symbols-outlined text-primary text-[24px]">school</span>
                  <h3 className="text-xl font-light text-on-surface m-0 tracking-tight">Education</h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {profile.education.map((edu, i) => (
                    <li key={i} className="flex gap-4 items-start text-on-surface-variant font-light text-sm">
                      <span className="material-symbols-outlined text-[16px] mt-1 text-primary shrink-0">check</span>
                      <span className="leading-relaxed">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.achievements && profile.achievements.length > 0 && (
              <div className="bg-surface border border-outline-variant/30 rounded-none flex flex-col h-full p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8 border-b border-outline-variant/30 pb-4">
                  <span className="material-symbols-outlined text-primary text-[24px]">emoji_events</span>
                  <h3 className="text-xl font-light text-on-surface m-0 tracking-tight">Achievements</h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {profile.achievements.map((ach, i) => (
                    <li key={i} className="flex gap-4 items-start text-on-surface-variant font-light text-sm">
                      <span className="material-symbols-outlined text-[16px] mt-1 text-primary shrink-0">stars</span>
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </StaggerGroup>
        </section>
      )}
    </div>
  );
}

