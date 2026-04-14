"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import styles from "./about.module.css";

type Milestone = {
  value: string;
  label: string;
  description: string;
  highlighted: boolean;
};

type ValueCard = {
  number: string;
  title: string;
  description: string;
};

type AboutExperienceProps = {
  milestones: Milestone[];
  values: ValueCard[];
};

export function AboutExperience({
  milestones,
  values,
}: AboutExperienceProps) {
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
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury interior with refined architectural detail"
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroShell}>
          <p className={styles.eyebrow} data-reveal>
            The Experience You Need
          </p>
          <h1 className={styles.heroTitle} data-reveal>
            Curating Spaces
            <br />
            with <span className={styles.heroAccent}>Intention</span>
          </h1>
          <div className={styles.heroDivider} aria-hidden="true" data-reveal />
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyShell}>
          <div className={styles.storyGrid}>
            <div className={styles.storyText} data-reveal>
              <p className={styles.storyEyebrow}>Our Story</p>
              <h2 className={styles.storyHeading}>
                Architectural
                <br />
                Precision meets
                <br />
                Soulful Artistry.
              </h2>
              <p className={styles.storyBody}>
                At Dric Interior, we specialise in creating luxurious, bespoke
                interiors that reflect the unique style and personality of each
                client. With a keen eye for detail and a passion for design
                excellence, our team of experts transforms spaces into
                sophisticated, functional works of art. Whether you&apos;re
                looking to revamp a single room or redesign an entire home, we
                deliver unparalleled quality and elegance in every project.
              </p>
            </div>

            <div className={styles.storyImages} data-reveal>
              <div className={styles.storyImgTall}>
                <Image
                  src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=700&q=80"
                  alt="Interior detail - textured wall and sculptural lamp"
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.storyImgSquare}>
                <Image
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=700&q=80"
                  alt="Architecture - clean lines and natural materials"
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
            <h2 className={styles.milestonesTitle}>The Legacy of Excellence</h2>
            <p className={styles.milestonesDesc}>
              Our journey is marked by the trust of our clients and the enduring
              beauty of the spaces we&apos;ve realised across the globe.
            </p>
          </div>

          <div className={styles.milestonesGrid}>
            {milestones.map((milestone, index) => (
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
            Foundations of Luxury
          </h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
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
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury interior"
          fill
          sizes="100vw"
          className={styles.ctaBg}
        />
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaShell}>
          <h2 className={styles.ctaTitle}>Experience Us</h2>
          <Link href="/#contact" className={styles.ctaButton}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
