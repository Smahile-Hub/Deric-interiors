import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getShopPage } from "@/lib/site-content";

import styles from "./shop.module.css";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function generateMetadata(): Promise<Metadata> {
  const page = await getShopPage();

  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    pathname: "/shop",
    image: page.seo.image,
    keywords: page.seo.keywords,
  });
}

export default async function ShopPage() {
  const page = await getShopPage();
  const productAnchors = page.products.map((product) => ({
    id: slugify(product.category),
    label: product.category,
  }));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: page.seo.title,
      description: page.seo.description,
      url: toAbsoluteUrl("/shop"),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Dric Interior Shop Collection",
      itemListElement: page.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${toAbsoluteUrl("/shop")}#${slugify(product.category)}`,
        name: product.title,
      })),
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <section className={styles.hero}>
        <Image
          src={page.hero.backgroundImage.url}
          alt={page.hero.backgroundImage.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div
          className={styles.heroOverlay}
          style={
            {
              "--shop-hero-start": page.hero.overlayStart,
              "--shop-hero-end": page.hero.overlayEnd,
            } as CSSProperties
          }
        />

        <div className={styles.heroShell}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
            <h1>{page.hero.title}</h1>
            <p className={styles.heroDescription}>{page.hero.description}</p>

            <div className={styles.heroActions}>
              <Link href="#collection" className={styles.primaryButton}>
                Explore Collection
              </Link>
              <Link href={page.cta.button.href} className={styles.secondaryLink}>
                Book Sourcing Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.introSection}
        style={{ backgroundColor: page.intro.backgroundColor }}
      >
        <div className={styles.sectionShell}>
          <div className={styles.introHeader}>
            <div className={styles.introCopy}>
              <p className={styles.eyebrow}>The Shop Edit</p>
              <h2>{page.intro.title}</h2>
              <p>{page.intro.description}</p>
            </div>

            <div className={styles.categoryChips} aria-label="Shop categories">
              {productAnchors.map((item) => (
                <Link key={item.id} href={`#${item.id}`} className={styles.categoryChip}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionShell}>
          <article className={styles.featuredCard}>
            <div className={styles.featuredMedia}>
              <Image
                src={page.featuredProduct.image.url}
                alt={page.featuredProduct.image.alt}
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                className={styles.coverImage}
              />
            </div>

            <div
              className={styles.featuredContent}
              style={
                {
                  "--shop-accent": page.featuredProduct.accentColor,
                } as CSSProperties
              }
            >
              <p className={styles.eyebrow}>{page.featuredProduct.category}</p>
              <h2>{page.featuredProduct.title}</h2>
              <p className={styles.featuredDescription}>
                {page.featuredProduct.description}
              </p>

              <div className={styles.featuredMeta}>
                <span className={styles.priceTag}>{page.featuredProduct.price}</span>
                <Link
                  href={page.featuredProduct.cta.href}
                  className={styles.inlineLink}
                >
                  {page.featuredProduct.cta.label}
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.collectionSection} id="collection">
        <div className={styles.sectionShell}>
          <div className={styles.collectionHeader}>
            <p className={styles.eyebrow}>Curated Collection</p>
            <h2>Tailored pieces that hold a room with quiet confidence.</h2>
          </div>

          <div className={styles.productGrid}>
            {page.products.map((product) => (
              <article
                key={`${product.category}-${product.title}`}
                id={slugify(product.category)}
                className={styles.productCard}
                style={
                  {
                    "--shop-accent": product.accentColor,
                  } as CSSProperties
                }
              >
                <div className={styles.productMedia}>
                  <Image
                    src={product.image.url}
                    alt={product.image.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 25vw"
                    className={styles.coverImage}
                  />
                </div>

                <div className={styles.productContent}>
                  <p className={styles.productCategory}>{product.category}</p>
                  <h3>{product.title}</h3>
                  <p className={styles.productDescription}>{product.description}</p>

                  <div className={styles.productFooter}>
                    <span className={styles.productPrice}>{product.price}</span>
                    <Link href={product.cta.href} className={styles.productLink}>
                      {product.cta.label}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.ctaSection}
        style={{ backgroundColor: page.cta.backgroundColor }}
      >
        <div className={styles.sectionShell}>
          <div className={styles.ctaPanel}>
            <p className={styles.eyebrow}>Need Guidance?</p>
            <h2>{page.cta.title}</h2>
            <p>{page.cta.description}</p>
            <Link href={page.cta.button.href} className={styles.primaryButton}>
              {page.cta.button.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
