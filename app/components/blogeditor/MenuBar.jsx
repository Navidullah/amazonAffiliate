"use client";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  LucideStrikethrough,
  Quote,
  UnlinkIcon,
  File as FileIcon,
  Table,
  Columns,
  Rows,
  Trash,
} from "lucide-react";
import { BsParagraph } from "react-icons/bs";
import React, { useRef } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mammoth from "mammoth";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const fileInputRef = useRef();
  const docInputRef = useRef();

  // ---------- helpers ----------
  // Keep this in sync with TiptapEditor.jsx
  const sanitizeUrl = (raw) => {
    if (!raw) return "";
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();
    if (lower.startsWith("javascript:") || lower.startsWith("data:")) return "";
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    toast.info("Uploading image...");

    try {
      const imageRef = ref(
        storage,
        `blog-content-images/${Date.now()}_${file.name}`
      );
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      editor.chain().focus().setImage({ src: imageUrl }).run();
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Failed to upload image.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.info("Reading file...");

    // DOCX only
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result;
          const result = await mammoth.convertToHtml({ arrayBuffer });
          editor.commands.insertContent(result.value);
          toast.success("DOCX content inserted!");
        } catch (err) {
          toast.error("Failed to parse DOCX file.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error("Unsupported file. Only .docx files are allowed.");
    }
  };

  // ---------- link actions (external) ----------
  const addOrEditExternalLink = () => {
    const prev = editor.getAttributes("link").href || "";
    const input = window.prompt("Enter URL", prev || "https://");
    const clean = sanitizeUrl(input);
    if (!clean) {
      // invalid/empty → remove link if one exists
      editor.chain().focus().unsetLink().run();
      return;
    }

    const { empty } = editor.state.selection;
    if (empty) {
      // if nothing selected, insert URL text and then link it
      editor
        .chain()
        .focus()
        .insertContent(clean)
        .extendMarkRange("link")
        .setLink({ href: clean })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: clean })
        .run();
    }
  };

  const unlink = () => editor.chain().focus().unsetLink().run();

  const Options = [
    // Headings & Paragraph
    {
      icon: <Heading1 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
      title: "Heading 1",
    },
    {
      icon: <Heading2 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
      title: "Heading 2",
    },
    {
      icon: <Heading3 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
      title: "Heading 3",
    },
    {
      icon: <BsParagraph className="size-7" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
      title: "Paragraph",
    },

    // Text styles
    {
      icon: <Bold className="size-7" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
      title: "Bold",
    },
    {
      icon: <Italic className="size-7" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
      title: "Italic",
    },
    {
      icon: <LucideStrikethrough className="size-7" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
      title: "Strikethrough",
    },
    {
      icon: <Highlighter className="size-7" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
      title: "Highlight",
    },

    // Lists
    {
      icon: <List className="size-7" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
      title: "Bullet list",
    },
    {
      icon: <ListOrdered className="size-7" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
      title: "Numbered list",
    },

    // Alignment
    {
      icon: <AlignLeft className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive("textAlign", { textAlign: "left" }),
      title: "Align left",
    },
    {
      icon: <AlignRight className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive("textAlign", { textAlign: "right" }),
      title: "Align right",
    },
    {
      icon: <AlignCenter className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive("textAlign", { textAlign: "center" }),
      title: "Align center",
    },
    {
      icon: <AlignJustify className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive("textAlign", { textAlign: "justify" }),
      title: "Justify",
    },

    // Blockquote
    {
      icon: <Quote className="size-7" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
      title: "Blockquote",
    },

    // Media Uploads
    {
      icon: <ImageIcon className="size-7" />,
      onClick: () => fileInputRef.current?.click(),
      pressed: false,
      title: "Insert image",
    },
    {
      icon: <FileIcon className="size-7" />,
      onClick: () => docInputRef.current?.click(),
      pressed: false,
      title: "Import .docx",
    },

    // Links (External)
    {
      icon: <LinkIcon className="size-7" />,
      onClick: addOrEditExternalLink,
      pressed: editor.isActive("link"),
      title: "Add/Edit link (external)",
    },
    {
      icon: <UnlinkIcon className="size-7" />,
      onClick: unlink,
      pressed: false,
      title: "Remove link",
    },

    // Table Tools
    {
      icon: <Table className="size-7" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      pressed: false,
      title: "Insert table",
    },
    {
      icon: <Columns className="size-7" />,
      onClick: () => editor.chain().focus().addColumnAfter().run(),
      pressed: false,
      title: "Add column",
    },
    {
      icon: <Rows className="size-7" />,
      onClick: () => editor.chain().focus().addRowAfter().run(),
      pressed: false,
      title: "Add row",
    },
    {
      icon: <Trash className="size-7" />,
      onClick: () => editor.chain().focus().deleteTable().run(),
      pressed: false,
      title: "Delete table",
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 flex flex-wrap gap-5">
      {/* Hidden input for image upload */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />

      {/* Hidden input for DOCX upload only */}
      <input
        type="file"
        accept=".docx"
        style={{ display: "none" }}
        ref={docInputRef}
        onChange={handleFileUpload}
      />

      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onClick={option.onClick}
          title={option.title}
          className={option.pressed ? "bg-gray-300 dark:bg-gray-700" : ""}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
