"use client";

import Image from "next/image";

import { TransitionLink } from "./TransitionLink";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import type { HomePage } from "@/types/site";

import styles from "./site.module.css";

type HomepageProps = {
  page: HomePage;
};

function AccentText({
  text,
  phrase,
  accentClassName,
}: {
  text: string;
  phrase: string;
  accentClassName: string;
}) {
  if (!phrase) {
    return <>{text}</>;
  }

  const source = text.toLowerCase();
  const target = phrase.toLowerCase();
  const index = source.indexOf(target);

  if (index === -1) {
    return <>{text}</>;
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + phrase.length);
  const after = text.slice(index + phrase.length);

  return (
    <>
      {before}
      <span className={accentClassName}>{match}</span>
      {after}
    </>
  );
}

function ArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <TransitionLink href={href} className={styles.inlineLink}>
      <span>{label}</span>
      <span aria-hidden="true">-&gt;</span>
    </TransitionLink>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center" ? styles.sectionHeadingCenter : styles.sectionHeading
      }
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function ServiceArrow({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  return (
    <div className={styles.carouselControls}>
      <button onClick={onPrev} aria-label="Previous" className={styles.sectionArrow}>&lt;-</button>
      <button onClick={onNext} aria-label="Next" className={styles.sectionArrow}>-&gt;</button>
    </div>
  );
}

function QuoteMark(): ReactNode {
  return <span className={styles.quoteMark}>&ldquo;</span>;
}

function CasinoCounter({ value }: { value: string }) {
  const [display, setDisplay] = useState<string>(value);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          let tick = 0;
          const totalTicks = 30;

          const runTick = () => {
            tick++;
            const progress = tick / totalTicks;

            if (tick < totalTicks) {
              const rand = Math.floor(Math.random() * (target + 12));
              setDisplay(String(rand) + suffix);
              // Interval starts at 40ms, slows exponentially to ~350ms
              const delay = 40 + Math.pow(progress, 2.2) * 310;
              setTimeout(runTick, delay);
            } else {
              setDisplay(value);
            }
          };

          setTimeout(runTick, 60);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <strong ref={ref}>{display}</strong>;
}

function HeroTitle({ title }: { title: string }) {
  const lines = title.split("\n").filter(Boolean);

  return (
    <h1 className={styles.heroTitle} aria-label={title.replace(/\n/g, " ")}>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index + 1}`}
          className={styles.heroTitleLine}
          style={{ "--line-index": index } as CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </h1>
  );
}

export function Homepage({ page }: HomepageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 352 + 32; // Card width + gap
      scrollRef.current.scrollBy({
        left: dir === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
    const root = pageRef.current;

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

    const revealElements = root.querySelectorAll("[data-reveal]");
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const heroProgress = Math.max(0, Math.min(scrollY / 720, 1));
  const heroStyle = {
    "--hero-overlay-start": page.hero.overlayStart,
    "--hero-overlay-end": page.hero.overlayEnd,
    "--hero-image-shift": `${heroProgress * -72}px`,
    "--hero-content-shift": `${heroProgress * -118}px`,
    "--hero-content-opacity": `${1 - heroProgress * 0.58}`,
    "--hero-image-scale": `${1.08 - heroProgress * 0.08}`,
    "--hero-overlay-opacity": `${0.68 + heroProgress * 0.2}`,
    "--hero-scroll-opacity": `${1 - heroProgress * 1.8}`,
  } as CSSProperties;

  const sectionStyle = (background: string) =>
    ({
      "--section-bg": background,
    }) as CSSProperties;

  const ctaStyle = {
    "--section-bg": page.finalCta.backgroundColor,
    "--cta-accent": page.finalCta.accentColor,
  } as CSSProperties;

  return (
    <div ref={pageRef} className={styles.homepageRoot}>
      <section className={styles.hero} style={heroStyle}>
        <Image
          src={page.hero.backgroundImage.url}
          alt={page.hero.backgroundImage.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroShell}>
          <div className={styles.heroContent}>
            {page.hero.eyebrow ? (
              <p className={styles.eyebrow} data-reveal>
                {page.hero.eyebrow}
              </p>
            ) : null}
            <HeroTitle title={page.hero.title} />
            <p className={styles.heroDescription} data-reveal>
              {page.hero.description}
            </p>
            <div className={styles.heroActions} data-reveal>
              <TransitionLink href={page.hero.primaryCta.href} className={styles.primaryButton}>
                {page.hero.primaryCta.label}
              </TransitionLink>
              <ArrowLink
                href={page.hero.secondaryCta.href}
                label={page.hero.secondaryCta.label}
              />
            </div>
          </div>

          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </section>

      <section
        id="about"
        className={styles.aboutSection}
        style={sectionStyle(page.about.backgroundColor)}
        data-reveal
      >
        <div className={styles.sectionShell}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutVisual} data-reveal>
              <div className={styles.aboutVisualInner}>
                <Image
                  src={page.about.image.url}
                  alt={page.about.image.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 35vw"
                  className={styles.coverImage}
                />
              </div>
              <div
                className={styles.statCard}
                style={
                  {
                    "--panel-bg": page.about.panelColor,
                  } as CSSProperties
                }
              >
                <CasinoCounter value={page.about.yearsValue} />
                <span>{page.about.yearsLabel}</span>
              </div>
            </div>

            <div className={styles.aboutContent} data-reveal>
              <SectionHeading
                eyebrow={page.about.eyebrow}
                title={page.about.title}
                description={page.about.description}
              />

              <div className={styles.aboutFeatures}>
                <article>
                  <h3>{page.about.featureOneTitle}</h3>
                  <p>{page.about.featureOneBody}</p>
                </article>
                <article>
                  <h3>{page.about.featureTwoTitle}</h3>
                  <p>{page.about.featureTwoBody}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className={styles.servicesSection}
        style={sectionStyle(page.services.backgroundColor)}
        data-reveal
      >
        <div className={styles.sectionShell}>
          <div className={styles.servicesHeader} data-reveal>
            <SectionHeading
              title={page.services.title}
              description={page.services.description}
            />
            <ServiceArrow 
              onPrev={() => handleScroll("left")} 
              onNext={() => handleScroll("right")} 
            />
          </div>

          <div className={styles.servicesRail} ref={scrollRef}>
            {page.services.items.map((item, index) => (
              <article
                key={item.title}
                className={styles.serviceCard}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <div
                  className={styles.serviceMedia}
                  style={
                    {
                      "--service-overlay": item.overlayColor,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 960px) 72vw, 28vw"
                    className={styles.coverImage}
                  />
                </div>
                <div className={styles.serviceCopy}>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className={styles.portfolioSection}
        style={sectionStyle(page.portfolio.backgroundColor)}
        data-reveal
      >
        <div className={styles.sectionShell}>
          <SectionHeading
            eyebrow={page.portfolio.eyebrow}
            title={page.portfolio.title}
          />

          <div className={styles.portfolioGrid}>
            <article className={styles.featuredProject} data-reveal>
              <div className={styles.featuredProjectMedia}>
                <Image
                  src={page.portfolio.featuredProject.image.url}
                  alt={page.portfolio.featuredProject.image.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 60vw"
                  className={styles.coverImage}
                />
                <div className={styles.featuredProjectOverlay} />
              </div>

              <div className={styles.featuredProjectCopy}>
                <h3>{page.portfolio.featuredProject.title}</h3>
                <p>{page.portfolio.featuredProject.summary}</p>
                <ArrowLink
                  href={page.portfolio.featuredProject.link.href}
                  label={page.portfolio.featuredProject.link.label}
                />
              </div>
            </article>

            <div className={styles.sideProjects}>
              {page.portfolio.secondaryProjects.slice(0, 2).map((project, index) => (
                <article
                  key={project.title}
                  className={styles.sideProject}
                  data-reveal
                  style={{ "--stagger-index": index + 1 } as CSSProperties}
                >
                  <div className={styles.sideProjectMedia}>
                    <Image
                      src={project.image.url}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 960px) 100vw, 26vw"
                      className={styles.coverImage}
                    />
                  </div>

                  <div className={styles.sideProjectCopy}>
                    <p className={styles.projectCategory}>{project.category}</p>
                    <h3>{project.title}</h3>
                    <ArrowLink href={project.link.href} label={project.link.label} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.missionSection}
        style={sectionStyle(page.mission.backgroundColor)}
        data-reveal
      >
        <div className={styles.sectionShell}>
          <div className={styles.missionIconRow} data-reveal>
            <span />
            <strong>*</strong>
            <span />
          </div>

          <div className={styles.missionStatement} data-reveal>
            <p>{page.mission.titleLineOne}</p>
            <h2>
              <AccentText
                text={page.mission.titleLineTwo}
                phrase={page.mission.highlightPhrase}
                accentClassName={styles.goldAccent}
              />
            </h2>
          </div>

          <div className={styles.missionGrid}>
            {page.mission.pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={styles.missionCard}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className={styles.testimonialsSection}
        style={sectionStyle(page.testimonials.backgroundColor)}
        data-reveal
      >
        <div className={styles.sectionShell}>
          <SectionHeading title={page.testimonials.title} />

          <div className={styles.testimonialGrid}>
            {page.testimonials.items.map((item, index) => (
              <article
                key={item.author}
                className={styles.testimonialItem}
                data-reveal
                style={{ "--stagger-index": index } as CSSProperties}
              >
                {QuoteMark()}
                <p>{item.quote}</p>
                <div className={styles.testimonialAuthor}>
                  <span />
                  <strong>{item.author}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={styles.finalCtaSection}
        style={ctaStyle}
        data-reveal
      >
        <div className={styles.sectionShell}>
          <div className={styles.finalCtaPanel} data-reveal>
            <h2 className={styles.finalCtaTitle}>
              <AccentText
                text={page.finalCta.title}
                phrase={page.finalCta.highlightPhrase}
                accentClassName={styles.goldAccent}
              />
            </h2>
            <p className={styles.finalCtaDescription}>
              {page.finalCta.description}
            </p>
            <TransitionLink href={page.finalCta.button.href} className={styles.primaryButton}>
              {page.finalCta.button.label}
            </TransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
