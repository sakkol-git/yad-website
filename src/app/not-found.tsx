import Link from "next/link";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { Button } from "@/shared/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <RevealOnScroll className="relative z-10 w-full max-w-lg mx-auto text-center">
        <div className="bg-surface/60 backdrop-blur-xl shadow-ambient border border-outline-variant/30 p-12 md:p-16">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-4xl text-primary" aria-hidden="true">
              explore_off
            </span>
          </div>

          <h1 className="text-[6rem] md:text-[8rem] font-light text-primary leading-none tracking-tighter mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-light text-on-surface tracking-tight mb-4">
            Page Not Found
          </h2>

          <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-10">
            This page has moved or doesn&apos;t exist yet. Let&apos;s get you back on track.
          </p>

          <Button
            asChild
            variant="default"
            size="lg"
            className="w-full bg-primary text-white rounded-md kicker-label h-14 hover:bg-primary/90 transition-colors duration-150"
          >
            <Link href="/">
              <span className="material-symbols-outlined text-base mr-2" aria-hidden="true">
                home
              </span>
              Return Home
            </Link>
          </Button>
        </div>
      </RevealOnScroll>
    </main>
  );
}
