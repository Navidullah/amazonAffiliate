// publish-ib-aahl-paper1-worked-solutions-blog.js
// One-off script to publish a blog post covering the IB Mathematics AA HL
// Paper 1 Style practice pack (Set 1) — the first IB product sold on the
// homepage/products catalog.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-ib-aahl-paper1-worked-solutions-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-ib-aahl-paper1-worked-solutions-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "ib-math-aa-hl-paper-1-practice-worked-solutions";
const TITLE =
  "IB Math AA HL Paper 1: How to Practice With Worked Solutions (Method Marks & Examiner Tips)";
const EXCERPT =
  "A practice guide for IB Mathematics: Analysis & Approaches HL Paper 1 — what the non-calculator paper actually tests, how M1/A1/R1 marks work, and an 8-question original practice set with fully worked solutions.";
const CATEGORY = "IB Maths";
const TAGS = [
  "ib math aa hl practice questions",
  "ib math aa hl worked solutions",
  "ib math aa hl paper 1",
  "ib math aa hl exam style questions",
  "ib mathematics analysis and approaches hl",
  "ib math aa hl method marks",
  "ib math aa hl paper 1 practice",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is IB Math AA HL Paper 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AA HL is the Higher Level track of IB Mathematics: Analysis and Approaches. Paper 1 is the non-calculator paper — typically 2 hours, worth 110 marks, split into a short-answer Section A and a longer-question Section B, covering the full range of HL topics without a calculator: algebra, functions, geometry & trigonometry, statistics & probability, and calculus.",
      },
    },
    {
      "@type": "Question",
      name: "What do M1, A1, and R1 mean on an IB Math mark scheme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These are the three mark types IB examiners use. M marks (method) are awarded for using a correct method, even if the final answer is wrong. A marks (accuracy) are awarded for a correct numerical answer that follows from correct working. R marks (reasoning) are awarded for a valid line of logical reasoning, common in 'show that' or justification questions. Understanding which type of mark a step earns is the fastest way to see exactly where marks are being lost, not just whether the final answer was right.",
      },
    },
    {
      "@type": "Question",
      name: "How is Paper 1 different from Paper 2 and Paper 3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paper 1 is non-calculator and tests the same HL syllabus as Paper 2, but forces every calculation to be done by hand — so questions are chosen where a calculator isn't strictly necessary, and manual algebraic fluency matters more. Paper 2 allows a calculator and can include questions that would be impractical by hand. Paper 3 (HL only) is a calculator-allowed problem-solving paper built around two extended, multi-part investigative questions rather than a broad topic spread.",
      },
    },
    {
      "@type": "Question",
      name: "Is this practice set an official IB past paper?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This is an original Shopyor practice set written to match the topics, style, question format, and mark allocations of a real AA HL Paper 1, but it is not a solved official IB past paper and is not affiliated with or endorsed by the International Baccalaureate Organization (IBO). It's designed for realistic topic practice, not as a substitute for working through actual past papers.",
      },
    },
    {
      "@type": "Question",
      name: "What topics does the Set 1 practice pack cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eight questions across quadratic functions, integration and kinematics, geometric sequences, logarithms, probability (independent events, tree diagrams, and conditional probability), circular measure, and complex numbers and polynomials — 50 marks total, no calculator.",
      },
    },
    {
      "@type": "Question",
      name: "Is the practice pack free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — it's a one-time $8 PDF download with all 8 questions fully worked, method-mark tags on every step, and an examiner tip per question. No subscription or account required; the download unlocks instantly after payment.",
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
      name: "IB Math AA HL Paper 1 Practice & Worked Solutions",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Ask most IB Math AA HL students what they find hardest about Paper 1, and the answer usually isn't "I don't know the topic" — it's "I ran out of time on Section B" or "I lost marks on a question I actually knew how to do." Paper 1 doesn't just test whether you know the syllabus; it tests whether you can execute it, by hand, under time pressure, in exactly the order an examiner is looking for. This guide breaks down what Paper 1 actually rewards, how the M1/A1/R1 mark system works, and includes an original 8-question practice set with fully worked solutions to practice against.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-paper-1">What Is IB Math AA HL Paper 1?</a></li>
  <li><a href="#mark-types">M1, A1, R1 — How IB Mark Schemes Actually Work</a></li>
  <li><a href="#paper-1-vs-2-vs-3">Paper 1 vs. Paper 2 vs. Paper 3</a></li>
  <li><a href="#how-to-practice">How to Practice Effectively for Paper 1</a></li>
  <li><a href="#practice">Practice Set: 8 Questions, Fully Worked (Set 1)</a></li>
  <li><a href="#mistakes">Where Students Actually Lose Marks</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-paper-1">What Is IB Math AA HL Paper 1?</h2>
<p>IB Mathematics: Analysis and Approaches (AA) is one of the two IB Math courses, and Higher Level (HL) is the more demanding of its two levels. HL students sit three papers: Paper 1 (non-calculator, 2 hours, 110 marks), Paper 2 (calculator allowed, 2 hours, 110 marks), and Paper 3 (calculator allowed, 1 hour, 55 marks, two extended problem-solving questions).</p>

<p>Paper 1 is split into two sections. <strong>Section A</strong> is a series of shorter, more contained questions testing individual skills — differentiate this, solve that equation, find this probability. <strong>Section B</strong> consists of a smaller number of longer, multi-part questions that often chain a result from part (a) into part (b), then (c), so a slip early in a question can cost marks on every part that follows it.</p>

<hr />

<h2 id="mark-types">M1, A1, R1 — How IB Mark Schemes Actually Work</h2>
<p>IB mark schemes don't just check whether the final answer is right. Every mark on a question is tagged with a specific type, and knowing what each one actually rewards changes how you should show your working:</p>

<ul>
  <li><strong>M1 (Method):</strong> awarded for using a valid, recognisable method — even if a later arithmetic slip means the final answer is wrong. This is why examiners consistently say "always show your working": a wrong final answer with correct method visible can still earn most of the marks on that step.</li>
  <li><strong>A1 (Accuracy):</strong> awarded for a correct value that follows from correct working. An accuracy mark is often "follow-through" — meaning it can still be awarded even if an earlier step was wrong, as long as the final step was correctly executed given that earlier (wrong) value.</li>
  <li><strong>R1 (Reasoning):</strong> awarded for valid logical justification, most common on "show that," "hence," and "justify" questions. This is the mark type students most often skip entirely by writing only the final result — R marks specifically reward the explanation, not just the answer.</li>
</ul>

<p>An "(AG)" tag next to a result means "answer given" — the final value is printed in the question, and the marks are entirely for the working that reaches it, not the number itself. Skipping steps on an AG question is one of the most common ways to lose marks on an otherwise-correct answer.</p>

<hr />

<h2 id="paper-1-vs-2-vs-3">Paper 1 vs. Paper 2 vs. Paper 3</h2>
<p>All three papers draw from the same HL syllabus, but they test it differently:</p>

<ul>
  <li><strong>Paper 1 (non-calculator):</strong> questions are chosen so they can be solved by hand — exact values, factorable expressions, standard integrals and derivatives. Manual algebraic fluency matters as much as conceptual understanding.</li>
  <li><strong>Paper 2 (calculator):</strong> can include numerically messier questions, since a GDC handles the arithmetic — more emphasis on setting up the right calculation and interpreting calculator output correctly (e.g. reading a graph, solving numerically).</li>
  <li><strong>Paper 3 (calculator, HL only):</strong> two long, guided investigative questions rather than a broad topic spread — tests sustained problem-solving across multiple linked parts of a single scenario.</li>
</ul>

<p>Because Paper 1 removes the calculator safety net, it disproportionately catches students who understand a topic conceptually but haven't built enough manual fluency — exactly the gap targeted practice closes fastest.</p>

<hr />

<h2 id="how-to-practice">How to Practice Effectively for Paper 1</h2>
<ol>
  <li><strong>Time yourself realistically.</strong> Section A questions should take roughly 3-5 minutes each; if a "short" question is taking much longer, that's a fluency gap worth flagging, not just working through slowly.</li>
  <li><strong>Write out every step, even ones that feel obvious.</strong> M marks exist because examiners want to see the method, not just trust that you did it correctly in your head.</li>
  <li><strong>Check your answer's mark type before moving on.</strong> If a step is tagged A1 and it's a follow-through mark, an earlier mistake doesn't have to cost you that mark too — but only if the later working is otherwise correct.</li>
  <li><strong>Read "show that" and "hence" questions as reasoning questions, not calculation questions.</strong> The written justification is what's being marked, not just the final line.</li>
  <li><strong>Review against a worked solution line by line, not just the final answer.</strong> The value of a worked solution is seeing exactly where a mark was earned or lost at each individual step — not confirming whether you got the same number at the end.</li>
</ol>

<hr />

<h2 id="practice">Practice Set: 8 Questions, Fully Worked (Set 1)</h2>
<p>To go with this guide, Shopyor has published an original IB Math AA HL Paper 1-style practice set — 8 questions, 50 marks, no calculator, written to match the real Paper 1 topic spread and mark allocations. Every question is fully worked with method marks tagged M1/A1/R1 in the order an examiner would award them, plus an examiner tip on each question flagging the most common mistake.</p>

<p>Topics covered: quadratic functions, integration &amp; kinematics, geometric sequences, logarithms, probability (independent events, tree diagrams &amp; conditional probability), circular measure, and complex numbers &amp; polynomials.</p>

<p><a href="/products/ib-aahl-paper1-set1-worked-solutions">View: IB Math AA HL Paper 1 Style — Original Practice Questions with Worked Solutions (Set 1) →</a></p>

<p>It's a one-time $8 PDF download — no subscription, no account, no sign-up. This is original Shopyor content written to match the AA HL Paper 1 format, not a solved official IB past paper, and is not affiliated with or endorsed by the International Baccalaureate Organization (IBO).</p>
<p><strong>Browse the full catalog:</strong> <a href="/products">All worked solutions and practice packs →</a></p>

<hr />

<h2 id="mistakes">Where Students Actually Lose Marks</h2>
<ul>
  <li><strong>Not writing the method for "obvious" steps.</strong> A correct final answer with no working can lose the M1 mark entirely if the method isn't visible on the page.</li>
  <li><strong>Treating "show that" as a calculation instead of an argument.</strong> R marks specifically reward the logical chain, not just reaching the printed answer.</li>
  <li><strong>Losing track across multi-part Section B questions.</strong> When part (c) depends on part (b)'s result, an early slip compounds — always re-check the value being carried forward, and use follow-through correctly rather than restarting from scratch.</li>
  <li><strong>Rounding before the final step.</strong> Carrying an early rounded value into a later calculation is one of the most common ways to lose an accuracy mark despite an otherwise sound method.</li>
  <li><strong>Skipping exact-value requirements.</strong> Paper 1 often expects exact forms (surds, fractions, multiples of π) rather than decimal approximations — giving a rounded decimal when an exact value was required can cost the accuracy mark even with correct method.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What is IB Math AA HL Paper 1?</h3>
<p>AA HL is the Higher Level track of IB Mathematics: Analysis and Approaches. Paper 1 is the non-calculator paper — 2 hours, 110 marks, split into a short-answer Section A and a longer-question Section B, covering the full HL syllabus without a calculator.</p>

<h3>What do M1, A1, and R1 mean on an IB Math mark scheme?</h3>
<p>M marks (method) reward a correct method even with a wrong final answer. A marks (accuracy) reward a correct value following from correct working, often as a follow-through mark. R marks (reasoning) reward valid logical justification, common on "show that" and "hence" questions.</p>

<h3>How is Paper 1 different from Paper 2 and Paper 3?</h3>
<p>Paper 1 is non-calculator, so questions are chosen to be solvable by hand. Paper 2 allows a calculator and can include numerically messier questions. Paper 3 (HL only) is calculator-allowed and built around two extended, multi-part investigative questions rather than a broad topic spread.</p>

<h3>Is this practice set an official IB past paper?</h3>
<p>No. It's an original Shopyor practice set written to match the topics, style, and mark allocations of a real Paper 1 — not a solved official past paper, and not affiliated with or endorsed by the IBO.</p>

<h3>What topics does the Set 1 practice pack cover?</h3>
<p>Quadratic functions, integration and kinematics, geometric sequences, logarithms, probability (independent events, tree diagrams, and conditional probability), circular measure, and complex numbers and polynomials — 8 questions, 50 marks, no calculator.</p>

<h3>Is the practice pack free?</h3>
<p>No — it's a one-time $8 PDF download with every question fully worked, method-mark tags on every step, and an examiner tip per question. No subscription or account required.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Paper 1 rewards manual fluency and disciplined working as much as it rewards knowing the syllabus — the students who lose the fewest marks aren't necessarily the ones who understand the most maths, they're the ones who consistently show every method step, treat reasoning questions as arguments rather than calculations, and check follow-through carefully across multi-part questions.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>M marks reward method, not just the final number — always show your working, even on steps that feel obvious.</li>
  <li>"Show that" and "hence" questions are reasoning questions: the R mark is for the argument, not the answer alone.</li>
  <li>Review worked solutions step by step against your own working, not just the final answer, to see exactly where marks were earned or lost.</li>
</ul>
<p><strong>Ready to practice?</strong> Get the <a href="/products/ib-aahl-paper1-set1-worked-solutions">IB Math AA HL Paper 1 Style Practice Set (Set 1)</a> — instant PDF download, fully worked solutions with method-mark tags and examiner tips, pay once.</p>

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
  console.error(e);
  process.exit(1);
});
