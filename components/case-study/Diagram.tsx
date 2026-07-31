export interface DiagramFigure {
  id: string;
  caption: string;
  evidence: "reconstructed" | "verified";
}

/**
 * Hand-built diagrams, one per figure id. No image files — same approach as
 * ProjectIcon.tsx. Add a case here as each case study's content is written.
 */
function DiagramBody({ id }: { id: string }) {
  switch (id) {
    default:
      return (
        <div className="flex items-center justify-center h-40 rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-400">
          Diagram &ldquo;{id}&rdquo; not built yet
        </div>
      );
  }
}

export default function Diagram({ figure }: { figure: DiagramFigure }) {
  return (
    <figure className="mt-6">
      <div className="rounded-lg border border-neutral-200 bg-white/60 p-4">
        <DiagramBody id={figure.id} />
      </div>
      <figcaption className="mt-2 text-sm text-neutral-500">
        {figure.caption}
        <span className="ml-2 text-xs uppercase tracking-wide text-neutral-400">
          {figure.evidence === "reconstructed" ? "Reconstructed diagram" : "Verified"}
        </span>
      </figcaption>
    </figure>
  );
}
