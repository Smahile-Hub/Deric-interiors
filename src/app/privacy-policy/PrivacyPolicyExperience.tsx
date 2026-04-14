"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import styles from "./privacy-policy.module.css";

type PrivacyPolicyExperienceProps = {
  collectionParagraphs: string[];
  usageBullets: string[];
};

export function PrivacyPolicyExperience({
  collectionParagraphs,
  usageBullets,
}: PrivacyPolicyExperienceProps) {
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
      <div className={styles.shell}>
        <div className={styles.headerSection} data-reveal>
          <p className={styles.eyebrow}>Commitment to Privacy</p>
          <h1 className={styles.pageTitle}>Privacy Policy</h1>
          <span className={styles.headerRule} aria-hidden="true" />
        </div>

        <section className={styles.introSection} data-reveal>
          <div className={styles.introMeta}>
            <p className={styles.metaLabel}>Valid till further notice</p>
          </div>

          <div className={styles.introBody}>
            <p>
              We at Dric Interior are committed to protecting the privacy of any
              information given by our customers. Under law, your rights to
              privacy are also protected. The National Privacy Principles, the
              Privacy Act and general law place strict requirements on us to
              treat certain information collected as confidential.
            </p>
            <p>
              Our secure server will protect any personal information that you
              submit.
            </p>
          </div>
        </section>

        <section className={styles.articleSection} data-reveal>
          <div className={styles.articleHeading}>
            <h2>01 / Collection</h2>
          </div>

          <div className={styles.articleBody}>
            {collectionParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className={styles.articleSection} data-reveal>
          <div className={styles.articleHeading}>
            <h2>02 / Usage</h2>
          </div>

          <div className={styles.articleBody}>
            <p>
              We might, on occasions, use this information to notify you of any
              important changes to our site or any special promotions that may
              be of interest to you.
            </p>

            <ul className={styles.bulletList}>
              {usageBullets.map((item, index) => (
                <li key={item} style={{ "--stagger-index": index } as CSSProperties}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.articleSection} data-reveal>
          <div className={styles.articleHeading}>
            <h2>03 / Protection</h2>
          </div>

          <div className={styles.articleBody}>
            <p>
              We implement industry-standard security measures to safeguard your
              personal data. All digital interactions are encrypted, and access
              to client files is restricted to authorized personnel directly
              involved in your project. We do not sell or trade your personal
              data to third parties for marketing purposes.
            </p>
          </div>
        </section>

        <section className={styles.imageBreak} data-reveal>
          <div className={styles.imageFrame}>
            <Image
              src="https://images.unsplash.com/photo-1616594039964-3ae7d548f3d3?auto=format&fit=crop&w=1400&q=80"
              alt="Minimalist luxury interior with warm lighting"
              fill
              sizes="(max-width: 960px) 100vw, 58vw"
              className={styles.breakImage}
            />
          </div>

          <blockquote className={styles.quoteBlock}>
            "Elegance is not about being noticed, it&apos;s about being
            remembered while remaining private."
          </blockquote>
        </section>

        <section className={styles.articleSection} data-reveal>
          <div className={styles.articleHeading}>
            <h2>04 / Third Parties</h2>
          </div>

          <div className={styles.articleBody}>
            <p>
              By using the dricinterior.com site, you are consenting to the
              collection of information by dricinterior.com. If any changes to
              these policies occur, we will notify our customers by updating
              this section of our website.
            </p>
          </div>
        </section>

        <section className={styles.articleSection} data-reveal>
          <div className={styles.articleHeading}>
            <h2>05 / Your Rights</h2>
          </div>

          <div className={styles.articleBody}>
            <p>
              Protecting your personal and order information is a priority at
              Dric Interior. We want you to be able to order from
              dricinterior.com with total confidence.
            </p>
            <p>
              As such we have created a secure transaction environment. We use
              Secure Sockets Layer (SSL) technology. Our online ordering system
              is the industry standard for encryption technology to protect your
              online order information. SSL encrypts all information including
              all personal information passed from you to dricinterior.com.
            </p>

            <div className={styles.contactCard}>
              <p className={styles.contactEyebrow}>For further inquiries</p>
              <a href="mailto:hello@dricinterior.com" className={styles.contactLink}>
                hello@dricinterior.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
