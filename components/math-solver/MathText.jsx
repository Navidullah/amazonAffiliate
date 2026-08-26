"use client";

import { InlineMath, BlockMath } from "react-katex";

// Splits a string on $$...$$ (block) and $...$ (inline) LaTeX segments and
// renders each piece with KaTeX, falling back to plain text if a segment
// fails to parse (bad LaTeX from the model shouldn't crash the page).
const SEGMENT_REGEX = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;

function renderErrorFallback(raw) {
  return () => <span className="text-muted-foreground">{raw}</span>;
}

export default function MathText({ text, className = "" }) {
  if (!text) return null;

  const parts = text.split(SEGMENT_REGEX).filter((part) => part !== "");

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const math = part.slice(2, -2);
          return (
            <span key={i} className="block my-2 overflow-x-auto">
              <BlockMath math={math} renderError={renderErrorFallback(part)} />
            </span>
          );
        }
        if (part.startsWith("$") && part.endsWith("$")) {
          const math = part.slice(1, -1);
          return (
            <InlineMath key={i} math={math} renderError={renderErrorFallback(part)} />
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
