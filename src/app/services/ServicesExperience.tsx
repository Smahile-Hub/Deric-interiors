"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { ServicesPageContent } from "@/types/site";

import styles from "./services.module.css";

type ServicesExperienceProps = {
  page: ServicesPageContent;
};

export function ServicesExperience({ page }: ServicesExperienceProps) {
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
    "--hero-image-shift": `${heroProgress * -56}px`,
    "--hero-image-scale": `${1.08 - heroProgress * 0.06}`,
    "--hero-shell-shift": `${heroProgress * -82}px`,
    "--hero-shell-opacity": `${1 - heroProgress * 0.42}`,
    "--hero-overlay-opacity": `${0.84 + heroProgress * 0.1}`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={styles.servicesRoot}>
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
            {page.hero.titlePrefix} <span className={styles.heroAccent}>{page.hero.titleAccent}</span>
            <br />
            {page.hero.titleSuffix}
          </h1>
          <p className={styles.heroDesc} data-reveal>
            {page.hero.description}
          </p>
          <Link href={page.hero.cta.href} className={styles.heroCta} data-reveal>
            {page.hero.cta.label}
          </Link>
        </div>
      </section>

      <section className={styles.statsSection} data-reveal>
        <div className={styles.statsShell}>
          {page.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={styles.statItem}
              data-reveal
              style={{ "--stagger-index": index } as CSSProperties}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.shell}>
          <div className={styles.servicesHeader} data-reveal>
            <h2 className={styles.sectionHeading}>{page.intro.title}</h2>
            <p className={styles.sectionDesc}>{page.intro.description}</p>
          </div>

          <div className={styles.servicesRows}>
            {page.services.reduce<Array<ServicesPageContent["services"]>>((rows, service, index) => {
              if (index % 2 === 0) {
                rows.push([service]);
                return rows;
              }

              rows[rows.length - 1].push(service);
              return rows;
            }, []).map((row, rowIndex) => (
              <div
                key={`services-row-${rowIndex + 1}`}
                className={styles.servicesRow}
                data-reveal
                style={{ "--stagger-index": rowIndex } as CSSProperties}
              >
                {row.map((service) => (
                  <article
                    key={service.id}
                    id={service.id}
                    className={`${styles.bentoCard} ${
                      service.wide ? styles.bentoWide : ""
                    }`}
                  >
                    <div className={styles.cardBody}>
                      <span className={styles.cardNum}>{service.number}</span>
                      <div className={styles.cardText}>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                      </div>
                      <Link
                        href={`/services/${service.id}`}
                        className={styles.cardLink}
                      >
                        Details <span aria-hidden="true">-&gt;</span>
                      </Link>
                    </div>

                    <div className={styles.cardMedia}>
                      <Image
                        src={service.image.url}
                        alt={service.image.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 45vw"
                        className={styles.cardImg}
                      />
                      <div className={styles.cardOverlay} />
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.shell}>
          <h2 className={styles.processTitle} data-reveal>
            {page.process.title}
          </h2>
          <div className={styles.processGrid}>
            {page.process.items.map((step, index) => (
              <div
                key={step.number}
                className={styles.processStep}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <span className={styles.stepNum}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} data-reveal>
        <div className={styles.ctaShell}>
          <h2 className={styles.ctaTitle}>
            {page.cta.titleLineOne}
            <br />
            {page.cta.titleLineTwo}
          </h2>
          <p className={styles.ctaDesc}>{page.cta.description}</p>
          <div className={styles.ctaActions}>
            <Link href={page.cta.primaryButton.href} className={styles.ctaButton}>
              {page.cta.primaryButton.label}
            </Link>
            <Link href={page.cta.secondaryButton.href} className={styles.ctaLink}>
              {page.cta.secondaryButton.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
