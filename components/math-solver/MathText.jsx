"use client";

import { InlineMath, BlockMath } from "react-katex";

// Splits a line on $$...$$ (block LaTeX), $...$ (inline LaTeX), and
// **bold** segments, rendering each with KaTeX/<strong> and falling back to
// plain text if a LaTeX segment fails to parse (bad LaTeX from the model
// shouldn't crash the page). The system prompt tells the model not to use
// markdown, but this stays defensive in case it slips through anyway.
const SEGMENT_REGEX = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\*\*[^*\n]+?\*\*)/g;

function renderErrorFallback(raw) {
  return () => <span className="text-muted-foreground">{raw}</span>;
}

function renderInline(text, keyPrefix) {
  const parts = text.split(SEGMENT_REGEX).filter((part) => part !== "");

  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("$$") && part.endsWith("$$")) {
      const math = part.slice(2, -2);
      return (
        <span key={key} className="block my-2 overflow-x-auto">
          <BlockMath math={math} renderError={renderErrorFallback(part)} />
        </span>
      );
    }
    if (part.startsWith("$") && part.endsWith("$")) {
      const math = part.slice(1, -1);
      return <InlineMath key={key} math={math} renderError={renderErrorFallback(part)} />;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    return <span key={key}>{part}</span>;
  });
}

export default function MathText({ text, className = "" }) {
  if (!text) return null;

  const lines = text.split("\n");
  const blocks = [];
  let currentList = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      currentList = null;
      return;
    }
    const isListItem = /^[-*]\s+/.test(trimmed);
    if (isListItem) {
      const content = trimmed.replace(/^[-*]\s+/, "");
      if (!currentList) {
        currentList = [];
        blocks.push({ type: "list", items: currentList });
      }
      currentList.push(content);
    } else {
      currentList = null;
      blocks.push({ type: "line", content: trimmed });
    }
  });

  return (
    <div className={className}>
      {blocks.map((block, i) =>
        block.type === "list" ? (
          <ul key={i} className="my-1 list-disc space-y-1 pl-5">
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
            ))}
          </ul>
        ) : (
          <span key={i} className="block">
            {renderInline(block.content, i)}
          </span>
        ),
      )}
    </div>
  );
}
