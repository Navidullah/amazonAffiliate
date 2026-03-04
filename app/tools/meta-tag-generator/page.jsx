import MetaTagGeneratorClient from "./MetaTagGeneratorClient";

export const metadata = {
  title: "Free Meta Tag Generator (SEO, Open Graph & Twitter Cards)",
  description:
    "Generate SEO meta tags, Open Graph tags and Twitter Card meta tags instantly. Free online meta tag generator tool for developers, bloggers and businesses.",
  keywords: [
    "meta tag generator",
    "seo meta tags",
    "open graph generator",
    "twitter card generator",
    "meta description generator",
    "free seo tools",
  ],
  openGraph: {
    title: "Free Meta Tag Generator Tool",
    description:
      "Create SEO meta tags, Open Graph & Twitter Cards instantly. 100% free online tool.",
    url: "https://www.shopyor.com/tools/meta-tag-generator",
    siteName: "Shopyor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Tag Generator Tool",
    description:
      "Generate SEO meta tags, Open Graph and Twitter Card tags instantly.",
  },
  alternates: {
    canonical: "https://www.shopyor.com/tools/meta-tag-generator",
  },
};

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">Free Meta Tag Generator Tool</h1>

      <p className="text-muted-foreground mb-8">
        Generate SEO meta tags, Open Graph tags and Twitter Card tags instantly.
        This free meta tag generator helps developers, bloggers and businesses
        optimize their websites for search engines and social media sharing.
      </p>

      <MetaTagGeneratorClient />

      {/* SEO Content Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Use a Meta Tag Generator?
        </h2>
        <p>
          Meta tags help search engines understand your webpage content.
          Properly optimized title tags and meta descriptions improve
          click-through rates and search visibility.
        </p>

        <h2 className="text-2xl font-semibold">
          What Tags Does This Tool Generate?
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>SEO Title Tag</li>
          <li>Meta Description</li>
          <li>Meta Keywords</li>
          <li>Robots Tag</li>
          <li>Open Graph (Facebook)</li>
          <li>Twitter Card Tags</li>
        </ul>
      </div>
    </div>
  );
}
