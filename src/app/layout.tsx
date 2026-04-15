import type { Metadata } from "next";
import { Manrope, Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";

import { SiteChrome } from "@/components/site/SiteChrome";
import { TransitionProvider } from "@/components/site/TransitionProvider";
import { siteUrl } from "@/lib/metadata";
import { getSiteSettings } from "@/lib/site-content";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-meta",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dric Interior",
    template: "%s | Dric Interior",
  },
  description:
    "Luxury interior design studio crafting editorial, highly tailored spaces.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${manrope.variable} ${notoSerif.variable}`}
    >
      <body>
        <TransitionProvider>
          <SiteChrome settings={settings}>{children}</SiteChrome>
        </TransitionProvider>
      </body>
    </html>
  );
}
