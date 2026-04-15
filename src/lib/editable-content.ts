import { promises as fs } from "node:fs";
import path from "node:path";

import { head, put } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";

import type {
  AboutPageContent,
  ContactPageContent,
  EditableImage,
  EditableSiteContent,
  HomePage,
  PrivacyPolicyPageContent,
  ProjectsPageContent,
  ReturnPolicyPageContent,
  ServiceDetailPageContent,
  ServicesPageContent,
  SiteLink,
  SiteSettings,
  TestimonialsPageContent,
} from "@/types/site";

const CONTENT_FILE_PATH = path.join(
  process.cwd(),
  "content",
  "editable-site-content.json",
);
const BLOB_CONTENT_PATH = "admin/content/editable-site-content.json";

const adminSectionDefinitions = [
  {
    key: "navbar",
    title: "Navbar",
    description: "Edit the logo, top bar, navigation links, icon links, and primary button.",
    route: "/admin/navbar",
  },
  {
    key: "footer",
    title: "Footer",
    description: "Manage footer copy, contact details, social labels, and footer menus.",
    route: "/admin/footer",
  },
  {
    key: "homepage",
    title: "Homepage",
    description: "Update hero copy, section images, button text, and all homepage sections.",
    route: "/admin/homepage",
  },
  {
    key: "about",
    title: "About Page",
    description: "Control the hero, story section, milestones, values, and call to action.",
    route: "/admin/about",
  },
  {
    key: "services",
    title: "Services Page",
    description: "Edit the services overview page, cards, stats, and CTA buttons.",
    route: "/admin/services",
  },
  {
    key: "serviceDetails",
    title: "Service Detail Pages",
    description: "Manage each individual service page with its images, highlights, and CTA links.",
    route: "/admin/serviceDetails",
  },
  {
    key: "projects",
    title: "Projects Page",
    description: "Update project cards, filters, gallery copy, and the projects page CTA.",
    route: "/admin/projects",
  },
  {
    key: "contact",
    title: "Contact Page",
    description: "Edit the contact hero, consultation form copy, office details, and map settings.",
    route: "/admin/contact",
  },
  {
    key: "privacyPolicy",
    title: "Privacy Policy",
    description: "Manage privacy policy text, image break content, and contact information.",
    route: "/admin/privacyPolicy",
  },
  {
    key: "returnPolicy",
    title: "Return Policy",
    description: "Edit the returns page text, icons, support details, and section imagery.",
    route: "/admin/returnPolicy",
  },
  {
    key: "testimonials",
    title: "Testimonials Page",
    description: "Control testimonial quotes, gallery imagery, and CTA content.",
    route: "/admin/testimonials",
  },
] as const satisfies ReadonlyArray<{
  key: keyof EditableSiteContent;
  title: string;
  description: string;
  route: string;
}>;

export const editableAdminSections = adminSectionDefinitions;
export type EditableAdminSectionKey = (typeof adminSectionDefinitions)[number]["key"];

const image = (
  url: string,
  alt: string,
  width: number,
  height: number,
): EditableImage => ({
  url,
  alt,
  width,
  height,
});

const link = (
  label: string,
  href: string,
  extra?: Partial<SiteLink>,
): SiteLink => ({
  label,
  href,
  ...extra,
});

const logoImage = image("/golden-dric-logo.png", "Dric Interior logo", 280, 96);

function cloneDefaultContent() {
  return structuredClone(defaultEditableContent);
}

export function isBlobStorageConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeDeep<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) {
      return structuredClone(base);
    }

    return override.map((item, index) => {
      const sample = (base as unknown[])[index] ?? (base as unknown[])[0];

      if (sample === undefined) {
        return item;
      }

      return mergeDeep(sample, item);
    }) as T;
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(override)) {
      return structuredClone(base);
    }

    const result: Record<string, unknown> = {};

    for (const key of Object.keys(base)) {
      result[key] = mergeDeep(
        (base as Record<string, unknown>)[key],
        override[key],
      );
    }

    return result as T;
  }

  if (override === undefined || override === null) {
    return structuredClone(base);
  }

  return override as T;
}

const defaultHomepage: HomePage = {
  seo: {
    title: "Luxury Interior Design for Elevated Living",
    description:
      "Discover bespoke interior design services, curated portfolios, and refined spaces shaped around your story.",
    keywords: [
      "luxury interior design",
      "bespoke interiors",
      "residential interiors",
      "interior architecture",
      "modern interiors",
    ],
    image: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
      "Luxury living room with layered lighting and sculptural furnishings",
      1800,
      1200,
    ),
  },
  hero: {
    eyebrow: "",
    title: "Elevated Living\nSpaces",
    description:
      "Crafting bespoke interiors that harmonize architectural precision with the warmth of a curated home.",
    backgroundImage: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
      "Luxury living room with layered lighting and sculptural furnishings",
      1800,
      1200,
    ),
    overlayStart: "rgba(11, 12, 16, 0.82)",
    overlayEnd: "rgba(31, 20, 13, 0.35)",
    primaryCta: link("View Our Portfolio", "/#portfolio"),
    secondaryCta: link("The Design Philosophy", "/#about"),
  },
  about: {
    eyebrow: "Exceptionally smart & beautiful spaces",
    title: "Creating\nexceptionally smart\n& beautiful spaces.",
    description:
      "For nearly two decades, Dric Interior has redefined the boundaries of luxury living. We believe that an interior is more than a space; it is an extension of identity. Our process merges technical innovation with soulful artistry.",
    image: image(
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "Interior design studio with tactile materials and soft daylight",
      1200,
      1500,
    ),
    yearsValue: "18+",
    yearsLabel: "Years of Excellence",
    featureOneTitle: "Authentic",
    featureOneBody:
      "Designs that reflect your personal history and future aspirations.",
    featureTwoTitle: "Innovative",
    featureTwoBody:
      "Leveraging the latest in smart-home technology and sustainable materials.",
    backgroundColor: "#1a1b21",
    panelColor: "#292a30",
  },
  services: {
    title: "Our Expertise",
    description:
      "We are well regarded for our highly tailored and personalized client strategies from concept to delivery.",
    backgroundColor: "#111317",
    items: [
      {
        title: "Furniture & Fittings",
        subtitle: "Bespoke Craftsmanship",
        image: image(
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
          "Curated furniture styling in a refined residential interior",
          900,
          1200,
        ),
        overlayColor: "rgba(15, 16, 18, 0.35)",
      },
      {
        title: "Wall Covering",
        subtitle: "Textural Narratives",
        image: image(
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
          "Living room with layered wall textures and warm finishes",
          900,
          1200,
        ),
        overlayColor: "rgba(20, 15, 12, 0.38)",
      },
      {
        title: "Window Covering",
        subtitle: "Light Modulation",
        image: image(
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
          "Window treatment framing natural light in a dark interior",
          900,
          1200,
        ),
        overlayColor: "rgba(15, 13, 12, 0.42)",
      },
      {
        title: "Mirror Wall",
        subtitle: "Expansive Reflections",
        image: image(
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
          "Reflective surfaces adding depth to an elegant room",
          900,
          1200,
        ),
        overlayColor: "rgba(21, 16, 15, 0.3)",
      },
    ],
  },
  portfolio: {
    eyebrow: "Selected Works",
    title: "The Portfolio",
    featuredProject: {
      title: "Kitchen Cabinet 0503",
      summary:
        "Premium cabinetry, book-matched marble countertops, and a fully layered lighting scheme - a residential kitchen designed at every scale.",
      category: "Residential",
      image: image(
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
        "Bespoke kitchen with marble countertops and layered lighting",
        1600,
        1100,
      ),
      link: link("View Project", "/projects"),
    },
    secondaryProjects: [
      {
        title: "Wardrobe Suite",
        summary: "Joinery-led organization shaped with hotel-level refinement.",
        category: "Residential",
        image: image(
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
          "Walk-in wardrobe with bespoke cabinetry",
          900,
          1100,
        ),
        link: link("Explore", "/projects"),
      },
      {
        title: "Stone Wall Feature",
        summary: "A dramatic surface language that anchors the entire room.",
        category: "Residential",
        image: image(
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
          "Feature wall in a luxurious lounge",
          900,
          1100,
        ),
        link: link("Explore", "/projects"),
      },
    ],
    backgroundColor: "#0d1016",
  },
  mission: {
    titleLineOne: "Thoughtful interiors are not only",
    titleLineTwo: "beautiful, they shape Innovative Spaces.",
    highlightPhrase: "Innovative Spaces",
    backgroundColor: "#161a20",
    pillars: [
      {
        title: "Research-led design",
        body: "Every proposal is grounded in the rhythms of the client and the architecture it inhabits.",
      },
      {
        title: "Material intelligence",
        body: "We curate finishes for their atmosphere, performance, and long-term integrity.",
      },
      {
        title: "Technical precision",
        body: "Joinery details, lighting layers, and circulation are resolved with architectural discipline.",
      },
    ],
  },
  testimonials: {
    title: "What Our Clients Say",
    backgroundColor: "#111217",
    items: [
      {
        quote:
          "Dric Interior translated our rough vision into a home that feels editorial yet deeply personal.",
        author: "Private Residence Client",
      },
      {
        quote:
          "Their process was calm, exacting, and beautifully detailed from the first presentation to final styling.",
        author: "Boutique Hospitality Client",
      },
      {
        quote:
          "The space feels effortless to live in, but every corner clearly came from a deliberate point of view.",
        author: "Residential Client",
      },
    ],
  },
  finalCta: {
    title: "Let us craft your next unforgettable interior.",
    highlightPhrase: "unforgettable",
    description:
      "Ready to transform your vision into an architectural masterpiece? Let's collaborate on your next project.",
    button: link("Book an Appointment", "/book-appointment"),
    backgroundColor: "#111217",
    accentColor: "#f7b51f",
  },
};

const defaultAboutPage: AboutPageContent = {
  hero: {
    eyebrow: "The Experience You Need",
    titleLineOne: "Curating Spaces",
    titleLineTwo: "with Intention",
    accentWord: "Intention",
    backgroundImage: image(
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80",
      "Luxury interior with refined architectural detail",
      1800,
      1200,
    ),
  },
  story: {
    eyebrow: "Our Story",
    headingLineOne: "Architectural",
    headingLineTwo: "Precision meets",
    headingLineThree: "Soulful Artistry.",
    body:
      "At Dric Interior, we specialise in creating luxurious, bespoke interiors that reflect the unique style and personality of each client. With a keen eye for detail and a passion for design excellence, our team of experts transforms spaces into sophisticated, functional works of art. Whether you're looking to revamp a single room or redesign an entire home, we deliver unparalleled quality and elegance in every project.",
    tallImage: image(
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=700&q=80",
      "Interior detail - textured wall and sculptural lamp",
      700,
      1020,
    ),
    squareImage: image(
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=700&q=80",
      "Architecture - clean lines and natural materials",
      700,
      700,
    ),
  },
  milestones: {
    title: "The Legacy of Excellence",
    description:
      "Our journey is marked by the trust of our clients and the enduring beauty of the spaces we've realised across the globe.",
    items: [
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
    ],
  },
  values: {
    title: "Foundations of Luxury",
    items: [
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
    ],
  },
  cta: {
    title: "Experience Us",
    button: link("Contact Us", "/book-appointment"),
    backgroundImage: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
      "Luxury interior",
      1800,
      1200,
    ),
  },
};

const defaultServicesPage: ServicesPageContent = {
  hero: {
    eyebrow: "OUR EXPERTISE",
    titlePrefix: "The Art of",
    titleAccent: "Spatial",
    titleSuffix: "Curation.",
    description:
      "We transform architectural voids into soulful environments. Dric Interior provides a full spectrum of luxury atelier services, from bespoke furniture design to holistic exterior visions.",
    backgroundImage: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
      "Luxury interior with warm lighting and sculptural furnishings",
      1800,
      1200,
    ),
    cta: link("GO TO SHOP", "/shop"),
  },
  stats: [
    { value: "1,501", label: "Projects Completed" },
    { value: "18", label: "Years of Experience" },
    { value: "1,500", label: "Happy Clients" },
    { value: "16,200", label: "Cups of Coffee" },
  ],
  intro: {
    title: "Curated Design Solutions",
    description:
      "A comprehensive suite of interior and exterior services designed to elevate the residential and commercial experience to a level of pure distinction.",
  },
  services: [
    {
      id: "furniture-fittings",
      number: "01",
      title: "Furniture & Fittings",
      description:
        "Bespoke furniture design and meticulous material selection, crafted to harmonise with your architectural context and personal narrative.",
      image: image(
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
        "Curated furniture in a refined residential interior",
        1400,
        1000,
      ),
      wide: true,
    },
    {
      id: "window-covering",
      number: "02",
      title: "Window Covering",
      description:
        "Precision-tailored treatments that modulate natural light and frame every view with intention.",
      image: image(
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        "Window treatment in a refined interior",
        900,
        1200,
      ),
      wide: false,
    },
    {
      id: "wall-covering",
      number: "03",
      title: "Wall Covering",
      description:
        "Textural narratives rendered through artisanal wallpapers, plasters, and specialist paint finishes.",
      image: image(
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        "Textured wall finish in a refined interior",
        900,
        1200,
      ),
      wide: false,
    },
    {
      id: "exterior-design",
      number: "04",
      title: "Exterior Design",
      description:
        "Holistic exterior visions that extend the interior character outward, creating a seamless dialogue between inside and out.",
      image: image(
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
        "Exterior architecture with interior-grade detail",
        1400,
        1000,
      ),
      wide: true,
    },
    {
      id: "signage-identity",
      number: "05",
      title: "Signage & Identity",
      description:
        "Custom environmental branding and wayfinding systems crafted for commercial and hospitality spaces.",
      image: image(
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
        "Environmental branding in a commercial interior",
        900,
        1200,
      ),
      wide: false,
    },
    {
      id: "ceiling-covering",
      number: "06",
      title: "Ceiling Covering",
      description:
        "The often-overlooked fifth wall, transformed through coffered details, acoustic panels, and bespoke plasterwork.",
      image: image(
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        "Bespoke ceiling detail in a luxury interior",
        900,
        1200,
      ),
      wide: true,
    },
  ],
  process: {
    title: "The Dric Process",
    items: [
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
    ],
  },
  cta: {
    titleLineOne: "Begin Your",
    titleLineTwo: "Transformation Today",
    description:
      "Ready to work with a studio that brings vision and precision to every project? Let us craft a space worthy of your story.",
    primaryButton: link("Schedule Appointment", "/book-appointment"),
    secondaryButton: link("Our Journal ->", "/blog"),
  },
};

const defaultServiceDetails: Record<string, ServiceDetailPageContent> = {
  "furniture-fittings": {
    id: "furniture-fittings",
    number: "01",
    title: "Furniture & Fittings",
    tagline: "Objects that hold the room and the memory.",
    heroImage: image(
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=80",
      "Bespoke furniture in a refined residential interior",
      1800,
      1200,
    ),
    backLink: link("← All Services", "/services"),
    overview:
      "Every object in a room carries weight - not merely in mass, but in meaning. Our furniture and fittings service is rooted in a philosophy of craft over commodity. We design and source pieces that exist in precise dialogue with the architecture, light, and lives that inhabit a space. From the curve of a sofa arm to the grain direction of a dining table, each decision is made with the whole room in mind.",
    highlightsHeading: "WHAT WE OFFER",
    highlights: [
      {
        title: "Bespoke Design",
        description:
          "Custom furniture conceived from scratch - scaled, proportioned, and detailed to suit your exact spatial and aesthetic brief.",
      },
      {
        title: "Material Curation",
        description:
          "Leathers, velvets, marbles, solid timbers, and hand-forged metals - sourced from artisan suppliers and specialist mills worldwide.",
      },
      {
        title: "FF&E Procurement",
        description:
          "We manage the full furniture, fixtures, and equipment specification process - budgeting, supplier coordination, and delivery logistics included.",
      },
      {
        title: "Residential & Commercial",
        description:
          "Whether a private penthouse or a luxury boutique hotel, our approach maintains the same exacting standard of finish and intent.",
      },
    ],
    galleryHeading: "SELECTED WORK",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
        alt: "Marble dining table with sculptural chairs",
        caption: "Bespoke dining collection - private residence, Lagos",
      },
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
        alt: "Custom upholstered sofa in a warm living room",
        caption: "Custom lounge furniture - hospitality suite, Abuja",
      },
      {
        src: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=900&q=80",
        alt: "Solid timber shelving unit with brass fittings",
        caption: "Bespoke shelving & cabinetry - executive office, Victoria Island",
      },
    ],
    processHeading: "OUR APPROACH",
    processTitle: "How We Deliver",
    process: [
      {
        step: "01",
        title: "Brief & Measure",
        body: "We begin with a thorough site measure and a conversation about how you live, work, and move through the space - capturing dimensions and desires simultaneously.",
      },
      {
        step: "02",
        title: "Design Development",
        body: "Sketches, 3D models, and material samples are developed and refined until each piece is fully resolved - before a single workshop order is placed.",
      },
      {
        step: "03",
        title: "Workshop & Fabrication",
        body: "Pieces are commissioned through our network of vetted craftspeople - from furniture-makers in the UK to upholstery ateliers on the continent.",
      },
      {
        step: "04",
        title: "Installation & Styling",
        body: "Our team oversees white-glove delivery and placement, followed by a final styling pass to ensure every element reads as intended.",
      },
    ],
    closingStatement:
      "Furniture is not decoration - it is the architecture of daily life. We build pieces that last beyond trends and outlive fashion.",
    cta: {
      title: "Ready to Begin?",
      description:
        "Let's discuss your project. Our atelier is ready to bring precision and vision to your space.",
      primaryButton: link("Schedule Appointment", "/book-appointment"),
      secondaryButton: link("View All Services →", "/services"),
    },
  },
  "window-covering": {
    id: "window-covering",
    number: "02",
    title: "Window Covering",
    tagline: "Every view deserves a frame worthy of it.",
    heroImage: image(
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80",
      "Precision-tailored drapes in a luxury interior",
      1800,
      1200,
    ),
    backLink: link("← All Services", "/services"),
    overview:
      "Light is the most transformative material in any interior. Our window covering service approaches curtains, blinds, and treatments not as afterthoughts, but as primary architectural elements. We modulate sunlight, frame external views, and add layers of warmth and texture - all while ensuring seamless mechanical function and longevity of fabric and fixings.",
    highlightsHeading: "WHAT WE OFFER",
    highlights: [
      {
        title: "Bespoke Drapes & Curtains",
        description:
          "Floor-to-ceiling, hand-pleated, and precisely tracked - from sheer linens that breathe with the room to heavy silks that anchor it.",
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
          "We work with premier fabric houses - Dedar, Rubelli, Zimmer + Rohde, and independent weavers - to source materials unavailable in the retail market.",
      },
    ],
    galleryHeading: "SELECTED WORK",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        alt: "Sheer linen curtains in a bright bedroom",
        caption: "Sheer linen drapes - master bedroom, Ikoyi",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
        alt: "Rich velvet curtains in a formal living room",
        caption: "Hand-pleated velvet curtains - formal sitting room, Lekki",
      },
      {
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        alt: "Roman blinds in a contemporary kitchen",
        caption: "Motorised roman blinds - open-plan kitchen, Banana Island",
      },
    ],
    processHeading: "OUR APPROACH",
    processTitle: "How We Deliver",
    process: [
      {
        step: "01",
        title: "Light Study",
        body: "We assess how natural light moves through your space at different times of day - informing opacity, colour, and fabric weight choices.",
      },
      {
        step: "02",
        title: "Specification",
        body: "Track type, heading style, lining, and interlining are specified alongside fabric - all decisions made with both aesthetics and thermal performance in mind.",
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
    closingStatement:
      "The right window treatment does not just dress a window - it defines the mood of the entire room from morning light to candlelit evening.",
    cta: {
      title: "Ready to Begin?",
      description:
        "Let's discuss your project. Our atelier is ready to bring precision and vision to your space.",
      primaryButton: link("Schedule Appointment", "/book-appointment"),
      secondaryButton: link("View All Services →", "/services"),
    },
  },
  "wall-covering": {
    id: "wall-covering",
    number: "03",
    title: "Wall Covering",
    tagline: "The surface is the atmosphere.",
    heroImage: image(
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1800&q=80",
      "Artisanal wall covering in a refined interior",
      1800,
      1200,
    ),
    backLink: link("← All Services", "/services"),
    overview:
      "Walls are not boundaries - they are the primary sensory canvas of a room. Our wall covering service moves far beyond paint and standard wallpaper. We deploy artisanal techniques, specialist finishes, and curated materials to create surfaces that reward close inspection, change under different light, and anchor a room's identity with quiet authority.",
    highlightsHeading: "WHAT WE OFFER",
    highlights: [
      {
        title: "Specialist Paint Finishes",
        description:
          "Limewash, colour-washed plaster, lacquered surfaces, and bespoke hues mixed to exact specification - applied by specialist decorators.",
      },
      {
        title: "Artisanal Wallpaper",
        description:
          "Hand-printed, embossed, fabric-backed, and grasscloth papers sourced from leading houses including de Gournay, Fornasetti, and Arte.",
      },
      {
        title: "Venetian & Microcement Plaster",
        description:
          "Applied plasters that create depth, texture, and a tactile quality no flat paint can replicate - suitable for wet rooms and living areas alike.",
      },
      {
        title: "Stone & Tile Cladding",
        description:
          "Travertine, marble, slate, and handmade ceramic applied as wall cladding for feature walls, entrance halls, and bathrooms.",
      },
    ],
    galleryHeading: "SELECTED WORK",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
        alt: "Limewash finish in a warm living room",
        caption: "Limewash plaster finish - living room feature wall, Ikoyi",
      },
      {
        src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80",
        alt: "Grasscloth wallpaper in a study",
        caption: "Grasscloth wallcovering - home study, Lekki Phase 1",
      },
      {
        src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80",
        alt: "Marble wall cladding in a bathroom",
        caption: "Bookmatched marble cladding - principal bathroom, Banana Island",
      },
    ],
    processHeading: "OUR APPROACH",
    processTitle: "How We Deliver",
    process: [
      {
        step: "01",
        title: "Surface Assessment",
        body: "We evaluate the existing substrate - identifying any preparation work required before a covering can be applied to the standard our finishes demand.",
      },
      {
        step: "02",
        title: "Material Selection",
        body: "Sample boards are prepared and viewed in your actual space under your actual light - because a sample in a showroom lies about how it will perform at home.",
      },
      {
        step: "03",
        title: "Application",
        body: "Specialist applicators - plasterers, paperhangers, and tilers from our trusted trades network - carry out the work with precision and care.",
      },
      {
        step: "04",
        title: "Finish & Protect",
        body: "Appropriate sealants, wax finishes, and maintenance protocols are applied and communicated to ensure long-term beauty and durability.",
      },
    ],
    closingStatement:
      "A wall that is merely painted is a wall that is merely functional. We make walls that tell the story of a space from the moment you enter the room.",
    cta: {
      title: "Ready to Begin?",
      description:
        "Let's discuss your project. Our atelier is ready to bring precision and vision to your space.",
      primaryButton: link("Schedule Appointment", "/book-appointment"),
      secondaryButton: link("View All Services →", "/services"),
    },
  },
  "exterior-design": {
    id: "exterior-design",
    number: "04",
    title: "Exterior Design",
    tagline: "The outside is part of the story.",
    heroImage: image(
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1800&q=80",
      "Refined exterior architecture with landscape design",
      1800,
      1200,
    ),
    backLink: link("← All Services", "/services"),
    overview:
      "The boundary between inside and outside is a fiction in great design. Our exterior design service ensures the visual character, material language, and spatial quality of the interior extends seamlessly beyond the threshold. We design terraces, facades, landscapes, and external lighting schemes that are as considered as every room within.",
    highlightsHeading: "WHAT WE OFFER",
    highlights: [
      {
        title: "Facade Design & Cladding",
        description:
          "Material specification and design development for building exteriors - from natural stone and timber to render, metal, and composite panels.",
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
    galleryHeading: "SELECTED WORK",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80",
        alt: "Landscaped pool terrace with external furniture",
        caption: "Pool terrace and landscape - private residence, Lekki",
      },
      {
        src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
        alt: "Natural stone facade with illuminated entrance",
        caption: "Stone facade and lighting - residential villa, Abuja",
      },
      {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        alt: "Covered terrace with outdoor seating",
        caption: "Covered outdoor living - penthouse terrace, Ikoyi",
      },
    ],
    processHeading: "OUR APPROACH",
    processTitle: "How We Deliver",
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
    closingStatement:
      "The most memorable homes are not defined by their walls alone - they are defined by the entire territory they inhabit, inside and out.",
    cta: {
      title: "Ready to Begin?",
      description:
        "Let's discuss your project. Our atelier is ready to bring precision and vision to your space.",
      primaryButton: link("Schedule Appointment", "/book-appointment"),
      secondaryButton: link("View All Services →", "/services"),
    },
  },
  "signage-identity": {
    id: "signage-identity",
    number: "05",
    title: "Signage & Identity",
    tagline: "Where branding becomes architecture.",
    heroImage: image(
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80",
      "Environmental branding in a luxury commercial space",
      1800,
      1200,
    ),
    backLink: link("← All Services", "/services"),
    overview:
      "For commercial and hospitality environments, identity does not end at a logo on a wall - it permeates every surface, every sign, every spatial experience. Our signage and identity service translates brand values into three-dimensional, spatial realities. We design and deliver environmental graphics, wayfinding systems, and custom branded installations that communicate with elegance and intent.",
    highlightsHeading: "WHAT WE OFFER",
    highlights: [
      {
        title: "Environmental Branding",
        description:
          "Dimensional lettering, brand walls, and material expressions of identity embedded within the architecture of your space.",
      },
      {
        title: "Wayfinding Systems",
        description:
          "Cohesive signage systems for lobbies, corridors, and multi-level buildings - functional, legible, and visually refined.",
      },
      {
        title: "Custom Installations",
        description:
          "Bespoke sculptural and graphic installations - from reception feature pieces to large-format printed wall murals.",
      },
      {
        title: "Hospitality & Retail",
        description:
          "Branded interiors for hotels, restaurants, boutiques, and corporate headquarters - where every touchpoint reinforces the brand experience.",
      },
    ],
    galleryHeading: "SELECTED WORK",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80",
        alt: "Backlit hotel lobby signage",
        caption: "Illuminated brand identity - boutique hotel lobby, Lagos",
      },
      {
        src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
        alt: "Wayfinding system in a corporate office",
        caption: "Wayfinding system - corporate headquarters, Victoria Island",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
        alt: "Brand wall in a restaurant interior",
        caption: "Environmental brand installation - restaurant interior, Abuja",
      },
    ],
    processHeading: "OUR APPROACH",
    processTitle: "How We Deliver",
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
        body: "Scaled designs are developed and in key cases prototyped in physical form - ensuring scale, material, and finish read correctly in the actual space.",
      },
      {
        step: "04",
        title: "Fabrication & Installation",
        body: "Our specialist fabricators and installers deliver and fix every element with precision, leaving a finished environment that performs as designed.",
      },
    ],
    closingStatement:
      "The spaces that people remember are not the ones they merely visit - they are the ones that speak directly to them from the walls, floors, and ceilings.",
    cta: {
      title: "Ready to Begin?",
      description:
        "Let's discuss your project. Our atelier is ready to bring precision and vision to your space.",
      primaryButton: link("Schedule Appointment", "/book-appointment"),
      secondaryButton: link("View All Services →", "/services"),
    },
  },
  "ceiling-covering": {
    id: "ceiling-covering",
    number: "06",
    title: "Ceiling Covering",
    tagline: "The fifth wall deserves the same attention as the other four.",
    heroImage: image(
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80",
      "Bespoke coffered ceiling in a luxury interior",
      1800,
      1200,
    ),
    backLink: link("← All Services", "/services"),
    overview:
      "The ceiling is the single largest continuous surface in any room, yet it is the most routinely overlooked. Our ceiling covering service reclaims this surface as a primary design element - deploying coffered millwork, hand-applied plaster details, acoustic panels, stretched fabrics, and bespoke painted finishes to transform what lies above into a statement as considered as anything below.",
    highlightsHeading: "WHAT WE OFFER",
    highlights: [
      {
        title: "Coffered & Panelled Millwork",
        description:
          "Timber and MDF coffer systems - designed, finished, and installed to bring classical or contemporary order to any ceiling plane.",
      },
      {
        title: "Plaster Mouldings & Cornices",
        description:
          "Traditional and contemporary plasterwork - from run-in-situ cornices to GRG panel systems and decorative ceiling roses.",
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
    galleryHeading: "SELECTED WORK",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        alt: "Coffered timber ceiling in a formal dining room",
        caption: "Timber coffered ceiling - formal dining room, Ikoyi",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80",
        alt: "Ornate plaster cornice in a grand entrance hall",
        caption: "Bespoke plaster cornice - entrance hall, Banana Island",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
        alt: "Acoustic panel ceiling in a contemporary office",
        caption: "Acoustic panel system - corporate boardroom, Victoria Island",
      },
    ],
    processHeading: "OUR APPROACH",
    processTitle: "How We Deliver",
    process: [
      {
        step: "01",
        title: "Structural Review",
        body: "We assess ceiling height, structural constraints, M&E positions, and lighting requirements before developing a design proposal.",
      },
      {
        step: "02",
        title: "Design Development",
        body: "Scale drawings and material specifications are produced - coordinating with lighting, mechanical, and structural engineers as required.",
      },
      {
        step: "03",
        title: "Fabrication",
        body: "Millwork, plaster elements, and panel systems are fabricated off-site wherever possible to maintain quality and minimise disruption.",
      },
      {
        step: "04",
        title: "Installation & Finishing",
        body: "Our specialist installers fix, fill, and finish every element on-site - with paint, gilding, or fabric applied as a final stage.",
      },
    ],
    closingStatement:
      "A great room is complete in every direction. We make certain that when someone looks up, they are met with the same quality of thought as everywhere else.",
    cta: {
      title: "Ready to Begin?",
      description:
        "Let's discuss your project. Our atelier is ready to bring precision and vision to your space.",
      primaryButton: link("Schedule Appointment", "/book-appointment"),
      secondaryButton: link("View All Services →", "/services"),
    },
  },
};

const defaultProjectsPage: ProjectsPageContent = {
  hero: {
    eyebrow: "Portfolio Exhibition",
    titleLineOne: "Curated",
    titleLineTwo: "Portfolio",
    description:
      "A visual narrative of architectural transformations. From brutalist lofts to heritage manors, we craft spaces that define high-end living.",
    backgroundImage: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
      "Moody luxury interior with deep tones",
      1800,
      1200,
    ),
  },
  filters: ["All Projects", "Residential", "Commercial", "Workplace"],
  projects: [
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
      link: link("View Project", "/projects"),
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
      link: link("View Project", "/projects"),
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
      link: link("View Project", "/projects"),
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
      link: link("View Project", "/projects"),
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
      link: link("View Project", "/projects"),
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
      link: link("View Project", "/projects"),
    },
  ],
  emptyState: "No projects in this category yet.",
  cta: {
    titleLineOne: "Ready to start your own",
    titleLineTwo: "transformation? Let's",
    titleLineThree: "collaborate.",
    button: link("Book an Appointment", "/book-appointment"),
  },
};

const defaultContactPage: ContactPageContent = {
  hero: {
    eyebrow: "Curated Experiences",
    titleTop: "Begin",
    titleBottom: "Transformation",
    description:
      "Every masterpiece begins with a conversation. Let us redefine the boundaries of your sanctuary through the lens of architectural depth and bespoke luxury.",
    backgroundImage: image(
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1800&q=80",
      "Luxury penthouse interior - warm tones and city views",
      1800,
      1200,
    ),
  },
  form: {
    title: "The Initial Consultation",
    successIcon: "✦",
    successTitle: "Request received",
    successBody:
      "Thank you, {name}. One of our design consultants will be in touch within 24 hours.",
    resetButtonLabel: "Send another enquiry",
    submitIdleLabel: "Request Consultation",
    submitLoadingLabel: "Sending...",
    fields: {
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Amara Okafor",
      emailLabel: "Private Email",
      emailPlaceholder: "you@example.com",
      projectTypeLabel: "Project Type",
      projectTypePlaceholder: "Select type",
      projectTypeOptions: [
        "Residential Design",
        "Commercial Fitout",
        "Workplace",
        "Hospitality",
        "Heritage Renovation",
      ],
      investmentRangeLabel: "Investment Range",
      investmentRangePlaceholder: "Select range",
      investmentRangeOptions: [
        "N1M - N5M",
        "N5M - N20M",
        "N20M - N50M",
        "N50M - N150M",
        "N150M+",
      ],
      preferredDateLabel: "Preferred Date",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+234 xxx xxx xxxx",
      messageLabel: "Your Vision",
      messagePlaceholder:
        "Describe the space, the feeling you want to live in, any inspiration you have...",
    },
  },
  infoCard: {
    eyebrow: "Dric Interior, Lagos",
    addressLineOne: "6ix Unity Road, Ikeja",
    addressLineTwo: "Lagos, Nigeria",
    phone: "+234 812 345 6789",
    whatsappLabel: "WhatsApp",
    whatsappHref: "https://wa.me/2348123456789",
  },
  studioImage: image(
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80",
    "Dric Interior studio - material samples and design boards",
    800,
    1000,
  ),
  locations: [
    {
      city: "Lagos",
      address: "6ix Unity Road, Ikeja",
      state: "Lagos, Nigeria",
      phone: "+234 812 345 6789",
      whatsapp: "+234 812 345 6789",
    },
    {
      city: "Abuja",
      address: "14 Cadastral Zone, Wuse 2",
      state: "Abuja, Nigeria",
      phone: "+234 903 456 7890",
      whatsapp: "+234 903 456 7890",
    },
  ],
  map: {
    title: "Dric Interior - Ikeja, Lagos",
    embedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=3.31%2C6.55%2C3.42%2C6.65&layer=mapnik&marker=6.6051%2C3.3505",
  },
};

const defaultPrivacyPolicyPage: PrivacyPolicyPageContent = {
  header: {
    eyebrow: "Commitment to Privacy",
    title: "Privacy Policy",
    validLabel: "Valid till further notice",
  },
  introParagraphs: [
    "We at Dric Interior are committed to protecting the privacy of any information given by our customers. Under law, your rights to privacy are also protected. The National Privacy Principles, the Privacy Act and general law place strict requirements on us to treat certain information collected as confidential.",
    "Our secure server will protect any personal information that you submit.",
  ],
  sections: [
    {
      id: "01",
      title: "Collection",
      paragraphs: [
        "We collect information to provide a bespoke interior design experience. This includes personal identifiers such as your name, email address, and phone number when you inquire about our services.",
        "Additionally, we may collect project-specific details including floor plans, preferences, and aesthetic inspirations to facilitate our design process.",
      ],
    },
    {
      id: "02",
      title: "Usage",
      paragraphs: [
        "We might, on occasions, use this information to notify you of any important changes to our site or any special promotions that may be of interest to you.",
      ],
      bullets: [
        "Communicating updates regarding your design project.",
        "Tailoring our portfolio presentations to match your style.",
        "Processing invoices and managing contractual agreements.",
      ],
    },
    {
      id: "03",
      title: "Protection",
      paragraphs: [
        "We implement industry-standard security measures to safeguard your personal data. All digital interactions are encrypted, and access to client files is restricted to authorized personnel directly involved in your project. We do not sell or trade your personal data to third parties for marketing purposes.",
      ],
    },
    {
      id: "04",
      title: "Third Parties",
      paragraphs: [
        "By using the dricinterior.com site, you are consenting to the collection of information by dricinterior.com. If any changes to these policies occur, we will notify our customers by updating this section of our website.",
      ],
    },
    {
      id: "05",
      title: "Your Rights",
      paragraphs: [
        "Protecting your personal and order information is a priority at Dric Interior. We want you to be able to order from dricinterior.com with total confidence.",
        "As such we have created a secure transaction environment. We use Secure Sockets Layer (SSL) technology. Our online ordering system is the industry standard for encryption technology to protect your online order information. SSL encrypts all information including all personal information passed from you to dricinterior.com.",
      ],
    },
  ],
  imageBreak: {
    image: image(
      "https://images.unsplash.com/photo-1616594039964-3ae7d548f3d3?auto=format&fit=crop&w=1400&q=80",
      "Minimalist luxury interior with warm lighting",
      1400,
      1000,
    ),
    quote:
      "\"Elegance is not about being noticed, it's about being remembered while remaining private.\"",
  },
  contact: {
    eyebrow: "For further inquiries",
    email: "hello@dricinterior.com",
  },
};

const defaultReturnPolicyPage: ReturnPolicyPageContent = {
  hero: {
    eyebrow: "Dric Interior Policy",
    titleLineOne: "Terms of",
    titleLineTwo: "Acquisition",
    titleLineThree: "& Returns",
    quote: "\"Our commitment to quality and the nature of bespoke curation.\"",
    image: image(
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
      "Luxury atelier kitchen interior",
      1400,
      1000,
    ),
  },
  sections: [
    {
      id: "01",
      title: "Bespoke Curation & Finality of Sale",
      icon: "package",
      paragraphs: [
        "At Dric Interior each piece is an intentional acquisition. Our collections are composed of meticulously selected artifacts and custom-commissioned works that represent the pinnacle of artisanal craftsmanship. Due to the unique sourcing and personalized nature of these assets, all sales are considered final upon confirmation of acquisition.",
        "This policy ensures the integrity of our inventory and respects the delicate provenance of the curated objects within our studio.",
      ],
      highlight: "all sales are considered final",
    },
    {
      id: "02",
      title: "Quality Assurance & Discrepancies",
      icon: "alert-circle",
      paragraphs: [
        "While we maintain rigorous quality controls, we acknowledge the complexities of logistical transit. Should an item arrive with visible defects or damage incurred during delivery, we require notification within a strict 48-hour window.",
      ],
      protocolTitle: "Protocol",
      protocolBody:
        "Please document the condition upon arrival and contact our caretaker immediately to initiate a prompt resolution or replacement. Delay beyond 2 days may forfeit eligibility for claim.",
    },
    {
      id: "03",
      title: "Return Eligibility",
      icon: "refresh-cw",
      paragraphs: [
        "As part of our commitment to exclusivity, Dric Interior does not accept returns or exchanges based on change of preference or aesthetic reconsideration. Each acquisition is a deliberate engagement with our curated aesthetic.",
        "The personalized and often made-to-order nature of the studio's offerings renders the standard retail return model inapplicable to our service standards.",
      ],
      highlight: "does not accept returns or exchanges",
    },
    {
      id: "04",
      title: "Communication & Support",
      icon: "message-square",
      paragraphs: [
        "Our team remains at your disposal to clarify any aspects of our acquisition terms or to provide further details on specific pieces prior to purchase.",
      ],
      supportLabel: "WhatsApp Inquiry",
      supportValue: "0813 533 3616",
      supportHref: "tel:+2348135333616",
    },
  ],
  standard: {
    icon: "shield",
    title: "The Dric Standard",
    copy:
      "Every acquisition is a pact of taste and trust. We thank you for your discerning commitment to our philosophy.",
  },
};

const defaultTestimonialsPage: TestimonialsPageContent = {
  hero: {
    eyebrow: "Client Chronicles",
    titleLineOne: "Voices of",
    titleLineTwo: "Satisfaction",
    description:
      "An intimate look into the experiences of those who have invited the Dric Interior aesthetic into their private sanctuaries.",
  },
  featuredTestimonial: {
    quote:
      "\"Sincerely, they are very professional, I appreciate the way they used to relate with customers, it is just wonderful. The job they did for me is very very neat and good. Please keep it up, God bless you. I love you.\"",
    author: "Enoch Adeleke",
    role: "Residential Client",
    image: image(
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
      "Luxurious living room transformed by Dric Interior",
      900,
      1100,
    ),
  },
  secondaryTestimonial: {
    quote:
      "\"Dric interior gives the best at affordable rate and has the picture of his customer status and assumption of what the customer suit and brings it to actualization. Dric brings out who you are in interior decor.\"",
    author: "Adeola Ayodele",
    role: "Private Client",
    images: [
      image(
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80",
        "Interior detail with refined textures and ambient lighting",
        600,
        820,
      ),
      image(
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
        "Modern workspace with clean lines and warm materials",
        600,
        820,
      ),
    ],
  },
  gallery: {
    eyebrow: "Portfolio Snapshot",
    title: "The Canvas of Our Clients",
    images: [
      image(
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
        "Client project with bespoke kitchen and statement cabinetry",
        1400,
        1000,
      ),
      image(
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
        "Client project with dramatic bathroom and sculptural fixtures",
        800,
        800,
      ),
      image(
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
        "Client project with freestanding bath in a natural stone setting",
        800,
        800,
      ),
    ],
  },
  cta: {
    title: "Begin Your Journey",
    button: link("Book a Consultation", "/book-appointment"),
  },
};

const defaultNavbar: EditableSiteContent["navbar"] = {
  siteTitle: "Dric Interior",
  siteDescription:
    "Bespoke interior design studio creating timeless, highly tailored living spaces.",
  logo: logoImage,
  topBarEmail: "hello@dricinterior.com",
  topBarPhone: "+234 813 533 3616",
  navItems: [
    link("Projects", "/projects"),
    link("Services", "/services"),
    link("About", "/about"),
  ],
  actionLinks: [
    link("Projects", "/projects", { icon: "aperture" }),
    link("Services", "/services", { icon: "grid" }),
    link("Shop", "/shop", { icon: "shopping-bag" }),
  ],
  primaryCta: link("Consultation", "/book-appointment"),
  socialLinks: [
    link("Facebook", "https://facebook.com", { icon: "facebook", target: "_blank" }),
    link("X / Twitter", "https://x.com", { icon: "x-twitter", target: "_blank" }),
    link("Instagram", "https://instagram.com", { icon: "instagram", target: "_blank" }),
    link("YouTube", "https://youtube.com", { icon: "youtube", target: "_blank" }),
    link("WhatsApp", "https://wa.me/2348135333616", {
      icon: "whatsapp",
      target: "_blank",
    }),
  ],
};

const defaultFooter: EditableSiteContent["footer"] = {
  footerBlurb:
    "We are about creating exceptional, smart and beautifully designed spaces which reflect your character and bring each area to life.",
  footerEmail: "hello@dricinterior.com",
  footerPhone: "+234 813 533 3616",
  footerLocation: "Lagos, Nigeria",
  footerColumns: [
    {
      title: "Shop from us",
      links: [
        link("Sofa", "/shop"),
        link("Vanity", "/shop"),
        link("Fittings", "/shop"),
        link("Decor pieces", "/shop"),
      ],
    },
    {
      title: "Who we are",
      links: [
        link("About us", "/about"),
        link("Our projects", "/projects"),
        link("Testimonials", "/testimonials"),
        link("Services", "/services"),
      ],
    },
    {
      title: "Information",
      links: [
        link("Privacy Policy", "/privacy-policy"),
        link("Return and Refund Policy", "/return-and-refund-policy"),
      ],
    },
  ],
  copyrightText: "© Copyright 2025 DRIC INTERIOR. All rights reserved.",
};

const defaultEditableContent: EditableSiteContent = {
  navbar: defaultNavbar,
  footer: defaultFooter,
  homepage: defaultHomepage,
  about: defaultAboutPage,
  services: defaultServicesPage,
  serviceDetails: defaultServiceDetails,
  projects: defaultProjectsPage,
  contact: defaultContactPage,
  privacyPolicy: defaultPrivacyPolicyPage,
  returnPolicy: defaultReturnPolicyPage,
  testimonials: defaultTestimonialsPage,
};

async function readOverridesFile() {
  if (isBlobStorageConfigured()) {
    try {
      const blob = await head(BLOB_CONTENT_PATH);
      const response = await fetch(blob.url, { cache: "no-store" });

      if (!response.ok) {
        return {};
      }

      return (await response.json()) as Partial<EditableSiteContent>;
    } catch {
      return {};
    }
  }

  try {
    const file = await fs.readFile(CONTENT_FILE_PATH, "utf8");
    return JSON.parse(file) as Partial<EditableSiteContent>;
  } catch {
    return {};
  }
}

async function writeContentFile(content: EditableSiteContent) {
  if (isBlobStorageConfigured()) {
    await put(BLOB_CONTENT_PATH, JSON.stringify(content, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json; charset=utf-8",
    });

    return;
  }

  await fs.mkdir(path.dirname(CONTENT_FILE_PATH), { recursive: true });
  await fs.writeFile(
    CONTENT_FILE_PATH,
    JSON.stringify(content, null, 2),
    "utf8",
  );
}

export async function getEditableSiteContent(): Promise<EditableSiteContent> {
  noStore();
  const defaults = cloneDefaultContent();
  const overrides = await readOverridesFile();
  return mergeDeep(defaults, overrides);
}

export async function getEditableContentSection<K extends EditableAdminSectionKey>(
  section: K,
): Promise<EditableSiteContent[K]> {
  const content = await getEditableSiteContent();
  return content[section];
}

export async function saveEditableContentSection<K extends EditableAdminSectionKey>(
  section: K,
  value: EditableSiteContent[K],
) {
  const content = await getEditableSiteContent();
  const nextContent = {
    ...content,
    [section]: value,
  } satisfies EditableSiteContent;

  await writeContentFile(nextContent);
}

export function getAdminSectionDefinition(section: string) {
  return adminSectionDefinitions.find((item) => item.key === section);
}

export function isEditableAdminSectionKey(
  value: string,
): value is EditableAdminSectionKey {
  return adminSectionDefinitions.some((item) => item.key === value);
}

export function mergeSiteSettingsWithEditableContent(
  baseSettings: SiteSettings,
  content: EditableSiteContent,
): SiteSettings {
  return {
    ...baseSettings,
    ...content.navbar,
    ...content.footer,
    socialLinks: content.navbar.socialLinks,
    navItems: content.navbar.navItems,
    actionLinks: content.navbar.actionLinks,
    primaryCta: content.navbar.primaryCta,
    logo: content.navbar.logo,
  };
}
