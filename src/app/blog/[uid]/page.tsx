import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import {
  getBlogPostByUid,
  getBlogPostSlugs,
  getLatestBlogPosts,
} from "@/lib/site-content";
import { BlogPostExperience } from "./BlogPostExperience";

type BlogPostPageProps = {
  params: Promise<{ uid: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((uid) => ({ uid }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { uid } = await params;
  const post = await getBlogPostByUid(uid);

  if (!post) {
    return buildMetadata({
      title: "Journal",
      description: "Article not found",
      pathname: `/blog/${uid}`,
    });
  }

  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    pathname: `/blog/${post.uid}`,
    image: post.seo.image,
    keywords: post.seo.keywords,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { uid } = await params;
  const [post, latestPosts] = await Promise.all([
    getBlogPostByUid(uid),
    getLatestBlogPosts(3),
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = latestPosts.filter((entry) => entry.uid !== post.uid).slice(0, 2);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage.url],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Dric Interior",
    },
    url: toAbsoluteUrl(`/blog/${post.uid}`),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogPostExperience post={post} relatedPosts={relatedPosts} />
    </>
  );
}
