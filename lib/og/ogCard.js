// Shared visual template for next/og ImageResponse (1200x630 social cards).
// Satori (next/og's renderer) requires `display: "flex"` explicitly on every
// <div>, even single-child/conditionally-rendered ones — it throws otherwise.
export function OgCard({ gradient, badge, title, subtitle, tags }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: gradient,
        color: "#fff",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "72px 80px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 24,
          opacity: 0.85,
          letterSpacing: "0.08em",
          marginBottom: 28,
        }}
      >
        SHOPYOR
      </div>

      {badge && (
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: 10,
            padding: "10px 22px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.16)",
            border: "1px solid rgba(255,255,255,0.3)",
            fontSize: 24,
            marginBottom: 30,
          }}
        >
          {badge}
        </div>
      )}

      <div
        style={{
          display: "flex",
          fontSize: 68,
          fontWeight: 800,
          lineHeight: 1.08,
          maxWidth: 920,
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            opacity: 0.95,
            marginTop: 20,
            maxWidth: 880,
          }}
        >
          {subtitle}
        </div>
      )}

      {tags && tags.length > 0 && (
        <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 22,
                padding: "10px 20px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.28)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 56,
          left: 80,
          fontSize: 26,
          opacity: 0.8,
        }}
      >
        www.shopyor.com
      </div>
    </div>
  );
}

export const OG_SIZE = { width: 1200, height: 630 };
