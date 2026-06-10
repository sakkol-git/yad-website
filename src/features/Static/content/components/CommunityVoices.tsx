import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/shared/components/ui/Card";

export function CommunityVoices() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[150vw] max-w-[500px] aspect-square bg-tertiary-container/30 rounded-full blur-3xl -z-10 -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-0 right-0 w-[180vw] max-w-[600px] aspect-square bg-secondary-container/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4" />

      <div className="max-w-container-max mx-auto text-center mb-16">
        <span className="text-tertiary font-label-bold text-label-bold tracking-wider uppercase mb-2 block">
          Community Voices
        </span>
        <h2 className="font-headline-lg text-headline-lg text-primary max-w-2xl mx-auto">
          Hear from the Future Leaders
        </h2>
      </div>


      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-surface border border-surface-variant relative">
          <CardContent className="p-8 pt-8">
            <span className="material-symbols-outlined absolute top-8 right-8 text-4xl text-tertiary/20">
              format_quote
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 relative z-10 italic">
              &quot;The digital literacy program completely changed my trajectory.
              I now have the skills to build websites and help local businesses
              transition online.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-tertiary-container relative">
                <Image
                  alt="Student portrait"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrmll8Ox4yLR_A96EtrVfUjXG303n5S9p0Vd8uBWxu2uncOy03Y6Sl5-OP0HDRl6ypNwB4veePc3teSn8cGXn6UQpNQgOjOiRayXPbOTT-Ckp1Blfs843OJ92NAkiAvaUgsYHABPJzMgNH7o_8t5-36xdzgNNdoN_WhbZLBxVhYw8a9GqkTN08LHwLIlQSdWoCjDkAs0pfWjSAiljtSsZxfM5V-famwTHS7C939LuM1dClWTJGjVO0unT1c2SptWZyXIkYDZ1LPDY"
                  fill
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-label-bold text-label-bold text-on-surface">
                  Sokhem
                </div>
                <div className="font-body-md text-body-md text-sm text-on-surface-variant">
                  Alumni, 2023 Cohort
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface border border-surface-variant relative md:translate-y-8">
          <CardContent className="p-8 pt-8">
            <span className="material-symbols-outlined absolute top-8 right-8 text-4xl text-secondary/20">
              format_quote
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 relative z-10 italic">
              &quot;Living in the YAD dormitory provided me the safe space and
              community I needed to focus entirely on my university studies.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-container relative">
                <Image
                  alt="Student portrait"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2VPV_SuqYIeYFDMOEBPtY0Xf9DBRzRJNx98guhouC6p5KRnWcQl9cr3Uu6cKuRAVMqCkcUkAfb3Bz6U_cGMUnRLu5xxT4Lnf5eeZCFtxuaP4fIM5p31HPaVwZFmp2MGKCPVt5h52NJ4NqGLan1khIF9KqY4Ytu20MrVvqV4ZPxqg57cc5xXb_Owia7v54Pu5SYJiXlJa4L3VPf4C2cjdj8zSqR4DJ79xi0teNc8oZ_YDYE5IQhzbnr-Cvr5qCoAfQqG3lHxE_z8"
                  fill
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-label-bold text-label-bold text-on-surface">
                  Charya
                </div>
                <div className="font-body-md text-body-md text-sm text-on-surface-variant">
                  Current Resident
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-20 text-center">
        <Link
          className="inline-flex items-center gap-2 text-primary hover:text-secondary font-label-bold transition-colors pb-1 border-b-2 border-primary/20 hover:border-secondary"
          href="/member-profile"
        >
          Read more student stories
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
