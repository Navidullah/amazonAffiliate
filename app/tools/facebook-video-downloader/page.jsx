// app/page.jsx
import { Metadata } from "next";

import {
  Download,
  Video,
  Smartphone,
  Globe,
  Shield,
  Zap,
  CheckCircle2,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";
import { VideoDownloader } from "@/app/components/video-downloader/VideoDownloader";
import { FeatureCard } from "@/app/components/featured/FeatureCard";
import { FAQSection } from "@/app/components/faq/FAQsection";

export const metadata = {
  title: "Facebook Video Downloader - Download FB Videos & Reels in HD",
  description:
    "Free Facebook video downloader tool to save any FB video, reel, or story in HD quality. Fast, secure, and works on all devices. No registration required.",
  keywords:
    "facebook video downloader, fb video download, download facebook reels, facebook video saver, fb reel downloader",
  authors: [{ name: "VideoSaver" }],
  openGraph: {
    title:
      "Facebook Video Downloader - Download FB Videos & Reels in HD Quality",
    description:
      "Save any Facebook video or reel in high quality. Free tool that works on desktop and mobile.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "VideoSaver",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Facebook Video Downloader Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Video Downloader - Download FB Videos & Reels",
    description:
      "Free Facebook video downloader tool. Save any FB video or reel in HD quality.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Add to your page.jsx for better rich snippets
const enhancedStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://yourdomain.com/#webpage",
      url: "https://yourdomain.com/",
      name: "Facebook Video Downloader - Download FB Videos & Reels",
      description:
        "Free tool to download Facebook videos and reels in HD quality",
      isPartOf: { "@id": "https://www.shopyor.com/#website" },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.shopyor.com/#website",
      url: "https://www.shopyor.com/",
      name: "Facebook Video Downloader",
      description: "Free Facebook video downloader tool",
      publisher: { "@id": "https://www.shopyor.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://www.shopyor.com/#organization",
      name: "Facebook Video Downloader",
      url: "https://www.shopyor.com/",
      logo: "https://www.shopyor.com/logo.png",
      sameAs: [
        "https://twitter.com/yourhandle",
        "https://facebook.com/yourpage",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.shopyor.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.shopyor.com/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.shopyor.com/#faq",
      mainEntity: faqs.map((faq, index) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-in fade-in slide-in-from-top-4 duration-500">
                <Zap className="h-4 w-4" />
                <span>100% Free • No Registration • Unlimited Downloads</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                Download Facebook
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {" "}
                  Videos & Reels
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Save any Facebook video, reel, or story in HD quality. Works on
                desktop and mobile. Fast, secure, and completely free.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>No Watermark</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>HD Quality</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Fast Download</span>
                </div>
              </div>
            </div>

            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <VideoDownloader />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { label: "Videos Downloaded", value: "2.5M+", icon: Download },
                { label: "Happy Users", value: "500K+", icon: Star },
                { label: "Avg. Download Speed", value: "3s", icon: Clock },
                { label: "Success Rate", value: "99.9%", icon: TrendingUp },
              ].map((stat, idx) => (
                <div key={idx} className="text-center space-y-2">
                  <stat.icon className="mx-auto h-8 w-8 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our Downloader?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The most reliable Facebook video downloader with features you'll
                love
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Video className="h-6 w-6" />}
                title="HD Quality"
                description="Download videos in original quality up to 4K resolution"
              />
              <FeatureCard
                icon={<Smartphone className="h-6 w-6" />}
                title="Mobile Friendly"
                description="Optimized for both Android and iOS devices"
              />
              <FeatureCard
                icon={<Globe className="h-6 w-6" />}
                title="No Limits"
                description="Unlimited downloads with no file size restrictions"
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Secure & Private"
                description="No data storage, your privacy is protected"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground">
                Download any Facebook video in three simple steps
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Copy URL",
                  desc: "Copy the link of any Facebook video or reel you want to download",
                },
                {
                  step: "02",
                  title: "Paste & Analyze",
                  desc: "Paste the link in the box above and click 'Analyze Video'",
                },
                {
                  step: "03",
                  title: "Download",
                  desc: "Select your preferred quality and click download button",
                },
              ].map((item) => (
                <div key={item.step} className="text-center space-y-3">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />
      </main>
    </>
  );
}
