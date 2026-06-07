import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PDF to Word Converter by Shopyor";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #06b6d4 100%)",
          color: "#fff",
          fontFamily: "Inter, Arial, sans-serif",
          padding: "52px 64px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "62%" }}>
          <div
            style={{
              fontSize: 24,
              opacity: 0.9,
              letterSpacing: "0.04em",
              marginBottom: 18,
            }}
          >
            SHOPYOR
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            PDF to Word
            <br />
            Converter
          </div>
          <div style={{ fontSize: 28, opacity: 0.95 }}>
            Free • Fast • Accurate
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            {["Secure Processing", "Editable DOCX", "No Signup"].map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 20,
                  padding: "10px 16px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.28)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: "32%",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 240,
              height: 290,
              borderRadius: 24,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            PDF
          </div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>↓</div>
          <div
            style={{
              width: 240,
              height: 160,
              borderRadius: 24,
              background: "#ffffff",
              color: "#1d4ed8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 800,
            }}
          >
            DOCX
          </div>
        </div>
      </div>
    ),
    size,
  );
}
