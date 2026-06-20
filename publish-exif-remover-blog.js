// publish-exif-remover-blog.js
// One-off script to publish the "How to Remove EXIF Data From a Photo" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-exif-remover-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-exif-remover-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-remove-exif-data-and-gps-location-from-a-photo";
const TITLE =
  "How to Remove EXIF Data and GPS Location From a Photo — 2026 Privacy Guide";
const EXCERPT =
  "Your photos secretly embed GPS coordinates, timestamps, and device info. Learn what EXIF data reveals and how to strip it before sharing — free, on-device.";
const CATEGORY = "Privacy & Security";
const TAGS = [
  "remove exif data from photo",
  "remove gps location from photo",
  "strip metadata from image",
  "exif remover online free",
  "remove metadata from photo before sharing",
  "is my photo location public",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EXIF data and why should I remove it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EXIF (Exchangeable Image File Format) is hidden metadata your camera or phone embeds in every photo: GPS coordinates of where it was taken, the exact date and time, your device model, and camera settings. Anyone who downloads your photo can read this data, which can reveal your home address or daily routine — so it is worth stripping before you share images publicly.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove the GPS location from a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload the photo to an EXIF remover and use the on-device cleaning option. GPS coordinates are part of the EXIF block, so they are deleted along with the rest of the metadata. Good tools let you expand a \"Show detected EXIF\" view first so you can see exactly which location data the photo contains before you clean it.",
      },
    },
    {
      "@type": "Question",
      name: "Don't Instagram and WhatsApp remove EXIF data automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Major social networks like Instagram, Facebook, and X strip most metadata when you post directly to the feed, but you should not rely on it everywhere. Files sent as documents or attachments — for example via WhatsApp's document option, Telegram file sharing, email, or cloud storage links — often keep full EXIF including GPS. The safest habit is stripping metadata before the photo leaves your device, regardless of how you plan to share it.",
      },
    },
    {
      "@type": "Question",
      name: "Does removing EXIF data reduce image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — your photo stays visually identical. Only the hidden metadata block is affected; the picture itself is preserved at the same resolution and visual quality, since EXIF data is stored separately from the actual pixel data.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats can have EXIF data removed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPEG, PNG, WebP, and AVIF files can all be cleaned. JPEG photos straight from phones and cameras carry the most metadata, but screenshots and exported PNGs can contain hidden data too, depending on the app that created them.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to clean photos with sensitive location data online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for a tool with a genuine on-device processing mode, which cleans the photo entirely in your browser without ever uploading it to a server. This is the safest option for anything sensitive, since there is no upload step at all — the file never leaves your device.",
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
      name: "How to Remove EXIF Data and GPS Location From a Photo",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Every photo your phone takes carries more than just the image you see. Hidden inside the file is a block of metadata called <strong>EXIF data</strong> — and for a photo taken outdoors, that almost always includes the exact GPS coordinates of where you were standing. <strong>Stripping this data before you share a photo takes seconds and doesn't affect the image at all.</strong></p>

<p>This guide explains exactly what's hidden in your photos, why it matters more than most people realize, and how to remove it safely.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-exif">What Is EXIF Data, Exactly?</a></li>
  <li><a href="#why-it-matters">Why GPS Data in Photos Is a Real Privacy Risk</a></li>
  <li><a href="#how-to">How to Remove EXIF Data (Step by Step)</a></li>
  <li><a href="#dont-rely-on-apps">Why You Can't Always Rely on Instagram or WhatsApp</a></li>
  <li><a href="#check-first">How to Check What's in Your Photo First</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-exif">What Is EXIF Data, Exactly?</h2>
<p>EXIF stands for <strong>Exchangeable Image File Format</strong>. It's a standard way for cameras and phones to embed metadata directly inside an image file. A typical smartphone photo's EXIF block can include:</p>
<ul>
  <li><strong>GPS coordinates</strong> — the exact latitude and longitude of where the photo was taken, often accurate to within a few meters</li>
  <li><strong>Date and time</strong> — down to the second</li>
  <li><strong>Device make and model</strong> — e.g. "iPhone 15 Pro" or "Samsung Galaxy S24"</li>
  <li><strong>Camera settings</strong> — aperture, shutter speed, ISO, focal length</li>
</ul>
<p>None of this is visible when you look at the photo. It's only revealed by metadata viewers, some social platforms, and image-hosting services — which is exactly the problem.</p>

<hr />

<h2 id="why-it-matters">Why GPS Data in Photos Is a Real Privacy Risk</h2>
<p>A single photo with GPS data attached can reveal far more than people expect:</p>
<ul>
  <li>A photo taken at home reveals your <strong>home address</strong> to anyone who checks the metadata.</li>
  <li>A series of photos posted over time can map out your <strong>daily routine</strong> — gym, workplace, school pickup.</li>
  <li>Photos of children or family members can expose <strong>where they regularly are</strong>, which is a known vector for stalking and harassment.</li>
  <li>Selling an item online with a product photo taken at home can unintentionally geotag your address to a stranger.</li>
</ul>
<p>This isn't a theoretical risk — security researchers and journalists have repeatedly demonstrated finding someone's home address from a single photo's embedded GPS data.</p>

<hr />

<h2 id="how-to">How to Remove EXIF Data (Step by Step)</h2>
<p><strong>Step 1: Open an EXIF remover.</strong><br />Go to the <a href="/tools/exif-remover">Shopyor EXIF Remover</a>.</p>
<p><strong>Step 2: Upload your photo.</strong><br />Drag in the JPEG, PNG, WebP, or AVIF file you want to clean.</p>
<p><strong>Step 3: Review the detected metadata (optional but recommended).</strong><br />Expand "Show detected EXIF" to see exactly what's embedded — GPS, timestamp, device model, camera settings — before you decide to clean it.</p>
<p><strong>Step 4: Choose on-device removal.</strong><br />Click "Remove on device" to strip the metadata entirely inside your browser — the photo never leaves your device. For very large files, a server-side option is also available, which uploads over a secure connection and deletes the file after processing.</p>
<p><strong>Step 5: Download and verify.</strong><br />Download the cleaned file. A good tool re-checks the output afterward so you can confirm the metadata is actually gone, not just hidden from the preview.</p>

<hr />

<h2 id="dont-rely-on-apps">Why You Can't Always Rely on Instagram or WhatsApp</h2>
<p>It's true that posting a photo directly to your Instagram or Facebook feed strips most metadata automatically — the platforms do this for their own privacy reasons. But this protection has gaps that catch people off guard:</p>
<ul>
  <li><strong>WhatsApp's "document" send option</strong> sends the original file untouched, full EXIF intact — unlike the regular photo/video send, which compresses and strips metadata.</li>
  <li><strong>Telegram's file-sharing mode</strong> behaves the same way — only the standard photo-send compresses and cleans the file.</li>
  <li><strong>Email attachments and cloud storage links</strong> (Google Drive, Dropbox) never touch the file at all — whatever metadata was there when you uploaded it is still there when someone downloads it.</li>
</ul>
<p>The safe habit is to strip metadata <em>before</em> sharing, regardless of which app or method you're using — that way it doesn't matter whether the destination happens to clean it for you.</p>

<hr />

<h2 id="check-first">How to Check What's in Your Photo First</h2>
<p>Before you assume a photo is "probably fine," it's worth actually looking. A built-in EXIF viewer will list everything detected the moment you upload — GPS, timestamps, camera make and model, lens, exposure settings. This takes the guesswork out of deciding whether a specific photo needs cleaning, and lets you verify after cleaning that the metadata block is genuinely empty rather than just not displayed.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What is EXIF data and why should I remove it?</h3>
<p>EXIF (Exchangeable Image File Format) is hidden metadata your camera or phone embeds in every photo: GPS coordinates of where it was taken, the exact date and time, your device model, and camera settings. Anyone who downloads your photo can read this data, which can reveal your home address or daily routine — so it is worth stripping before you share images publicly.</p>

<h3>How do I remove the GPS location from a photo?</h3>
<p>Upload the photo to an EXIF remover and use the on-device cleaning option. GPS coordinates are part of the EXIF block, so they are deleted along with the rest of the metadata. Good tools let you expand a "Show detected EXIF" view first so you can see exactly which location data the photo contains before you clean it.</p>

<h3>Don't Instagram and WhatsApp remove EXIF data automatically?</h3>
<p>Major social networks like Instagram, Facebook, and X strip most metadata when you post directly to the feed, but you should not rely on it everywhere. Files sent as documents or attachments — for example via WhatsApp's document option, Telegram file sharing, email, or cloud storage links — often keep full EXIF including GPS. The safest habit is stripping metadata before the photo leaves your device, regardless of how you plan to share it.</p>

<h3>Does removing EXIF data reduce image quality?</h3>
<p>No — your photo stays visually identical. Only the hidden metadata block is affected; the picture itself is preserved at the same resolution and visual quality, since EXIF data is stored separately from the actual pixel data.</p>

<h3>What image formats can have EXIF data removed?</h3>
<p>JPEG, PNG, WebP, and AVIF files can all be cleaned. JPEG photos straight from phones and cameras carry the most metadata, but screenshots and exported PNGs can contain hidden data too, depending on the app that created them.</p>

<h3>Is it safe to clean photos with sensitive location data online?</h3>
<p>Look for a tool with a genuine on-device processing mode, which cleans the photo entirely in your browser without ever uploading it to a server. This is the safest option for anything sensitive, since there is no upload step at all — the file never leaves your device.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>EXIF metadata is invisible, automatic, and easy to forget about — which is exactly why it's worth building the habit of stripping it before sharing any photo publicly, selling an item online, or sending a file through anything other than a platform's main photo-share feature. It costs nothing, takes seconds, and doesn't touch the image quality at all.</p>
<p><strong>Ready to check your photos?</strong> Head to the <a href="/tools/exif-remover">Shopyor EXIF Remover</a>, upload your image, and see exactly what's hidden inside — free, on-device, no signup.</p>

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
