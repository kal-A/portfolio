import type { ReactNode } from "react";

/**
 * docs/redesign/03-layout-system.md "Grid": responsive 4/8/12-column
 * wrapper. Children declare spans with standard Tailwind col-span-*
 * utilities against whichever column count is active at that breakpoint.
 * Gap: 24px compact, 28px medium, 32px large/wide (gap-6/7/8).
 */
export default function Grid({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-6 sm:gap-7 lg:gap-8 ${className}`}>
      {children}
    </div>
  );
}
