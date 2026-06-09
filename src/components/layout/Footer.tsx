import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/constants/navigation";
import { COPYRIGHT_TEXT } from "@/constants/site";

interface FooterProps {
  variant?: "full" | "minimal" | "rich";
}

export default function Footer({ variant = "full" }: FooterProps) {
  if (variant === "minimal") {
    return (
      <footer className="w-full py-8 text-center bg-surface-container-lowest border-t border-surface-variant text-on-surface-variant font-body-md text-body-md text-sm">
        <p>{COPYRIGHT_TEXT}</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="#" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Terms
          </Link>
          <Link href="/get-involved" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-highest rounded-t-lg mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-12 gap-8 w-full max-w-container-max mx-auto">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <Image
              src="/assets/Images/yad_logo.png"
              alt="YAD Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-headline-md text-headline-md font-bold text-primary">
              YAD
            </span>
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left">
            {COPYRIGHT_TEXT}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
