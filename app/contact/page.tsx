import Container from "@/components/layout/Container";

export const metadata = { title: "Contact · Kamal Ahsan" };

export default function ContactPage() {
  return (
    <div className="pb-20" style={{ background: "var(--color-bg)" }}>
      <div className="pt-10 pb-14">
        <Container variant="reading">
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
          <h1
            className="mt-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display-l)",
              lineHeight: "var(--leading-display-l)",
              color: "var(--color-text)",
            }}
          >
            Let&apos;s talk
          </h1>
          <p
            className="mt-4 max-w-[52ch]"
            style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--color-text-muted)" }}
          >
            Open to full-time product management, product design, UX/UI, and TPM roles. Reach out
            any time.
          </p>
        </Container>
      </div>

      {/* Explicit section background — previously relied on the (now
          removed) light-mode body background; required before the Phase 3
          body-background flip could safely happen. */}
      <div className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
        <Container variant="reading" className="space-y-4">
          <a
            href="mailto:kamal24.ahsan05@gmail.com"
            className="group relative flex items-center justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
            style={{
              border: "1px solid var(--color-line-strong)",
              borderRadius: "var(--radius-default)",
              padding: "var(--space-4) var(--space-5)",
            }}
          >
            <span
              className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-[var(--duration-base)] group-hover:scale-y-100 group-hover:opacity-100"
              style={{ background: "var(--color-surface-1)" }}
            />
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
            className="group relative flex items-center justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
            style={{
              border: "1px solid var(--color-line-strong)",
              borderRadius: "var(--radius-default)",
              padding: "var(--space-4) var(--space-5)",
            }}
          >
            <span
              className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-[var(--duration-base)] group-hover:scale-y-100 group-hover:opacity-100"
              style={{ background: "var(--color-surface-1)" }}
            />
            <span className="relative" style={{ color: "var(--color-text)", fontSize: "var(--text-body-l)", fontWeight: 500 }}>
              LinkedIn
            </span>
            <span className="relative" style={{ color: "var(--color-text-subtle)", fontSize: "var(--text-small)" }}>
              linkedin.com/in/kamal-ahsan
            </span>
          </a>
          <div
            className="flex items-center justify-between"
            style={{
              border: "1px solid var(--color-line-strong)",
              borderRadius: "var(--radius-default)",
              padding: "var(--space-4) var(--space-5)",
            }}
          >
            <span style={{ color: "var(--color-text)", fontSize: "var(--text-body-l)", fontWeight: 500 }}>Phone</span>
            <span style={{ color: "var(--color-text-subtle)", fontSize: "var(--text-small)" }}>437-345-4113</span>
          </div>
        </Container>
      </div>
    </div>
  );
}
