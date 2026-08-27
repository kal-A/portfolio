import type { Metadata } from "next";
import { Newsreader, Onest } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Phase 2 (02-design-language.md / decision 2, 2026-08-18): display/editorial
// family is Newsreader, body/UI family is Onest. Geist, Geist_Mono,
// DM_Serif_Display, and Caveat are retired — Geist Mono was verified unused
// (no `font-mono`/`--font-geist-mono` consumer anywhere in the codebase
// besides its own now-removed definition); Caveat was the hand-drawn
// Signature component's font and is removed per decision 7 (hero signature
// motif retired). `components/Signature.tsx` was removed in Phase 5 along
// with Marquee.tsx and RotatingWord.tsx (decisions 7-8-10) once the SVG
// contour hero replaced everything they did.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kamal Ahsan · Product & TPM Portfolio",
  description:
    "Product management, product design, and UX/UI work from Kamal Ahsan, Management Engineering, University of Waterloo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${onest.variable} h-full antialiased`}
    >
      {/* Phase 6 (2026-08-19): global shell flipped to --color-bg/--color-text,
          the closing step of Phase 6 per the roadmap. /contact and /resume
          now have real section-level backgrounds and token-based text
          colors (previously the blocker — see docs/redesign/CURRENT-HANDOFF.md's
          Phase 3 and Phase 6 sections), so this is safe. */}
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
      >
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
