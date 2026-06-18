// app/tools/instagram-video-downloader/page.jsx
import { Suspense } from "react";
import Link from "next/link";
import InstagramVideoDownloaderClient from "./client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home, Star } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/instagram-video-downloader`;

export const metadata = {
  title: {
    absolute:
      "Free Instagram Reel & Video Downloader — No Login, No Watermark | Shopyor",
  },
  description:
    "Download public Instagram Reels and videos free — no login, no watermark, no app. Paste the link and save a clean MP4 in up to 1080p. Works on iPhone, Android & desktop.",
  keywords: [
    "instagram reel downloader free",
    "download instagram reels without login",
    "save instagram reels to phone",
    "instagram video downloader no watermark",
    "free instagram reel downloader no signup",
    "how to download instagram reels",
    "instagram reel saver online",
    "download instagram videos without app",
    "instagram mp4 downloader free",
    "save instagram videos to camera roll",
    "instagram reel download iphone",
    "instagram video downloader android",
    "download instagram reels no account",
    "free instagram video saver",
    "instagram reels download online free",
    "save instagram reels without watermark",
    "instagram video downloader hd",
    "how to save instagram reels offline",
    "instagram reel downloader no registration",
    "download public instagram videos free",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "Instagram video and reel downloader tool",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "x-default": PAGE_URL,
      en: PAGE_URL,
      "en-US": PAGE_URL,
      "en-GB": PAGE_URL,
      "en-IN": PAGE_URL,
      "en-PK": PAGE_URL,
      "en-NG": PAGE_URL,
      "en-PH": PAGE_URL,
      "en-CA": PAGE_URL,
      "en-AU": PAGE_URL,
      "en-ZA": PAGE_URL,
    },
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title:
      "Free Instagram Reel & Video Downloader — No Login, No Watermark",
    description:
      "Save public Instagram Reels and videos as clean MP4s — no login, no watermark, no app required. Works on all devices.",
    images: [
      {
        url: `${BASE_URL}/images/instagram-downloader-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Instagram Reel & Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Instagram Reel & Video Downloader | Shopyor",
    description:
      "Paste an Instagram link, get a clean MP4 — no login, no watermark, no signup.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/instagram-downloader-og.png`],
  },
};

const KEYWORDS = [
  "instagram reel downloader free",
  "download instagram reels without login",
  "save instagram reels to phone",
  "instagram video downloader no watermark",
  "free instagram reel downloader no signup",
  "how to download instagram reels",
  "instagram reel saver online",
  "download instagram videos without app",
  "instagram mp4 downloader free",
  "save instagram videos to camera roll",
  "instagram reel download iphone",
  "instagram video downloader android",
  "download instagram reels no account",
  "free instagram video saver",
  "instagram reels download online free",
  "save instagram reels without watermark",
  "instagram video downloader hd",
  "how to save instagram reels offline",
  "instagram reel downloader no registration",
  "download public instagram videos free",
];

const reviews = [
  {
    name: "Sofia L.",
    role: "Social media manager, lifestyle brand",
    rating: 5,
    body: "I save competitor Reels every week for our content benchmarking decks. Shopyor gives me a clean MP4 in seconds — no watermark, no login prompt, no nonsense.",
  },
  {
    name: "James O.",
    role: "Fitness influencer, 45K Instagram followers",
    rating: 5,
    body: "I archive all my workout Reels as backups before Instagram's algorithm buries them. The preview player is a nice touch — I can confirm it's the right clip before saving.",
  },
  {
    name: "Rina C.",
    role: "Recipe blogger and food photographer",
    rating: 5,
    body: "I collect cooking Reels for my moodboard and offline reference. No other free tool I tried actually showed a preview before downloading — this one does.",
  },
  {
    name: "David K.",
    role: "Brand marketing consultant",
    rating: 4,
    body: "We pull public brand content for competitive analysis. Works on desktop Chrome and on my Android phone — consistent results without having to install anything.",
  },
  {
    name: "Aisha M.",
    role: "University student, graphic design major",
    rating: 5,
    body: "I save tutorial Reels to watch offline during my commute. Free, no account required, and the download is instant. Exactly what I needed.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faq = [
  {
    q: "Is the Shopyor Instagram downloader free?",
    a: "Yes. The tool is completely free with no hidden costs, no subscription, and no account required. Paste any public Instagram link and download — nothing else needed.",
  },
  {
    q: "Can I download private Instagram content?",
    a: "No. Only publicly available Reels, feed videos, and IGTV uploads are supported. The tool intentionally does not access private accounts, locked posts, or Stories behind a follow-wall.",
  },
  {
    q: "Does it add a watermark to the downloaded video?",
    a: "No. The downloaded file is the original MP4 with no overlay, logo, or watermark added by Shopyor. You get the video exactly as it was uploaded to Instagram.",
  },
  {
    q: "What types of Instagram content can I download?",
    a: "You can download public Instagram Reels (short vertical videos), standard feed video posts, and IGTV / long-form videos. Static photo posts are not supported.",
  },
  {
    q: "How do I copy an Instagram Reel link on my phone?",
    a: "Open the Reel in the Instagram app, tap the three-dot menu (⋯) in the top-right corner or the Share icon, then tap 'Copy link'. On desktop, copy the URL from the browser address bar.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No. The downloader runs entirely in your browser. It works on iPhone Safari, Android Chrome, and all major desktop browsers — no installation required.",
  },
  {
    q: "What resolution will the video download in?",
    a: "Shopyor automatically fetches the best available quality Instagram makes available for that specific post — usually up to 1080p. You can preview the video before saving to confirm the quality.",
  },
  {
    q: "Does Shopyor store or log the videos I download?",
    a: "No. Shopyor retrieves the video from Instagram's servers on your behalf and streams it to your browser. We do not store copies of videos, and we do not log the Instagram URLs you submit.",
  },
];

export default function InstagramVideoDownloaderPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Instagram Reel & Video Downloader",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online Instagram video and Reel downloader. Save any public Instagram Reel, feed video, or IGTV upload as a clean MP4 — no login, no watermark, no app.",
        featureList: [
          "Download Instagram Reels without watermark",
          "Supports Reels, feed videos, and IGTV",
          "Video preview before downloading",
          "Best available quality up to 1080p",
          "Works on iPhone, Android, Mac, and Windows",
          "Free with no login or registration required",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: AVG_RATING,
          reviewCount: String(reviews.length),
          bestRating: "5",
          worstRating: "1",
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.body,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Instagram Video Downloader",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="bg-background mx-auto max-w-3xl px-4 pt-6 md:pt-8 pb-20">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link href="/" className="flex items-center gap-1 hover:text-foreground">
          <Home className="size-3.5" /> Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/tools" className="hover:text-foreground">
          Tools
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Instagram Video Downloader</span>
      </nav>

      {/* Intro */}
      <header className="mb-6 space-y-3">
        <span className="inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Free • No login • No watermark • No app
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Instagram Reel &amp; Video Downloader — No Login, No Watermark
        </h1>
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${s <= Math.round(Number(AVG_RATING)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{AVG_RATING}</span>
          <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">
          Paste any public Instagram Reel or video link and download a clean
          MP4 in up to 1080p. Preview before you save — works on iPhone,
          Android, and desktop, no account or app required.
        </p>
      </header>

      {/* Tool */}
      <Suspense>
        <InstagramVideoDownloaderClient />
      </Suspense>

      <Separator className="my-10" />

      {/* Article */}
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3">
        <h2>What is the Shopyor Instagram Video Downloader?</h2>
        <p>
          The Shopyor Instagram Video Downloader is a free, browser-based tool
          that saves public Instagram Reels, feed videos, and IGTV uploads as
          clean MP4 files — no watermark added, no Instagram login required.
          There is nothing to install on your phone or computer. Paste the
          link, hit Download, preview the clip in the built-in player, and save
          the file — all in under a minute.
        </p>
        <p>
          Unlike Instagram&apos;s built-in share flow, which only lets you
          re-share inside the app, Shopyor gives you an actual file on your
          device. Whether you are on iPhone Safari, Android Chrome, or a
          desktop browser, the workflow is the same and the result is a proper
          MP4 you can play, edit, or store offline.
        </p>

        <h2>
          How to download Instagram Reels and videos (step by step)
        </h2>
        <ol>
          <li>
            <strong>Copy the Instagram link.</strong> Open the Reel or video in
            the Instagram app. Tap the{" "}
            <em>three-dot menu (⋯)</em> or the <em>Share</em> icon, then tap{" "}
            <em>Copy link</em>. On a desktop browser, copy the URL directly
            from the address bar. Both{" "}
            <code>instagram.com/reel/...</code> and{" "}
            <code>instagram.com/p/...</code> links are supported.
          </li>
          <li>
            <strong>Paste and click Download.</strong> Paste the link into the
            input box above and click <em>Download Video</em>. Shopyor fetches
            the video in the highest available quality — usually up to 1080p.
          </li>
          <li>
            <strong>Preview and save.</strong> A built-in video player appears
            so you can confirm you grabbed the right clip. Click the{" "}
            <em>Download</em> button below the player to save the MP4 to your
            device. On mobile, long-press the button and select{" "}
            <em>Save Video</em> or <em>Download Linked File</em>.
          </li>
        </ol>

        <h2>What types of Instagram content can you download?</h2>
        <ul>
          <li>
            <strong>Instagram Reels</strong> — short vertical videos up to 90
            seconds shared publicly. The most common use case.
          </li>
          <li>
            <strong>Feed video posts</strong> — standard video posts from
            public profiles (links that contain{" "}
            <code>instagram.com/p/...</code>).
          </li>
          <li>
            <strong>IGTV / long-form videos</strong> — longer public uploads
            shared to a creator&apos;s channel.
          </li>
        </ul>
        <p>
          Private accounts, Stories behind a follow-wall, and any content from
          accounts you do not have permission to access are intentionally not
          supported. Only public content can be downloaded.
        </p>

        <h2>
          Why doesn&apos;t Instagram let you save videos directly?
        </h2>
        <p>
          Instagram&apos;s platform design keeps video content inside its
          ecosystem on purpose. There is no built-in &ldquo;Save to
          device&rdquo; button for other people&apos;s posts — only a
          &ldquo;Save to collection&rdquo; feature that bookmarks the post
          inside the app. If your internet goes down, or the original creator
          deletes the post, the bookmarked version disappears too.
        </p>
        <p>
          Shopyor fetches the same public MP4 file Instagram stores on its
          servers — the one the app streams to your screen — and delivers it
          directly to your Downloads folder.
        </p>

        <h2>Is it safe? Do I need my Instagram login?</h2>
        <p>
          No Instagram login is required at any point. Shopyor only accesses
          publicly available URLs — the same content anyone can view by
          visiting the link in a browser without logging in. You never share
          your Instagram credentials, session cookies, or any account data.
          The tool does not store videos or log the URLs you submit.
        </p>

        <h2>Legal and ethical use</h2>
        <p>
          This tool is intended for{" "}
          <strong>personal, non-commercial use</strong>: saving your own Reels
          as backups, archiving reference content you have permission to use,
          or keeping a clip for offline viewing. Do not download other
          creators&apos; content to republish or monetise without their
          explicit written consent. Always credit the original creator when
          sharing, and comply with Instagram&apos;s Terms of Use and
          applicable copyright law.
        </p>

        <h2>Who uses this tool?</h2>
        <ul>
          <li>
            <strong>Content creators</strong> archiving their own Reels before
            deleting or rescheduling them.
          </li>
          <li>
            <strong>Social media managers</strong> saving competitor content
            for benchmarking and client reports.
          </li>
          <li>
            <strong>Designers and marketers</strong> building moodboards from
            publicly available brand content.
          </li>
          <li>
            <strong>Students and educators</strong> saving tutorial or
            educational Reels for offline use in classrooms or commutes.
          </li>
          <li>
            <strong>Everyday users</strong> who want to keep a favourite
            recipe, workout, or travel Reel to re-watch without needing an
            internet connection.
          </li>
        </ul>
      </article>

      {/* Reviews */}
      <section className="mt-12" aria-label="User reviews">
        <h2 className="mb-1 text-xl font-semibold">What users are saying</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Rated {AVG_RATING} / 5 based on {reviews.length} reviews
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <blockquote
              key={i}
              className="rounded-xl border bg-muted/20 px-5 py-4 text-sm"
            >
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`size-3.5 ${
                      s < r.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-foreground">&ldquo;{r.body}&rdquo;</p>
              <footer className="mt-2 text-xs text-muted-foreground">
                — {r.name}, {r.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <Separator className="my-10" />

      {/* FAQ */}
      <section>
        <h2 className="mb-5 text-xl font-semibold">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx + 1}`}>
              <AccordionTrigger className="text-left text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Related searches */}
      <section className="mt-12">
        <h2 className="mb-2 text-lg font-semibold">Related searches</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          People also look for these Instagram download topics:
        </p>
        <ul className="flex flex-wrap gap-2">
          {KEYWORDS.map((kw, i) => (
            <li
              key={i}
              className="rounded-full border bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
            >
              {kw}
            </li>
          ))}
        </ul>
      </section>

      {/* Internal links */}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">
          More free video downloader tools
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: "/tools/free-tiktok-video-downloader",
              title: "TikTok Video Downloader",
              desc: "Save TikTok videos without a watermark.",
            },
            {
              href: "/tools/facebook-video-downloader",
              title: "Facebook Video Downloader",
              desc: "Download public Facebook videos and Reels.",
            },
            {
              href: "/tools/youtube-video-downloader",
              title: "YouTube Video Downloader",
              desc: "Grab YouTube clips for offline viewing.",
            },
            {
              href: "/tools",
              title: "All Free Tools",
              desc: "Browse every free tool on Shopyor.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border p-4 transition-colors hover:bg-muted/40"
            >
              <span className="block font-medium">{link.title}</span>
              <span className="text-sm text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Guides &amp; tutorials</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: "/blog/how-to-download-videos-from-facebook-instagram-tiktok",
              title: "Download Videos from Facebook, Instagram & TikTok",
            },
            {
              href: "/blog/best-facebook-video-downloader-online-free-in-hd-shopyor",
              title: "Best Facebook Video Downloader Online Free in HD",
            },
            {
              href: "/blog/easy-guide-download-tiktok-facebook-videos-using-shopyor",
              title: "Easy Guide: Download TikTok & Facebook Videos",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border p-4 text-sm font-medium transition-colors hover:bg-muted/40"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <p className="mt-10 rounded-xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        Instagram and Meta are trademarks of Meta Platforms, Inc. Shopyor is
        not affiliated with Instagram or Meta. This tool is for personal,
        non-commercial use only. Always respect content creators&apos; rights
        and Instagram&apos;s Terms of Use.
      </p>
    </div>
  );
}
