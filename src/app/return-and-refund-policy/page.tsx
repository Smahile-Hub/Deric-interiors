import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentType } from "react";
import {
  FiAlertCircle,
  FiMessageSquare,
  FiPackage,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";
import { getReturnPolicyPageContent } from "@/lib/page-content";
import type { IconName } from "@/types/site";

import styles from "./return-and-refund-policy.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Acquisition and Returns",
  description:
    "Review Dric Interior's terms of acquisition, quality assurance process, return eligibility, and support guidelines for curated pieces.",
  pathname: "/return-and-refund-policy",
});

const iconMap: Record<IconName, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  facebook: FiPackage,
  "x-twitter": FiPackage,
  instagram: FiPackage,
  youtube: FiPackage,
  whatsapp: FiPackage,
  aperture: FiPackage,
  grid: FiPackage,
  "shopping-bag": FiPackage,
  mail: FiPackage,
  phone: FiPackage,
  package: FiPackage,
  "alert-circle": FiAlertCircle,
  "refresh-cw": FiRefreshCw,
  "message-square": FiMessageSquare,
  shield: FiShield,
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

export default async function ReturnAndRefundPolicyPage() {
  const page = await getReturnPolicyPageContent();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Acquisition & Returns",
    description:
      "Return and refund policy for Dric Interior covering final sale terms, quality assurance, eligibility, and support.",
    url: toAbsoluteUrl("/return-and-refund-policy"),
  };

  const StandardIcon = iconMap[page.standard.icon];

  return (
    <>
      <JsonLd data={structuredData} />

      <section className={styles.page}>
        <div className={styles.heroShell}>
          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
              <h1 className={styles.heroTitle}>
                {page.hero.titleLineOne}
                <br />
                {page.hero.titleLineTwo}
                <br />
                {page.hero.titleLineThree}
              </h1>
              <p className={styles.heroQuote}>{page.hero.quote}</p>
            </div>

            <div className={styles.heroMedia}>
              <Image
                src={page.hero.image.url}
                alt={page.hero.image.alt}
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
              {page.sections.map((section) => {
                const Icon = iconMap[section.icon];

                return (
                  <article key={section.id} className={styles.policyCard}>
                    <div className={styles.policyIconWrap}>
                      <Icon className={styles.policyIcon} aria-hidden={true} />
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
                          <p className={styles.protocolTitle}>{section.protocolTitle}</p>
                          <p>{section.protocolBody}</p>
                        </div>
                      ) : null}

                      {section.supportLabel ? (
                        <div className={styles.supportRow}>
                          <div className={styles.supportIconCircle}>
                            <FiMessageSquare aria-hidden="true" />
                          </div>
                          <div className={styles.supportCopy}>
                            <p className={styles.supportLabel}>{section.supportLabel}</p>
                            <a href={section.supportHref} className={styles.supportValue}>
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

        <section className={styles.standardSection}>
          <div className={styles.standardShell}>
            <StandardIcon className={styles.standardIcon} aria-hidden={true} />
            <h2 className={styles.standardTitle}>{page.standard.title}</h2>
            <p className={styles.standardCopy}>{page.standard.copy}</p>
          </div>
        </section>
      </section>
    </>
  );
}
