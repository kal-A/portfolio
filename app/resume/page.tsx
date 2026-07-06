export const metadata = { title: "Resume — Kamal Ahsan" };

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Resume</p>
      <h1 className="font-serif text-4xl mt-3 text-neutral-900">Resume</h1>
      <p className="text-neutral-600 mt-4">
        Bachelor of Applied Science in Honours Management Engineering, University of
        Waterloo (Sep 2021 – May 2026).
      </p>

      <a
        href="/resume/Kamal-Ahsan-Resume.pdf"
        download
        className="inline-block mt-8 bg-neutral-900 text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-neutral-700 transition-colors"
      >
        Download PDF ↓
      </a>

      <div className="mt-14 space-y-8">
        <div>
          <h2 className="font-serif text-xl text-neutral-900 mb-2">Education</h2>
          <p className="text-neutral-700">
            University of Waterloo — B.A.Sc., Honours Management Engineering
          </p>
          <p className="text-sm text-neutral-500">Sep 2021 – May 2026</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-neutral-900 mb-3">Experience Snapshot</h2>
          <ul className="space-y-2 text-neutral-700 text-sm">
            <li>Product Engineer Intern — ForceN (Sep 2025 – Dec 2025)</li>
            <li>Product Designer Intern — Greenhouse Juices (Jan 2025 – Apr 2025)</li>
            <li>Product Operations & UX Research Intern — Informatica (Sep 2023 – Dec 2023)</li>
            <li>Product Design & Marketing Intern — Hera Fertility (Jan 2023 – Apr 2023)</li>
            <li>Product Designer & Developer Intern — PathPeer (May 2022 – Aug 2022)</li>
          </ul>
        </div>

        <p className="text-sm text-neutral-500">
          See the <a href="/experience" className="text-rose-500 hover:text-rose-600">Experience</a>{" "}
          page for full bullet detail, or the <a href="/work" className="text-rose-500 hover:text-rose-600">Case Studies</a> for in-depth project write-ups.
        </p>
      </div>
    </div>
  );
}
