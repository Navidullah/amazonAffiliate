"use client";

import { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import MenuBar from "./MenuBar";

/**
 * Controlled Tiptap:
 * - Accepts `value` (HTML string) and `onChange`.
 * - Loads `value` on mount and whenever it changes (if different).
 * - No Table-of-Contents extensions/components added.
 */
export default function TiptapEditor({ value = "<p></p>", onChange }) {
  const extensions = useMemo(
    () => [
      StarterKit, // includes heading, lists, bold, italic, code, etc.
      Underline,
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { loading: "lazy", referrerpolicy: "no-referrer" },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[240px]",
      },
    },
  });

  // Sync external `value` into editor when it changes (avoid loops).
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (typeof value === "string" && value !== current) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="border rounded-xl overflow-hidden">
      <MenuBar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
