"use client";

import { useState } from "react";

import type { ContactPageContent } from "@/types/site";

import styles from "./contact.module.css";

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

type ContactFormProps = {
  content: ContactPageContent["form"];
};

export function ContactForm({ content }: ContactFormProps) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.successState} role="status">
        <span className={styles.successIcon}>{content.successIcon}</span>
        <h3 className={styles.successTitle}>{content.successTitle}</h3>
        <p className={styles.successBody}>
          {content.successBody.replace("{name}", fields.name || "there")}
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => {
            setFields(EMPTY);
            setSubmitted(false);
          }}
        >
          {content.resetButtonLabel}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            {content.fields.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={fields.name}
            onChange={handleChange}
            placeholder={content.fields.namePlaceholder}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            {content.fields.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={fields.email}
            onChange={handleChange}
            placeholder={content.fields.emailPlaceholder}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="projectType">
            {content.fields.projectTypeLabel}
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
                {content.fields.projectTypePlaceholder}
              </option>
              {content.fields.projectTypeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
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
            {content.fields.investmentRangeLabel}
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
                {content.fields.investmentRangePlaceholder}
              </option>
              {content.fields.investmentRangeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
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
            {content.fields.preferredDateLabel}
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
            {content.fields.phoneLabel}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={handleChange}
            placeholder={content.fields.phonePlaceholder}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          {content.fields.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          placeholder={content.fields.messagePlaceholder}
          className={`${styles.input} ${styles.textarea}`}
        />
      </div>

      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? content.submitLoadingLabel : content.submitIdleLabel}
      </button>
    </form>
  );
}
