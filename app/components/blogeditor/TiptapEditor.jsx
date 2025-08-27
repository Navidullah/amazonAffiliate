"use client";

import { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

// TABLES
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

import MenuBar from "./MenuBar";

export default function TiptapEditor({
  value = "<p></p>",
  onChange,
  /** Optional: pass a function that uploads a File and returns a public URL */
  onUploadFile,
}) {
  const extensions = useMemo(
    () => [
      StarterKit, // includes heading, lists, blockquote, code, etc.
      Underline,
      Highlight.configure({ multicolor: false }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { loading: "lazy", referrerpolicy: "no-referrer" },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      // --- Table support ---
      Table.configure({
        resizable: true,
        lastColumnResizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: value || "<p></p>",
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[240px]",
      },
    },
  });

  // keep editor content in sync with external value (controlled mode)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (typeof value === "string" && value !== current) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="border rounded-xl overflow-hidden">
      <MenuBar editor={editor} onUploadFile={onUploadFile} />
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
