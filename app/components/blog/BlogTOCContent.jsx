"use client";

import React, { useState } from "react";
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

  const editor = useEditor({
    editable: false, // read-only for blog detail
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

  if (!editor) return null;

  return (
    <div className="flex flex-row max-md:flex-col-reverse gap-6 mt-8">
      {/* TOC sidebar */}
      <aside className="sticky top-24 h-[calc(100vh-6rem)] max-md:static max-md:h-auto border-l max-md:border-l-0 max-md:border-b w-60 md:w-80 p-4">
        <nav aria-label="Table of contents">
          <ul className="text-sm space-y-1">
            {anchors.map((a) => (
              <li key={a.id}>
                <button
                  onClick={() => {
                    editor.chain().setTextSelection(a.pos).run();
                    editor.commands.scrollIntoView();
                  }}
                  className={`block w-full text-left hover:underline ${
                    a.isActive ? "font-semibold text-violet-600" : ""
                  }`}
                  style={{ paddingLeft: `${(a.level - 1) * 12}px` }}
                >
                  <span
                    className={`mr-1 rounded px-1 ${
                      a.isActive
                        ? "text-violet-600 bg-violet-100 dark:bg-violet-900/20 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
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
      </aside>

      {/* Blog content */}
      <main className="flex-1">
        <EditorContent editor={editor} />
      </main>
    </div>
  );
}
