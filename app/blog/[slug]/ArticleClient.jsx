"use client";

import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import {
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Check,
} from "lucide-react";

/** Fixed reading-progress bar driven by scroll position. */
export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
    />
  );
}

/** Inline share + copy-link row. */
export function ShareRow({ title }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const shareOnTwitter = () =>
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl())}`,
      "_blank",
    );

  const shareOnFacebook = () =>
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl())}`,
      "_blank",
    );

  const shareOnLinkedin = () =>
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl())}&title=${encodeURIComponent(title)}`,
      "_blank",
    );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mt-7 flex items-center gap-2 border-y py-3">
      <span className="mr-1 text-xs font-medium text-muted-foreground">
        Share
      </span>
      <button
        onClick={shareOnTwitter}
        aria-label="Share on Twitter"
        className="rounded-full p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-muted hover:text-[#1DA1F2]"
      >
        <Twitter className="h-4 w-4" />
      </button>
      <button
        onClick={shareOnFacebook}
        aria-label="Share on Facebook"
        className="rounded-full p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-muted hover:text-[#4267B2]"
      >
        <Facebook className="h-4 w-4" />
      </button>
      <button
        onClick={shareOnLinkedin}
        aria-label="Share on LinkedIn"
        className="rounded-full p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-muted hover:text-[#0077B5]"
      >
        <Linkedin className="h-4 w-4" />
      </button>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-500" /> Copied
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5" /> Copy link
          </>
        )}
      </button>
    </div>
  );
}
