import Reveal from "@/components/Reveal";

/**
 * Token-based replacement for components/case-study/blocks/Chapter.tsx
 * (decision of record, Phase 11): the old component assumed a light page
 * background and a `dark` prop to flip tone per section. The new design
 * system runs every page on one consistent dark field (no alternating
 * light/dark section bands), so that prop is gone — border color is a
 * plain neutral line (`--color-line-strong`), not the project accent:
 * `--color-project-accent` is reserved for exactly one functional use
 * elsewhere on the page (see GreenhouseCaseStudy's doc comment,
 * decision of record 2026-08-25) rather than repeated on every structural
 * divider. Lives under shell/ rather than replacing blocks/Chapter.tsx in place
 * because the other seven case studies still import the original and are
 * not being touched until their own migration phase (06's own migration
 * plan: replace imports page by page, remove the old implementation only
 * once nothing references it).
 */
export default function Chapter({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-col md:flex-row gap-11">
      <div className="md:w-[280px] shrink-0">
        <p
          className="text-6xl md:text-[80px] leading-[0.78]"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text-subtle)" }}
        >
          {num}
        </p>
        <h2
          className="text-3xl md:text-[36px] leading-tight text-balance"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
        >
          {title}
        </h2>
      </div>
      <div
        className="flex-1 min-w-0 border-l-[3px] pl-9 flex flex-col justify-center"
        style={{ borderColor: "var(--color-line-strong)" }}
      >
        {children}
      </div>
    </Reveal>
  );
}
