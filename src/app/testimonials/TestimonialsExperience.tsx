"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import styles from "./testimonials.module.css";

export function TestimonialsExperience() {
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
    <main ref={rootRef} className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.shell}>
          <div className={styles.heroHeader}>
            <div className={styles.heroLeft} data-reveal>
              <p className={styles.eyebrow}>Client Chronicles</p>
              <h1 className={styles.heroTitle}>
                Voices of
                <br />
                Satisfaction
              </h1>
            </div>
            <div className={styles.heroRight} data-reveal>
              <p className={styles.heroDesc}>
                An intimate look into the experiences of those who have invited
                the Dric Interior aesthetic into their private sanctuaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.t1Section}>
        <div className={styles.shell}>
          <div className={styles.t1Grid}>
            <div className={styles.quoteBox} data-reveal>
              <span className={styles.quoteIconMark} aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className={styles.quoteText}>
                &ldquo;Sincerely, they are very professional, I appreciate the
                way they used to relate with customers, it is just wonderful.
                The job they did for me is very very neat and good. Please keep
                it up, God bless you. I love you.&rdquo;
              </blockquote>
              <footer className={styles.quoteAttr}>
                <span className={styles.attrLine} aria-hidden="true" />
                <div>
                  <p className={styles.attrName}>Enoch Adeleke</p>
                  <p className={styles.attrRole}>Residential Client</p>
                </div>
              </footer>
            </div>

            <div className={styles.t1ImageWrap} data-reveal>
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
                alt="Luxurious living room transformed by Dric Interior"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className={styles.coverImage}
              />
              <div className={styles.t1ImgGrad} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.accentTransition} aria-hidden="true" data-reveal>
        <span className={styles.accentLine} />
      </div>

      <section className={styles.t2Section}>
        <div className={styles.shell}>
          <div className={styles.t2Grid}>
            <div className={styles.t2ImageGroup} data-reveal>
              <div className={`${styles.t2Img} ${styles.t2ImgStagger}`}>
                <Image
                  src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80"
                  alt="Interior detail with refined textures and ambient lighting"
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.t2Img}>
                <Image
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80"
                  alt="Modern workspace with clean lines and warm materials"
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                  className={styles.coverImage}
                />
              </div>
            </div>

            <div className={styles.t2Card} data-reveal>
              <blockquote className={styles.t2Quote}>
                &ldquo;Dric interior gives the best at affordable rate and has
                the picture of his customer status and assumption of what the
                customer suit and brings it to actualization. Dric brings out
                who you are in interior decor.&rdquo;
              </blockquote>
              <footer className={styles.t2Attr}>
                <p className={styles.t2Name}>Adeola Ayodele</p>
                <p className={styles.t2Role}>Private Client</p>
              </footer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.shell}>
          <div className={styles.galleryHeader} data-reveal>
            <p className={styles.galleryEyebrow}>Portfolio Snapshot</p>
            <h2 className={styles.galleryTitle}>The Canvas of Our Clients</h2>
          </div>
          <div className={styles.galleryGrid} data-reveal>
            <div className={styles.galleryLeft}>
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80"
                alt="Client project with bespoke kitchen and statement cabinetry"
                fill
                sizes="(max-width: 900px) 100vw, 66vw"
                className={styles.coverImage}
              />
            </div>
            <div className={styles.galleryRight}>
              <div className={styles.galleryRightImg}>
                <Image
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
                  alt="Client project with dramatic bathroom and sculptural fixtures"
                  fill
                  sizes="(max-width: 900px) 100vw, 34vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.galleryRightImg}>
                <Image
                  src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80"
                  alt="Client project with freestanding bath in a natural stone setting"
                  fill
                  sizes="(max-width: 900px) 100vw, 34vw"
                  className={styles.coverImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} data-reveal>
        <div className={styles.ctaShell}>
          <h2 className={styles.ctaTitle}>Begin Your Journey</h2>
          <span className={styles.ctaRule} aria-hidden="true" />
          <Link href="/contact" className={styles.ctaButton}>
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
