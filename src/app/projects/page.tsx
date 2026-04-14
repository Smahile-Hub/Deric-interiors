import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";

import { ProjectsExperience } from "./ProjectsExperience";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "A visual narrative of architectural transformations - from bespoke kitchens to heritage manors. Explore Dric Interior's curated portfolio.",
  pathname: "/projects",
});

export type Project = {
  id: string;
  title: string;
  excerpt: string;
  category: "Residential" | "Commercial" | "Workplace";
  image: string;
  imageAlt: string;
  size: "large" | "medium" | "small";
};

const projects: Project[] = [
  {
    id: "kitchen-cabinet-0503",
    title: "Kitchen Cabinet 0503",
    excerpt:
      "A seamlessly designed kitchen featuring premium cabinetry, marble countertops, and integrated ambient lighting for a refined culinary space.",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Modern kitchen with marble countertops and bespoke cabinetry",
    size: "large",
  },
  {
    id: "room-transformation",
    title: "Room Transformation",
    excerpt:
      "Complete transformation of a dated living space into a contemporary haven of warmth and layered sophistication.",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Transformed living room with warm accent lighting",
    size: "medium",
  },
  {
    id: "walk-in-closet-ikeja",
    title: "Walk-in Closet - Ikeja",
    excerpt:
      "A bespoke walk-in wardrobe system engineered for seamless organisation and understated elegance in every detail.",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Bespoke walk-in closet with integrated storage and lighting",
    size: "large",
  },
  {
    id: "small-space-closet",
    title: "Small Space Closet",
    excerpt:
      "Maximising function and beauty within a compact closet through thoughtful spatial planning and material craft.",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Compact closet with intelligent storage solutions",
    size: "small",
  },
  {
    id: "stone-wall-featuring",
    title: "Stone Wall Featuring",
    excerpt:
      "A dramatic natural stone feature wall that defines the entire character of this private residence living area.",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Natural stone feature wall in a luxury living space",
    size: "large",
  },
  {
    id: "executive-suite-vi",
    title: "Executive Suite - V.I.",
    excerpt:
      "High-specification commercial office transformation balancing productivity with refined material excellence and spatial clarity.",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Executive office suite with premium finishes and ambient lighting",
    size: "medium",
  },
];

export default function ProjectsPage() {
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
      <ProjectsExperience projects={projects} />
    </>
  );
}
