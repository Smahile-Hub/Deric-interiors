import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <p>404</p>
        <h1>This page is not part of the studio tour.</h1>
        <span>
          The content may have moved, or the link may no longer be active.
        </span>
        <Link href="/">Return home</Link>
      </div>
    </section>
  );
}
