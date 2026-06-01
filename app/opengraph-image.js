import { ImageResponse } from "next/og";

// Site-wide social share image (1200x630). Applies to every route unless a
// deeper segment defines its own opengraph-image.
export const alt = "Shopyor — Free AI Voice Cloner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0b0614 0%, #1a0b2e 55%, #2a0e3a 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: 360,
            width: 520,
            height: 520,
            display: "flex",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.45), transparent 70%)",
          }}
        />

        {/* badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 28px",
            borderRadius: 9999,
            border: "1px solid rgba(168,85,247,0.5)",
            background: "rgba(168,85,247,0.15)",
            fontSize: 28,
            color: "#d8b4fe",
            marginBottom: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#a855f7",
            }}
          />
          AI Voice Cloning · 100% Free
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          Free AI Voice Cloner
        </div>

        {/* gradient subtitle */}
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 46,
            fontWeight: 700,
            backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Clone any voice in seconds
        </div>

        {/* description */}
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 30,
            color: "#cbd5e1",
            textAlign: "center",
            maxWidth: 860,
          }}
        >
          Upload a short sample, type your text, download natural speech — free.
        </div>

        {/* url */}
        <div
          style={{
            display: "flex",
            marginTop: 60,
            fontSize: 30,
            fontWeight: 600,
            color: "#94a3b8",
          }}
        >
          www.shopyor.com
        </div>
      </div>
    ),
    { ...size }
  );
}
