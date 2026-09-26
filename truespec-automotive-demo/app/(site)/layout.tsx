import { getPublicSettings } from "@/lib/api/public";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getPublicSettings();

  return (
    <>
      <SiteHeader whatsappNumber={settings.whatsappNumber} tagline={settings.tagline} />
      <main className="flex-1">{children}</main>
      <SiteFooter whatsappNumber={settings.whatsappNumber} tagline={settings.tagline} />
    </>
  );
}
