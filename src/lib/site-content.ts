import * as prismic from "@prismicio/client";
import type { RichTextField } from "@prismicio/client";

import { createPrismicClient, linkResolver } from "@/lib/prismic";
import type {
  BlogPost,
  BlogPostSummary,
  EditableImage,
  HomePage,
  SeoData,
  ShopPage,
  SiteLink,
  SiteSettings,
} from "@/types/site";

type PrismicData = Record<string, unknown>;
type PrismicGroupItem = Record<string, unknown>;

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

const richText = (
  blocks: Array<{ type: string; text: string }>,
): RichTextField =>
  blocks.map((block) => ({
    type: block.type,
    text: block.text,
    spans: [],
  })) as RichTextField;

const fallbackHeroImage = image(
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
  "Luxury living room with layered lighting and sculptural furnishings",
  1800,
  1200,
);

const fallbackSeo = (title: string, description: string): SeoData => ({
  title,
  description,
  keywords: [
    "luxury interior design",
    "bespoke interiors",
    "residential interiors",
    "interior architecture",
    "modern interiors",
  ],
  image: fallbackHeroImage,
});

const fallbackShopHeroImage = image(
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80",
  "Refined furniture and decor styling inside a luxury interior shop",
  1800,
  1200,
);

const fallbackSettings: SiteSettings = {
  siteTitle: "Dric Interior",
  siteDescription:
    "Bespoke interior design studio creating timeless, highly tailored living spaces.",
  topBarEmail: "hello@dricinterior.com",
  topBarPhone: "+234 813 533 3616",
  navItems: [
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ],
  primaryCta: { label: "Consultation", href: "/contact" },
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  footerBlurb:
    "We are about creating exceptional, smart and beautifully designed spaces which reflect your character and bring each area to life.",
  footerEmail: "hello@dricinterior.com",
  footerPhone: "+234 813 533 3616",
  footerLocation: "Lagos, Nigeria",
  footerColumns: [
    {
      title: "Shop from us",
      links: [
        { label: "Sofa", href: "/shop" },
        { label: "Vanity", href: "/shop" },
        { label: "Fittings", href: "/shop" },
        { label: "Decor pieces", href: "/shop" },
      ],
    },
    {
      title: "Who we are",
      links: [
        { label: "About us", href: "/about" },
        { label: "Our projects", href: "/projects" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Services", href: "/services" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Return and Refund Policy", href: "/return-and-refund-policy" },
      ],
    },
  ],
  copyrightText: "© Copyright 2025 DRIC INTERIOR. All rights reserved.",
  seo: fallbackSeo(
    "Dric Interior | Luxury Interior Design Studio",
    "Luxury interior design studio crafting authentic, highly tailored spaces with editorial elegance and technical precision.",
  ),
};

const fallbackHomePage: HomePage = {
  seo: fallbackSeo(
    "Luxury Interior Design for Elevated Living",
    "Discover bespoke interior design services, curated portfolios, and refined spaces shaped around your story.",
  ),
  hero: {
    eyebrow: "",
    title: "Elevated Living\nSpaces",
    description:
      "Crafting bespoke interiors that harmonize architectural precision with the warmth of a curated home.",
    backgroundImage: fallbackHeroImage,
    overlayStart: "rgba(11, 12, 16, 0.82)",
    overlayEnd: "rgba(31, 20, 13, 0.35)",
    primaryCta: { label: "View Our Portfolio", href: "/#portfolio" },
    secondaryCta: { label: "The Design Philosophy", href: "/#about" },
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
        "Premium cabinetry, book-matched marble countertops, and a fully layered lighting scheme — a residential kitchen designed at every scale.",
      category: "Residential",
      image: image(
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
        "Modern kitchen with marble countertops and bespoke cabinetry",
        1400,
        900,
      ),
      link: { label: "View Project", href: "/blog/kitchen-cabinet-0503" },
    },
    secondaryProjects: [
      {
        title: "Stone Wall Featuring",
        summary:
          "A dramatic limestone feature wall — floor-to-ceiling, tight-jointed, and grazed with concealed light.",
        category: "Residential",
        image: image(
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80",
          "Natural stone feature wall in a luxury living space",
          1000,
          1000,
        ),
        link: { label: "View Project", href: "/blog/stone-wall-featuring" },
      },
      {
        title: "Executive Suite — V.I.",
        summary:
          "A high-specification commercial office on Victoria Island where material restraint communicates authority.",
        category: "Commercial",
        image: image(
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
          "Executive office suite with premium finishes and ambient lighting",
          1000,
          1000,
        ),
        link: { label: "View Project", href: "/blog/executive-suite-vi" },
      },
    ],
    backgroundColor: "#111217",
  },
  mission: {
    titleLineOne: "Our mission is to create",
    titleLineTwo: "authentic interior design tailored to\nyour story.",
    highlightPhrase: "authentic interior design",
    backgroundColor: "#14161b",
    pillars: [
      {
        title: "The Vision",
        body: "To be the global benchmark for bespoke luxury interiors that seamlessly integrate aesthetics into living spaces.",
      },
      {
        title: "The Mission",
        body: "Curating environments that do not just look exquisite but enhance the emotional well-being of every inhabitant.",
      },
      {
        title: "The Values",
        body: "Integrity in materials, precision in execution, and an unwavering commitment to our clients' unique identities.",
      },
    ],
  },
  testimonials: {
    title: "Kind Words from Our Clients",
    backgroundColor: "#111217",
    items: [
      {
        quote:
          "Great services with excellent deliveries. You would love working with them.",
        author: "Ezekiel Folorunso",
      },
      {
        quote:
          "Top notch in service and delivery powered with modern designs and with pleasant aesthetic outlook.",
        author: "Fada Gbolahan",
      },
    ],
  },
  finalCta: {
    title: "We deliver luxurious and\nInnovative Spaces",
    highlightPhrase: "Innovative Spaces",
    description:
      "Ready to transform your vision into an architectural masterpiece? Let's collaborate on your next project.",
    button: { label: "Book an Appointment", href: "/#contact" },
    backgroundColor: "#111217",
    accentColor: "#f7b51f",
  },
};

const fallbackShopPage: ShopPage = {
  seo: {
    title: "Luxury Furniture, Vanity Units and Decor",
    description:
      "Shop curated interior pieces from Dric Interior, including statement sofas, vanity units, fittings, and decor accents for elevated living.",
    keywords: [
      "luxury furniture shop",
      "interior decor shop",
      "vanity units",
      "designer fittings",
      "premium home decor",
    ],
    image: fallbackShopHeroImage,
  },
  hero: {
    eyebrow: "Shop from us",
    title: "Curated Objects for Refined Spaces",
    description:
      "A tailored collection of statement furniture, crafted fittings, and decor essentials chosen to bring architectural calm and tactile richness into everyday living.",
    backgroundImage: fallbackShopHeroImage,
    overlayStart: "rgba(12, 14, 18, 0.82)",
    overlayEnd: "rgba(25, 18, 12, 0.48)",
  },
  intro: {
    title: "Furniture, fittings and decor with a quieter kind of luxury.",
    description:
      "Our shop extends the studio's design language into collectible pieces and room-defining essentials. Each selection is made to sit naturally inside modern, high-detail interiors.",
    backgroundColor: "#111217",
  },
  featuredProduct: {
    category: "Featured Piece",
    title: "Obsidian Lounge Sofa",
    description:
      "A sculptural low-profile sofa wrapped in performance boucle with a deep seat designed for long, immersive living room moments.",
    price: "From ₦2,850,000",
    image: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "Statement sofa in a warm luxury living room",
      1400,
      1000,
    ),
    cta: { label: "Enquire Now", href: "/contact" },
    accentColor: "#f7b51f",
  },
  products: [
    {
      category: "Sofa",
      title: "Atelier Crescent Sofa",
      description:
        "Curved silhouette, tailored upholstery, and deep proportions for a room with composure.",
      price: "₦2,200,000",
      image: image(
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
        "Curved luxury sofa in an editorial interior",
        1000,
        1000,
      ),
      cta: { label: "Enquire", href: "/contact" },
      accentColor: "#c8a67c",
    },
    {
      category: "Vanity",
      title: "Monolith Vanity Unit",
      description:
        "Stone-look volume paired with bronze details and concealed storage for elegant morning rituals.",
      price: "₦1,480,000",
      image: image(
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
        "Luxury vanity and dresser styling",
        1000,
        1000,
      ),
      cta: { label: "Enquire", href: "/contact" },
      accentColor: "#d8b98b",
    },
    {
      category: "Fittings",
      title: "Brushed Brass Pull Set",
      description:
        "Architectural hardware with a warm satin finish for cabinetry, wardrobes, and feature joinery.",
      price: "₦185,000",
      image: image(
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80",
        "Premium hardware and fittings for joinery",
        1000,
        1000,
      ),
      cta: { label: "Enquire", href: "/contact" },
      accentColor: "#b9925f",
    },
    {
      category: "Decor Pieces",
      title: "Sculpted Travertine Lamp",
      description:
        "A textured lighting accent that softens corners and adds material depth to side tables and consoles.",
      price: "₦420,000",
      image: image(
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
        "Decor lamp and sculptural accent piece",
        1000,
        1000,
      ),
      cta: { label: "Enquire", href: "/contact" },
      accentColor: "#c7a56f",
    },
  ],
  cta: {
    title: "Need a tailored sourcing recommendation?",
    description:
      "Tell us the room, finish palette, and scale you are working with and we will guide you toward the right piece.",
    button: { label: "Book a Consultation", href: "/contact" },
    backgroundColor: "#111217",
  },
};

const fallbackBlogPosts: BlogPost[] = [
  {
    id: "quiet-luxury-interiors",
    uid: "quiet-luxury-interiors",
    title: "How Quiet Luxury Shapes More Meaningful Interiors",
    excerpt:
      "A look at how restrained palettes, tactile materials, and thoughtful lighting create interiors with staying power.",
    category: "Design Insight",
    author: "Dric Interior Studio",
    publishedAt: "2026-04-03T10:00:00.000Z",
    readingMinutes: 4,
    coverImage: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "Quiet luxury living room with warm lighting and rich materials",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "How Quiet Luxury Shapes More Meaningful Interiors",
      "Learn how quiet luxury principles help interior spaces feel calm, rich, and deeply personal.",
    ),
    body: richText([
      {
        type: "heading2",
        text: "Luxury does not need to announce itself loudly",
      },
      {
        type: "paragraph",
        text: "Quiet luxury in interiors is less about trend and more about confidence. It depends on precision, restraint, and a deep understanding of how people actually live in a space.",
      },
      {
        type: "paragraph",
        text: "Instead of relying on visual overload, refined homes layer natural stone, crafted timber, performance fabrics, and sculptural lighting to build atmosphere. The result is a room that feels rich before it feels decorative.",
      },
      {
        type: "heading3",
        text: "Designing for longevity",
      },
      {
        type: "paragraph",
        text: "When every surface is selected for longevity and emotional resonance, the interior becomes easier to live with and harder to outgrow. That is the difference between an expensive room and a truly valuable one.",
      },
    ]),
  },
  {
    id: "layering-light-in-modern-homes",
    uid: "layering-light-in-modern-homes",
    title: "Layering Light in Modern Homes",
    excerpt:
      "Ambient, task, and accent lighting each carry different emotional weight. Here is how to blend them without losing clarity.",
    category: "Project Notes",
    author: "Dric Interior Studio",
    publishedAt: "2026-03-20T10:00:00.000Z",
    readingMinutes: 5,
    coverImage: image(
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
      "Warmly lit modern living space with layered light sources",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "Layering Light in Modern Homes",
      "A practical guide to using ambient, task, and accent lighting in luxury interiors.",
    ),
    body: richText([
      {
        type: "paragraph",
        text: "Lighting defines how materials read, how people move, and how the entire home feels from morning to evening.",
      },
      {
        type: "paragraph",
        text: "The most resolved spaces treat lighting as an architectural layer rather than a finishing touch. Recessed light establishes calm, decorative light adds personality, and concealed details soften edges that would otherwise feel severe.",
      },
      {
        type: "paragraph",
        text: "When these layers are balanced, the room holds its character in daylight and after dark.",
      },
    ]),
  },
  {
    id: "materials-that-age-gracefully",
    uid: "materials-that-age-gracefully",
    title: "Materials That Age Gracefully",
    excerpt:
      "The best interiors improve with use. These are the finishes we return to when durability and beauty need to coexist.",
    category: "Material Guide",
    author: "Dric Interior Studio",
    publishedAt: "2026-03-08T10:00:00.000Z",
    readingMinutes: 4,
    coverImage: image(
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
      "Close-up of wood, stone, and textile finishes in an interior",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "Materials That Age Gracefully",
      "Discover the natural materials and refined finishes that keep luxury interiors beautiful over time.",
    ),
    body: richText([
      {
        type: "paragraph",
        text: "A graceful interior is built on finishes that welcome touch, light, and time. Natural stone develops character, solid timber gains depth, and textured fabrics soften the atmosphere without losing performance.",
      },
      {
        type: "paragraph",
        text: "Choosing materials this way changes the conversation. The goal is no longer to keep a room frozen, but to let it mature elegantly alongside the people living in it.",
      },
    ]),
  },

  // ── Project case studies ──────────────────────────────────────────
  {
    id: "kitchen-cabinet-0503",
    uid: "kitchen-cabinet-0503",
    title: "Project Notes: Kitchen Cabinet 0503",
    excerpt:
      "A seamlessly designed kitchen featuring premium cabinetry, marble countertops, and integrated ambient lighting — a study in precision and restraint.",
    category: "Project Notes",
    author: "Dric Interior Studio",
    publishedAt: "2026-04-10T10:00:00.000Z",
    readingMinutes: 5,
    coverImage: image(
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
      "Modern kitchen with marble countertops and bespoke cabinetry",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "Project Notes: Kitchen Cabinet 0503 — Dric Interior",
      "A behind-the-scenes look at the design decisions that shaped one of our most refined residential kitchen transformations.",
    ),
    body: richText([
      {
        type: "heading2",
        text: "The Brief: A Kitchen That Earns Its Place in a Refined Home",
      },
      {
        type: "paragraph",
        text: "The client came to us with a clear conviction — the kitchen was the most used room in the house, and it deserved the same level of consideration as every other space. What they had was functional. What they wanted was something that felt designed at every scale, from the profile of the door fronts to the edge detail of the marble slab.",
      },
      {
        type: "paragraph",
        text: "Project 0503 became one of the most technically precise residential commissions we have undertaken. Every element was custom — nothing pulled off a shelf, nothing accepted at standard dimensions.",
      },
      {
        type: "heading3",
        text: "Cabinetry: The Architecture of the Kitchen",
      },
      {
        type: "paragraph",
        text: "The cabinetry was designed floor-to-ceiling with a subtle grain match across all door panels — requiring precise sequencing from the timber supplier through to the spray finishing and installation team. Flat-front doors with a 2mm radius edge give the joinery an almost architectural quality, reading as a series of planes rather than a bank of storage.",
      },
      {
        type: "paragraph",
        text: "All hardware is recessed or concealed. The handles are integrated into the top edge of each door, maintaining a completely clean face on the cabinetry. This was one of the defining details that elevated the scheme beyond what typical cabinetry programmes can offer.",
      },
      {
        type: "heading3",
        text: "The Marble: Sourced, Not Selected",
      },
      {
        type: "paragraph",
        text: "The marble countertop is a matched slab — meaning both the island and the perimeter run came from the same block, cut and laid so the veining flows continuously across the entire kitchen. We sourced this from a quarry supplier in Portugal and visited the slab yard personally to select the book-matched pair.",
      },
      {
        type: "paragraph",
        text: "Marble in a working kitchen is always a considered choice. It requires care, but it also rewards it — developing a patina over time that no engineered stone can replicate. We sealed the material thoroughly and briefed the client on maintenance protocols, but ultimately the material was chosen because it belongs in this room.",
      },
      {
        type: "heading3",
        text: "Lighting: The Layer Most Kitchens Miss",
      },
      {
        type: "paragraph",
        text: "Ambient, task, and accent lighting were specified as three distinct layers. Recessed downlights on a warm dimming circuit handle the ambient. Under-cabinet LED strips — fully concealed behind a shadow-gap detail — provide task lighting across every work surface without any visible fittings.",
      },
      {
        type: "paragraph",
        text: "The interior of the glass upper cabinets is lit with a thin profile strip to give depth to the display areas after dark. When the ambient lighting is dimmed, the kitchen transforms from a working space into something far more atmospheric — a result that the client told us surprised them entirely when they first experienced it at night.",
      },
      {
        type: "heading3",
        text: "What This Project Taught Us",
      },
      {
        type: "paragraph",
        text: "The success of 0503 came from the decision made at the outset to treat every material and every detail with equal weight. In kitchens, it is easy to invest heavily in the countertop and compromise elsewhere. We refused to do that. The result is a room that holds together completely — and that is the only standard worth working to.",
      },
    ]),
  },

  {
    id: "room-transformation",
    uid: "room-transformation",
    title: "Project Notes: Room Transformation",
    excerpt:
      "How a dated, disconnected living room became a contemporary haven of warmth, layered sophistication, and deeply considered material choices.",
    category: "Project Notes",
    author: "Dric Interior Studio",
    publishedAt: "2026-04-05T10:00:00.000Z",
    readingMinutes: 5,
    coverImage: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "Transformed living room with warm accent lighting",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "Project Notes: Room Transformation — Dric Interior",
      "A deep look at how we transformed a tired living space into a layered, sophisticated contemporary interior.",
    ),
    body: richText([
      {
        type: "heading2",
        text: "The Room Before: Functional, But Forgettable",
      },
      {
        type: "paragraph",
        text: "When we first walked into this living room, it had everything it needed and nothing it deserved. Adequate lighting, serviceable furniture, neutral walls. It was a room that had never been designed — only occupied. The client had lived with it for four years and reached the point where they could no longer ignore what it lacked.",
      },
      {
        type: "paragraph",
        text: "What followed was one of the most complete residential transformations we have delivered — not in terms of structural change, but in terms of the depth of thinking applied to every single layer of the space.",
      },
      {
        type: "heading3",
        text: "The Palette: Warmth Without Heaviness",
      },
      {
        type: "paragraph",
        text: "The brief was warmth — but the client was clear they did not want a dark or heavy room. The solution was a palette built from warm neutrals with significant depth variation: a limewash wall finish in a deep warm greige, balanced by lighter upholstery fabrics and natural timber tones in the joinery.",
      },
      {
        type: "paragraph",
        text: "Accent colours were introduced sparingly through cushions, a single armchair, and a hand-knotted rug sourced from a specialist importer. The rug became the anchor of the room — its tones drawing the eye down and giving every other decision something to respond to.",
      },
      {
        type: "heading3",
        text: "Furniture: Edited and Purposeful",
      },
      {
        type: "paragraph",
        text: "We removed more than we added. The existing furniture was replaced almost entirely, but the new scheme uses fewer pieces — each one more considered and more capable of commanding space. A custom sofa with deep seats and a low-profile back keeps the sightlines open. A single large-scale side table anchors one end of the seating arrangement.",
      },
      {
        type: "paragraph",
        text: "Every piece was either custom-made or specially sourced — nothing arrived in a standard retail box. The proportions were worked out in the drawings before anything was ordered, which is the only reliable way to ensure pieces that actually fit the room rather than merely fitting inside it.",
      },
      {
        type: "heading3",
        text: "Lighting: The Transformation Within the Transformation",
      },
      {
        type: "paragraph",
        text: "If there was a single intervention that changed this room most dramatically, it was the lighting redesign. The existing single ceiling pendant was replaced with a layered scheme: recessed warm-dim downlights on a dimmer circuit, two table lamps on switched outlets, concealed cove lighting above the joinery, and a statement pendant over the seating centre.",
      },
      {
        type: "paragraph",
        text: "The effect after dark is entirely different from the effect in daylight — and both versions of the room are beautiful. The client described walking in after the final installation as feeling like entering a completely different house. That is precisely the outcome we designed for.",
      },
    ]),
  },

  {
    id: "walk-in-closet-ikeja",
    uid: "walk-in-closet-ikeja",
    title: "Project Notes: Walk-in Closet — Ikeja",
    excerpt:
      "A bespoke walk-in wardrobe system designed for a private residence in Ikeja — where seamless organisation meets understated elegance in every detail.",
    category: "Project Notes",
    author: "Dric Interior Studio",
    publishedAt: "2026-03-28T10:00:00.000Z",
    readingMinutes: 4,
    coverImage: image(
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
      "Bespoke walk-in closet with integrated storage and lighting",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "Project Notes: Walk-in Closet Ikeja — Dric Interior",
      "How we designed and delivered a fully bespoke walk-in wardrobe system for a private residence in Ikeja.",
    ),
    body: richText([
      {
        type: "heading2",
        text: "A Wardrobe That Functions as a Room",
      },
      {
        type: "paragraph",
        text: "The walk-in wardrobe is one of the most personal spaces in a home — the room you begin and end every day in. For this commission in Ikeja, the client wanted a wardrobe that felt less like storage and more like a private dressing room: a space with atmosphere, intention, and a level of finish consistent with the rest of their home.",
      },
      {
        type: "paragraph",
        text: "The brief called for a fully bespoke system — nothing modular, nothing assembled from catalogue parts. Every dimension, every internal configuration, every material and finish was designed specifically for this room, this client, and this wardrobe.",
      },
      {
        type: "heading3",
        text: "The Layout: Designed Around Use",
      },
      {
        type: "paragraph",
        text: "We began with a detailed audit of the client's wardrobe contents — the number of long-hang items, folded items, shoes, accessories, and the frequency with which different sections were used. This informed every interior dimension, from the height of the hanging rails to the depth of the drawer units.",
      },
      {
        type: "paragraph",
        text: "The result is a layout that looks symmetrical and resolved from the outside, but is actually highly specific on the inside — with the right amount of space in exactly the right places.",
      },
      {
        type: "heading3",
        text: "Materials: Restrained and Rich",
      },
      {
        type: "paragraph",
        text: "The carcass is finished in a warm white lacquer with a very fine sheen — not flat, not gloss, but a surface that catches light subtly and reads as considered rather than clinical. The internal drawers are lined in a pale greige fabric that elevates even the most mundane interaction with the wardrobe.",
      },
      {
        type: "paragraph",
        text: "Handles are a slim brushed brass pull — consistent across all doors and drawers, and chosen for its ability to disappear into the overall scheme while maintaining a premium touch quality.",
      },
      {
        type: "heading3",
        text: "Lighting: Every Detail Visible",
      },
      {
        type: "paragraph",
        text: "LED strip lighting is integrated into every section — not just the hanging areas. Shelves, drawer interiors, and the shoe display are all gently illuminated. The light sources are fully concealed behind profiled shadow-gaps, so what you see is light, not fittings.",
      },
      {
        type: "paragraph",
        text: "The motion-activated system means the wardrobe illuminates as you enter and dims as you leave — a small detail that makes a significant contribution to the daily experience of the space.",
      },
    ]),
  },

  {
    id: "small-space-closet",
    uid: "small-space-closet",
    title: "Project Notes: Small Space Closet",
    excerpt:
      "How spatial intelligence and material craft transformed a compact closet into one of the most satisfying spaces in the home.",
    category: "Project Notes",
    author: "Dric Interior Studio",
    publishedAt: "2026-03-15T10:00:00.000Z",
    readingMinutes: 4,
    coverImage: image(
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "Compact closet with intelligent storage solutions",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "Project Notes: Small Space Closet — Dric Interior",
      "A case study in how thoughtful spatial planning and quality materials can make a small closet feel exceptional.",
    ),
    body: richText([
      {
        type: "heading2",
        text: "Small Does Not Mean Less",
      },
      {
        type: "paragraph",
        text: "The instinct with a small space is always to apologise for what it lacks. Our instinct is the opposite — to find what the space can do well, and push that as far as it will go. This compact closet project began with that premise and delivered an outcome that the client now describes as their favourite room in the house.",
      },
      {
        type: "paragraph",
        text: "The footprint was tight. The ceiling height was average. But the location was good — adjacent to the master bathroom — and the brief was clear: maximum storage, minimum visual clutter, and a finish quality that made no concessions for the room's size.",
      },
      {
        type: "heading3",
        text: "The Intelligence Is in the Plan",
      },
      {
        type: "paragraph",
        text: "Before a single material was chosen, the plan was drawn and redrawn until every square centimetre was accounted for. The storage system is designed in zones — hanging, folding, shoes, and accessories — each positioned to allow free movement between sections without the space ever feeling congested.",
      },
      {
        type: "paragraph",
        text: "A key decision was the use of a pull-out valet rail at the end of the hanging section — a compact feature that dramatically improves the daily ritual of getting dressed without consuming meaningful floor area.",
      },
      {
        type: "heading3",
        text: "Visual Simplicity as a Design Tool",
      },
      {
        type: "paragraph",
        text: "In a small space, visual complexity is the enemy of calm. Every surface is the same colour. Every door front is the same profile. Every handle is the same finish. The uniformity creates a sense of continuity that makes the space feel larger than it is, and more resolved than a room of any size has any right to be.",
      },
      {
        type: "paragraph",
        text: "The integrated lighting does the same work — concealed strips that illuminate evenly, with no visible fittings and no shadows. When the light is on, everything in the closet is perfectly visible. When it is off, the room reads as a single quiet volume. Both states are beautiful.",
      },
    ]),
  },

  {
    id: "stone-wall-featuring",
    uid: "stone-wall-featuring",
    title: "Project Notes: Stone Wall Featuring",
    excerpt:
      "A dramatic natural stone feature wall that defines the entire character of a private residence — and the story of how we designed and built it.",
    category: "Project Notes",
    author: "Dric Interior Studio",
    publishedAt: "2026-03-22T10:00:00.000Z",
    readingMinutes: 5,
    coverImage: image(
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
      "Natural stone feature wall in a luxury living space",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "Project Notes: Stone Wall Feature — Dric Interior",
      "The story behind our most dramatic residential feature wall — from stone selection to final installation.",
    ),
    body: richText([
      {
        type: "heading2",
        text: "When a Single Wall Changes Everything",
      },
      {
        type: "paragraph",
        text: "There are projects where the defining idea is complex and layered — arrived at through weeks of options and iterations. And then there are projects where the defining idea is singular and immediate. The stone feature wall in this private residence was the latter. From the first site visit, it was clear that the main living room had one wall that could carry the entire architectural identity of the space.",
      },
      {
        type: "paragraph",
        text: "The challenge was not conceiving the idea — it was executing it with the precision and material quality that the idea demanded.",
      },
      {
        type: "heading3",
        text: "Stone Selection: A Journey, Not a Catalogue Choice",
      },
      {
        type: "paragraph",
        text: "We considered seven different stone types before making a final recommendation. Travertine was too warm for the palette we were building. Slate was too heavy. The client was drawn to marble, but we were wary of a wall that would compete with the rest of the room rather than anchor it.",
      },
      {
        type: "paragraph",
        text: "The final choice was a grey limestone with subtle movement — enough veining to be interesting, but with a quiet enough character to recede when the room was occupied and assert itself when it was empty. We sourced it from a specialist supplier and selected every slab individually before the order was confirmed.",
      },
      {
        type: "heading3",
        text: "The Installation: Precision at Scale",
      },
      {
        type: "paragraph",
        text: "The wall runs floor-to-ceiling across the full width of the living room — approximately 6.2 metres wide and 3.1 metres high. Each slab was cut to a consistent height but varied width, creating a staggered vertical joint that adds rhythm without looking random.",
      },
      {
        type: "paragraph",
        text: "The joints are tight — 1.5mm throughout — requiring the substrate to be perfectly plumb and flat before any stone was hung. The installation took five days, each slab positioned individually with the team checking alignment at every course.",
      },
      {
        type: "heading3",
        text: "Lighting: The Wall After Dark",
      },
      {
        type: "paragraph",
        text: "Concealed grazing light was specified at both the top and base of the wall — low-profile LED channels that wash the stone surface from both directions and reveal the texture of the material in a way that ambient room light never could.",
      },
      {
        type: "paragraph",
        text: "After dark, with the grazing lights active and the ambient lighting dimmed, the wall becomes an entirely different object. The texture reads dramatically, the shadows between the slabs deepen, and the room's character shifts completely. It is a reminder that in every stone installation, you are really designing with two materials — the stone and the light.",
      },
    ]),
  },

  {
    id: "executive-suite-vi",
    uid: "executive-suite-vi",
    title: "Project Notes: Executive Suite — Victoria Island",
    excerpt:
      "A high-specification commercial office transformation on Victoria Island — balancing the demands of productivity with the language of refined material excellence.",
    category: "Project Notes",
    author: "Dric Interior Studio",
    publishedAt: "2026-04-01T10:00:00.000Z",
    readingMinutes: 5,
    coverImage: image(
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
      "Executive office suite with premium finishes and ambient lighting",
      1400,
      900,
    ),
    seo: fallbackSeo(
      "Project Notes: Executive Suite Victoria Island — Dric Interior",
      "A behind-the-scenes look at our commercial office transformation on Victoria Island — where productivity meets material excellence.",
    ),
    body: richText([
      {
        type: "heading2",
        text: "Commercial Interiors That Command Respect",
      },
      {
        type: "paragraph",
        text: "The best commercial interiors do two things simultaneously: they support the work that happens inside them, and they communicate something about the organisation that occupies them. This executive suite commission on Victoria Island demanded both — with no compromise between function and finish.",
      },
      {
        type: "paragraph",
        text: "The client is the regional director of a financial services firm. The space needed to project authority, discretion, and capability. It also needed to be a genuinely comfortable environment in which to work for long hours and receive high-value clients in equal measure.",
      },
      {
        type: "heading3",
        text: "The Brief: Authority Without Aggression",
      },
      {
        type: "paragraph",
        text: "We were asked to avoid the conventional signals of corporate power — no dark mahogany, no aggressive scale, no gold accents used for their own sake. The brief called for something more contemporary: a space that communicated precision and confidence through restraint rather than display.",
      },
      {
        type: "paragraph",
        text: "The palette we developed is anchored by a deep charcoal wall finish, balanced by warm timber joinery and a pale stone floor. The furniture is upholstered in performance leather — durable, quiet, and impeccably proportioned.",
      },
      {
        type: "heading3",
        text: "The Desk: The Room's Central Object",
      },
      {
        type: "paragraph",
        text: "The executive desk was custom-designed — a significant investment that was nonetheless non-negotiable. A standard desk in an otherwise bespoke room is the detail that collapses the entire design. This piece was built to the same standard as every other element: a solid timber top with a leather inlay writing surface, on a base that combines timber and brushed metal.",
      },
      {
        type: "paragraph",
        text: "Cable management is fully integrated and invisible. The desk does exactly what it needs to do functionally — and it does it with the kind of quiet authority that the brief demanded.",
      },
      {
        type: "heading3",
        text: "The Meeting Area: Separation Within the Same Space",
      },
      {
        type: "paragraph",
        text: "A secondary seating area within the suite creates a defined meeting zone without physical separation. Two armchairs and a low table face a wall-hung display — a configuration that shifts the room's dynamic from executive workspace to meeting room without any furniture being moved.",
      },
      {
        type: "paragraph",
        text: "The transition between the two zones is marked by a change in flooring — from stone to a bespoke rug — and a shift in the lighting level, which is independently controlled to reinforce the spatial separation.",
      },
      {
        type: "heading3",
        text: "The Outcome",
      },
      {
        type: "paragraph",
        text: "The suite has since hosted client meetings at the highest level, and the feedback has been consistent: the room communicates the firm's standards before a word is spoken. That is precisely what a well-designed commercial interior should do — and precisely the standard we hold ourselves to on every project.",
      },
    ]),
  },
];

function readText(value: unknown, fallback = "") {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return prismic.asText(value as RichTextField).trim() || fallback;
  }

  return fallback;
}

function readColor(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function readImage(value: unknown, fallback: EditableImage): EditableImage {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const maybeImage = value as {
    url?: string;
    alt?: string | null;
    dimensions?: { width?: number; height?: number };
  };

  if (!maybeImage.url) {
    return fallback;
  }

  return {
    url: maybeImage.url,
    alt: maybeImage.alt || fallback.alt,
    width: maybeImage.dimensions?.width || fallback.width,
    height: maybeImage.dimensions?.height || fallback.height,
  };
}

function readKeywords(value: unknown, fallback: string[]) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  return value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function readGroup(value: unknown): PrismicGroupItem[] {
  return Array.isArray(value) ? (value as PrismicGroupItem[]) : [];
}

function buildLink(
  labelValue: unknown,
  linkValue: unknown,
  fallback: SiteLink,
): SiteLink {
  const href =
    prismic.asLink(linkValue as prismic.LinkField, linkResolver) ?? fallback.href;
  const target =
    linkValue && typeof linkValue === "object" && "target" in linkValue
      ? typeof (linkValue as { target?: unknown }).target === "string"
        ? (linkValue as { target?: string }).target
        : undefined
      : undefined;

  return {
    label: readText(labelValue, fallback.label),
    href,
    target,
  };
}

function readingMinutes(field: RichTextField) {
  const words = prismic.asText(field).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function mapSeo(
  data: PrismicData,
  fallback: SeoData,
  imageFieldName: string,
): SeoData {
  return {
    title: readText(data.seo_title, fallback.title),
    description: readText(data.seo_description, fallback.description),
    keywords: readKeywords(data.seo_keywords, fallback.keywords),
    image: readImage(data[imageFieldName], fallback.image),
  };
}

function mapSettings(document: prismic.PrismicDocument): SiteSettings {
  const data = document.data as PrismicData;
  const navItems = readGroup(data.navigation_items).map((item, index) =>
    buildLink(item.label, item.link, fallbackSettings.navItems[index] || {
      label: `Navigation ${index + 1}`,
      href: "/",
    }),
  );
  const socialLinks = readGroup(data.social_links).map((item, index) =>
    buildLink(item.label, item.link, fallbackSettings.socialLinks[index] || {
      label: `Social ${index + 1}`,
      href: "/",
    }),
  );
  const shopLinks = readGroup(data.shop_column_links).map((item, index) =>
    buildLink(item.label, item.link, fallbackSettings.footerColumns[0].links[index] || {
      label: `Shop ${index + 1}`,
      href: "/",
    }),
  );
  const whoWeAreLinks = readGroup(data.about_column_links).map((item, index) =>
    buildLink(item.label, item.link, fallbackSettings.footerColumns[1].links[index] || {
      label: `About ${index + 1}`,
      href: "/",
    }),
  );
  const infoLinks = readGroup(data.info_column_links).map((item, index) =>
    buildLink(item.label, item.link, fallbackSettings.footerColumns[2].links[index] || {
      label: `Info ${index + 1}`,
      href: "/",
    }),
  );

  return {
    siteTitle: readText(data.site_title, fallbackSettings.siteTitle),
    siteDescription: readText(
      data.site_description,
      fallbackSettings.siteDescription,
    ),
    topBarEmail: readText(data.top_bar_email, fallbackSettings.topBarEmail),
    topBarPhone: readText(data.top_bar_phone, fallbackSettings.topBarPhone),
    navItems: navItems.length > 0 ? navItems : fallbackSettings.navItems,
    primaryCta: buildLink(
      data.primary_cta_label,
      data.primary_cta_link,
      fallbackSettings.primaryCta,
    ),
    socialLinks:
      socialLinks.length > 0 ? socialLinks : fallbackSettings.socialLinks,
    footerBlurb: readText(data.footer_blurb, fallbackSettings.footerBlurb),
    footerEmail: readText(data.footer_email, fallbackSettings.footerEmail),
    footerPhone: readText(data.footer_phone, fallbackSettings.footerPhone),
    footerLocation: readText(data.footer_location, fallbackSettings.footerLocation),
    footerColumns: [
      {
        title: readText(
          data.shop_column_title,
          fallbackSettings.footerColumns[0].title,
        ),
        links:
          shopLinks.length > 0
            ? shopLinks
            : fallbackSettings.footerColumns[0].links,
      },
      {
        title: readText(
          data.about_column_title,
          fallbackSettings.footerColumns[1].title,
        ),
        links:
          whoWeAreLinks.length > 0
            ? whoWeAreLinks
            : fallbackSettings.footerColumns[1].links,
      },
      {
        title: readText(
          data.info_column_title,
          fallbackSettings.footerColumns[2].title,
        ),
        links:
          infoLinks.length > 0
            ? infoLinks
            : fallbackSettings.footerColumns[2].links,
      },
    ],
    copyrightText: readText(
      data.copyright_text,
      fallbackSettings.copyrightText,
    ),
    seo: mapSeo(data, fallbackSettings.seo, "social_image"),
  };
}

function mapHomepage(document: prismic.PrismicDocument): HomePage {
  const data = document.data as PrismicData;
  const serviceItems = readGroup(data.service_items).map((item, index) => {
    const fallbackItem =
      fallbackHomePage.services.items[index] || fallbackHomePage.services.items[0];

    return {
      title: readText(item.title, fallbackItem.title),
      subtitle: readText(item.subtitle, fallbackItem.subtitle),
      image: readImage(item.image, fallbackItem.image),
      overlayColor: readColor(item.overlay_color, fallbackItem.overlayColor),
    };
  });

  const secondaryProjects = readGroup(data.portfolio_secondary_projects).map(
    (item, index) => {
      const fallbackItem =
        fallbackHomePage.portfolio.secondaryProjects[index] ||
        fallbackHomePage.portfolio.secondaryProjects[0];

      return {
        title: readText(item.title, fallbackItem.title),
        summary: readText(item.summary, fallbackItem.summary),
        category: readText(item.category, fallbackItem.category),
        image: readImage(item.image, fallbackItem.image),
        link: buildLink(item.link_label, item.link, fallbackItem.link),
      };
    },
  );

  const pillars = readGroup(data.mission_pillars).map((item, index) => {
    const fallbackItem =
      fallbackHomePage.mission.pillars[index] || fallbackHomePage.mission.pillars[0];

    return {
      title: readText(item.title, fallbackItem.title),
      body: readText(item.body, fallbackItem.body),
    };
  });

  const testimonials = readGroup(data.testimonial_items).map((item, index) => {
    const fallbackItem =
      fallbackHomePage.testimonials.items[index] ||
      fallbackHomePage.testimonials.items[0];

    return {
      quote: readText(item.quote, fallbackItem.quote),
      author: readText(item.author, fallbackItem.author),
    };
  });

  return {
    seo: mapSeo(data, fallbackHomePage.seo, "hero_background_image"),
    hero: {
      eyebrow: readText(data.hero_eyebrow, fallbackHomePage.hero.eyebrow),
      title: readText(data.hero_title, fallbackHomePage.hero.title),
      description: readText(
        data.hero_description,
        fallbackHomePage.hero.description,
      ),
      backgroundImage: readImage(
        data.hero_background_image,
        fallbackHomePage.hero.backgroundImage,
      ),
      overlayStart: readColor(
        data.hero_overlay_start,
        fallbackHomePage.hero.overlayStart,
      ),
      overlayEnd: readColor(data.hero_overlay_end, fallbackHomePage.hero.overlayEnd),
      primaryCta: buildLink(
        data.hero_primary_cta_label,
        data.hero_primary_cta_link,
        fallbackHomePage.hero.primaryCta,
      ),
      secondaryCta: buildLink(
        data.hero_secondary_cta_label,
        data.hero_secondary_cta_link,
        fallbackHomePage.hero.secondaryCta,
      ),
    },
    about: {
      eyebrow: readText(data.about_eyebrow, fallbackHomePage.about.eyebrow),
      title: readText(data.about_title, fallbackHomePage.about.title),
      description: readText(
        data.about_description,
        fallbackHomePage.about.description,
      ),
      image: readImage(data.about_image, fallbackHomePage.about.image),
      yearsValue: readText(data.about_years_value, fallbackHomePage.about.yearsValue),
      yearsLabel: readText(data.about_years_label, fallbackHomePage.about.yearsLabel),
      featureOneTitle: readText(
        data.about_feature_one_title,
        fallbackHomePage.about.featureOneTitle,
      ),
      featureOneBody: readText(
        data.about_feature_one_body,
        fallbackHomePage.about.featureOneBody,
      ),
      featureTwoTitle: readText(
        data.about_feature_two_title,
        fallbackHomePage.about.featureTwoTitle,
      ),
      featureTwoBody: readText(
        data.about_feature_two_body,
        fallbackHomePage.about.featureTwoBody,
      ),
      backgroundColor: readColor(
        data.about_background_color,
        fallbackHomePage.about.backgroundColor,
      ),
      panelColor: readColor(data.about_panel_color, fallbackHomePage.about.panelColor),
    },
    services: {
      title: readText(data.services_title, fallbackHomePage.services.title),
      description: readText(
        data.services_description,
        fallbackHomePage.services.description,
      ),
      backgroundColor: readColor(
        data.services_background_color,
        fallbackHomePage.services.backgroundColor,
      ),
      items:
        serviceItems.length > 0 ? serviceItems : fallbackHomePage.services.items,
    },
    portfolio: {
      eyebrow: readText(data.portfolio_eyebrow, fallbackHomePage.portfolio.eyebrow),
      title: readText(data.portfolio_title, fallbackHomePage.portfolio.title),
      featuredProject: {
        title: readText(
          data.portfolio_featured_title,
          fallbackHomePage.portfolio.featuredProject.title,
        ),
        summary: readText(
          data.portfolio_featured_summary,
          fallbackHomePage.portfolio.featuredProject.summary,
        ),
        category: readText(
          data.portfolio_featured_category,
          fallbackHomePage.portfolio.featuredProject.category,
        ),
        image: readImage(
          data.portfolio_featured_image,
          fallbackHomePage.portfolio.featuredProject.image,
        ),
        link: buildLink(
          data.portfolio_featured_link_label,
          data.portfolio_featured_link,
          fallbackHomePage.portfolio.featuredProject.link,
        ),
      },
      secondaryProjects:
        secondaryProjects.length > 0
          ? secondaryProjects
          : fallbackHomePage.portfolio.secondaryProjects,
      backgroundColor: readColor(
        data.portfolio_background_color,
        fallbackHomePage.portfolio.backgroundColor,
      ),
    },
    mission: {
      titleLineOne: readText(
        data.mission_title_line_one,
        fallbackHomePage.mission.titleLineOne,
      ),
      titleLineTwo: readText(
        data.mission_title_line_two,
        fallbackHomePage.mission.titleLineTwo,
      ),
      highlightPhrase: readText(
        data.mission_highlight_phrase,
        fallbackHomePage.mission.highlightPhrase,
      ),
      backgroundColor: readColor(
        data.mission_background_color,
        fallbackHomePage.mission.backgroundColor,
      ),
      pillars: pillars.length > 0 ? pillars : fallbackHomePage.mission.pillars,
    },
    testimonials: {
      title: readText(
        data.testimonials_title,
        fallbackHomePage.testimonials.title,
      ),
      backgroundColor: readColor(
        data.testimonials_background_color,
        fallbackHomePage.testimonials.backgroundColor,
      ),
      items:
        testimonials.length > 0
          ? testimonials
          : fallbackHomePage.testimonials.items,
    },
    finalCta: {
      title: readText(data.final_cta_title, fallbackHomePage.finalCta.title),
      highlightPhrase: readText(
        data.final_cta_highlight_phrase,
        fallbackHomePage.finalCta.highlightPhrase,
      ),
      description: readText(
        data.final_cta_description,
        fallbackHomePage.finalCta.description,
      ),
      button: buildLink(
        data.final_cta_button_label,
        data.final_cta_button_link,
        fallbackHomePage.finalCta.button,
      ),
      backgroundColor: readColor(
        data.final_cta_background_color,
        fallbackHomePage.finalCta.backgroundColor,
      ),
      accentColor: readColor(
        data.final_cta_accent_color,
        fallbackHomePage.finalCta.accentColor,
      ),
    },
  };
}

function mapShopPage(document: prismic.PrismicDocument): ShopPage {
  const data = document.data as PrismicData;
  const productItems = readGroup(data.product_items).map((item, index) => {
    const fallbackItem =
      fallbackShopPage.products[index] || fallbackShopPage.products[0];

    return {
      category: readText(item.category, fallbackItem.category),
      title: readText(item.title, fallbackItem.title),
      description: readText(item.description, fallbackItem.description),
      price: readText(item.price, fallbackItem.price),
      image: readImage(item.image, fallbackItem.image),
      cta: buildLink(item.cta_label, item.cta_link, fallbackItem.cta),
      accentColor: readColor(item.accent_color, fallbackItem.accentColor),
    };
  });

  return {
    seo: mapSeo(data, fallbackShopPage.seo, "hero_background_image"),
    hero: {
      eyebrow: readText(data.hero_eyebrow, fallbackShopPage.hero.eyebrow),
      title: readText(data.hero_title, fallbackShopPage.hero.title),
      description: readText(
        data.hero_description,
        fallbackShopPage.hero.description,
      ),
      backgroundImage: readImage(
        data.hero_background_image,
        fallbackShopPage.hero.backgroundImage,
      ),
      overlayStart: readColor(
        data.hero_overlay_start,
        fallbackShopPage.hero.overlayStart,
      ),
      overlayEnd: readColor(
        data.hero_overlay_end,
        fallbackShopPage.hero.overlayEnd,
      ),
    },
    intro: {
      title: readText(data.intro_title, fallbackShopPage.intro.title),
      description: readText(
        data.intro_description,
        fallbackShopPage.intro.description,
      ),
      backgroundColor: readColor(
        data.intro_background_color,
        fallbackShopPage.intro.backgroundColor,
      ),
    },
    featuredProduct: {
      category: readText(
        data.featured_product_category,
        fallbackShopPage.featuredProduct.category,
      ),
      title: readText(
        data.featured_product_title,
        fallbackShopPage.featuredProduct.title,
      ),
      description: readText(
        data.featured_product_description,
        fallbackShopPage.featuredProduct.description,
      ),
      price: readText(
        data.featured_product_price,
        fallbackShopPage.featuredProduct.price,
      ),
      image: readImage(
        data.featured_product_image,
        fallbackShopPage.featuredProduct.image,
      ),
      cta: buildLink(
        data.featured_product_cta_label,
        data.featured_product_cta_link,
        fallbackShopPage.featuredProduct.cta,
      ),
      accentColor: readColor(
        data.featured_product_accent_color,
        fallbackShopPage.featuredProduct.accentColor,
      ),
    },
    products:
      productItems.length > 0 ? productItems : fallbackShopPage.products,
    cta: {
      title: readText(data.cta_title, fallbackShopPage.cta.title),
      description: readText(
        data.cta_description,
        fallbackShopPage.cta.description,
      ),
      button: buildLink(
        data.cta_button_label,
        data.cta_button_link,
        fallbackShopPage.cta.button,
      ),
      backgroundColor: readColor(
        data.cta_background_color,
        fallbackShopPage.cta.backgroundColor,
      ),
    },
  };
}

function mapBlogPost(document: prismic.PrismicDocument): BlogPost {
  const data = document.data as PrismicData;
  const body = (Array.isArray(data.body) ? data.body : []) as RichTextField;
  const coverImage = readImage(data.cover_image, fallbackBlogPosts[0].coverImage);
  const title = readText(data.title, "Untitled article");
  const excerpt = readText(data.excerpt, "A journal entry from Dric Interior.");

  return {
    id: document.id,
    uid: document.uid || document.id,
    title,
    excerpt,
    category: readText(data.category, "Journal"),
    author: readText(data.author_name, "Dric Interior Studio"),
    publishedAt:
      readText(data.publish_date, document.first_publication_date || "") ||
      new Date().toISOString(),
    readingMinutes: body.length > 0 ? readingMinutes(body) : 1,
    coverImage,
    seo: {
      title: readText(data.seo_title, title),
      description: readText(data.seo_description, excerpt),
      keywords: readKeywords(data.seo_keywords, fallbackSeo("", "").keywords),
      image: coverImage,
    },
    body:
      body.length > 0
        ? body
        : richText([
            {
              type: "paragraph",
              text: "Add your article body from Prismic to replace this placeholder entry.",
            },
          ]),
  };
}

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const client = createPrismicClient();

  if (!client) {
    return fallbackSettings;
  }

  try {
    const document = await client.getSingle("site_settings");
    return mapSettings(document);
  } catch {
    return fallbackSettings;
  }
}

export async function getHomepage(): Promise<HomePage> {
  const client = createPrismicClient();

  if (!client) {
    return fallbackHomePage;
  }

  try {
    const document = await client.getSingle("homepage");
    return mapHomepage(document);
  } catch {
    return fallbackHomePage;
  }
}

export async function getShopPage(): Promise<ShopPage> {
  const client = createPrismicClient();

  if (!client) {
    return fallbackShopPage;
  }

  try {
    const document = await client.getSingle("shop_page");
    return mapShopPage(document);
  } catch {
    return fallbackShopPage;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const client = createPrismicClient();

  if (!client) {
    return sortPosts(fallbackBlogPosts);
  }

  try {
    const documents = await client.getAllByType("blog_post");
    if (documents.length === 0) {
      return sortPosts(fallbackBlogPosts);
    }

    return sortPosts(documents.map(mapBlogPost));
  } catch {
    return sortPosts(fallbackBlogPosts);
  }
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPostSummary[]> {
  const posts = await getBlogPosts();
  return posts.slice(0, limit);
}

export async function getBlogPostByUid(uid: string): Promise<BlogPost | null> {
  const fallback = fallbackBlogPosts.find((post) => post.uid === uid) || null;
  const client = createPrismicClient();

  if (!client) {
    return fallback;
  }

  try {
    const document = await client.getByUID("blog_post", uid);
    return mapBlogPost(document);
  } catch {
    return fallback;
  }
}

export async function getBlogPostSlugs() {
  const posts = await getBlogPosts();
  return posts.map((post) => post.uid);
}
