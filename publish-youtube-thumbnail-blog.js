// publish-youtube-thumbnail-blog.js
// One-off script to publish the "How to Download YouTube Thumbnails" article.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-youtube-thumbnail-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-youtube-thumbnail-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-download-youtube-thumbnails-hd";
const TITLE =
  "How to Download YouTube Thumbnails in HD (Free, Any Video — 2026)";
const EXCERPT =
  "Learn how to download any YouTube thumbnail in HD — videos and Shorts — in every resolution, free and without an app. Step-by-step guide plus thumbnail design tips that win the click.";
const CATEGORY = "YouTube";
const TAGS = [
  "download youtube thumbnail",
  "youtube thumbnail downloader",
  "youtube thumbnail hd",
  "youtube thumbnail grabber",
  "save youtube thumbnail",
  "youtube shorts thumbnail",
  "get youtube thumbnail from url",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I download a YouTube thumbnail?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copy the YouTube video URL, paste it into a free YouTube thumbnail downloader like ShopYor's, choose a resolution, and click Save. The original full-quality image downloads straight to your device — no screenshots or apps needed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the highest resolution YouTube thumbnail available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The maximum-resolution thumbnail (maxresdefault) is 1280×720 pixels, which is true HD. Not every video has a max-res version uploaded; in that case the next best size, such as SD (640×480) or HQ (480×360), is used instead.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download the thumbnail of a YouTube Short?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Paste the Shorts URL (youtube.com/shorts/...) into the downloader and it extracts the thumbnail exactly like a regular video.",
      },
    },
    {
      "@type": "Question",
      name: "Is it legal to download a YouTube thumbnail?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Downloading a thumbnail for personal use, reference or inspiration is generally fine. Thumbnails are copyrighted by their creators, so don't republish someone else's thumbnail as your own or use it commercially without permission.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an app to download YouTube thumbnails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The tool runs in any browser on iPhone, Android, Windows and Mac. There's nothing to install — just paste the link and save the image.",
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
      name: "How to Download YouTube Thumbnails in HD",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>The thumbnail is the most valuable real estate on YouTube. It's the first thing a viewer sees, and it decides — in a fraction of a second — whether they click or scroll past. So it's no surprise that creators, marketers and designers constantly want to <strong>download YouTube thumbnails</strong>: to study what's working, build mockups, or save inspiration.</p>

<p>The problem is YouTube gives you no download button for thumbnails. The good news is you don't need one. In this guide I'll show you how to grab any thumbnail — from a normal video or a Short — in full HD, free, in about ten seconds, using the <a href="/tools/youtube-thumbnail">YouTube Thumbnail Downloader</a>.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#why">Why Download YouTube Thumbnails?</a></li>
  <li><a href="#how-to">How to Download a YouTube Thumbnail (Step by Step)</a></li>
  <li><a href="#resolutions">YouTube Thumbnail Resolutions Explained</a></li>
  <li><a href="#mobile">Downloading on Mobile vs. Desktop</a></li>
  <li><a href="#legal">Is It Legal? Usage Rights Explained</a></li>
  <li><a href="#design">What Winning Thumbnails Have in Common</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="why">Why Download YouTube Thumbnails?</h2>
<p>There are more legitimate reasons than you might think:</p>
<ul>
  <li><strong>Competitor research</strong> — study the colors, text and layout of thumbnails ranking in your niche.</li>
  <li><strong>Design inspiration</strong> — build a swipe file of thumbnails you admire.</li>
  <li><strong>Mockups and presentations</strong> — drop real thumbnails into a content plan or pitch deck.</li>
  <li><strong>Recovering your own</strong> — grab the high-res version of a thumbnail you uploaded but lost the source for.</li>
  <li><strong>A/B reference</strong> — compare your thumbnail against the top results for the same search.</li>
</ul>
<p>A screenshot won't cut it — it's low quality and the wrong size. Downloading pulls the <strong>original image straight from YouTube</strong>, exactly as uploaded.</p>

<hr />

<h2 id="how-to">How to Download a YouTube Thumbnail (Step by Step)</h2>
<p>Here's the entire process with the free <a href="/tools/youtube-thumbnail">YouTube Thumbnail Downloader</a>:</p>

<ol>
  <li><strong>Copy the video URL.</strong> Open the YouTube video or Short and copy its link from the address bar or the Share button.</li>
  <li><strong>Paste it into the tool.</strong> Go to the <a href="/tools/youtube-thumbnail">thumbnail downloader</a> and paste the link into the box.</li>
  <li><strong>Click Get Thumbnails.</strong> Every available resolution appears instantly — Max (HD), SD, HQ and MQ.</li>
  <li><strong>Pick a size and Save.</strong> Click Save on the resolution you want and the image downloads straight to your device. You can also copy the direct image URL.</li>
</ol>

<p style="text-align:center;"><strong><a href="/tools/youtube-thumbnail">→ Download a YouTube thumbnail now</a></strong></p>

<hr />

<h2 id="resolutions">YouTube Thumbnail Resolutions Explained</h2>
<p>Every YouTube video stores several thumbnail sizes. Knowing the difference helps you pick the right one.</p>

<table>
  <thead>
    <tr><th>Quality</th><th>Dimensions</th><th>Best for</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Max Resolution</strong></td><td>1280 × 720</td><td>HD reposts, blog headers, presentations</td></tr>
    <tr><td><strong>Standard (SD)</strong></td><td>640 × 480</td><td>General use, social posts</td></tr>
    <tr><td><strong>High Quality (HQ)</strong></td><td>480 × 360</td><td>Previews and reference</td></tr>
    <tr><td><strong>Medium (MQ)</strong></td><td>320 × 180</td><td>Small previews, lists</td></tr>
  </tbody>
</table>

<p>Always grab <strong>Max Resolution</strong> when it's available. Some older or low-view videos never had a max-res thumbnail uploaded, in which case the tool simply shows the next best size.</p>

<hr />

<h2 id="mobile">Downloading on Mobile vs. Desktop</h2>
<p>The tool works in any browser, but saving an image differs slightly by device.</p>

<h3>On Desktop (Windows / Mac)</h3>
<p>Click <strong>Save</strong> and the JPG drops straight into your Downloads folder. That's it.</p>

<h3>On Android</h3>
<p>Tap <strong>Save</strong> and the image goes to your Downloads or Gallery automatically.</p>

<h3>On iPhone (iOS)</h3>
<p>Tap <strong>Save</strong>, and if the image opens in a new tab, press and hold it and choose <strong>"Add to Photos"</strong> or "Save to Files." iOS handles downloads a little differently, but the image is yours in two taps.</p>

<hr />

<h2 id="legal">Is It Legal? Usage Rights Explained</h2>
<p>This is the part people skip — don't. Downloading a thumbnail for <strong>personal use, study or inspiration is generally fine.</strong> But thumbnails are creative works protected by copyright, owned by the creator who made them.</p>
<p>So the rule of thumb:</p>
<ul>
  <li>✅ Save thumbnails to analyze design trends or for private reference.</li>
  <li>✅ Use them in an internal pitch or content plan.</li>
  <li>❌ Re-upload someone else's thumbnail as your own.</li>
  <li>❌ Use a downloaded thumbnail commercially without permission.</li>
</ul>
<p>When in doubt, treat someone's thumbnail the way you'd want yours treated.</p>

<hr />

<h2 id="design">What Winning Thumbnails Have in Common</h2>
<p>Once you've downloaded a few dozen top-performing thumbnails, the patterns jump out. The best ones almost always:</p>
<ul>
  <li><strong>Use bold, readable text</strong> — usually 3 to 5 words, large enough to read on a phone.</li>
  <li><strong>Have high contrast</strong> — bright colors that pop against YouTube's white and dark themes.</li>
  <li><strong>Show a clear focal point</strong> — often an expressive face or a single hero object.</li>
  <li><strong>Avoid the bottom-right corner</strong> — that's where the video timestamp covers your design.</li>
  <li><strong>Are designed at 1280×720</strong> — so they stay crisp on every screen size.</li>
</ul>
<p>Want to study the competition properly? Download their thumbnails, line them up, and you'll see exactly what's winning the click in your niche.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How do I download a YouTube thumbnail?</h3>
<p>Copy the video URL, paste it into the free <a href="/tools/youtube-thumbnail">YouTube thumbnail downloader</a>, pick a resolution and click Save. The original image downloads instantly.</p>

<h3>What is the highest resolution YouTube thumbnail available?</h3>
<p>The max-resolution thumbnail is 1280×720 (HD). If a video doesn't have one, the next best size is used automatically.</p>

<h3>Can I download the thumbnail of a YouTube Short?</h3>
<p>Yes. Paste the Shorts URL and the tool extracts the thumbnail just like a normal video.</p>

<h3>Is it legal to download a YouTube thumbnail?</h3>
<p>For personal use and reference, generally yes. Don't republish someone else's thumbnail as your own or use it commercially without permission.</p>

<h3>Do I need an app to download YouTube thumbnails?</h3>
<p>No. It runs in any browser on any device — nothing to install.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Downloading YouTube thumbnails is one of the simplest yet most useful habits a creator can build. Whether you're researching competitors, collecting inspiration, or recovering your own artwork, you get the original HD image in seconds — no screenshots, no apps, no cost.</p>

<p><strong>Try it on your favorite channel right now</strong> and start your own swipe file of thumbnails that win the click.</p>

<p style="text-align:center;"><strong><a href="/tools/youtube-thumbnail">→ Open the free YouTube Thumbnail Downloader</a></strong></p>

<p>Go deeper: <a href="/blog/youtube-thumbnail-downloader-hd">YouTube Thumbnail Downloader HD — save any thumbnail in high definition</a> and <a href="/blog/online-youtube-thumbnail-download">Download YouTube Video Thumbnails Online (No App)</a>.</p>

<p>Round out your toolkit with our <a href="/tools/youtube-tags-extractor">YouTube Tags Extractor</a>, <a href="/tools/youtube-video-downloader">YouTube Video Downloader</a>, or browse <a href="/tools">all free creator tools</a>.</p>

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

    let author =
      (await users.findOne({ role: "admin" })) || (await users.findOne({}));
    const authorName = author?.name || author?.email || "Shopyor Team";
    const authorId = author?._id || null;

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
        $setOnInsert: { createdAt: now, views: 0 },
      },
      { upsert: true },
    );

    console.log("Author:", authorName, authorId ? `(${authorId})` : "(no id)");
    console.log("Word count:", wordCount, "| Reading time:", readingTime, "min");
    if (result.upsertedId) console.log("✅ Published NEW post:", result.upsertedId);
    else console.log("✅ Updated existing post (matched:", result.matchedCount + ")");
    console.log("URL: https://www.shopyor.com/blog/" + SLUG);
  } finally {
    await client.close();
  }
}

run().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
