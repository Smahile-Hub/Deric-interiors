import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";

import { AboutExperience } from "./AboutExperience";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Meet the team behind Dric Interior - where architectural precision meets soulful artistry. Our story, values, and legacy of excellence.",
  pathname: "/about",
});

const milestones = [
  {
    value: "18+",
    label: "Years of Excellence",
    description:
      "Two decades of perfecting the art of luxury living through dedicated research and design.",
    highlighted: false,
  },
  {
    value: "1500+",
    label: "Successful Projects",
    description:
      "From private penthouses to boutique resorts, our portfolio spans continents and styles.",
    highlighted: true,
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    description:
      "Every project closes with a satisfied client - our most important measure of success.",
    highlighted: false,
  },
];

const values = [
  {
    number: "01",
    title: "Bespoke Curation",
    description:
      "Every project begins with deep listening - understanding your vision and aspirations to craft a space uniquely yours.",
  },
  {
    number: "02",
    title: "Material Mastery",
    description:
      "We source only the world's finest materials - natural stone, bespoke textiles, and artisan finishes that speak to quality.",
  },
  {
    number: "03",
    title: "Ethical Craft",
    description:
      "Beauty and responsibility coexist. We choose sustainable sources and skilled craftspeople who share our values.",
  },
  {
    number: "04",
    title: "Soulful Living",
    description:
      "A great interior transcends aesthetics - it nourishes daily life, creating environments that feel as good as they look.",
  },
];

export default function AboutPage() {
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
      <AboutExperience milestones={milestones} values={values} />
    </>
  );
}
