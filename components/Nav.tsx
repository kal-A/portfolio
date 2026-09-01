"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Single route-data source consumed by both the desktop link list and the
 * compact menu below — docs/redesign/03-layout-system.md's "Navigation":
 * identity at left, Work/About/Resume at right. "Home" is not a separate
 * item; the identity link covers it. Contact is no longer a route: it lives
 * as the ContactCTA band closing every main page, plus the footer.
 */
const routes = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Route selection closes the menu (covers Link clicks and any
  // programmatic navigation, not just explicit close actions). Adjusting
  // state during render in response to a changed value, per React's
  // documented pattern, rather than an effect — avoids a cascading extra
  // render on every navigation.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Background scroll lock while the modal-style menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus containment: move focus in on open, trap Tab/Shift+Tab at the
  // panel's boundaries, Escape closes and restores focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );

    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const linkFocusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2";

  return (
    <>
      {/* Visible-on-focus skip link, first focusable element on every page.
          sr-only/focus:not-sr-only is the standard Tailwind idiom for this
          exact element — used deliberately, not as a workaround. */}
      <a
        href="#main-content"
        className={`sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-[var(--radius-button)] focus:bg-[var(--color-text)] focus:px-4 focus:py-2 focus:text-[var(--color-bg)] ${linkFocusRing} focus-visible:ring-offset-[var(--color-text)]`}
      >
        Skip to main content
      </a>

      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "var(--color-surface-1)",
          borderColor: "var(--color-line)",
        }}
      >
        <nav aria-label="Primary" className="mx-auto w-full max-w-[1280px] px-[clamp(20px,5vw,80px)] flex items-center justify-between gap-2 py-4">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`shrink-0 rounded-md tracking-tight ${linkFocusRing}`}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h3)",
              color: "var(--color-text)",
            }}
          >
            Kamal Ahsan
          </Link>

          {/* Desktop link list — hidden below the compact breakpoint. */}
          <ul className="hidden sm:flex items-center gap-1">
            {routes.map((route) => {
              const active = isActive(pathname, route.href);
              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center rounded-full px-3.5 py-2 transition-colors duration-[var(--duration-fast)] ${linkFocusRing}`}
                    style={{
                      color: active ? "var(--color-text)" : "var(--color-text-muted)",
                      fontWeight: active ? 600 : 500,
                      background: active ? "var(--color-surface-2)" : "transparent",
                    }}
                  >
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Compact menu trigger — hidden at/above the compact breakpoint. */}
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls="compact-nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`sm:hidden inline-flex items-center justify-center min-w-11 min-h-11 rounded-[var(--radius-button)] ${linkFocusRing}`}
            style={{ color: "var(--color-text)" }}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4l14 14M18 4L4 18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M3 6h16M3 11h16M3 16h16" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Compact modal-style menu. Always in the DOM (so aria-controls has
          a stable target); `inert` when closed removes it from the tab
          order and interaction without extra bookkeeping. Motion is a
          finite opacity/translate transition only, skipped entirely under
          reduced motion, and closing works instantly regardless of whether
          the transition has visually finished. */}
      <div
        id="compact-nav-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`sm:hidden fixed inset-x-0 top-[65px] bottom-0 z-40 transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-enter)] motion-reduce:transition-none ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ background: "var(--color-bg)" }}
      >
        <ul className="flex flex-col p-6 gap-1">
          {routes.map((route) => {
            const active = isActive(pathname, route.href);
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center rounded-[var(--radius-default)] px-4 text-lg ${linkFocusRing}`}
                  style={{
                    color: active ? "var(--color-text)" : "var(--color-text-muted)",
                    fontWeight: active ? 600 : 500,
                    background: active ? "var(--color-surface-1)" : "transparent",
                  }}
                >
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
