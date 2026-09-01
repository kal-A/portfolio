import { ImageResponse } from "next/og";

/**
 * Site-wide link-preview card (iMessage, Slack, Twitter, etc.). Rendered to
 * a static 1200x630 PNG at build time by next/og. Its presence makes every
 * scraper use this card as og:image instead of guessing at the first <img>
 * on the page (which was surfacing the ForceN project thumbnail).
 *
 * Palette matches the site shell: bg --color-bg #0b0c0f, text --color-text
 * #f1e8db, accent --color-accent #c89b62. Fonts fall back to next/og's
 * bundled face; no network font fetch, so the build stays offline-safe.
 */
export const alt = "Kamal Ahsan · Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1100px 700px at 78% 12%, #16181e 0%, #0b0c0f 60%)",
          color: "#f1e8db",
          padding: "84px 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 10,
            color: "#c89b62",
          }}
        >
          PORTFOLIO
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 158, lineHeight: 1 }}>
            Kamal Ahsan
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                width: 72,
                height: 3,
                background: "#c89b62",
                marginRight: 28,
              }}
            />
            <div style={{ display: "flex", fontSize: 36, color: "#b8b1a7" }}>
              Product, design, and technical
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
