import type { ElementType, ReactNode } from "react";

/**
 * docs/redesign/03-layout-system.md "Vertical rhythm" scales, mapped to
 * docs/redesign/06-component-system.md's Stack variant names:
 *   compact -> inline (8-16px, within labels/controls)
 *   content -> component (24-48px, within a narrative unit)
 *   section -> section (72-112px, between related sections)
 *   chapter -> chapter (112-160px, between major story changes)
 */
export type StackVariant = "compact" | "content" | "section" | "chapter";

const GAP: Record<StackVariant, string> = {
  compact: "clamp(8px, 1.5vw, 16px)",
  content: "clamp(24px, 3vw, 48px)",
  section: "var(--space-9)",
  chapter: "var(--space-10)",
};

export default function Stack({
  variant = "content",
  as,
  className = "",
  children,
}: {
  variant?: StackVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const As = as ?? "div";
  return (
    <As className={`flex flex-col ${className}`} style={{ gap: GAP[variant] }}>
      {children}
    </As>
  );
}
