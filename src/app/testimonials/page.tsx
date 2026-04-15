import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getTestimonialsPageContent } from "@/lib/page-content";

import { TestimonialsExperience } from "./TestimonialsExperience";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials",
  description:
    "An intimate look into the experiences of those who have invited the Dric Interior aesthetic into their private sanctuaries.",
  pathname: "/testimonials",
});

export default async function TestimonialsPage() {
  const page = await getTestimonialsPageContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Client Testimonials - Dric Interior",
    description:
      "Read what our clients say about their transformative experiences with Dric Interior.",
    url: toAbsoluteUrl("/testimonials"),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <TestimonialsExperience page={page} />
    </>
  );
}
