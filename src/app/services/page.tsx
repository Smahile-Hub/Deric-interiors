import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";

import { ServicesExperience } from "./ServicesExperience";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Discover Dric Interior's full spectrum of luxury atelier services - bespoke furniture, wall and window covering, exterior design, and more.",
  pathname: "/services",
});

const stats = [
  { value: "1,501", label: "Projects Completed" },
  { value: "18", label: "Years of Experience" },
  { value: "1,500", label: "Happy Clients" },
  { value: "16,200", label: "Cups of Coffee" },
];

const services = [
  {
    id: "furniture-fittings",
    number: "01",
    title: "Furniture & Fittings",
    description:
      "Bespoke furniture design and meticulous material selection, crafted to harmonise with your architectural context and personal narrative.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Curated furniture in a refined residential interior",
    wide: true,
  },
  {
    id: "window-covering",
    number: "02",
    title: "Window Covering",
    description:
      "Precision-tailored treatments that modulate natural light and frame every view with intention.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Window treatment in a refined interior",
    wide: false,
  },
  {
    id: "wall-covering",
    number: "03",
    title: "Wall Covering",
    description:
      "Textural narratives rendered through artisanal wallpapers, plasters, and specialist paint finishes.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Textured wall finish in a refined interior",
    wide: false,
  },
  {
    id: "exterior-design",
    number: "04",
    title: "Exterior Design",
    description:
      "Holistic exterior visions that extend the interior character outward, creating a seamless dialogue between inside and out.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Exterior architecture with interior-grade detail",
    wide: true,
  },
  {
    id: "signage-identity",
    number: "05",
    title: "Signage & Identity",
    description:
      "Custom environmental branding and wayfinding systems crafted for commercial and hospitality spaces.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Environmental branding in a commercial interior",
    wide: false,
  },
  {
    id: "ceiling-covering",
    number: "06",
    title: "Ceiling Covering",
    description:
      "The often-overlooked fifth wall, transformed through coffered details, acoustic panels, and bespoke plasterwork.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Bespoke ceiling detail in a luxury interior",
    wide: true,
  },
];

const serviceRows = services.reduce<Array<(typeof services)[number][]>>(
  (rows, service, index) => {
    if (index % 2 === 0) {
      rows.push([service]);
      return rows;
    }

    rows[rows.length - 1].push(service);
    return rows;
  },
  [],
);

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "A deep-dive consultation to understand your vision, lifestyle, and the unique character of your space.",
  },
  {
    number: "02",
    title: "Design Concept",
    description:
      "Mood boards, spatial plans, and material palettes developed and refined until every detail resonates.",
  },
  {
    number: "03",
    title: "Procurement",
    description:
      "We source and commission every element - from bespoke furniture to specialist finishes - with precision.",
  },
  {
    number: "04",
    title: "Execution",
    description:
      "Our project team oversees every stage of installation with meticulous attention to detail and craft.",
  },
];

export default function ServicesPage() {
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
      <ServicesExperience
        stats={stats}
        serviceRows={serviceRows}
        processSteps={processSteps}
      />
    </>
  );
}
