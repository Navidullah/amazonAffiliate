// publish-pdf-to-word-mobile-blog.js
// One-off script to publish the (expanded) "Convert PDF to Word on Mobile"
// article into MongoDB. Idempotent: re-running updates the same post
// (matched by slug).
//   Run: node publish-pdf-to-word-mobile-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-pdf-to-word-mobile-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-convert-pdf-to-word-on-mobile-for-free";
const TITLE = "How to Convert PDF to Word on Mobile for Free (Android & iPhone)";
const EXCERPT =
  "Convert PDF to Word on your phone for free — no app needed. A step-by-step guide for Android and iPhone using a browser-based PDF to Word converter, plus fixes for common mobile issues.";
const CATEGORY = "Tutorials";
const TAGS = [
  "pdf to word",
  "mobile",
  "android",
  "iphone",
  "convert pdf",
  "docx",
  "pdf to word free",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an app to convert PDF to Word on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything runs in your mobile browser (Chrome, Safari, or any other), so there's nothing to install and no storage taken up on your phone. Just open the converter, upload your file, and download the result.",
      },
    },
    {
      "@type": "Question",
      name: "Will it work on a slow or older phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The actual conversion runs on the server, not on your device, so even a budget Android phone or an older iPhone can use it smoothly — your phone just needs to upload the file and download the result.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't I find the downloaded Word file on my iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On iPhone, Safari saves downloads to the Files app under 'On My iPhone' or 'Downloads' by default, not to your Photos or Home Screen. Open the Files app, tap Browse at the bottom, and look under Downloads — or long-press the download notification that pops up right after conversion to open it directly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert a PDF to Word without Wi-Fi, using mobile data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, mobile data works fine for most files. Larger PDFs (10 MB or more) will simply take longer to upload on a slower connection, so switching to Wi-Fi speeds things up but isn't required.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting on mobile keep the formatting the same as on desktop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the conversion itself happens on the server and produces the exact same DOCX file whether you upload from a phone or a computer. What can differ is how that file displays afterward: opening a heavily formatted document in a phone's Word or Google Docs app sometimes reflows text differently on a small screen, though the underlying file is unchanged.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit when converting from mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the same 25 MB limit applies on mobile as on desktop. That covers the vast majority of everyday documents — resumes, assignments, contracts, scanned forms — a 25 MB PDF is typically 100+ pages of text or a few dozen pages of scanned images.",
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
      name: "How to Convert PDF to Word on Mobile for Free",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Most of us carry our documents on our phones now. Whether you're a student editing an assignment between classes, a job seeker tweaking a resume from your couch, or running a small business on the go, you often need to turn a PDF into an editable Word file right from your mobile — without a laptop anywhere in sight. The good news: you can <strong>convert PDF to Word on mobile for free</strong>, on both Android and iPhone, without installing a single app.</p>

<p><strong>In this guide:</strong></p>
<ol>
  <li><a href="#why">Why convert PDF to Word on your phone?</a></li>
  <li><a href="#android">Converting on Android — step by step</a></li>
  <li><a href="#iphone">Converting on iPhone — step by step</a></li>
  <li><a href="#issues">Common mobile issues and how to fix them</a></li>
  <li><a href="#tips">Tips for the best results on mobile</a></li>
  <li><a href="#safe">Is it safe and free?</a></li>
  <li><a href="#faq">Frequently asked questions</a></li>
</ol>

<hr />

<h2 id="why">Why convert PDF to Word on your phone?</h2>
<p>PDFs are great for sharing — the layout never breaks no matter what device opens it. That's exactly what makes them frustrating to <em>edit</em>. Converting to <strong>DOCX</strong> gives you back the ability to fix a typo, update a date, swap out a paragraph, or reuse a chunk of text in a new document, all from Microsoft Word, Google Docs, or any other word processor.</p>
<p>Doing this conversion in your phone's browser instead of a dedicated app means no storage wasted on an install you'll use once, no account to create, and no ads-riddled app store download to sift through. Open a tab, do the job, close the tab.</p>

<hr />

<h2 id="android">Converting on Android — step by step</h2>
<ol>
  <li><strong>Open the converter.</strong> In Chrome (or any browser), go to the <a href="/tools/convert-your-pdf-file-to-word">free PDF to Word converter</a>.</li>
  <li><strong>Upload your PDF.</strong> Tap the upload area — Android will offer to pick the file from Google Drive, Downloads, or whichever app you have the PDF saved in.</li>
  <li><strong>Convert.</strong> Tap "Convert PDF to Word" and wait a few seconds while it processes on the server.</li>
  <li><strong>Download the DOCX.</strong> Android saves it straight to your Downloads folder. Tap the notification to open it directly in the Word or Google Docs app.</li>
</ol>

<hr />

<h2 id="iphone">Converting on iPhone — step by step</h2>
<p>The steps are almost identical on iPhone, with one difference worth knowing up front: Safari handles downloaded files a little less obviously than Android does.</p>
<ol>
  <li><strong>Open the converter</strong> in Safari (or Chrome for iOS) and go to the <a href="/tools/convert-your-pdf-file-to-word">PDF to Word converter</a>.</li>
  <li><strong>Upload your PDF</strong> from Files, iCloud Drive, or wherever it's saved on your device.</li>
  <li><strong>Convert</strong> and wait for processing to finish.</li>
  <li><strong>Find the download.</strong> Safari saves it to the <strong>Files app</strong> — open Files, tap Browse, and check "On My iPhone" or "Downloads." From there you can open it directly in Word or Google Docs, or use the Share button to send it to another app.</li>
</ol>

<hr />

<h2 id="issues">Common mobile issues and how to fix them</h2>
<ul>
  <li><strong>"I can't find my downloaded file."</strong> On iPhone this is almost always the Files app issue above. On Android, check your browser's own Downloads screen (usually in the browser's menu) if it isn't in the notification shade anymore.</li>
  <li><strong>"The upload seems stuck."</strong> This is usually a weak connection struggling with a larger file. Switch from mobile data to Wi-Fi, or move somewhere with a stronger signal, and try again.</li>
  <li><strong>"The page looks cut off on my screen."</strong> The converter's interface is responsive, but if a browser's "desktop site" mode is toggled on, it can render oddly on a small screen — turn that off in your browser's menu for a normal mobile layout.</li>
  <li><strong>"My PDF won't convert at all."</strong> Check the file size first (see the limit below) — an oversized file is the most common cause. If it's within the limit and still fails, the PDF may be corrupted or password-protected; try re-saving or removing the password first.</li>
</ul>

<hr />

<h2 id="tips">Tips for the best results on mobile</h2>
<ul>
  <li>Use a stable Wi-Fi or mobile data connection so the upload finishes quickly.</li>
  <li>Keep files under <strong>25 MB</strong> for the fastest conversion.</li>
  <li>If your PDF is a scan or photo, the tool runs <a href="/blog/how-to-convert-a-scanned-pdf-to-word-with-ocr">OCR automatically</a> so the text comes out editable, not as an image.</li>
  <li>Want the layout to stay pixel-perfect? Read <a href="/blog/how-to-convert-pdf-to-word-without-losing-formatting">how to convert PDF to Word without losing formatting</a>.</li>
  <li>After downloading, open the file in your phone's Word or Docs app rather than a plain file previewer, so you can start editing right away instead of just viewing it.</li>
</ul>

<hr />

<h2 id="safe">Is it safe and free?</h2>
<p>Yes. The tool is completely free with no account required, no watermark added, and no hidden step where you're asked to pay partway through. Files are processed securely and are not kept around after conversion. It works identically on a low-cost Android phone and the newest iPhone, so the device you're holding doesn't limit what you can do.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Do I need an app to convert PDF to Word on mobile?</h3>
<p>No. Everything runs in your mobile browser (Chrome, Safari, or any other), so there's nothing to install and no storage taken up on your phone. Just open the converter, upload your file, and download the result.</p>

<h3>Will it work on a slow or older phone?</h3>
<p>Yes. The actual conversion runs on the server, not on your device, so even a budget Android phone or an older iPhone can use it smoothly — your phone just needs to upload the file and download the result.</p>

<h3>Why can't I find the downloaded Word file on my iPhone?</h3>
<p>On iPhone, Safari saves downloads to the Files app under "On My iPhone" or "Downloads" by default, not to your Photos or Home Screen. Open the Files app, tap Browse at the bottom, and look under Downloads — or long-press the download notification that pops up right after conversion to open it directly.</p>

<h3>Can I convert a PDF to Word without Wi-Fi, using mobile data?</h3>
<p>Yes, mobile data works fine for most files. Larger PDFs (10 MB or more) will simply take longer to upload on a slower connection, so switching to Wi-Fi speeds things up but isn't required.</p>

<h3>Does converting on mobile keep the formatting the same as on desktop?</h3>
<p>Yes — the conversion itself happens on the server and produces the exact same DOCX file whether you upload from a phone or a computer. What can differ is how that file displays afterward: opening a heavily formatted document in a phone's Word or Google Docs app sometimes reflows text differently on a small screen, though the underlying file is unchanged.</p>

<h3>Is there a file size limit when converting from mobile?</h3>
<p>Yes, the same 25 MB limit applies on mobile as on desktop. That covers the vast majority of everyday documents — resumes, assignments, contracts, scanned forms — a 25 MB PDF is typically 100+ pages of text or a few dozen pages of scanned images.</p>

<hr />

<p>Ready to try it? Open the <a href="/tools/convert-your-pdf-file-to-word">PDF to Word converter</a> and convert your first file from your phone in seconds — no app, no account, no desktop needed.</p>

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
