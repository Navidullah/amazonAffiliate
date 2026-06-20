// publish-clone-your-voice-blog.js
// Publishes the "How to Clone Your Own Voice for Free" SEO article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-clone-your-voice-blog.js
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("❌ DATABASE_URL is not set in .env.local. Add it, then re-run.");
  process.exit(1);
}

const SLUG = "how-to-clone-your-own-voice-free";
const TITLE = "How to Clone Your Own Voice for Free (2026 Step-by-Step Guide)";
const EXCERPT =
  "Learn how to clone your own voice for free in your browser — record or upload a short sample, type your text, and download natural AI speech. Step-by-step, no sign-up.";
const CATEGORY = "AI Voice Tools";
const TAGS = [
  "clone your own voice",
  "how to clone your voice",
  "free voice cloning",
  "ai voice clone",
  "voice clone from recording",
  "text to speech your voice",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I clone my own voice for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open Shopyor's free voice cloner, record a 10–30 second sample of your voice (or upload a clip), tick the consent box, and click Clone. Then type your text and click Generate to hear and download your cloned voice as a WAV file — no sign-up required.",
      },
    },
    {
      "@type": "Question",
      name: "How long should my voice recording be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aim for 10–30 seconds of clear speech in a quiet room. Speaking naturally and expressively, with varied intonation, gives the most lifelike clone of your own voice.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a professional microphone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A normal laptop or phone microphone works well as long as you record in a quiet space without echo or background noise. Clean audio matters far more than expensive equipment.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to clone my own voice online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cloning your own voice is safe and fully within your rights. Shopyor streams your generated audio back to you rather than publishing it, and a consent confirmation is required before every clone.",
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
      name: "How to Clone Your Own Voice for Free",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p><strong>Cloning your own voice used to require a studio and expensive software. Not anymore.</strong> With a free <strong>online voice cloning tool</strong>, you can capture your voice from a short recording and have an AI read any text back in <em>your</em> voice — in minutes, right in your browser.</p>

<p>This step-by-step guide shows you exactly how to clone your own voice for free with Shopyor, how to record a great sample, and how to get the most natural-sounding results.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#why">Why Clone Your Own Voice?</a></li>
  <li><a href="#need">What You Need</a></li>
  <li><a href="#steps">How to Clone Your Voice (Step-by-Step)</a></li>
  <li><a href="#sample">How to Record a Great Voice Sample</a></li>
  <li><a href="#natural">Tips for the Most Natural Results</a></li>
  <li><a href="#safe">Is It Safe?</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
</ol>

<hr />

<h2 id="why">Why Clone Your Own Voice?</h2>
<p>A clone of your own voice is a reusable asset. Once you've captured it, you can generate narration any time without re-recording:</p>
<ul>
  <li><strong>Content &amp; voiceovers</strong> — narrate videos, shorts, and tutorials in your own voice on demand</li>
  <li><strong>Drafts &amp; scripts</strong> — hear how a script sounds before recording for real</li>
  <li><strong>Consistency</strong> — keep one recognizable voice across all your content</li>
  <li><strong>Accessibility</strong> — preserve a personal voice for text-to-speech use</li>
</ul>

<hr />

<h2 id="need">What You Need</h2>
<ul>
  <li>A quiet room with minimal echo and background noise</li>
  <li>Any microphone — your laptop or phone mic is fine</li>
  <li>A 10–30 second sample of your voice (record live or upload a clip)</li>
  <li>The free <a href="/tools/voice-clone">Shopyor voice cloning tool</a> — no sign-up, no install</li>
</ul>

<hr />

<h2 id="steps">How to Clone Your Voice (Step-by-Step)</h2>

<h3>Step 1: Open the Voice Cloner</h3>
<p>Go to the <a href="/">Shopyor voice cloner</a>. It runs entirely in your browser — there's nothing to download.</p>

<h3>Step 2: Record or Upload Your Sample</h3>
<ul>
  <li><strong>Record:</strong> switch to the <strong>Record</strong> tab, tap the mic, and speak naturally for 10–30 seconds. Tap again to stop. You can re-record until you're happy.</li>
  <li><strong>Upload:</strong> prefer an existing clip? Drop in a WAV, MP3, or FLAC file (up to 25 MB).</li>
</ul>
<p>Then tick the <strong>consent box</strong> to confirm it's your own voice.</p>

<h3>Step 3: Clone the Voice</h3>
<p>Click <strong>"Clone this voice."</strong> The AI builds your voice model in a few seconds.</p>

<h3>Step 4: Type Your Text</h3>
<p>Enter up to <strong>1,000 characters</strong> of whatever you want your voice to say.</p>

<h3>Step 5: Generate &amp; Download</h3>
<p>Click <strong>"Generate speech,"</strong> listen to the result, and <strong>download it as a WAV file</strong>. Tweak the text and regenerate any time.</p>

<blockquote><p>Want the full background on how this works? Read our complete guide: <a href="/blog/voice-cloning-tool-online-free">Voice Cloning Tool Online — Clone Any Voice in Minutes</a>.</p></blockquote>

<hr />

<h2 id="sample">How to Record a Great Voice Sample</h2>
<p>The single biggest factor in a realistic clone is the quality of your sample. Follow these tips:</p>
<ul>
  <li><strong>Find a quiet space</strong> — turn off fans and notifications; avoid rooms with hard echo</li>
  <li><strong>Stay close to the mic</strong> — about a hand's width away, but don't breathe directly on it</li>
  <li><strong>Speak naturally</strong> — read a paragraph from a book or article in your normal tone</li>
  <li><strong>Be expressive</strong> — vary your pitch and pace; a monotone sample produces a flat clone</li>
  <li><strong>Avoid clipping</strong> — don't speak so loudly that the audio distorts</li>
</ul>

<hr />

<h2 id="natural">Tips for the Most Natural Results</h2>
<ul>
  <li>Use clear punctuation in your text — commas and full stops control phrasing and pauses</li>
  <li>Keep sentences a natural length; break very long lines into shorter ones</li>
  <li>If a take sounds off, edit the wording and generate again — small changes can help a lot</li>
  <li>Re-record your sample if the clone doesn't capture your voice well the first time</li>
</ul>

<hr />

<h2 id="safe">Is It Safe?</h2>
<p>Cloning <strong>your own</strong> voice is completely within your rights. Shopyor requires a consent confirmation before every clone, and your generated audio is streamed back to you rather than published. As a rule, only ever clone a voice you own or have explicit permission to use — and disclose when audio is AI-generated.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>
<h3>How do I clone my own voice for free?</h3>
<p>Open the free Shopyor voice cloner, record or upload a 10–30 second sample, tick consent, and click Clone. Type your text, click Generate, and download your cloned voice as a WAV — no sign-up.</p>
<h3>How long should my voice recording be?</h3>
<p>Aim for 10–30 seconds of clear speech in a quiet room. Natural, expressive delivery produces the most lifelike clone.</p>
<h3>Do I need a professional microphone?</h3>
<p>No. A normal laptop or phone mic is fine as long as the recording is clean and quiet. Audio quality matters more than expensive gear.</p>
<h3>Is it safe to clone my own voice online?</h3>
<p>Yes. It's within your rights, a consent step is required, and your generated audio is streamed back to you rather than shared.</p>

<hr />

<p><strong>Ready to hear your AI voice?</strong> <a href="/">Clone your voice free with Shopyor →</a></p>

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
