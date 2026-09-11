import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og/ogCard";

export const alt = "Shopyor EXIF Remover — View & Remove Photo Metadata";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        gradient="linear-gradient(135deg, #022c22 0%, #059669 45%, #34d399 100%)"
        badge="View & remove metadata"
        title="EXIF Remover"
        subtitle="Strip hidden GPS location, camera info, and timestamps from your photos"
        tags={["Private by design", "No signup", "Free"]}
      />
    ),
    { ...size },
  );
}
