"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { ServiceData } from "./page";
import styles from "./service-detail.module.css";

export function ServiceDetailExperience({ service }: { service: ServiceData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      setScrollY(window.scrollY);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    root.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const heroProgress = Math.max(0, Math.min(scrollY / 620, 1));
  const heroStyle = {
    "--hero-image-shift": `${heroProgress * -56}px`,
    "--hero-image-scale": `${1.08 - heroProgress * 0.06}`,
    "--hero-shell-shift": `${heroProgress * -72}px`,
    "--hero-shell-opacity": `${1 - heroProgress * 0.42}`,
    "--hero-overlay-opacity": `${0.82 + heroProgress * 0.1}`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={styles.root}>
      <section className={styles.hero} style={heroStyle}>
        <Image
          src={service.heroImage.url}
          alt={service.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroShell}>
          <Link href={service.backLink.href} className={styles.backLink} data-reveal>
            {service.backLink.label}
          </Link>
          <p className={styles.eyebrow} data-reveal>
            {service.number} - SERVICE
          </p>
          <h1 className={styles.heroTitle} data-reveal>
            {service.title}
          </h1>
          <p className={styles.heroTagline} data-reveal>
            {service.tagline}
          </p>
        </div>
      </section>

      <section className={styles.overviewSection}>
        <div className={styles.shell}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewLabel} data-reveal>
              <span>OVERVIEW</span>
            </div>
            <p className={styles.overviewText} data-reveal>
              {service.overview}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.highlightsSection}>
        <div className={styles.shell}>
          <p className={styles.sectionEyebrow} data-reveal>
            {service.highlightsHeading}
          </p>
          <div className={styles.highlightsGrid}>
            {service.highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={styles.highlightCard}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <span className={styles.highlightNum}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                <p className={styles.highlightDesc}>{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.shell}>
          <p className={styles.sectionEyebrow} data-reveal>
            {service.galleryHeading}
          </p>
          <div className={styles.galleryGrid}>
            {service.gallery.map((item, index) => (
              <figure
                key={item.src}
                className={`${styles.galleryItem} ${index === 0 ? styles.galleryItemWide : ""}`}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <div className={styles.galleryImgWrap}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, 50vw"
                    className={styles.galleryImg}
                  />
                </div>
                <figcaption className={styles.galleryCaption}>
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.shell}>
          <p className={styles.sectionEyebrow} data-reveal>
            {service.processHeading}
          </p>
          <h2 className={styles.processTitle} data-reveal>
            {service.processTitle}
          </h2>
          <div className={styles.processGrid}>
            {service.process.map((step, index) => (
              <div
                key={step.step}
                className={styles.processStep}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <span className={styles.stepNum}>{step.step}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className={styles.shell}>
          <blockquote className={styles.closingQuote} data-reveal>
            &ldquo;{service.closingStatement}&rdquo;
          </blockquote>
        </div>
      </section>

      <section className={styles.ctaSection} data-reveal>
        <div className={styles.ctaShell}>
          <h2 className={styles.ctaTitle}>{service.cta.title}</h2>
          <p className={styles.ctaDesc}>{service.cta.description}</p>
          <div className={styles.ctaActions}>
            <Link href={service.cta.primaryButton.href} className={styles.ctaButton}>
              {service.cta.primaryButton.label}
            </Link>
            <Link href={service.cta.secondaryButton.href} className={styles.ctaSecondary}>
              {service.cta.secondaryButton.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
