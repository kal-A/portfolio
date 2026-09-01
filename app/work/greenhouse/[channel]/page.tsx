import { notFound } from "next/navigation";
import Link from "next/link";
import { greenhouseChannels, getChannelGallery } from "@/lib/content/greenhouse-channels";
import ChannelCollage from "@/components/case-study/blocks/ChannelCollage";

const GREEN_VARS = {
  "--cs-wash-from": "#e3f7ec",
  "--cs-wash-to": "#4bc192",
  "--cs-light-from": "#ecfaf1",
  "--cs-light-to": "#bfe8d3",
  "--cs-accent-deep": "#1c5c3f",
  "--cs-accent-wash-rgb": "47, 158, 110",
} as React.CSSProperties;

export function generateStaticParams() {
  return greenhouseChannels.map((c) => ({ channel: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params;
  const gallery = getChannelGallery(channel);
  return { title: gallery ? `${gallery.label} · Greenhouse Juices · Kamal Ahsan` : "Channel" };
}

export default async function GreenhouseChannelPage({
  params,
}: {
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;
  const gallery = getChannelGallery(channel);
  if (!gallery) notFound();

  return (
    <div
      style={{
        ...GREEN_VARS,
        background: `radial-gradient(circle at 14% 10%, ${gallery.tintFrom} 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.05) 0%, transparent 46%), #f6f3e9`,
      }}
      className="pb-24"
    >
      <div className="mx-auto max-w-5xl px-6 pt-8 pb-14">
        <Link href="/work/greenhouse" className="text-sm font-semibold" style={{ color: "var(--ink-soft)" }}>
          ← Back to Greenhouse
        </Link>
        <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: gallery.accent }}>
          Greenhouse Juices
        </p>
        <h1 className="font-serif text-4xl sm:text-[48px] leading-[1.08] mt-3" style={{ color: "var(--ink)" }}>
          {gallery.label}
        </h1>
        <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
          {gallery.intro}
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-6">
        <ChannelCollage assets={gallery.assets} accent={gallery.accent} />
      </div>
    </div>
  );
}
