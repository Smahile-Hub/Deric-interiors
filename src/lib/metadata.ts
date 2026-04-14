import type { Metadata } from "next";

import type { EditableImage } from "@/types/site";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  pathname,
  image,
  keywords,
  type = "website",
}: {
  title: string;
  description: string;
  pathname: string;
  image?: EditableImage;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const canonical = absoluteUrl(pathname);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Dric Interior",
      type,
      images: image
        ? [
            {
              url: absoluteUrl(image.url),
              width: image.width,
              height: image.height,
              alt: image.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [absoluteUrl(image.url)] : undefined,
    },
  };
}

export function toAbsoluteUrl(path: string) {
  return absoluteUrl(path);
}
