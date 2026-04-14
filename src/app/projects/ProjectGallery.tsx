"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { Project } from "./page";
import styles from "./projects.module.css";

type Props = {
  projects: Project[];
};

const CATEGORIES = [
  "All Projects",
  "Residential",
  "Commercial",
  "Workplace",
] as const;

export function ProjectGallery({ projects }: Props) {
  const [active, setActive] = useState<string>("All Projects");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      active === "All Projects"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects],
  );

  useEffect(() => {
    const root = galleryRef.current;

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
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    root.querySelectorAll("[data-card-reveal]").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filtered]);

  function handleFilterChange(category: string) {
    if (category === active) {
      return;
    }

    setIsTransitioning(true);
    setActive(category);
    window.setTimeout(() => setIsTransitioning(false), 260);
  }

  return (
    <>
      <section className={styles.filterSection} data-reveal>
        <div className={styles.filterShell}>
          <div className={styles.filterRow}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`${styles.filterBtn} ${
                  active === category ? styles.filterActive : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.galleryShell} data-reveal>
          <div
            ref={galleryRef}
            className={`${styles.galleryGrid} ${
              isTransitioning ? styles.galleryTransitioning : ""
            }`}
          >
            {filtered.map((project, index) => (
              <article
                key={project.id}
                className={`${styles.projectCard} ${
                  active === "All Projects" && index === 1 ? styles.stagger : ""
                }`}
                data-card-reveal
                style={{ "--card-index": index } as CSSProperties}
              >
                <div
                  className={`${styles.projectMedia} ${
                    project.size === "large"
                      ? styles.mediaLarge
                      : project.size === "small"
                        ? styles.mediaSmall
                        : styles.mediaMedium
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    className={styles.projectImg}
                  />
                  <div className={styles.projectOverlay} />
                </div>

                <div className={styles.projectCopy}>
                  <div>
                    <p className={styles.projectCategory}>{project.category}</p>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectExcerpt}>{project.excerpt}</p>
                  </div>
                  <Link href={`/blog/${project.id}`} className={styles.projectLink}>
                    View Project <span aria-hidden="true">-&gt;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className={styles.emptyState}>No projects in this category yet.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
