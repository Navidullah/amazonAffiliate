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
} from "lucide-react";
import AnimatedHero from "./components/home/AnimatedHero";
import ToolCards from "./components/home/ToolCards";
import Features from "./components/home/Features";
import Faq from "./components/home/Faq";

/* ================================
   TOOLS DATA
================================ */
const tools = [
  {
    title: "Free AI Image Background Remover",
    desc: "Remove image backgrounds instantly with AI precision.",
    href: "/tools/background-remover-image",
    icon: <ImageIcon className="w-6 h-6" />,
  },
  {
    href: "/tools/image-resizer",
    title: "Online Image resizer",
    desc: "Reduce or resize the sie of images without losing visual quality.",
    icon: <ImageIcon className="w-6 h-6" />,
  },
  {
    title: "HD Background Remover (High Quality)",
    desc: "Get clean, transparent PNG images in high resolution.",
    href: "/tools/bg-remover",
    icon: <ImageIcon className="w-6 h-6" />,
  },
  {
    title: "Online Image Compressor",
    desc: "Compress images without losing visual quality.",
    href: "/tools/image-compressor",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "EXIF Metadata Remover",
    desc: "Remove hidden metadata from images for privacy.",
    href: "/tools/exif-remover",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Free BMI Calculator",
    desc: "Calculate your body mass index instantly online.",
    href: "/tools/bmi",
    icon: <Scale className="w-6 h-6" />,
  },
  {
    title: "Affiliate Link Generator Tool",
    desc: "Create clean and trackable affiliate links easily.",
    href: "/tools/affiliate-link-generator",
    icon: <Link2 className="w-6 h-6" />,
  },
  {
    title: "PDF to Word Converter Online",
    desc: "Convert PDF files to editable Word documents instantly.",
    href: "/tools/pdf-to-word",
    icon: <FileType className="w-6 h-6" />,
  },
  {
    title: "YouTube Thumbnail Downloader",
    desc: "Download high-quality thumbnails from any YouTube video.",
    href: "/tools/youtube-thumbnail",
    icon: <Youtube className="w-6 h-6" />,
  },
  {
    title: "YouTube Tags Extractor",
    desc: "Extract tags from any YouTube video instantly.",
    href: "/tools/youtube-tags",
    icon: <Youtube className="w-6 h-6" />,
  },
  {
    title: "PDF Compressor (Node.js)",
    desc: "Reduce PDF file size quickly using modern compression.",
    href: "/tools/pdf-compress",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "PDF Compressor (Python API)",
    desc: "Compress PDF files securely with advanced API processing.",
    href: "/tools/pdf-compressor",
    icon: <FileText className="w-6 h-6" />,
  },

  {
    href: "/tools/meta-tag-generator",
    title: "Meta Tag Generator Tool for SEO",
    desc: "Meta tags help search engines understand your webpage content.",
    icon: <Tag className="w-6 h-6" />,
  },
  {
    href: "/tools/robots-txt-generator",
    title: "Robots.txt File Generator for SEO",
    desc: "Robots.txt improves crawl efficiency and overall SEO health.",
    icon: <File className="w-6 h-6" />,
  },
];
/* Meta data */
export const metadata = {
  title: "Shopyor – Free Image, PDF, SEO & YouTube Tools Online",
  description:
    "Free online tools like background remover, SEO tools ,image compressor, PDF to Word converter, YouTube thumbnail downloader and more. Fast, secure & browser-based.",
  keywords: [
    "free online tools",
    "image background remover",
    "image compressor",
    "pdf to word converter",
    "youtube thumbnail downloader",
    "pdf compressor",
    "Image resizer",
    "Robots.txt generator",
    "Meta Tag generator",
  ],
};

/* ================================
   JSON-LD Structured Data
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
      "@type": "ItemList",
      name: "Shopyor – Free Image, PDF,SEO & YouTube Tools",
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

      <main>
        {/* HERO */}
        <AnimatedHero />

        {/* TOOLS */}
        <section id="tools" className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">
            Free Online Image, PDF & YouTube Tools
          </h2>
          <ToolCards tools={tools} />
        </section>
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Free Online Tools for Images, PDFs & YouTube
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Shopyor is a modern collection of free online tools designed to
            simplify digital tasks. Use our{" "}
            <Link
              href="/tools/background-remover-image"
              className="text-blue-600 underline"
            >
              AI Image Background Remover
            </Link>{" "}
            to remove backgrounds instantly, compress files with our{" "}
            <Link
              href="/tools/image-compressor"
              className="text-blue-600 underline"
            >
              Image Compressor
            </Link>
            , convert documents using our{" "}
            <Link href="/tools/pdf-to-word" className="text-blue-600 underline">
              PDF to Word Converter
            </Link>
            , or download thumbnails with the{" "}
            <Link
              href="/tools/youtube-thumbnail"
              className="text-blue-600 underline"
            >
              YouTube Thumbnail Downloader
            </Link>
            , or download the youtube video tags using our{" "}
            <Link
              href="/tools/youtube-tags"
              className="text-blue-600 underline"
            >
              Youtube Tags Extractor
            </Link>
            , or you can compress the PDF file using our{" "}
            <Link
              href="/tools/pdf-compress"
              className="text-blue-600 underline"
            >
              PDF Compressor
            </Link>
            , or you can Calculate the BMI using our{" "}
            <Link href="/tools/bmi" className="text-blue-600 underline">
              BMI Calculator
            </Link>
            , or you can the EXIF data of file using our{" "}
            <Link
              href="/tools/exif-remover"
              className="text-blue-600 underline"
            >
              EXIF Remover
            </Link>
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            All tools run directly in your browser. No downloads, no
            installations, and no registration required. Simply upload your
            file, process it instantly, and download the optimized result within
            seconds.
          </p>

          <h3 className="text-2xl font-semibold mt-10 mb-4">
            Why Choose Shopyor?
          </h3>

          <ul className="list-disc list-inside text-muted-foreground space-y-3 text-lg">
            <li>100% Free and easy to use</li>
            <li>AI-powered image processing</li>
            <li>Secure and privacy-focused system</li>
            <li>Mobile and desktop compatible</li>
            <li>Fast processing with high-quality results</li>
          </ul>

          <p className="text-muted-foreground text-lg leading-relaxed mt-8">
            Whether you are a designer, developer, student, marketer, or content
            creator, Shopyor provides reliable tools that help you work smarter
            and faster.
          </p>
        </section>
        {/*  CTA Button */}
        <section className="py-20 text-center ">
          <h2 className="text-3xl font-bold mb-6">
            Start Using Free Tools Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            No sign-up required. No installation needed. Upload your file,
            process instantly, and download your result within seconds.
          </p>
          <Link href="#tools">
            <Button size="lg">Explore All Tools</Button>
          </Link>
        </section>

        {/* FEATURES */}
        <Features />

        {/* FAQ */}
        <Faq />
      </main>
    </>
  );
}
