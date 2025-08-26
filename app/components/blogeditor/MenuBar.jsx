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

  /** Keep selection stable when opening prompts (mouse down steals focus) */
  const keepSelection = (e) => e.preventDefault();

  /** Insert image by pasting a URL */
  const insertImageByUrl = () => {
    const raw = window.prompt("Paste image URL (https://…):", "https://");
    const clean = sanitizeUrl(raw);
    if (!clean) return toast.error("Please paste a valid http(s) image URL.");
    const alt = window.prompt("Alt text (optional):", "") || "";
    editor.chain().focus().setImage({ src: clean, alt }).run();
    toast.success("Image inserted by URL!");
  };

  /** Local file → optional uploader → insert resulting URL */
  const onLocalChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      let url;
      if (typeof onUploadFile === "function") {
        // Use your real uploader (Firebase, S3, etc.) if provided by parent
        url = await onUploadFile(file);
      } else {
        // Fallback preview-only URL (replace with real upload in production)
        url = URL.createObjectURL(file);
      }
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
      toast.success("Image inserted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to insert image.");
    } finally {
      // Allow choosing the same file again
      e.target.value = "";
    }
  };

  /** Add or remove link on current selection */
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

  /** Heading button factory */
  const HeadingBtn = ({ level, Icon }) => (
    <Button
      type="button"
      size="sm"
      variant={editor.isActive("heading", { level }) ? "default" : "secondary"}
      onMouseDown={keepSelection}
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      title={`Heading ${level}`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

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
      {/* Underline requires @tiptap/extension-underline; keep disabled if you didn’t add it */}
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
      {/* Highlight requires @tiptap/extension-highlight in your editor */}
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
      <HeadingBtn level={1} Icon={Heading1} />
      <HeadingBtn level={2} Icon={Heading2} />
      <HeadingBtn level={3} Icon={Heading3} />
      <HeadingBtn level={4} Icon={Heading4} />
      <HeadingBtn level={5} Icon={Heading5} />
      <HeadingBtn level={6} Icon={Heading6} />

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
        <ImageIcon className="h-2 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onMouseDown={keepSelection}
        onClick={insertImageByUrl}
        title="Insert image by URL"
      >
        <ImagePlus className="h-2 w-4" />
      </Button>

      {/* Hidden local file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onLocalChange}
      />
    </div>
  );
}

export default memo(MenuBar);
