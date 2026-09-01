import Grid from "@/components/layout/Grid";

/**
 * docs/redesign/07-case-study-system.md section 2 ("Executive summary"):
 * 3-5 short labeled blocks, the five-minute reviewer's map — not a
 * duplicate introduction. Also the generic replacement for every bespoke
 * "at a glance" fact grid (role/scope/channels/tools, challenge/
 * contribution/outcome, etc.) that used to be a one-off SnapshotGrid of
 * cs-box cards per case study. No card by default, per 06's Metric rule
 * ("no card by default") applied here too — plain label/value pairs
 * separated by a hairline rule, not bordered boxes.
 *
 * Every item renders at the same size/weight with the same neutral
 * hairline rule (decision of record, 2026-08-25 — a prior "first item
 * leads" pass was rejected as arbitrary; see Metric.tsx's doc comment for
 * the same reversal and its reasoning). Each block still washes with a
 * faint surface tint on hover — not a claim that it's clickable (nothing
 * happens), just the same tactile "this was actually crafted" feedback
 * the rest of the page's real controls give, so a static fact grid
 * doesn't feel inert next to them.
 *
 * Item count varies per case study (role/scope/channels plus optional
 * skills/tools), so a fixed 4-per-row grid can leave a trailing row with
 * a single orphaned item and a wide dead gap beside it — a real bug, not
 * intentional negative space (caught on Greenhouse, which has 5 items).
 * The last incomplete row's item(s) stretch to fill the row instead —
 * still the same label/value treatment, just wider, so it reads as a
 * deliberate closing note rather than a layout leftover.
 */
export default function CaseStudySnapshot({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  const total = items.length;
  const lgRemainder = total % 4;
  const smOrphan = total % 2 === 1;

  return (
    <Grid>
      {items.map((item, i) => {
        const fromEnd = total - i;
        let lgSpan = "lg:col-span-3";
        if (lgRemainder === 1 && fromEnd === 1) lgSpan = "lg:col-span-12";
        else if (lgRemainder === 2 && fromEnd <= 2) lgSpan = "lg:col-span-6";
        else if (lgRemainder === 3 && fromEnd <= 3) lgSpan = "lg:col-span-4";

        const smSpan = smOrphan && fromEnd === 1 ? "sm:col-span-8" : "sm:col-span-4";

        return (
          <div
            key={item.label}
            className={`col-span-4 ${smSpan} ${lgSpan} -mx-3 px-3 pt-4 pb-4 rounded-[var(--radius-default)] transition-colors hover:bg-[var(--color-surface-2)]`}
            style={{ borderTop: "1px solid var(--color-line)", transitionDuration: "var(--duration-base)" }}
          >
            <p
              style={{
                fontSize: "var(--text-label)",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--color-text-subtle)",
              }}
            >
              {item.label}
            </p>
            <p className="mt-2" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
              {item.value}
            </p>
          </div>
        );
      })}
    </Grid>
  );
}
