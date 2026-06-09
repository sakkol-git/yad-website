import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function EventCTA() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto bg-primary-container rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-display-lg text-headline-lg md:text-display-lg text-primary-fixed mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-10">
            Whether you want to volunteer on the ground, lend your skills, or
            support our initiatives financially, there&apos;s a place for you in
            our movement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="rounded-full shadow-ambient hover:scale-105 bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim"
              asChild
            >
              <Link href="/get-involved">Join Our Next Event</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-primary-fixed text-primary-fixed hover:bg-primary-fixed hover:text-primary"
              asChild
            >
              <Link href="/about">Become a Member</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
      </div>
    </section>
  );
}
