// publish-robots-blog.js
// One-off script to publish the "How to Create a Robots.txt File for SEO" article
// into MongoDB. Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-robots-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-robots-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-create-robots-txt-file-for-seo";
const TITLE =
  "How to Create a Robots.txt File for SEO (Free Generator + Examples, 2026)";
const EXCERPT =
  "Learn how to create a robots.txt file for SEO the easy way. Free step-by-step guide with examples for WordPress, Shopify & Blogger — plus how to block AI bots like GPTBot. Generate yours in seconds with ShopYor.";
const CATEGORY = "SEO";
const TAGS = [
  "robots.txt generator",
  "how to create robots.txt file",
  "robots.txt for seo",
  "custom robots.txt generator",
  "block ai bots robots.txt",
  "robots.txt example",
  "robots.txt for wordpress",
];

// FAQ + Breadcrumb JSON-LD embedded in the body so Google can surface rich
// results (BlogPosting schema is already added by the page component).
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a robots.txt file in simple terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A robots.txt is a small plain-text file that lives in the root of your website (yourdomain.com/robots.txt). It tells search engine crawlers like Googlebot which pages and folders they're allowed to visit and which to skip. Think of it as a doorman for the bots that crawl your site.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a robots.txt file for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fastest way is to use a free robots.txt generator. With ShopYor's tool you pick a template (WordPress, Shopify, Blogger or Custom), add your domain and sitemap, toggle the folders or AI bots you want to block, then copy or download the file — no coding needed. Upload it to your site root and you're done.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I put the robots.txt file on my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It must go in the root directory so it loads at https://yourdomain.com/robots.txt. Search engines only read robots.txt from the root — placing it in a sub-folder will not work. On WordPress you can add it via an SEO plugin; on most hosts you upload it through your file manager or FTP.",
      },
    },
    {
      "@type": "Question",
      name: "Can robots.txt block AI bots like ChatGPT and Claude?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can add a User-agent block for each AI crawler — such as GPTBot, ChatGPT-User, ClaudeBot, Google-Extended, CCBot and PerplexityBot — followed by 'Disallow: /'. This blocks them from scraping your content for AI training while keeping Google and Bing fully allowed. ShopYor's generator adds all of them with one click.",
      },
    },
    {
      "@type": "Question",
      name: "Will robots.txt remove my page from Google search?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Robots.txt only controls crawling, not indexing. A blocked URL can still appear in search results without a description. To fully remove a page, allow crawling and add a 'noindex' meta tag, or password-protect the page instead.",
      },
    },
    {
      "@type": "Question",
      name: "Does every website need a robots.txt file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Technically no — if you have no file, crawlers assume they can crawl everything. But a robots.txt is strongly recommended because it lets you point search engines to your sitemap, protect your crawl budget, and keep low-value or duplicate URLs out of crawling. It takes one minute to create and is a core part of technical SEO.",
      },
    },
  ],
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.shopyor.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://www.shopyor.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Create a Robots.txt File for SEO",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Here's a question that trips up even experienced site owners: <strong>one tiny text file can quietly decide how Google sees your entire website.</strong> Get it right, and search engines crawl your best pages efficiently. Get it wrong, and you can accidentally hide your whole site from Google — it happens more often than you'd think.</p>

<p>That file is called <strong>robots.txt</strong>, and the good news is you don't need to be a developer to create one. In this guide I'll walk you through exactly what it does, how to write it, and the safest way to build a perfect one in under a minute using a free <a href="/tools/robots-txt-generator">robots.txt generator</a> — with real examples for WordPress, Shopify, and Blogger along the way.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is">What Is a Robots.txt File (and Why It Matters for SEO)</a></li>
  <li><a href="#how-it-works">How Robots.txt Actually Works</a></li>
  <li><a href="#generator">The Easiest Way: Use a Free Robots.txt Generator</a></li>
  <li><a href="#syntax">Robots.txt Syntax: The Rules Explained</a></li>
  <li><a href="#examples">Robots.txt Examples for WordPress, Shopify & Blogger</a></li>
  <li><a href="#block-ai">How to Block AI Bots Like GPTBot and ChatGPT</a></li>
  <li><a href="#mistakes">5 Robots.txt Mistakes That Hurt Your SEO</a></li>
  <li><a href="#upload">How to Upload and Test Your Robots.txt</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is">What Is a Robots.txt File (and Why It Matters for SEO)</h2>
<p>A <strong>robots.txt file</strong> is a simple text document that sits in the root of your website — reachable at <code>yourdomain.com/robots.txt</code>. Its job is to give instructions to web crawlers (also called bots or spiders) about which parts of your site they're allowed to access.</p>

<p>When Googlebot arrives at your site, the very first thing it looks for is your robots.txt file. It reads your rules, then crawls accordingly. That makes this little file one of the most important — and most overlooked — pieces of technical SEO.</p>

<h3>Why You Should Care About Robots.txt</h3>
<p>A well-built robots.txt does three things that directly affect your rankings:</p>
<ul>
  <li><strong>Protects your crawl budget.</strong> Search engines only spend so much time crawling your site. Blocking low-value URLs (filters, search results, admin pages) means more crawl time for the pages you actually want ranked.</li>
  <li><strong>Points crawlers to your sitemap.</strong> Adding your XML sitemap to robots.txt is the fastest way to help Google discover every page on your site.</li>
  <li><strong>Keeps junk out of crawling.</strong> Duplicate content, thank-you pages, and parameter URLs can dilute your SEO. Robots.txt keeps crawlers focused.</li>
</ul>

<p>For the official word straight from the source, Google's own <a href="https://developers.google.com/search/docs/crawling-indexing/robots/intro" target="_blank" rel="noopener noreferrer">robots.txt documentation</a> is worth a bookmark.</p>

<hr />

<h2 id="how-it-works">How Robots.txt Actually Works</h2>
<p>Robots.txt follows a standard called the <em>Robots Exclusion Protocol</em>. Every rule is built from two basic parts: a <strong>user-agent</strong> (which bot the rule applies to) and one or more <strong>directives</strong> (what that bot can or can't do).</p>

<p>Here's the simplest possible example:</p>
<pre><code>User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml</code></pre>

<p>In plain English, that says: <em>"Every bot (*) is allowed to crawl everything, and here's my sitemap."</em> That's a perfectly valid, SEO-friendly robots.txt for most websites.</p>

<p>One important thing to understand: <strong>robots.txt controls crawling, not indexing.</strong> Blocking a page stops bots from reading it, but if other sites link to it, the URL can still show up in search results (just without a description). To truly remove a page, you need a <code>noindex</code> tag — not robots.txt.</p>

<hr />

<h2 id="generator">The Easiest Way: Use a Free Robots.txt Generator</h2>
<p>You <em>can</em> write robots.txt by hand in a text editor. But one stray slash can accidentally block your entire site — so unless you enjoy living dangerously, the smarter move is to use a tool that gets the syntax right for you.</p>

<p>Our free <a href="/tools/robots-txt-generator">Robots.txt Generator</a> does exactly that. Here's how to create your file in about 60 seconds:</p>

<ol>
  <li><strong>Pick a template.</strong> Choose a quick-start preset — WordPress, Shopify, Blogger, or "Block AI Bots" — or start from scratch.</li>
  <li><strong>Enter your domain.</strong> Type in your website address and the tool automatically adds your sitemap URL.</li>
  <li><strong>Set your rules.</strong> Toggle which folders to block, add custom Allow/Disallow paths, and set a crawl-delay if needed.</li>
  <li><strong>Block AI bots (optional).</strong> Flip on crawlers like GPTBot or ClaudeBot to keep AI scrapers out while Google stays allowed.</li>
  <li><strong>Copy or download.</strong> Check the live preview and the built-in SEO validation, then grab your file.</li>
</ol>

<blockquote><p><strong>Why use the generator instead of copy-pasting?</strong> It includes a live SEO checker that warns you the moment you do something risky — like blocking your whole site or hiding CSS and JavaScript from Google. That safety net alone is worth it.</p></blockquote>

<p style="text-align:center;"><strong><a href="/tools/robots-txt-generator">→ Create your free robots.txt file now</a></strong></p>

<hr />

<h2 id="syntax">Robots.txt Syntax: The Rules Explained</h2>
<p>Even if you use a generator, it helps to understand what each line means. Here are the directives you'll actually use:</p>

<table>
  <thead>
    <tr><th>Directive</th><th>What it does</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>User-agent</strong></td><td>Names the crawler a rule applies to. <code>*</code> means all bots.</td></tr>
    <tr><td><strong>Disallow</strong></td><td>Blocks a path or pattern from being crawled.</td></tr>
    <tr><td><strong>Allow</strong></td><td>Permits a path — even inside a disallowed folder.</td></tr>
    <tr><td><strong>Sitemap</strong></td><td>Points crawlers to your XML sitemap (use the full URL).</td></tr>
    <tr><td><strong>Crawl-delay</strong></td><td>Seconds to wait between requests (Bing & Yandex honor it; Googlebot ignores it).</td></tr>
  </tbody>
</table>

<p>Two special characters give you fine control:</p>
<ul>
  <li><code>*</code> — a wildcard that matches any sequence of characters. Example: <code>Disallow: /*?</code> blocks every URL containing a question mark.</li>
  <li><code>$</code> — matches the end of a URL. Example: <code>Disallow: /*.pdf$</code> blocks all PDF files.</li>
</ul>

<hr />

<h2 id="examples">Robots.txt Examples for WordPress, Shopify & Blogger</h2>
<p>Different platforms create different "junk" URLs, so the ideal robots.txt varies. Here are tested starting points you can generate instantly with the tool.</p>

<h3>Robots.txt for WordPress</h3>
<pre><code>User-agent: *
Allow: /
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /?s=
Sitemap: https://example.com/sitemap_index.xml</code></pre>
<p>This blocks the WordPress admin area and internal search results while keeping the AJAX endpoint (which themes need) accessible.</p>

<h3>Robots.txt for Shopify / eCommerce</h3>
<pre><code>User-agent: *
Allow: /
Disallow: /cart
Disallow: /checkout
Disallow: /account
Disallow: /*?*sort_by*
Disallow: /*?*filter*
Sitemap: https://example.com/sitemap.xml</code></pre>
<p>Online stores generate endless filter and sort URLs. Blocking them protects your crawl budget and prevents duplicate-content issues.</p>

<h3>Robots.txt for Blogger</h3>
<pre><code>User-agent: *
Allow: /
Disallow: /search
Sitemap: https://example.com/sitemap.xml</code></pre>
<p>Blogger's <code>/search</code> paths create thin, duplicate pages — blocking them keeps your blog's crawl focused on real posts.</p>

<p>Don't want to copy these manually? The <a href="/tools/robots-txt-generator">generator</a> builds the correct version for your exact domain in one click.</p>

<hr />

<h2 id="block-ai">How to Block AI Bots Like GPTBot and ChatGPT</h2>
<p>This is the big 2026 question: <strong>do you want AI companies training their models on your content for free?</strong> If the answer is no, robots.txt is your first line of defense.</p>

<p>AI crawlers each have their own user-agent name. To block them, you add a rule for each one:</p>

<pre><code>User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: PerplexityBot
Disallow: /</code></pre>

<p>The beauty of this approach is that it's <strong>surgical</strong>: you block the AI scrapers while leaving Googlebot and Bingbot completely free to crawl and rank your site. You lose nothing in search visibility.</p>

<p>Typing all those out is tedious, so the ShopYor generator has a one-click <strong>"Block AI Bots"</strong> template that adds GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot, Bytespider and more — instantly. <a href="/tools/robots-txt-generator">Try it here</a>.</p>

<hr />

<h2 id="mistakes">5 Robots.txt Mistakes That Hurt Your SEO</h2>
<p>I've audited hundreds of sites, and the same robots.txt errors come up again and again. Avoid these:</p>

<ol>
  <li><strong>Blocking your entire site by accident.</strong> A lone <code>Disallow: /</code> under <code>User-agent: *</code> hides everything from Google. This is the #1 traffic-killer — usually left over from a staging site.</li>
  <li><strong>Blocking CSS and JavaScript.</strong> Google needs to render your pages like a browser does. If you block your <code>/assets/</code> or theme files, your pages may look broken to Google and rank worse.</li>
  <li><strong>Using robots.txt to hide private data.</strong> Robots.txt is public — anyone can read <code>yourdomain.com/robots.txt</code>. Listing secret folders there is basically a map for snoopers. Use passwords instead.</li>
  <li><strong>Forgetting the sitemap line.</strong> Leaving out your sitemap means missing the easiest free SEO win available.</li>
  <li><strong>Relying on crawl-delay for Google.</strong> Googlebot ignores <code>Crawl-delay</code>. Control Google's crawl rate in Search Console instead.</li>
</ol>

<p>The <a href="/tools/robots-txt-generator">generator's live validation</a> catches mistakes 1, 2 and 4 automatically — another reason to let a tool handle it.</p>

<hr />

<h2 id="upload">How to Upload and Test Your Robots.txt</h2>
<p>Once you've generated your file, here's how to put it live:</p>

<h3>Step 1: Upload to Your Root Directory</h3>
<ul>
  <li><strong>WordPress:</strong> Use an SEO plugin like Yoast or Rank Math (both have a robots.txt editor), or upload via your hosting file manager.</li>
  <li><strong>Static / custom site:</strong> Drop <code>robots.txt</code> into your public root folder via FTP or your host's file manager.</li>
  <li><strong>Shopify:</strong> Edit the <code>robots.txt.liquid</code> template under your theme's code.</li>
</ul>

<h3>Step 2: Confirm It's Live</h3>
<p>Open <code>https://yourdomain.com/robots.txt</code> in your browser. You should see your file exactly as you created it.</p>

<h3>Step 3: Test It in Google Search Console</h3>
<p>Use Google's robots.txt report in <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">Search Console</a> to make sure Google can read your file and that you haven't accidentally blocked anything important. The generator even includes a one-click link to Google's tester.</p>

<p><strong>Bonus:</strong> While you're optimizing technical SEO, generate clean meta tags too with our free <a href="/tools/meta-tag-generator">Meta Tag Generator</a>, and explore the full <a href="/tools">collection of free SEO tools</a>.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What is a robots.txt file in simple terms?</h3>
<p>A robots.txt is a small plain-text file that lives in the root of your website (yourdomain.com/robots.txt). It tells search engine crawlers like Googlebot which pages and folders they're allowed to visit and which to skip — like a doorman for the bots that crawl your site.</p>

<h3>How do I create a robots.txt file for free?</h3>
<p>The fastest way is to use a free <a href="/tools/robots-txt-generator">robots.txt generator</a>. Pick a template, add your domain and sitemap, toggle the folders or AI bots you want to block, then copy or download the file — no coding needed. Upload it to your site root and you're done.</p>

<h3>Where do I put the robots.txt file on my website?</h3>
<p>It must go in the root directory so it loads at https://yourdomain.com/robots.txt. Search engines only read robots.txt from the root — placing it in a sub-folder won't work. On WordPress you can add it via an SEO plugin; on most hosts you upload it through your file manager or FTP.</p>

<h3>Can robots.txt block AI bots like ChatGPT and Claude?</h3>
<p>Yes. Add a User-agent block for each AI crawler — GPTBot, ChatGPT-User, ClaudeBot, Google-Extended, CCBot, PerplexityBot and others — followed by "Disallow: /". This blocks them from scraping your content for AI training while keeping Google and Bing fully allowed.</p>

<h3>Will robots.txt remove my page from Google search?</h3>
<p>No. Robots.txt only controls crawling, not indexing. A blocked URL can still appear in search results without a description. To fully remove a page, allow crawling and add a "noindex" meta tag, or password-protect the page instead.</p>

<h3>Does every website need a robots.txt file?</h3>
<p>Technically no — without a file, crawlers assume they can crawl everything. But it's strongly recommended, because it lets you point search engines to your sitemap, protect your crawl budget, and keep low-value URLs out of crawling. It takes one minute to create.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Your robots.txt file is small, but its impact on SEO is anything but. Done right, it guides search engines to your best content, protects your crawl budget, points bots to your sitemap, and now even keeps AI scrapers from harvesting your work.</p>

<p><strong>Here's what you learned:</strong></p>
<ul>
  <li>What robots.txt is and why it's a foundation of technical SEO.</li>
  <li>The exact syntax — user-agents, Allow, Disallow, Sitemap and wildcards.</li>
  <li>Ready-to-use examples for WordPress, Shopify and Blogger.</li>
  <li>How to block AI bots like GPTBot and ClaudeBot in one move.</li>
  <li>The five mistakes that quietly tank your rankings — and how to avoid them.</li>
</ul>

<p>You don't have to write a single line by hand. <strong>Build a perfect, SEO-ready robots.txt in under a minute</strong> with our free tool — complete with templates, AI-bot blocking, and live validation.</p>

<p style="text-align:center;"><strong><a href="/tools/robots-txt-generator">→ Open the free Robots.txt Generator</a></strong></p>

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
      (await users.findOne({ role: "admin" })) || (await users.findOne({}));
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
    console.log(
      "Word count:",
      wordCount,
      "| Reading time:",
      readingTime,
      "min",
    );
    if (result.upsertedId) {
      console.log("✅ Published NEW post:", result.upsertedId);
    } else {
      console.log(
        "✅ Updated existing post (matched:",
        result.matchedCount + ")",
      );
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
