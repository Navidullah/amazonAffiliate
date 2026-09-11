import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og/ogCard";

export const alt = "Shopyor HD Background Remover — Free Transparent PNG Maker";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        gradient="linear-gradient(135deg, #083344 0%, #0e7490 45%, #22d3ee 100%)"
        badge="Free · No signup"
        title="HD Background Remover"
        subtitle="Turn any photo into a transparent PNG in seconds"
        tags={["Instant", "HD quality", "No signup"]}
      />
    ),
    { ...size },
  );
}
