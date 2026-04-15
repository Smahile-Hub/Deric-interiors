"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { AboutPageContent } from "@/types/site";

import styles from "./about.module.css";

type AboutExperienceProps = {
  page: AboutPageContent;
};

export function AboutExperience({ page }: AboutExperienceProps) {
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
        threshold: 0.16,
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
    "--hero-image-shift": `${heroProgress * -54}px`,
    "--hero-image-scale": `${1.08 - heroProgress * 0.06}`,
    "--hero-shell-shift": `${heroProgress * -84}px`,
    "--hero-shell-opacity": `${1 - heroProgress * 0.45}`,
    "--hero-overlay-opacity": `${0.84 + heroProgress * 0.1}`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={styles.aboutRoot}>
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
          <p className={styles.eyebrow} data-reveal>
            {page.hero.eyebrow}
          </p>
          <h1 className={styles.heroTitle} data-reveal>
            {page.hero.titleLineOne}
            <br />
            with <span className={styles.heroAccent}>{page.hero.accentWord}</span>
          </h1>
          <div className={styles.heroDivider} aria-hidden="true" data-reveal />
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyShell}>
          <div className={styles.storyGrid}>
            <div className={styles.storyText} data-reveal>
              <p className={styles.storyEyebrow}>{page.story.eyebrow}</p>
              <h2 className={styles.storyHeading}>
                {page.story.headingLineOne}
                <br />
                {page.story.headingLineTwo}
                <br />
                {page.story.headingLineThree}
              </h2>
              <p className={styles.storyBody}>{page.story.body}</p>
            </div>

            <div className={styles.storyImages} data-reveal>
              <div className={styles.storyImgTall}>
                <Image
                  src={page.story.tallImage.url}
                  alt={page.story.tallImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.storyImgSquare}>
                <Image
                  src={page.story.squareImage.url}
                  alt={page.story.squareImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                  className={styles.coverImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.milestonesSection}>
        <div className={styles.milestonesShell}>
          <div className={styles.milestonesHeader} data-reveal>
            <h2 className={styles.milestonesTitle}>{page.milestones.title}</h2>
            <p className={styles.milestonesDesc}>{page.milestones.description}</p>
          </div>

          <div className={styles.milestonesGrid}>
            {page.milestones.items.map((milestone, index) => (
              <div
                key={milestone.label}
                className={`${styles.milestoneCard} ${
                  milestone.highlighted ? styles.milestoneHighlighted : ""
                }`}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <span
                  className={`${styles.milestoneValue} ${
                    milestone.highlighted ? styles.milestoneValueFull : ""
                  }`}
                >
                  {milestone.value}
                </span>
                <div className={styles.milestoneText}>
                  <strong className={styles.milestoneLabel}>
                    {milestone.label}
                  </strong>
                  <p className={styles.milestoneDesc}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.foundationsSection}>
        <div className={styles.foundationsShell}>
          <h2 className={styles.foundationsTitle} data-reveal>
            {page.values.title}
          </h2>
          <div className={styles.valuesGrid}>
            {page.values.items.map((value, index) => (
              <div
                key={value.number}
                className={styles.valueCard}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <span className={styles.valueNum}>{value.number}</span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} data-reveal>
        <Image
          src={page.cta.backgroundImage.url}
          alt={page.cta.backgroundImage.alt}
          fill
          sizes="100vw"
          className={styles.ctaBg}
        />
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaShell}>
          <h2 className={styles.ctaTitle}>{page.cta.title}</h2>
          <Link href={page.cta.button.href} className={styles.ctaButton}>
            {page.cta.button.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
