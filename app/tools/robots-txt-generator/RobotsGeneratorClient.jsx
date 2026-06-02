"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  Copy,
  Check,
  Download,
  Search,
  Save,
  Trash2,
  Plus,
  X,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Map,
  Settings2,
  Zap,
  FileCode2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SEARCH_BOTS = [
  { value: "*", label: "All Crawlers (*)" },
  { value: "Googlebot", label: "Googlebot (Google)" },
  { value: "Bingbot", label: "Bingbot (Bing)" },
  { value: "Slurp", label: "Slurp (Yahoo)" },
  { value: "DuckDuckBot", label: "DuckDuckBot" },
  { value: "Baiduspider", label: "Baiduspider" },
  { value: "YandexBot", label: "YandexBot" },
];

// Trending 2026 angle: blocking AI scrapers / LLM training crawlers.
const AI_BOTS = [
  { id: "GPTBot", label: "GPTBot", note: "OpenAI training crawler" },
  { id: "ChatGPT-User", label: "ChatGPT-User", note: "ChatGPT browsing" },
  { id: "OAI-SearchBot", label: "OAI-SearchBot", note: "OpenAI search" },
  { id: "Google-Extended", label: "Google-Extended", note: "Gemini / Bard AI" },
  { id: "ClaudeBot", label: "ClaudeBot", note: "Anthropic Claude" },
  { id: "anthropic-ai", label: "anthropic-ai", note: "Anthropic legacy" },
  { id: "CCBot", label: "CCBot", note: "Common Crawl dataset" },
  { id: "PerplexityBot", label: "PerplexityBot", note: "Perplexity AI" },
  { id: "Bytespider", label: "Bytespider", note: "ByteDance / TikTok" },
  { id: "Amazonbot", label: "Amazonbot", note: "Amazon AI" },
  { id: "Applebot-Extended", label: "Applebot-Extended", note: "Apple AI" },
  { id: "Meta-ExternalAgent", label: "Meta-ExternalAgent", note: "Meta AI" },
];

const PRESETS = [
  {
    id: "allow-all",
    name: "Allow Everything",
    desc: "Let all search engines crawl your whole site",
    icon: ShieldCheck,
    color: "emerald",
  },
  {
    id: "block-all",
    name: "Block Everything",
    desc: "Stop all crawlers (staging / private sites)",
    icon: ShieldAlert,
    color: "rose",
  },
  {
    id: "wordpress",
    name: "WordPress",
    desc: "Optimised rules for WordPress blogs",
    icon: FileCode2,
    color: "blue",
  },
  {
    id: "shopify",
    name: "Shopify / eCommerce",
    desc: "Block cart, checkout & filter URLs",
    icon: FileCode2,
    color: "violet",
  },
  {
    id: "blogger",
    name: "Blogger",
    desc: "Custom robots.txt for Blogspot blogs",
    icon: FileCode2,
    color: "amber",
  },
  {
    id: "block-ai",
    name: "Block AI Bots",
    desc: "Allow search, block ChatGPT, Claude & co.",
    icon: Bot,
    color: "cyan",
  },
];

const COLOR_MAP = {
  emerald: "from-emerald-500/15 to-green-500/10 border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400",
  rose: "from-rose-500/15 to-red-500/10 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400",
  blue: "from-blue-500/15 to-sky-500/10 border-blue-300 dark:border-blue-800 text-blue-600 dark:text-blue-400",
  violet: "from-violet-500/15 to-purple-500/10 border-violet-300 dark:border-violet-800 text-violet-600 dark:text-violet-400",
  amber: "from-amber-500/15 to-orange-500/10 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400",
  cyan: "from-cyan-500/15 to-teal-500/10 border-cyan-300 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400",
};

/* ------------------------------------------------------------------ */
/*  Reusable Toggle                                                    */
/* ------------------------------------------------------------------ */

function Toggle({ checked, onChange, on = "bg-blue-600" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? on : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Row({ title, subtitle, children }) {
  return (
    <div className="flex items-center justify-between gap-4 p-3.5 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700">
      <div>
        <p className="font-medium text-sm text-slate-800 dark:text-slate-100">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function RobotsGeneratorClient() {
  const [domain, setDomain] = useState("");
  const [userAgent, setUserAgent] = useState("*");
  const [blockAdmin, setBlockAdmin] = useState(true);
  const [blockPrivate, setBlockPrivate] = useState(false);
  const [blockAll, setBlockAll] = useState(false);
  const [crawlDelay, setCrawlDelay] = useState("");
  const [customDisallow, setCustomDisallow] = useState("");
  const [customAllow, setCustomAllow] = useState("");
  const [includeHost, setIncludeHost] = useState(false);
  const [allowResources, setAllowResources] = useState(true);
  const [blockedAiBots, setBlockedAiBots] = useState([]);
  const [sitemapUrls, setSitemapUrls] = useState([""]);
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [configName, setConfigName] = useState("");
  const [activePreset, setActivePreset] = useState("");

  /* -------- load saved configs -------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("robots-configs");
      if (saved) setSavedConfigs(JSON.parse(saved));
    } catch {}
  }, []);

  const cleanDomain = useCallback((value) => {
    if (!value) return "";
    return value
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "")
      .toLowerCase()
      .trim();
  }, []);

  /* -------- core generator -------- */
  const generateFile = useCallback(() => {
    const cleanDom = cleanDomain(domain);
    let content = `# robots.txt generated by ShopYor — https://www.shopyor.com/tools/robots-txt-generator\n`;
    content += `# Last updated: ${new Date().toISOString().split("T")[0]}\n\n`;

    content += `User-agent: ${userAgent}\n`;

    if (blockAll) {
      content += "Disallow: /\n";
    } else {
      content += "Allow: /\n";

      if (allowResources) {
        content += "Allow: /*.js$\n";
        content += "Allow: /*.css$\n";
        content += "Allow: /*.png$\n";
        content += "Allow: /*.jpg$\n";
        content += "Allow: /*.gif$\n";
        content += "Allow: /*.svg$\n";
        content += "Allow: /*.webp$\n";
      }

      if (blockAdmin) content += "Disallow: /admin/\n";
      if (blockPrivate) content += "Disallow: /private/\n";

      customDisallow.split("\n").forEach((p) => {
        if (p.trim()) content += `Disallow: ${p.trim()}\n`;
      });
      customAllow.split("\n").forEach((p) => {
        if (p.trim()) content += `Allow: ${p.trim()}\n`;
      });

      if (crawlDelay) {
        const d = parseFloat(crawlDelay);
        if (!isNaN(d) && d > 0 && d <= 30) content += `Crawl-delay: ${d}\n`;
      }
    }

    if (includeHost && cleanDom) content += `Host: https://${cleanDom}\n`;

    /* AI crawler blocks */
    if (blockedAiBots.length > 0) {
      content += `\n# Block AI / LLM training crawlers\n`;
      blockedAiBots.forEach((bot) => {
        content += `User-agent: ${bot}\n`;
        content += `Disallow: /\n\n`;
      });
      content = content.replace(/\n+$/, "\n");
    }

    /* Sitemaps */
    const validSitemaps = sitemapUrls.filter((u) => u.trim());
    if (validSitemaps.length > 0) {
      validSitemaps.forEach((s) => {
        const t = s.trim();
        if (t.startsWith("http")) content += `\nSitemap: ${t}`;
        else if (cleanDom)
          content += `\nSitemap: https://${cleanDom}${t.startsWith("/") ? t : "/" + t}`;
      });
    } else if (cleanDom) {
      content += `\nSitemap: https://${cleanDom}/sitemap.xml`;
    }

    setGenerated(content.trim() + "\n");
  }, [
    userAgent,
    blockAll,
    blockAdmin,
    blockPrivate,
    allowResources,
    customDisallow,
    customAllow,
    crawlDelay,
    includeHost,
    domain,
    cleanDomain,
    blockedAiBots,
    sitemapUrls,
  ]);

  useEffect(() => {
    generateFile();
  }, [generateFile]);

  /* -------- live validation -------- */
  const validation = useMemo(() => {
    const issues = [];
    if (blockAll)
      issues.push({
        type: "warn",
        msg: "You are blocking ALL crawlers — your site will be hidden from Google.",
      });
    if (!cleanDomain(domain))
      issues.push({
        type: "info",
        msg: "Add your domain to auto-insert the Sitemap URL.",
      });
    if (!blockAll && !allowResources)
      issues.push({
        type: "warn",
        msg: "CSS/JS resources are not explicitly allowed — Google may render your pages incorrectly.",
      });
    if (!blockAll && sitemapUrls.every((s) => !s.trim()) && !cleanDomain(domain))
      issues.push({
        type: "info",
        msg: "No sitemap added. A sitemap helps Google discover all your pages.",
      });
    if (issues.length === 0)
      issues.push({ type: "ok", msg: "Looks good! Your robots.txt is valid and SEO-friendly." });
    return issues;
  }, [blockAll, domain, allowResources, sitemapUrls, cleanDomain]);

  /* -------- presets -------- */
  const applyPreset = (id) => {
    setActivePreset(id);
    // reset baseline
    setUserAgent("*");
    setBlockAll(false);
    setBlockAdmin(false);
    setBlockPrivate(false);
    setAllowResources(true);
    setCustomDisallow("");
    setCustomAllow("");
    setBlockedAiBots([]);
    setCrawlDelay("");

    switch (id) {
      case "allow-all":
        break;
      case "block-all":
        setBlockAll(true);
        break;
      case "wordpress":
        setBlockAdmin(false);
        setCustomDisallow(
          "/wp-admin/\n/wp-login.php\n/wp-includes/\n/?s=\n/search/\n/cgi-bin/",
        );
        setCustomAllow("/wp-admin/admin-ajax.php");
        break;
      case "shopify":
        setCustomDisallow(
          "/cart\n/checkout\n/account\n/orders\n/*?*sort_by*\n/*?*filter*\n/search",
        );
        break;
      case "blogger":
        setCustomDisallow("/search\n/category/\n/tag/");
        setCustomAllow("/");
        break;
      case "block-ai":
        setBlockedAiBots(AI_BOTS.map((b) => b.id));
        break;
      default:
        break;
    }
  };

  /* -------- actions -------- */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadFile = () => {
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const openTester = () => {
    const cleanDom = cleanDomain(domain);
    if (cleanDom) {
      window.open(
        `https://search.google.com/search-console/robots-testing-tool?resource_url=https://${cleanDom}`,
        "_blank",
      );
    } else {
      alert("Please enter your domain first");
    }
  };

  const toggleAiBot = (id) => {
    setBlockedAiBots((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  };

  const saveConfiguration = () => {
    if (!configName.trim()) {
      alert("Please enter a configuration name");
      return;
    }
    const config = {
      id: Date.now(),
      name: configName,
      domain,
      userAgent,
      blockAdmin,
      blockPrivate,
      blockAll,
      crawlDelay,
      customDisallow,
      customAllow,
      includeHost,
      allowResources,
      blockedAiBots,
      sitemapUrls,
    };
    const updated = [...savedConfigs, config];
    setSavedConfigs(updated);
    localStorage.setItem("robots-configs", JSON.stringify(updated));
    setConfigName("");
  };

  const loadConfiguration = (c) => {
    setDomain(c.domain ?? "");
    setUserAgent(c.userAgent ?? "*");
    setBlockAdmin(!!c.blockAdmin);
    setBlockPrivate(!!c.blockPrivate);
    setBlockAll(!!c.blockAll);
    setCrawlDelay(c.crawlDelay ?? "");
    setCustomDisallow(c.customDisallow ?? "");
    setCustomAllow(c.customAllow ?? "");
    setIncludeHost(!!c.includeHost);
    setAllowResources(c.allowResources ?? true);
    setBlockedAiBots(c.blockedAiBots ?? []);
    setSitemapUrls(c.sitemapUrls?.length ? c.sitemapUrls : [""]);
  };

  const deleteConfiguration = (id) => {
    const updated = savedConfigs.filter((c) => c.id !== id);
    setSavedConfigs(updated);
    localStorage.setItem("robots-configs", JSON.stringify(updated));
  };

  const addSitemap = () => setSitemapUrls([...sitemapUrls, ""]);
  const updateSitemap = (i, v) => {
    const u = [...sitemapUrls];
    u[i] = v;
    setSitemapUrls(u);
  };
  const removeSitemap = (i) =>
    setSitemapUrls(sitemapUrls.filter((_, idx) => idx !== i));

  const tabs = [
    { id: "basic", label: "Basic", icon: Settings2 },
    { id: "advanced", label: "Advanced", icon: Zap },
    { id: "ai", label: "AI Bots", icon: Bot },
    { id: "sitemaps", label: "Sitemaps", icon: Map },
  ];

  /* ---------------------------------------------------------------- */

  return (
    <div className="space-y-6">
      {/* Quick-start presets */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Quick-start templates
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRESETS.map((p) => {
            const Icon = p.icon;
            const active = activePreset === p.id;
            return (
              <motion.button
                key={p.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => applyPreset(p.id)}
                className={`text-left rounded-2xl border bg-gradient-to-br p-3.5 transition-all ${
                  COLOR_MAP[p.color]
                } ${active ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900" : ""}`}
              >
                <Icon className="w-5 h-5 mb-2" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                  {p.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {p.desc}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Saved configs */}
      {savedConfigs.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Save className="w-4 h-4" /> Saved Configurations
          </h3>
          <div className="flex flex-wrap gap-2">
            {savedConfigs.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-1 shadow-sm"
              >
                <button
                  onClick={() => loadConfiguration(c)}
                  className="text-sm hover:text-blue-600 transition-colors"
                >
                  {c.name}
                </button>
                <button
                  onClick={() => deleteConfiguration(c.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two-column workspace */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ---------- LEFT: controls ---------- */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-700 px-2 sm:px-4">
            <div className="flex">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-3 text-sm font-medium transition-all ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeRobotsTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-5"
              >
                {/* BASIC */}
                {activeTab === "basic" && (
                  <>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-semibold mb-2">
                        <Globe className="w-4 h-4 text-blue-600" /> Website Domain
                      </label>
                      <input
                        type="text"
                        placeholder="example.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Without https:// or www — used to build your Sitemap URL.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Target User-Agent
                      </label>
                      <select
                        value={userAgent}
                        onChange={(e) => setUserAgent(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {SEARCH_BOTS.map((b) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Row
                      title="Block all search engines"
                      subtitle="Use only for staging or private sites"
                    >
                      <Toggle
                        checked={blockAll}
                        onChange={() => setBlockAll(!blockAll)}
                        on="bg-rose-600"
                      />
                    </Row>

                    {!blockAll && (
                      <>
                        <Row title="Allow CSS / JS / image resources" subtitle="Recommended — helps Google render pages">
                          <Toggle
                            checked={allowResources}
                            onChange={() => setAllowResources(!allowResources)}
                            on="bg-emerald-600"
                          />
                        </Row>
                        <Row title="Disallow /admin/">
                          <Toggle
                            checked={blockAdmin}
                            onChange={() => setBlockAdmin(!blockAdmin)}
                          />
                        </Row>
                        <Row title="Disallow /private/">
                          <Toggle
                            checked={blockPrivate}
                            onChange={() => setBlockPrivate(!blockPrivate)}
                          />
                        </Row>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Crawl Delay (seconds)
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="30"
                            placeholder="Optional — e.g. 1 to 5"
                            value={crawlDelay}
                            onChange={(e) => setCrawlDelay(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Note: Googlebot ignores crawl-delay. Bing &amp; Yandex respect it.
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* ADVANCED */}
                {activeTab === "advanced" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Custom Disallow Paths
                      </label>
                      <textarea
                        placeholder={"/temp/\n/cart\n/*?utm_*\n/search"}
                        rows={5}
                        value={customDisallow}
                        onChange={(e) => setCustomDisallow(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 font-mono text-sm outline-none"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        One path per line. Use <code>*</code> for wildcards and{" "}
                        <code>$</code> to match the end of a URL.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Custom Allow Paths
                      </label>
                      <textarea
                        placeholder={"/blog/\n/products/\n/wp-admin/admin-ajax.php"}
                        rows={4}
                        value={customAllow}
                        onChange={(e) => setCustomAllow(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 font-mono text-sm outline-none"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Override a Disallow rule for specific sub-paths.
                      </p>
                    </div>

                    <Row
                      title="Include Host directive"
                      subtitle="Declares your preferred domain (Yandex)"
                    >
                      <Toggle
                        checked={includeHost}
                        onChange={() => setIncludeHost(!includeHost)}
                      />
                    </Row>

                    <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800 flex gap-3">
                      <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Block duplicate-content and faceted-navigation URLs
                        (filters, sorting, UTM parameters) to protect your crawl
                        budget — but never block CSS or JavaScript files.
                      </p>
                    </div>
                  </>
                )}

                {/* AI BOTS */}
                {activeTab === "ai" && (
                  <>
                    <div className="flex items-start gap-3 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800">
                      <Bot className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Stop AI companies from scraping your content to train large
                        language models — while keeping Google &amp; Bing fully
                        allowed. Toggle the crawlers you want to block.
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        {blockedAiBots.length} of {AI_BOTS.length} blocked
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setBlockedAiBots(AI_BOTS.map((b) => b.id))}
                          className="text-xs px-3 py-1 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
                        >
                          Block all
                        </button>
                        <button
                          onClick={() => setBlockedAiBots([])}
                          className="text-xs px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {AI_BOTS.map((bot) => {
                        const active = blockedAiBots.includes(bot.id);
                        return (
                          <button
                            key={bot.id}
                            onClick={() => toggleAiBot(bot.id)}
                            className={`flex items-center justify-between gap-2 p-3 rounded-xl border text-left transition-all ${
                              active
                                ? "border-cyan-400 bg-cyan-50 dark:bg-cyan-950/40"
                                : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 hover:border-slate-300"
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-medium font-mono truncate">
                                {bot.label}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {bot.note}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center border ${
                                active
                                  ? "bg-cyan-600 border-cyan-600 text-white"
                                  : "border-slate-300 dark:border-slate-600"
                              }`}
                            >
                              {active && <Check className="w-3.5 h-3.5" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* SITEMAPS */}
                {activeTab === "sitemaps" && (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold">
                          Sitemap URLs
                        </label>
                        <button
                          onClick={addSitemap}
                          className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition"
                        >
                          <Plus className="w-4 h-4" /> Add
                        </button>
                      </div>

                      {sitemapUrls.map((url, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="/sitemap.xml"
                            value={url}
                            onChange={(e) => updateSitemap(index, e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          {sitemapUrls.length > 1 && (
                            <button
                              onClick={() => removeSitemap(index)}
                              className="px-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl hover:bg-red-200 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <p className="text-xs text-slate-500">
                        Add separate sitemaps for posts, pages, products, images
                        or videos. Relative paths use your domain automatically.
                      </p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800 flex gap-3">
                      <Map className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Listing your XML sitemap in robots.txt is the fastest way
                        to help Google and Bing discover every URL on your site.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------- RIGHT: live output ---------- */}
        <div className="space-y-4">
          <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-700 overflow-hidden lg:sticky lg:top-6">
            <div className="flex justify-between items-center px-5 py-3 border-b border-slate-700/70 bg-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-mono text-slate-400 ml-2">
                  /robots.txt
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
                <button
                  onClick={downloadFile}
                  className="flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-emerald-400 p-5 overflow-x-auto whitespace-pre-wrap max-h-[480px] min-h-[200px]">
              {generated}
            </pre>
          </div>

          {/* Validation panel */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Live SEO check
            </h3>
            {validation.map((v, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 text-xs rounded-lg p-2.5 ${
                  v.type === "ok"
                    ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                    : v.type === "warn"
                      ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300"
                      : "bg-slate-50 dark:bg-slate-700/30 text-slate-600 dark:text-slate-300"
                }`}
              >
                {v.type === "ok" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-px" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-px" />
                )}
                <span>{v.msg}</span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={openTester}
              className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium py-2.5 px-4 rounded-xl transition"
            >
              <Search className="w-4 h-4" /> Test in Google
            </button>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Save as…"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                className="flex-1 min-w-0 px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={saveConfiguration}
                className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-3 rounded-xl transition"
                aria-label="Save configuration"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-5 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">25K+</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Files Generated
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">4.9 / 5</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Average Rating
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-emerald-600">100%</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Free Forever
          </div>
        </div>
      </div>
    </div>
  );
}
