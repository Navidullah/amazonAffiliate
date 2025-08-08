"use client";

import { useEffect, useState } from "react";

export default function ToCSidebar({ editor }) {
  const [anchors, setAnchors] = useState([]);

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const tocAnchors = editor?.storage?.tableOfContents?.anchors || [];
      setAnchors(tocAnchors);
    };

    update();
    editor.on("update", update);
    editor.on("selectionUpdate", update);

    return () => {
      editor.off("update", update);
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <aside className="md:sticky md:top-24 max-h-[70vh] overflow-auto pr-2">
      <nav aria-label="Table of contents">
        <ul className="space-y-1">
          {anchors.map((a) => (
            <li key={a.id} style={{ paddingLeft: (a.level - 1) * 12 }}>
              <button
                onClick={() => {
                  editor.chain().setTextSelection(a.pos).run();
                  editor.commands.scrollIntoView();
                }}
                data-active={a.isActive}
                className="text-sm hover:underline data-[active=true]:font-semibold"
              >
                {a.textContent}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
