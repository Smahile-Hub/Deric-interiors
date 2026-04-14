import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";

import { ServiceDetailExperience } from "./ServiceDetailExperience";

export type ServiceData = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
  overview: string;
  highlights: { title: string; description: string }[];
  process: { step: string; title: string; body: string }[];
  gallery: { src: string; alt: string; caption: string }[];
  closingStatement: string;
};

const servicesData: Record<string, ServiceData> = {
  "furniture-fittings": {
    id: "furniture-fittings",
    number: "01",
    title: "Furniture & Fittings",
    tagline: "Objects that hold the room and the memory.",
    heroImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Bespoke furniture in a refined residential interior",
    overview:
      "Every object in a room carries weight — not merely in mass, but in meaning. Our furniture and fittings service is rooted in a philosophy of craft over commodity. We design and source pieces that exist in precise dialogue with the architecture, light, and lives that inhabit a space. From the curve of a sofa arm to the grain direction of a dining table, each decision is made with the whole room in mind.",
    highlights: [
      {
        title: "Bespoke Design",
        description:
          "Custom furniture conceived from scratch — scaled, proportioned, and detailed to suit your exact spatial and aesthetic brief.",
      },
      {
        title: "Material Curation",
        description:
          "Leathers, velvets, marbles, solid timbers, and hand-forged metals — sourced from artisan suppliers and specialist mills worldwide.",
      },
      {
        title: "FF&E Procurement",
        description:
          "We manage the full furniture, fixtures, and equipment specification process — budgeting, supplier coordination, and delivery logistics included.",
      },
      {
        title: "Residential & Commercial",
        description:
          "Whether a private penthouse or a luxury boutique hotel, our approach maintains the same exacting standard of finish and intent.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Brief & Measure",
        body: "We begin with a thorough site measure and a conversation about how you live, work, and move through the space — capturing dimensions and desires simultaneously.",
      },
      {
        step: "02",
        title: "Design Development",
        body: "Sketches, 3D models, and material samples are developed and refined until each piece is fully resolved — before a single workshop order is placed.",
      },
      {
        step: "03",
        title: "Workshop & Fabrication",
        body: "Pieces are commissioned through our network of vetted craftspeople — from furniture-makers in the UK to upholstery ateliers on the continent.",
      },
      {
        step: "04",
        title: "Installation & Styling",
        body: "Our team oversees white-glove delivery and placement, followed by a final styling pass to ensure every element reads as intended.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
        alt: "Marble dining table with sculptural chairs",
        caption: "Bespoke dining collection — private residence, Lagos",
      },
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
        alt: "Custom upholstered sofa in a warm living room",
        caption: "Custom lounge furniture — hospitality suite, Abuja",
      },
      {
        src: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=900&q=80",
        alt: "Solid timber shelving unit with brass fittings",
        caption: "Bespoke shelving & cabinetry — executive office, Victoria Island",
      },
    ],
    closingStatement:
      "Furniture is not decoration — it is the architecture of daily life. We build pieces that last beyond trends and outlive fashion.",
  },

  "window-covering": {
    id: "window-covering",
    number: "02",
    title: "Window Covering",
    tagline: "Every view deserves a frame worthy of it.",
    heroImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Precision-tailored drapes in a luxury interior",
    overview:
      "Light is the most transformative material in any interior. Our window covering service approaches curtains, blinds, and treatments not as afterthoughts, but as primary architectural elements. We modulate sunlight, frame external views, and add layers of warmth and texture — all while ensuring seamless mechanical function and longevity of fabric and fixings.",
    highlights: [
      {
        title: "Bespoke Drapes & Curtains",
        description:
          "Floor-to-ceiling, hand-pleated, and precisely tracked — from sheer linens that breathe with the room to heavy silks that anchor it.",
      },
      {
        title: "Roller & Roman Blinds",
        description:
          "Clean-lined fabric systems engineered for precision control of light and privacy, available in motorised configurations.",
      },
      {
        title: "Motorisation & Smart Integration",
        description:
          "Lutron, Somfy, and custom motor systems integrated with your building management or smart home platform.",
      },
      {
        title: "Fabric Sourcing",
        description:
          "We work with premier fabric houses — Dedar, Rubelli, Zimmer + Rohde, and independent weavers — to source materials unavailable in the retail market.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Light Study",
        body: "We assess how natural light moves through your space at different times of day — informing opacity, colour, and fabric weight choices.",
      },
      {
        step: "02",
        title: "Specification",
        body: "Track type, heading style, lining, and interlining are specified alongside fabric — all decisions made with both aesthetics and thermal performance in mind.",
      },
      {
        step: "03",
        title: "Making & Fitting",
        body: "All treatments are made to measure by our specialist workrooms and installed by experienced fitters who leave no hem, no crease, and no gap.",
      },
      {
        step: "04",
        title: "Commissioning",
        body: "Motorised systems are commissioned and tested on-site, with a handover session covering full operation and maintenance.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        alt: "Sheer linen curtains in a bright bedroom",
        caption: "Sheer linen drapes — master bedroom, Ikoyi",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
        alt: "Rich velvet curtains in a formal living room",
        caption: "Hand-pleated velvet curtains — formal sitting room, Lekki",
      },
      {
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        alt: "Roman blinds in a contemporary kitchen",
        caption: "Motorised roman blinds — open-plan kitchen, Banana Island",
      },
    ],
    closingStatement:
      "The right window treatment does not just dress a window — it defines the mood of the entire room from morning light to candlelit evening.",
  },

  "wall-covering": {
    id: "wall-covering",
    number: "03",
    title: "Wall Covering",
    tagline: "The surface is the atmosphere.",
    heroImage:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Artisanal wall covering in a refined interior",
    overview:
      "Walls are not boundaries — they are the primary sensory canvas of a room. Our wall covering service moves far beyond paint and standard wallpaper. We deploy artisanal techniques, specialist finishes, and curated materials to create surfaces that reward close inspection, change under different light, and anchor a room's identity with quiet authority.",
    highlights: [
      {
        title: "Specialist Paint Finishes",
        description:
          "Limewash, colour-washed plaster, lacquered surfaces, and bespoke hues mixed to exact specification — applied by specialist decorators.",
      },
      {
        title: "Artisanal Wallpaper",
        description:
          "Hand-printed, embossed, fabric-backed, and grasscloth papers sourced from leading houses including de Gournay, Fornasetti, and Arte.",
      },
      {
        title: "Venetian & Microcement Plaster",
        description:
          "Applied plasters that create depth, texture, and a tactile quality no flat paint can replicate — suitable for wet rooms and living areas alike.",
      },
      {
        title: "Stone & Tile Cladding",
        description:
          "Travertine, marble, slate, and handmade ceramic applied as wall cladding for feature walls, entrance halls, and bathrooms.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Surface Assessment",
        body: "We evaluate the existing substrate — identifying any preparation work required before a covering can be applied to the standard our finishes demand.",
      },
      {
        step: "02",
        title: "Material Selection",
        body: "Sample boards are prepared and viewed in your actual space under your actual light — because a sample in a showroom lies about how it will perform at home.",
      },
      {
        step: "03",
        title: "Application",
        body: "Specialist applicators — plasterers, paperhangers, and tilers from our trusted trades network — carry out the work with precision and care.",
      },
      {
        step: "04",
        title: "Finish & Protect",
        body: "Appropriate sealants, wax finishes, and maintenance protocols are applied and communicated to ensure long-term beauty and durability.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
        alt: "Limewash finish in a warm living room",
        caption: "Limewash plaster finish — living room feature wall, Ikoyi",
      },
      {
        src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80",
        alt: "Grasscloth wallpaper in a study",
        caption: "Grasscloth wallcovering — home study, Lekki Phase 1",
      },
      {
        src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80",
        alt: "Marble wall cladding in a bathroom",
        caption: "Bookmatched marble cladding — principal bathroom, Banana Island",
      },
    ],
    closingStatement:
      "A wall that is merely painted is a wall that is merely functional. We make walls that tell the story of a space from the moment you enter the room.",
  },

  "exterior-design": {
    id: "exterior-design",
    number: "04",
    title: "Exterior Design",
    tagline: "The outside is part of the story.",
    heroImage:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Refined exterior architecture with landscape design",
    overview:
      "The boundary between inside and outside is a fiction in great design. Our exterior design service ensures the visual character, material language, and spatial quality of the interior extends seamlessly beyond the threshold. We design terraces, facades, landscapes, and external lighting schemes that are as considered as every room within.",
    highlights: [
      {
        title: "Facade Design & Cladding",
        description:
          "Material specification and design development for building exteriors — from natural stone and timber to render, metal, and composite panels.",
      },
      {
        title: "Landscape & Planting Design",
        description:
          "Formal and naturalistic planting schemes, hardscape design, and pool surrounds that create a curated outdoor living environment.",
      },
      {
        title: "Terrace & Outdoor Living",
        description:
          "External furniture selection, shade structures, outdoor kitchens, and flooring materials specified for beauty and weather resilience.",
      },
      {
        title: "Exterior Lighting",
        description:
          "Architectural lighting schemes that extend usability into evening hours and illuminate the building's character after dark.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Site Analysis",
        body: "We study orientation, microclimate, neighbouring context, and existing landscape features before developing any design proposal.",
      },
      {
        step: "02",
        title: "Concept Design",
        body: "A holistic concept is developed that considers facade character, planting strategy, circulation, and the visual relationship with the interior.",
      },
      {
        step: "03",
        title: "Technical Development",
        body: "Detailed drawings, material specifications, and planting schedules are produced for contractor tender and client approval.",
      },
      {
        step: "04",
        title: "Works Oversight",
        body: "We maintain site presence during critical phases to ensure material selections, planting positions, and finish quality meet the design intent.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80",
        alt: "Landscaped pool terrace with external furniture",
        caption: "Pool terrace and landscape — private residence, Lekki",
      },
      {
        src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
        alt: "Natural stone facade with illuminated entrance",
        caption: "Stone facade and lighting — residential villa, Abuja",
      },
      {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        alt: "Covered terrace with outdoor seating",
        caption: "Covered outdoor living — penthouse terrace, Ikoyi",
      },
    ],
    closingStatement:
      "The most memorable homes are not defined by their walls alone — they are defined by the entire territory they inhabit, inside and out.",
  },

  "signage-identity": {
    id: "signage-identity",
    number: "05",
    title: "Signage & Identity",
    tagline: "Where branding becomes architecture.",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Environmental branding in a luxury commercial space",
    overview:
      "For commercial and hospitality environments, identity does not end at a logo on a wall — it permeates every surface, every sign, every spatial experience. Our signage and identity service translates brand values into three-dimensional, spatial realities. We design and deliver environmental graphics, wayfinding systems, and custom branded installations that communicate with elegance and intent.",
    highlights: [
      {
        title: "Environmental Branding",
        description:
          "Dimensional lettering, brand walls, and material expressions of identity embedded within the architecture of your space.",
      },
      {
        title: "Wayfinding Systems",
        description:
          "Cohesive signage systems for lobbies, corridors, and multi-level buildings — functional, legible, and visually refined.",
      },
      {
        title: "Custom Installations",
        description:
          "Bespoke sculptural and graphic installations — from reception feature pieces to large-format printed wall murals.",
      },
      {
        title: "Hospitality & Retail",
        description:
          "Branded interiors for hotels, restaurants, boutiques, and corporate headquarters — where every touchpoint reinforces the brand experience.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Brand Immersion",
        body: "We spend time understanding your brand values, audience, and the story you need your space to tell before a single design is drawn.",
      },
      {
        step: "02",
        title: "Spatial Mapping",
        body: "Every sign location, brand moment, and wayfinding decision point is mapped against the space plan before design development begins.",
      },
      {
        step: "03",
        title: "Design & Prototyping",
        body: "Scaled designs are developed and in key cases prototyped in physical form — ensuring scale, material, and finish read correctly in the actual space.",
      },
      {
        step: "04",
        title: "Fabrication & Installation",
        body: "Our specialist fabricators and installers deliver and fix every element with precision, leaving a finished environment that performs as designed.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80",
        alt: "Backlit hotel lobby signage",
        caption: "Illuminated brand identity — boutique hotel lobby, Lagos",
      },
      {
        src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
        alt: "Wayfinding system in a corporate office",
        caption: "Wayfinding system — corporate headquarters, Victoria Island",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
        alt: "Brand wall in a restaurant interior",
        caption: "Environmental brand installation — restaurant interior, Abuja",
      },
    ],
    closingStatement:
      "The spaces that people remember are not the ones they merely visit — they are the ones that speak directly to them from the walls, floors, and ceilings.",
  },

  "ceiling-covering": {
    id: "ceiling-covering",
    number: "06",
    title: "Ceiling Covering",
    tagline: "The fifth wall deserves the same attention as the other four.",
    heroImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Bespoke coffered ceiling in a luxury interior",
    overview:
      "The ceiling is the single largest continuous surface in any room, yet it is the most routinely overlooked. Our ceiling covering service reclaims this surface as a primary design element — deploying coffered millwork, hand-applied plaster details, acoustic panels, stretched fabrics, and bespoke painted finishes to transform what lies above into a statement as considered as anything below.",
    highlights: [
      {
        title: "Coffered & Panelled Millwork",
        description:
          "Timber and MDF coffer systems — designed, finished, and installed to bring classical or contemporary order to any ceiling plane.",
      },
      {
        title: "Plaster Mouldings & Cornices",
        description:
          "Traditional and contemporary plasterwork — from run-in-situ cornices to GRG panel systems and decorative ceiling roses.",
      },
      {
        title: "Acoustic Ceiling Panels",
        description:
          "High-performance acoustic tiles and baffles specified and designed to improve the acoustic environment without sacrificing aesthetic quality.",
      },
      {
        title: "Stretched Fabric & Specialist Finishes",
        description:
          "Stretched fabric systems, metallic leafing, limewash, and trompe-l'oeil sky finishes for ceilings that invite upward glances.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Structural Review",
        body: "We assess ceiling height, structural constraints, M&E positions, and lighting requirements before developing a design proposal.",
      },
      {
        step: "02",
        title: "Design Development",
        body: "Scale drawings and material specifications are produced — coordinating with lighting, mechanical, and structural engineers as required.",
      },
      {
        step: "03",
        title: "Fabrication",
        body: "Millwork, plaster elements, and panel systems are fabricated off-site wherever possible to maintain quality and minimise disruption.",
      },
      {
        step: "04",
        title: "Installation & Finishing",
        body: "Our specialist installers fix, fill, and finish every element on-site — with paint, gilding, or fabric applied as a final stage.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        alt: "Coffered timber ceiling in a formal dining room",
        caption: "Timber coffered ceiling — formal dining room, Ikoyi",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80",
        alt: "Ornate plaster cornice in a grand entrance hall",
        caption: "Bespoke plaster cornice — entrance hall, Banana Island",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
        alt: "Acoustic panel ceiling in a contemporary office",
        caption: "Acoustic panel system — corporate boardroom, Victoria Island",
      },
    ],
    closingStatement:
      "A great room is complete in every direction. We make certain that when someone looks up, they are met with the same quality of thought as everywhere else.",
  },
};

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.overview.slice(0, 155),
    pathname: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.overview.slice(0, 155),
    provider: {
      "@type": "Organization",
      name: "Dric Interior",
    },
    url: toAbsoluteUrl(`/services/${slug}`),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ServiceDetailExperience service={service} />
    </>
  );
}
