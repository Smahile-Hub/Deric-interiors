import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME ??
  process.env.PRISMIC_REPOSITORY_NAME ??
  "";

export const routes: prismic.Route[] = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "shop_page",
    path: "/shop",
  },
  {
    type: "blog_post",
    path: "/blog/:uid",
  },
];

export const linkResolver: prismic.LinkResolverFunction<string> = (document) => {
  switch (document.type) {
    case "homepage":
      return "/";
    case "shop_page":
      return "/shop";
    case "blog_post":
      return `/blog/${document.uid}`;
    default:
      return "/";
  }
};

export function createPrismicClient(config: prismic.ClientConfig = {}) {
  if (!repositoryName) {
    return null;
  }

  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
