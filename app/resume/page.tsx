export const metadata = { title: "Resume · Kamal Ahsan" };

export default function ResumePage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-3xl px-6 pt-10">
        <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Resume</p>
        <h1 className="font-serif text-5xl mt-3 text-neutral-900">Resume</h1>
        <p className="text-lg text-neutral-600 mt-4">
          B.A.Sc. in Honours Management Engineering, University of Waterloo (2026). Looking for
          full-time product roles.
        </p>

        <a
          href="/resume/Kamal-Ahsan-Resume.pdf"
          download
          className="inline-block mt-8 bg-neutral-900 text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-neutral-700 transition-colors"
        >
          Download PDF ↓
        </a>

        <div className="mt-10 rounded-xl overflow-hidden" style={{ border: "2px solid #181614" }}>
          <object
            data="/resume/Kamal-Ahsan-Resume.pdf"
            type="application/pdf"
            className="w-full h-[720px]"
          >
            <p className="p-6 text-sm text-neutral-500">
              Your browser can&apos;t display the embedded PDF. Use the download link above instead.
            </p>
          </object>
        </div>
      </div>

      <div
        className="mt-14 py-14"
        style={{ background: "linear-gradient(160deg, #eaf3de 0%, #e9f1f8 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-6 space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-neutral-900 mb-2">Education</h2>
            <p className="text-neutral-700">
              University of Waterloo, B.A.Sc., Honours Management Engineering
            </p>
            <p className="text-sm text-neutral-600">2021 – 2026</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-neutral-900 mb-3">Experience Snapshot</h2>
            <ul className="space-y-2 text-neutral-700 text-sm">
              <li>Product Engineer Intern, ForceN (Sep 2025 – Dec 2025)</li>
              <li>Product Designer Intern, Greenhouse Juices (Jan 2025 – Apr 2025)</li>
              <li>Product Operations & UX Research Intern, Informatica (Sep 2023 – Dec 2023)</li>
              <li>Product Design & Marketing Intern, Hera Fertility (Jan 2023 – Apr 2023)</li>
              <li>Product Designer & Developer Intern, PathPeer (May 2022 – Aug 2022)</li>
            </ul>
          </div>

          <p className="text-sm text-neutral-600">
            See the <a href="/experience" className="text-rose-600 hover:text-rose-700 font-medium">Experience</a>{" "}
            page for full bullet detail, or the <a href="/work" className="text-rose-600 hover:text-rose-700 font-medium">Case Studies</a> for in-depth project write-ups.
          </p>
        </div>
      </div>
    </div>
  );
}
