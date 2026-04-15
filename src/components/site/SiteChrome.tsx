"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import type { SiteSettings } from "@/types/site";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type SiteChromeProps = {
  settings: SiteSettings;
  children: ReactNode;
};

export function SiteChrome({ settings, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? null : <SiteHeader settings={settings} />}
      <main>{children}</main>
      {isAdminRoute ? null : <SiteFooter settings={settings} />}
    </>
  );
}
