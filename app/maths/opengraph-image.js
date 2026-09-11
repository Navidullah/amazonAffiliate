import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og/ogCard";

export const alt = "Shopyor Year 6 Maths Challenge — Free KS2 Practice";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        gradient="linear-gradient(135deg, #052e2b 0%, #0f766e 45%, #14b8a6 100%)"
        badge="15 topics · Instant feedback"
        title="Year 6 Maths Challenge"
        subtitle="Free KS2 maths practice with instant feedback and explanations"
        tags={["Fractions", "Algebra", "Geometry", "100% free"]}
      />
    ),
    { ...size },
  );
}
