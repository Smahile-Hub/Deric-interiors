import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getPrivacyPolicyPageContent } from "@/lib/page-content";

import { PrivacyPolicyExperience } from "./PrivacyPolicyExperience";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read how Dric Interior collects, uses, and protects your information across consultations, design projects, and digital interactions.",
  pathname: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicyPageContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Privacy policy for Dric Interior covering information collection, usage, protection, and client rights.",
    url: toAbsoluteUrl("/privacy-policy"),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <PrivacyPolicyExperience page={page} />
    </>
  );
}
