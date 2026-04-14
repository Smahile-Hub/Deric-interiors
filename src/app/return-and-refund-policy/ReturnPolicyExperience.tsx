"use client";

import Image from "next/image";
import {
  FiAlertCircle,
  FiMessageSquare,
  FiPackage,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import styles from "./return-and-refund-policy.module.css";

type PolicySection = {
  id: string;
  title: string;
  iconKey: "package" | "alert" | "refresh" | "message";
  paragraphs: string[];
  highlight?: string;
  protocolTitle?: string;
  protocolBody?: string;
  supportLabel?: string;
  supportValue?: string;
};

type ReturnPolicyExperienceProps = {
  policySections: PolicySection[];
};

function renderHighlightedText(text: string, highlight?: string) {
  if (!highlight || !text.includes(highlight)) {
    return text;
  }

  const [before, after] = text.split(highlight);

  return (
    <>
      {before}
      <span className={styles.inlineHighlight}>{highlight}</span>
      {after}
    </>
  );
}

export function ReturnPolicyExperience({
  policySections,
}: ReturnPolicyExperienceProps) {
  const rootRef = useRef<HTMLElement>(null);

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
    <section ref={rootRef} className={styles.page}>
      <div className={styles.heroShell}>
        <div className={styles.heroContent}>
          <div className={styles.heroCopy} data-reveal>
            <p className={styles.eyebrow}>Dric Interior Policy</p>
            <h1 className={styles.heroTitle}>
              Terms of
              <br />
              Acquisition
              <br />
              &amp; Returns
            </h1>
            <p className={styles.heroQuote}>
              "Our commitment to quality and the nature of bespoke curation."
            </p>
          </div>

          <div className={styles.heroMedia} data-reveal>
            <Image
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80"
              alt="Luxury atelier kitchen interior"
              fill
              priority
              sizes="(max-width: 960px) 100vw, 44vw"
              className={styles.heroImage}
            />
            <div className={styles.heroMediaOverlay} />
          </div>
        </div>
      </div>

      <section className={styles.policyBand}>
        <div className={styles.policyShell}>
          <div className={styles.policyGrid}>
            {policySections.map((section, index) => {
              const Icon =
                section.iconKey === "package"
                  ? FiPackage
                  : section.iconKey === "alert"
                    ? FiAlertCircle
                    : section.iconKey === "refresh"
                      ? FiRefreshCw
                      : FiMessageSquare;

              return (
                <article
                  key={section.id}
                  className={styles.policyCard}
                  data-reveal
                  style={{ "--stagger-index": index } as CSSProperties}
                >
                  <div className={styles.policyIconWrap}>
                    <Icon className={styles.policyIcon} aria-hidden="true" />
                  </div>

                  <div className={styles.policyBody}>
                    <div className={styles.policyHeadingRow}>
                      <span className={styles.policyNumber}>{section.id}</span>
                      <h2>{section.title}</h2>
                    </div>

                    <div className={styles.policyParagraphs}>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>
                          {renderHighlightedText(paragraph, section.highlight)}
                        </p>
                      ))}
                    </div>

                    {section.protocolTitle ? (
                      <div className={styles.protocolCard}>
                        <p className={styles.protocolTitle}>
                          {section.protocolTitle}
                        </p>
                        <p>{section.protocolBody}</p>
                      </div>
                    ) : null}

                    {section.supportLabel ? (
                      <div className={styles.supportRow}>
                        <div className={styles.supportIconCircle}>
                          <FiMessageSquare aria-hidden="true" />
                        </div>
                        <div className={styles.supportCopy}>
                          <p className={styles.supportLabel}>
                            {section.supportLabel}
                          </p>
                          <a
                            href="tel:+2348135333616"
                            className={styles.supportValue}
                          >
                            {section.supportValue}
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.standardSection} data-reveal>
        <div className={styles.standardShell}>
          <FiShield className={styles.standardIcon} aria-hidden="true" />
          <h2 className={styles.standardTitle}>The Dric Standard</h2>
          <p className={styles.standardCopy}>
            Every acquisition is a pact of taste and trust. We thank you for
            your discerning commitment to our philosophy.
          </p>
        </div>
      </section>
    </section>
  );
}
