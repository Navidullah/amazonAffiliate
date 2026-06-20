// publish-meta-tags-blog.js
// One-off script to publish the "Meta Tags for SEO" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-meta-tags-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-meta-tags-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "meta-tags-for-seo-complete-guide";
const TITLE =
  "Meta Tags for SEO: The Complete Guide (+ Free Generator, 2026)";
const EXCERPT =
  "A plain-English guide to meta tags for SEO — title tags, meta descriptions, Open Graph and Twitter Cards. Learn the ideal lengths, see examples, and generate perfect tags free with ShopYor.";
const CATEGORY = "SEO";
const TAGS = [
  "meta tags for seo",
  "meta tag generator",
  "title tag",
  "meta description",
  "open graph tags",
  "twitter card tags",
  "html meta tags",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are meta tags in simple terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meta tags are small pieces of HTML code in the <head> of a web page that describe the page to search engines and social networks. The most important are the title tag and meta description, which decide how your page looks in Google results.",
      },
    },
    {
      "@type": "Question",
      name: "What is the ideal length for a title tag and meta description?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep title tags to about 50–60 characters and meta descriptions to about 150–160 characters so Google doesn't cut them off. ShopYor's meta tag generator shows a live character counter that turns green when you're in the ideal range.",
      },
    },
    {
      "@type": "Question",
      name: "Do meta keywords still matter for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Google has ignored the meta keywords tag for years because it was abused. Focus on a strong title tag, a compelling meta description, and Open Graph tags instead. The keywords tag is optional and harmless but won't help you rank.",
      },
    },
    {
      "@type": "Question",
      name: "What are Open Graph and Twitter Card tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open Graph (og:) tags control the title, description and image shown when your link is shared on Facebook, LinkedIn and most apps. Twitter Card tags do the same for X (Twitter). Adding both makes your links look professional everywhere they're shared.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I put meta tags on my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste them inside the <head> section of your HTML, before the closing </head> tag. On WordPress you can add them with an SEO plugin like Yoast or Rank Math instead of editing code.",
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
      name: "Meta Tags for SEO: The Complete Guide",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>You can write the best article on the internet, but if your <strong>meta tags</strong> are weak, hardly anyone will click it. Those two short lines Google shows in the search results — the blue title and the grey description — are the storefront window for every page you publish. Get them right and your click-through rate climbs; ignore them and you leave traffic on the table.</p>

<p>The good news? Meta tags are one of the easiest SEO wins there is. In this guide I'll explain every tag that matters in plain English, show you the ideal lengths, and walk you through generating a perfect set in seconds with a free <a href="/tools/meta-tag-generator">meta tag generator</a> — complete with a live Google preview.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-are">What Are Meta Tags?</a></li>
  <li><a href="#title">The Title Tag — Your #1 Meta Tag</a></li>
  <li><a href="#description">The Meta Description</a></li>
  <li><a href="#robots">The Meta Robots Tag</a></li>
  <li><a href="#og">Open Graph Tags (Facebook & LinkedIn)</a></li>
  <li><a href="#twitter">Twitter Card Tags</a></li>
  <li><a href="#generate">Generate All Your Meta Tags in Seconds</a></li>
  <li><a href="#mistakes">Common Meta Tag Mistakes</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-are">What Are Meta Tags?</h2>
<p>Meta tags are snippets of HTML that live in the <code>&lt;head&gt;</code> section of a web page. Visitors never see them on the page itself — they're written for machines: search engines like Google, and social platforms like Facebook and X. They quietly tell those machines what your page is about and how it should be displayed.</p>

<p>There are dozens of meta tags, but only a handful actually move the needle in 2026. Let's go through them in order of importance.</p>

<hr />

<h2 id="title">The Title Tag — Your #1 Meta Tag</h2>
<p>The title tag is the single most important on-page SEO element after your content itself. It's the clickable blue headline in Google's results and the label on your browser tab.</p>

<pre><code>&lt;title&gt;Free Meta Tag Generator — SEO, Open Graph &amp; Twitter&lt;/title&gt;</code></pre>

<h3>Title tag best practices</h3>
<ul>
  <li><strong>Length:</strong> aim for 50–60 characters so Google doesn't truncate it with an ellipsis.</li>
  <li><strong>Keyword placement:</strong> put your main keyword near the start.</li>
  <li><strong>Uniqueness:</strong> every page needs its own title — never duplicate.</li>
  <li><strong>Add your brand:</strong> a short "— BrandName" at the end builds recognition.</li>
</ul>

<hr />

<h2 id="description">The Meta Description</h2>
<p>The meta description is the grey snippet of text under your title in search results. Google doesn't use it as a direct ranking factor, but it heavily influences whether someone clicks — and click-through rate absolutely affects rankings.</p>

<pre><code>&lt;meta name="description" content="Generate SEO, Open Graph and Twitter Card meta tags with a live preview. Free, copy-paste ready." /&gt;</code></pre>

<h3>Meta description best practices</h3>
<ul>
  <li><strong>Length:</strong> 150–160 characters is the sweet spot.</li>
  <li><strong>Write for humans:</strong> make a promise that earns the click.</li>
  <li><strong>Include the keyword:</strong> Google bolds matching search terms.</li>
  <li><strong>Add a soft call to action:</strong> "Learn how", "Try it free", etc.</li>
</ul>

<p>Tip: ShopYor's <a href="/tools/meta-tag-generator">meta tag generator</a> shows a live character counter that turns green inside the ideal range, plus a Google search preview so you can see your snippet before it goes live.</p>

<hr />

<h2 id="robots">The Meta Robots Tag</h2>
<p>The meta robots tag tells search engines whether to index a page and follow its links.</p>

<pre><code>&lt;meta name="robots" content="index, follow" /&gt;</code></pre>

<p>Use <code>index, follow</code> for pages you want ranked, and <code>noindex, nofollow</code> for thank-you pages, login screens or duplicate content you'd rather keep out of search. This works hand in hand with your robots.txt file — if you're not sure how that fits in, see our guide on <a href="/blog/how-to-create-robots-txt-file-for-seo">how to create a robots.txt file for SEO</a>.</p>

<hr />

<h2 id="og">Open Graph Tags (Facebook & LinkedIn)</h2>
<p>Ever shared a link and watched it turn into a neat card with an image, title and description? That's Open Graph doing its job. Without these tags, social platforms guess — usually badly.</p>

<pre><code>&lt;meta property="og:title" content="Free Meta Tag Generator" /&gt;
&lt;meta property="og:description" content="Create SEO &amp; social meta tags with a live preview." /&gt;
&lt;meta property="og:image" content="https://example.com/cover.jpg" /&gt;
&lt;meta property="og:url" content="https://example.com/" /&gt;
&lt;meta property="og:type" content="website" /&gt;</code></pre>

<p>The most important one is <strong>og:image</strong>. Use a 1200×630px image for a crisp, full-width card. For the full specification, Facebook's <a href="https://developers.facebook.com/docs/sharing/webmasters/" target="_blank" rel="noopener noreferrer">sharing documentation</a> is the canonical reference.</p>

<hr />

<h2 id="twitter">Twitter Card Tags</h2>
<p>X (formerly Twitter) uses its own tags to build link previews. They mirror Open Graph but with a <code>twitter:</code> prefix.</p>

<pre><code>&lt;meta name="twitter:card" content="summary_large_image" /&gt;
&lt;meta name="twitter:title" content="Free Meta Tag Generator" /&gt;
&lt;meta name="twitter:description" content="Create SEO &amp; social meta tags instantly." /&gt;
&lt;meta name="twitter:image" content="https://example.com/cover.jpg" /&gt;</code></pre>

<p>The <code>summary_large_image</code> card gives you that big, eye-catching preview image that stands out in a busy feed.</p>

<hr />

<h2 id="generate">Generate All Your Meta Tags in Seconds</h2>
<p>Writing all of this by hand for every page gets tedious fast — and a single typo can break a tag. That's exactly why we built the free <a href="/tools/meta-tag-generator">Meta Tag Generator</a>. Here's how to use it:</p>

<ol>
  <li><strong>Enter your details</strong> — page title, description, URL and a social image.</li>
  <li><strong>Watch the live preview</strong> — see a real Google search snippet and a social share card update as you type, with character counters keeping you in range.</li>
  <li><strong>Copy the code</strong> — grab clean, valid HTML or download it as a file.</li>
  <li><strong>Paste it into your &lt;head&gt;</strong> — and you're done.</li>
</ol>

<p style="text-align:center;"><strong><a href="/tools/meta-tag-generator">→ Open the free Meta Tag Generator</a></strong></p>

<hr />

<h2 id="mistakes">Common Meta Tag Mistakes</h2>
<ol>
  <li><strong>Duplicate titles and descriptions.</strong> Copy-pasting the same meta tags across pages confuses Google and wastes ranking potential.</li>
  <li><strong>Titles that get truncated.</strong> Over 60 characters and Google cuts you off mid-sentence.</li>
  <li><strong>Empty meta descriptions.</strong> Leave it blank and Google scrapes a random sentence from your page — rarely the one you'd choose.</li>
  <li><strong>Missing og:image.</strong> Your shared links look bare and get fewer clicks.</li>
  <li><strong>Keyword stuffing.</strong> Cramming keywords into the description reads like spam and lowers click-through.</li>
</ol>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What are meta tags in simple terms?</h3>
<p>Meta tags are small pieces of HTML in the head of a page that describe it to search engines and social networks. The title tag and meta description are the most important because they shape how your page looks in Google.</p>

<h3>What is the ideal length for a title tag and meta description?</h3>
<p>About 50–60 characters for the title and 150–160 for the description, so Google doesn't truncate them. Our <a href="/tools/meta-tag-generator">generator</a> shows a live counter that turns green in the ideal range.</p>

<h3>Do meta keywords still matter for SEO?</h3>
<p>No. Google has ignored the meta keywords tag for years. Focus on the title, description and Open Graph tags instead.</p>

<h3>What are Open Graph and Twitter Card tags?</h3>
<p>Open Graph tags control how your link looks when shared on Facebook and LinkedIn; Twitter Cards do the same for X. Together they turn shared links into clean, branded preview cards.</p>

<h3>Where do I put meta tags on my website?</h3>
<p>Inside the &lt;head&gt; section of your HTML, before the closing tag. On WordPress, use an SEO plugin like Yoast or Rank Math.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Meta tags are small, but they punch far above their weight. A sharp title and description lift your click-through rate in search; Open Graph and Twitter Cards make every shared link look professional. None of it requires coding skill — just a few minutes and the right tool.</p>

<p><strong>Ready to optimize your pages?</strong> Generate a complete, copy-paste-ready set of meta tags — with a live Google and social preview — using our free tool.</p>

<p style="text-align:center;"><strong><a href="/tools/meta-tag-generator">→ Try the Meta Tag Generator free</a></strong></p>

<p>Want to go further with technical SEO? Pair this with our <a href="/tools/robots-txt-generator">Robots.txt Generator</a> or browse <a href="/tools">all free SEO tools</a>.</p>

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
      (await users.findOne({ role: "admin" })) || (await users.findOne({}));
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
    if (result.upsertedId) console.log("✅ Published NEW post:", result.upsertedId);
    else console.log("✅ Updated existing post (matched:", result.matchedCount + ")");
    console.log("URL: https://www.shopyor.com/blog/" + SLUG);
  } finally {
    await client.close();
  }
}

run().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
