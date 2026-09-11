import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og/ogCard";
import { UK_YEAR_6_TOPICS, getTopic } from "@/lib/maths/topics";

export const alt = "Shopyor Year 6 Maths Topic Practice";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return UK_YEAR_6_TOPICS.map((topic) => ({ topic: topic.slug }));
}

export default async function OpengraphImage({ params }) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  const title = topic ? `Year 6 ${topic.title}` : "Year 6 Maths Practice";

  return new ImageResponse(
    (
      <OgCard
        gradient="linear-gradient(135deg, #052e2b 0%, #0f766e 45%, #14b8a6 100%)"
        badge="KS2 · Year 6"
        title={title}
        subtitle="Interactive practice questions with instant feedback and explanations"
        tags={["Free", "No signup", "Instant feedback"]}
      />
    ),
    { ...size },
  );
}
