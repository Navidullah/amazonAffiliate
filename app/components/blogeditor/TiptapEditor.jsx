"use client";

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
import React from "react";

import MenuBar from "./MenuBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const TiptapEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true,
        table: false, // ⛔ disable built-in table to prevent conflicts
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
        types: ["heading", "paragraph", "tableCell"], // ✅ enable alignment for tables
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
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border rounded-md py-2 px-3 tiptap prose dark:prose-invert max-w-full",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div>
      {!editor ? (
        <LoadingSpinner />
      ) : (
        <>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="tiptap" />
        </>
      )}
    </div>
  );
};

export default TiptapEditor;
