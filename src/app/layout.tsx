import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yad-cambodia.org"),
  title: {
    default: "YAD — Youth Advancement for Development",
    template: "%s — YAD",
  },
  description:
    "Empowering Cambodia's youth to lead tomorrow through education, technology, and community programs.",
  keywords: [
    "Youth Development Cambodia",
    "Education NGO Cambodia",
    "Cambodia Tech",
    "YAD Cambodia",
    "Youth Empowerment",
    "Cambodia Community Programs",
  ],
  authors: [{ name: "YAD Cambodia" }],
  creator: "YAD Cambodia",
  publisher: "Youth Advancement for Development",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "km-KH": "/km-KH",
    },
  },
  openGraph: {
    title: "YAD — Youth Advancement for Development",
    description: "Empowering Cambodia's youth to lead tomorrow through education, technology, and community programs.",
    url: "/",
    siteName: "YAD Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/yad_logo.png",
        width: 1200,
        height: 630,
        alt: "YAD Cambodia Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YAD — Youth Advancement for Development",
    description: "Empowering Cambodia's youth to lead tomorrow through education, technology, and community programs.",
    creator: "@YADCambodia",
    site: "@YADCambodia",
    images: ["/assets/images/yad_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/images/yad_logo.png",
    shortcut: "/assets/images/yad_logo.png",
    apple: "/assets/images/yad_logo.png",
  },
  appleWebApp: {
    title: "YAD Cambodia",
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    google: "google-site-verification-code-here", // Placeholder
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Youth Advancement for Development",
  alternateName: "YAD Cambodia",
  url: "https://yad-cambodia.org",
  logo: "https://yad-cambodia.org/assets/images/yad_logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+855-99-332-289",
    email: "jc.acekh@gmail.com",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61571829685466",
    "https://t.me/Youthadvancementfordevelopment",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} bg-surface text-on-surface font-body-md antialiased overflow-x-hidden`}
        style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-lg"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
