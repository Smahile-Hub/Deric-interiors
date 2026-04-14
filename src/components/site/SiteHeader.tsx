"use client";

import { usePathname } from "next/navigation";

import { TransitionLink } from "./TransitionLink";
import { useState } from "react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import { FiAperture, FiGrid, FiMenu, FiShoppingBag, FiX } from "react-icons/fi";

import type { SiteSettings } from "@/types/site";

import styles from "./site.module.css";

type SiteHeaderProps = {
  settings: SiteSettings;
};

export function SiteHeader({ settings }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const hasBlogNavItem = settings.navItems.some((item) => item.href === "/blog");
  const navItems = hasBlogNavItem
    ? settings.navItems
    : (() => {
        const aboutIndex = settings.navItems.findIndex((item) => item.href === "/about");
        const blogItem = { label: "Blog", href: "/blog" };

        if (aboutIndex === -1) {
          return [...settings.navItems, blogItem];
        }

        return [
          ...settings.navItems.slice(0, aboutIndex),
          blogItem,
          ...settings.navItems.slice(aboutIndex),
        ];
      })();

  return (
    <header className={styles.siteHeader}>
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarSocials}>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="X / Twitter"><FaXTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>

          <div className={styles.topBarMeta}>
            <a href={`mailto:${settings.topBarEmail}`}>
              EMAIL: {settings.topBarEmail.toUpperCase()}
            </a>
            <a href={`tel:${settings.topBarPhone.replace(/\s+/g, "")}`}>
              CALL US: {settings.topBarPhone}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.navBar}>
        <div className={styles.navBarInner}>
          <TransitionLink
            href="/"
            className={`${styles.brandWordmark} ${isHomePage ? styles.activeBrandWordmark : ""}`}
          >
            {settings.siteTitle}
          </TransitionLink>

          <nav className={styles.nav} aria-label="Primary">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <TransitionLink
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
                >
                  {item.label}
                </TransitionLink>
              );
            })}
          </nav>

          <div className={styles.headerActions}>
            <div className={styles.actionIcons} aria-label="Action links">
              <TransitionLink href="/projects" aria-label="Projects"><FiAperture /></TransitionLink>
              <TransitionLink href="/services" aria-label="Services"><FiGrid /></TransitionLink>
              <TransitionLink href="/shop" aria-label="Shop"><FiShoppingBag /></TransitionLink>
            </div>

            <TransitionLink href={settings.primaryCta.href} className={styles.primaryButton}>
              {settings.primaryCta.label}
            </TransitionLink>
            
            <button 
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ""}`}>
        <nav className={styles.mobileNav}>
          {navItems.map((item) => {
             const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
             return (
              <TransitionLink
                key={`mobile-${item.label}-${item.href}`}
                href={item.href}
                className={`${styles.mobileNavLink} ${isActive ? styles.activeMobileNavLink : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </TransitionLink>
             );
          })}
          <TransitionLink
            href="/shop"
            className={`${styles.mobileNavLink} ${pathname.startsWith("/shop") ? styles.activeMobileNavLink : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </TransitionLink>
          <TransitionLink
            href={settings.primaryCta.href}
            className={styles.mobilePrimaryButton}
            onClick={() => setMobileMenuOpen(false)}
          >
            {settings.primaryCta.label}
          </TransitionLink>

          <div className={styles.mobileContactInfo}>
            <div className={styles.mobileSocials} aria-label="Social links">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="X / Twitter"><FaXTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
            <a href={`mailto:${settings.topBarEmail}`} className={styles.mobileMetaLink}>
              EMAIL: {settings.topBarEmail.toLowerCase()}
            </a>
            <a href={`tel:${settings.topBarPhone.replace(/\s+/g, "")}`} className={styles.mobileMetaLink}>
              CALL US: {settings.topBarPhone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
