// publish-compress-image-under-2mb-blog.js
// One-off script to publish the "Compress an Image to Under 2MB / 1MB" article
// into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-compress-image-under-2mb-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-compress-image-under-2mb-blog.js` again.",
  );
  process.exit(1);
}

// Target-size long-tail keyword cluster (US Keyword Planner data, Aug 2026
// pull): "compress image to 2mb", "compress image to 1mb", "resize image to
// 2mb online", "image compressor to 2mb", "compress png to 2mb", "compress
// image to 5mb/10mb". Distinct from and non-cannibalizing with the existing
// "how-to-reduce-image-file-size" post, which targets the 100KB / general
// quality-loss cluster. This one matches the tool's real behavior: the
// compressor's own maxSizeMB option is hard-capped at 2MB
// (app/components/tools/ImageCompressorClient.jsx), so "under 2MB" is a
// claim the tool actually guarantees, not marketing copy.
const SLUG = "compress-image-under-2mb";
const TITLE =
  "How to Compress an Image to Under 2MB (or 1MB) — Free, No Signup";
const EXCERPT =
  "Need a photo under 2MB or 1MB for a job portal, visa form, or upload limit? Here's the fastest free way to compress any JPG, PNG, or WebP to a guaranteed size cap in your browser.";
const CATEGORY = "Image Editing";
const TAGS = [
  "compress image to 2mb",
  "compress image to 1mb",
  "resize image to 2mb online",
  "image compressor to 2mb",
  "compress png to 2mb",
  "compress image to 5mb",
  "reduce photo size for upload",
  "image size limit error",
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
      name: "How do I compress an image to under 2MB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload the photo to a browser-based compressor and export it as JPEG or WebP — most compressors, including Shopyor's, cap the output at 2MB automatically, so you don't have to guess a quality percentage. If your original is a very high-resolution PNG, converting to JPEG or WebP first makes it far easier to land under the limit.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get an image under 1MB specifically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compress to JPEG or WebP first, since PNG rarely gets small enough for photos. If the result is still over 1MB, lower the quality slider toward 50-60% and re-compress, or resize the dimensions down before compressing — a 4000px-wide photo carries far more data than a 1600px one, so shrinking the dimensions first makes hitting 1MB much easier.",
      },
    },
    {
      "@type": "Question",
      name: "Why do job portals, visa forms, and university applications set a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most of these systems were built years ago on limited server storage and bandwidth, and the size cap was never raised even as phone cameras produce much bigger files. A 12MP phone photo can easily be 4-8MB, well over a typical 1MB or 2MB portal limit, which is why so many applicants hit an upload error on file size alone.",
      },
    },
    {
      "@type": "Question",
      name: "Will compressing to 2MB make my photo blurry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at normal viewing sizes. A phone photo compressed from 6MB down to under 2MB at 70-80% JPEG or WebP quality looks visually identical on a screen or in a printed form photo slot — the loss only becomes visible if you zoom in far past 100% or print it poster-sized.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between resizing and compressing for hitting a size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compressing keeps the same width and height but reduces file size by simplifying the image data. Resizing actually shrinks the pixel dimensions, which removes far more data. For a stubborn file that won't drop below 1-2MB on quality alone, resize the dimensions down first, then compress — the two together get you there almost every time.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to compress ID photos or documents to hit an upload limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, as long as the compressor runs in your browser. Shopyor's image compressor processes the file locally on your device — it's never uploaded to a server just to be resized — so it's safe for passport photos, ID scans, and other sensitive images that a form is asking you to shrink.",
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
      name: "Compress an Image to Under 2MB",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>"File size too large" is one of the most common upload errors — a job portal, visa application, or university form sets a hard cap at 1MB or 2MB, and a modern phone photo can easily be 5-8MB. You don't need Photoshop to fix this. <strong>You can compress any photo to a guaranteed size cap for free, in your browser, in under a minute.</strong></p>

<p>This guide walks through exactly how to hit a 1MB or 2MB target, why these limits exist in the first place, and how to avoid the blurry-photo problem when you compress too aggressively. Want to skip ahead? Open the <a href="/tools/image-compressor">free image compressor</a> and drop your photo in — it caps every export at 2MB automatically.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#why">Why "Under 2MB" Upload Limits Exist</a></li>
  <li><a href="#how-to">How to Compress an Image to Under 2MB</a></li>
  <li><a href="#1mb">Getting Under 1MB Specifically</a></li>
  <li><a href="#stubborn">When the File Won't Shrink Enough</a></li>
  <li><a href="#formats">Best Format for Hitting a Size Cap</a></li>
  <li><a href="#quality">Will It Still Look Good?</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="why">Why "Under 2MB" Upload Limits Exist</h2>
<p>Government portals, job application systems, and university admissions forms are often built on older infrastructure with limited server storage and bandwidth budgets — and the size cap rarely gets raised even as phone cameras have gotten much better. A single 12-megapixel photo from a modern phone is commonly 4-8MB, which is 2-8x over a typical 1MB or 2MB limit. That mismatch is why so many people hit an upload error purely on file size, even though the photo itself is perfectly fine.</p>

<hr />

<h2 id="how-to">How to Compress an Image to Under 2MB</h2>
<p>The fastest way is a browser-based compressor that enforces the cap for you, so you're not guessing at a quality percentage.</p>

<h3>Step 1: Open the compressor</h3>
<p>Go to the <a href="/tools/image-compressor">Shopyor image compressor</a>. It runs entirely on your device, so the photo never leaves your browser.</p>

<h3>Step 2: Upload your photo</h3>
<p>Drag and drop or click to select a <strong>JPG, PNG, or WebP</strong> file. You'll immediately see the original size.</p>

<h3>Step 3: Pick a quality level and format</h3>
<p>Start around <strong>70% quality</strong> with JPEG or WebP as the output format — this is where most photos land comfortably under 2MB with no visible difference.</p>

<h3>Step 4: Compress and check the size</h3>
<p>Click compress. The tool caps output at 2MB, and you'll see the exact new file size next to the download button. Download it and upload it to whichever form asked for it.</p>

<blockquote><p><strong>Tip:</strong> If the portal's error message is vague ("file too large"), assume it means anywhere from 500KB to 2MB — compressing to under 1MB is a safe bet that clears almost every form you'll encounter.</p></blockquote>

<hr />

<h2 id="1mb">Getting Under 1MB Specifically</h2>
<p>A 2MB cap is usually easy; a 1MB cap needs one extra step for larger photos:</p>
<ol>
  <li><strong>Convert to JPEG or WebP</strong> if the original is PNG — PNG rarely compresses small enough for a photo.</li>
  <li><strong>Compress at 70% quality</strong> and check the result.</li>
  <li><strong>If it's still over 1MB, drop quality to 50-60%.</strong> Photos still look sharp on screen at this level.</li>
  <li><strong>Still too big?</strong> Resize the dimensions down first (see below), then compress again.</li>
</ol>

<hr />

<h2 id="stubborn">When the File Won't Shrink Enough</h2>
<p>Compression alone has limits — it keeps the same pixel dimensions and just simplifies the data. If a very high-resolution original still won't drop under your target after lowering quality, the dimensions themselves are the problem. A 4000px-wide photo carries far more data than a 1600px one, so:</p>
<ol>
  <li>Run the image through the <a href="/tools/image-resizer">image resizer</a> first and bring it down to around 1200-1600px on the long edge.</li>
  <li>Then compress the resized image with the <a href="/tools/image-compressor">image compressor</a>.</li>
</ol>
<p>Resizing first, then compressing, is the combination that reliably gets even large phone photos under 1MB.</p>

<hr />

<h2 id="formats">Best Format for Hitting a Size Cap</h2>
<table>
  <thead>
    <tr><th>Format</th><th>Good for hitting a size cap?</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>JPEG</strong></td><td>Yes</td><td>Universally accepted by upload forms; compresses photos well</td></tr>
    <tr><td><strong>WebP</strong></td><td>Yes, usually smallest</td><td>Some older government/legacy portals don't accept it — check first</td></tr>
    <tr><td><strong>PNG</strong></td><td>No, for photos</td><td>Lossless, so file sizes stay large; fine only for graphics/screenshots</td></tr>
  </tbody>
</table>
<p><strong>Safe default:</strong> if a form doesn't specify a format, export as JPEG — it's the one virtually every upload system accepts.</p>

<hr />

<h2 id="quality">Will It Still Look Good?</h2>
<p>Yes, at the quality levels needed to hit a 1-2MB target. A phone photo compressed from 6MB down to under 2MB at 70-80% JPEG quality looks visually identical in a form's photo slot or on a screen — the difference only shows up if someone zooms in well past 100% or prints it very large, which upload forms never do.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How do I compress an image to under 2MB?</h3>
<p>Upload the photo to a browser-based compressor and export it as JPEG or WebP — most compressors, including Shopyor's, cap the output at 2MB automatically, so you don't have to guess a quality percentage. If your original is a very high-resolution PNG, converting to JPEG or WebP first makes it far easier to land under the limit.</p>

<h3>How do I get an image under 1MB specifically?</h3>
<p>Compress to JPEG or WebP first, since PNG rarely gets small enough for photos. If the result is still over 1MB, lower the quality slider toward 50-60% and re-compress, or resize the dimensions down before compressing — a 4000px-wide photo carries far more data than a 1600px one, so shrinking the dimensions first makes hitting 1MB much easier.</p>

<h3>Why do job portals, visa forms, and university applications set a file size limit?</h3>
<p>Most of these systems were built years ago on limited server storage and bandwidth, and the size cap was never raised even as phone cameras produce much bigger files. A 12MP phone photo can easily be 4-8MB, well over a typical 1MB or 2MB portal limit, which is why so many applicants hit an upload error on file size alone.</p>

<h3>Will compressing to 2MB make my photo blurry?</h3>
<p>Not at normal viewing sizes. A phone photo compressed from 6MB down to under 2MB at 70-80% JPEG or WebP quality looks visually identical on a screen or in a printed form photo slot — the loss only becomes visible if you zoom in far past 100% or print it poster-sized.</p>

<h3>What's the difference between resizing and compressing for hitting a size limit?</h3>
<p>Compressing keeps the same width and height but reduces file size by simplifying the image data. Resizing actually shrinks the pixel dimensions, which removes far more data. For a stubborn file that won't drop below 1-2MB on quality alone, resize the dimensions down first, then compress — the two together get you there almost every time.</p>

<h3>Is it safe to compress ID photos or documents to hit an upload limit?</h3>
<p>Yes, as long as the compressor runs in your browser. Shopyor's image compressor processes the file locally on your device — it's never uploaded to a server just to be resized — so it's safe for passport photos, ID scans, and other sensitive images that a form is asking you to shrink.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>A "file too large" upload error is one of the easiest problems to fix: compress to JPEG or WebP at 70% quality, and resize the dimensions down first if the file is stubborn. Most phone photos drop from several megabytes to well under 1-2MB with no visible loss.</p>
<p><strong>Here's what you learned in this guide:</strong></p>
<ul>
  <li>Why job portals, visa forms, and university applications enforce a 1MB or 2MB size cap.</li>
  <li>The exact steps to compress a photo to under 2MB, and the extra step for a stricter 1MB limit.</li>
  <li>When to resize before compressing, and which format to pick when a form doesn't specify one.</li>
</ul>
<p><strong>Ready to clear the upload limit?</strong> Open the <a href="/tools/image-compressor">free Shopyor Image Compressor</a>, drop in your photo, and download a version guaranteed under 2MB. Need smaller dimensions first? Use the <a href="/tools/image-resizer">image resizer</a>, or browse <a href="/tools">all Shopyor tools</a>.</p>

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
