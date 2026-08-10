// app/tools/facebook-video-downloader/page.jsx
import FacebookVideoDownloaderExperience from "./FacebookVideoDownloaderExperience";

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
    <>
      <FacebookVideoDownloaderExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
