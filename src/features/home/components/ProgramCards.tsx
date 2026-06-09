import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";

export function ProgramCards() {
  return (
    <section className="relative z-20 -mt-32 pb-section-gap px-margin-mobile md:px-margin-desktop">

      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <Card className="bg-surface/80 backdrop-blur-xl border-white/20 hover:scale-[1.02] shadow-ambient">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <div className="w-32 h-32 rounded-[2rem] overflow-hidden mb-6 bg-tertiary-fixed-dim relative">
              <Image
                alt="Students learning"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTLzd98MENEAX7n9WzRktKw-t5RPHLOm2jmWn-Oi2dgB82jaNfiVBH1jBoZeOcw49AsSFQTq8TvcUqBRk5N8ptJbHcQ0hKz4ihuovBgl56Njuzj7lgAOYjhFDdjKKQxBlB-crwCZXqNgv7-KCW8hIlvtxMzvxY4ZQ0NPBNzr3I4VCuUTLhDvSYA_Or7GMMv45V6RzhPjR9JoWK3p7lx8IG8maRxaKLkp1zX7dTSal8t_rifu4Z9twTvCkh71bjwOj1Fl1nx_3Bbww"
                fill
                sizes="128px"
              />
            </div>
            <h3 className="font-headline-md text-headline-md text-tertiary mb-3">
              DYTP
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Developing youth leadership through hands-on community projects.
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="bg-secondary-container/40 backdrop-blur-xl border-white/30 hover:scale-[1.02] shadow-ambient md:-translate-y-8">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <div className="w-32 h-32 rounded-[2rem] overflow-hidden mb-6 bg-secondary-fixed relative">
              <Image
                alt="Digital Innovation"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2VlUxGH4RSXa6CI3tPIyKBNHlQRsoULh201t5dVYWaoRr3fHIcO5wLzJlBayLovjO4oqZEJ01aiQRdsiAuRyfcjmMz1FZxoLdxQwITZEjSG9rmz8R62I8j0rHhnEk2YZve4KQVjOJljRxnucOBm-cH1Suw9H42os_2zxA66ol-ZmogT71Oop-noB6BI1uymWBhHt0LWgXs51QpfkU9Afkst2XMHrAvtxY0ytZ770W5-UHOQXqSysJ83-IAKJea2fQcntqUZY7SgQ"
                fill
                sizes="128px"
              />
            </div>
            <h3 className="font-headline-md text-headline-md text-secondary mb-3">
              Digital Innovation
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Equipping the next generation with modern technological skills.
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="bg-surface/80 backdrop-blur-xl border-white/20 hover:scale-[1.02] shadow-ambient">
          <CardContent className="flex flex-col items-center text-center p-8 pt-8">
            <div className="w-32 h-32 rounded-[2rem] overflow-hidden mb-6 bg-surface-variant relative">
              <Image
                alt="Slum Education"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBaNMPI6Trxc24nCe1kzwa5Uq_v-licmKyJ2PF6Eij4n5Pa8atF1UhRRCcEW3O3xE3NSXi5hdue5xNV6GqInMjmBkfycId7hbMSuwZ7NwTQqAjGr06sTpZi2l8UH0GlL5hIbRM53W8Pwq0tErvPpN5W2KXA29igIW4E9QwpWRlBSt0i85IMf3_Lp7twi3tb_mE0vgD-cJ5c067ghS_deXgId67BpACXVlWMDiUjz6vTrqMvXyLFv4pMdxsSc_N9yAF8UNbrAgol-A"
                fill
                sizes="128px"
              />
            </div>
            <h3 className="font-headline-md text-headline-md text-primary-container mb-3">
              Slum Education
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Providing accessible learning resources to marginalized areas.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
