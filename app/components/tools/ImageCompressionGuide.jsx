// app/components/tools/ImageCompressionGuide.jsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Image as ImageIcon,
  Rocket,
  GaugeCircle,
  Smartphone,
  FileDown,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function ImageCompressionGuide() {
  const toc = [
    { href: "#what-is-image-compression", label: "What is image compression?" },
    { href: "#why-reduce-image-size", label: "Why reduce image size?" },
    { href: "#ways-to-compress", label: "Best ways to compress images" },
    { href: "#compress-jpeg", label: "Compress JPEG" },
    { href: "#best-practices", label: "Best practices" },
    { href: "#faqs", label: "FAQs" },
  ];

  return (
    <section className="mt-12">
      {/* Hero/Heading */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-neutral-50 to-white p-6 dark:from-neutral-900 dark:to-neutral-950">
        <div className="flex items-start gap-4">
          <div className="rounded-xl border border-border p-3">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500">
                Image Compression
              </span>{" "}
              — Reduce Image Size Without Losing Quality
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-7">
              Images make websites engaging—but large files slow pages, waste
              bandwidth, and can hurt search rankings. With a few simple steps,
              you can reduce image file size while keeping visuals sharp and
              clear.
            </p>
          </div>
        </div>

        {/* TOC */}
        <div className="mt-6 rounded-xl border border-border p-4">
          <p className="text-sm font-semibold">On this page</p>
          <Separator className="my-3" />
          <ul className="grid gap-2 text-sm">
            {toc.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What is image compression */}
      <Card id="what-is-image-compression" className="mt-10">
        <CardHeader>
          <CardTitle>What is image compression?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Image compression shrinks the size of an image file while keeping it
            visually appealing. The goal is a smaller file that loads quickly
            without looking blurry or pixelated.
          </p>

          <ul className="grid gap-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500" />
              <p>
                <span className="font-medium">Lossless compression:</span>{" "}
                Reduces file size without changing visible quality. Great for
                icons, logos, and graphics.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500" />
              <p>
                <span className="font-medium">Lossy compression:</span> Makes
                files much smaller with a slight (often unnoticeable) quality
                trade-off. Ideal for photos.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Why reduce image size */}
      <Card id="why-reduce-image-size" className="mt-8">
        <CardHeader>
          <CardTitle>Why reduce image size?</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ul className="grid gap-4 md:grid-cols-2">
            <li className="flex items-start gap-3">
              <Rocket className="h-5 w-5 mt-0.5" />
              <p>
                <span className="font-medium">Faster pages:</span> Better user
                experience and improved SEO.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <GaugeCircle className="h-5 w-5 mt-0.5" />
              <p>
                <span className="font-medium">Lower bounce rate:</span> Visitors
                stay longer on responsive sites.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <FileDown className="h-5 w-5 mt-0.5" />
              <p>
                <span className="font-medium">Saves bandwidth & storage:</span>{" "}
                Ideal for blogs, portfolios, and shops.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 mt-0.5" />
              <p>
                <span className="font-medium">Mobile friendly:</span> Optimized
                images load smoothly on phones.
              </p>
            </li>
          </ul>

          <Alert className="mt-2">
            <Info className="h-4 w-4" />
            <AlertTitle>Pro tip</AlertTitle>
            <AlertDescription>
              Track performance before and after optimization—expect a
              noticeable lift in Core Web Vitals.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Best ways to compress */}
      <Card id="ways-to-compress" className="mt-8">
        <CardHeader>
          <CardTitle>Best ways to compress images</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border p-5">
            <h4 className="font-semibold">1) Online tools</h4>
            <p className="mt-2 text-muted-foreground">
              Drag, drop, and download in seconds—perfect for quick tasks (e.g.,
              TinyPNG, CompressJPEG, Squoosh).
            </p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <h4 className="font-semibold">2) Desktop software</h4>
            <p className="mt-2 text-muted-foreground">
              Tools like Adobe Photoshop and GIMP offer fine-grained control
              over quality and format—great for batches.
            </p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <h4 className="font-semibold">3) CMS plugins</h4>
            <p className="mt-2 text-muted-foreground">
              On WordPress/Shopify, plugins (e.g., Smush, ShortPixel)
              auto-compress during upload to keep media lean.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Compress JPEG */}
      <Card id="compress-jpeg" className="mt-8">
        <CardHeader>
          <CardTitle>Compress JPEG: the most common need</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            JPEG is the most common web photo format. A solid JPEG compressor
            can cut a 5&nbsp;MB photo to ~500&nbsp;KB with no obvious quality
            loss—faster loads, great visuals.
          </p>
          <ul className="grid gap-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500" />
              <p>
                Use JPEG for photos, PNG for graphics, SVG for icons, and
                consider WebP/AVIF for modern delivery.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500" />
              <p>
                Resize dimensions before compressing—avoid serving 4000px images
                where 800px will do.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Best practices */}
      <Card id="best-practices" className="mt-8">
        <CardHeader>
          <CardTitle>Best practices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 md:grid-cols-2">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500" />
              <p>Pick the right format (JPEG/PNG/WebP/AVIF/SVG).</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500" />
              <p>Resize before upload; then compress.</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500" />
              <p>Preview results and keep a backup of originals.</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500" />
              <p>
                Automate with plugins or build-time scripts for consistency.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card id="faqs" className="mt-8">
        <CardHeader>
          <CardTitle>FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>
                How do I reduce image size without losing quality?
              </AccordionTrigger>
              <AccordionContent>
                Use lossless compression for graphics and moderate lossy
                compression for photos. Resize dimensions to what you actually
                need, then compress (TinyPNG, Squoosh are excellent).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>
                What format is best: JPEG, PNG, or WebP?
              </AccordionTrigger>
              <AccordionContent>
                JPEG for photos, PNG for graphics with transparency, WebP/AVIF
                for modern lightweight delivery, and SVG for icons/line art.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>
                Does image compression help SEO?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Smaller files speed up pages and support better Core Web
                Vitals—positively impacting search visibility and user
                experience.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Closing */}
      <div className="mt-8 rounded-2xl border border-border p-6">
        <h3 className="text-xl font-semibold">Final thoughts</h3>
        <p className="mt-2 text-muted-foreground">
          Start simple: resize, then compress. Measure performance, and automate
          where you can. Your pages will load faster, look great, and keep
          visitors engaged.
        </p>
      </div>
    </section>
  );
}
