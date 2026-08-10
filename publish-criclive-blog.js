// publish-criclive-blog.js
// One-off script to publish the "CricLive" app announcement article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-criclive-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-criclive-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "criclive-free-cricket-scoring-app-android";
const TITLE =
  "CricLive: The Free Cricket Scoring App for Tennis Ball & Hard Ball Matches (Android)";
const EXCERPT =
  "Meet CricLive, a free Android app for scoring cricket matches — tennis ball or hard ball, online or offline, no signup required. Here's how it works and how to get started.";
const CATEGORY = "Sports Apps";
// referrer param lets Google Play Console attribute installs to this blog post
// (Play Console > Statistics > Referrer traffic, or in GA4 install campaigns).
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cricketscoring.scoring_app" +
  "&referrer=" +
  encodeURIComponent("utm_source=shopyor_blog&utm_medium=blog&utm_campaign=criclive_blog_post");
const TAGS = [
  "free cricket scoring app",
  "cricket scoring app android",
  "tennis ball cricket scorer",
  "tape ball cricket scoring app",
  "offline cricket scoring app",
  "cricket score app india pakistan",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is CricLive free to download and use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, CricLive is completely free to download from the Google Play Store. There is no subscription, no paywall for scoring, and no signup required to start scoring a match.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an internet connection to use CricLive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. CricLive works both online and offline. You can score a local street or ground match entirely offline, and switch to online mode when you want to share a live scorecard with friends, teammates, or spectators who aren't at the ground.",
      },
    },
    {
      "@type": "Question",
      name: "Can CricLive score tennis ball (tape ball) cricket matches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CricLive is built to handle both formats played across South Asia — traditional hard ball (leather ball) cricket and tennis ball or tape ball cricket, which is extremely popular in local and gully cricket in India, Pakistan, and Bangladesh.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account to start scoring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No signup or login is required. You can open the app and start scoring a match immediately, which makes it convenient for quick local matches where nobody wants to fill out a registration form before play starts.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries is CricLive most popular in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CricLive is used worldwide but is especially popular in India, Pakistan, and Bangladesh, where cricket — including informal tennis ball and gully cricket — is played and followed at a huge scale, both in local tournaments and casual weekend matches.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I download CricLive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CricLive is available for free on the Google Play Store for Android devices. Search for \"CricLive\" or use the direct link on the app's Play Store listing to install it.",
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
      name: "CricLive: The Free Cricket Scoring App",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>If you've ever tried to keep score for a local cricket match with a scrap of paper and a pencil, you already know how it goes — overs get miscounted, someone loses track of extras, and by the twelfth over nobody agrees on the actual total. <strong>CricLive</strong> is a free Android app built to fix exactly that: fast, accurate cricket scoring for any match, whether it's a proper hard ball league game or a tennis ball (tape ball) match on the street.</p>

<p>In this guide, I'll walk through what CricLive does, how it handles both hard ball and tennis ball cricket, why it works without an internet connection, and how to get started scoring your first match.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-criclive">What Is CricLive?</a></li>
  <li><a href="#features">Key Features</a></li>
  <li><a href="#tennis-vs-hardball">Scoring Tennis Ball and Hard Ball Cricket</a></li>
  <li><a href="#online-offline">Online and Offline Scoring, Explained</a></li>
  <li><a href="#how-to-use">How to Score Your First Match with CricLive</a></li>
  <li><a href="#who-its-for">Who CricLive Is Built For</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-criclive">What Is CricLive?</h2>
<p>CricLive is a free Android app for scoring cricket matches in real time. Instead of relying on a notebook, a whiteboard, or a scoring app that assumes every match is an official hard ball fixture, CricLive is designed around how cricket is actually played across India, Pakistan, Bangladesh, and other cricket-loving countries — which includes a huge amount of informal tennis ball and tape ball cricket played in streets, parks, and local grounds.</p>
<p>You open the app, set up two teams, and start scoring ball by ball — runs, wickets, extras, overs — with the app handling the math and the scorecard for you.</p>

<hr />

<h2 id="features">Key Features</h2>
<ul>
  <li><strong>Free, no signup required</strong> — install and start scoring immediately, no account or login screen in the way.</li>
  <li><strong>Works online and offline</strong> — score a match anywhere, even with no signal, and go online when you want to share the score live.</li>
  <li><strong>Supports both formats</strong> — traditional hard ball (leather ball) cricket and tennis ball / tape ball cricket.</li>
  <li><strong>Ball-by-ball scoring</strong> — runs, extras (wides, no-balls, byes, leg-byes), wickets, and overs tracked automatically.</li>
  <li><strong>Live scorecards</strong> — share the running score with players and spectators who aren't at the ground.</li>
  <li><strong>Built for local cricket culture</strong> — designed with the way cricket is actually played in India, Pakistan, and Bangladesh in mind, not just official league formats.</li>
</ul>
<p><strong>Try it now:</strong> <a href="${PLAY_STORE_URL}" target="_blank" rel="noopener noreferrer">Download CricLive on Google Play →</a></p>

<hr />

<h2 id="tennis-vs-hardball">Scoring Tennis Ball and Hard Ball Cricket</h2>
<p>Most cricket scoring apps are built with only proper hard ball matches in mind — club cricket, school cricket, official league fixtures. But across South Asia, an enormous amount of cricket is played with a tennis ball or a tape ball instead, in streets, gullies, parks, and local tournaments that never touch an official scorer.</p>
<p>CricLive treats both formats as first-class: whether you're scoring a hard ball match on a proper pitch or a fast-paced tennis ball game with a smaller squad and different local rules, the app adapts to how your match is actually being played rather than forcing you into a rigid, league-only format.</p>

<hr />

<h2 id="online-offline">Online and Offline Scoring, Explained</h2>
<p>One of the most practical things about CricLive is that it doesn't assume you have a stable internet connection. A lot of local cricket grounds — especially in smaller towns or rural areas — have patchy or no signal.</p>
<ul>
  <li><strong>Offline mode:</strong> Score the entire match locally on your phone with no internet needed. Perfect for a quick match at a ground with no signal.</li>
  <li><strong>Online mode:</strong> When you do have a connection, you can score live and let others — teammates, family, or fans following from home — watch the score update in real time.</li>
</ul>
<p>This flexibility means you're never blocked from scoring a match just because of where you're playing.</p>

<hr />

<h2 id="how-to-use">How to Score Your First Match with CricLive</h2>

<h3>Step 1: Download and install CricLive</h3>
<p>Get the app for free from the <a href="${PLAY_STORE_URL}" target="_blank" rel="noopener noreferrer">Google Play Store</a>. No signup is required to open it.</p>

<h3>Step 2: Set up your two teams</h3>
<p>Enter the team names and players for both sides. This takes less than a minute, even for a casual match put together on the spot.</p>

<h3>Step 3: Choose your match format</h3>
<p>Pick whether you're scoring a hard ball or tennis ball match, set the number of overs, and start play.</p>

<h3>Step 4: Score ball by ball</h3>
<p>As each ball is bowled, log the outcome — runs, a wicket, a wide, a no-ball — with a tap. CricLive keeps the scorecard, run rate, and overs updated automatically so nobody has to do the math by hand.</p>

<h3>Step 5: Share or save the result</h3>
<p>If you're online, share the live scorecard with anyone following the match. Either way, the final scorecard is saved in the app once the match ends.</p>

<blockquote><p><strong>Tip:</strong> Because there's no login step, CricLive is especially handy for spontaneous matches — you can be scoring within a minute of deciding to play.</p></blockquote>

<hr />

<h2 id="who-its-for">Who CricLive Is Built For</h2>
<ul>
  <li>Groups organizing regular tennis ball or tape ball cricket in their neighborhood or society.</li>
  <li>Local tournament organizers who need a simple, reliable way to keep score across multiple matches.</li>
  <li>Hard ball club and school teams who want a fast scoring app without complicated setup.</li>
  <li>Anyone in India, Pakistan, Bangladesh, or elsewhere who plays cricket casually and wants a proper scorecard without a notebook.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Is CricLive free to download and use?</h3>
<p>Yes, CricLive is completely free to download from the Google Play Store. There is no subscription, no paywall for scoring, and no signup required to start scoring a match.</p>

<h3>Do I need an internet connection to use CricLive?</h3>
<p>No. CricLive works both online and offline. You can score a local street or ground match entirely offline, and switch to online mode when you want to share a live scorecard with friends, teammates, or spectators who aren't at the ground.</p>

<h3>Can CricLive score tennis ball (tape ball) cricket matches?</h3>
<p>Yes. CricLive is built to handle both formats played across South Asia — traditional hard ball (leather ball) cricket and tennis ball or tape ball cricket, which is extremely popular in local and gully cricket in India, Pakistan, and Bangladesh.</p>

<h3>Do I need to create an account to start scoring?</h3>
<p>No signup or login is required. You can open the app and start scoring a match immediately, which makes it convenient for quick local matches where nobody wants to fill out a registration form before play starts.</p>

<h3>Which countries is CricLive most popular in?</h3>
<p>CricLive is used worldwide but is especially popular in India, Pakistan, and Bangladesh, where cricket — including informal tennis ball and gully cricket — is played and followed at a huge scale, both in local tournaments and casual weekend matches.</p>

<h3>Where can I download CricLive?</h3>
<p>CricLive is available for free on the Google Play Store for Android devices. Search for "CricLive" or use the direct link on the app's Play Store listing to install it.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Whether you're organizing a weekend tennis ball tournament or scoring a proper hard ball club match, CricLive gives you a fast, free way to keep an accurate scorecard — with no signup, no internet dependency, and support for the way cricket is actually played across India, Pakistan, and Bangladesh.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>CricLive is free, requires no signup, and works on Android.</li>
  <li>It scores both hard ball and tennis ball / tape ball cricket.</li>
  <li>It works fully offline, with the option to go live online when you have a connection.</li>
</ul>
<p><strong>Ready to score your next match?</strong> <a href="${PLAY_STORE_URL}" target="_blank" rel="noopener noreferrer">Download CricLive for free on Google Play →</a></p>

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
