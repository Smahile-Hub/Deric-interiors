"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import styles from "./transition.module.css";

const ENTER_DURATION = 280;
const LEAVE_DURATION = 340;

type TransitionState = "idle" | "covering" | "covered" | "revealing";

interface TransitionContextValue {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<TransitionState>("idle");

  const prevPathname = useRef(pathname);
  const pendingHref = useRef<string | null>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect when Next.js has actually completed navigation
  useEffect(() => {
    if (
      pathname !== prevPathname.current &&
      pendingHref.current !== null &&
      state === "covered"
    ) {
      prevPathname.current = pathname;
      pendingHref.current = null;

      if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
        fallbackTimer.current = null;
      }

      // Small settle delay so the new page content renders before we reveal
      setTimeout(() => {
        setState("revealing");
        setTimeout(() => setState("idle"), LEAVE_DURATION);
      }, 40);
    } else {
      prevPathname.current = pathname;
    }
  }, [pathname, state]);

  const navigate = useCallback(
    (href: string) => {
      if (state !== "idle") return;

      const hrefPath = href.split("?")[0].split("#")[0] || "/";
      const currentPath = pathname.split("?")[0].split("#")[0] || "/";
      if (hrefPath === currentPath) return;

      pendingHref.current = hrefPath;
      setState("covering");

      setTimeout(() => {
        setState("covered");
        router.push(href);

        // Fallback: reveal after 1.4s regardless, in case pathname never changes
        fallbackTimer.current = setTimeout(() => {
          if (pendingHref.current !== null) {
            pendingHref.current = null;
            setState("revealing");
            setTimeout(() => setState("idle"), LEAVE_DURATION);
          }
        }, 1400);
      }, ENTER_DURATION);
    },
    [pathname, router, state],
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <TransitionOverlay state={state} />
    </TransitionContext.Provider>
  );
}

function TransitionOverlay({ state }: { state: TransitionState }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (state === "covering") {
      // Reset to starting position (below viewport), then animate in
      el.style.transition = "none";
      el.style.transform = "translateY(100%)";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = `transform ${ENTER_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`;
          el.style.transform = "translateY(0)";
        });
      });
    } else if (state === "revealing") {
      // Animate off the top
      requestAnimationFrame(() => {
        el.style.transition = `transform ${LEAVE_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`;
        el.style.transform = "translateY(-100%)";
      });
    } else if (state === "idle") {
      // Snap back below viewport with no transition
      el.style.transition = "none";
      el.style.transform = "translateY(100%)";
    }
    // "covered": already at translateY(0), CSS handles brand mark appearance
  }, [state]);

  return (
    <div
      ref={ref}
      className={styles.overlay}
      data-state={state}
      aria-hidden="true"
      style={{ transform: "translateY(100%)" } as CSSProperties}
    >
      <div className={styles.brand}>
        <span className={styles.brandName}>Dric Interior</span>
        <span className={styles.brandRule} />
      </div>
    </div>
  );
}
