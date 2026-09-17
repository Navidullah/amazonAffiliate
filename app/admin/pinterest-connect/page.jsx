"use client";

// Unlisted admin utility page: triggers the Pinterest OAuth flow properly
// (via next-auth's client-side signIn(), which handles CSRF correctly —
// unlike navigating directly to /api/auth/signin/pinterest). Use this
// whenever scripts/post-pinterest-pin.js starts failing with 401 because
// the stored Pinterest access token expired.
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function PinterestConnectPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-4 text-center">
        <h1 className="text-xl font-bold">Connect Pinterest</h1>
        <p className="text-sm text-muted-foreground">
          Signs in with Pinterest and stores a fresh access token for the
          pin-posting script.
        </p>
        <button
          onClick={async () => {
            setLoading(true);
            await signIn("pinterest", { callbackUrl: "/admin/pinterest-connect" });
          }}
          disabled={loading}
          className="w-full px-4 py-2 rounded bg-red-600 text-white font-medium disabled:opacity-60"
        >
          {loading ? "Connecting…" : "Connect Pinterest Account"}
        </button>
      </div>
    </div>
  );
}
