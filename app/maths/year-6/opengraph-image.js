import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og/ogCard";

export const alt = "Shopyor Year 6 Maths Topics — 15 KS2 Practice Areas";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        gradient="linear-gradient(135deg, #052e2b 0%, #0f766e 45%, #14b8a6 100%)"
        badge="KS2 · Year 6"
        title="Year 6 Maths Topics"
        subtitle="15 KS2 practice areas, from place value to algebra — free, no signup"
        tags={["Fractions", "Decimals", "Ratio & proportion", "+12 more"]}
      />
    ),
    { ...size },
  );
}
