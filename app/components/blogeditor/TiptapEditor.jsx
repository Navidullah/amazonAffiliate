"use client";

import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import { Placeholder } from "@tiptap/extensions";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import TableOfContents, {
  getHierarchicalIndexes,
} from "@tiptap/extension-table-of-contents";

import MenuBar from "./MenuBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function slugId(text) {
  const base = (text || "")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const rand =
    globalThis.crypto && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 6)
      : Math.random().toString(36).slice(2, 8);
  return `${base}-${rand}`;
}

export default function TiptapEditor({ value, onChange }) {
  const [anchors, setAnchors] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: true, table: false }),
      Highlight,
      FontSize,
      TextStyle,
      Blockquote,
      Image,
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 font-semibold hover:underline",
        },
        openOnClick: false,
        linkOnPaste: false,
      }),
      TextAlign.configure({ types: ["heading", "paragraph", "tableCell"] }),
      Placeholder.configure({ placeholder: "Write something …" }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: "w-full border-collapse table-auto" },
      }),
      TableRow,
      TableHeader,
      TableCell,

      // ToC with index numbers
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        getId: (text) => slugId(text),
        scrollParent: () => window,
        onUpdate: (list) => setAnchors(Array.isArray(list) ? list : []),
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border rounded-md py-2 px-3 tiptap prose dark:prose-invert max-w-full",
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    immediatelyRender: false,
  });

  if (!editor) return <LoadingSpinner />;

  return (
    <div className="flex flex-row max-md:flex-col-reverse">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen max-md:static max-md:h-auto border-l max-md:border-l-0 max-md:border-b w-60 md:w-80 p-4">
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

      {/* Main */}
      <main className="flex flex-col w-full h-full overflow-auto">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="tiptap" />
      </main>
    </div>
  );
}
