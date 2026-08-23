// app/maths/year-6/[topic]/page.jsx

import { notFound } from "next/navigation";
import TopicQuizExperience from "./TopicQuizExperience";
import { UK_YEAR_6_TOPICS, getTopic } from "@/lib/maths/topics";
import { getAllQuestionsForTopic } from "@/lib/maths/bank";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export function generateStaticParams() {
  return UK_YEAR_6_TOPICS.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};

  const pageUrl = `${BASE_URL}/maths/year-6/${topic.slug}`;
  const title = `Year 6 ${topic.title} Practice | KS2 Maths Challenge | Shopyor`;
  const description = `Practise UK KS2 Year 6 ${topic.title.toLowerCase()} with interactive questions, instant feedback and explanations. ${topic.shortDescription}`;

  return {
    title: { absolute: title },
    description,
    robots: "index, follow",
    category: "education",
    alternates: {
      canonical: pageUrl,
      languages: { "x-default": pageUrl, en: pageUrl, "en-GB": pageUrl },
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "Shopyor",
      locale: "en_GB",
      title,
      description,
      images: [{ url: `${BASE_URL}/images/shopyor-tools-og.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/images/shopyor-tools-og.png`],
    },
  };
}

export default async function TopicQuizPage({ params }) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const pageUrl = `${BASE_URL}/maths/year-6/${topic.slug}`;
  const questionCount = getAllQuestionsForTopic("UK", 6, topic.slug).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        name: `Year 6 ${topic.title} Practice`,
        url: pageUrl,
        description: topic.shortDescription,
        educationalLevel: "Year 6",
        learningResourceType: "Interactive practice questions",
        about: topic.title,
        isPartOf: { "@type": "WebApplication", name: "Maths Challenge", url: `${BASE_URL}/maths` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Maths Challenge", item: `${BASE_URL}/maths` },
          { "@type": "ListItem", position: 3, name: "Year 6", item: `${BASE_URL}/maths/year-6` },
          { "@type": "ListItem", position: 4, name: topic.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <TopicQuizExperience topic={topic} questionCount={questionCount} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
