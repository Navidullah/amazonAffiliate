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

  const Options = [
    // Headings & Paragraph
    {
      icon: <Heading1 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <BsParagraph className="size-7" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },

    // Text styles
    {
      icon: <Bold className="size-7" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-7" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <LucideStrikethrough className="size-7" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <Highlighter className="size-7" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },

    // Lists
    {
      icon: <List className="size-7" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-7" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },

    // Alignment
    {
      icon: <AlignLeft className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive("textAlign", { textAlign: "left" }),
    },
    {
      icon: <AlignRight className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive("textAlign", { textAlign: "right" }),
    },
    {
      icon: <AlignCenter className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive("textAlign", { textAlign: "center" }),
    },
    {
      icon: <AlignJustify className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive("textAlign", { textAlign: "justify" }),
    },

    // Blockquote
    {
      icon: <Quote className="size-7" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },

    // Media Uploads
    {
      icon: <ImageIcon className="size-7" />,
      onClick: () => fileInputRef.current.click(),
      pressed: false,
    },
    {
      icon: <FileIcon className="size-7" />,
      onClick: () => docInputRef.current.click(),
      pressed: false,
    },

    // Links
    {
      icon: <LinkIcon className="size-7" />,
      onClick: () => {
        const url = prompt("Enter internal path (e.g., /blog/my-post):");
        if (url && url.startsWith("/")) {
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        } else {
          alert("Only internal links allowed (start with '/')");
        }
      },
      pressed: editor.isActive("link"),
    },
    {
      icon: <UnlinkIcon className="size-7" />,
      onClick: () => editor.chain().focus().unsetLink().run(),
      pressed: false,
    },

    // 🔥 Table Tools
    {
      icon: <Table className="size-7" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      pressed: false,
    },
    {
      icon: <Columns className="size-7" />,
      onClick: () => editor.chain().focus().addColumnAfter().run(),
      pressed: false,
    },
    {
      icon: <Rows className="size-7" />,
      onClick: () => editor.chain().focus().addRowAfter().run(),
      pressed: false,
    },
    {
      icon: <Trash className="size-7" />,
      onClick: () => editor.chain().focus().deleteTable().run(),
      pressed: false,
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
          className={option.pressed ? "bg-gray-300 dark:bg-gray-700" : ""}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
