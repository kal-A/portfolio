export const metadata = { title: "Contact — Kamal Ahsan" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Contact</p>
      <h1 className="font-serif text-4xl mt-3 text-neutral-900">Let&apos;s talk</h1>
      <p className="text-neutral-600 mt-4 max-w-xl">
        Open to product management, product design, UX/UI, and TPM roles. Reach out any time.
      </p>

      <div className="mt-10 space-y-4">
        <a
          href="mailto:kamal24.ahsan05@gmail.com"
          className="flex items-center justify-between border border-neutral-200 rounded-lg px-5 py-4 hover:border-neutral-400 transition-colors"
        >
          <span className="text-neutral-900 font-medium">Email</span>
          <span className="text-neutral-500 text-sm">kamal24.ahsan05@gmail.com</span>
        </a>
        <a
          href="https://linkedin.com/in/kamal-ahsan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border border-neutral-200 rounded-lg px-5 py-4 hover:border-neutral-400 transition-colors"
        >
          <span className="text-neutral-900 font-medium">LinkedIn</span>
          <span className="text-neutral-500 text-sm">linkedin.com/in/kamal-ahsan</span>
        </a>
        <div className="flex items-center justify-between border border-neutral-200 rounded-lg px-5 py-4">
          <span className="text-neutral-900 font-medium">Phone</span>
          <span className="text-neutral-500 text-sm">437-345-4113</span>
        </div>
      </div>
    </div>
  );
}
