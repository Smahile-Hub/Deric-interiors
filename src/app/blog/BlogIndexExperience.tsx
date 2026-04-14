"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import type { BlogPostSummary } from "@/types/site";

import styles from "./blog.module.css";

type BlogIndexExperienceProps = {
  posts: BlogPostSummary[];
};

export function BlogIndexExperience({ posts }: BlogIndexExperienceProps) {
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
      <section className={styles.hero}>
        <div className={styles.heroInner} data-reveal>
          <p>Journal</p>
          <h1>Ideas, materials, and spaces worth returning to.</h1>
          <span>
            A growing editorial archive for clients who care about detail,
            atmosphere, and thoughtful interior design.
          </span>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <article
              key={post.uid}
              className={styles.card}
              data-reveal
              style={{ "--stagger-index": index } as CSSProperties}
            >
              <div className={styles.cardMedia}>
                <Image
                  src={post.coverImage.url}
                  alt={post.coverImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.cardCopy}>
                <div className={styles.metaRow}>
                  <span>{post.category}</span>
                  <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className={styles.metaFooter}>
                  <span>{post.readingMinutes} min read</span>
                  <Link href={`/blog/${post.uid}`}>Read article</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
