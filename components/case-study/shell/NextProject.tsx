import Link from "next/link";
import MediaFrame from "@/components/ui/MediaFrame";

/**
 * docs/redesign/06-component-system.md "Next project": one deliberate
 * next project with a reason to continue and a preview — no carousel,
 * no random recommendation list.
 */
export default function NextProject({
  title,
  reason,
  href,
  media,
}: {
  title: string;
  reason: string;
  href: string;
  media: { src: string; alt: string; position?: string };
}) {
  return (
    <Link href={href} className="group flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="flex-1 min-w-0 order-2 md:order-1">
        <p
          style={{
            fontSize: "var(--text-label)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-text-subtle)",
          }}
        >
          Next project
        </p>
        <h3
          className="mt-2 underline-offset-4 decoration-[var(--color-line-strong)] group-hover:underline"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h2)",
            lineHeight: "var(--leading-h2)",
            color: "var(--color-text)",
          }}
        >
          {title}
        </h3>
        <p className="mt-2" style={{ color: "var(--color-text-muted)", maxWidth: "var(--measure-lead)" }}>
          {reason}
        </p>
      </div>
      <MediaFrame
        src={media.src}
        alt={media.alt}
        objectPosition={media.position}
        sizes="(min-width: 768px) 400px, 100vw"
        className="aspect-[4/3] w-full md:w-[400px] shrink-0 order-1 md:order-2"
      />
    </Link>
  );
}
