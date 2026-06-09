import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div id="main-content" className="flex-grow bg-surface-container-lowest">
        {children}
      </div>
      <Footer />
    </div>
  );
}
