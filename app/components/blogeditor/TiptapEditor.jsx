"use client";

import { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";

// TABLES
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

import MenuBar from "./MenuBar";

// --- helpers ---
const isHttpUrl = (u) => {
  try {
    const url = new URL(u.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

// match youtube.com/watch?v=… | youtu.be/… | youtube.com/shorts/… | /embed/…
const YT_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:(?:watch\?v=|shorts\/|embed\/))|youtu\.be\/)([A-Za-z0-9_-]{6,})/;

const toEmbedUrl = (u) => {
  const m = u.match(YT_REGEX);
  if (!m) return "";
  const id = m[1];
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
};

export default function TiptapEditor({
  value = "<p></p>",
  onChange,
  /** Optional: pass a function that uploads a File and returns a public URL */
  onUploadFile,
}) {
  const extensions = useMemo(
    () => [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: false }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          loading: "lazy",
          referrerpolicy: "no-referrer",
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "aspect-video w-full rounded-lg",
          loading: "lazy",
          referrerPolicy: "no-referrer",
        },
        width: 640,
        height: 360,
        allowFullscreen: true,
      }),
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
      handlePaste(view, event) {
        const txt = event.clipboardData?.getData("text/plain")?.trim();
        if (!txt || !isHttpUrl(txt)) return false;
        const embed = toEmbedUrl(txt);
        if (!embed) return false;
        event.preventDefault();
        editor?.chain().focus().setYoutubeVideo({ src: embed }).run();
        return true;
      },
    },
  });

  // keep external `value` in sync (if you load an existing post, etc.)
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
