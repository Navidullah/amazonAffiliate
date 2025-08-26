"use client";

import { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";

export default function TiptapEditor({ value = "<p></p>", onChange }) {
  const extensions = useMemo(
    () => [
      StarterKit, // includes headings, lists, code, etc.
      Underline,
      Highlight.configure({
        multicolor: false,
      }),
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
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[240px]",
      },
    },
  });

  // keep editor content in sync with external value
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
