import Link from "next/link";
import Image from "next/image";

export default function DonateHeader() {
  return (
    <header className="w-full py-6 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-b border-surface-variant flex justify-between items-center z-50">
      <Link
        href="/"
        className="flex items-center gap-3 text-primary font-headline-md text-headline-md group"
      >
        <Image
          src="/assets/Images/yad_logo.png"
          alt="YAD Logo"
          width={36}
          height={36}
          className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="font-bold">YAD Cambodia</span>
      </Link>
      <Link
        href="/donate"
        className="text-on-surface-variant hover:text-primary font-label-bold text-label-bold flex items-center gap-1 transition-colors"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Return to site
      </Link>
    </header>
  );
}
