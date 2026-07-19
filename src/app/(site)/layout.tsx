import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkipToContent from "@/components/ui/SkipToContent";
import { getSiteSettings } from "@/lib/actions";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <>
      <SkipToContent />
      <Navbar settings={settings} />
      <main id="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
