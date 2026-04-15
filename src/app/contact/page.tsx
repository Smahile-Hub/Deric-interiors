import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getContactPageContent } from "@/lib/page-content";

import { ContactExperience } from "./ContactExperience";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Begin your transformation. Book an initial consultation with Dric Interior and let us redefine the boundaries of your sanctuary.",
  pathname: "/contact",
});

export default async function ContactPage() {
  const page = await getContactPageContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Dric Interior",
    description:
      "Book an initial consultation with Dric Interior. We craft bespoke luxury interiors across Lagos and Abuja.",
    url: toAbsoluteUrl("/contact"),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ContactExperience page={page} />
    </>
  );
}
