export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-24">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Kamal Ahsan</p>
        <div className="flex gap-5">
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
      </div>
    </footer>
  );
}
