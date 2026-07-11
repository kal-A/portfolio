export const metadata = { title: "Contact · Kamal Ahsan" };

export default function ContactPage() {
  return (
    <div className="pb-20">
      <div
        className="pt-10 pb-14"
        style={{
          background:
            "radial-gradient(circle at 85% 0%, rgba(200,69,44,0.22) 0%, transparent 50%), linear-gradient(160deg, #fbe9dd 0%, #f0dcc0 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Contact</p>
          <h1 className="font-serif text-5xl mt-3 text-neutral-900">Let&apos;s talk</h1>
          <p className="text-lg text-neutral-600 mt-4 max-w-xl">
            Open to full-time product management, product design, UX/UI, and TPM roles. Reach out
            any time.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 mt-10 space-y-4">
        <a
          href="mailto:kamal24.ahsan05@gmail.com"
          className="group relative flex items-center justify-between rounded-lg px-5 py-4 overflow-hidden"
          style={{ border: "2px solid #181614" }}
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100 bg-rose-50" />
          <span className="relative text-neutral-900 font-medium text-lg">Email</span>
          <span className="relative text-neutral-500 text-sm">kamal24.ahsan05@gmail.com</span>
        </a>
        <a
          href="https://linkedin.com/in/kamal-ahsan"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between rounded-lg px-5 py-4 overflow-hidden"
          style={{ border: "2px solid #181614" }}
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100 bg-rose-50" />
          <span className="relative text-neutral-900 font-medium text-lg">LinkedIn</span>
          <span className="relative text-neutral-500 text-sm">linkedin.com/in/kamal-ahsan</span>
        </a>
        <div
          className="flex items-center justify-between rounded-lg px-5 py-4"
          style={{ border: "2px solid #181614" }}
        >
          <span className="text-neutral-900 font-medium text-lg">Phone</span>
          <span className="text-neutral-500 text-sm">437-345-4113</span>
        </div>
      </div>
    </div>
  );
}
