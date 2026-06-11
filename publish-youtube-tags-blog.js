// publish-youtube-tags-blog.js
// One-off script to publish the "How to Find YouTube Tags" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-youtube-tags-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-youtube-tags-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-find-youtube-tags-of-any-video";
const TITLE =
  "How to Find the Tags of Any YouTube Video (Free Tool + SEO Guide, 2026)";
const EXCERPT =
  "Learn how to see the hidden tags on any YouTube video, why they matter for SEO, and how to use competitor tags to get more views. Free YouTube tags extractor inside — no login needed.";
const CATEGORY = "YouTube";
const TAGS = [
  "youtube tags",
  "how to find youtube tags",
  "youtube tags extractor",
  "youtube tags for views",
  "youtube seo",
  "youtube tag finder",
  "see tags on youtube video",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I see the tags on a YouTube video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube hides tags from public view, but they're still stored in the video's data. Paste the video URL into a free YouTube tags extractor like ShopYor's and it instantly reveals every tag the creator used, plus the title and channel.",
      },
    },
    {
      "@type": "Question",
      name: "Do YouTube tags still matter in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tags are a minor ranking factor compared to title, thumbnail and watch time, but they still help — especially for niche topics, brand terms and commonly misspelled keywords. They give the algorithm extra context about your video.",
      },
    },
    {
      "@type": "Question",
      name: "How many tags should I add to a YouTube video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no magic number, but YouTube allows up to 500 characters of tags total. Most successful creators use 10–20 focused tags that mix one or two broad keywords with several specific long-tail phrases.",
      },
    },
    {
      "@type": "Question",
      name: "Is it against YouTube's rules to use competitors' tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Looking at the tags on public videos for research is completely allowed and is standard practice for YouTube SEO. Just make sure every tag you use is actually relevant to your own video — irrelevant tags can hurt reach.",
      },
    },
    {
      "@type": "Question",
      name: "Why do some YouTube videos have no tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tags are optional, so many creators — especially large channels — leave them blank and rely on title, thumbnail and watch time. If a video returns no tags, it simply means none were added.",
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
      name: "How to Find the Tags of Any YouTube Video",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Here's a little secret that successful YouTubers rarely talk about: <strong>before they publish, many of them study the tags of the videos already ranking for their topic.</strong> Those tags are a window into exactly how a creator is telling the algorithm what their video is about — and you can see them for any public video in seconds.</p>

<p>In this guide you'll learn what YouTube tags are, whether they still matter in 2026, and — most importantly — how to find the tags of any video and turn that insight into more views. We'll use a free <a href="/tools/youtube-tags-extractor">YouTube tags extractor</a> to do it, no login required.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-are">What Are YouTube Tags?</a></li>
  <li><a href="#do-they-matter">Do YouTube Tags Still Matter in 2026?</a></li>
  <li><a href="#how-to-find">How to Find the Tags of Any YouTube Video</a></li>
  <li><a href="#use-competitor">How to Use Competitor Tags the Smart Way</a></li>
  <li><a href="#add-tags">How to Add Great Tags to Your Own Video</a></li>
  <li><a href="#best-practices">YouTube Tag Best Practices</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-are">What Are YouTube Tags?</h2>
<p>YouTube tags are keywords a creator adds to a video to describe what it's about. They're invisible to viewers but visible to YouTube's algorithm, helping it understand your content, match it to searches, and surface it in the suggested-videos sidebar.</p>

<p>Think of tags as context clues. If your title says "How to make cold brew" but your topic could be confused with iced coffee, tags like <em>cold brew coffee</em>, <em>cold brew recipe</em> and <em>coffee at home</em> remove the ambiguity for the algorithm.</p>

<hr />

<h2 id="do-they-matter">Do YouTube Tags Still Matter in 2026?</h2>
<p>Let's be honest about this. YouTube itself has said tags play a "minimal role" in discovery, and your <strong>title, thumbnail, and audience retention</strong> matter far more. So no, stuffing tags won't rocket you to a million views.</p>

<p>But "minimal" isn't "zero." Tags still genuinely help in a few situations:</p>
<ul>
  <li><strong>Commonly misspelled terms</strong> — if your topic is often typed wrong, a tag catches that search.</li>
  <li><strong>Brand and product names</strong> — tags reinforce exact-match terms.</li>
  <li><strong>Niche topics</strong> — where there's less competition, every signal counts.</li>
  <li><strong>Disambiguation</strong> — telling YouTube which "Java" or "Mercury" you mean.</li>
</ul>
<p>They cost you 60 seconds to add. For that price, the small edge is worth it.</p>

<hr />

<h2 id="how-to-find">How to Find the Tags of Any YouTube Video</h2>
<p>YouTube used to show tags right on the watch page years ago, but they removed that. The tags still exist in the page data — you just need a tool to surface them. Here's how with the free <a href="/tools/youtube-tags-extractor">YouTube Tags Extractor</a>:</p>

<ol>
  <li><strong>Copy the video link.</strong> Open the YouTube video (or Short) and copy its URL from the address bar or the Share button.</li>
  <li><strong>Paste it into the tool.</strong> Go to the <a href="/tools/youtube-tags-extractor">YouTube Tags Extractor</a> and paste the link.</li>
  <li><strong>Click Extract Tags.</strong> In a second you'll see every tag, the video title, the channel, and the total character count.</li>
  <li><strong>Copy what's useful.</strong> Click any single tag to copy it, copy them all at once, or export the full list as CSV or TXT.</li>
</ol>

<p style="text-align:center;"><strong><a href="/tools/youtube-tags-extractor">→ Find any video's tags now</a></strong></p>

<p>It works on regular videos and Shorts alike. If a video comes back with no tags, that creator simply didn't add any — which itself tells you something about their strategy.</p>

<hr />

<h2 id="use-competitor">How to Use Competitor Tags the Smart Way</h2>
<p>Pulling a competitor's tags is research, not copying. Here's how to turn that data into a real advantage:</p>

<ol>
  <li><strong>Extract tags from the top 3–5 videos</strong> ranking for your target topic.</li>
  <li><strong>Look for overlap.</strong> Tags that appear across multiple ranking videos are likely the core keywords for that niche.</li>
  <li><strong>Spot the gaps.</strong> Find relevant angles your competitors missed and add those too.</li>
  <li><strong>Keep only what fits.</strong> Never add a tag that doesn't describe your video — irrelevant tags can actually suppress your reach.</li>
</ol>

<blockquote><p><strong>Pro tip:</strong> Pair tag research with a strong thumbnail. You can study the competition's thumbnails with our <a href="/tools/youtube-thumbnail">YouTube Thumbnail Downloader</a> to see what's winning the click in your niche.</p></blockquote>

<hr />

<h2 id="add-tags">How to Add Great Tags to Your Own Video</h2>
<p>Once you know which tags work, adding them is easy:</p>
<ol>
  <li>In YouTube Studio, open your video and go to <strong>Details</strong>.</li>
  <li>Scroll to <strong>Show more</strong> → <strong>Tags</strong>.</li>
  <li>Enter your tags separated by commas, most important first.</li>
  <li>Stay under YouTube's <strong>500-character total limit</strong> — the extractor shows a live counter so you can plan within it.</li>
  <li>Save. Done.</li>
</ol>

<hr />

<h2 id="best-practices">YouTube Tag Best Practices</h2>
<ul>
  <li><strong>Lead with your main keyword</strong> — the first tag carries the most weight.</li>
  <li><strong>Mix broad and long-tail</strong> — e.g. "coffee" plus "best cold brew ratio at home".</li>
  <li><strong>Stay relevant</strong> — only tags that truly describe the video.</li>
  <li><strong>Don't over-tag</strong> — 10–20 focused tags beat 50 random ones.</li>
  <li><strong>Match your title and description</strong> — consistency reinforces the topic.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How do I see the tags on a YouTube video?</h3>
<p>Paste the video URL into a free <a href="/tools/youtube-tags-extractor">YouTube tags extractor</a>. It instantly reveals every tag the creator used, along with the title and channel.</p>

<h3>Do YouTube tags still matter in 2026?</h3>
<p>They're a minor factor next to title, thumbnail and watch time, but still help for niche topics, brand terms and misspelled keywords. Worth the 60 seconds.</p>

<h3>How many tags should I add to a YouTube video?</h3>
<p>There's no fixed number, but stay within the 500-character limit. Most creators use 10–20 focused tags mixing broad and long-tail keywords.</p>

<h3>Is it against YouTube's rules to use competitors' tags?</h3>
<p>No. Researching public videos' tags is allowed and standard. Just keep every tag relevant to your own video.</p>

<h3>Why do some YouTube videos have no tags?</h3>
<p>Tags are optional. Many large channels skip them and rely on title, thumbnail and retention instead.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>YouTube tags won't single-handedly make you go viral — but they're a free, fast signal that helps the algorithm understand and recommend your video, especially in smaller niches. The real power comes from research: see what's already ranking, learn the core keywords of your topic, and apply them thoughtfully to your own uploads.</p>

<p><strong>Start with one video right now.</strong> Extract its tags, study the pattern, and plan your next upload around what actually ranks.</p>

<p style="text-align:center;"><strong><a href="/tools/youtube-tags-extractor">→ Open the free YouTube Tags Extractor</a></strong></p>

<p>Level up the rest of your channel with our <a href="/tools/youtube-thumbnail">YouTube Thumbnail Downloader</a>, <a href="/tools/youtube-video-downloader">YouTube Video Downloader</a>, or the full set of <a href="/tools">free creator tools</a>.</p>

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
        },
        $setOnInsert: { publishedAt: now, createdAt: now, views: 0 },
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
