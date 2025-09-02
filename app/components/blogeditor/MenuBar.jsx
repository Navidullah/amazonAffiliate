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
  Image as ImgIcon,
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
  // Use a non-deprecated video-ish icon instead of Youtube:
  SquarePlay,
} from "lucide-react";
import { toast } from "react-toastify";

/**
 * Props:
 * - editor: Tiptap editor instance
 * - onUploadFile?: (file: File) => Promise<string>  // returns a public URL
 */
function MenuBar({ editor, onUploadFile }) {
  const fileInputRef = useRef(null);

  if (!editor) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
        Loading editor…
      </div>
    );
  }

  // keep selection while clicking toolbar buttons
  const keepSelection = (e) => {
    e.preventDefault();
  };

  // ----- Inline formatting -----
  const toggleLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Set URL", previousUrl || "https://");
    if (url === null) return; // cancel
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    try {
      const u = new URL(url);
      if (!/^https?:$/.test(u.protocol)) throw new Error();
    } catch {
      return toast.error("Please enter a valid http(s) URL.");
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank", rel: "noopener noreferrer" })
      .run();
  };

  // ----- Images -----
  const insertImageByUrl = () => {
    const url = window.prompt("Image URL", "https://");
    if (!url) return;
    try {
      const u = new URL(url);
      if (!/^https?:$/.test(u.protocol)) throw new Error();
    } catch {
      return toast.error("Please paste a valid http(s) image URL.");
    }
    editor.chain().focus().setImage({ src: url }).run();
    toast.success("Image inserted!");
  };

  const onLocalImagePicked = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      let url;
      if (typeof onUploadFile === "function") {
        // Your real upload (e.g., Firebase / S3) should return a public URL
        url = await onUploadFile(file);
      } else {
        // Fallback for preview-only
        url = URL.createObjectURL(file);
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

  // ----- YouTube (via Tiptap Youtube extension) -----
  const insertYouTube = () => {
    const raw = window.prompt(
      "Paste YouTube URL",
      "https://www.youtube.com/watch?v="
    );
    if (!raw) return;
    // quick parse for id; matches watch?v= | shorts/ | embed/ | youtu.be/
    const m = raw.match(
      /(?:watch\?v=|shorts\/|embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/
    );
    if (!m) {
      return toast.error("Could not detect a YouTube video ID.");
    }
    const src = `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`;
    editor.chain().focus().setYoutubeVideo({ src }).run();
    toast.success("YouTube video inserted!");
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-background">
      {/* Headings */}
      <Button
        type="button"
        size="sm"
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Inline styles */}
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("bold") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("italic") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("strike") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("underline") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("highlight") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        title="Highlight"
      >
        <Highlighter className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists / blocks */}
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet list"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Numbered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("blockquote") ? "default" : "secondary"}
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("codeBlock") ? "default" : "secondary"}
        onMouseDown={keepSelection}
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
        onClick={toggleLink}
        title="Add/Edit link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      {/* YouTube (uses non-deprecated icon) */}
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={insertYouTube}
        title="Insert YouTube"
      >
        <SquarePlay className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Images */}
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
        onChange={onLocalImagePicked}
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() => fileInputRef.current?.click()}
        title="Upload image"
      >
        <ImgIcon className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Tables */}
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        title="Insert table"
      >
        <TableIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().addRowBefore().run()}
        title="Add row before"
      >
        <Rows2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().addRowAfter().run()}
        title="Add row after"
      >
        <Rows3 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        title="Add column before"
      >
        <Columns2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        title="Add column after"
      >
        <Columns3 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().mergeCells().run()}
        title="Merge cells"
      >
        <Merge className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().splitCell().run()}
        title="Split cell"
      >
        <Split className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="destructive"
        onMouseDown={keepSelection}
        onClick={() => editor.chain().focus().deleteTable().run()}
        title="Delete table"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default memo(MenuBar);
