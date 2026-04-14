"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { ContactForm } from "./ContactForm";
import styles from "./contact.module.css";

type Location = {
  city: string;
  address: string;
  state: string;
  phone: string;
  whatsapp: string;
};

type ContactExperienceProps = {
  locations: Location[];
};

export function ContactExperience({ locations }: ContactExperienceProps) {
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
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury penthouse interior - warm tones and city views"
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroShell}>
          <p className={styles.eyebrow} data-reveal>
            Curated Experiences
          </p>
          <h1 className={styles.heroTitle} data-reveal>
            <span className={styles.heroTitleTop}>Begin</span>
            <span className={styles.heroTitleBottom}>Transformation</span>
          </h1>
          <p className={styles.heroDesc} data-reveal>
            Every masterpiece begins with a conversation. Let us redefine the
            boundaries of your sanctuary through the lens of architectural depth
            and bespoke luxury.
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactShell}>
          <div className={styles.contactGrid}>
            <div className={styles.formColumn} data-reveal>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>The Initial Consultation</h2>
                <span className={styles.formRule} aria-hidden="true" />
              </div>
              <ContactForm />
            </div>

            <aside className={styles.infoColumn} data-reveal>
              <div className={styles.contactCard}>
                <p className={styles.cardEyebrow}>Dric Interior, Lagos</p>
                <address className={styles.cardAddress}>
                  <span>6ix Unity Road, Ikeja</span>
                  <span>Lagos, Nigeria</span>
                </address>
                <div className={styles.cardContacts}>
                  <a href="tel:+2348123456789" className={styles.cardLink}>
                    +234 812 345 6789
                  </a>
                  <a
                    href="https://wa.me/2348123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className={styles.officeImgWrap}>
                <Image
                  src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80"
                  alt="Dric Interior studio - material samples and design boards"
                  fill
                  sizes="(max-width: 900px) 100vw, 35vw"
                  className={styles.coverImage}
                />
              </div>

              <div className={styles.locationList}>
                {locations.map((location, index) => (
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
          title="Dric Interior - Ikeja, Lagos"
          src="https://www.openstreetmap.org/export/embed.html?bbox=3.31%2C6.55%2C3.42%2C6.65&layer=mapnik&marker=6.6051%2C3.3505"
          loading="lazy"
          className={styles.mapFrame}
        />
      </div>
    </div>
  );
}
