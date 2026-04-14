# Dric Interior

Luxury interior design marketing site built with Next.js App Router and Prismic-ready content models.

## What is included

- Figma-inspired homepage with editable hero, about, services, portfolio, mission, testimonials, and CTA sections
- Prismic-ready singleton models for `homepage` and `site_settings`
- Prismic-ready repeatable model for `blog_post`
- SEO-friendly metadata, `robots.txt`, and `sitemap.xml`
- Blog index and blog detail pages
- Preview route support for Prismic
- Local fallback content so the app still renders before a Prismic repo is connected

## Run locally

1. Copy `.env.example` to `.env.local`
2. Add your Prismic repository name
3. Start the app:

```bash
npm install
npm run dev
```

The dev server and production build both use webpack on this Windows setup:

```bash
npm run dev
npm run build
```

## Required environment variables

```bash
PRISMIC_REPOSITORY_NAME=your-prismic-repo-name
PRISMIC_ACCESS_TOKEN=
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=your-prismic-repo-name
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Prismic setup

Create the following Custom Types in Prismic and import the matching JSON files from this repo:

- `customtypes/homepage/index.json`
- `customtypes/site_settings/index.json`
- `customtypes/blog_post/index.json`

The UI expects these exact API IDs:

- `homepage`
- `site_settings`
- `blog_post`

## Editing flow

- Homepage content, images, and section colors come from the `homepage` singleton
- Navigation, footer, and default SEO come from the `site_settings` singleton
- Blog posts are created as repeatable `blog_post` documents

## Preview routes

Prismic previews are already wired:

- `/api/preview`
- `/api/exit-preview`

Point your Prismic preview configuration to `/api/preview`.

## Verification

The project has been verified with:

```bash
npm run lint
npm run typecheck
npm run build
```
# Deric-interiors
