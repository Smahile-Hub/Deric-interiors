import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getAboutPageContent } from "@/lib/page-content";

import { AboutExperience } from "./AboutExperience";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Meet the team behind Dric Interior - where architectural precision meets soulful artistry. Our story, values, and legacy of excellence.",
  pathname: "/about",
});

export default async function AboutPage() {
  const page = await getAboutPageContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Dric Interior",
    description:
      "Meet the team behind Dric Interior - where architectural precision meets soulful artistry.",
    url: toAbsoluteUrl("/about"),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <AboutExperience page={page} />
    </>
  );
}
