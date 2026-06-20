// publish-image-resizer-blog.js
// One-off script to publish the "How to Resize an Image" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-image-resizer-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-image-resizer-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-resize-an-image-without-losing-quality";
const TITLE =
  "How to Resize an Image Without Losing Quality (Free, No Software) — 2026 Guide";
const EXCERPT =
  "Learn how to resize any photo for Instagram, WhatsApp DP, or a target file size like 100KB — without blur, stretching, or installing software. Free, no signup.";
const CATEGORY = "Image Editing";
const TAGS = [
  "resize image online free",
  "resize image without losing quality",
  "resize image for instagram",
  "resize image for whatsapp dp",
  "resize image to 100kb",
  "convert image to webp online",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I resize an image to exactly 100KB or 200KB online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lower the Quality slider until the output file size reaches your target. For most JPGs, setting quality to 60–75% brings a typical photo down to around 100KB. Shopyor's image resizer shows the exact output file size after resizing so you can adjust and retry without re-uploading.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize an image without losing quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep the quality slider at 90–100% and only change the pixel dimensions. Reducing width and height while keeping quality high produces a smaller file with no visible quality loss. Avoid upscaling — enlarging an image beyond its original dimensions will always reduce sharpness, since no resizer can invent detail that was never captured.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats can I upload and download?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can upload JPG, JPEG, PNG, WebP, and HEIC files. The output can be saved as JPG (smallest for photos), PNG (lossless, best for graphics and screenshots), or WebP (smallest overall file size with comparable quality to JPG, supported by all modern browsers).",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize a photo for a WhatsApp profile picture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the WhatsApp DP preset (512×512 px) on Shopyor's image resizer. That is the size WhatsApp displays profile pictures at — small enough to upload instantly but sharp enough to look good when someone taps to view it full-screen.",
      },
    },
    {
      "@type": "Question",
      name: "Are my photos uploaded to a server when I resize them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your image is transferred over a secure HTTPS connection to process the resize, then it is not stored permanently or shared. No watermark is added, and the file is never used for any purpose besides returning your resized image.",
      },
    },
    {
      "@type": "Question",
      name: "Which format should I pick for a resized image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use JPG for photographs — it gives the smallest file size at an acceptable quality for everyday sharing. Use PNG for screenshots, logos, or anything needing a transparent background. Use WebP when file size matters most, such as images you're uploading to your own website, since it's typically 25–35% smaller than JPG at the same visual quality.",
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
      name: "How to Resize an Image Without Losing Quality",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Every platform wants a different image size — Instagram wants a square, WhatsApp wants a small profile picture, a job portal wants your photo under 100KB, and your own website wants something small enough to load fast. <strong>The good news: resizing an image to any target dimension or file size takes under a minute, for free, with no software to install.</strong></p>

<p>This guide walks through exactly how to resize a photo for the most common situations — Instagram, WhatsApp, a specific file size limit — while keeping it sharp and avoiding the most common mistakes that make resized images look blurry or stretched.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#why-resize">Why Image Size and Dimensions Matter</a></li>
  <li><a href="#how-to">How to Resize an Image Online (Step by Step)</a></li>
  <li><a href="#instagram">Resizing for Instagram (Posts and Stories)</a></li>
  <li><a href="#whatsapp">Resizing a Photo for WhatsApp DP</a></li>
  <li><a href="#target-size">Resizing to a Specific File Size (100KB, 200KB)</a></li>
  <li><a href="#no-blur">How to Avoid Blurry or Stretched Results</a></li>
  <li><a href="#formats">Which Format Should You Save As?</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="why-resize">Why Image Size and Dimensions Matter</h2>
<p>A photo straight from a modern phone camera is often 3000–4000 pixels wide and several megabytes in size. That's far more than most places actually need:</p>
<ul>
  <li><strong>Social media</strong> compresses and crops oversized images automatically — often making them look worse than if you'd resized them yourself first.</li>
  <li><strong>Forms and portals</strong> (job applications, exam admit cards, visa applications) frequently cap uploads at a fixed file size like 100KB or 200KB and will reject anything larger.</li>
  <li><strong>Your own website or document</strong> loads faster and looks more professional with appropriately sized images instead of a 4MB photo squeezed into a 300px box.</li>
</ul>
<p>Resizing solves all three by giving you direct control over both the pixel dimensions and the final file size.</p>

<hr />

<h2 id="how-to">How to Resize an Image Online (Step by Step)</h2>
<p><strong>Step 1: Upload your image.</strong><br />Go to the <a href="/tools/image-resizer">Shopyor Image Resizer</a> and drag in your photo, or tap to browse. JPG, PNG, WebP, and HEIC files are all supported.</p>
<p><strong>Step 2: Set your dimensions.</strong><br />Enter a width and height, or pick one of the ready-made presets (Instagram Post, Instagram Story, WhatsApp DP, and more). Keep "lock aspect ratio" on unless you specifically want to change the photo's proportions.</p>
<p><strong>Step 3: Adjust quality if needed.</strong><br />Use the quality slider to fine-tune the output file size. The tool shows you the resulting size in real time as you adjust.</p>
<p><strong>Step 4: Pick a format and download.</strong><br />Choose JPG, PNG, or WebP, then download. No login, no watermark, no waiting.</p>

<hr />

<h2 id="instagram">Resizing for Instagram (Posts and Stories)</h2>
<p>Instagram has specific dimensions it displays best, and uploading anything else means Instagram crops or compresses it for you — usually not the way you'd choose.</p>
<table>
  <thead>
    <tr><th>Format</th><th>Recommended size</th><th>Aspect ratio</th></tr>
  </thead>
  <tbody>
    <tr><td>Square post</td><td>1080 × 1080 px</td><td>1:1</td></tr>
    <tr><td>Portrait post</td><td>1080 × 1350 px</td><td>4:5</td></tr>
    <tr><td>Story / Reel cover</td><td>1080 × 1920 px</td><td>9:16</td></tr>
  </tbody>
</table>
<p>On the <a href="/tools/image-resizer">image resizer</a>, click the <strong>Instagram Post</strong> preset for a square photo or <strong>Instagram Story</strong> for a vertical one, then download and upload directly to the app.</p>

<hr />

<h2 id="whatsapp">Resizing a Photo for WhatsApp DP</h2>
<p>WhatsApp displays profile pictures at <strong>512 × 512 pixels</strong>. Uploading a much larger photo doesn't make your DP sharper — WhatsApp just compresses it down anyway, often introducing visible artifacts in the process.</p>
<p>Click the <strong>WhatsApp DP</strong> preset on the resizer to crop and resize to exactly 512×512 in one step, then set it as your profile photo. The file is small enough to upload instantly even on a slow connection.</p>

<hr />

<h2 id="target-size">Resizing to a Specific File Size (100KB, 200KB)</h2>
<p>Government job portals, university admission forms, and visa applications are notorious for capping photo uploads at a fixed size — often exactly 100KB or 200KB — and rejecting anything over.</p>
<p>To hit a specific file size:</p>
<ol>
  <li>Upload your photo and set reasonable pixel dimensions (passport photos are typically 200×230px to 600×600px — check what the form requires).</li>
  <li>Lower the Quality slider gradually — start around 70% and adjust.</li>
  <li>Watch the live file-size readout. For most JPG photos, a quality setting between 60–75% lands close to 100KB.</li>
  <li>If you're still over the limit, reduce the pixel dimensions slightly rather than dropping quality further — this preserves sharpness better than over-compressing.</li>
</ol>
<blockquote><p><strong>Pro tip:</strong> Always save as JPG when a strict file-size limit is involved — it compresses photographic detail far more efficiently than PNG, which is built for flat graphics, not photos.</p></blockquote>

<hr />

<h2 id="no-blur">How to Avoid Blurry or Stretched Results</h2>
<p>Three mistakes cause almost every bad resize:</p>
<ul>
  <li><strong>Upscaling.</strong> Making an image larger than its original resolution doesn't add detail — it stretches existing pixels, producing a soft, blurry result. Only resize down, never up, unless the tool explicitly states it uses AI upscaling.</li>
  <li><strong>Unlocked aspect ratio.</strong> Typing in a width and height that don't match the original's proportions squashes or stretches the photo. Keep "lock aspect ratio" enabled unless you're intentionally cropping to a different shape.</li>
  <li><strong>Over-compressing.</strong> Pushing the quality slider too low to hit a tiny file size introduces visible blocky artifacts, especially around sharp edges and text. If quality below 50% still doesn't hit your target, reduce dimensions instead.</li>
</ul>

<hr />

<h2 id="formats">Which Format Should You Save As?</h2>
<table>
  <thead>
    <tr><th>Format</th><th>Best for</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>JPG</strong></td><td>Photographs, selfies, scanned photos</td><td>Smallest file size for photos; no transparency support</td></tr>
    <tr><td><strong>PNG</strong></td><td>Screenshots, logos, graphics with text</td><td>Lossless and supports transparency, but larger file size</td></tr>
    <tr><td><strong>WebP</strong></td><td>Website images, anywhere file size matters most</td><td>25–35% smaller than JPG at similar quality; supported by all modern browsers</td></tr>
  </tbody>
</table>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Can I resize an image to exactly 100KB or 200KB online?</h3>
<p>Yes. Lower the Quality slider until the output file size reaches your target. For most JPGs, setting quality to 60–75% brings a typical photo down to around 100KB. Shopyor's image resizer shows the exact output file size after resizing so you can adjust and retry without re-uploading.</p>

<h3>How do I resize an image without losing quality?</h3>
<p>Keep the quality slider at 90–100% and only change the pixel dimensions. Reducing width and height while keeping quality high produces a smaller file with no visible quality loss. Avoid upscaling — enlarging an image beyond its original dimensions will always reduce sharpness, since no resizer can invent detail that was never captured.</p>

<h3>What image formats can I upload and download?</h3>
<p>You can upload JPG, JPEG, PNG, WebP, and HEIC files. The output can be saved as JPG (smallest for photos), PNG (lossless, best for graphics and screenshots), or WebP (smallest overall file size with comparable quality to JPG, supported by all modern browsers).</p>

<h3>How do I resize a photo for a WhatsApp profile picture?</h3>
<p>Use the WhatsApp DP preset (512×512 px) on Shopyor's image resizer. That is the size WhatsApp displays profile pictures at — small enough to upload instantly but sharp enough to look good when someone taps to view it full-screen.</p>

<h3>Are my photos uploaded to a server when I resize them?</h3>
<p>Your image is transferred over a secure HTTPS connection to process the resize, then it is not stored permanently or shared. No watermark is added, and the file is never used for any purpose besides returning your resized image.</p>

<h3>Which format should I pick for a resized image?</h3>
<p>Use JPG for photographs — it gives the smallest file size at an acceptable quality for everyday sharing. Use PNG for screenshots, logos, or anything needing a transparent background. Use WebP when file size matters most, such as images you're uploading to your own website, since it's typically 25–35% smaller than JPG at the same visual quality.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Resizing an image correctly comes down to three decisions: the right pixel dimensions for where it's going, a quality setting that balances sharpness with file size, and the right format for the content. Get those three right and you'll never end up with a blurry, stretched, or rejected upload again.</p>
<p><strong>Ready to resize your photo?</strong> Head to the <a href="/tools/image-resizer">Shopyor Image Resizer</a>, upload your image, and download the result in seconds — free, no signup, no watermark.</p>

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
