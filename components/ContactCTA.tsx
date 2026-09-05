import Container from "@/components/layout/Container";

/**
 * End-of-page contact call to action. Replaces the standalone /contact page
 * (which only held the same links the footer already carries) with a
 * prominent closing band placed at the bottom of the main pages - Home,
 * About, Work, Resume - but never on case-study detail pages, which end on
 * their own terms. This is the portfolio-convention pattern: contact lives as
 * a closing CTA plus the persistent footer, not as its own thin route.
 *
 * Server component: the hover fill is pure CSS, so no client boundary is
 * needed. `id="contact"` lets any in-page anchor land here.
 */
const cardBase =
  "group relative flex items-center justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";
const cardStyle = {
  border: "1px solid var(--color-line-strong)",
  borderRadius: "var(--radius-default)",
  padding: "var(--space-4) var(--space-5)",
} as const;
const fillClass =
  "absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-[var(--duration-base)] group-hover:scale-y-100 group-hover:opacity-100";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t"
      style={{ borderColor: "var(--color-line)" }}
    >
      <Container variant="reading" className="py-[clamp(56px,10vh,104px)]">
        <p
          style={{
            fontSize: "var(--text-label)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-accent)",
          }}
        >
          Contact
        </p>
        <h2
          id="contact-heading"
          className="mt-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display-l)",
            lineHeight: "var(--leading-display-l)",
            color: "var(--color-text)",
          }}
        >
          Let&apos;s talk.
        </h2>
        <p
          className="mt-4 max-w-[52ch]"
          style={{
            fontSize: "var(--text-lead)",
            lineHeight: "var(--leading-lead)",
            color: "var(--color-text-muted)",
          }}
        >
          I&apos;m open to full-time product roles: product management, product design, UX, and
          technical product. Email&apos;s the fastest way to reach me.
        </p>

        <div className="mt-8 space-y-4">
          <a href="mailto:kamal24.ahsan05@gmail.com" className={cardBase} style={cardStyle}>
            <span className={fillClass} style={{ background: "var(--color-surface-1)" }} />
            <span className="relative" style={{ color: "var(--color-text)", fontSize: "var(--text-body-l)", fontWeight: 500 }}>
              Email
            </span>
            <span className="relative" style={{ color: "var(--color-text-subtle)", fontSize: "var(--text-small)" }}>
              kamal24.ahsan05@gmail.com
            </span>
          </a>
          <a
            href="https://linkedin.com/in/kamal-ahsan"
            target="_blank"
            rel="noopener noreferrer"
            className={cardBase}
            style={cardStyle}
          >
            <span className={fillClass} style={{ background: "var(--color-surface-1)" }} />
            <span className="relative" style={{ color: "var(--color-text)", fontSize: "var(--text-body-l)", fontWeight: 500 }}>
              LinkedIn
            </span>
            <span className="relative" style={{ color: "var(--color-text-subtle)", fontSize: "var(--text-small)" }}>
              linkedin.com/in/kamal-ahsan
            </span>
          </a>
          <div className="flex items-center justify-between" style={cardStyle}>
            <span style={{ color: "var(--color-text)", fontSize: "var(--text-body-l)", fontWeight: 500 }}>Phone</span>
            <span style={{ color: "var(--color-text-subtle)", fontSize: "var(--text-small)" }}>437-345-4113</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
