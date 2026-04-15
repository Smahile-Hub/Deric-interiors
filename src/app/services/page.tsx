import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getServicesPageContent } from "@/lib/page-content";

import { ServicesExperience } from "./ServicesExperience";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Discover Dric Interior's full spectrum of luxury atelier services - bespoke furniture, wall and window covering, exterior design, and more.",
  pathname: "/services",
});

export default async function ServicesPage() {
  const page = await getServicesPageContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dric Interior Design Services",
    description:
      "Full-spectrum luxury atelier interior and exterior design services",
    provider: {
      "@type": "Organization",
      name: "Dric Interior",
    },
    url: toAbsoluteUrl("/services"),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ServicesExperience page={page} />
    </>
  );
}
