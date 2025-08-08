"use client";

import React from "react";
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
import ToCSidebar from "./ToCSidebar";

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
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true,
        table: false, // disable built-in to avoid conflicts with @tiptap/extension-table
      }),
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
      TextAlign.configure({
        types: ["heading", "paragraph", "tableCell"],
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "w-full border-collapse table-auto",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,

      // ⬇️ Table of Contents
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes, // 1, 1.1, 1.2…
        getId: (text) => slugId(text), // stable, unique IDs
        scrollParent: () => window, // or return a scrollable container element
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border rounded-md py-2 px-3 tiptap prose dark:prose-invert max-w-full",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false, // avoids hydration mismatch in Next.js
  });

  if (!editor) return <LoadingSpinner />;

  return (
    <div className="grid md:grid-cols-[260px,1fr] gap-6">
      <ToCSidebar editor={editor} />

      <div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="tiptap" />
      </div>
    </div>
  );
}
