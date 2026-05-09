import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "Komal Fareed | Scientific Research & Academic Writing Portfolio",
  description:
    "Komal Fareed is an MPhil Chemistry graduate offering thesis writing, scientific writing, chemistry research, technical documentation, and academic assistance services.",

  keywords: [
    "MPhil Chemistry",
    "scientific writer",
    "chemistry thesis writing",
    "research paper writing",
    "technical writing",
    "scientific documentation",
    "academic writing services",
    "chemistry research assistance",
    "thesis formatting",
    "scientific reports",
    "research methodology",
    "Pakistan scientific writer",
    "Komal Fareed",
  ],

  alternates: {
    canonical: "https://www.shopyor.com/portfolio",
  },

  openGraph: {
    title: "Komal Fareed | Scientific Research & Academic Writing Portfolio",
    description:
      "Professional chemistry research, thesis writing, scientific documentation and academic writing services.",
    url: "https://www.shopyor.com/portfolio",
    siteName: "Shopyor",
    images: [
      {
        url: "/komal.jpeg",
        width: 1200,
        height: 630,
        alt: "Komal Fareed Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Komal Fareed | Scientific Researcher & Academic Writer",
    description:
      "Professional chemistry research and Scientific & Academic writing services.",
    images: ["/komal.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Komal Fareed",
  jobTitle: "Scientific Writer & Chemistry Researcher",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Peshawar",
  },
  url: "https://www.shopyor.com/portfolio",
  image: "https://www.shopyor.com/komal.jpeg",
  sameAs: ["https://www.facebook.com/share/1EbXHqfin4/"],
  knowsAbout: [
    "Chemistry",
    "Scientific Writing",
    "Research Papers",
    "Technical Documentation",
    "Academic Writing",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <PortfolioClient />
    </>
  );
}
