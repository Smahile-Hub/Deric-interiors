import type { RichTextField } from "@prismicio/client";

export type EditableImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type IconName =
  | "facebook"
  | "x-twitter"
  | "instagram"
  | "youtube"
  | "whatsapp"
  | "aperture"
  | "grid"
  | "shopping-bag"
  | "mail"
  | "phone"
  | "package"
  | "alert-circle"
  | "refresh-cw"
  | "message-square"
  | "shield";

export type SiteLink = {
  label: string;
  href: string;
  target?: string;
  icon?: IconName;
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
  logo: EditableImage;
  topBarEmail: string;
  topBarPhone: string;
  navItems: SiteLink[];
  actionLinks: SiteLink[];
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

export type AboutPageContent = {
  hero: {
    eyebrow: string;
    titleLineOne: string;
    titleLineTwo: string;
    accentWord: string;
    backgroundImage: EditableImage;
  };
  story: {
    eyebrow: string;
    headingLineOne: string;
    headingLineTwo: string;
    headingLineThree: string;
    body: string;
    tallImage: EditableImage;
    squareImage: EditableImage;
  };
  milestones: {
    title: string;
    description: string;
    items: Array<{
      value: string;
      label: string;
      description: string;
      highlighted: boolean;
    }>;
  };
  values: {
    title: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    button: SiteLink;
    backgroundImage: EditableImage;
  };
};

export type ServicesPageContent = {
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    backgroundImage: EditableImage;
    cta: SiteLink;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  intro: {
    title: string;
    description: string;
  };
  services: Array<{
    id: string;
    number: string;
    title: string;
    description: string;
    image: EditableImage;
    wide: boolean;
  }>;
  process: {
    title: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    titleLineOne: string;
    titleLineTwo: string;
    description: string;
    primaryButton: SiteLink;
    secondaryButton: SiteLink;
  };
};

export type ServiceDetailPageContent = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  heroImage: EditableImage;
  backLink: SiteLink;
  overview: string;
  highlightsHeading: string;
  highlights: Array<{
    title: string;
    description: string;
  }>;
  galleryHeading: string;
  gallery: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  processHeading: string;
  processTitle: string;
  process: Array<{
    step: string;
    title: string;
    body: string;
  }>;
  closingStatement: string;
  cta: {
    title: string;
    description: string;
    primaryButton: SiteLink;
    secondaryButton: SiteLink;
  };
};

export type ProjectsPageContent = {
  hero: {
    eyebrow: string;
    titleLineOne: string;
    titleLineTwo: string;
    description: string;
    backgroundImage: EditableImage;
  };
  filters: string[];
  projects: Array<{
    id: string;
    title: string;
    excerpt: string;
    category: "Residential" | "Commercial" | "Workplace";
    image: string;
    imageAlt: string;
    size: "large" | "medium" | "small";
    link: SiteLink;
  }>;
  emptyState: string;
  cta: {
    titleLineOne: string;
    titleLineTwo: string;
    titleLineThree: string;
    button: SiteLink;
  };
};

export type ContactPageContent = {
  hero: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    description: string;
    backgroundImage: EditableImage;
  };
  form: {
    title: string;
    successIcon: string;
    successTitle: string;
    successBody: string;
    resetButtonLabel: string;
    submitIdleLabel: string;
    submitLoadingLabel: string;
    fields: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      projectTypeLabel: string;
      projectTypePlaceholder: string;
      projectTypeOptions: string[];
      investmentRangeLabel: string;
      investmentRangePlaceholder: string;
      investmentRangeOptions: string[];
      preferredDateLabel: string;
      phoneLabel: string;
      phonePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
    };
  };
  infoCard: {
    eyebrow: string;
    addressLineOne: string;
    addressLineTwo: string;
    phone: string;
    whatsappLabel: string;
    whatsappHref: string;
  };
  studioImage: EditableImage;
  locations: Array<{
    city: string;
    address: string;
    state: string;
    phone: string;
    whatsapp: string;
  }>;
  map: {
    title: string;
    embedUrl: string;
  };
};

export type PrivacyPolicyPageContent = {
  header: {
    eyebrow: string;
    title: string;
    validLabel: string;
  };
  introParagraphs: string[];
  sections: Array<{
    id: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  imageBreak: {
    image: EditableImage;
    quote: string;
  };
  contact: {
    eyebrow: string;
    email: string;
  };
};

export type ReturnPolicyPageContent = {
  hero: {
    eyebrow: string;
    titleLineOne: string;
    titleLineTwo: string;
    titleLineThree: string;
    quote: string;
    image: EditableImage;
  };
  sections: Array<{
    id: string;
    title: string;
    icon: IconName;
    paragraphs: string[];
    highlight?: string;
    protocolTitle?: string;
    protocolBody?: string;
    supportLabel?: string;
    supportValue?: string;
    supportHref?: string;
  }>;
  standard: {
    icon: IconName;
    title: string;
    copy: string;
  };
};

export type TestimonialsPageContent = {
  hero: {
    eyebrow: string;
    titleLineOne: string;
    titleLineTwo: string;
    description: string;
  };
  featuredTestimonial: {
    quote: string;
    author: string;
    role: string;
    image: EditableImage;
  };
  secondaryTestimonial: {
    quote: string;
    author: string;
    role: string;
    images: [EditableImage, EditableImage];
  };
  gallery: {
    eyebrow: string;
    title: string;
    images: [EditableImage, EditableImage, EditableImage];
  };
  cta: {
    title: string;
    button: SiteLink;
  };
};

export type EditableSiteContent = {
  navbar: Pick<
    SiteSettings,
    | "siteTitle"
    | "siteDescription"
    | "logo"
    | "topBarEmail"
    | "topBarPhone"
    | "navItems"
    | "actionLinks"
    | "primaryCta"
    | "socialLinks"
  >;
  footer: Pick<
    SiteSettings,
    "footerBlurb" | "footerEmail" | "footerPhone" | "footerLocation" | "footerColumns" | "copyrightText"
  >;
  homepage: HomePage;
  about: AboutPageContent;
  services: ServicesPageContent;
  serviceDetails: Record<string, ServiceDetailPageContent>;
  projects: ProjectsPageContent;
  contact: ContactPageContent;
  privacyPolicy: PrivacyPolicyPageContent;
  returnPolicy: ReturnPolicyPageContent;
  testimonials: TestimonialsPageContent;
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
