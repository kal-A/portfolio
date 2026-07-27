export interface ProjectTheme {
  /** Card's resting background. */
  bg: string;
  /** Primary color: border, hover glow, bold responsibility tags. */
  accent: string;
  /** Soft tint of accent: muted tool tags. */
  accentSoft: string;
  /** Hover color-wash gradient, pale to rich. */
  fillFrom: string;
  fillTo: string;
  /** Icon badge background (solid or gradient CSS string). */
  iconBg: string;
  /** Fallback initials (used as alt text / non-visual fallback). */
  mark: string;
  image?: string;
}

export const caseStudyTheme: Record<string, ProjectTheme> = {
  roomease: {
    bg: "#f5f1e6",
    accent: "#c9941a",
    accentSoft: "#f7ecd0",
    fillFrom: "#fdf3d9",
    fillTo: "#eab848",
    iconBg: "linear-gradient(135deg, #f0b429, #8a5a0a)",
    mark: "RE",
    image: "/case-studies/roomease/hero.png",
  },
  "hera-fertility": {
    bg: "#e9edf2",
    accent: "#3a6b93",
    accentSoft: "#dbe7f0",
    fillFrom: "#eaf2f8",
    fillTo: "#6fa0c4",
    iconBg: "linear-gradient(135deg, #5a92bf, #1f3a52)",
    mark: "HF",
  },
  greenhouse: {
    bg: "#eef2e2",
    accent: "#2f9e6e",
    accentSoft: "#d8f0e4",
    fillFrom: "#e6f6ee",
    fillTo: "#4bc192",
    iconBg: "linear-gradient(135deg, #3fb37f, #1c5c3f)",
    mark: "GH",
    image: "/case-studies/greenhouse/greenhouse-home-hero.png",
  },
  forcen: {
    bg: "#f5f1ea",
    accent: "#d9871f",
    accentSoft: "#f0e6d5",
    fillFrom: "#fdf1de",
    fillTo: "#eaa64a",
    iconBg: "linear-gradient(135deg, #c9ccd0, #2b2e33)",
    mark: "FN",
    image: "/case-studies/forceN/homepage-hero.png",
  },
  "pill-pal": {
    bg: "#efe9f6",
    accent: "#6a4a99",
    accentSoft: "#e7dff2",
    fillFrom: "#f3eefa",
    fillTo: "#a983d1",
    iconBg: "linear-gradient(135deg, #9b7bc4, #4a2f73)",
    mark: "PP",
  },
  pathpeer: {
    bg: "#fdece0",
    accent: "#c9591a",
    accentSoft: "#f8ddc9",
    fillFrom: "#fdece0",
    fillTo: "#f0a066",
    iconBg: "linear-gradient(135deg, #f0954a, #a3430f)",
    mark: "PA",
    image: "/case-studies/pathpeer/pathpeer-hero-home.png",
  },
  informatica: {
    bg: "#fbeaf0",
    accent: "#b53a63",
    accentSoft: "#f7dbe4",
    fillFrom: "#fbeaf0",
    fillTo: "#d97a9c",
    iconBg: "linear-gradient(135deg, #e08aa8, #7a2846)",
    mark: "IN",
  },
};
