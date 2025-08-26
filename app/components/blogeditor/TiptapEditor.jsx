"use client";

import { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import MenuBar from "./MenuBar";
import { toast } from "react-toastify";

// If you already have Firebase in your project, keep this import path consistent:
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Small helper to upload a file to Firebase Storage and return a public URL.
 * If you’re using a different uploader, replace this function and keep the same signature.
 */
async function uploadImageFileToFirebase(file, folder = "editor") {
  const safeName = `${folder}/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const imageRef = ref(storage, safeName);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}

export default function TiptapEditor({
  initialContent = "<p>Write your blog…</p>",
  onChange,
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { loading: "lazy", referrerpolicy: "no-referrer" },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const handleLocalFilePick = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      try {
        setUploading(true);
        const url = await uploadImageFileToFirebase(file, "blogs/content");
        editor.chain().focus().setImage({ src: url, alt: file.name }).run();
        toast.success("Image inserted!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload image.");
      } finally {
        setUploading(false);
        // reset input so the same file can be chosen again later
        e.target.value = "";
      }
    },
    [editor]
  );

  return (
    <div className="border rounded-xl overflow-hidden">
      <MenuBar
        editor={editor}
        fileInputRef={fileInputRef}
        onPickLocalFile={() => fileInputRef.current?.click()}
        uploading={uploading}
      />
      {/* hidden file input for toolbar button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleLocalFilePick}
      />
      <div className="prose dark:prose-invert max-w-none p-4 min-h-[240px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
