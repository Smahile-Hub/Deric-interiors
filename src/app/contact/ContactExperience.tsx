"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { ContactForm } from "./ContactForm";
import styles from "./contact.module.css";
import type { ContactPageContent } from "@/types/site";

type ContactExperienceProps = {
  page: ContactPageContent;
};

export function ContactExperience({ page }: ContactExperienceProps) {
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
    "--hero-shell-shift": `${heroProgress * -84}px`,
    "--hero-shell-opacity": `${1 - heroProgress * 0.42}`,
    "--hero-overlay-opacity": `${0.84 + heroProgress * 0.1}`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={styles.contactRoot}>
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
            <span className={styles.heroTitleTop}>{page.hero.titleTop}</span>
            <span className={styles.heroTitleBottom}>{page.hero.titleBottom}</span>
          </h1>
          <p className={styles.heroDesc} data-reveal>{page.hero.description}</p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactShell}>
          <div className={styles.contactGrid}>
            <div className={styles.formColumn} data-reveal>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>{page.form.title}</h2>
                <span className={styles.formRule} aria-hidden="true" />
              </div>
              <ContactForm content={page.form} />
            </div>

            <aside className={styles.infoColumn} data-reveal>
              <div className={styles.contactCard}>
                <p className={styles.cardEyebrow}>{page.infoCard.eyebrow}</p>
                <address className={styles.cardAddress}>
                  <span>{page.infoCard.addressLineOne}</span>
                  <span>{page.infoCard.addressLineTwo}</span>
                </address>
                <div className={styles.cardContacts}>
                  <a href={`tel:${page.infoCard.phone.replace(/\s/g, "")}`} className={styles.cardLink}>
                    {page.infoCard.phone}
                  </a>
                  <a
                    href={page.infoCard.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    {page.infoCard.whatsappLabel}
                  </a>
                </div>
              </div>

              <div className={styles.officeImgWrap}>
                <Image
                  src={page.studioImage.url}
                  alt={page.studioImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 35vw"
                  className={styles.coverImage}
                />
              </div>

              <div className={styles.locationList}>
                {page.locations.map((location, index) => (
                  <div
                    key={location.city}
                    className={styles.locationItem}
                    data-reveal
                    style={{ "--stagger-index": index } as CSSProperties}
                  >
                    <p className={styles.locationCity}>{location.city}</p>
                    <p className={styles.locationAddr}>
                      {location.address}
                      <br />
                      {location.state}
                    </p>
                    <a
                      href={`tel:${location.phone.replace(/\s/g, "")}`}
                      className={styles.locationPhone}
                    >
                      {location.phone}
                    </a>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className={styles.mapSection} data-reveal>
        <iframe
          title={page.map.title}
          src={page.map.embedUrl}
          loading="lazy"
          className={styles.mapFrame}
        />
      </div>
    </div>
  );
}
