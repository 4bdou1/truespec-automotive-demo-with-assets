import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublicListing, getPublicListings, getPublicSettings } from "@/lib/api/public";
import { Container } from "@/components/ui/container";
import { VehicleGallery } from "@/components/public/vehicle-gallery";
import { VehicleSpecs, VehicleFeatures } from "@/components/public/vehicle-specs";
import { VehicleCta } from "@/components/public/vehicle-cta";
import { VehicleGrid } from "@/components/public/vehicle-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChevronLeftIcon } from "@/components/ui/icons";

interface RouteParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getPublicListing(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  const title = [vehicle.year, vehicle.brand, vehicle.model].filter(Boolean).join(" ");
  return {
    title,
    description: vehicle.publicNote ?? `${title} available through TrueSpec Automotive.`,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const [vehicle, settings] = await Promise.all([getPublicListing(slug), getPublicSettings()]);

  if (!vehicle) notFound();

  const title = [vehicle.year, vehicle.brand, vehicle.model].filter(Boolean).join(" ");

  const related = (await getPublicListings({ status: "all" }))
    .filter((v) => v.id !== vehicle.id)
    .slice(0, 3);

  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-14">
      <Link
        href="/inventory"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-strong hover:text-gold"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to inventory
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-6">
          <VehicleGallery photos={vehicle.photos} title={title} />

          <div>
            <h1 className="font-display text-3xl uppercase tracking-wide text-foreground sm:text-4xl">
              {title}
            </h1>
            {vehicle.trim && <p className="mt-1 text-muted-strong">{vehicle.trim}</p>}
          </div>

          <section>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Specifications
            </h2>
            <VehicleSpecs vehicle={vehicle} />
          </section>

          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Features
            </h2>
            <VehicleFeatures features={vehicle.features} />
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <VehicleCta vehicle={vehicle} whatsappNumber={settings.whatsappNumber} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="flex flex-col gap-6 border-t border-border pt-10">
          <SectionHeading eyebrow="Continue browsing" title="More from the showroom" />
          <VehicleGrid vehicles={related} />
        </section>
      )}
    </Container>
  );
}
