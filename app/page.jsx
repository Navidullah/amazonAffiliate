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
    title: "Background Remover 01",
    desc: "Remove image backgrounds instantly using AI.",
    href: "/tools/background-remover-image",
    icon: <ImageIcon className="w-6 h-6" />,
  },
  {
    title: "Background Remover 02",
    desc: "Remove image backgrounds instantly using AI.",
    href: "/tools/bg-remover",
    icon: <ImageIcon className="w-6 h-6" />,
  },
  {
    title: "Image Compressor",
    desc: "Reduce image size without losing quality.",
    href: "/tools/image-compressor",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "EXIF Remover",
    desc: "Remove hidden metadata from your images.",
    href: "/tools/exif-remover",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "BMI Calculator",
    desc: "Calculate your body mass index easily.",
    href: "/tools/bmi",
    icon: <Scale className="w-6 h-6" />,
  },
  {
    title: "Affiliate Link Generator",
    desc: "Create clean and trackable affiliate links.",
    href: "/tools/affiliate-link-generator",
    icon: <Link2 className="w-6 h-6" />,
  },
  {
    title: "Convert PDF file to Word file",
    desc: "PDF to WORD API using Python code.",
    href: "/tools/pdf-to-word",
    icon: <FileType className="w-6 h-6" />,
  },
  {
    href: "/tools/youtube-thumbnail",
    title: "Youtube Thumbnail Downloader",
    desc: "Here You Can Easily Download",
    icon: <Wand className="w-6 h-6" />,
  },
];

/* ================================
   JSON-LD Structured Data
================================ */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: "Shopyor", url: "https://www.shopyor.com" },
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
      name: "Free Online Tools",
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
            Powerful Tools. Zero Complexity.
          </h2>
          <ToolCards tools={tools} />
        </section>

        {/* FEATURES */}
        <Features />

        {/* FAQ */}
        <Faq />
      </main>
    </>
  );
}
