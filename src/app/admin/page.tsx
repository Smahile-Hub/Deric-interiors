import Link from "next/link";

import { editableAdminSections } from "@/lib/editable-content";

import styles from "./admin.module.css";

export default function AdminDashboardPage() {
  return (
    <div className={styles.adminPage}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Content Admin</p>
          <h1 className={styles.title}>Choose a page to edit</h1>
          <p className={styles.description}>
            Update page copy, image URLs, icon choices, button labels, and links
            without touching the public layout or SEO routes.
          </p>
        </header>

        <section className={styles.cardGrid}>
          {editableAdminSections.map((section) => (
            <Link key={section.key} href={section.route} className={styles.card}>
              <div>
                <p className={styles.cardEyebrow}>Editable Section</p>
                <h2 className={styles.cardTitle}>{section.title}</h2>
                <p className={styles.cardCopy}>{section.description}</p>
              </div>
              <span className={styles.cardLink}>Open editor</span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
