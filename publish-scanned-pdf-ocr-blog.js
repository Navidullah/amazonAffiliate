// publish-scanned-pdf-ocr-blog.js
// One-off script to publish the (expanded) "Convert a Scanned PDF to Word
// with OCR" article into MongoDB. Idempotent: re-running updates the same
// post (matched by slug).
//   Run: node publish-scanned-pdf-ocr-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-scanned-pdf-ocr-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-convert-a-scanned-pdf-to-word-with-ocr";
const TITLE = "How to Convert a Scanned PDF to Word with OCR (Free Guide)";
const EXCERPT =
  "Turn scanned or image-based PDFs into editable Word documents using OCR. Learn how optical character recognition works, how to get accurate results, and where OCR still falls short.";
const CATEGORY = "Tutorials";
const TAGS = [
  "scanned pdf to word",
  "ocr",
  "pdf to word",
  "docx",
  "editable word",
  "optical character recognition",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is OCR included for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OCR runs automatically whenever you convert a scanned or image-based PDF — there's no separate toggle to find or extra step to pay for. The converter detects that a page has no selectable text and applies OCR to it on its own.",
      },
    },
    {
      "@type": "Question",
      name: "What if the scan is low quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCR still works, but accuracy depends heavily on the source. A blurry photo taken at an angle, in low light, or with a shadow across the page will produce more misread words than a flat, well-lit, high-resolution scan. Re-scanning at a higher resolution or retaking the photo with better lighting usually gives noticeably cleaner results.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my PDF actually needs OCR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Try selecting a word in the PDF with your finger or cursor. If you can highlight and copy real text, it already contains selectable text and doesn't need OCR. If nothing highlights, or the whole page behaves like one solid image, it's a scanned or image-based PDF and needs OCR to become editable.",
      },
    },
    {
      "@type": "Question",
      name: "Can OCR read handwriting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not reliably. OCR is built to recognize printed text — the consistent shapes of a typed or printed font — and generally struggles with handwriting, which varies too much from person to person. It works best on printed documents: contracts, forms, textbook pages, official letters, and typed notes.",
      },
    },
    {
      "@type": "Question",
      name: "Will OCR preserve tables and columns from the scanned page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCR does its best to detect layout, and simple tables and single-column text usually come through well. Complex multi-column layouts, nested tables, or pages mixing images and text in unusual arrangements are more likely to need some manual cleanup afterward — always review the output rather than assuming a perfect 1:1 copy.",
      },
    },
    {
      "@type": "Question",
      name: "Does OCR work in languages other than English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCR engines generally support a wide range of Latin-script languages (Spanish, French, German, and many others) in addition to English, with accuracy that's typically strong for well-scanned printed text in any of them. Recognition quality still depends most on scan clarity rather than which specific language is being read.",
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
      name: "How to Convert a Scanned PDF to Word with OCR",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>A regular PDF contains real text you can select, copy, and search. A <strong>scanned PDF</strong> is a different animal entirely — it's essentially a photograph or scan of a page, so what looks like text is actually a picture of text, locked inside an image with nothing to click on. To make it genuinely editable in Word, you need <strong>OCR (optical character recognition)</strong>. Here's how to convert a scanned PDF to Word the easy way, and what to expect from the result.</p>

<p><strong>In this guide:</strong></p>
<ol>
  <li><a href="#what-is-ocr">What is OCR and why do you need it?</a></li>
  <li><a href="#check">How to tell if your PDF actually needs OCR</a></li>
  <li><a href="#steps">Convert a scanned PDF to Word — step by step</a></li>
  <li><a href="#accuracy">How to get the most accurate OCR results</a></li>
  <li><a href="#limitations">Where OCR still falls short</a></li>
  <li><a href="#uses">Common uses for scanned PDF to Word conversion</a></li>
  <li><a href="#faq">Frequently asked questions</a></li>
</ol>

<hr />

<h2 id="what-is-ocr">What is OCR and why do you need it?</h2>
<p>OCR is the technology that "reads" the shapes of letters inside an image and turns them into real, selectable text — the same underlying idea used by scanning apps and document management software everywhere. Without OCR, converting a scanned PDF would just hand you a Word document full of pictures that happen to look like pages of text; you still couldn't select a single word, run a spell check, or search for a phrase. With OCR, you get actual words you can edit, search, copy into an email, and reformat like any other document.</p>

<hr />

<h2 id="check">How to tell if your PDF actually needs OCR</h2>
<p>Not every PDF that looks scanned is missing real text — some scanners and phone scanning apps run OCR automatically before saving. A quick way to check: open the PDF and try to highlight a word with your finger or cursor.</p>
<ul>
  <li><strong>If a word highlights normally</strong> and you can copy it, the file already has selectable text — you can convert it to Word without needing OCR at all.</li>
  <li><strong>If nothing highlights</strong>, or the whole page acts like one solid image no matter where you tap, it's a true scanned/image-based PDF and needs OCR.</li>
</ul>
<p>Either way, our <a href="/tools/convert-your-pdf-file-to-word">PDF to Word converter</a> handles both cases automatically — it detects pages without real text and applies OCR only where it's needed, so you don't have to figure this out yourself before uploading.</p>

<hr />

<h2 id="steps">Convert a scanned PDF to Word — step by step</h2>
<ol>
  <li><strong>Open the tool.</strong> Go to our <a href="/tools/convert-your-pdf-file-to-word">free PDF to Word converter</a>.</li>
  <li><strong>Upload the scanned PDF.</strong> Drag and drop it, or browse to select it from your device.</li>
  <li><strong>Convert.</strong> Click "Convert PDF to Word." OCR runs automatically on any scanned or image-based pages — no separate setting to enable.</li>
  <li><strong>Download and review.</strong> Open the DOCX in Word or Google Docs and read through the recognised text before you rely on it, especially for anything important like a contract or a form.</li>
</ol>

<hr />

<h2 id="accuracy">How to get the most accurate OCR results</h2>
<ul>
  <li><strong>Use a high-quality scan.</strong> 300 DPI or higher gives noticeably better recognition than a low-resolution phone photo.</li>
  <li><strong>Keep pages straight.</strong> A crooked or skewed scan confuses the letter-shape detection and increases misreads — a flatbed scanner or a scanning app with auto-crop and alignment helps a lot here.</li>
  <li><strong>Good contrast helps.</strong> Dark, crisp text on a clean white background is the easiest case; a faded photocopy of a photocopy is the hardest.</li>
  <li><strong>Avoid shadows and glare.</strong> If you're photographing a page instead of scanning it, flat, even lighting with no shadow across the text makes a real difference.</li>
  <li><strong>Proofread after.</strong> OCR is very good on clean printed text but not perfect — always do a quick read-through for misread characters (a common example: "rn" being misread as "m", or "0" and "O" swapping) before you send or submit the document.</li>
</ul>

<hr />

<h2 id="limitations">Where OCR still falls short</h2>
<p>OCR has come a long way, but it's worth knowing its real limits so you're not caught off guard:</p>
<ul>
  <li><strong>Handwriting isn't reliably recognized.</strong> OCR is built for the consistent shapes of printed and typed fonts. Handwritten notes, signatures, and cursive text will often come through garbled or missing entirely.</li>
  <li><strong>Complex layouts need a manual check.</strong> Multi-column newspapers, nested tables, or pages mixing photos, captions, and body text in unusual ways can shift out of order. Simple single-column text and basic tables convert far more reliably.</li>
  <li><strong>Very poor scans stay poor.</strong> OCR can't invent detail that isn't in the source image — if the original is too blurry or faint to read with your own eyes, it will be too hard for OCR as well.</li>
</ul>
<p>None of this makes OCR any less useful — it just means treating the output as a very strong first draft rather than a guaranteed-perfect transcription, especially for anything where an error would matter.</p>

<hr />

<h2 id="uses">Common uses for scanned PDF to Word conversion</h2>
<p>Students digitise printed lecture notes and old textbook pages so they can search and highlight them digitally. Offices reuse scanned contracts and agreements instead of retyping them from scratch. Freelancers and small businesses turn scanned forms and paper applications into editable templates they can reuse over and over. Once the text is in Word, updating it, reformatting it, or copying pieces into another document takes minutes instead of starting from a blank page.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Is OCR included for free?</h3>
<p>Yes. OCR runs automatically whenever you convert a scanned or image-based PDF — there's no separate toggle to find or extra step to pay for. The converter detects that a page has no selectable text and applies OCR to it on its own.</p>

<h3>What if the scan is low quality?</h3>
<p>OCR still works, but accuracy depends heavily on the source. A blurry photo taken at an angle, in low light, or with a shadow across the page will produce more misread words than a flat, well-lit, high-resolution scan. Re-scanning at a higher resolution or retaking the photo with better lighting usually gives noticeably cleaner results.</p>

<h3>How do I know if my PDF actually needs OCR?</h3>
<p>Try selecting a word in the PDF with your finger or cursor. If you can highlight and copy real text, it already contains selectable text and doesn't need OCR. If nothing highlights, or the whole page behaves like one solid image, it's a scanned or image-based PDF and needs OCR to become editable.</p>

<h3>Can OCR read handwriting?</h3>
<p>Not reliably. OCR is built to recognize printed text — the consistent shapes of a typed or printed font — and generally struggles with handwriting, which varies too much from person to person. It works best on printed documents: contracts, forms, textbook pages, official letters, and typed notes.</p>

<h3>Will OCR preserve tables and columns from the scanned page?</h3>
<p>OCR does its best to detect layout, and simple tables and single-column text usually come through well. Complex multi-column layouts, nested tables, or pages mixing images and text in unusual arrangements are more likely to need some manual cleanup afterward — always review the output rather than assuming a perfect 1:1 copy.</p>

<h3>Does OCR work in languages other than English?</h3>
<p>OCR engines generally support a wide range of Latin-script languages (Spanish, French, German, and many others) in addition to English, with accuracy that's typically strong for well-scanned printed text in any of them. Recognition quality still depends most on scan clarity rather than which specific language is being read.</p>

<hr />

<p>Next steps: try the <a href="/tools/convert-your-pdf-file-to-word">PDF to Word converter</a> on your own scanned document, and if you're doing this from your phone, see <a href="/blog/how-to-convert-pdf-to-word-on-mobile-for-free">how to convert PDF to Word on mobile for free</a>.</p>

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
