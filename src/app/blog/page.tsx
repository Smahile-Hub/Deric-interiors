import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getBlogPosts, getSiteSettings } from "@/lib/site-content";
import { BlogIndexExperience } from "./BlogIndexExperience";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `Journal | ${settings.siteTitle}`,
    description:
      "Design notes, material studies, and project thinking from the Dric Interior studio.",
    pathname: "/blog",
    image: settings.seo.image,
    keywords: [...settings.seo.keywords, "interior design blog", "design journal"],
  });
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dric Interior Journal",
    url: toAbsoluteUrl("/blog"),
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: toAbsoluteUrl(`/blog/${post.uid}`),
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogIndexExperience posts={posts} />
    </>
  );
}
