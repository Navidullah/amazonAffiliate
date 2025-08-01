"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FileText } from "lucide-react";

export default function AllPDFs() {
  const [pdfs, setPdfs] = useState([]);
  const { data: session } = useSession();

  const fetchPDFs = async () => {
    const res = await fetch("/api/pdf-list");
    const data = await res.json();
    setPdfs(data);
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete("/api/pdf", { data: { id } });
    fetchPDFs();
  };

  const handleRename = async (id) => {
    const newTitle = prompt("Enter new title");
    if (newTitle) {
      await axios.put("/api/pdf", { id, title: newTitle });
      fetchPDFs();
    }
  };

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">All PDFs</h1>
      <ul className="space-y-3">
        {pdfs.map((pdf) => (
          <li key={pdf._id} className="flex items-center gap-3">
            <FileText className="text-gray-600" />
            <Link href={`/pdf/${pdf._id}`} className="text-blue-600 underline">
              {pdf.title}
            </Link>
            {session?.user?.role === "admin" && (
              <>
                <button
                  onClick={() => handleRename(pdf._id)}
                  className="text-yellow-600 ml-2"
                >
                  Rename
                </button>
                <button
                  onClick={() => handleDelete(pdf._id)}
                  className="text-red-600 ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
