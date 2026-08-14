import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/actions/products";
import { getCategoryLabel, getRegionLabel } from "@/lib/constants/productCategories";

const size = { width: 1200, height: 630 };

const REGION_ACCENT = {
  uk: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 45%, #ec4899 100%)",
  us: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #06b6d4 100%)",
  ca: "linear-gradient(135deg, #1a1a2e 0%, #7f1d1d 45%, #f97316 100%)",
};

export async function GET(_req, { params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return new Response("Not found", { status: 404 });
  }

  const background = REGION_ACCENT[product.region] || REGION_ACCENT.uk;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background,
          color: "#fff",
          fontFamily: "Inter, Arial, sans-serif",
          padding: "56px 64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, opacity: 0.85, letterSpacing: "0.04em" }}>
            SHOPYOR WORKSHEETS
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 22,
            }}
          >
            {[getRegionLabel(product.region), getCategoryLabel(product.category), product.gradeLevel].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    fontSize: 22,
                    padding: "8px 18px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.18)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {item}
                </div>
              ),
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.15,
              marginTop: 32,
              maxWidth: "85%",
            }}
          >
            {product.title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 20,
              background: "#ffffff",
              color: "#1e1b4b",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            PDF
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            Printable worksheet pack · ${product.price} one-time
          </div>
        </div>
      </div>
    ),
    size,
  );
}
