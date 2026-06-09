import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section className="relative min-h-[921px] flex items-center pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden bg-surface-container-lowest">
      {/* Organic Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-80 gradient-mask">
        <Image
          alt="Vibrant, surreal landscape featuring lush green floating islands and cascading waterfalls in a bright, optimistic light mode aesthetic."
          className="w-full h-full object-cover object-top"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7GOyR80VjC-X1Ub4pIDl1VE7P9mizjHl3SabzE-sRskxNheAbfOI45-rL-bgwdwwpSVv0w5ua4HEKZVQJo_BRXKmYOnAzegHeyV973XmLDOgzHv0h9TujyevjELdUvAAxJNjAp3MpulKr4xrDdsSGNl6wicW1G6C8vYgKkK8hRWS1TWvODfwjhdAJ6q3xc66U59CdoxGXHFGCALD6_c_qx3MRT6S8g-ohGM81NkjmXfK30f7cZdHr9BL32PQwycwglgEutZnNqxQ"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-start">
          <h1 className="font-display-lg text-display-lg text-primary mb-6 drop-shadow-sm leading-tight">
            Empowering Cambodia&apos;s Youth to{" "}
            <span className="text-secondary">Lead Tomorrow</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
            Each small action you take today sets off a wave of positive
            change for the future of our communities. We are building a
            nurturing ecosystem for young changemakers to thrive in
            sustainable development.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary-container" size="lg" className="rounded-full gap-2 hover:scale-105">
              Our Approach
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
