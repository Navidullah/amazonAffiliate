"use client";

import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import TableOfContents, {
  getHierarchicalIndexes,
} from "@tiptap/extension-table-of-contents";

function slugId(text) {
  const base = (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const rand =
    globalThis.crypto && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 6)
      : Math.random().toString(36).slice(2, 8);
  return `${base}-${rand}`;
}

export default function BlogTOCContent({ html }) {
  const [anchors, setAnchors] = useState([]);
  const contentWrapRef = useRef(null);

  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit.configure({ history: false, table: false }),
      Highlight,
      FontSize,
      TextStyle,
      Blockquote,
      Image,
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-600 underline-offset-2 hover:underline",
        },
        openOnClick: true,
      }),
      TextAlign.configure({ types: ["heading", "paragraph", "tableCell"] }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: "w-full border-collapse table-auto" },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        getId: (text) => slugId(text),
        scrollParent: () => window,
        onUpdate: (list) => setAnchors(Array.isArray(list) ? list : []),
      }),
    ],
    content: html,
    editorProps: {
      attributes: { class: "prose dark:prose-invert max-w-none tiptap" },
    },
    immediatelyRender: false,
  });

  // assign IDs to actual headings so clicks jump correctly
  useEffect(() => {
    const root = contentWrapRef.current;
    if (!root || anchors.length === 0) return;
    const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");
    anchors.forEach((a, i) => {
      const el = headings[i];
      if (el && a?.id) el.id = a.id;
    });
  }, [anchors, html]);

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const HEADER_OFFSET = 96; // adjust to your sticky header height
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (!editor) return null;

  return (
    // FLEX layout (desktop: TOC left + content right; mobile: content only)
    <div className="mt-8 flex flex-row gap-6 max-md:flex-col">
      {/* TOC — hidden on mobile */}
      <aside className="hidden md:block w-[220px] shrink-0">
        <div className="sticky top-24 h-[calc(100vh-6rem)] border-l pl-4">
          <nav aria-label="Table of contents">
            <ul className="text-sm space-y-1">
              {anchors.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => scrollToAnchor(a.id)}
                    className="block w-full text-left hover:underline"
                    style={{ paddingLeft: `${(a.level - 1) * 12}px` }}
                  >
                    <span className="mr-1 rounded px-1 text-gray-500">
                      {a.index || ""}.
                    </span>
                    {a.textContent}
                  </button>
                </li>
              ))}
              {anchors.length === 0 && (
                <li className="text-xs text-muted-foreground">
                  Add headings (H1–H4) to see a table of contents.
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Blog content */}
      <main className="flex-1 min-w-0" ref={contentWrapRef}>
        <EditorContent editor={editor} />
      </main>
    </div>
  );
}
