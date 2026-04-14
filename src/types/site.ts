import type { RichTextField } from "@prismicio/client";

export type EditableImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type SiteLink = {
  label: string;
  href: string;
  target?: string;
};

export type FooterMenuColumn = {
  title: string;
  links: SiteLink[];
};

export type SeoData = {
  title: string;
  description: string;
  keywords: string[];
  image: EditableImage;
};

export type ServiceItem = {
  title: string;
  subtitle: string;
  image: EditableImage;
  overlayColor: string;
};

export type PortfolioProject = {
  title: string;
  summary: string;
  category: string;
  image: EditableImage;
  link: SiteLink;
};

export type Testimonial = {
  quote: string;
  author: string;
};

export type BlogPostSummary = {
  id: string;
  uid: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  coverImage: EditableImage;
  seo: SeoData;
};

export type BlogPost = BlogPostSummary & {
  body: RichTextField;
};

export type ShopProduct = {
  category: string;
  title: string;
  description: string;
  price: string;
  image: EditableImage;
  cta: SiteLink;
  accentColor: string;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  topBarEmail: string;
  topBarPhone: string;
  navItems: SiteLink[];
  primaryCta: SiteLink;
  socialLinks: SiteLink[];
  footerBlurb: string;
  footerEmail: string;
  footerPhone: string;
  footerLocation: string;
  footerColumns: FooterMenuColumn[];
  copyrightText: string;
  seo: SeoData;
};

export type ShopPage = {
  seo: SeoData;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage: EditableImage;
    overlayStart: string;
    overlayEnd: string;
  };
  intro: {
    title: string;
    description: string;
    backgroundColor: string;
  };
  featuredProduct: ShopProduct;
  products: ShopProduct[];
  cta: {
    title: string;
    description: string;
    button: SiteLink;
    backgroundColor: string;
  };
};

export type HomePage = {
  seo: SeoData;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage: EditableImage;
    overlayStart: string;
    overlayEnd: string;
    primaryCta: SiteLink;
    secondaryCta: SiteLink;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    image: EditableImage;
    yearsValue: string;
    yearsLabel: string;
    featureOneTitle: string;
    featureOneBody: string;
    featureTwoTitle: string;
    featureTwoBody: string;
    backgroundColor: string;
    panelColor: string;
  };
  services: {
    title: string;
    description: string;
    backgroundColor: string;
    items: ServiceItem[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    featuredProject: PortfolioProject;
    secondaryProjects: PortfolioProject[];
    backgroundColor: string;
  };
  mission: {
    titleLineOne: string;
    titleLineTwo: string;
    highlightPhrase: string;
    backgroundColor: string;
    pillars: Array<{
      title: string;
      body: string;
    }>;
  };
  testimonials: {
    title: string;
    backgroundColor: string;
    items: Testimonial[];
  };
  finalCta: {
    title: string;
    highlightPhrase: string;
    description: string;
    button: SiteLink;
    backgroundColor: string;
    accentColor: string;
  };
};
