"use client";

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: "linear-gradient(180deg, #fdfaf5 0%, #f7f2e8 100%)",
      }}
    >
      <div
        className="h-[3px] w-full"
        style={{ background: "linear-gradient(90deg, #c8452c, #eaa64a 45%, #2c6e5e 100%)" }}
      />
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <div className="flex flex-wrap items-center gap-5">
          <p>© {new Date().getFullYear()} Kamal Ahsan</p>
          <a
            href="mailto:kamal24.ahsan05@gmail.com"
            className="rounded-full px-1 -mx-1 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/kamal-ahsan"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-1 -mx-1 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="w-9 h-9 rounded-full border border-neutral-300 bg-white/70 flex items-center justify-center shadow-sm hover:border-neutral-900 hover:text-neutral-900 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition-all duration-150"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}
