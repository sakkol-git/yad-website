import DonateHeader from "@/components/layout/DonateHeader";
import Footer from "@/components/layout/Footer";

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <DonateHeader />
      <div id="main-content" className="flex-grow bg-surface-container-lowest">
        {children}
      </div>
      <Footer variant="minimal" />
    </div>
  );
}
