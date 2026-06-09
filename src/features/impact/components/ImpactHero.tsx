import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function ImpactHero() {
  return (
    <section className="relative min-h-[819px] flex items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Lush green floating island with waterfalls and small wooden cabins against a bright sky, symbolizing a pristine, harmonious ecological future."
          className="w-full h-full object-cover object-right"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoLqoCSrowq2Yf-vb5xh4QQy0WD8shoo2Hre8iubOuxLqW30YajiVD0GdSBO7GvwzbM-U2dIjGn3ABUiQE2xo6vlEQRC5xcWbyMfV9p7xGcSVFD2wDqWoGZgmbu33H0MB396Q6V1lHVxUbyHZQrqIz6oYHOmTNZKtRTPAWCn2TCGt7-2NJlM3hvmdq-4JYSCjkYuIbxrjjVk2qWLYVe5qEO3OPaLFn4SMgGoG1Mxf3VyiSFbrxdBf_3wOutHWYIzC4xomqLmvAQ4w"
          fill
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 z-10 hero-gradient w-full md:w-3/4" />
      <div className="relative z-20 max-w-2xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-6 leading-tight">
          Metrics of <br />
          <span className="text-secondary">Change</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
          Every small action ripples outwards. Explore our real-time impact
          dashboard and the inspiring stories of young leaders driving
          sustainable development across communities.
        </p>
        <div className="flex gap-4">
          <Button variant="primary" size="lg" className="rounded-full gap-2 hover:scale-105 shadow-ambient">
            View Dashboard
            <span className="material-symbols-outlined">
              arrow_downward
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
