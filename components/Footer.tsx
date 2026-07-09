"use client";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-24">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <div className="flex flex-wrap items-center gap-5">
          <p>© {new Date().getFullYear()} Kamal Ahsan</p>
          <a
            href="mailto:kamal24.ahsan05@gmail.com"
            className="hover:text-neutral-900 transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/kamal-ahsan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}
