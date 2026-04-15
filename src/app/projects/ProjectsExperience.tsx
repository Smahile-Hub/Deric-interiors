"use client";

import Image from "next/image";

import { TransitionLink } from "@/components/site/TransitionLink";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { ProjectsPageContent } from "@/types/site";

import { ProjectGallery } from "./ProjectGallery";
import styles from "./projects.module.css";

type ProjectsExperienceProps = {
  page: ProjectsPageContent;
};

export function ProjectsExperience({ page }: ProjectsExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      setScrollY(window.scrollY);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

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
        threshold: 0.14,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    root.querySelectorAll("[data-reveal]").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const heroProgress = Math.max(0, Math.min(scrollY / 620, 1));
  const heroStyle = {
    "--hero-image-shift": `${heroProgress * -68}px`,
    "--hero-image-scale": `${1.1 - heroProgress * 0.08}`,
    "--hero-shell-shift": `${heroProgress * -96}px`,
    "--hero-shell-opacity": `${1 - heroProgress * 0.5}`,
    "--hero-overlay-opacity": `${0.76 + heroProgress * 0.12}`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={styles.projectsRoot}>
      <section className={styles.hero} style={heroStyle}>
        <Image
          src={page.hero.backgroundImage.url}
          alt={page.hero.backgroundImage.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroShell}>
          <div className={styles.eyebrowRow} data-reveal>
            <span className={styles.eyebrowLine} />
            <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
          </div>
          <h1
            className={styles.heroTitle}
            aria-label="Curated Portfolio"
          >
            {[page.hero.titleLineOne, page.hero.titleLineTwo].map((word, i) => (
              <span
                key={word}
                className={styles.heroTitleLine}
                style={{ "--line-index": i } as CSSProperties}
              >
                <span>{word}</span>
              </span>
            ))}
          </h1>
          <p className={styles.heroDesc}>
            {page.hero.description}
          </p>
        </div>
      </section>

      <ProjectGallery filters={page.filters} projects={page.projects} emptyState={page.emptyState} />

      <section className={styles.ctaSection} data-reveal>
        <div className={styles.ctaShell}>
          <h2 className={styles.ctaTitle}>
            {page.cta.titleLineOne}
            <br />
            {page.cta.titleLineTwo}
            <br />
            {page.cta.titleLineThree}
          </h2>
          <TransitionLink href={page.cta.button.href} className={styles.ctaButton}>
            {page.cta.button.label}
          </TransitionLink>
        </div>
      </section>
    </div>
  );
}
