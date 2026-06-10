// publish-bgremover-blog.js
// One-off script to publish the "How to Remove the Background from an Image"
// article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-bgremover-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-bgremover-blog.js` again.",
  );
  process.exit(1);
}

// Informational long-tail primary keyword: "how to remove background from an
// image". Tutorial intent — complements (does not cannibalize) the
// transactional /tools/background-remover-image page, and funnels readers to it.
const SLUG = "how-to-remove-background-from-an-image";
const TITLE =
  "How to Remove the Background from an Image (Free, No Photoshop) — 2026 Guide";
const EXCERPT =
  "Learn how to remove the background from an image for free — no Photoshop needed. Make a transparent PNG, erase a white background from a logo, and get clean cut-outs in seconds.";
const CATEGORY = "Image Editing";
const TAGS = [
  "how to remove background from an image",
  "how to make a transparent png",
  "remove white background from logo",
  "remove background without photoshop",
  "transparent background maker",
  "cut out image online",
  "remove background from product photo",
  "ai background remover",
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
      name: "How do I remove the background from an image for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo to a free AI background remover, let it detect the subject and erase the background automatically, then download the result. With Shopyor you just drag in a JPG, PNG, or WEBP, wait a couple of seconds, and save a clean cut-out — no sign-up, no software, and no cost.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make an image background transparent (PNG)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Remove the background first, then export the file as a PNG. PNG supports transparency, so the area where the background used to be becomes see-through (shown as a checkerboard in editors). A transparent PNG drops cleanly onto any colour, website, or design without a white box around it.",
      },
    },
    {
      "@type": "Question",
      name: "Can I remove the background without Photoshop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You don't need Photoshop or any paid software. A browser-based AI background remover does the cut-out automatically in seconds, which is faster than manually masking in Photoshop and free. Photoshop is only worth it if you need pixel-level manual control on very tricky edges.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove a white background from a logo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload the logo to the background remover and it will erase the solid white background, leaving the logo on transparency. Export it as a PNG so the logo can sit on coloured headers, merchandise, or documents without a white rectangle behind it. Clean, high-contrast logos cut out almost perfectly.",
      },
    },
    {
      "@type": "Question",
      name: "What's the best file format after removing a background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use PNG when you need transparency — logos, product cut-outs, and design assets. Use JPG only if you're placing the subject on a solid background and want a smaller file, because JPG cannot store transparency and will fill the empty area with white. WEBP is a good modern option that supports transparency with smaller file sizes.",
      },
    },
    {
      "@type": "Question",
      name: "Will removing the background reduce my image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — a good background remover only erases the background and keeps the subject at its original resolution. Exporting as PNG or WEBP preserves quality without compression artifacts. Quality only drops if you later re-save the cut-out as a low-quality JPG, so keep a PNG copy of anything you'll edit again.",
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
      name: "How to Remove the Background from an Image",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Whether you're building a product listing, designing a logo, or just want a clean profile picture, knowing <strong>how to remove the background from an image</strong> is one of the most useful skills online. The best part: you no longer need Photoshop, design experience, or even a paid app — AI can cut out your subject and hand you a transparent PNG in seconds.</p>

<p>In this guide you'll learn exactly how to remove a background for free, how to make the background transparent, how to clean up a white background on a logo, and which file format to export for each use case. Want to skip straight to it? Open the <a href="/tools/background-remover-image">free AI background remover</a> and drop in your photo.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#why">Why You'd Want to Remove a Background</a></li>
  <li><a href="#how-to">How to Remove the Background from an Image (Step by Step)</a></li>
  <li><a href="#transparent">How to Make the Background Transparent (PNG)</a></li>
  <li><a href="#logo">How to Remove a White Background from a Logo</a></li>
  <li><a href="#formats">Which File Format Should You Export?</a></li>
  <li><a href="#clean-edges">Tips for Clean, Professional Cut-Outs</a></li>
  <li><a href="#use-cases">Common Use Cases</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="why">Why You'd Want to Remove a Background</h2>
<p>Removing the background isolates your subject — a person, product, or logo — so you can place it on any colour, scene, or layout. That single edit unlocks a surprising number of everyday tasks:</p>
<ul>
  <li><strong>Ecommerce product photos</strong> on a clean white or transparent background (a requirement on Amazon, Etsy, and most marketplaces).</li>
  <li><strong>Logos and branding</strong> that need to sit on coloured headers, merchandise, or documents without an ugly white box.</li>
  <li><strong>Profile pictures and thumbnails</strong> where you want the subject to pop.</li>
  <li><strong>Design and presentations</strong> — dropping a cut-out person or object onto a slide or poster.</li>
  <li><strong>Signatures and stamps</strong> scanned on paper that you want to overlay on PDFs.</li>
</ul>

<hr />

<h2 id="how-to">How to Remove the Background from an Image (Step by Step)</h2>
<p>The fastest, free way is an AI background remover that runs in your browser. Here's the whole process — it takes under 30 seconds.</p>

<h3>Step 1: Open the background remover</h3>
<p>Go to the <a href="/tools/background-remover-image">Shopyor background remover</a>. There's nothing to install and no account required — it works on phone, tablet, or computer.</p>

<h3>Step 2: Upload your image</h3>
<p>Drag and drop your photo, or click to browse. It accepts <strong>JPG, PNG, and WEBP</strong> files. For best results, use a photo where the subject stands out reasonably well from the background.</p>

<h3>Step 3: Let the AI erase the background</h3>
<p>The AI automatically detects the main subject — a person, product, animal, or logo — and removes everything behind it. You'll see the background replaced with a transparent (checkerboard) area in a couple of seconds.</p>

<h3>Step 4: Download your cut-out</h3>
<p>Save the result. Choose <strong>PNG</strong> to keep the background transparent, or export as JPG/WEBP if you prefer. That's it — a clean cut-out, no manual masking, no Photoshop.</p>

<blockquote><p><strong>Tip:</strong> Because the whole thing runs in your browser, your image isn't sitting on someone's server — it's private and instant.</p></blockquote>

<hr />

<h2 id="transparent">How to Make the Background Transparent (PNG)</h2>
<p>"Removing the background" and "making it transparent" are two halves of the same job. Removing erases the pixels behind your subject; <strong>transparency</strong> is what fills that space — nothing — so the image can sit on any colour.</p>
<p>The key is the export format. After the background is removed, <strong>save the file as a PNG</strong>. PNG supports an alpha (transparency) channel, so the empty area stays see-through. If you open the PNG in an editor, you'll see a grey-and-white checkerboard where the background used to be — that's the universal way of showing transparency. Now you can drop the image onto a blue website header, a printed t-shirt, or a slide and it blends in with no white rectangle around it.</p>

<hr />

<h2 id="logo">How to Remove a White Background from a Logo</h2>
<p>Logos are one of the most common things people need to cut out, because they're so often saved on a solid white background. To place a logo on a coloured banner, hoodie, or invoice, that white has to go.</p>
<ol>
  <li>Upload the logo file to the <a href="/tools/background-remover-image">background remover</a>.</li>
  <li>The AI erases the flat white background, leaving the logo on transparency.</li>
  <li>Export as a <strong>PNG</strong> so the logo carries its transparent background everywhere you use it.</li>
</ol>
<p>Because logos are usually high-contrast and have crisp edges, they tend to cut out almost perfectly — far cleaner than a busy photo. If your logo has fine text or thin lines, just double-check the edges at full zoom before you use it.</p>

<hr />

<h2 id="formats">Which File Format Should You Export?</h2>
<p>The format decides whether your transparency survives. Here's the quick rule:</p>
<table>
  <thead>
    <tr><th>Format</th><th>Transparency?</th><th>Best for</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>PNG</strong></td><td>Yes</td><td>Logos, product cut-outs, design assets — anything that needs a transparent background</td></tr>
    <tr><td><strong>WEBP</strong></td><td>Yes</td><td>The web: transparency plus smaller file sizes than PNG</td></tr>
    <tr><td><strong>JPG</strong></td><td>No</td><td>Subject on a solid background only — JPG fills empty areas with white</td></tr>
  </tbody>
</table>
<p>In short: <strong>need transparency → PNG (or WEBP)</strong>. Only choose JPG when you're placing the subject on a solid colour and want the smallest file.</p>

<hr />

<h2 id="clean-edges">Tips for Clean, Professional Cut-Outs</h2>
<p>AI does the heavy lifting, but a few habits get you sharper results:</p>
<ul>
  <li><strong>Start with good contrast.</strong> A subject that stands out from the background cuts out more cleanly than one that blends in.</li>
  <li><strong>Watch the hair and fine edges.</strong> Wispy hair and fur are the hardest part of any cut-out — zoom in and check before exporting.</li>
  <li><strong>Use the highest-resolution original you have.</strong> More detail gives the AI more to work with and keeps your export crisp.</li>
  <li><strong>Keep a PNG master copy.</strong> Edit from the transparent PNG rather than re-saving JPGs, so you never bake in a white background by accident.</li>
  <li><strong>Resize after, not before.</strong> If you also need to shrink the file, cut out first, then run it through an <a href="/tools/image-resizer">image resizer</a> or <a href="/tools/image-compressor">image compressor</a>.</li>
</ul>

<hr />

<h2 id="use-cases">Common Use Cases</h2>
<p>Once you can cut out a subject in seconds, you'll reach for it constantly:</p>
<ul>
  <li><strong>Online sellers</strong> — uniform white or transparent product shots that meet marketplace rules and look professional.</li>
  <li><strong>Designers and marketers</strong> — drop-in graphics for banners, ads, thumbnails, and decks.</li>
  <li><strong>Job seekers</strong> — a clean headshot for a CV or profile (then build the rest with the <a href="/tools/resume-builder">resume builder</a>).</li>
  <li><strong>Small businesses</strong> — transparent logos for letterheads, packaging, and social profiles.</li>
  <li><strong>Everyday photos</strong> — swap a messy background behind a portrait or pet picture.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How do I remove the background from an image for free?</h3>
<p>Upload your photo to a free AI background remover, let it detect the subject and erase the background automatically, then download the result. With Shopyor you just drag in a JPG, PNG, or WEBP, wait a couple of seconds, and save a clean cut-out — no sign-up, no software, and no cost.</p>

<h3>How do I make an image background transparent (PNG)?</h3>
<p>Remove the background first, then export the file as a PNG. PNG supports transparency, so the area where the background used to be becomes see-through (shown as a checkerboard in editors). A transparent PNG drops cleanly onto any colour, website, or design without a white box around it.</p>

<h3>Can I remove the background without Photoshop?</h3>
<p>Yes. You don't need Photoshop or any paid software. A browser-based AI background remover does the cut-out automatically in seconds, which is faster than manually masking in Photoshop and free. Photoshop is only worth it if you need pixel-level manual control on very tricky edges.</p>

<h3>How do I remove a white background from a logo?</h3>
<p>Upload the logo to the background remover and it will erase the solid white background, leaving the logo on transparency. Export it as a PNG so the logo can sit on coloured headers, merchandise, or documents without a white rectangle behind it. Clean, high-contrast logos cut out almost perfectly.</p>

<h3>What's the best file format after removing a background?</h3>
<p>Use PNG when you need transparency — logos, product cut-outs, and design assets. Use JPG only if you're placing the subject on a solid background and want a smaller file, because JPG cannot store transparency and will fill the empty area with white. WEBP is a good modern option that supports transparency with smaller file sizes.</p>

<h3>Will removing the background reduce my image quality?</h3>
<p>No — a good background remover only erases the background and keeps the subject at its original resolution. Exporting as PNG or WEBP preserves quality without compression artifacts. Quality only drops if you later re-save the cut-out as a low-quality JPG, so keep a PNG copy of anything you'll edit again.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Removing the background from an image used to mean fiddly manual masking in Photoshop. Today it's a three-step job: upload, let the AI erase the background, and download a transparent PNG — free, private, and done in seconds.</p>
<p><strong>Here's what you learned in this guide:</strong></p>
<ul>
  <li>The exact step-by-step process to cut out any subject with a free AI background remover.</li>
  <li>How to make the background transparent and why PNG (or WEBP) is the format that keeps it that way.</li>
  <li>How to clean up a logo's white background, and the habits that produce sharp, professional edges.</li>
</ul>
<p><strong>Ready to cut out your image?</strong> Open the <a href="/tools/background-remover-image">free Shopyor Background Remover</a>, drop in your photo, and download a transparent PNG in seconds. Need more? Browse <a href="/tools">all Shopyor tools</a> for free, no-signup image utilities.</p>

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
