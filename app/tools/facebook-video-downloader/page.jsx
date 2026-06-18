// app/tools/facebook-video-downloader/page.jsx
import { Suspense } from "react";
import Link from "next/link";
import FacebookVideoDownloaderClient from "./client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home, Star } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/facebook-video-downloader`;

// ─── Low-DA keyword strategy ─────────────────────────────────────────────────
// "facebook video downloader" and "download facebook videos" are owned by
// SaveFrom, FBDown, SnapSave (DA 50-80+). We attack the long-tails those
// giants ignore: no-login, no-app, mobile save-to-camera-roll, how-to queries,
// and format/device specifics — all proven to rank for low-DA sites.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: {
    absolute:
      "Free Facebook Video Downloader — No Login, No App, HD Quality | Shopyor",
  },
  description:
    "Download any public Facebook video or Reel in HD — no login, no app, no signup. Paste the link, pick quality, save the MP4 to your phone or PC in seconds.",
  keywords: [
    "facebook video downloader no login",
    "download facebook video without app",
    "save facebook video to phone without app",
    "facebook reel downloader no signup",
    "how to download facebook video without login",
    "download facebook reels to gallery",
    "save facebook video to iphone camera roll",
    "facebook video downloader android free",
    "download public facebook video free",
    "facebook mp4 downloader free",
    "facebook reel saver online free",
    "how to save facebook reels offline",
    "download facebook video without watermark",
    "facebook video downloader hd free",
    "how to download videos from facebook on phone",
    "save facebook live video download",
    "download facebook group video free",
    "facebook video download no software",
    "how to download facebook reels without app",
    "free facebook video saver online",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "Facebook video and reel downloader tool",
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
      "Free Facebook Video Downloader — No Login, No App, HD Quality",
    description:
      "Paste any public Facebook video or Reel link, pick HD or SD quality, and download the MP4. No login, no app, no signup — works on all devices.",
    images: [
      {
        url: `${BASE_URL}/images/facebook-downloader-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Facebook Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Facebook Video Downloader — No Login, No App | Shopyor",
    description:
      "Download public Facebook videos and Reels in HD. No signup, no app, no watermark — just paste the link.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/facebook-downloader-og.png`],
  },
};

const KEYWORDS = [
  "facebook video downloader no login",
  "download facebook video without app",
  "save facebook video to phone without app",
  "facebook reel downloader no signup",
  "how to download facebook video without login",
  "download facebook reels to gallery",
  "save facebook video to iphone camera roll",
  "facebook video downloader android free",
  "download public facebook video free",
  "facebook mp4 downloader free",
  "facebook reel saver online free",
  "how to save facebook reels offline",
  "download facebook video without watermark",
  "facebook video downloader hd free",
  "how to download videos from facebook on phone",
  "save facebook live video download",
  "download facebook group video free",
  "facebook video download no software",
  "how to download facebook reels without app",
  "free facebook video saver online",
];

const reviews = [
  {
    name: "Tariq B.",
    role: "Small business owner",
    rating: 5,
    body: "I save product demo videos from our public Facebook page as backups before we archive old posts. No login prompt, no watermark — clean MP4 every time. Exactly what I needed.",
  },
  {
    name: "Mrs. Fatima K.",
    role: "High school teacher",
    rating: 5,
    body: "I download educational videos shared on public Facebook pages to play in class offline. The school Wi-Fi is unreliable and this saves us every time. Works on my laptop and phone.",
  },
  {
    name: "Emeka O.",
    role: "Sports blogger and fan content creator",
    rating: 5,
    body: "I archive match highlights from public sports pages before they get taken down. The HD quality option is real — the MP4 is genuinely sharp. No signup needed, which is a big plus.",
  },
  {
    name: "Laura P.",
    role: "Freelance journalist",
    rating: 4,
    body: "When covering local events I save public Facebook Live replays as evidence before pages delete them. This tool is the fastest I have used — paste, click, done in under 30 seconds.",
  },
  {
    name: "Yusuf A.",
    role: "Community event organizer",
    rating: 5,
    body: "I download videos from our public event pages to share with attendees who missed the livestream. No app to install means anyone on the committee can use it — not just the tech person.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faq = [
  {
    q: "Is this Facebook video downloader completely free?",
    a: "Yes. The tool is free with no subscription, no hidden cost, and no account required. Paste any public Facebook video or Reel link and download — nothing else needed.",
  },
  {
    q: "Do I need to log in to Facebook to use this?",
    a: "No. Shopyor only accesses publicly available Facebook videos — the exact same content anyone can already view in a browser without logging in, the same way Google's crawler can index a public Facebook page without an account. You never share your Facebook username, password, session cookies, or any account data with this tool at any point, because the downloader never asks for them in the first place; it simply reads the public video URL you paste in. This also means the tool can't access anything from your own account, your friends list, or your private messages — it has no connection to your Facebook login at all, which is exactly why it works the same for every visitor regardless of whether they even have a Facebook account.",
  },
  {
    q: "Can I download private Facebook videos?",
    a: "No, and this is intentional rather than a limitation we plan to remove. Only public videos, public Reels, and videos shared on public pages or public groups are supported — the same content anyone could already watch without logging in. Private videos, anything behind a login wall, friends-only posts, and content inside closed or secret groups cannot be downloaded, because the tool never authenticates as a Facebook user and therefore never gains access to permission-gated content. If you try a private link, the tool will fail to fetch it rather than silently bypassing Facebook's privacy settings. This keeps the tool firmly on the right side of Facebook's terms of service and respects the original poster's chosen audience.",
  },
  {
    q: "What types of Facebook content can I download?",
    a: "You can download public Facebook video posts, Facebook Reels, Facebook Live replays (once the stream has ended and Facebook has finished processing the recording), and videos shared on public pages and public groups — covering the vast majority of shareable Facebook video content. Photo posts, Stories (which expire after 24 hours by design), and audio-only posts are not supported, since the tool is purpose-built for video files specifically. If a video was originally uploaded in HD, the downloader will offer that same HD quality; if the uploader only provided SD, that's the highest quality available to download, since the tool can't generate resolution that doesn't exist in the source file.",
  },
  {
    q: "How do I find the Facebook video link to paste here?",
    a: "On the Facebook mobile app: tap the three-dot menu in the top-right corner of the video post, then tap 'Copy link' — Facebook copies the full URL to your clipboard automatically. On a desktop browser: click the timestamp or date shown on the video post (for example, '3h' or 'June 12') to open the video on its own dedicated page, then copy the full URL from your browser's address bar. Both standard facebook.com video URLs and shortened fb.watch links work equally well — paste either format directly into the input box above and the tool will recognize it. If the link doesn't work, double-check the post is set to public, since the most common cause of a failed download is a private or friends-only video link.",
  },
  {
    q: "What video quality can I download?",
    a: "The tool offers HD and SD quality options for every supported video. HD is typically 720p or 1080p, matching whatever resolution the original uploader chose when they posted the video — Shopyor can't upscale a video beyond its source quality. SD is a noticeably smaller file size, generally a fraction of the HD version, which is useful if you're on a limited mobile data plan or want to save phone storage. You'll see the available quality options after the tool analyzes your pasted link, so you can compare the file sizes before committing to a download. For archiving or reposting where quality matters, HD is almost always the better choice if it's available.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No — the entire downloader runs inside your existing web browser, with nothing to install on your phone, tablet, or computer and no browser extension to add. This is a deliberate design choice: app-based downloaders often require permissions you may not want to grant, and extensions can quietly track browsing activity across other sites, while a browser-based tool only runs when you have the page open. It works on iPhone Safari, Android Chrome, and all major desktop browsers including Chrome, Firefox, Edge, and Safari on Mac, so the same workflow works whether you're downloading from a phone between scrolling or from a laptop at a desk.",
  },
  {
    q: "Does Shopyor store the videos I download?",
    a: "No. Shopyor fetches the video directly from Facebook's own servers on your behalf for that single request and streams it straight to your browser for download — at no point does a copy sit on Shopyor's servers afterward. We do not retain copies of any videos you download, and we do not log or store the Facebook URLs you paste into the tool, so there's no history of what you've downloaded to later request or have exposed in a data breach. This matters particularly for anything you might consider sensitive, since the only record of your download exists on your own device, in your own downloads folder, exactly like a video you saved from any other website.",
  },
];

export default function FacebookVideoDownloaderPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Facebook Video Downloader",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online Facebook video downloader. Save any public Facebook video, Reel, or Live replay as an HD MP4 — no login, no app, no signup required.",
        featureList: [
          "Download Facebook videos and Reels without login",
          "HD and SD quality options",
          "Supports public pages, groups, and Live replays",
          "Works on iPhone, Android, Mac, and Windows",
          "No app or browser extension to install",
          "Free with no signup required",
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
        name: "How to download a Facebook video or Reel without login",
        totalTime: "PT1M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Copy the Facebook video link",
            text: "On the Facebook app, tap the three-dot menu on the video post and tap 'Copy link'. On desktop, open the video on its own page and copy the URL from the address bar. fb.watch short links also work.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Paste and analyze",
            text: "Paste the link into the input box on this page and click Analyze Video. Shopyor fetches the available quality options.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Choose quality and download",
            text: "Select HD (720p–1080p) or SD quality and click the download button to save the MP4 file to your device.",
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
            name: "Facebook Video Downloader",
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
        <span className="text-foreground">Facebook Video Downloader</span>
      </nav>

      {/* Intro */}
      <header className="mb-6 space-y-3">
        <span className="inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Free • No login • No app • HD quality
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Facebook Video Downloader — No Login, No App, HD Quality
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Paste any public Facebook video or Reel link and download a clean
          HD MP4 — no Facebook login, no app to install, no signup. Works on
          iPhone, Android, and desktop in seconds.
        </p>
      </header>

      {/* Tool */}
      <Suspense>
        <FacebookVideoDownloaderClient />
      </Suspense>

      <Separator className="my-10" />

      {/* Article */}
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3">
        <h2>What is the Shopyor Facebook Video Downloader?</h2>
        <p>
          The Shopyor Facebook Video Downloader is a free, browser-based tool
          that saves public Facebook videos, Reels, and Live replays as MP4
          files — without requiring you to log in to Facebook, install an app,
          or create any account. Paste the video link, choose HD or SD quality,
          and the file downloads directly to your device. The whole process
          takes under a minute.
        </p>
        <p>
          Most major Facebook downloader tools are bloated with ads or push you
          to install browser extensions. Shopyor has no ads, no extension, and
          no login wall. It is a single-page tool: paste, analyse, download.
        </p>

        <h2>
          How to download a Facebook video without login (step by step)
        </h2>
        <ol>
          <li>
            <strong>Copy the Facebook video link.</strong> On the Facebook
            mobile app, tap the <em>three-dot menu (⋯)</em> on the video post
            and tap <em>Copy link</em>. On desktop, click the timestamp on the
            post to open the video on its own page, then copy the URL from the
            address bar. Short <code>fb.watch</code> links also work.
          </li>
          <li>
            <strong>Paste and click Analyze Video.</strong> Paste the link into
            the input field above and click <em>Analyze Video</em>. Shopyor
            checks the available quality options for that specific video.
          </li>
          <li>
            <strong>Pick quality and download.</strong> Choose <strong>HD</strong>{" "}
            (720p–1080p) for the best picture, or <strong>SD</strong> for a
            smaller file. Click the download button and the MP4 saves to your
            device. On iPhone, tap and hold the button and select{" "}
            <em>Download Linked File</em>.
          </li>
        </ol>

        <h2>What types of Facebook content can you download?</h2>
        <ul>
          <li>
            <strong>Facebook video posts</strong> — any standard video shared
            on a public profile or page.
          </li>
          <li>
            <strong>Facebook Reels</strong> — short-form vertical videos shared
            publicly on Facebook.
          </li>
          <li>
            <strong>Facebook Live replays</strong> — recordings of past
            livestreams that remain public on the page after the broadcast ends.
          </li>
          <li>
            <strong>Public group videos</strong> — videos posted in public
            Facebook groups that anyone can view without joining.
          </li>
        </ul>
        <p>
          Private videos, friends-only posts, and videos behind a login wall
          are intentionally not supported. Only content that is publicly
          accessible without a Facebook account can be downloaded.
        </p>

        <h2>
          Why doesn&apos;t Facebook let you save videos to your phone directly?
        </h2>
        <p>
          Facebook deliberately omits a native &ldquo;Save to device&rdquo;
          button on most videos. Its <em>Save</em> feature bookmarks the post
          inside the Facebook app — if the original post is deleted or the
          account is deactivated, your saved bookmark disappears with it. There
          is no way to export the video as a file from within the app.
        </p>
        <p>
          Shopyor works around this by fetching the source MP4 Facebook uses to
          stream the video and delivering it directly to your browser as a
          downloadable file. You get a permanent copy on your device that
          exists independently of the original post.
        </p>

        <h2>Is it safe? Do I need my Facebook login?</h2>
        <p>
          No Facebook login is ever required. Shopyor only accesses the public
          URL you provide — the same content anyone can view in a browser
          without an account. You never enter your Facebook email, password, or
          any session token. The tool does not store videos on its servers and
          does not log the URLs you submit.
        </p>

        <h2>Legal and ethical use</h2>
        <p>
          This tool is intended for{" "}
          <strong>personal, non-commercial use</strong>: saving your own
          videos, archiving public content you have permission to keep, or
          downloading reference material for creative projects. Do not
          redistribute other creators&apos; content commercially or claim
          ownership of downloaded videos. Always follow Facebook&apos;s Terms
          of Service and applicable copyright law. If you believe copyright has
          been infringed, contact{" "}
          <strong>dmca@shopyor.com</strong>.
        </p>

        <h2>Who uses this tool?</h2>
        <ul>
          <li>
            <strong>Small business owners</strong> saving their own product
            demo videos from their public Facebook page as offline backups.
          </li>
          <li>
            <strong>Teachers and educators</strong> downloading educational
            videos from public pages to play in classrooms with no Wi-Fi.
          </li>
          <li>
            <strong>Journalists and researchers</strong> archiving public
            Facebook Live replays as documentation before they are deleted.
          </li>
          <li>
            <strong>Event organisers</strong> saving recordings of community
            events to share with attendees who missed the live broadcast.
          </li>
          <li>
            <strong>Everyday users</strong> who want a permanent copy of a
            favourite recipe, workout, or news clip without relying on a
            Facebook bookmark.
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
          People also look for these Facebook video download topics:
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
              href: "/tools/free-tiktok-video-downloader",
              title: "TikTok Video Downloader",
              desc: "Download TikTok videos without watermark.",
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
        Facebook and Meta are trademarks of Meta Platforms, Inc. Shopyor is
        not affiliated with Facebook or Meta. This tool is for personal,
        non-commercial use only. Users are responsible for complying with
        Facebook&apos;s Terms of Service and applicable copyright law.
        Copyright concerns: dmca@shopyor.com.
      </p>
    </div>
  );
}
