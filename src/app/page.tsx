import type { Metadata } from "next";

import { Homepage } from "@/components/site/Homepage";
import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getHomepage, getSiteSettings } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();

  return buildMetadata({
    title: homepage.seo.title,
    description: homepage.seo.description,
    pathname: "/",
    image: homepage.seo.image,
    keywords: homepage.seo.keywords,
  });
}

export default async function Home() {
  const [homepage, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: settings.siteTitle,
      description: settings.siteDescription,
      url: toAbsoluteUrl("/"),
      email: settings.footerEmail,
      telephone: settings.footerPhone,
      address: {
        "@type": "PostalAddress",
        addressLocality: settings.footerLocation,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings.siteTitle,
      url: toAbsoluteUrl("/"),
      description: settings.siteDescription,
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Homepage page={homepage} />
    </>
  );
}
