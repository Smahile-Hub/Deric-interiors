import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getProjectsPageContent } from "@/lib/page-content";
import type { ProjectsPageContent } from "@/types/site";

import { ProjectsExperience } from "./ProjectsExperience";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "A visual narrative of architectural transformations - from bespoke kitchens to heritage manors. Explore Dric Interior's curated portfolio.",
  pathname: "/projects",
});

export type Project = ProjectsPageContent["projects"][number];

export default async function ProjectsPage() {
  const page = await getProjectsPageContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dric Interior Projects Portfolio",
    description:
      "A curated gallery of bespoke interior design projects by Dric Interior.",
    url: toAbsoluteUrl("/projects"),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ProjectsExperience page={page} />
    </>
  );
}
