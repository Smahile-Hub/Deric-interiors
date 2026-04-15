"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { FiClock, FiLayout, FiMessageCircle, FiUser } from "react-icons/fi";

import { TransitionLink } from "@/components/site/TransitionLink";
import styles from "./book-appointment.module.css";

const EXPECT_ITEMS = [
  {
    icon: FiUser,
    title: "Personalized Consultation",
    body: "A one-on-one meeting to discuss your design goals, style preferences, and needs for your space — tailored entirely to you.",
  },
  {
    icon: FiClock,
    title: "Site Measurement",
    body: "Site measurement will typically take between 30–60 minutes, giving our team an accurate foundation to design from.",
  },
  {
    icon: FiLayout,
    title: "Timelines & Budget",
    body: "A comprehensive discussion about timelines, budget, and the design process. Depending on scope, we may provide 3D renderings or mood boards to give you a visual preview.",
  },
  {
    icon: FiMessageCircle,
    title: "Open Communication",
    body: "Transparent dialogue about project timelines, costs, and any questions you may have — ensuring you are involved every step of the way.",
  },
];

const PROJECT_TYPES = [
  "Residential Design",
  "Commercial Fitout",
  "Workplace",
  "Hospitality",
  "Heritage Renovation",
];

const TIME_SLOTS = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 7pm)",
];

type Fields = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  preferredDate: "",
  preferredTime: "",
  location: "",
  message: "",
};

export function BookAppointmentExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    root.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div ref={rootRef} className={styles.root}>
      {/* ── HERO ── */}
      <section className={styles.hero} style={heroStyle}>
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80"
          alt="Beautifully designed interior space"
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroShell}>
          <p className={styles.eyebrow} data-reveal>
            Design Consultation
          </p>
          <h1 className={styles.heroTitle} data-reveal>
            <span className={styles.heroTitleTop}>Book a</span>
            <span className={styles.heroTitleBottom}>Design Appointment</span>
          </h1>
          <p className={styles.heroDesc} data-reveal>
            Ready to transform your space? Schedule a personalized consultation
            with our interior design team. Whether you&rsquo;re planning a full
            renovation or a simple update, we&rsquo;re here to bring your vision
            to life.
          </p>
          <div data-reveal>
            <button className={styles.heroCtaBtn} onClick={scrollToForm}>
              Book An Appointment Now
            </button>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className={styles.expectSection}>
        <div className={styles.shell}>
          <div className={styles.expectHeader} data-reveal>
            <p className={styles.sectionEyebrow}>Before You Arrive</p>
            <h2 className={styles.sectionTitle}>
              What to expect when you book an appointment
            </h2>
            <span className={styles.titleRule} aria-hidden="true" />
          </div>

          <div className={styles.expectGrid}>
            {EXPECT_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={styles.expectCard}
                  data-reveal
                  style={{ "--stagger-index": i } as CSSProperties}
                >
                  <span className={styles.cardIconWrap} aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardBody}>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section className={styles.formSection} ref={formRef}>
        <div className={styles.shell}>
          <div className={styles.formGrid}>
            <div className={styles.formSide} data-reveal>
              <div className={styles.formHeader}>
                <p className={styles.sectionEyebrow}>Let&rsquo;s Begin</p>
                <h2 className={styles.formTitle}>Schedule Your Appointment</h2>
                <span className={styles.titleRule} aria-hidden="true" />
              </div>

              {submitted ? (
                <div className={styles.successState} role="status">
                  <span className={styles.successIcon}>✦</span>
                  <h3 className={styles.successTitle}>Appointment Requested</h3>
                  <p className={styles.successBody}>
                    Thank you, {fields.name || "there"}. One of our design
                    consultants will confirm your appointment within 24 hours.
                  </p>
                  <button
                    className={styles.resetBtn}
                    onClick={() => {
                      setFields(EMPTY);
                      setSubmitted(false);
                    }}
                  >
                    Book another appointment
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="name">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={fields.name}
                        onChange={handleChange}
                        placeholder="e.g. Amara Okafor"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="email">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={fields.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={fields.phone}
                        onChange={handleChange}
                        placeholder="+234 xxx xxx xxxx"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="projectType">
                        Project Type
                      </label>
                      <div className={styles.selectWrap}>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={fields.projectType}
                          onChange={handleChange}
                          className={styles.select}
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <span className={styles.selectArrow} aria-hidden="true">
                          ›
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="preferredDate">
                        Preferred Date
                      </label>
                      <input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        required
                        value={fields.preferredDate}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.inputDate}`}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="preferredTime">
                        Preferred Time
                      </label>
                      <div className={styles.selectWrap}>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          required
                          value={fields.preferredTime}
                          onChange={handleChange}
                          className={styles.select}
                        >
                          <option value="" disabled>
                            Select time slot
                          </option>
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <span className={styles.selectArrow} aria-hidden="true">
                          ›
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="location">
                      Project Location / Address
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={fields.location}
                      onChange={handleChange}
                      placeholder="e.g. Lekki Phase 1, Lagos"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">
                      Tell Us About Your Space
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={fields.message}
                      onChange={handleChange}
                      placeholder="Describe your space, the feeling you want to create, and any inspiration you have…"
                      className={`${styles.input} ${styles.textarea}`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitBtn}
                  >
                    {loading ? "Submitting…" : "Book My Appointment"}
                  </button>
                </form>
              )}
            </div>

            <aside className={styles.formAside} data-reveal>
              <div className={styles.asideImgWrap}>
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
                  alt="Dric Interior design consultation session"
                  fill
                  sizes="(max-width: 960px) 100vw, 40vw"
                  className={styles.asideImg}
                />
                <div className={styles.asideImgOverlay} />
              </div>

              <div className={styles.asideNote}>
                <p className={styles.asideNoteEyebrow}>Quick reminder</p>
                <p className={styles.asideNoteText}>
                  Our team will reach out within 24 hours to confirm your
                  appointment. For urgent enquiries, call or WhatsApp us at{" "}
                  <a href="tel:+2348135333616" className={styles.asideNoteLink}>
                    +234 813 533 3616
                  </a>
                  .
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaImgWrap}>
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
            alt="Luxurious interior designed by Dric Interior"
            fill
            sizes="100vw"
            className={styles.ctaBg}
          />
          <div className={styles.ctaOverlay} />
        </div>

        <div className={styles.ctaShell} data-reveal>
          <p className={styles.ctaEyebrow}>You dream it, we design it</p>
          <h2 className={styles.ctaTitle}>
            We deliver luxurious and{" "}
            <em className={styles.ctaTitleAccent}>innovative spaces</em>
          </h2>
          <a
            href="https://wa.me/2348135333616"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Chat with Us on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
