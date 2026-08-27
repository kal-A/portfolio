import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * docs/redesign/06-component-system.md "Button / text link": one shared
 * action treatment with three variants. Renders a real Next `Link` when
 * `href` is given (navigation) and a real `<button>` otherwise (action) —
 * links navigate, buttons act, never a clickable non-interactive element.
 */
export type ActionVariant = "primary" | "secondary" | "text";

const BASE =
  "inline-flex items-center justify-center gap-2 min-h-11 text-[length:var(--text-body)] font-medium " +
  "transition-[background-color,border-color,color,opacity] duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-40 disabled:pointer-events-none";

const VARIANT_CLASS: Record<ActionVariant, string> = {
  primary:
    "px-5 rounded-[var(--radius-button)] bg-[var(--color-text)] text-[var(--color-bg)] " +
    "hover:opacity-90 active:opacity-80",
  secondary:
    "px-5 rounded-[var(--radius-button)] border border-[var(--color-line-strong)] bg-transparent " +
    "text-[var(--color-text)] hover:border-[var(--color-text)] active:opacity-80",
  text:
    "text-[var(--color-text)] underline underline-offset-4 decoration-[var(--color-line-strong)] " +
    "hover:decoration-[var(--color-text)] active:opacity-80",
};

type ActionProps = {
  variant?: ActionVariant;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>,
  "href" | "className" | "children" | "type"
> & {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  };

export default function Action({
  variant = "primary",
  href,
  type,
  className = "",
  children,
  ...rest
}: ActionProps) {
  const classes = `${BASE} ${VARIANT_CLASS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
