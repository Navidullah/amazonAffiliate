"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, Send, Upload } from "lucide-react";

export default function BulkFilePinsPage() {
  const [rows, setRows] = useState([]); // [{file, title, description, link, boardId}]
  const [boardAll, setBoardAll] = useState(""); // optional default board for all rows
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  function onPickFiles(e) {
    const files = Array.from(e.target.files || []);
    const mapped = files.map((f) => ({
      file: f,
      title: f.name.replace(/\.[^.]+$/, "").slice(0, 100),
      description: "",
      link: "",
      boardId: "",
    }));
    setRows(mapped);
    setResult(null);
  }

  function updateRow(i, patch) {
    setRows((prev) =>
      prev.map((r, idx) => (i === idx ? { ...r, ...patch } : r))
    );
  }

  async function submit() {
    if (!rows.length) return;
    setBusy(true);
    setResult(null);

    try {
      const fd = new FormData();
      const manifest = rows.map((r, i) => ({
        fileKey: `file_${i}`,
        title: r.title || "",
        description: r.description || "",
        link: r.link || "",
        boardId: r.boardId || boardAll || undefined,
      }));
      rows.forEach((r, i) => fd.append(`file_${i}`, r.file));
      fd.append("items", JSON.stringify(manifest));

      const res = await fetch("/api/pins/bulk-upload", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      setResult({ status: res.status, json });
    } catch (e) {
      setResult({ status: 0, json: { error: String(e) } });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] w-full p-6 flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Bulk Pinterest Uploader (Files)</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose Images</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={onPickFiles}
            />
            <div className="text-xs text-muted-foreground">
              Supported: JPG/PNG/WebP. Large batches will take longer due to
              base64 conversion.
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Default Board ID (optional)
            </label>
            <Input
              placeholder="1037728080728527181"
              value={boardAll}
              onChange={(e) => setBoardAll(e.target.value)}
            />
            <div className="text-xs text-muted-foreground">
              If a row has no boardId, this one will be used. If both empty,
              server will try PINTEREST_BOARD_ID env.
            </div>
          </div>

          {rows.length > 0 && (
            <div className="max-h-80 overflow-auto border rounded">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left">file</th>
                    <th className="p-2 text-left">title</th>
                    <th className="p-2 text-left">description</th>
                    <th className="p-2 text-left">link</th>
                    <th className="p-2 text-left">boardId</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t align-top">
                      <td className="p-2">{r.file.name}</td>
                      <td className="p-2">
                        <Input
                          value={r.title}
                          onChange={(e) =>
                            updateRow(i, { title: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-2">
                        <Textarea
                          rows={2}
                          value={r.description}
                          onChange={(e) =>
                            updateRow(i, { description: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          value={r.link}
                          onChange={(e) =>
                            updateRow(i, { link: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          value={r.boardId}
                          onChange={(e) =>
                            updateRow(i, { boardId: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            The server limits concurrency and retries on 429/5xx to respect rate
            limits.
          </div>
          <Button
            onClick={submit}
            disabled={!rows.length || busy}
            className="gap-2"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {busy ? "Uploading…" : "Create Pins (Files)"}
          </Button>
        </CardFooter>

        {result && (
          <pre className="text-xs p-3 bg-muted/40 border-t overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </Card>
    </div>
  );
}
