"use client";

import { useState } from "react";
import styles from "./contact.module.css";

const PROJECT_TYPES = [
  "Residential Design",
  "Commercial Fitout",
  "Workplace",
  "Hospitality",
  "Heritage Renovation",
];

const INVESTMENT_RANGES = [
  "₦1M – ₦5M",
  "₦5M – ₦20M",
  "₦20M – ₦50M",
  "₦50M – ₦150M",
  "₦150M+",
];

type Fields = {
  name: string;
  email: string;
  projectType: string;
  investmentRange: string;
  preferredDate: string;
  phone: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  projectType: "",
  investmentRange: "",
  preferredDate: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up to a mail service (Resend, EmailJS, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.successState} role="status">
        <span className={styles.successIcon}>✦</span>
        <h3 className={styles.successTitle}>Request received</h3>
        <p className={styles.successBody}>
          Thank you, {fields.name || "there"}. One of our design consultants
          will be in touch within 24 hours.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => {
            setFields(EMPTY);
            setSubmitted(false);
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Row 1 */}
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
            Private Email
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

      {/* Row 2 */}
      <div className={styles.formRow}>
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
        <div className={styles.field}>
          <label className={styles.label} htmlFor="investmentRange">
            Investment Range
          </label>
          <div className={styles.selectWrap}>
            <select
              id="investmentRange"
              name="investmentRange"
              required
              value={fields.investmentRange}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="" disabled>
                Select range
              </option>
              {INVESTMENT_RANGES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} aria-hidden="true">
              ›
            </span>
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="preferredDate">
            Preferred Date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={fields.preferredDate}
            onChange={handleChange}
            className={`${styles.input} ${styles.inputDate}`}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={handleChange}
            placeholder="+234 xxx xxx xxxx"
            className={styles.input}
          />
        </div>
      </div>

      {/* Row 4 — full width */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Your Vision
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          placeholder="Describe the space, the feeling you want to live in, any inspiration you have…"
          className={`${styles.input} ${styles.textarea}`}
        />
      </div>

      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? "Sending…" : "Request Consultation"}
      </button>
    </form>
  );
}
