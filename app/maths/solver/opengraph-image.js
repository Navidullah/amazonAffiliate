import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og/ogCard";

export const alt = "Shopyor AI Math Solver — Algebra, Equations & Calculus";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        gradient="linear-gradient(135deg, #1e1b4b 0%, #4338ca 45%, #6366f1 100%)"
        badge="Step-by-step solutions"
        title="AI Math Solver"
        subtitle="Algebra, equations & calculus — solved with real explanations, not just answers"
        tags={["Concept teaching", "Instant results", "1 free/day"]}
      />
    ),
    { ...size },
  );
}
