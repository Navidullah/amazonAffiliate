// app/tools/free-tiktok-video-downloader/page.jsx
import Link from "next/link";
import TikTokDownloaderClient from "./TikTokDownloaderClient";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home, Star } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/free-tiktok-video-downloader`;

export const metadata = {
  title: {
    absolute:
      "Free TikTok Video Downloader — No Watermark, No Signup | Shopyor",
  },
  description:
    "Download any public TikTok video without watermark in HD (up to 1080p). Free, no sign-up, no app — works on iPhone, Android, and desktop. Just paste the link.",
  keywords: [
    "tiktok video downloader without watermark",
    "download tiktok without watermark free",
    "tiktok downloader no signup",
    "save tiktok video to phone",
    "tiktok mp4 download free",
    "how to download tiktok without watermark",
    "tiktok video saver online",
    "tiktok download no app needed",
    "free tiktok downloader no login",
    "download tiktok video to camera roll",
    "tiktok without watermark iphone",
    "tiktok video downloader android",
    "tiktok hd download free",
    "vm tiktok downloader",
    "download tiktok reels without watermark",
    "tiktok saver no registration",
    "free tiktok video download online",
    "tiktok downloader 1080p",
    "save tiktok videos for offline viewing",
    "tiktok video download no watermark no app",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "TikTok video downloader tool",
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
    title: "Free TikTok Video Downloader — No Watermark, No Signup",
    description:
      "Download any public TikTok video without watermark in HD — free, no registration, works on all devices.",
    images: [
      {
        url: `${BASE_URL}/images/tiktok-downloader-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor TikTok Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free TikTok Video Downloader — No Watermark | Shopyor",
    description:
      "Paste a TikTok link, pick quality, download a clean MP4 — no watermark, no signup, no app.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/tiktok-downloader-og.png`],
  },
};

const KEYWORDS = [
  "tiktok video downloader without watermark",
  "download tiktok without watermark free",
  "tiktok downloader no signup",
  "save tiktok video to phone",
  "tiktok mp4 download free",
  "how to download tiktok without watermark",
  "tiktok video saver online",
  "tiktok download no app needed",
  "free tiktok downloader no login",
  "download tiktok video to camera roll",
  "tiktok without watermark iphone",
  "tiktok video downloader android",
  "tiktok hd download free",
  "vm tiktok downloader",
  "download tiktok reels without watermark",
  "tiktok saver no registration",
  "free tiktok video download online",
  "tiktok downloader 1080p",
  "save tiktok videos for offline viewing",
  "tiktok video download no watermark no app",
];

const reviews = [
  {
    name: "Priya M.",
    role: "Content creator, 120K TikTok followers",
    rating: 5,
    body: "I archive my best TikToks every month so I always have a clean, watermark-free copy for my portfolio. Shopyor is the only tool that consistently delivers HD without making me sign up.",
  },
  {
    name: "Carlos R.",
    role: "Social media manager, marketing agency",
    rating: 5,
    body: "We clip TikToks for client pitch decks. A clean 1080p download in seconds saves us from stitching frames out of a screen recording. This has become a daily tool for our team.",
  },
  {
    name: "Dana K.",
    role: "Freelance video editor",
    rating: 5,
    body: "I collect TikTok reference clips before starting any vertical-video project. It spits out a proper MP4 in 10 seconds — no watermark, no fuss, no installation.",
  },
  {
    name: "Mr. Hassan",
    role: "High school media studies teacher",
    rating: 4,
    body: "I save educational TikToks to play in class when the school Wi-Fi decides to die. Works on my phone and on the classroom laptop — no installation or account needed.",
  },
  {
    name: "Leila T.",
    role: "Fitness coach and content repurposer",
    rating: 5,
    body: "I download my own workout TikToks to re-edit for YouTube Shorts and Instagram Reels. The no-signup part is key — I am not handing over my login to every tool I try.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faq = [
  {
    q: "Is the Shopyor TikTok downloader completely free?",
    a: "Yes. The tool is free with no hidden costs, no subscription, and no registration. Paste your TikTok link, pick a quality, and download — nothing else required.",
  },
  {
    q: "Does it really remove the TikTok watermark?",
    a: "Yes. When you save a video inside the TikTok app, the app overlays the creator's username and the TikTok logo as a moving watermark. Shopyor fetches the original source video before that overlay is applied, so you get a clean MP4 file with no watermark.",
  },
  {
    q: "What video quality options are available?",
    a: "You can choose 360p (small file, fast download), 720p (standard HD), 1080p (full HD), or Best — the highest quality available for that specific video. Most TikToks max out at 1080p.",
  },
  {
    q: "How do I copy a TikTok link on my phone?",
    a: "Open TikTok, tap the Share icon (arrow) on the right side of the video, then tap 'Copy link'. On a desktop browser, copy the URL from the address bar. Paste the link into the input box above and click Download. Short vm.tiktok.com share links also work.",
  },
  {
    q: "Is it legal to download TikTok videos?",
    a: "Downloading is intended for personal, non-commercial use — saving your own clips, keeping an offline copy of content you have permission to use, or collecting reference material for editing. Do not download and republish other creators' videos commercially without their explicit consent. Always follow TikTok's Terms of Service and respect copyright law.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No. The downloader runs entirely in your web browser — nothing to install. It works on iPhone Safari, Android Chrome, and all major desktop browsers on Mac and Windows.",
  },
  {
    q: "Does Shopyor store the videos I download?",
    a: "No. Shopyor fetches the video from TikTok's servers on your behalf and streams it directly to your device. We do not retain copies of any videos and do not log the TikTok links you submit.",
  },
  {
    q: "Why does the download sometimes fail?",
    a: "Downloads fail when a video is private, the account has been deleted, or the link has expired. Make sure the video is public and paste the full URL. If a vm.tiktok.com share link fails, try finding the full tiktok.com/@username/video/... link instead.",
  },
];

export default function TikTokDownloaderPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "TikTok Video Downloader",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online TikTok video downloader. Save any public TikTok video without watermark in HD (up to 1080p) — no app, no registration, works on all devices.",
        featureList: [
          "Download TikTok videos without watermark",
          "Quality options: 360p, 720p, 1080p, Best",
          "Works on iPhone, Android, Mac, and Windows",
          "No app or browser extension to install",
          "Free with no sign-up required",
          "Supports tiktok.com and vm.tiktok.com links",
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
        "@type": "HowTo",
        name: "How to download a TikTok video without watermark",
        totalTime: "PT1M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Copy the TikTok link",
            text: "Open TikTok, tap Share on the video and choose Copy link. On desktop, copy the URL from the browser address bar.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Paste the link",
            text: "Paste the copied TikTok link into the input box on this page.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Choose quality and download",
            text: "Select your preferred video quality (360p, 720p, 1080p, or Best) and click Download Video. The watermark-free MP4 saves to your device.",
          },
        ],
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
            name: "TikTok Video Downloader",
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
    <main className="bg-background mx-auto max-w-3xl px-4 pt-28 md:pt-32 lg:pt-32 pb-20">
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
        <span className="text-foreground">TikTok Video Downloader</span>
      </nav>

      {/* Intro */}
      <header className="mb-6 space-y-3">
        <span className="inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Free • No watermark • No signup • No app
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free TikTok Video Downloader — No Watermark, No Signup
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Paste any public TikTok link and download a clean, watermark-free MP4
          in up to 1080p HD. Works on iPhone, Android, and desktop — no app,
          no account, no cost.
        </p>
      </header>

      {/* Tool */}
      <TikTokDownloaderClient />

      <Separator className="my-10" />

      {/* Article */}
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3">
        <h2>What is the Shopyor TikTok Video Downloader?</h2>
        <p>
          The Shopyor TikTok Video Downloader is a free, browser-based tool
          that lets you save any public TikTok video as a clean MP4 file —
          without the TikTok watermark. There is no app to install, no account
          to create, and no browser extension required. Paste the link, choose
          a quality between 360p and 1080p, and the file downloads straight to
          your device in seconds.
        </p>
        <p>
          It works the same on every platform: iPhone, Android, Mac, and
          Windows. Students saving educational content, editors collecting
          reference clips, and creators archiving their own videos all use it
          for the same reason — a quick, clean download with no unnecessary
          friction.
        </p>

        <h2>
          How to download a TikTok video without watermark (step by step)
        </h2>
        <ol>
          <li>
            <strong>Copy the TikTok link.</strong> On the TikTok mobile app,
            tap the <em>Share</em> icon (the arrow on the right side of the
            video), then tap <em>Copy link</em>. On a desktop browser, copy
            the full URL from the address bar. Both{" "}
            <code>tiktok.com/@username/video/…</code> links and short{" "}
            <code>vm.tiktok.com/…</code> share links are supported.
          </li>
          <li>
            <strong>Paste the link above.</strong> Tap the Paste button in the
            input box, or use Ctrl+V / Cmd+V to paste the link into the field.
          </li>
          <li>
            <strong>Choose quality and click Download.</strong> Pick 360p for a
            small file, 720p or 1080p for HD, or Best for the highest quality
            the video was originally uploaded in. The watermark-free MP4 saves
            to your Downloads folder.
          </li>
        </ol>

        <h2>
          Why does TikTok add a watermark — and how does this tool remove it?
        </h2>
        <p>
          When you use TikTok&apos;s built-in <em>Save video</em> option, the
          app burns a moving overlay onto the clip: the original creator&apos;s
          username and the TikTok logo. This is fine for re-sharing back onto
          TikTok, but it is distracting if you want to store the video offline,
          use a clip in a presentation, or repurpose it on another platform.
        </p>
        <p>
          Shopyor accesses the original source file directly from TikTok&apos;s
          servers — the version that exists <em>before</em> any watermark
          overlay is composited in. The result is the same video at the same
          resolution, just without the username stamp or TikTok logo.
        </p>

        <h2>Supported link types and output format</h2>
        <ul>
          <li>
            Full desktop links:{" "}
            <code>tiktok.com/@username/video/1234567890</code>
          </li>
          <li>
            Mobile share links: <code>vm.tiktok.com/ZMxxxxxx/</code>
          </li>
          <li>
            Output format: <strong>MP4</strong> — the universal video format
            that plays natively on every phone, tablet, and computer, and that
            editing software accepts without conversion.
          </li>
          <li>
            Quality choices: <strong>360p</strong>, <strong>720p</strong>,{" "}
            <strong>1080p</strong>, and <strong>Best</strong> (the resolution
            the creator originally uploaded).
          </li>
        </ul>
        <p>
          Private videos, videos from deleted accounts, and videos behind
          regional restrictions cannot be fetched — only public TikToks are
          supported.
        </p>

        <h2>Is it safe and private?</h2>
        <p>
          Shopyor does not ask for your TikTok login. You never share your
          credentials, your cookies, or your account. The tool sends only the
          video URL you provide to TikTok&apos;s public servers, retrieves the
          video on your behalf, and streams it to your browser. No copy of the
          video is stored on Shopyor&apos;s servers, and the links you submit
          are not logged.
        </p>

        <h2>Legal and ethical use</h2>
        <p>
          This tool is intended for{" "}
          <strong>personal, non-commercial use</strong>: saving your own clips,
          archiving content you have permission to use, or downloading reference
          material for creative projects. Do not download other creators&apos;
          videos to republish or monetise without their explicit written
          consent. Always credit the original creator when sharing clips, and
          comply with TikTok&apos;s Terms of Service and applicable copyright
          law in your country.
        </p>

        <h2>Who uses this tool?</h2>
        <ul>
          <li>
            <strong>Content creators</strong> archiving their own TikToks as
            backup copies and portfolio clips without the watermark.
          </li>
          <li>
            <strong>Video editors</strong> collecting vertical-video reference
            material before starting a project.
          </li>
          <li>
            <strong>Teachers and educators</strong> downloading short
            educational TikToks to play offline in classrooms with limited
            Wi-Fi.
          </li>
          <li>
            <strong>Social media managers</strong> grabbing clean copies of
            client or competitor posts for reporting and benchmarking decks.
          </li>
          <li>
            <strong>Anyone</strong> who wants to watch a favourite TikTok
            offline on a flight or in a place with no data connection.
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
          People also look for these TikTok download topics:
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
              href: "/tools/instagram-video-downloader",
              title: "Instagram Video Downloader",
              desc: "Save public Instagram Reels and videos.",
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

      {/* Disclaimer */}
      <p className="mt-10 rounded-xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        TikTok is a trademark of ByteDance Ltd. Shopyor is not affiliated with
        TikTok. This tool is for personal, non-commercial use only. Always
        respect content creators&apos; rights and TikTok&apos;s Terms of
        Service.
      </p>
    </main>
  );
}
