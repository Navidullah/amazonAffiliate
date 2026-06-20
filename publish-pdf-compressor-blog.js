// publish-pdf-compressor-blog.js
// One-off script to publish the "How to Compress a PDF" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-pdf-compressor-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-pdf-compressor-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-compress-a-pdf-without-losing-quality";
const TITLE =
  "How to Compress a PDF File Without Losing Quality (Free, No Signup) — 2026 Guide";
const EXCERPT =
  "Learn how to shrink a PDF to fit email attachment limits or upload caps while keeping text and images readable — free, no signup, no watermark.";
const CATEGORY = "PDF Tools";
const TAGS = [
  "compress pdf online free",
  "reduce pdf file size for email",
  "compress pdf without losing quality",
  "compress pdf to 25mb",
  "compress scanned pdf",
  "pdf compressor no watermark",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this PDF compressor free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Shopyor's PDF compressor is completely free with no signup, no watermarks, and no daily limits. Upload your file, download the compressed version, and that's it.",
      },
    },
    {
      "@type": "Question",
      name: "How can I compress a PDF to send it by email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compress the file to get it under your email provider's attachment limit — typically 25MB for Gmail and Outlook — then attach the smaller version as normal. If the compressed file is still too large, consider splitting it into multiple PDFs or sending a shared link instead.",
      },
    },
    {
      "@type": "Question",
      name: "Will my PDF quality stay readable after compression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The compressor is tuned to balance a smaller file size with clear, readable text and graphics. Image-heavy PDFs — scanned documents, photo-filled reports — compress the most, since uncompressed images are usually where most of the file size comes from.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size I can compress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can compress PDF files up to 50MB. For very large files, consider splitting the PDF into smaller sections first, then compressing each part.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my compressed file barely smaller?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some PDFs are already optimized — for example, ones exported directly from Word or Google Docs with no embedded images — so there is little left to remove. The biggest savings come from PDFs with large or uncompressed images, such as scanned pages saved at high resolution.",
      },
    },
    {
      "@type": "Question",
      name: "Are my files safe and private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Files are transferred over a secure connection and are not permanently stored — they are processed and then removed from the server.",
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
      name: "How to Compress a PDF Without Losing Quality",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>A PDF that's too large to email, too slow to upload, or stuck behind a strict file-size limit is one of the most common small annoyances online. <strong>The fix usually takes under a minute: compress the file, and most of that wasted size disappears without making the document any harder to read.</strong></p>

<p>This guide explains what PDF compression actually does, how to get the best results for different file types, and why some PDFs barely shrink no matter what tool you use.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#why-large">Why PDFs Get So Large in the First Place</a></li>
  <li><a href="#how-it-works">How PDF Compression Actually Works</a></li>
  <li><a href="#how-to">How to Compress a PDF Online (Step by Step)</a></li>
  <li><a href="#email">Compressing a PDF for Email (25MB Limit)</a></li>
  <li><a href="#barely-smaller">Why Some PDFs Barely Get Smaller</a></li>
  <li><a href="#mobile">Compressing a PDF on Mobile vs Desktop</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="why-large">Why PDFs Get So Large in the First Place</h2>
<p>A PDF isn't one simple format — it's a container that can hold text, vector graphics, embedded fonts, and full-resolution images all at once. Most oversized PDFs fall into one of these categories:</p>
<ul>
  <li><strong>Scanned documents</strong> — each page is actually a high-resolution photo, often saved at 300 DPI or higher, which adds up fast across many pages.</li>
  <li><strong>Reports with embedded photos</strong> — images pasted in at their original camera resolution instead of a web-appropriate size.</li>
  <li><strong>Duplicate or unused data</strong> — embedded fonts, metadata, or redundant objects left over from editing the file multiple times.</li>
</ul>
<p>A genuinely text-only PDF — a contract, an invoice, a typed letter — is almost always small already, often under 200KB regardless of page count.</p>

<hr />

<h2 id="how-it-works">How PDF Compression Actually Works</h2>
<p>Compression tools shrink a PDF in two main ways:</p>
<ol>
  <li><strong>Re-encoding images</strong> at a lower resolution or higher compression ratio — this is where the largest savings come from on scanned or photo-heavy files.</li>
  <li><strong>Restructuring the file's internal objects</strong> — removing redundant data and packing the document's internal structure more efficiently, which helps even on PDFs with no images at all.</li>
</ol>
<p>This is why the result varies so much by file: a 40MB scanned contract might shrink to 4MB, while a 40KB text-only invoice might only drop to 35KB — there's simply nothing left to compress on the second one.</p>

<hr />

<h2 id="how-to">How to Compress a PDF Online (Step by Step)</h2>
<p><strong>Step 1: Open the PDF compressor.</strong><br />Go to the <a href="/tools/pdf-compressor">Shopyor PDF Compressor</a>.</p>
<p><strong>Step 2: Upload your file.</strong><br />Drag in your PDF or tap to browse. Files up to 50MB are supported.</p>
<p><strong>Step 3: Wait for processing.</strong><br />Compression happens automatically — no settings to configure, no quality level to guess at.</p>
<p><strong>Step 4: Download the compressed file.</strong><br />Your smaller PDF downloads directly, ready to email, upload, or share. No signup, no watermark added to the document.</p>

<hr />

<h2 id="email">Compressing a PDF for Email (25MB Limit)</h2>
<p>Gmail and Outlook both cap attachments at <strong>25MB</strong> — go over that and your email either bounces back or silently fails to send, depending on the provider.</p>
<p>If your compressed PDF is still over the limit:</p>
<ul>
  <li><strong>Split the document</strong> into two or more parts and send them as separate emails.</li>
  <li><strong>Upload to cloud storage</strong> (Google Drive, Dropbox) and share a link instead of attaching the file directly.</li>
  <li><strong>Re-scan at a lower resolution</strong> if the file originated from a scanner — 150 DPI is usually sharp enough for text documents and produces a much smaller file than 300+ DPI.</li>
</ul>

<hr />

<h2 id="barely-smaller">Why Some PDFs Barely Get Smaller</h2>
<p>It's a common, reasonable question: "I compressed my PDF and it's almost the same size — is the tool broken?" Usually not. Here's what's actually happening:</p>
<table>
  <thead>
    <tr><th>PDF type</th><th>Typical reduction</th><th>Why</th></tr>
  </thead>
  <tbody>
    <tr><td>Scanned document (high-res images)</td><td>Large (often 50-90%)</td><td>Uncompressed or lightly compressed page images shrink dramatically</td></tr>
    <tr><td>Report with embedded photos</td><td>Moderate (20-50%)</td><td>Images compress further, but text/layout data stays the same size</td></tr>
    <tr><td>Text-only document (Word/Docs export)</td><td>Small (under 10%)</td><td>Already efficiently encoded; little redundant data to remove</td></tr>
    <tr><td>Already-compressed PDF</td><td>Minimal</td><td>A previous compression pass already removed the easy savings</td></tr>
  </tbody>
</table>
<p>If your file falls into the last two categories, a small reduction is the expected, correct result — not a sign the tool isn't working.</p>

<hr />

<h2 id="mobile">Compressing a PDF on Mobile vs Desktop</h2>
<p>The Shopyor PDF compressor works the same way on both — it's browser-based, so there's nothing to install either way.</p>
<p><strong>On mobile (iPhone or Android):</strong> open the tool in Safari or Chrome, upload the PDF from your Files app or Downloads, and the compressed file saves back to the same place.</p>
<p><strong>On desktop:</strong> drag and drop the file directly from your file explorer onto the upload area for the fastest workflow.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Is this PDF compressor free?</h3>
<p>Yes, Shopyor's PDF compressor is completely free with no signup, no watermarks, and no daily limits. Upload your file, download the compressed version, and that's it.</p>

<h3>How can I compress a PDF to send it by email?</h3>
<p>Compress the file to get it under your email provider's attachment limit — typically 25MB for Gmail and Outlook — then attach the smaller version as normal. If the compressed file is still too large, consider splitting it into multiple PDFs or sending a shared link instead.</p>

<h3>Will my PDF quality stay readable after compression?</h3>
<p>Yes. The compressor is tuned to balance a smaller file size with clear, readable text and graphics. Image-heavy PDFs — scanned documents, photo-filled reports — compress the most, since uncompressed images are usually where most of the file size comes from.</p>

<h3>What is the maximum file size I can compress?</h3>
<p>You can compress PDF files up to 50MB. For very large files, consider splitting the PDF into smaller sections first, then compressing each part.</p>

<h3>Why is my compressed file barely smaller?</h3>
<p>Some PDFs are already optimized — for example, ones exported directly from Word or Google Docs with no embedded images — so there is little left to remove. The biggest savings come from PDFs with large or uncompressed images, such as scanned pages saved at high resolution.</p>

<h3>Are my files safe and private?</h3>
<p>Yes. Files are transferred over a secure connection and are not permanently stored — they are processed and then removed from the server.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>PDF compression isn't magic — it works best on files with large, uncompressed images, and has little to remove from a clean, text-only document. Knowing which category your file falls into sets the right expectation, and either way, compressing first costs nothing and only takes a few seconds.</p>
<p><strong>Ready to shrink your PDF?</strong> Head to the <a href="/tools/pdf-compressor">Shopyor PDF Compressor</a>, upload your file, and download the smaller version — free, no signup, no watermark.</p>

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
