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
} from "lucide-react";
import { toast } from "react-toastify";

// Minimal URL sanitizer (http/https only)
function sanitizeUrl(u) {
  if (!u) return "";
  try {
    const url = new URL(u.trim());
    if (url.protocol === "http:" || url.protocol === "https:")
      return url.toString();
  } catch {}
  return "";
}

function MenuBar({ editor }) {
  const fileInputRef = useRef(null);
  if (!editor) return null;

  // Insert image by URL
  const insertImageByUrl = () => {
    const raw = window.prompt("Paste image URL (https://…):", "https://");
    const clean = sanitizeUrl(raw);
    if (!clean) return toast.error("Please paste a valid http(s) image URL.");
    const alt = window.prompt("Alt text (optional):", "") || "";
    editor.chain().focus().setImage({ src: clean, alt }).run();
    toast.success("Image inserted by URL!");
  };

  // Local file upload → you can replace with your Firebase upload logic if you want uploads here too
  const onPickLocalFile = async (file) => {
    if (!file) return;
    try {
      // Example: use a pre-existing uploader; or plug in Firebase here.
      // For now, create a temporary object URL (NOT for production!):
      const tempUrl = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: tempUrl, alt: file.name }).run();
      toast.success(
        "Local image added (preview URL). Replace with your upload logic!"
      );
    } catch (e) {
      toast.error("Failed to add image.");
    } finally {
      // Revoke after a tick if you change the logic to a permanent URL.
    }
  };

  const handleLocalClick = () => fileInputRef.current?.click();
  const onLocalChange = (e) => onPickLocalFile(e.target.files?.[0]);

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

  const HeadingBtn = ({ level, Icon }) => (
    <Button
      size="sm"
      variant={editor.isActive("heading", { level }) ? "default" : "secondary"}
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      title={`Heading ${level}`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="p-2 border-b flex flex-wrap items-center gap-1 bg-muted/40">
      {/* Text styles */}
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
        <UnderlineIcon className="h-4 w-4" />
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
        onClick={handleLocalClick}
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

      {/* hidden local file picker */}
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
