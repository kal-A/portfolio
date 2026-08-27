import WorkArchive from "@/components/WorkArchive";
import Container from "@/components/layout/Container";

export const metadata = { title: "Work · Kamal Ahsan" };

export default function WorkIndex() {
  return (
    <div className="pb-20" style={{ background: "var(--color-bg)" }}>
      <div className="pt-10 pb-16">
        <Container variant="standard">
          <p
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            Work
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
            Experience &amp; case studies
          </h1>
          <p
            className="mt-4 max-w-[52ch]"
            style={{
              fontSize: "var(--text-lead)",
              lineHeight: "var(--leading-lead)",
              color: "var(--color-text-muted)",
            }}
          >
            Every internship, capstone, and course project, grouped by what each one
            demonstrates rather than by title or date.
          </p>
        </Container>
      </div>

      <Container variant="standard" className="mt-4">
        <WorkArchive />
      </Container>
    </div>
  );
}
