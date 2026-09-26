import type { Metadata } from "next";
import { getPublicListings, getPublicSettings } from "@/lib/api/public";
import { Hero } from "@/components/public/hero";
import { StatusNavTiles } from "@/components/public/status-nav-tiles";
import { FeaturedVehicles } from "@/components/public/featured-vehicles";
import { CtaBand } from "@/components/public/cta-band";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import type { VehicleStatus } from "@/lib/types/public";

export const metadata: Metadata = {
  title: "TrueSpec Automotive — Imported vehicles, verified from source",
};

export default async function HomePage() {
  const [settings, vehicles] = await Promise.all([
    getPublicSettings(),
    getPublicListings(),
  ]);

  const counts: Record<VehicleStatus, number> = {
    available: vehicles.filter((v) => v.status === "available").length,
    "on-order": vehicles.filter((v) => v.status === "on-order").length,
    landed: vehicles.filter((v) => v.status === "landed").length,
  };

  const featured = [...vehicles]
    .sort((a, b) => Number(a.isDemo) - Number(b.isDemo))
    .slice(0, 3);

  return (
    <>
      <Hero tagline={settings.tagline} whatsappNumber={settings.whatsappNumber} />

      <Container className="flex flex-col gap-16 py-14 sm:py-20">
        <StatusNavTiles counts={counts} />

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="In the showroom"
            title="Featured Imports"
            description="A closer look at what's currently sourced, shipped, and ready to talk about."
          />
          <FeaturedVehicles vehicles={featured} />
        </section>

        <CtaBand tagline={settings.tagline} whatsappNumber={settings.whatsappNumber} />
      </Container>
    </>
  );
}
