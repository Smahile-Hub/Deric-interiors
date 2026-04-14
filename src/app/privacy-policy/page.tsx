import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";

import { PrivacyPolicyExperience } from "./PrivacyPolicyExperience";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read how Dric Interior collects, uses, and protects your information across consultations, design projects, and digital interactions.",
  pathname: "/privacy-policy",
});

const collectionParagraphs = [
  "We collect information to provide a bespoke interior design experience. This includes personal identifiers such as your name, email address, and phone number when you inquire about our services.",
  "Additionally, we may collect project-specific details including floor plans, preferences, and aesthetic inspirations to facilitate our design process.",
];

const usageBullets = [
  "Communicating updates regarding your design project.",
  "Tailoring our portfolio presentations to match your style.",
  "Processing invoices and managing contractual agreements.",
];

export default function PrivacyPolicyPage() {
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
      <PrivacyPolicyExperience
        collectionParagraphs={collectionParagraphs}
        usageBullets={usageBullets}
      />
    </>
  );
}
