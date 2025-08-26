"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  ImageIcon,
  ImagePlus,
  LinkIcon,
  Quote,
  List,
  ListOrdered,
  Minus,
  Code2,
} from "lucide-react";
import { toast } from "react-toastify";

/** Minimal URL sanitizer: allow only http/https */
function sanitizeUrl(u) {
  if (!u) return "";
  try {
    const url = new URL(u.trim());
    if (url.protocol === "http:" || url.protocol === "https:")
      return url.toString();
  } catch (_) {
    /* ignore */
  }
  return "";
}

function MenuBar({ editor, fileInputRef, onPickLocalFile, uploading }) {
  if (!editor) return null;

  const insertImageByUrl = () => {
    const raw = window.prompt("Paste image URL (https://…):", "https://");
    const clean = sanitizeUrl(raw);
    if (!clean) return toast.error("Please paste a valid http(s) image URL.");
    const alt = window.prompt("Alt text (optional):", "") || "";
    editor.chain().focus().setImage({ src: clean, alt }).run();
    toast.success("Image inserted by URL!");
  };

  const setLinkOnSelection = () => {
    const prev = editor.getAttributes("link").href || "https://";
    const raw = window.prompt("Link URL (https://…):", prev);
    if (raw === null) return; // cancelled
    if (raw === "") return editor.chain().focus().unsetLink().run();
    const clean = sanitizeUrl(raw);
    if (!clean) return toast.error("Please paste a valid http(s) URL.");
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: clean, target: "_blank", rel: "noopener noreferrer" })
      .run();
    toast.success("Link set!");
  };

  return (
    <div className="p-2 border-b flex flex-wrap items-center gap-1 bg-muted/40">
      {/* Basic text styles */}
      <Button
        size="sm"
        variant={editor.isActive("bold") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("strike") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("underline") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleUnderline?.().run()}
        disabled
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists / blockquotes / code */}
      <Button
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("blockquote") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("codeBlock") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code2 className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Links */}
      <Button
        size="sm"
        variant={editor.isActive("link") ? "default" : "secondary"}
        onClick={setLinkOnSelection}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      {/* IMAGES */}
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Button
        size="sm"
        variant="secondary"
        onClick={onPickLocalFile}
        disabled={uploading}
        title="Insert image (upload file)"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={insertImageByUrl}
        title="Insert image by URL"
      >
        <ImagePlus className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default memo(MenuBar);
