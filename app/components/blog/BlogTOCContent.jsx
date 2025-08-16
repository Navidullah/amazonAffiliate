// app/components/blog/BlogTOCContent.jsx
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

export default function BlogTOCContent({ html, showTOC = true }) {
  const [anchors, setAnchors] = useState([]);
  const contentWrapRef = useRef(null);

  const extensions = [
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
  ];

  if (showTOC) {
    extensions.push(
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        getId: (text) => slugId(text),
        scrollParent: () => window,
        onUpdate: (list) => setAnchors(Array.isArray(list) ? list : []),
      })
    );
  }

  const editor = useEditor({
    editable: false,
    extensions,
    content: html,
    editorProps: {
      attributes: { class: "prose dark:prose-invert max-w-none tiptap" },
    },
    immediatelyRender: false,
  });

  // only assign IDs when TOC is enabled
  useEffect(() => {
    if (!showTOC) return;
    const root = contentWrapRef.current;
    if (!root || anchors.length === 0) return;
    const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");
    anchors.forEach((a, i) => {
      const el = headings[i];
      if (el && a?.id) el.id = a.id;
    });
  }, [anchors, html, showTOC]);

  if (!editor) return null;

  return showTOC ? (
    // TOC + content (desktop) / content-only (mobile)
    <div className="mt-8 flex flex-row gap-6 max-md:flex-col">
      <aside className="hidden border-r-2 md:block w-[220px] shrink-0">
        <div className="sticky top-24 h-[calc(100vh-6rem)] border-r-2 pt-4 pl-4">
          <nav aria-label="Table of contents">
            <span className="text-2xl font-bold mb-4 text-primary">
              Table of Contents
            </span>
            <ul className="text-sm space-y-1">
              {anchors.length ? (
                anchors.map((a) => (
                  <li key={a.id} className="truncate">
                    <span className="mr-1 rounded px-1 text-gray-500">
                      {a.index || ""}.
                    </span>
                    <span style={{ paddingLeft: `${(a.level - 1) * 12}px` }}>
                      {a.textContent}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-muted-foreground">
                  Add headings (H1–H4) to see a table of contents.
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>

      <main className="px-4 py-4 flex-1 min-w-0" ref={contentWrapRef}>
        <EditorContent editor={editor} />
      </main>
    </div>
  ) : (
    // Content only (no TOC)
    <main className="mt-8 px-4 py-4" ref={contentWrapRef}>
      <EditorContent editor={editor} />
    </main>
  );
}
