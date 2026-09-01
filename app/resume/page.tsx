import Link from "next/link";
import Container from "@/components/layout/Container";
import Action from "@/components/ui/Action";
import ContactCTA from "@/components/ContactCTA";

export const metadata = { title: "Resume · Kamal Ahsan" };

export default function ResumePage() {
  return (
    <div className="pb-20" style={{ background: "var(--color-bg)" }}>
      {/* Explicit section background — previously relied on the (now
          removed) light-mode body background; required before the Phase 3
          body-background flip could safely happen. */}
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
            Resume
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
            The one-page version
          </h1>
          <p className="mt-4" style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--color-text-muted)" }}>
            B.A.Sc. in Honours Management Engineering, University of Waterloo (2026). Looking for
            full-time product roles. The case studies on{" "}
            <Link
              href="/work"
              className="underline underline-offset-4 decoration-[var(--color-line-strong)] hover:decoration-[var(--color-text)]"
              style={{ color: "var(--color-accent)" }}
            >
              Work
            </Link>{" "}
            go deeper on each role.
          </p>

          <Action href="/resume/Kamal-Ahsan-Resume.pdf" download className="mt-8">
            Download PDF ↓
          </Action>

          <div
            className="mt-10 overflow-hidden"
            style={{ border: "1px solid var(--color-line-strong)", borderRadius: "var(--radius-default)" }}
          >
            <object
              data="/resume/Kamal-Ahsan-Resume.pdf"
              type="application/pdf"
              className="w-full h-[720px]"
            >
              <p className="p-6" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
                Your browser can&apos;t display the embedded PDF. Use the download link above instead.
              </p>
            </object>
          </div>
        </Container>
      </div>

      <div className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
        <Container variant="reading" className="space-y-8">
          <div>
            <h2
              className="mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                lineHeight: "var(--leading-h2)",
                color: "var(--color-text)",
              }}
            >
              Education
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              University of Waterloo, B.A.Sc., Honours Management Engineering
            </p>
            <p style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>2021 – 2026</p>
          </div>

          <div>
            <h2
              className="mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                lineHeight: "var(--leading-h2)",
                color: "var(--color-text)",
              }}
            >
              Experience snapshot
            </h2>
            <ul className="space-y-2" style={{ fontSize: "var(--text-body)", color: "var(--color-text-muted)" }}>
              <li>Product Engineer Intern, ForceN (Sep 2025 – Dec 2025)</li>
              <li>Product Designer Intern, Greenhouse Juices (Jan 2025 – Apr 2025)</li>
              <li>Product Operations &amp; UX Research Intern, Informatica (Sep 2023 – Dec 2023)</li>
              <li>Product Design &amp; Marketing Intern, Hera Fertility (Jan 2023 – Apr 2023)</li>
              <li>Product Designer &amp; Developer Intern, PathPeer (May 2022 – Aug 2022)</li>
            </ul>
          </div>

          <p style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
            See{" "}
            <Link
              href="/work"
              className="underline underline-offset-4 decoration-[var(--color-line-strong)] hover:decoration-[var(--color-text)]"
              style={{ color: "var(--color-accent)" }}
            >
              Work
            </Link>{" "}
            for full case-study write-ups on each role and project.
          </p>
        </Container>
      </div>

      <ContactCTA />
    </div>
  );
}
