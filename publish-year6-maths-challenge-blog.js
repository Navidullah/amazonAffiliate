// publish-year6-maths-challenge-blog.js
// One-off script to publish a blog post introducing the new interactive
// Maths Challenge feature (/maths) — a free, browser-based Year 6 KS2
// maths practice tool with instant feedback, a daily challenge, and an
// optional progress dashboard. Idempotent: re-running updates the same
// post (matched by slug).
//   Run: node publish-year6-maths-challenge-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-year6-maths-challenge-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "year-6-maths-challenge-free-online-ks2-practice";
const TITLE =
  "Year 6 Maths Challenge: Free Online KS2 Practice With Instant Feedback";
const EXCERPT =
  "A free, interactive Year 6 maths practice tool for parents and teachers — 15 KS2 topics, instant feedback that actually teaches, a daily challenge, and an optional progress dashboard. No signup, no printing.";
const CATEGORY = "KS2 Maths";
const TAGS = [
  "year 6 maths practice online free",
  "ks2 maths quiz",
  "maths challenge for kids",
  "help my child with year 6 maths",
  "year 6 maths games",
  "interactive maths questions year 6",
  "british curriculum maths practice",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Year 6 Maths Challenge really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely free, with no signup required to start practising. Progress saves automatically in the browser your child is using. Signing in is entirely optional and only exists so progress can follow your child across devices, such as a tablet at home and a laptop at school.",
      },
    },
    {
      "@type": "Question",
      name: "What Year 6 maths topics does it cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All 15 areas of the UK Year 6 (KS2) maths curriculum: place value, the four operations, factors/multiples/primes, fractions, decimals, percentages, ratio and proportion, algebra, measurement, perimeter/area/volume, properties of shapes, position and direction, statistics, word problems, and mathematical reasoning.",
      },
    },
    {
      "@type": "Question",
      name: "Is this suitable for children outside the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for any child following the UK National Curriculum or a British curriculum syllabus — including many international schools in Pakistan, India, Nigeria, the UAE, the Philippines, and Bangladesh. The Year 6/KS2 terminology is a UK curriculum term, not a UK-only audience.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a printable worksheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A worksheet gives a fixed set of questions with no feedback until an adult marks it. The Maths Challenge marks every answer instantly and explains the method whether the answer was right or wrong, and questions are randomised each attempt so the same topic can be practised repeatedly without memorising a fixed answer sheet.",
      },
    },
    {
      "@type": "Question",
      name: "Can parents track their child's progress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A progress dashboard shows total points, questions answered, accuracy, and how many of the 15 topics are fully completed. Signing in (optional, via Google or GitHub) saves that dashboard to an account so it's visible on any device, not just the one that was used that day.",
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
      name: "Year 6 Maths Challenge",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Most "free maths practice" for Year 6 falls into one of two buckets: a PDF worksheet that needs printing and manual marking, or a video lesson that's fine for teaching a concept but doesn't actually make a child <em>do</em> any maths. What's harder to find is something in between — quick, low-pressure practice that marks itself instantly and explains <em>why</em> an answer was right or wrong, not just whether it was.</p>

<p>That's the gap the new <a href="/maths">Maths Challenge</a> is built to fill: a free, browser-based Year 6 KS2 maths practice tool covering all 15 curriculum topics, with instant feedback, a daily challenge, and an optional dashboard so parents can actually see what's improving.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-it">What Is the Maths Challenge?</a></li>
  <li><a href="#topics">The 15 Year 6 Topics Covered</a></li>
  <li><a href="#feedback">Why Instant Feedback Matters More Than Instant Marking</a></li>
  <li><a href="#daily">The Daily Maths Challenge</a></li>
  <li><a href="#dashboard">Tracking Progress: The Optional Parent Dashboard</a></li>
  <li><a href="#international">Is This Just for UK Families?</a></li>
  <li><a href="#worksheets-vs-quiz">Interactive Practice vs. Printable Worksheets</a></li>
  <li><a href="#tips">Getting the Most Out of It at Home</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-it">What Is the Maths Challenge?</h2>
<p>The <a href="/maths">Maths Challenge</a> is a free, interactive practice area covering the full UK Year 6 (Key Stage 2) maths curriculum. A child picks a topic — say, Fractions or Ratio and Proportion — chooses a difficulty (Easy, Medium, Hard, or Mixed), and works through a short set of questions that mix multiple-choice and typed answers. Every answer is marked the moment it's submitted, with an explanation of the correct method shown either way, and correct answers earn points with streak bonuses for consecutive right answers.</p>

<p>There's no printing, no scanning a completed worksheet back in, and no waiting for someone to mark it. It's designed to be started and finished in one sitting — most topic sessions run around ten questions, short enough for a genuine after-school ten-minute practice slot rather than a full "sit down and do your homework" event.</p>

<hr />

<h2 id="topics">The 15 Year 6 Topics Covered</h2>
<p>Every topic on the <a href="/maths/year-6">Year 6 topics page</a> maps directly onto the UK National Curriculum for Key Stage 2 maths, grouped into the same six strands the curriculum itself uses:</p>

<ul>
  <li><strong>Number:</strong> Place Value, Four Operations, Factors/Multiples/Primes, <a href="/maths/year-6/fractions">Fractions</a>, Decimals, Percentages, Ratio and Proportion</li>
  <li><strong>Algebra:</strong> Algebra</li>
  <li><strong>Measurement:</strong> Measurement, Perimeter/Area/Volume</li>
  <li><strong>Geometry:</strong> Properties of Shapes, Position and Direction</li>
  <li><strong>Statistics:</strong> Statistics</li>
  <li><strong>Problem Solving:</strong> Word Problems, Mathematical Reasoning</li>
</ul>

<p>These are the same topic areas assessed in the KS2 maths SATs, so working through them isn't practice for its own sake — it's directly reinforcing what a Year 6 class is expected to know by the end of the year.</p>

<hr />

<h2 id="feedback">Why Instant Feedback Matters More Than Instant Marking</h2>
<p>Plenty of online quizzes mark instantly. Fewer actually teach anything when the answer is wrong. On the Maths Challenge, an incorrect answer to a fractions question like "Sarah ate 3/8 of a pizza and her brother ate 2/8 — how much did they eat altogether?" doesn't just show a red cross next to the right answer. It explains the method: "3/8 + 2/8 = 5/8 — add the numerators, keep the denominator the same." A correct answer gets the same explanation, so even a lucky guess reinforces the right reasoning rather than just banking a point.</p>

<p>This matters because the most common failure mode with online practice tools is a child clicking through answers without absorbing anything — right or wrong doesn't change what happens next. Explaining every answer, not just the wrong ones, closes that gap.</p>

<hr />

<h2 id="daily">The Daily Maths Challenge</h2>
<p>Alongside the 15 full topics, there's a separate <a href="/maths/daily">Daily Maths Challenge</a> — five mixed questions pulled from across every topic, the same for everyone on a given day, refreshing at midnight. It's deliberately short: a five-minute daily habit rather than a full topic session, for days when a longer practice sitting isn't realistic but a quick warm-up still is. Most primary teachers recommend short, frequent practice over one long weekly cram session for exactly this reason — a few minutes a day keeps number facts and methods fresh.</p>

<hr />

<h2 id="dashboard">Tracking Progress: The Optional Parent Dashboard</h2>
<p>Every practice session updates a progress summary — total points, questions answered, accuracy percentage, and how many of the 15 topics are fully completed (meaning every question in that topic's bank has been answered correctly at least once). By default this saves in the browser being used, with no account needed.</p>

<p>For parents who want that progress to follow their child between devices — a tablet at home, a school laptop, a sibling's phone — signing in (optional, via Google or GitHub, no new password to remember) syncs it to a "My Maths Progress" dashboard with the same stats plus a full badge collection and topic-by-topic breakdown. Nothing about practising requires this step; it exists purely for parents who want a single place to check in, rather than a wall in front of the practice itself.</p>

<hr />

<h2 id="international">Is This Just for UK Families?</h2>
<p>"Year 6" and "Key Stage 2 (KS2)" are UK National Curriculum terms, but the curriculum behind them is taught far beyond the UK. British curriculum and international schools around the world — including a significant number across Pakistan, India, Nigeria, the UAE, the Philippines, and Bangladesh — follow the same English National Curriculum year groups rather than a local Grade 6 syllabus. If your child's school is one of these, the 15 topics here match exactly what's being taught in class, regardless of which country you're practising from.</p>

<hr />

<h2 id="worksheets-vs-quiz">Interactive Practice vs. Printable Worksheets</h2>
<p>The Maths Challenge and Shopyor's printable <a href="/products">Year 6 worksheet packs</a> solve slightly different problems, and most families end up using both. The worksheets — like the <a href="/blog/year-6-fractions-worksheets-numerator-denominator">Year 6 Fractions Worksheets guide</a> covering WS01 and WS02 — are a fixed, offline set of questions with a printable answer key, useful for handwriting practice, screen-free revision, or a teacher setting classwork on paper. The Maths Challenge is the opposite: fully online, randomised every attempt, marked instantly, and free.</p>

<p>If your child needs to sit and write out working by hand (a real requirement for the KS2 SATs arithmetic paper), the printable packs are the better fit. If you want a quick, repeatable, no-printer-needed way to check understanding across all 15 topics, the Maths Challenge covers that.</p>

<hr />

<h2 id="tips">Getting the Most Out of It at Home</h2>
<ul>
  <li><strong>Start with the Daily Challenge.</strong> Five questions is a low-friction way to build a habit before committing to full topic sessions.</li>
  <li><strong>Let the progress bar guide the next topic.</strong> Each topic card on the <a href="/maths/year-6">Year 6 topics page</a> shows a live progress percentage, so it's easy to see which of the 15 areas still needs the most repeat practice.</li>
  <li><strong>Read the explanation even on correct answers.</strong> A right answer for the wrong reason is worth catching early — the explanation shows every time, not just after a mistake.</li>
  <li><strong>Use Mixed difficulty once a topic feels comfortable.</strong> Easy, Medium and Hard are useful for building confidence first, but Mixed is the closest thing to how a real SATs paper varies difficulty within one topic.</li>
  <li><strong>Sign in if more than one device is involved.</strong> It takes a few seconds and means progress isn't stuck on whichever device happened to be used that day.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Is the Year 6 Maths Challenge really free?</h3>
<p>Yes — completely free, with no signup required to start practising. Progress saves automatically in the browser your child is using. Signing in is entirely optional and only exists so progress can follow your child across devices.</p>

<h3>What Year 6 maths topics does it cover?</h3>
<p>All 15 areas of the UK Year 6 (KS2) maths curriculum: place value, the four operations, factors/multiples/primes, fractions, decimals, percentages, ratio and proportion, algebra, measurement, perimeter/area/volume, properties of shapes, position and direction, statistics, word problems, and mathematical reasoning.</p>

<h3>Is this suitable for children outside the UK?</h3>
<p>Yes, for any child following the UK National Curriculum or a British curriculum syllabus — including many international schools in Pakistan, India, Nigeria, the UAE, the Philippines, and Bangladesh.</p>

<h3>How is this different from a printable worksheet?</h3>
<p>A worksheet gives a fixed set of questions with no feedback until an adult marks it. The Maths Challenge marks every answer instantly and explains the method whether the answer was right or wrong, with questions randomised each attempt.</p>

<h3>Can parents track their child's progress?</h3>
<p>Yes. A progress dashboard shows total points, questions answered, accuracy, and topics completed. Signing in (optional) saves that dashboard to an account so it's visible on any device.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Regular, low-friction practice — with feedback that actually explains the method, not just the right answer — is one of the most reliable ways to build genuine confidence in Year 6 maths, whether that's ahead of the KS2 SATs or simply to keep skills sharp. The Maths Challenge is built specifically for that: free, no signup required to start, and structured around the exact 15 topics a Year 6 class covers.</p>
<p><strong>Ready to try it?</strong> Start with the <a href="/maths">Maths Challenge</a>, jump straight into a specific topic on the <a href="/maths/year-6">Year 6 topics page</a>, or warm up with today's <a href="/maths/daily">Daily Maths Challenge</a>.</p>

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
