"use client";

import Action from "@/components/ui/Action";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div
        className="mx-auto w-full max-w-[1280px] px-[clamp(20px,5vw,80px)] flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-6)" }}
      >
        <div className="flex flex-wrap items-center gap-5" style={{ color: "var(--color-text-muted)" }}>
          <p>&copy; {new Date().getFullYear()} Kamal Ahsan</p>
          <Action variant="text" href="mailto:kamal24.ahsan05@gmail.com">
            Email
          </Action>
          <Action
            variant="text"
            href="https://linkedin.com/in/kamal-ahsan"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Action>
        </div>
        <Action
          variant="secondary"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="min-w-11 !rounded-full !px-0"
        >
          <span aria-hidden="true">↑</span>
        </Action>
      </div>
    </footer>
  );
}
