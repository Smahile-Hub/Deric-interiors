"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { TestimonialsPageContent } from "@/types/site";

import styles from "./testimonials.module.css";

type TestimonialsExperienceProps = {
  page: TestimonialsPageContent;
};

export function TestimonialsExperience({ page }: TestimonialsExperienceProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    root.querySelectorAll("[data-reveal]").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main ref={rootRef} className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.shell}>
          <div className={styles.heroHeader}>
            <div className={styles.heroLeft} data-reveal>
              <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
              <h1 className={styles.heroTitle}>
                {page.hero.titleLineOne}
                <br />
                {page.hero.titleLineTwo}
              </h1>
            </div>
            <div className={styles.heroRight} data-reveal>
              <p className={styles.heroDesc}>{page.hero.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.t1Section}>
        <div className={styles.shell}>
          <div className={styles.t1Grid}>
            <div className={styles.quoteBox} data-reveal>
              <span className={styles.quoteIconMark} aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className={styles.quoteText}>{page.featuredTestimonial.quote}</blockquote>
              <footer className={styles.quoteAttr}>
                <span className={styles.attrLine} aria-hidden="true" />
                <div>
                  <p className={styles.attrName}>{page.featuredTestimonial.author}</p>
                  <p className={styles.attrRole}>{page.featuredTestimonial.role}</p>
                </div>
              </footer>
            </div>

            <div className={styles.t1ImageWrap} data-reveal>
              <Image
                src={page.featuredTestimonial.image.url}
                alt={page.featuredTestimonial.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className={styles.coverImage}
              />
              <div className={styles.t1ImgGrad} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.accentTransition} aria-hidden="true" data-reveal>
        <span className={styles.accentLine} />
      </div>

      <section className={styles.t2Section}>
        <div className={styles.shell}>
          <div className={styles.t2Grid}>
            <div className={styles.t2ImageGroup} data-reveal>
              <div className={`${styles.t2Img} ${styles.t2ImgStagger}`}>
                <Image
                  src={page.secondaryTestimonial.images[0].url}
                  alt={page.secondaryTestimonial.images[0].alt}
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.t2Img}>
                <Image
                  src={page.secondaryTestimonial.images[1].url}
                  alt={page.secondaryTestimonial.images[1].alt}
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                  className={styles.coverImage}
                />
              </div>
            </div>

            <div className={styles.t2Card} data-reveal>
              <blockquote className={styles.t2Quote}>{page.secondaryTestimonial.quote}</blockquote>
              <footer className={styles.t2Attr}>
                <p className={styles.t2Name}>{page.secondaryTestimonial.author}</p>
                <p className={styles.t2Role}>{page.secondaryTestimonial.role}</p>
              </footer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.shell}>
          <div className={styles.galleryHeader} data-reveal>
            <p className={styles.galleryEyebrow}>{page.gallery.eyebrow}</p>
            <h2 className={styles.galleryTitle}>{page.gallery.title}</h2>
          </div>
          <div className={styles.galleryGrid} data-reveal>
            <div className={styles.galleryLeft}>
              <Image
                src={page.gallery.images[0].url}
                alt={page.gallery.images[0].alt}
                fill
                sizes="(max-width: 900px) 100vw, 66vw"
                className={styles.coverImage}
              />
            </div>
            <div className={styles.galleryRight}>
              <div className={styles.galleryRightImg}>
                <Image
                  src={page.gallery.images[1].url}
                  alt={page.gallery.images[1].alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 34vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.galleryRightImg}>
                <Image
                  src={page.gallery.images[2].url}
                  alt={page.gallery.images[2].alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 34vw"
                  className={styles.coverImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} data-reveal>
        <div className={styles.ctaShell}>
          <h2 className={styles.ctaTitle}>{page.cta.title}</h2>
          <span className={styles.ctaRule} aria-hidden="true" />
          <Link href={page.cta.button.href} className={styles.ctaButton}>
            {page.cta.button.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
