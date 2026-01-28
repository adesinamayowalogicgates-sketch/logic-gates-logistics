import Navbar, { NAV_HEIGHT } from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]" style={{ scrollPaddingTop: NAV_HEIGHT }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
