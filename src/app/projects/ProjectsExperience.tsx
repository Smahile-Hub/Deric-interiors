"use client";

import Image from "next/image";

import { TransitionLink } from "@/components/site/TransitionLink";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { ProjectGallery } from "./ProjectGallery";
import type { Project } from "./page";
import styles from "./projects.module.css";

type ProjectsExperienceProps = {
  projects: Project[];
};

export function ProjectsExperience({ projects }: ProjectsExperienceProps) {
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
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80"
          alt="Moody luxury interior with deep tones"
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroShell}>
          <div className={styles.eyebrowRow} data-reveal>
            <span className={styles.eyebrowLine} />
            <p className={styles.eyebrow}>Portfolio Exhibition</p>
          </div>
          <h1
            className={styles.heroTitle}
            aria-label="Curated Portfolio"
          >
            {["Curated", "Portfolio"].map((word, i) => (
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
            A visual narrative of architectural transformations. From brutalist lofts to heritage manors, we craft spaces that define high-end living.
          </p>
        </div>
      </section>

      <ProjectGallery projects={projects} />

      <section className={styles.ctaSection} data-reveal>
        <div className={styles.ctaShell}>
          <h2 className={styles.ctaTitle}>
            Ready to start your own
            <br />
            transformation? Let&apos;s
            <br />
            collaborate.
          </h2>
          <TransitionLink href="/#contact" className={styles.ctaButton}>
            Book an Appointment
          </TransitionLink>
        </div>
      </section>
    </div>
  );
}
