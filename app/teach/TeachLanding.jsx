"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PenSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createRoom } from "@/lib/teach/room";

export default function TeachLanding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startClass() {
    setLoading(true);
    setError("");
    try {
      const { roomId, hostKey } = await createRoom();
      router.push(`/teach/${roomId}?key=${hostKey}`);
    } catch (e) {
      console.error(e);
      setError("Couldn't start a classroom. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="rounded-full bg-primary/10 p-4">
        <PenSquare className="size-8 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Live Teaching Whiteboard</h1>
        <p className="mt-2 text-muted-foreground">
          Start a class, share the student link, then open Google Meet and share this tab &mdash; or just send
          students the link and draw live while you talk.
        </p>
      </div>
      <Button size="lg" onClick={startClass} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : <PenSquare />}
        Start a new class
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </main>
  );
}
