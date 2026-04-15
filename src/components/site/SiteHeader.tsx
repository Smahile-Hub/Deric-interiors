"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import { TransitionLink } from "./TransitionLink";
import { useState } from "react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import { FiAperture, FiGrid, FiMail, FiMenu, FiPhone, FiShoppingBag, FiX } from "react-icons/fi";

import type { SiteSettings } from "@/types/site";

import styles from "./site.module.css";

type SiteHeaderProps = {
  settings: SiteSettings;
};

const socialIconMap = {
  facebook: FaFacebookF,
  "x-twitter": FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
} as const;

const actionIconMap = {
  aperture: FiAperture,
  grid: FiGrid,
  "shopping-bag": FiShoppingBag,
  mail: FiMail,
  phone: FiPhone,
} as const;

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
            {settings.socialLinks.map((item) => {
              const Icon = item.icon ? socialIconMap[item.icon as keyof typeof socialIconMap] : null;

              return (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  target={item.target}
                  rel={item.target === "_blank" ? "noreferrer" : undefined}
                  aria-label={item.label}
                >
                  {Icon ? <Icon /> : item.label}
                </a>
              );
            })}
          </div>

          <div className={styles.topBarMeta}>
            <a
              href={`mailto:${settings.topBarEmail}`}
              aria-label={`Email us at ${settings.topBarEmail.toLowerCase()}`}
              title={settings.topBarEmail.toLowerCase()}
            >
              <FiMail />
            </a>
            <a
              href={`tel:${settings.topBarPhone.replace(/\s+/g, "")}`}
              aria-label={`Call us at ${settings.topBarPhone}`}
              title={settings.topBarPhone}
            >
              <FiPhone />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.navBar}>
        <div className={styles.navBarInner}>
          <TransitionLink
            href="/"
            className={`${styles.brandLogo} ${isHomePage ? styles.activeBrandLogo : ""}`}
            aria-label={settings.siteTitle}
          >
            <Image
              src={settings.logo.url}
              alt={settings.logo.alt}
              width={settings.logo.width}
              height={settings.logo.height}
              priority
              className={styles.logoImage}
            />
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
              {settings.actionLinks.map((item) => {
                const Icon = item.icon ? actionIconMap[item.icon as keyof typeof actionIconMap] : null;

                return (
                  <TransitionLink key={`${item.label}-${item.href}`} href={item.href} aria-label={item.label}>
                    {Icon ? <Icon /> : item.label}
                  </TransitionLink>
                );
              })}
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
              {settings.socialLinks.map((item) => {
                const Icon = item.icon ? socialIconMap[item.icon as keyof typeof socialIconMap] : null;

                return (
                  <a
                    key={`mobile-${item.label}-${item.href}`}
                    href={item.href}
                    target={item.target}
                    rel={item.target === "_blank" ? "noreferrer" : undefined}
                    aria-label={item.label}
                  >
                    {Icon ? <Icon /> : item.label}
                  </a>
                );
              })}
            </div>
            <a
              href={`mailto:${settings.topBarEmail}`}
              className={styles.mobileMetaLink}
              aria-label={`Email us at ${settings.topBarEmail.toLowerCase()}`}
              title={settings.topBarEmail.toLowerCase()}
            >
              <FiMail /> {settings.topBarEmail.toLowerCase()}
            </a>
            <a
              href={`tel:${settings.topBarPhone.replace(/\s+/g, "")}`}
              className={styles.mobileMetaLink}
              aria-label={`Call us at ${settings.topBarPhone}`}
              title={settings.topBarPhone}
            >
              <FiPhone /> {settings.topBarPhone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
