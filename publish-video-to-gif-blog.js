// publish-video-to-gif-blog.js
// One-off script to publish the "How to Convert a Video to GIF" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-video-to-gif-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-video-to-gif-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-convert-a-video-to-gif-without-losing-quality";
const TITLE =
  "How to Convert a Video to a GIF Without a Huge File Size — 2026 Guide";
const EXCERPT =
  "Learn how to turn any MP4, WebM, MOV, or AVI clip into a clean, shareable GIF — and how to control FPS, width, and quality so the file isn't enormous.";
const CATEGORY = "Video Editing";
const TAGS = [
  "convert video to gif online free",
  "video to gif converter no watermark",
  "make a gif from a video clip",
  "reduce gif file size",
  "mp4 to gif converter",
  "gif fps settings explained",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does my video get uploaded to a server to convert it to GIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with a browser-based converter — conversion happens entirely on your device using JavaScript running in your browser. Your video file never leaves your device and is never sent to any server, which also means there's no upload wait time for large files.",
      },
    },
    {
      "@type": "Question",
      name: "What video formats can I convert to GIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MP4, WebM, MOV, and AVI files all work. MP4 is the most reliable format across every browser, so if you have a choice of export format from your phone or editing app, MP4 is the safest pick.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my output GIF file so large?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GIFs store color data frame-by-frame, which makes them inherently larger than compressed video for the same clip. Reduce file size by lowering the frame rate (try 10-12 FPS), reducing the width to 320-480px, choosing a lower quality setting, and limiting the source clip to under 10 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "How many frames per second should I use for a GIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "10-15 FPS is the sweet spot for most content — smooth enough to look natural, small enough to share easily on chat apps and social media. Reserve 20-24 FPS for fast-moving content like sports clips or action scenes, where motion blur becomes visible at lower frame rates.",
      },
    },
    {
      "@type": "Question",
      name: "Can I make the GIF loop continuously?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — looping is standard for GIFs and is usually on by default. Turn it off only if you specifically want the animation to play once and stop. Most platforms that accept GIFs, including Giphy, Tenor, Discord, and Slack, expect a looping file.",
      },
    },
    {
      "@type": "Question",
      name: "What's the maximum video length or size I can convert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Browser-based converters typically support video files up to several hundred megabytes, though since conversion runs on your own device, very large files take longer depending on your hardware. For a manageable GIF file size, keep the source clip itself short — under 10-15 seconds works best regardless of the original file's size.",
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
      name: "How to Convert a Video to a GIF Without a Huge File Size",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>GIFs are everywhere — chat apps, forums, social media replies, blog posts — because they autoplay without sound and work in almost any context a static image or a video file can't. <strong>Turning a video clip into a GIF takes one upload and a few settings, but getting a GIF that's both good-looking and a reasonable file size takes knowing what those settings actually do.</strong></p>

<p>This guide covers exactly how to convert any video clip into a GIF, and — more importantly — how to keep the output from turning into a 40MB file that's too large to actually share anywhere.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#how-to">How to Convert a Video to a GIF (Step by Step)</a></li>
  <li><a href="#why-large">Why GIFs Get So Large So Fast</a></li>
  <li><a href="#fps">Choosing the Right Frame Rate (FPS)</a></li>
  <li><a href="#width">Choosing the Right Width</a></li>
  <li><a href="#quality">Quality Settings Explained</a></li>
  <li><a href="#looping">Should Your GIF Loop?</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="how-to">How to Convert a Video to a GIF (Step by Step)</h2>
<p><strong>Step 1: Open the converter.</strong><br />Go to the <a href="/tools/video-to-gif">Shopyor Video to GIF Converter</a>.</p>
<p><strong>Step 2: Upload your clip.</strong><br />Drag in an MP4, WebM, MOV, or AVI file. Conversion runs entirely in your browser, so there's no waiting on an upload to a server.</p>
<p><strong>Step 3: Trim to the part you want.</strong><br />Most source clips are longer than you need for a GIF — trim to just the few seconds that matter. Shorter clips produce dramatically smaller files.</p>
<p><strong>Step 4: Set FPS, width, and quality.</strong><br />Adjust the three settings based on where you're sharing the GIF (see the sections below for specifics).</p>
<p><strong>Step 5: Convert and download.</strong><br />Your GIF downloads directly, ready to share — no watermark, no signup.</p>

<hr />

<h2 id="why-large">Why GIFs Get So Large So Fast</h2>
<p>Unlike a video file, which uses heavy compression (motion prediction, frame interpolation) to keep file size down, a GIF stores color and pixel data for <strong>every single frame independently</strong>. A 5-second clip at 30 FPS is 150 separate frames, each needing its own color data — that adds up fast, especially at higher resolutions.</p>
<p>This is why the three controls below — FPS, width, and quality — matter so much more for GIFs than they would for an equivalent video export.</p>

<hr />

<h2 id="fps">Choosing the Right Frame Rate (FPS)</h2>
<table>
  <thead>
    <tr><th>FPS</th><th>Best for</th><th>Trade-off</th></tr>
  </thead>
  <tbody>
    <tr><td>5-10</td><td>Smallest possible file size, simple content</td><td>Visibly choppy for any real motion</td></tr>
    <tr><td>10-15</td><td>Most content — reactions, short clips, memes</td><td>Good balance of smoothness and size</td></tr>
    <tr><td>20-24</td><td>Fast motion: sports, action, dancing</td><td>Significantly larger file size</td></tr>
  </tbody>
</table>
<p>Unless your clip has genuinely fast motion, 10-15 FPS will look smooth to almost anyone watching casually, and keeps the file size manageable.</p>

<hr />

<h2 id="width">Choosing the Right Width</h2>
<p>GIF width has a bigger impact on file size than most people expect, since every pixel needs color data for every frame. For most sharing contexts — Discord, Slack, WhatsApp, forum replies — a width of <strong>320-480 pixels</strong> looks perfectly sharp on a phone or chat window and keeps the file size reasonable. Reserve a full 720px+ width only for GIFs you specifically intend to display large, like an embedded blog post header.</p>

<hr />

<h2 id="quality">Quality Settings Explained</h2>
<p>The quality setting controls how many distinct colors the GIF uses and how it blends pixels at color boundaries (dithering). Lower quality uses fewer colors and a simpler dithering pattern — this renders faster and produces a smaller file, but can look slightly blocky on gradients or complex footage. Higher quality uses more colors and finer dithering for smoother color transitions, at the cost of a larger file. For most casual sharing, medium quality is the right default; bump it up only if the GIF will be viewed at a larger size or contains a lot of color gradient (like a sunset or skin tones in close-up).</p>

<hr />

<h2 id="looping">Should Your GIF Loop?</h2>
<p>Almost always, yes. Looping is the entire reason GIFs feel different from a short video clip — the action repeats seamlessly, which is exactly the effect most platforms and viewers expect. Turn looping off only for a specific creative reason, like a GIF meant to show a single transformation or reveal that shouldn't repeat.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Does my video get uploaded to a server to convert it to GIF?</h3>
<p>Not with a browser-based converter — conversion happens entirely on your device using JavaScript running in your browser. Your video file never leaves your device and is never sent to any server, which also means there's no upload wait time for large files.</p>

<h3>What video formats can I convert to GIF?</h3>
<p>MP4, WebM, MOV, and AVI files all work. MP4 is the most reliable format across every browser, so if you have a choice of export format from your phone or editing app, MP4 is the safest pick.</p>

<h3>Why is my output GIF file so large?</h3>
<p>GIFs store color data frame-by-frame, which makes them inherently larger than compressed video for the same clip. Reduce file size by lowering the frame rate (try 10-12 FPS), reducing the width to 320-480px, choosing a lower quality setting, and limiting the source clip to under 10 seconds.</p>

<h3>How many frames per second should I use for a GIF?</h3>
<p>10-15 FPS is the sweet spot for most content — smooth enough to look natural, small enough to share easily on chat apps and social media. Reserve 20-24 FPS for fast-moving content like sports clips or action scenes, where motion blur becomes visible at lower frame rates.</p>

<h3>Can I make the GIF loop continuously?</h3>
<p>Yes — looping is standard for GIFs and is usually on by default. Turn it off only if you specifically want the animation to play once and stop. Most platforms that accept GIFs, including Giphy, Tenor, Discord, and Slack, expect a looping file.</p>

<h3>What's the maximum video length or size I can convert?</h3>
<p>Browser-based converters typically support video files up to several hundred megabytes, though since conversion runs on your own device, very large files take longer depending on your hardware. For a manageable GIF file size, keep the source clip itself short — under 10-15 seconds works best regardless of the original file's size.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>A good GIF comes down to three settings working together: a frame rate that matches your content's motion, a width sized for where you're sharing it, and a quality level that doesn't go higher than the footage actually needs. Get those three right and you'll have a GIF that looks sharp without becoming an unshareable 30MB file.</p>
<p><strong>Ready to convert your clip?</strong> Head to the <a href="/tools/video-to-gif">Shopyor Video to GIF Converter</a>, upload your video, and download your GIF in seconds — free, no signup, no watermark.</p>

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
      (await users.findOne({ role: "admin" })) ||
      (await users.findOne({}));
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
        },
        $setOnInsert: {
          publishedAt: now,
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
