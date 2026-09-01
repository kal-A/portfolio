const paths: Record<string, React.ReactNode> = {
  chronicle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5l2 3.3-2 1.4-2-1.4z" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </>
  ),
  roomease: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
      <circle cx="8.5" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  forcen: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v2.6M12 18.9v2.6M4.2 6.3l2 1.5M17.8 16.2l2 1.5M2.5 12h2.6M18.9 12h2.6M4.2 17.7l2-1.5M17.8 7.8l2-1.5M6.3 4.2l1.5 2M16.2 17.8l1.5 2M4.2 6.3l1.5-2M17.8 16.2l1.5-2" />
    </>
  ),
  greenhouse: (
    <>
      <path d="M5 8l1.5-4h11L19 8" />
      <rect x="5" y="8" width="14" height="12" rx="1" />
      <path d="M9 20v-6M15 20v-6M9 14l3-2.5 3 2.5" />
    </>
  ),
  "hera-fertility": (
    <>
      <rect x="2.5" y="6" width="19" height="13" rx="2" />
      <path d="M2.5 10h19" />
      <path d="M6 14.5h4" />
    </>
  ),
  pathpeer: (
    <>
      <circle cx="6" cy="7" r="2.3" />
      <circle cx="18" cy="17" r="2.3" />
      <path d="M6 9.3v3a3 3 0 0 0 3 3h1.5M18 14.7v-3a3 3 0 0 0-3-3h-1.5" />
    </>
  ),
  "pill-pal": (
    <>
      <rect x="3.5" y="9" width="17" height="8" rx="4" transform="rotate(-30 12 13)" />
      <path d="M9.3 9.9l4.4 6.2" transform="rotate(-30 12 13)" />
    </>
  ),
  informatica: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
      <path d="M8 11.5l1.8-2.2 1.5 1.4 2-2.6" />
    </>
  ),
};

export default function ProjectIcon({
  slug,
  className,
  style,
}: {
  slug: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const path = paths[slug];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {path}
    </svg>
  );
}
