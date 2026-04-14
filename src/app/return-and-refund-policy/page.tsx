import type { Metadata } from "next";
import Image from "next/image";
import {
  FiAlertCircle,
  FiMessageSquare,
  FiPackage,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";

import { JsonLd } from "@/components/site/JsonLd";
import { buildMetadata, toAbsoluteUrl } from "@/lib/metadata";

import styles from "./return-and-refund-policy.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Acquisition and Returns",
  description:
    "Review Dric Interior's terms of acquisition, quality assurance process, return eligibility, and support guidelines for curated pieces.",
  pathname: "/return-and-refund-policy",
});

const policySections = [
  {
    id: "01",
    title: "Bespoke Curation & Finality of Sale",
    icon: FiPackage,
    paragraphs: [
      "At Dric Interior each piece is an intentional acquisition. Our collections are composed of meticulously selected artifacts and custom-commissioned works that represent the pinnacle of artisanal craftsmanship. Due to the unique sourcing and personalized nature of these assets, all sales are considered final upon confirmation of acquisition.",
      "This policy ensures the integrity of our inventory and respects the delicate provenance of the curated objects within our studio.",
    ],
    highlight: "all sales are considered final",
  },
  {
    id: "02",
    title: "Quality Assurance & Discrepancies",
    icon: FiAlertCircle,
    paragraphs: [
      "While we maintain rigorous quality controls, we acknowledge the complexities of logistical transit. Should an item arrive with visible defects or damage incurred during delivery, we require notification within a strict 48-hour window.",
    ],
    protocolTitle: "Protocol",
    protocolBody:
      "Please document the condition upon arrival and contact our caretaker immediately to initiate a prompt resolution or replacement. Delay beyond 2 days may forfeit eligibility for claim.",
  },
  {
    id: "03",
    title: "Return Eligibility",
    icon: FiRefreshCw,
    paragraphs: [
      "As part of our commitment to exclusivity, Dric Interior does not accept returns or exchanges based on change of preference or aesthetic reconsideration. Each acquisition is a deliberate engagement with our curated aesthetic.",
      "The personalized and often made-to-order nature of the studio's offerings renders the standard retail return model inapplicable to our service standards.",
    ],
    highlight: "does not accept returns or exchanges",
  },
  {
    id: "04",
    title: "Communication & Support",
    icon: FiMessageSquare,
    paragraphs: [
      "Our team remains at your disposal to clarify any aspects of our acquisition terms or to provide further details on specific pieces prior to purchase.",
    ],
    supportLabel: "WhatsApp Inquiry",
    supportValue: "0813 533 3616",
  },
];

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

export default function ReturnAndRefundPolicyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Acquisition & Returns",
    description:
      "Return and refund policy for Dric Interior covering final sale terms, quality assurance, eligibility, and support.",
    url: toAbsoluteUrl("/return-and-refund-policy"),
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <section className={styles.page}>
        <div className={styles.heroShell}>
          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
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

            <div className={styles.heroMedia}>
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
              {policySections.map((section) => {
                const Icon = section.icon;

                return (
                  <article key={section.id} className={styles.policyCard}>
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
                            <a href="tel:+2348135333616" className={styles.supportValue}>
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
            <FiShield className={styles.standardIcon} aria-hidden="true" />
            <h2 className={styles.standardTitle}>The Dric Standard</h2>
            <p className={styles.standardCopy}>
              Every acquisition is a pact of taste and trust. We thank you for
              your discerning commitment to our philosophy.
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
