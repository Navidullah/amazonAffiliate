// publish-year6-fractions-worksheets-blog.js
// One-off script to publish a blog post covering WS01 (Understanding
// Fractions) and WS02 (Numerator and Denominator Recap) — the two live
// Year 6 Fractions worksheet packs sold on the homepage/products catalog.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-year6-fractions-worksheets-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-year6-fractions-worksheets-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "year-6-fractions-worksheets-numerator-denominator";
const TITLE =
  "Year 6 Fractions Worksheets (KS2): Numerator, Denominator & Practice Questions";
const EXCERPT =
  "A parent and teacher's guide to Year 6 fractions — what the numerator and denominator actually mean, the mistakes pupils make most often, and printable KS2 practice worksheets with full answer keys.";
const CATEGORY = "KS2 Maths";
const TAGS = [
  "year 6 fractions worksheet",
  "fractions for year 6 worksheets",
  "fraction questions for year 6",
  "year 6 maths worksheets pdf",
  "year 6 maths worksheets with answers pdf",
  "numerator and denominator year 6",
  "KS2 fractions worksheets",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the numerator and denominator of a fraction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In a fraction like 3/4, the top number (3) is the numerator and the bottom number (4) is the denominator. The denominator tells you how many equal parts a whole has been divided into, and the numerator tells you how many of those parts you have or have shaded.",
      },
    },
    {
      "@type": "Question",
      name: "Why do Year 6 pupils confuse the numerator and denominator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most confusion comes from treating a fraction like two separate whole numbers rather than one value describing parts of a whole. Pupils often mix up which number represents 'how many parts in total' versus 'how many parts are shaded' — especially when a diagram isn't shown alongside the fraction. Repeated practice matching fractions to diagrams (bars, circles, shapes) is the most reliable fix.",
      },
    },
    {
      "@type": "Question",
      name: "What fractions topics come up in the Year 6 KS2 SATs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Year 6 KS2 maths SATs test understanding of numerator/denominator, equivalent fractions, comparing and ordering fractions, adding and subtracting fractions with different denominators, and converting between fractions, decimals, and percentages. A solid grasp of the numerator/denominator relationship underpins all of these.",
      },
    },
    {
      "@type": "Question",
      name: "Are these Year 6 fractions worksheets free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The worksheet packs referenced in this article (WS01 and WS02) are paid, one-time-purchase PDF downloads — £3 each, with no subscription. Each pack includes the full student worksheet plus a separate answer key with marking guidance.",
      },
    },
    {
      "@type": "Question",
      name: "Do the worksheets come with an answer key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every worksheet pack on Shopyor includes a full answer key with model answers and marking guidance for every question, so they can be marked immediately without waiting on a separate resource.",
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
      name: "Year 6 Fractions Worksheets (KS2)",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>If your Year 6 child (or your class) can recite "numerator on top, denominator on bottom" but still freezes the moment a fraction question looks even slightly different from the last one, you're not dealing with a memory problem — you're dealing with an understanding problem. Fractions are one of the few KS2 maths topics where knowing the vocabulary and actually grasping the concept are two very different things, and the gap between them is exactly where most Year 6 pupils get stuck before their SATs.</p>

<p>This guide breaks down what the numerator and denominator really mean, why children mix them up, and how to build real fluency with focused practice — including two printable Year 6 fractions worksheet packs you can use at home or in the classroom.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#why-fractions-hard">Why Fractions Trip Up Year 6 Pupils</a></li>
  <li><a href="#numerator-denominator">What the Numerator and Denominator Actually Mean</a></li>
  <li><a href="#common-mistakes">The Most Common Mistakes (And How to Spot Them)</a></li>
  <li><a href="#sats-context">Where This Fits Into the Year 6 SATs</a></li>
  <li><a href="#practice">Printable Practice: WS01 and WS02</a></li>
  <li><a href="#home-tips">Tips for Practicing at Home</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="why-fractions-hard">Why Fractions Trip Up Year 6 Pupils</h2>
<p>By Year 6, most children have met fractions dozens of times — colouring in halves and quarters since infant school, ordering fractions on a number line in Year 4, adding fractions with the same denominator in Year 5. So why does it still feel shaky going into SATs year?</p>

<p>The honest answer is that fractions are one of the few areas of primary maths that genuinely change shape as the curriculum progresses. A child can get very good at the visual version — shading in parts of a shape — without ever being asked to explain, in their own words, what a fraction is actually describing. Year 6 is where that gap gets exposed, because the questions stop being purely visual and start asking pupils to reason: compare fractions with different denominators, explain what a fraction represents, or spot when a fraction has been misread.</p>

<p>That's why going back to the absolute foundation — what the numerator and denominator each represent, and why — pays off even for children who already "know their fractions." It's the difference between pattern-matching an answer and being able to work one out from scratch.</p>

<hr />

<h2 id="numerator-denominator">What the Numerator and Denominator Actually Mean</h2>
<p>Take the fraction <strong>3/4</strong>. Two numbers, one line between them — but they're answering two completely different questions.</p>

<ul>
  <li><strong>The denominator (the bottom number, 4)</strong> answers: "How many equal parts has the whole been split into?" Here, the whole has been divided into 4 equal parts.</li>
  <li><strong>The numerator (the top number, 3)</strong> answers: "How many of those parts are we talking about?" Here, we mean 3 of those 4 parts.</li>
</ul>

<p>A simple way to check a child's understanding: ask them to explain the denominator <em>before</em> the numerator, out loud, using a real example — like a chocolate bar broken into equal pieces. If they can describe "the whole thing got split into this many pieces" before "and we're looking at this many of them," they've understood the concept rather than just memorised which word goes where.</p>

<p>This ordering matters more than it sounds. Diagrams reinforce it well: a bar split into 5 equal sections with 3 shaded is 3/5 — the denominator (5) comes from counting the total sections, and the numerator (3) comes from counting the shaded ones. Practicing reading fractions directly off diagrams — bars, circles, grids — before jumping to word problems builds this instinct solidly.</p>

<hr />

<h2 id="common-mistakes">The Most Common Mistakes (And How to Spot Them)</h2>
<p>A few errors show up again and again in Year 6 fractions work, and each one points to a specific gap:</p>

<ul>
  <li><strong>Swapping numerator and denominator.</strong> A child writes 4/3 instead of 3/4. This usually means they're reading the fraction as "two numbers" rather than "parts out of a total," and needs more practice building fractions from a described diagram rather than just labelling an existing one.</li>
  <li><strong>Assuming the denominator counts what's shaded.</strong> This is a classic SATs-style trap — a question describes a shape and asks whether a statement about the fraction is correct. Pupils who haven't internalised which number does what will often pick the wrong one confidently.</li>
  <li><strong>Struggling once the diagram disappears.</strong> A child who's fine matching a fraction to a picture can still stumble the moment they're asked to explain the concept in a full sentence, with no image to lean on. This is exactly the skill Year 6 SATs reasoning papers test.</li>
  <li><strong>Treating equivalent fractions as unrelated numbers.</strong> Once the numerator/denominator relationship is solid, equivalent fractions, comparing fractions, and ordering fractions all become much easier — they all depend on understanding that the denominator sets the "size" of each part.</li>
</ul>

<p>The fix for all four is the same: deliberate, varied practice that mixes diagrams, written fractions, and explain-your-answer questions — not just one style repeated over and over.</p>

<hr />

<h2 id="sats-context">Where This Fits Into the Year 6 SATs</h2>
<p>Fractions make a consistent appearance across the Year 6 KS2 maths SATs papers — both the arithmetic paper and the two reasoning papers. Pupils are expected to:</p>

<ul>
  <li>Identify and use the numerator and denominator correctly</li>
  <li>Simplify fractions and recognise equivalent fractions</li>
  <li>Compare and order fractions, including those with different denominators</li>
  <li>Add and subtract fractions with different denominators</li>
  <li>Convert between fractions, decimals, and percentages</li>
  <li>Explain their reasoning in full sentences — a skill specific to the reasoning papers</li>
</ul>

<p>Every one of these builds directly on the numerator/denominator foundation covered in this guide. A pupil who's shaky on "which number means what" will find every topic above harder than it needs to be — which is exactly why it's worth revisiting even in Year 6, rather than assuming it was "covered" in an earlier year.</p>

<hr />

<h2 id="practice">Printable Practice: WS01 and WS02</h2>
<p>Reading about fractions only goes so far — the actual skill is built through practice, ideally with immediate feedback so mistakes get caught and corrected rather than repeated. To go with this guide, Shopyor has two printable Year 6 fractions worksheet packs, each with 12 questions and a full answer key:</p>

<h3>WS01 — Understanding Fractions</h3>
<p>Covers fractions as parts of a whole and parts of a set, with worked examples and working space built in. A good starting point for reinforcing what a fraction represents before moving on to numerator/denominator specifics.</p>
<p><a href="/products/uk-ks2-maths-year-6-fractions-ws01">View WS01: Understanding Fractions →</a></p>

<h3>WS02 — Numerator and Denominator Recap</h3>
<p>Covers exactly the concept explained in this article — identifying the numerator and denominator from a written fraction, reading fractions from bar and pie diagrams, and explaining in full sentences what each part of a fraction represents. Includes reasoning-style questions ("Sam says... Is Sam correct?") that mirror the explain-your-answer style used in the real SATs reasoning papers.</p>
<p><a href="/products/uk-ks2-maths-year-6-fractions-ws02">View WS02: Numerator and Denominator Recap →</a></p>

<p>Both packs are instant PDF downloads — pay once, no subscription, no sign-up — and each includes a separate answer key with marking guidance, so they can be marked immediately whether you're a parent working through it at the kitchen table or a teacher setting it as classwork.</p>
<p><strong>Browse the full catalog:</strong> <a href="/products">All Year 6 Maths worksheets →</a></p>

<hr />

<h2 id="home-tips">Tips for Practicing at Home</h2>
<p>A few things that make fractions practice more effective, whether you're using a worksheet pack or working from a textbook:</p>

<ul>
  <li><strong>Say it before you write it.</strong> Before filling in an answer, get your child to explain out loud what the denominator and numerator mean in that specific question. This catches "guessed the right number without understanding why" much faster than marking alone does.</li>
  <li><strong>Use real objects occasionally.</strong> A pizza, a chocolate bar, a strip of paper folded into equal parts — physical examples make the "equal parts of a whole" idea concrete again if it's started to feel abstract.</li>
  <li><strong>Mix diagram questions with explain-your-answer questions.</strong> Don't let practice become one repetitive question type. The SATs reasoning papers specifically test whether a pupil can explain a concept, not just apply it silently.</li>
  <li><strong>Mark it together, not just for them.</strong> Going through the answer key side by side — rather than just handing back a marked sheet — turns every mistake into a two-minute teaching moment instead of a missed mark.</li>
  <li><strong>Little and often beats one long session.</strong> Two focused 15-minute sessions a week tend to stick better than one hour crammed in before a test.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What is the numerator and denominator of a fraction?</h3>
<p>In a fraction like 3/4, the top number (3) is the numerator and the bottom number (4) is the denominator. The denominator tells you how many equal parts a whole has been divided into, and the numerator tells you how many of those parts you have or have shaded.</p>

<h3>Why do Year 6 pupils confuse the numerator and denominator?</h3>
<p>Most confusion comes from treating a fraction like two separate whole numbers rather than one value describing parts of a whole. Pupils often mix up which number represents "how many parts in total" versus "how many parts are shaded" — especially when a diagram isn't shown alongside the fraction. Repeated practice matching fractions to diagrams is the most reliable fix.</p>

<h3>What fractions topics come up in the Year 6 KS2 SATs?</h3>
<p>The Year 6 KS2 maths SATs test understanding of numerator/denominator, equivalent fractions, comparing and ordering fractions, adding and subtracting fractions with different denominators, and converting between fractions, decimals, and percentages. A solid grasp of the numerator/denominator relationship underpins all of these.</p>

<h3>Are these Year 6 fractions worksheets free?</h3>
<p>The worksheet packs referenced in this article (WS01 and WS02) are paid, one-time-purchase PDF downloads — £3 each, with no subscription. Each pack includes the full student worksheet plus a separate answer key with marking guidance.</p>

<h3>Do the worksheets come with an answer key?</h3>
<p>Yes. Every worksheet pack on Shopyor includes a full answer key with model answers and marking guidance for every question, so they can be marked immediately without waiting on a separate resource.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>The numerator and denominator aren't just two words to memorise in the right order — they're the foundation everything else in Year 6 fractions is built on, from equivalent fractions to SATs reasoning questions. A child who genuinely understands what each number represents will find the rest of the fractions curriculum noticeably easier, because they're reasoning from understanding instead of guessing from a half-remembered rule.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>The denominator counts the total equal parts; the numerator counts how many of them you have.</li>
  <li>Mixing up the two is usually a sign a child is pattern-matching rather than understanding — go back to diagrams and physical examples to fix it.</li>
  <li>Year 6 SATs papers test explanation as much as calculation, so practice should include "explain your answer" questions, not just fill-in-the-blank.</li>
</ul>
<p><strong>Ready to practice?</strong> Get <a href="/products/uk-ks2-maths-year-6-fractions-ws01">WS01: Understanding Fractions</a> or <a href="/products/uk-ks2-maths-year-6-fractions-ws02">WS02: Numerator and Denominator Recap</a> — instant PDF download, full answer key included, pay once.</p>

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
