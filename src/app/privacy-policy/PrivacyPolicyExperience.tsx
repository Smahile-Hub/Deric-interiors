"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import type { PrivacyPolicyPageContent } from "@/types/site";

import styles from "./privacy-policy.module.css";

type PrivacyPolicyExperienceProps = {
  page: PrivacyPolicyPageContent;
};

export function PrivacyPolicyExperience({ page }: PrivacyPolicyExperienceProps) {
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
    <section ref={rootRef} className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.headerSection} data-reveal>
          <p className={styles.eyebrow}>{page.header.eyebrow}</p>
          <h1 className={styles.pageTitle}>{page.header.title}</h1>
          <span className={styles.headerRule} aria-hidden="true" />
        </div>

        <section className={styles.introSection} data-reveal>
          <div className={styles.introMeta}>
            <p className={styles.metaLabel}>{page.header.validLabel}</p>
          </div>

          <div className={styles.introBody}>
            {page.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {page.sections.slice(0, 3).map((section) => (
          <section key={section.id} className={styles.articleSection} data-reveal>
            <div className={styles.articleHeading}>
              <h2>{section.id} / {section.title}</h2>
            </div>

            <div className={styles.articleBody}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.bullets?.length ? (
                <ul className={styles.bulletList}>
                  {section.bullets.map((item, index) => (
                    <li key={item} style={{ "--stagger-index": index } as CSSProperties}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}

        <section className={styles.imageBreak} data-reveal>
          <div className={styles.imageFrame}>
            <Image
              src={page.imageBreak.image.url}
              alt={page.imageBreak.image.alt}
              fill
              sizes="(max-width: 960px) 100vw, 58vw"
              className={styles.breakImage}
            />
          </div>

          <blockquote className={styles.quoteBlock}>{page.imageBreak.quote}</blockquote>
        </section>

        {page.sections.slice(3).map((section) => (
          <section key={section.id} className={styles.articleSection} data-reveal>
            <div className={styles.articleHeading}>
              <h2>{section.id} / {section.title}</h2>
            </div>

            <div className={styles.articleBody}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.id === "05" ? (
                <div className={styles.contactCard}>
                  <p className={styles.contactEyebrow}>{page.contact.eyebrow}</p>
                  <a href={`mailto:${page.contact.email}`} className={styles.contactLink}>
                    {page.contact.email}
                  </a>
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
