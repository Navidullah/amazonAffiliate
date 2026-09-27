// publish-image-metadata-privacy-guide-blog.js
// One-off script to publish an original, standalone article about image
// metadata/EXIF privacy into MongoDB. Broader than the existing
// how-to-remove-exif-data-and-gps-location-from-a-photo how-to post — this
// one explains WHY metadata matters (real-world risk, what each field
// reveals, platform-by-platform behaviour) before pointing at the tool.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-image-metadata-privacy-guide-blog.js
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("❌ DATABASE_URL is not set in .env.local.");
  process.exit(1);
}

const SLUG = "what-is-exif-data-image-metadata-privacy-guide";
const TITLE = "What Is EXIF Data? A Complete Guide to Image Metadata and Privacy";
const EXCERPT =
  "Every photo you take carries hidden data about your camera, settings, and often your exact location. Here's what EXIF and metadata actually contain, which platforms strip it automatically, and when you genuinely need to remove it yourself.";
const CATEGORY = "Privacy & Security";
const TAGS = [
  "exif data",
  "image metadata",
  "photo privacy",
  "gps location in photos",
  "remove metadata from photo",
  "what is exif",
  "geotagging",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What exactly is EXIF data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EXIF (Exchangeable Image File Format) is a standard for embedding metadata directly inside an image file. It typically includes the camera or phone model, the lens used, exposure settings (shutter speed, aperture, ISO), the date and time the photo was taken, and — if location services were enabled — the exact GPS coordinates of where the photo was captured.",
      },
    },
    {
      "@type": "Question",
      name: "Do social media sites remove EXIF data automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most major platforms — Facebook, Instagram, Twitter/X, and WhatsApp — strip EXIF data from images when you upload them, partly for user privacy and partly to reduce file size. However, this isn't universal: images sent as files rather than through the normal upload flow, email attachments, and files shared via cloud storage or messaging apps like Telegram (in some modes) or direct file transfer often keep their full metadata intact.",
      },
    },
    {
      "@type": "Question",
      name: "Can someone find my location from a photo I posted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the platform you posted to didn't strip GPS metadata, and your phone had location services enabled when you took the photo, then yes — anyone who downloads the original file can extract the exact coordinates using free, widely available EXIF viewer tools. This has been documented in real cases, including a well-known incident where a public figure's home address was deduced from GPS data in a photo posted online.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to sell items online using photos from my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's worth checking first. Marketplace listings (for cars, property, high-value items) are exactly the kind of photos people search out full-resolution originals of, and if GPS data is intact, it can reveal your home address even if you never mention it in the listing. Stripping metadata before uploading closes that gap without affecting how the photo looks.",
      },
    },
    {
      "@type": "Question",
      name: "Does removing EXIF data reduce photo quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. EXIF data is a separate block of text-based information stored alongside the pixel data, not part of the image itself. Removing it doesn't touch resolution, compression, or visual quality in any way — the photo looks identical, it just carries less information about itself.",
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
      name: "What Is EXIF Data?",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Every digital photo you take carries more information than the picture itself. Tucked inside the file, invisible unless you go looking for it, is a block of metadata called EXIF data — and depending on your camera settings, it can include the exact GPS coordinates of where you were standing when you pressed the shutter.</p>

<p>Most of the time this is harmless, even useful — it's how your phone's photo app sorts pictures by location or date automatically. But there are specific, common situations where that same data becomes a real privacy risk. This guide explains what's actually in EXIF data, which apps strip it and which don't, and when it's genuinely worth removing.</p>

<p><strong>In this guide:</strong></p>
<ol>
  <li><a href="#what-is-exif">What is EXIF data, exactly?</a></li>
  <li><a href="#whats-inside">What information does a typical photo actually contain?</a></li>
  <li><a href="#gps-risk">The GPS location problem</a></li>
  <li><a href="#platforms">Which platforms strip metadata automatically?</a></li>
  <li><a href="#when-matters">When metadata privacy actually matters</a></li>
  <li><a href="#how-to-check">How to check what's in your own photos</a></li>
  <li><a href="#how-to-remove">How to remove EXIF data</a></li>
  <li><a href="#faq">Frequently asked questions</a></li>
</ol>

<hr />

<h2 id="what-is-exif">What is EXIF data, exactly?</h2>
<p>EXIF stands for Exchangeable Image File Format — a standard, first published in 1998, that defines how cameras and phones embed metadata directly into JPEG and TIFF files. It's not a separate attachment or sidecar file; it's baked into the image file itself, in a section that's invisible when you simply view or share the photo normally, but fully readable by anyone with the right (freely available) tool.</p>
<p>The standard was designed for genuinely useful purposes: letting photo-editing software know how to correctly rotate an image, letting photographers review their own camera settings after a shoot, and letting photo apps sort a library by date or location automatically. The privacy concern isn't that EXIF exists — it's that most people have no idea how much of it is attached to photos they share publicly.</p>

<hr />

<h2 id="whats-inside">What information does a typical photo actually contain?</h2>
<p>The exact fields vary by device and settings, but a photo taken on a modern smartphone with location services enabled typically includes:</p>
<ul>
  <li><strong>Device information</strong> — the exact camera or phone make and model (e.g. "iPhone 15 Pro" or "Samsung Galaxy S24").</li>
  <li><strong>Camera settings</strong> — shutter speed, aperture (f-stop), ISO, focal length, and flash status.</li>
  <li><strong>Date and time</strong> — down to the second, including time zone.</li>
  <li><strong>GPS coordinates</strong> — latitude and longitude, often accurate to within a few metres, plus altitude on many devices.</li>
  <li><strong>Software details</strong> — which app or editing software last modified the file.</li>
  <li><strong>Thumbnail data</strong> — some formats embed a small preview thumbnail separately from the main image, which can occasionally reveal a cropped or edited-out portion of the original photo.</li>
</ul>
<p>None of this is visible when you just look at the photo. You need a dedicated EXIF viewer — and there are many free ones, built into most operating systems' "file properties" panels — to see it.</p>

<hr />

<h2 id="gps-risk">The GPS location problem</h2>
<p>Of everything in EXIF data, GPS coordinates carry the most real-world risk, because they're precise and unambiguous. A latitude/longitude pair pasted into any mapping service points to an exact spot — not a neighbourhood, not a city, a specific building or even a specific spot in a building's grounds.</p>
<p>This has caused real, documented problems. In one widely reported case, a public figure's exact home address was deduced by internet users who extracted GPS metadata from a photo they had posted online, apparently without realising it was embedded in the file. Similar incidents have affected people selling valuable items, posting from temporary addresses, or simply sharing family photos where a home's exact location wasn't meant to be public.</p>
<p>The risk isn't theoretical or rare — it's a direct, mechanical consequence of how location services and camera apps are configured by default on most phones. If location services were on when the photo was taken, and the platform you shared it on doesn't strip metadata, the coordinates are sitting in the file for anyone who downloads it.</p>

<hr />

<h2 id="platforms">Which platforms strip metadata automatically?</h2>
<p>This varies more than most people assume, and it changes over time as platforms update their upload pipelines. As a general pattern:</p>
<ul>
  <li><strong>Usually stripped automatically:</strong> Facebook, Instagram, Twitter/X, and WhatsApp images sent through the normal in-app camera/gallery upload flow.</li>
  <li><strong>Often NOT stripped:</strong> email attachments, cloud storage links (Google Drive, Dropbox, OneDrive) shared directly, files sent as "documents" rather than "photos" in messaging apps, marketplace and classified-ad listings uploaded via certain third-party tools, and personal or small-business websites where images are uploaded directly without processing.</li>
</ul>
<p>Because this behaviour isn't consistent or guaranteed — and because platforms change their processing without announcing it — the only way to be certain a specific photo has no metadata is to check it yourself, or strip it proactively before sharing.</p>

<hr />

<h2 id="when-matters">When metadata privacy actually matters</h2>
<p>Not every photo needs metadata stripped — for a private album shared with family, it's genuinely harmless. It's worth actively checking or removing metadata in a few specific situations:</p>
<ul>
  <li><strong>Selling items online</strong> — vehicles, property, or high-value goods, where listing photos are exactly the kind of image people search out full-resolution copies of.</li>
  <li><strong>Posting from home</strong> — any photo taken inside or near your home that you plan to share publicly, especially if you don't otherwise share your address.</li>
  <li><strong>Journalists, activists, or anyone with safety concerns</strong> — where revealing a location, even inadvertently, carries real personal risk.</li>
  <li><strong>Photos of children</strong> — shared on platforms that don't strip metadata, where a location tag could reveal a school, home, or regular routine.</li>
  <li><strong>Uploading to any website you don't control</strong> — forums, marketplaces, or personal sites where you can't verify what the upload pipeline does with metadata.</li>
</ul>

<hr />

<h2 id="how-to-check">How to check what's in your own photos</h2>
<p>Before assuming a photo is "clean," it's worth checking. On Windows, right-click a photo, choose Properties, then the Details tab — GPS coordinates appear under a "GPS" section if present. On Mac, opening a photo in Preview and viewing Tools → Show Inspector shows the same information. Both approaches are free and built into the operating system, no extra software needed.</p>

<hr />

<h2 id="how-to-remove">How to remove EXIF data</h2>
<p>Stripping metadata doesn't affect the visible image at all — it's a separate block of text-based data, not part of the pixel content, so removing it has zero impact on resolution or quality. The simplest way is a dedicated tool that reads the file, drops the metadata block, and re-saves the image — Shopyor's <a href="/tools/exif-remover">free EXIF remover</a> does exactly this in your browser, with nothing uploaded to a server, so the photo never actually leaves your device during the process.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What exactly is EXIF data?</h3>
<p>EXIF (Exchangeable Image File Format) is a standard for embedding metadata directly inside an image file. It typically includes the camera or phone model, the lens used, exposure settings (shutter speed, aperture, ISO), the date and time the photo was taken, and — if location services were enabled — the exact GPS coordinates of where the photo was captured.</p>

<h3>Do social media sites remove EXIF data automatically?</h3>
<p>Most major platforms — Facebook, Instagram, Twitter/X, and WhatsApp — strip EXIF data from images when you upload them, partly for user privacy and partly to reduce file size. However, this isn't universal: images sent as files rather than through the normal upload flow, email attachments, and files shared via cloud storage or messaging apps often keep their full metadata intact.</p>

<h3>Can someone find my location from a photo I posted?</h3>
<p>If the platform you posted to didn't strip GPS metadata, and your phone had location services enabled when you took the photo, then yes — anyone who downloads the original file can extract the exact coordinates using free, widely available EXIF viewer tools. This has been documented in real cases, including a well-known incident where a public figure's home address was deduced from GPS data in a photo posted online.</p>

<h3>Is it safe to sell items online using photos from my phone?</h3>
<p>It's worth checking first. Marketplace listings (for cars, property, high-value items) are exactly the kind of photos people search out full-resolution originals of, and if GPS data is intact, it can reveal your home address even if you never mention it in the listing. Stripping metadata before uploading closes that gap without affecting how the photo looks.</p>

<h3>Does removing EXIF data reduce photo quality?</h3>
<p>No. EXIF data is a separate block of text-based information stored alongside the pixel data, not part of the image itself. Removing it doesn't touch resolution, compression, or visual quality in any way — the photo looks identical, it just carries less information about itself.</p>

<hr />

<p><em>This article is for general informational purposes. Platform behaviour around metadata stripping changes over time and isn't guaranteed — when privacy genuinely matters, check the specific photo yourself rather than assuming a platform handled it.</em></p>

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

    let author = (await users.findOne({ role: "admin" })) || (await users.findOne({}));
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
        $setOnInsert: { createdAt: now, views: 0 },
      },
      { upsert: true },
    );

    console.log("Author:", authorName, authorId ? `(${authorId})` : "(no id)");
    console.log("Word count:", wordCount, "| Reading time:", readingTime, "min");
    console.log(result.upsertedId ? "✅ Published NEW post:" : "✅ Updated existing post (matched:", result.upsertedId || result.matchedCount, ")");
    console.log("URL: https://www.shopyor.com/blog/" + SLUG);
  } finally {
    await client.close();
  }
}

run().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
