import MediaFrame from "@/components/ui/MediaFrame";

/**
 * docs/redesign/06-component-system.md "Before / after": side-by-side on
 * large screens, a labeled linear sequence on compact screens. Both
 * states are always visible — no draggable-divider-only comparison.
 */
export default function BeforeAfter({
  before,
  after,
}: {
  before: { src: string; alt: string; label?: string };
  after: { src: string; alt: string; label?: string };
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {[before, after].map((state, i) => (
        <div key={state.src}>
          <p
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--color-text-subtle)",
            }}
          >
            {state.label ?? (i === 0 ? "Before" : "After")}
          </p>
          <MediaFrame src={state.src} alt={state.alt} sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] mt-2" />
        </div>
      ))}
    </div>
  );
}
