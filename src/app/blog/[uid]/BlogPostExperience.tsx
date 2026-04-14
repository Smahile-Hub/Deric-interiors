"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import { RichTextContent } from "@/components/site/RichTextContent";
import type { BlogPost, BlogPostSummary } from "@/types/site";

import styles from "./post.module.css";

type BlogPostExperienceProps = {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
};

export function BlogPostExperience({
  post,
  relatedPosts,
}: BlogPostExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);

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
    <div ref={rootRef} className={styles.page}>
      <article>
        <div className={styles.hero}>
          <div className={styles.heroCopy} data-reveal>
            <p>{post.category}</p>
            <h1>{post.title}</h1>
            <span>{post.excerpt}</span>
            <div className={styles.meta}>
              <strong>{post.author}</strong>
              <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>

          <div className={styles.heroMedia} data-reveal>
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.coverImage}
            />
          </div>
        </div>

        <div className={styles.contentWrap} data-reveal>
          <RichTextContent field={post.body} className={styles.prose} />
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <div className={styles.relatedHeading} data-reveal>
              <p>Continue Reading</p>
              <h2>More from the journal</h2>
            </div>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((entry, index) => (
                <article
                  key={entry.uid}
                  className={styles.relatedCard}
                  data-reveal
                  style={{ "--stagger-index": index } as CSSProperties}
                >
                  <h3>{entry.title}</h3>
                  <p>{entry.excerpt}</p>
                  <Link href={`/blog/${entry.uid}`}>Read article</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
