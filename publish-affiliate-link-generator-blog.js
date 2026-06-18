// publish-affiliate-link-generator-blog.js
// One-off script to publish the "How to Create an Amazon Affiliate Link" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-affiliate-link-generator-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-affiliate-link-generator-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-create-an-amazon-affiliate-link";
const TITLE =
  "How to Create an Amazon Affiliate Link Without SiteStripe — 2026 Guide";
const EXCERPT =
  "Learn how to turn any Amazon product URL or ASIN into a clean, trackable affiliate link — on mobile or desktop, without needing SiteStripe.";
const CATEGORY = "Affiliate Marketing";
const TAGS = [
  "how to create amazon affiliate link",
  "amazon affiliate link generator",
  "amazon affiliate link without sitestripe",
  "amazon associate tag",
  "convert amazon link to affiliate link",
  "amazon affiliate link from asin",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I create an Amazon affiliate link?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste any Amazon product URL into the tool, enter your Amazon Associate Tag (for example yoursite-20), and click Generate. The tool extracts the product's ASIN and builds a clean affiliate link in the format https://amazon.com/dp/ASIN?tag=yourtag that tracks your commissions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create an Amazon affiliate link without SiteStripe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SiteStripe is Amazon's on-site toolbar, but you don't need it. As long as you have an approved Amazon Associates account and your tracking ID (Associate Tag), a link generator builds the same trackable link from any product URL or ASIN — useful on mobile or whenever SiteStripe isn't showing.",
      },
    },
    {
      "@type": "Question",
      name: "Can I generate an affiliate link from just an ASIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you have a 10-character ASIN (such as B0XXXXXXXY), a generator detects it automatically and builds a clean /dp/ASIN link with your tag attached — no need to find the full product page first.",
      },
    },
    {
      "@type": "Question",
      name: "Which Amazon marketplaces can I generate affiliate links for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Amazon runs separate Associates programs per marketplace — amazon.com, amazon.co.uk, amazon.de, amazon.ca, amazon.in, and many more each have their own program and tracking ID. Use the Associate Tag that belongs to the specific marketplace the product is listed on; a US tag will not earn commission on amazon.co.uk traffic.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I use a clean affiliate link instead of copying the long one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Short, clean /dp/ASIN?tag= links look more professional, are easier to share on YouTube, social media, or a blog, and avoid the spammy appearance of long URLs packed with tracking parameters. They also reduce the chance of a broken or mistracked link if Amazon's URL structure changes.",
      },
    },
    {
      "@type": "Question",
      name: "Is my Amazon Associate Tag safe to use in a link generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your tag is public by design — it's meant to be visible in every affiliate link you share, since that's how Amazon attributes the sale to you. A trustworthy generator builds the link entirely in your browser and never sends your tag to a server, so the only place it appears is in the final URL you generate.",
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
      name: "How to Create an Amazon Affiliate Link Without SiteStripe",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>If you've ever tried to grab an Amazon affiliate link on your phone and couldn't find the SiteStripe toolbar, you already know the frustration. <strong>The good news: SiteStripe is just one way to build an affiliate link — you can generate the exact same trackable link from any product URL or ASIN in seconds, on any device.</strong></p>

<p>This guide walks through exactly how Amazon affiliate links work, how to build one without SiteStripe, and how to avoid the most common mistake that causes affiliates to lose commissions.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#how-it-works">How an Amazon Affiliate Link Actually Works</a></li>
  <li><a href="#without-sitestripe">How to Create a Link Without SiteStripe</a></li>
  <li><a href="#from-asin">Generating a Link From Just an ASIN</a></li>
  <li><a href="#marketplaces">Affiliate Links Across Different Amazon Marketplaces</a></li>
  <li><a href="#mistake">The Mistake That Loses Affiliates Commission</a></li>
  <li><a href="#clean-links">Why Clean Links Perform Better</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="how-it-works">How an Amazon Affiliate Link Actually Works</h2>
<p>Every Amazon affiliate link is just a normal product URL with one extra piece attached: your <strong>Associate Tag</strong> (also called a tracking ID), which looks like <code>yoursite-20</code>. When someone clicks your link and buys within the cookie window, Amazon credits the sale to that tag.</p>
<p>The core of any Amazon product link is its <strong>ASIN</strong> — a 10-character product identifier (like <code>B0CHX1W1XY</code>) that uniquely identifies the item regardless of which marketplace or URL format you started with. Strip everything else away and an affiliate link is really just: <code>amazon.com/dp/ASIN?tag=yourtag</code>.</p>

<hr />

<h2 id="without-sitestripe">How to Create a Link Without SiteStripe</h2>
<p>SiteStripe is the toolbar Amazon shows logged-in Associates at the top of product pages on desktop — but it doesn't appear on mobile browsers, in incognito mode, or if you're browsing through certain apps. None of that matters if you build the link manually instead.</p>
<p><strong>Step 1: Copy the product URL.</strong><br />Copy the link from the Amazon product page's address bar (or the "Share" option in the Amazon app).</p>
<p><strong>Step 2: Paste it into an affiliate link generator.</strong><br />Open the <a href="/tools/affiliate-link-generator">Shopyor Amazon Affiliate Link Generator</a> and paste the URL in.</p>
<p><strong>Step 3: Enter your Associate Tag.</strong><br />Type in your tag for that marketplace (e.g. <code>yoursite-20</code>). Tick "Remember my tag" so you don't have to retype it next time — it's saved only in your own browser, never sent to a server.</p>
<p><strong>Step 4: Generate and copy.</strong><br />The tool extracts the ASIN, strips out anyone else's tracking parameters, and rebuilds a clean link with your tag attached. Copy it and you're done.</p>

<hr />

<h2 id="from-asin">Generating a Link From Just an ASIN</h2>
<p>Sometimes you already have the ASIN — from a product spreadsheet, a supplier list, or Amazon's own product API — without a full URL. You don't need to go find the product page first: paste the ASIN directly (in the format <code>B0XXXXXXXY</code>) and the generator builds the same clean <code>/dp/ASIN?tag=</code> link automatically.</p>

<hr />

<h2 id="marketplaces">Affiliate Links Across Different Amazon Marketplaces</h2>
<p>Amazon runs a <strong>separate Associates program for every marketplace</strong> — amazon.com, amazon.co.uk, amazon.de, amazon.ca, amazon.in, and so on each have their own signup, their own dashboard, and their own Associate Tag.</p>
<blockquote><p><strong>Important:</strong> A US tag (<code>yoursite-20</code>) will not earn commission on a sale made through amazon.co.uk — you need a separate UK-registered tag for that marketplace, and so on for each country you target.</p></blockquote>
<p>If your audience is international, register for the Associates program in each major marketplace you get traffic from, and always double-check which tag you're pasting in before generating a link for a non-US product page.</p>

<hr />

<h2 id="mistake">The Mistake That Loses Affiliates Commission</h2>
<p>The single most common way affiliates lose commission isn't a broken link — it's <strong>someone else's tag accidentally surviving in the URL</strong>. This happens when you copy a link from a YouTube description, a comparison article, or a friend's recommendation: that link already has a tag in it, and if you just append your own tag rather than replacing the existing one, Amazon honors whichever tag parameter comes last (or sometimes the original one) — not necessarily yours.</p>
<p>A proper link generator solves this by parsing the URL down to the ASIN and discarding every existing query parameter, including anyone else's tag, before rebuilding the link with only your tag attached.</p>

<hr />

<h2 id="clean-links">Why Clean Links Perform Better</h2>
<p>A raw Amazon URL with all its default tracking parameters can run 150+ characters and look unmistakably like spam to a skeptical reader. A clean <code>amazon.com/dp/B0XXXXXXXY?tag=yourtag</code> link is roughly a third of the length, looks intentional rather than copy-pasted, and is far less likely to break if Amazon changes its default URL parameters in the future — since you're not depending on any of the extra fields they happened to include.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How do I create an Amazon affiliate link?</h3>
<p>Paste any Amazon product URL into the tool, enter your Amazon Associate Tag (for example yoursite-20), and click Generate. The tool extracts the product's ASIN and builds a clean affiliate link in the format https://amazon.com/dp/ASIN?tag=yourtag that tracks your commissions.</p>

<h3>Can I create an Amazon affiliate link without SiteStripe?</h3>
<p>Yes. SiteStripe is Amazon's on-site toolbar, but you don't need it. As long as you have an approved Amazon Associates account and your tracking ID (Associate Tag), a link generator builds the same trackable link from any product URL or ASIN — useful on mobile or whenever SiteStripe isn't showing.</p>

<h3>Can I generate an affiliate link from just an ASIN?</h3>
<p>Yes. If you have a 10-character ASIN (such as B0XXXXXXXY), a generator detects it automatically and builds a clean /dp/ASIN link with your tag attached — no need to find the full product page first.</p>

<h3>Which Amazon marketplaces can I generate affiliate links for?</h3>
<p>Amazon runs separate Associates programs per marketplace — amazon.com, amazon.co.uk, amazon.de, amazon.ca, amazon.in, and many more each have their own program and tracking ID. Use the Associate Tag that belongs to the specific marketplace the product is listed on; a US tag will not earn commission on amazon.co.uk traffic.</p>

<h3>Why should I use a clean affiliate link instead of copying the long one?</h3>
<p>Short, clean /dp/ASIN?tag= links look more professional, are easier to share on YouTube, social media, or a blog, and avoid the spammy appearance of long URLs packed with tracking parameters. They also reduce the chance of a broken or mistracked link if Amazon's URL structure changes.</p>

<h3>Is my Amazon Associate Tag safe to use in a link generator?</h3>
<p>Your tag is public by design — it's meant to be visible in every affiliate link you share, since that's how Amazon attributes the sale to you. A trustworthy generator builds the link entirely in your browser and never sends your tag to a server, so the only place it appears is in the final URL you generate.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>You don't need SiteStripe, a desktop browser, or a logged-in session to build a working Amazon affiliate link — just the product's URL or ASIN and your Associate Tag for that marketplace. Strip out any existing tracking parameters, attach your own tag, and you have a clean, trackable link ready to share anywhere.</p>
<p><strong>Ready to build one?</strong> Head to the <a href="/tools/affiliate-link-generator">Shopyor Amazon Affiliate Link Generator</a>, paste your product URL or ASIN, and generate your link in seconds — free, no signup.</p>

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
