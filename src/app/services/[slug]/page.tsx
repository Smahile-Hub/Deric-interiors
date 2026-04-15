import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getServiceDetailPageContent } from "@/lib/page-content";
import type { ServiceDetailPageContent } from "@/types/site";

import { ServiceDetailExperience } from "./ServiceDetailExperience";

export type ServiceData = ServiceDetailPageContent;

const serviceSlugs = [
  "furniture-fittings",
  "window-covering",
  "wall-covering",
  "exterior-design",
  "signage-identity",
  "ceiling-covering",
] as const;

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetailPageContent(slug);

  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.overview.slice(0, 155),
    pathname: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceDetailPageContent(slug);

  if (!service) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.overview.slice(0, 155),
    provider: {
      "@type": "Organization",
      name: "Dric Interior",
    },
    url: toAbsoluteUrl(`/services/${slug}`),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ServiceDetailExperience service={service} />
    </>
  );
}
