import type { ElementType, ReactNode } from "react";

/**
 * docs/redesign/03-layout-system.md "Containers" table.
 * page: nav/hero/full compositions. standard: most sections. reading:
 * long-form prose. narrow: intros/captions. full: rare atmospheric moments.
 */
export type ContainerVariant = "page" | "standard" | "reading" | "narrow" | "full";

const MAX_WIDTH: Record<ContainerVariant, string | undefined> = {
  page: "1600px",
  standard: "1280px",
  reading: "760px",
  narrow: "600px",
  full: undefined,
};

export default function Container({
  variant = "standard",
  as,
  className = "",
  children,
}: {
  variant?: ContainerVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const As = as ?? "div";
  return (
    <As
      className={`mx-auto w-full px-[clamp(20px,5vw,80px)] ${className}`}
      style={MAX_WIDTH[variant] ? { maxWidth: MAX_WIDTH[variant] } : undefined}
    >
      {children}
    </As>
  );
}
