import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import { LenisProvider } from "@/shared/lib/animations/lenis-provider";
import { ScrollTriggerRefresh } from "@/shared/lib/animations/scroll-trigger-refresh";
import { PageTransition } from "@/shared/components/layout/PageTransition";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollTriggerRefresh />
        <Navbar />
        <main id="main-content" className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
