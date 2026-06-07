// scripts/seed-pdf-blogs.mjs
// Idempotent seeder for PDF-to-Word SEO blog posts.
// Usage: node scripts/seed-pdf-blogs.mjs
// Reads DATABASE_URL from .env.local, upserts posts by slug (safe to re-run).

import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

// --- Load DATABASE_URL from .env.local ---------------------------------------
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2];
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}
loadEnv();

const MONGODB_URI = process.env.DATABASE_URL;
if (!MONGODB_URI) {
  console.error("❌ DATABASE_URL not found in .env.local");
  process.exit(1);
}

// --- Loose schemas (match existing collections) ------------------------------
const Blog =
  mongoose.models.Blog ||
  mongoose.model(
    "Blog",
    new mongoose.Schema({}, { strict: false, collection: "blogs", timestamps: true }),
  );
const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema({}, { strict: false, collection: "users" }),
  );

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const readingTimeOf = (html) => {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const TOOL = "/tools/pdf-to-word";

// --- Posts -------------------------------------------------------------------
const posts = [
  {
    title: "How to Convert PDF to Word on Mobile for Free",
    category: "Tutorials",
    excerpt:
      "Convert PDF to Word on your phone for free — no app needed. A step-by-step guide for Android and iPhone using a browser-based PDF to Word converter.",
    tags: ["pdf to word", "mobile", "android", "iphone", "convert pdf", "docx"],
    content: `
<p>Most of us carry our documents on our phones now. Whether you are a student editing an assignment, a job seeker tweaking a resume, or running a small business on the go, you often need to turn a PDF into an editable Word file right from your mobile. The good news: you can <strong>convert PDF to Word on mobile for free</strong> without installing a single app.</p>

<h2>Why convert PDF to Word on your phone?</h2>
<p>PDFs are great for sharing, but terrible for editing. Converting to <strong>DOCX</strong> lets you fix typos, update details, and reuse content in Microsoft Word, Google Docs, or any word processor. Doing it in your phone's browser means no storage wasted on apps and no sign-up required.</p>

<h2>Convert PDF to Word on Android or iPhone — step by step</h2>
<ol>
  <li><strong>Open the converter.</strong> In Chrome, Safari, or any mobile browser, go to our <a href="${TOOL}">free PDF to Word converter</a>.</li>
  <li><strong>Upload your PDF.</strong> Tap the upload area and choose the file from your Files app, Google Drive, or Downloads.</li>
  <li><strong>Convert.</strong> Tap “Convert PDF to Word” and wait a few seconds while it processes.</li>
  <li><strong>Download the DOCX.</strong> The editable Word file downloads automatically. Open it in the Word or Google Docs app to start editing.</li>
</ol>

<h2>Tips for the best results on mobile</h2>
<ul>
  <li>Use a stable Wi-Fi or mobile data connection so the upload finishes quickly.</li>
  <li>Keep files under 25&nbsp;MB for the fastest conversion.</li>
  <li>If your PDF is a scan or photo, the tool runs OCR automatically — see our guide on <a href="/blog/how-to-convert-a-scanned-pdf-to-word-with-ocr">converting a scanned PDF to Word with OCR</a>.</li>
  <li>Want the layout to stay pixel-perfect? Read <a href="/blog/how-to-convert-pdf-to-word-without-losing-formatting">how to convert PDF to Word without losing formatting</a>.</li>
</ul>

<h2>Is it safe and free?</h2>
<p>Yes. The tool is completely free, needs no account, and uses secure processing. It works the same on a low-cost Android phone as it does on the newest iPhone, so anyone can convert documents anywhere.</p>

<h2>FAQ</h2>
<h3>Do I need an app to convert PDF to Word on mobile?</h3>
<p>No. Everything runs in your mobile browser, so there is nothing to install.</p>
<h3>Will it work on a slow phone?</h3>
<p>Yes. The conversion happens on the server, so even budget phones can use it smoothly.</p>

<p>Ready to try it? Open the <a href="${TOOL}">PDF to Word converter</a> and convert your first file in seconds.</p>
`.trim(),
  },
  {
    title: "How to Convert a Scanned PDF to Word with OCR",
    category: "Tutorials",
    excerpt:
      "Turn scanned or image-based PDFs into editable Word documents using OCR. Learn how optical character recognition makes scanned PDFs editable for free.",
    tags: ["scanned pdf to word", "ocr", "pdf to word", "docx", "editable word"],
    content: `
<p>A regular PDF contains real text you can select and copy. A <strong>scanned PDF</strong> is different — it is essentially a picture of a page, so the text is locked inside an image. To make it editable in Word, you need <strong>OCR (optical character recognition)</strong>. Here is how to convert a scanned PDF to Word the easy way.</p>

<h2>What is OCR and why do you need it?</h2>
<p>OCR is the technology that “reads” the letters inside an image and turns them into real, editable text. Without OCR, converting a scanned PDF would only give you a Word file full of pictures. With OCR, you get words you can actually edit, search, and reformat.</p>

<h2>Convert a scanned PDF to Word — step by step</h2>
<ol>
  <li><strong>Open the tool.</strong> Go to our <a href="${TOOL}">free PDF to Word converter</a>.</li>
  <li><strong>Upload the scanned PDF.</strong> Drag and drop it, or browse to select it from your device.</li>
  <li><strong>Convert.</strong> Click “Convert PDF to Word.” OCR runs automatically on scanned and image-based pages.</li>
  <li><strong>Download and review.</strong> Open the DOCX in Word or Google Docs and check the recognised text.</li>
</ol>

<h2>How to get the most accurate OCR results</h2>
<ul>
  <li><strong>Use a high-quality scan.</strong> 300&nbsp;DPI or higher gives far better recognition than a blurry photo.</li>
  <li><strong>Keep pages straight.</strong> Crooked or skewed scans reduce accuracy.</li>
  <li><strong>Good contrast helps.</strong> Dark text on a clean white background is easiest to read.</li>
  <li><strong>Proofread after.</strong> OCR is excellent but not perfect — quickly scan for any misread words.</li>
</ul>

<h2>Common uses for scanned PDF to Word conversion</h2>
<p>Students digitise printed notes, offices reuse old contracts, and freelancers turn scanned forms into editable templates. Once the text is in Word, you can update and reformat it in minutes.</p>

<h2>FAQ</h2>
<h3>Is OCR included for free?</h3>
<p>Yes. OCR runs automatically when you convert a scanned or image-based PDF, at no cost.</p>
<h3>What if the scan is low quality?</h3>
<p>OCR still works, but accuracy depends on the source. Re-scanning at a higher resolution gives cleaner results.</p>

<p>Next steps: try the <a href="${TOOL}">PDF to Word converter</a>, and if you are on a phone, see <a href="/blog/how-to-convert-pdf-to-word-on-mobile-for-free">how to convert PDF to Word on mobile for free</a>.</p>
`.trim(),
  },
  {
    title: "How to Convert PDF to Word Without Losing Formatting",
    category: "Tutorials",
    excerpt:
      "Keep fonts, tables, and layout intact when you convert PDF to Word. Practical tips for an accurate, editable DOCX that looks just like the original PDF.",
    tags: ["pdf to word", "formatting", "docx", "accurate conversion", "convert pdf"],
    content: `
<p>The biggest frustration with converting PDFs is messed-up formatting — shifted tables, broken columns, and weird spacing. The good news is that with the right approach you can <strong>convert PDF to Word without losing formatting</strong> and get a DOCX that looks just like the original.</p>

<h2>Why formatting breaks during conversion</h2>
<p>PDFs store a fixed visual layout, while Word documents reflow text. A good converter has to rebuild that layout — fonts, headings, tables, and spacing — as editable Word elements. Lower-quality tools guess poorly, which is where the mess comes from.</p>

<h2>7 tips for an accurate PDF to Word conversion</h2>
<ol>
  <li><strong>Start with a text-based PDF.</strong> Real text converts far more cleanly than a scan. If it is scanned, OCR handles it — see <a href="/blog/how-to-convert-a-scanned-pdf-to-word-with-ocr">scanned PDF to Word with OCR</a>.</li>
  <li><strong>Use a quality converter.</strong> Our <a href="${TOOL}">PDF to Word converter</a> is tuned to preserve layout and styles.</li>
  <li><strong>Keep fonts common.</strong> Standard fonts (Arial, Times, Calibri) map more reliably than rare ones.</li>
  <li><strong>Check tables first.</strong> Tables are the most fragile element — review them right after converting.</li>
  <li><strong>Fix styles, not text.</strong> Use Word's built-in heading and paragraph styles to tidy up quickly.</li>
  <li><strong>Watch images and columns.</strong> Multi-column layouts may need a small nudge; reposition images if needed.</li>
  <li><strong>Save as DOCX.</strong> DOCX keeps modern formatting features that older DOC can lose.</li>
</ol>

<h2>What “good formatting retention” looks like</h2>
<p>After conversion you should see matching headings, intact paragraphs, working bullet lists, and tables that line up. Minor tweaks are normal; a full re-layout is not.</p>

<h2>FAQ</h2>
<h3>Which is better, DOC or DOCX?</h3>
<p>DOCX. It is the modern Word format and preserves more formatting features. It also opens in Word, Google Docs, and LibreOffice.</p>
<h3>Can I convert on my phone and keep formatting?</h3>
<p>Yes. The same engine runs on mobile — see <a href="/blog/how-to-convert-pdf-to-word-on-mobile-for-free">how to convert PDF to Word on mobile for free</a>.</p>

<p>Try it now with the <a href="${TOOL}">free PDF to Word converter</a> and get an editable DOCX that keeps your layout.</p>
`.trim(),
  },
];

// --- Run ---------------------------------------------------------------------
async function main() {
  await mongoose.connect(MONGODB_URI, { bufferCommands: false, dbName: "app" });
  console.log("✅ Connected to MongoDB");

  let author = await User.findOne({ role: "admin" }).lean();
  if (!author) {
    author = await User.findOne().lean();
    if (author) {
      console.warn(
        `⚠️  No admin user found. Falling back to first user: ${author.email || author._id}`,
      );
    }
  }
  if (!author) {
    console.error("❌ No users found in DB — cannot set authorId. Aborting.");
    await mongoose.disconnect();
    process.exit(1);
  }

  for (const p of posts) {
    const slug = slugify(p.title);
    const now = new Date();
    const doc = {
      title: p.title,
      slug,
      content: p.content,
      excerpt: p.excerpt,
      category: p.category,
      tags: p.tags,
      author: author.name || author.email || "Admin",
      authorId: author._id,
      isPublished: true,
      publishedAt: now,
      updatedAt: now,
      readingTime: readingTimeOf(p.content),
    };

    const res = await Blog.findOneAndUpdate(
      { slug },
      { $set: doc, $setOnInsert: { views: 0 } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    console.log(`✔ upserted: /blog/${res.slug}`);
  }

  await mongoose.disconnect();
  console.log("✅ Done. Disconnected.");
}

main().catch(async (err) => {
  console.error("❌ Seed failed:", err.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
