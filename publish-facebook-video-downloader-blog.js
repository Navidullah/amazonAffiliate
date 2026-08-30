// publish-facebook-video-downloader-blog.js
// One-off script to publish the "How to Download Facebook Videos" article
// into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-facebook-video-downloader-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-facebook-video-downloader-blog.js` again.",
  );
  process.exit(1);
}

// Keyword strategy (US Keyword Planner pull, Aug 2026): head term "facebook
// video downloader" plus the device/format long-tails that actually rank for
// low-DA sites — "on iphone", "on android", "reels", "hd", "to mp4", "live
// video", "group video". Deliberately does NOT target "private facebook
// video downloader" or "facebook to mp3" — the tool only supports public
// videos and outputs MP4, so those searches are answered honestly in the FAQ
// (redirecting the reader) rather than used as ranking bait.
const SLUG = "how-to-download-facebook-videos";
const TITLE = "How to Download Facebook Videos in 2026 (iPhone, Android, PC)";
const EXCERPT =
  "A real, no-nonsense walkthrough for saving public Facebook videos and Reels to your phone or computer — no login, no app, no watermark. Works on iPhone, Android, and desktop.";
const CATEGORY = "Video Downloading";
const TAGS = [
  "facebook video downloader",
  "download facebook video",
  "facebook reels download",
  "facebook video downloader hd",
  "download facebook video on iphone",
  "download facebook video on android",
  "facebook live video download",
  "download facebook group video",
];

// FAQ + Breadcrumb JSON-LD embedded in the body so Google can surface rich
// results (BlogPosting schema is already added by the page component).
// IMPORTANT: every `text` below is reproduced verbatim in the visible FAQ
// section of CONTENT — schema and UI must stay in sync.
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I download a Facebook video without an app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copy the link to the video (tap the three-dot menu and choose Copy link on mobile, or copy the URL from the address bar on desktop), then paste it into a browser-based downloader like Shopyor's. It fetches the file and hands it back as an MP4 you can save directly — no app install, no browser extension, and it works the same on a phone or a laptop.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download Facebook Reels the same way?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Reels are just short-form Facebook videos, so the same copy-link-and-paste process works. Open the Reel, copy its link, and paste it into the downloader — you'll get the same HD or SD choice you'd get for a regular video post.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't I download a video someone sent me from a private group?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A proper downloader only accesses what's already public — the same content anyone could watch without logging in. If a video sits behind a login wall, inside a closed group, or is shared friends-only, the tool can't reach it, because it never signs in as a Facebook user or bypasses privacy settings. That's not a bug to work around; it's what keeps the tool on the right side of Facebook's terms and respects the original poster's chosen audience.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert a Facebook video to MP3 instead of MP4?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with a video downloader like this one — it's built specifically to save the video file as MP4, and audio-only extraction is a separate job that needs its own converter. If you only need the sound, download the MP4 first and run it through a dedicated video-to-audio converter afterward.",
      },
    },
    {
      "@type": "Question",
      name: "Does the quality stay the same as the original upload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, within the limits of what the uploader posted. If the original video was uploaded in HD, you can download that same HD file — the downloader isn't re-encoding or upscaling it, just fetching the version Facebook already stores. If the uploader only posted in SD, that's the best quality available, because no tool can add detail that was never in the source file.",
      },
    },
    {
      "@type": "Question",
      name: "Is it legal to download Facebook videos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saving a public video for personal use — watching offline, archiving a post before it's deleted, or keeping a backup of your own content — is generally fine. Re-uploading someone else's video and claiming it as your own, or using it commercially without permission, is a copyright issue regardless of which tool you used to download it. When in doubt, only download videos you have the right to use, and credit the original creator if you share it further.",
      },
    },
  ],
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.shopyor.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.shopyor.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Download Facebook Videos",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Someone posts a video in a Facebook group — a recipe, a tutorial, a clip from a local event — and you want to keep it. Not share it, not repost it, just have it saved on your phone so it doesn't vanish if the post gets deleted. Facebook doesn't give you a "Save to device" button for this, which is annoying, but it's a five-second fix once you know where to look.</p>

<p>This guide covers the whole thing: how to grab the link, how to download it without installing anything, what actually works on an iPhone versus Android versus a laptop, and what a downloader genuinely can and can't do (spoiler: private videos and Stories are off the table, on purpose). Want to jump straight in? Open the <a href="/tools/facebook-video-downloader">free Facebook video downloader</a> and paste a link.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#link">Step 1: Find the Video Link</a></li>
  <li><a href="#download">Step 2: Download It</a></li>
  <li><a href="#iphone">On iPhone</a></li>
  <li><a href="#android">On Android</a></li>
  <li><a href="#pc">On PC or Mac</a></li>
  <li><a href="#reels">Downloading Facebook Reels</a></li>
  <li><a href="#limits">What You Can't Download (and Why)</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="link">Step 1: Find the Video Link</h2>
<p>Every downloader needs the same starting point — the video's direct link, not just a screenshot of it or a description of where it is.</p>
<ul>
  <li><strong>On the Facebook app:</strong> open the video, tap the three dots in the top-right corner of the post, then tap <em>Copy link</em>. Facebook puts the full URL on your clipboard.</li>
  <li><strong>On desktop:</strong> click the timestamp under the poster's name (something like "3h" or a date) — that opens the video on its own page. Copy the URL straight from your browser's address bar.</li>
</ul>
<p>Both the long facebook.com links and the shortened fb.watch ones work fine. If a link doesn't work in the downloader, the most common reason is that the post isn't actually public — more on that below.</p>

<hr />

<h2 id="download">Step 2: Download It</h2>
<p>Paste the link into the <a href="/tools/facebook-video-downloader">Shopyor Facebook video downloader</a>, let it fetch the video, and you'll be offered HD and SD versions to pick from. Choose one, tap download, and the MP4 lands wherever your browser normally saves files. No login, no app, no watermark stamped across the video.</p>
<blockquote><p><strong>Why no login required?</strong> The tool only reads content that's already public — the same video anyone could watch without a Facebook account. It never signs in on your behalf, so there's nothing to authorize and nothing of yours it could access even if it wanted to.</p></blockquote>

<hr />

<h2 id="iphone">On iPhone</h2>
<p>Safari doesn't let you "save video" from a webpage the way you'd save a photo, so the browser-based route is actually the easiest option on iOS. Copy the link from the Facebook app, open the downloader in Safari, paste, and download — the video saves into your Files app or prompts to open in Photos, depending on your iOS version. No app to find in the App Store, nothing to trust with permissions.</p>

<hr />

<h2 id="android">On Android</h2>
<p>Same process, and Chrome on Android makes it slightly smoother — downloaded files go straight to your Downloads folder, and most Android phones will offer to move a video into your gallery from there. If you're saving several videos in a row, they'll all land in the same folder, so it's easy to batch-move them afterward.</p>

<hr />

<h2 id="pc">On PC or Mac</h2>
<p>This is where it's genuinely simplest — copy the link from the Facebook post, paste it into the downloader in Chrome, Edge, Firefox, or Safari, and the MP4 downloads to your usual Downloads folder like any other file. No extension to install, and nothing to trust with your Facebook session, since the tool never asks for one.</p>

<hr />

<h2 id="reels">Downloading Facebook Reels</h2>
<p>Reels are handled exactly the same way — they're just shorter, vertical Facebook videos under the hood. Open the Reel, copy its link the same way you would a regular video post, and paste it into the downloader. You'll get the same HD/SD choice, and the output is a normal MP4 file, ready to save or move into whatever folder you use for that kind of clip.</p>

<hr />

<h2 id="limits">What You Can't Download (and Why)</h2>
<p>A downloader that respects privacy has real limits, and it's worth knowing them upfront rather than hitting an error and assuming the tool is broken:</p>
<ul>
  <li><strong>Private videos and friends-only posts:</strong> not supported. The tool never logs in as a Facebook user, so it can only see what a logged-out visitor could already see.</li>
  <li><strong>Closed or secret groups:</strong> same reasoning — if you'd need to be a member to view it, a downloader can't reach it either.</li>
  <li><strong>Stories:</strong> Stories are built to expire after 24 hours by design, and downloading them defeats that entirely, so this isn't supported.</li>
  <li><strong>MP3/audio-only output:</strong> a video downloader hands you the video file (MP4); pulling just the audio track is a different job for a separate audio converter.</li>
</ul>
<p>Live videos are the one exception worth calling out: you can download a Facebook Live broadcast, but only after it has ended and Facebook has finished processing the replay — trying mid-stream won't work yet.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How do I download a Facebook video without an app?</h3>
<p>Copy the link to the video (tap the three-dot menu and choose Copy link on mobile, or copy the URL from the address bar on desktop), then paste it into a browser-based downloader like Shopyor's. It fetches the file and hands it back as an MP4 you can save directly — no app install, no browser extension, and it works the same on a phone or a laptop.</p>

<h3>Can I download Facebook Reels the same way?</h3>
<p>Yes. Reels are just short-form Facebook videos, so the same copy-link-and-paste process works. Open the Reel, copy its link, and paste it into the downloader — you'll get the same HD or SD choice you'd get for a regular video post.</p>

<h3>Why can't I download a video someone sent me from a private group?</h3>
<p>A proper downloader only accesses what's already public — the same content anyone could watch without logging in. If a video sits behind a login wall, inside a closed group, or is shared friends-only, the tool can't reach it, because it never signs in as a Facebook user or bypasses privacy settings. That's not a bug to work around; it's what keeps the tool on the right side of Facebook's terms and respects the original poster's chosen audience.</p>

<h3>Can I convert a Facebook video to MP3 instead of MP4?</h3>
<p>Not with a video downloader like this one — it's built specifically to save the video file as MP4, and audio-only extraction is a separate job that needs its own converter. If you only need the sound, download the MP4 first and run it through a dedicated video-to-audio converter afterward.</p>

<h3>Does the quality stay the same as the original upload?</h3>
<p>Yes, within the limits of what the uploader posted. If the original video was uploaded in HD, you can download that same HD file — the downloader isn't re-encoding or upscaling it, just fetching the version Facebook already stores. If the uploader only posted in SD, that's the best quality available, because no tool can add detail that was never in the source file.</p>

<h3>Is it legal to download Facebook videos?</h3>
<p>Saving a public video for personal use — watching offline, archiving a post before it's deleted, or keeping a backup of your own content — is generally fine. Re-uploading someone else's video and claiming it as your own, or using it commercially without permission, is a copyright issue regardless of which tool you used to download it. When in doubt, only download videos you have the right to use, and credit the original creator if you share it further.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Downloading a Facebook video really does come down to two steps: copy the link, paste it into a downloader. The parts worth remembering are the limits — public content only, video out means MP4 (not MP3), and Stories and private posts are intentionally off-limits. Everything else, from Reels to Live replays to group videos, works the same simple way on an iPhone, an Android phone, or a computer.</p>
<p><strong>Ready to save one?</strong> Open the <a href="/tools/facebook-video-downloader">free Shopyor Facebook Video Downloader</a>, paste a public video or Reel link, and download the MP4 in HD. Looking for other platforms? Try the <a href="/tools/instagram-video-downloader">Instagram video downloader</a> or the <a href="/tools/free-tiktok-video-downloader">TikTok video downloader</a>, or browse <a href="/tools">all Shopyor tools</a>.</p>

<script type="application/ld+json">${JSON.stringify(FAQ_SCHEMA)}</script>
<script type="application/ld+json">${JSON.stringify(BREADCRUMB_SCHEMA)}</script>
`.trim();

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("app");
    const blogs = db.collection("blogs");
    const users = db.collection("users");

    // Attribute to an admin user (fallback to any user, then a default).
    let author =
      (await users.findOne({ role: "admin" })) ||
      (await users.findOne({}));
    const authorName = author?.name || author?.email || "Shopyor Team";
    const authorId = author?._id || null;

    // Reading time from plain-text word count (~200 wpm).
    const plain = CONTENT.replace(/<[^>]+>/g, " ");
    const wordCount = plain.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const now = new Date();

    const result = await blogs.updateOne(
      { slug: SLUG },
      {
        $set: {
          title: TITLE,
          content: CONTENT,
          excerpt: EXCERPT,
          category: CATEGORY,
          tags: TAGS,
          author: authorName,
          authorId,
          readingTime,
          isPublished: true,
          updatedAt: now,
          publishedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
          views: 0,
        },
      },
      { upsert: true },
    );

    console.log("Author:", authorName, authorId ? `(${authorId})` : "(no id)");
    console.log("Word count:", wordCount, "| Reading time:", readingTime, "min");
    if (result.upsertedId) {
      console.log("✅ Published NEW post:", result.upsertedId);
    } else {
      console.log("✅ Updated existing post (matched:", result.matchedCount + ")");
    }
    console.log("URL: https://www.shopyor.com/blog/" + SLUG);
  } finally {
    await client.close();
  }
}

run().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
