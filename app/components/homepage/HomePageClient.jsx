// app/page.jsx (Optimized Version)
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ImageIcon,
  Sparkles,
  Shield,
  Scale,
  Link2,
  FileType,
  Wand,
  Youtube,
  FileText,
  Tag,
  File,
  Download,
  TrendingUp,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  Smartphone,
  Monitor,
  Zap,
  Globe,
  Lock,
} from "lucide-react";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import AnimatedHero from "./components/home/AnimatedHero";
import ToolCards from "./components/home/ToolCards";
import Features from "./components/home/Features";
import Faq from "./components/home/Faq";
import { VideoDownloaderDemo } from "./components/home/VideoDownloaderDemo";

/* ================================
   TOOLS DATA (Keep existing + add new)
================================ */
const tools = [
  {
    href: "/tools/facebook-video-downloader",
    title: "Facebook Video Downloader",
    desc: "Download Facebook videos & reels in HD quality. Fast & free.",
    icon: <FaFacebook className="w-6 h-6" />,
    featured: true,
    color: "from-blue-600 to-blue-500",
    downloads: "2.5M+",
  },
  {
    href: "/tools/tiktok-video-downloader",
    title: "TikTok Video Downloader",
    desc: "Save TikTok videos without watermark. Coming Soon!",
    icon: <FaTiktok className="w-6 h-6" />,
    featured: true,
    comingSoon: true,
    color: "from-black to-gray-800",
  },
  {
    title: "Free AI Image Background Remover",
    desc: "Remove image backgrounds instantly with AI precision.",
    href: "/tools/background-remover-image",
    icon: <ImageIcon className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "Online Image Compressor",
    desc: "Compress images without losing visual quality.",
    href: "/tools/image-compressor",
    icon: <Sparkles className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "EXIF Metadata Remover",
    desc: "Remove hidden metadata from images for privacy.",
    href: "/tools/exif-remover",
    icon: <Shield className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "Free BMI Calculator",
    desc: "Calculate your body mass index instantly online.",
    href: "/tools/bmi",
    icon: <Scale className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "Affiliate Link Generator Tool",
    desc: "Create clean and trackable affiliate links easily.",
    href: "/tools/affiliate-link-generator",
    icon: <Link2 className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "PDF to Word Converter Online",
    desc: "Convert PDF files to editable Word documents instantly.",
    href: "/tools/convert-your-pdf-file-to-word",
    icon: <FileType className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "YouTube Thumbnail Downloader",
    desc: "Download high-quality thumbnails from any YouTube video.",
    href: "/tools/youtube-thumbnail",
    icon: <Youtube className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "YouTube Tags Extractor",
    desc: "Extract tags from any YouTube video instantly.",
    href: "/tools/youtube-tags-extractor",
    icon: <Youtube className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "PDF Compressor",
    desc: "Reduce PDF file size quickly using modern compression.",
    href: "/tools/compress-your-pdf-file",
    icon: <FileText className="w-6 h-6" />,
    featured: false,
  },
  {
    href: "/tools/meta-tag-generator",
    title: "Meta Tag Generator Tool for SEO",
    desc: "Meta tags help search engines understand your webpage content.",
    icon: <Tag className="w-6 h-6" />,
    featured: false,
  },
  {
    href: "/tools/robots-txt-generator",
    title: "Robots.txt File Generator for SEO",
    desc: "Robots.txt improves crawl efficiency and overall SEO health.",
    icon: <File className="w-6 h-6" />,
    featured: false,
  },
];

// Featured tools for the hero section
const featuredStats = [
  { label: "Videos Downloaded", value: "2.5M+", icon: Download },
  { label: "Happy Users", value: "500K+", icon: Star },
  { label: "Avg. Download Speed", value: "< 3s", icon: Clock },
  { label: "Success Rate", value: "99.9%", icon: TrendingUp },
];

// Features specific to video downloaders
const videoDownloaderFeatures = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    description: "Download videos in seconds with our optimized servers",
  },
  {
    icon: <Monitor className="h-5 w-5" />,
    title: "HD Quality",
    description: "Save videos in original quality up to 4K resolution",
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "Mobile Friendly",
    description: "Works perfectly on all Android and iOS devices",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "No Limits",
    description: "Unlimited downloads with no file size restrictions",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Privacy Protected",
    description: "We don't store any of your videos or personal data",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "No Registration",
    description: "Use instantly without signing up or logging in",
  },
];

/* ================================
   JSON-LD Structured Data (Enhanced for Video Downloader)
================================ */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Shopyor",
      url: "https://www.shopyor.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.shopyor.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
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
      "@type": "SoftwareApplication",
      name: "Facebook Video Downloader",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web, Android, iOS",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "12500",
      },
      featureList: [
        "Download Facebook videos",
        "Save Facebook Reels",
        "HD quality downloads",
        "No watermark",
        "Mobile compatible",
      ],
    },
    {
      "@type": "ItemList",
      name: "Shopyor â€“ facebook,tiktok & youtube video downloader",
      itemListElement: tools.map((tool, i) => ({
        "@type": "SoftwareApplication",
        position: i + 1,
        name: tool.title,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        url: `https://www.shopyor.com${tool.href}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I download Facebook videos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simply copy the Facebook video URL, paste it in our downloader, click analyze, and choose your preferred quality to download.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download Facebook Reels?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our tool supports both Facebook videos and Reels. Just paste the Reel URL and download instantly.",
          },
        },
        {
          "@type": "Question",
          name: "Is it legal to download Facebook videos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Downloading public Facebook videos for personal use is generally acceptable. However, always respect copyright and content ownership.",
          },
        },
        {
          "@type": "Question",
          name: "Are these tools free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all tools on Shopyor are completely free and require no registration.",
          },
        },
        {
          "@type": "Question",
          name: "Do you store uploaded files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, files are processed securely and are not stored on our servers.",
          },
        },
        {
          "@type": "Question",
          name: "Do these tools work on mobile devices?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all tools are fully responsive and work on mobile, tablet, and desktop devices.",
          },
        },
      ],
    },
  ],
};

/* ================================
   HOME PAGE COMPONENT
================================ */
export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        {/* Enhanced Hero Section with Video Downloader Focus */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

          <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <Sparkles className="h-4 w-4" />
                <span>Most Popular Tool</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Download Facebook Videos &{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Reels Instantly
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Free tool to download any Facebook video or reel in HD quality.
                Works on desktop and mobile. No registration required.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                {featuredStats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Facebook Video Downloader Demo */}
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <VideoDownloaderDemo />
            </div>
          </div>
        </section>

        {/* Coming Soon Section - TikTok & YouTube */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                More Video Downloaders Coming Soon
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're expanding our video downloader tools to support more
                platforms
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* TikTok Card */}
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary/20 to-transparent px-4 py-2 rounded-bl-lg">
                  <span className="text-xs font-medium text-primary">
                    Available
                  </span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-black to-gray-800 text-white">
                      <FaTiktok className="h-8 w-8" />
                    </div>
                    <div>
                      <Link href="/tools/free-tiktok-video-downloader">
                        <h3 className="text-xl font-semibold">
                          TikTok Video Downloader
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground">
                        Save TikTok videos without watermark
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Launched</span>
                    </div>
                    <Button
                      variant="outline"
                      disabled
                      className="cursor-not-allowed"
                    >
                      Try it now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* YouTube Card */}
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary/20 to-transparent px-4 py-2 rounded-bl-lg">
                  <span className="text-xs font-medium text-primary">
                    Coming Soon
                  </span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-red-500 text-white">
                      <SiYoutubemusic className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        YouTube Video Downloader
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Download YouTube videos in multiple qualities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Launching in 3 weeks</span>
                    </div>
                    <Button
                      variant="outline"
                      disabled
                      className="cursor-not-allowed"
                    >
                      Get Notified <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section for Video Downloader */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our Video Downloader?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The most reliable and feature-rich Facebook video downloader
                available
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videoDownloaderFeatures.map((feature, idx) => (
                <Card
                  key={idx}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                How to Download Facebook Videos
              </h2>
              <p className="text-muted-foreground">
                Download any Facebook video in 3 simple steps
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Copy URL",
                  desc: "Open Facebook and copy the URL of the video or reel you want to download",
                  icon: Link2,
                },
                {
                  step: "02",
                  title: "Paste & Analyze",
                  desc: "Paste the link in our downloader and click the analyze button",
                  icon: Play,
                },
                {
                  step: "03",
                  title: "Download",
                  desc: "Choose your preferred quality and click download to save the video",
                  icon: Download,
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="relative mb-6">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent -translate-y-1/2" />
                    )}
                  </div>
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section (Other Tools) */}
        <section id="tools" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">More Free Online Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of free tools for images, PDFs, SEO, and
              more
            </p>
          </div>
          <ToolCards
            tools={tools.filter((t) => !t.featured && !t.comingSoon)}
          />
        </section>

        {/* Content Section for SEO */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Free Facebook Video Downloader & Online Tools
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Shopyor offers a powerful{" "}
              <strong>Facebook video downloader</strong> that lets you save any
              public Facebook video or reel directly to your device. Whether
              you're using an Android phone, iPhone, Windows PC, or Mac, our
              tool works seamlessly across all platforms. Simply paste the
              Facebook video URL, and our system will fetch the highest quality
              version available for download.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Unlike other tools, our Facebook video saver doesn't require any
              software installation or browser extensions. It's completely
              web-based and works instantly. You can download Facebook videos in
              HD quality, save Facebook Reels without watermark, and even
              download videos from private groups (provided you have access to
              them).
            </p>

            <h3 className="text-2xl font-semibold mt-10 mb-4">
              Why Use Shopyor Facebook Video Downloader?
            </h3>

            <ul className="list-disc list-inside text-muted-foreground space-y-3 text-lg">
              <li>100% Free with no hidden charges or premium tiers</li>
              <li>No registration or login required</li>
              <li>Download in original HD quality (up to 4K)</li>
              <li>Works on all devices: Android, iOS, Windows, Mac</li>
              <li>No file size limits or download restrictions</li>
              <li>Fast processing with instant download links</li>
              <li>Privacy-focused - we don't store any videos</li>
            </ul>

            <p className="text-muted-foreground text-lg leading-relaxed mt-8">
              In addition to our Facebook video downloader, Shopyor provides a
              comprehensive suite of free online tools. Use our{" "}
              <Link
                href="/tools/background-remover-image"
                className="text-primary hover:underline"
              >
                AI Image Background Remover
              </Link>{" "}
              to create transparent PNGs, compress images with our{" "}
              <Link
                href="/tools/image-compressor"
                className="text-primary hover:underline"
              >
                Image Compressor
              </Link>
              , convert PDFs to editable Word documents using our{" "}
              <Link
                href="/tools/convert-your-pdf-file-to-word"
                className="text-primary hover:underline"
              >
                PDF to Word Converter
              </Link>
              , and much more.
            </p>

            <h3 className="text-2xl font-semibold mt-10 mb-4">
              Frequently Asked Questions About Facebook Video Downloader
            </h3>

            <div className="space-y-4 mt-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Can I download Facebook Reels?
                </h4>
                <p className="text-muted-foreground">
                  Yes! Our tool supports both Facebook videos and Facebook
                  Reels. Just paste the Reel URL and download instantly.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Is it legal to download Facebook videos?
                </h4>
                <p className="text-muted-foreground">
                  Downloading public Facebook videos for personal use is
                  generally acceptable. However, always respect copyright laws
                  and the content owner's rights. Do not redistribute downloaded
                  videos without permission.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Does this work on mobile phones?
                </h4>
                <p className="text-muted-foreground">
                  Absolutely! Our tool is fully responsive and works perfectly
                  on all smartphones, including Android and iOS devices.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  What video qualities are available?
                </h4>
                <p className="text-muted-foreground">
                  You can download videos in HD (1080p, 720p), SD (480p), and
                  mobile-optimized qualities when available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Download Facebook Videos?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Start using our free Facebook video downloader now. No sign-up
              required, no hidden fees.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link href="/tools/facebook-video-downloader">
                  Try Facebook Video Downloader
                  <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tools">
                  Explore All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <Features />

        {/* FAQ */}
        <Faq />
      </main>
    </>
  );
}
