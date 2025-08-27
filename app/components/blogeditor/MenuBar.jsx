"use client";

import { memo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Minus,
  Code2,
  LinkIcon,
  ImageIcon,
  ImagePlus,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
  Table as TableIcon,
  Rows2,
  Columns2,
  Rows3,
  Columns3,
  Split,
  Merge,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

/** Allow only http/https URLs */
function sanitizeUrl(u) {
  if (!u) return "";
  try {
    const url = new URL(u.trim());
    if (url.protocol === "http:" || url.protocol === "https:")
      return url.toString();
  } catch {}
  return "";
}

function MenuBar({ editor, onUploadFile }) {
  const fileInputRef = useRef(null);
  if (!editor) return null;

  const keepSelection = (e) => e.preventDefault();

  // ----- Images -----
  const insertImageByUrl = () => {
    const raw = window.prompt("Paste image URL (https://…):", "https://");
    const clean = sanitizeUrl(raw);
    if (!clean) return toast.error("Please paste a valid http(s) image URL.");
    const alt = window.prompt("Alt text (optional):", "") || "";
    editor.chain().focus().setImage({ src: clean, alt }).run();
    toast.success("Image inserted by URL!");
  };

  const onLocalChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      let url;
      if (typeof onUploadFile === "function") {
        url = await onUploadFile(file); // your real upload (Firebase/S3) returns a public URL
      } else {
        url = URL.createObjectURL(file); // preview-only fallback
      }
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
      toast.success("Image inserted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to insert image.");
    } finally {
      e.target.value = "";
    }
  };

  // ----- Links -----
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

  // ----- Tables -----
  const insertTable = () => {
    const r = Math.max(
      1,
      Math.min(10, Number(window.prompt("Rows (1-10):", "3") || 3))
    );
    const c = Math.max(
      1,
      Math.min(10, Number(window.prompt("Columns (1-10):", "3") || 3))
    );
    editor
      .chain()
      .focus()
      .insertTable({ rows: r, cols: c, withHeaderRow: true })
      .run();
  };

  return (
    <div className="p-2 border-b flex flex-wrap items-center gap-1 bg-muted/40">
      {/* Inline styles */}
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("bold") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("italic") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("strike") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("underline") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleUnderline?.().run()}
        title="Underline"
        disabled={
          !editor.extensionManager.extensions.find(
            (ex) => ex.name === "underline"
          )
        }
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("highlight") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        title="Highlight"
      >
        <Highlighter className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Headings H1–H6 */}
      {[
        [1, Heading1],
        [2, Heading2],
        [3, Heading3],
        [4, Heading4],
        [5, Heading5],
        [6, Heading6],
      ].map(([level, Icon]) => (
        <Button
          key={level}
          type="button"
          size="sm"
          variant={
            editor.isActive("heading", { level }) ? "default" : "secondary"
          }
          onMouseDown={keepSelection}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          title={`Heading ${level}`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists / blocks */}
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet list"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("blockquote") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("codeBlock") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Code block"
      >
        <Code2 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Links */}
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("link") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={setLinkOnSelection}
        title="Add/Edit link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      {/* Images */}
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => fileInputRef.current?.click()}
        title="Insert image (upload file)"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={insertImageByUrl}
        title="Insert image by URL"
      >
        <ImagePlus className="h-4 w-4" />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onLocalChange}
      />

      {/* TABLES */}
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={insertTable}
        title="Insert table"
      >
        <TableIcon className="h-4 w-4" />
      </Button>
      {/* Row ops */}
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().addRowBefore().run()}
        title="Add row before"
      >
        <Rows2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        title="Add row after"
      >
        <Rows3 className="h-4 w-4" />
      </Button>
      {/* Column ops */}
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        title="Add column before"
      >
        <Columns2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        title="Add column after"
      >
        <Columns3 className="h-4 w-4" />
      </Button>
      {/* Merge / split cells */}
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().mergeCells().run()}
        title="Merge cells"
      >
        <Merge className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().splitCell().run()}
        title="Split cell"
      >
        <Split className="h-4 w-4" />
      </Button>
      {/* Delete */}
      <Button
        type="button"
        size="sm"
        variant="destructive"
        onClick={() => editor.chain().focus().deleteTable().run()}
        title="Delete table"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default memo(MenuBar);
