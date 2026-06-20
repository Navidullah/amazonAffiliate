// publish-imagecompressor-blog.js
// One-off script to publish the "How to Reduce Image File Size" article into
// MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-imagecompressor-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-imagecompressor-blog.js` again.",
  );
  process.exit(1);
}

// Informational long-tail primary keyword: "how to reduce image file size".
// Tutorial intent — complements (does not cannibalize) the transactional
// /tools/image-compressor page, and funnels readers to it.
const SLUG = "how-to-reduce-image-file-size";
const TITLE =
  "How to Reduce Image File Size (Without Losing Quality) — 2026 Guide";
const EXCERPT =
  "Learn how to reduce image file size without losing quality — compress an image to 100 KB, shrink photos for email or the web, and pick the right format. Free compressor inside.";
const CATEGORY = "Image Editing";
const TAGS = [
  "how to reduce image file size",
  "compress image to 100kb",
  "reduce image size without losing quality",
  "make image smaller for email",
  "compress jpg",
  "reduce png file size",
  "compress image for website",
  "jpg vs png vs webp",
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
      name: "How do I reduce image file size without losing quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo to a compressor, keep the quality slider around 60–80%, and export as JPEG or WebP. At that level the file shrinks dramatically while the image looks visually identical. For logos and graphics, use PNG to stay lossless. Resizing the dimensions first makes the file even smaller.",
      },
    },
    {
      "@type": "Question",
      name: "How do I compress an image to 100 KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lower the quality slider and choose WebP or JPEG, then compress and read the new size shown next to the result. If it's still above 100 KB, drop the quality a little more or reduce the image's dimensions first — smaller dimensions make hitting a specific KB target much easier than quality alone.",
      },
    },
    {
      "@type": "Question",
      name: "How can I make an image smaller for email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most email providers cap attachments at around 20–25 MB, but smaller is better for deliverability. Resize the image to the dimensions you actually need (1,600 px wide is plenty for most uses), then compress it to JPEG or WebP at 70% quality. That typically turns a multi-megabyte photo into a few hundred kilobytes.",
      },
    },
    {
      "@type": "Question",
      name: "Which format makes the smallest file — JPG, PNG, or WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP usually produces the smallest file at the same visual quality, and it's supported by all modern browsers. Use JPEG for photographs when you need maximum compatibility, PNG for graphics and anything needing transparency, and WebP as the best default for the web.",
      },
    },
    {
      "@type": "Question",
      name: "Does reducing image size lower its resolution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. There are two different things: compression reduces file size while keeping the same pixel dimensions, and resizing reduces the actual width and height. Compressing alone keeps your resolution; you only lose resolution if you deliberately resize the dimensions down.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to compress images in the browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — and it's more private. A browser-based compressor like Shopyor processes your image locally on your device, so the file is never uploaded to or stored on a server. Nothing leaves your computer or phone, which makes it safe for personal photos, IDs, and confidential documents.",
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
      name: "How to Reduce Image File Size",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Big image files slow down websites, bounce off email size limits, and eat up storage. The fix is simple: <strong>you can reduce an image's file size by 70–90% without any visible loss in quality</strong> — and you don't need Photoshop or any paid software to do it.</p>

<p>In this guide you'll learn exactly <strong>how to reduce image file size</strong>, how to hit a specific target like 100 KB, how to shrink photos for email and the web, and how to choose the right format so your images stay sharp. Want to skip ahead? Open the <a href="/tools/image-compressor">free image compressor</a> and drop in your photo.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#why">Why Image File Size Matters</a></li>
  <li><a href="#how-to">How to Reduce Image File Size (Step by Step)</a></li>
  <li><a href="#target-size">How to Compress an Image to a Target Size (100 KB)</a></li>
  <li><a href="#email-web">Reducing Image Size for Email and the Web</a></li>
  <li><a href="#formats">Which Format Should You Use? (JPG vs PNG vs WebP)</a></li>
  <li><a href="#resize-vs-compress">Resize vs. Compress — and the Right Order</a></li>
  <li><a href="#quality-tips">Tips for Keeping Quality High</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="why">Why Image File Size Matters</h2>
<p>An image's file size affects far more than storage. Oversized images are one of the most common causes of slow pages — and speed has real consequences:</p>
<ul>
  <li><strong>Page speed and SEO:</strong> Large images hurt <a href="https://web.dev/articles/lcp" target="_blank" rel="noopener noreferrer">Largest Contentful Paint</a>, a Core Web Vital that Google uses as a ranking signal.</li>
  <li><strong>Bounce rate:</strong> Visitors abandon pages that take more than a few seconds to load, especially on mobile data.</li>
  <li><strong>Email limits:</strong> Most providers cap attachments around 20–25 MB, and bulky images can get bounced or flagged.</li>
  <li><strong>Bandwidth and storage:</strong> Smaller files save hosting costs and upload time.</li>
</ul>
<p>The good news is that most photos contain far more data than they need for screen viewing, so compression frees up huge savings with no visible downside.</p>

<hr />

<h2 id="how-to">How to Reduce Image File Size (Step by Step)</h2>
<p>The fastest, free way is a browser-based compressor — no install, no upload, no cost. Here's the whole process.</p>

<h3>Step 1: Open the image compressor</h3>
<p>Go to the <a href="/tools/image-compressor">Shopyor image compressor</a>. It runs entirely in your browser, so your photo never leaves your device.</p>

<h3>Step 2: Upload your image</h3>
<p>Drag and drop or click to select a <strong>JPG, PNG, or WebP</strong> file. The original loads instantly so you can see its starting size.</p>

<h3>Step 3: Set the quality and format</h3>
<p>Slide the quality control to balance size against sharpness — <strong>60–80% is the sweet spot for photos</strong> — and pick your output format (JPEG, PNG, or WebP). WebP usually gives the smallest file at the same quality.</p>

<h3>Step 4: Compress and download</h3>
<p>Click compress. You'll see the before/after sizes side by side, along with the percentage saved. Download the smaller image and you're done.</p>

<blockquote><p><strong>Tip:</strong> Because everything happens locally, you can compress as many images as you like with no limits and no watermark.</p></blockquote>

<hr />

<h2 id="target-size">How to Compress an Image to a Target Size (100 KB)</h2>
<p>Sometimes you need to hit a specific limit — a job portal that wants a photo under 100 KB, or a form that rejects anything larger. Here's how to land on a target:</p>
<ol>
  <li><strong>Lower the quality first.</strong> Drop the slider toward 50–60% and compress; check the resulting size.</li>
  <li><strong>Switch to WebP or JPEG.</strong> These compress photos far smaller than PNG.</li>
  <li><strong>If it's still too big, reduce the dimensions.</strong> A 4000-pixel-wide photo carries far more data than a 1200-pixel one. Shrinking the dimensions is the most powerful way to hit a small KB target.</li>
  <li><strong>Re-check and fine-tune.</strong> Nudge quality up or down until the size readout lands just under your limit.</li>
</ol>
<p>For step 3, run the image through the <a href="/tools/image-resizer">image resizer</a> first, then compress — the combination makes hitting 100 KB easy.</p>

<hr />

<h2 id="email-web">Reducing Image Size for Email and the Web</h2>
<p>The right target depends on where the image is going.</p>

<h3>For email</h3>
<p>You rarely need full resolution in an email. Resize to around <strong>1,600 px on the long edge</strong> and compress to JPEG or WebP at ~70%. A multi-megabyte phone photo usually drops to a few hundred kilobytes — small enough to send instantly and view on any device.</p>

<h3>For websites and blogs</h3>
<p>Serve images at the size they actually display. A blog body image is often shown at 800–1200 px wide, so there's no reason to upload a 4000 px original. Resize to the display width, compress to WebP, and your pages will load noticeably faster — which helps both visitors and your search rankings.</p>

<hr />

<h2 id="formats">Which Format Should You Use? (JPG vs PNG vs WebP)</h2>
<p>The format you export decides how small the file can get and whether transparency survives.</p>
<table>
  <thead>
    <tr><th>Format</th><th>Best for</th><th>Transparency?</th><th>File size</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>JPEG</strong></td><td>Photographs, maximum compatibility</td><td>No</td><td>Small</td></tr>
    <tr><td><strong>PNG</strong></td><td>Logos, graphics, screenshots, transparency</td><td>Yes</td><td>Larger</td></tr>
    <tr><td><strong>WebP</strong></td><td>The web — best size at the same quality</td><td>Yes</td><td>Smallest</td></tr>
  </tbody>
</table>
<p><strong>Rule of thumb:</strong> photos → JPEG or WebP, graphics and transparency → PNG or WebP, and when in doubt for the web, WebP is the best modern default.</p>

<hr />

<h2 id="resize-vs-compress">Resize vs. Compress — and the Right Order</h2>
<p>These two are often confused, but they do different things:</p>
<ul>
  <li><strong>Compressing</strong> reduces the file size while keeping the same pixel dimensions.</li>
  <li><strong>Resizing</strong> reduces the actual width and height (and therefore the data) of the image.</li>
</ul>
<p>For the smallest possible file, do both — and in this order: <strong>resize first, then compress</strong>. Cutting the dimensions removes the bulk of the data, and compression then squeezes what's left. Doing it the other way around wastes effort. Use the <a href="/tools/image-resizer">image resizer</a> for step one and the <a href="/tools/image-compressor">image compressor</a> for step two.</p>

<hr />

<h2 id="quality-tips">Tips for Keeping Quality High</h2>
<ul>
  <li><strong>Stay in the 60–80% quality range</strong> for photos — below that, artifacts start to show.</li>
  <li><strong>Keep an original copy.</strong> Compression is one-way; archive the full-quality file before you compress.</li>
  <li><strong>Don't re-compress repeatedly.</strong> Each lossy save degrades the image a little; always go back to the original.</li>
  <li><strong>Match dimensions to display size</strong> so you're never serving more pixels than the screen shows.</li>
  <li><strong>Prefer WebP for the web</strong> to get the best quality-to-size ratio.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How do I reduce image file size without losing quality?</h3>
<p>Upload your photo to a compressor, keep the quality slider around 60–80%, and export as JPEG or WebP. At that level the file shrinks dramatically while the image looks visually identical. For logos and graphics, use PNG to stay lossless. Resizing the dimensions first makes the file even smaller.</p>

<h3>How do I compress an image to 100 KB?</h3>
<p>Lower the quality slider and choose WebP or JPEG, then compress and read the new size shown next to the result. If it's still above 100 KB, drop the quality a little more or reduce the image's dimensions first — smaller dimensions make hitting a specific KB target much easier than quality alone.</p>

<h3>How can I make an image smaller for email?</h3>
<p>Most email providers cap attachments at around 20–25 MB, but smaller is better for deliverability. Resize the image to the dimensions you actually need (1,600 px wide is plenty for most uses), then compress it to JPEG or WebP at 70% quality. That typically turns a multi-megabyte photo into a few hundred kilobytes.</p>

<h3>Which format makes the smallest file — JPG, PNG, or WebP?</h3>
<p>WebP usually produces the smallest file at the same visual quality, and it's supported by all modern browsers. Use JPEG for photographs when you need maximum compatibility, PNG for graphics and anything needing transparency, and WebP as the best default for the web.</p>

<h3>Does reducing image size lower its resolution?</h3>
<p>Not necessarily. There are two different things: compression reduces file size while keeping the same pixel dimensions, and resizing reduces the actual width and height. Compressing alone keeps your resolution; you only lose resolution if you deliberately resize the dimensions down.</p>

<h3>Is it safe to compress images in the browser?</h3>
<p>Yes — and it's more private. A browser-based compressor like Shopyor processes your image locally on your device, so the file is never uploaded to or stored on a server. Nothing leaves your computer or phone, which makes it safe for personal photos, IDs, and confidential documents.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Reducing image file size is one of the easiest wins for faster pages, smaller emails, and tidier storage. The recipe is simple: resize to the dimensions you actually need, compress to JPEG or WebP at 60–80% quality, and keep an original backup. Most images shrink by 70% or more with no visible difference.</p>
<p><strong>Here's what you learned in this guide:</strong></p>
<ul>
  <li>The exact step-by-step process to compress any image for free in your browser.</li>
  <li>How to hit a specific target size like 100 KB, and how to prep images for email and the web.</li>
  <li>How to choose between JPG, PNG, and WebP — and why you should resize before you compress.</li>
</ul>
<p><strong>Ready to shrink your images?</strong> Open the <a href="/tools/image-compressor">free Shopyor Image Compressor</a>, drop in a photo, and download a smaller version in seconds. Need to change dimensions first? Use the <a href="/tools/image-resizer">image resizer</a>, or browse <a href="/tools">all Shopyor tools</a>.</p>

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
