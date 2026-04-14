"use client";

import type { LinkProps } from "next/link";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

import { usePageTransition } from "./TransitionProvider";

type TransitionLinkProps = {
  href: LinkProps["href"];
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  target?: string;
  onClick?: () => void;
};

export function TransitionLink({
  href,
  children,
  target,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const hrefStr = typeof href === "string" ? href : (href.pathname ?? "/");
  const isExternal =
    hrefStr.startsWith("http") ||
    hrefStr.startsWith("//") ||
    hrefStr.startsWith("mailto:") ||
    hrefStr.startsWith("tel:");

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle external links, new-tab modifiers, or _blank targets
    if (
      isExternal ||
      target === "_blank" ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      onClick?.();
      return;
    }

    e.preventDefault();
    onClick?.();
    navigate(hrefStr);
  };

  return (
    <Link href={href} target={target} {...rest} onClick={handleClick}>
      {children}
    </Link>
  );
}
