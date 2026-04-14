import { TransitionLink } from "./TransitionLink";

import type { SiteSettings } from "@/types/site";

import styles from "./site.module.css";

type SiteFooterProps = {
  settings: SiteSettings;
};

export function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrandColumn}>
          <h2>{settings.siteTitle}</h2>
          <p>{settings.footerBlurb}</p>

          <div className={styles.footerSocials}>
            {settings.socialLinks.map((item) => (
              <TransitionLink
                key={`${item.label}-${item.href}`}
                href={item.href}
                target={item.target}
              >
                {item.label}
              </TransitionLink>
            ))}
          </div>
        </div>

        {settings.footerColumns.map((column) => (
          <div key={column.title} className={styles.footerColumn}>
            <h3>{column.title}</h3>
            <div className={styles.footerLinks}>
              {column.links.map((item) => (
                <TransitionLink key={`${item.label}-${item.href}`} href={item.href}>
                  {item.label}
                </TransitionLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footerBar}>
        <p>{settings.copyrightText}</p>
      </div>
    </footer>
  );
}
