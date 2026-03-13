// components/MonetagAd.jsx
"use client";

import { useEffect } from "react";

export default function MonetagAd() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Monetag service worker registered", registration);
        })
        .catch((err) => {
          console.error("Monetag SW registration failed", err);
        });
    }
  }, []);

  return (
    <div
      className="monetag-ad"
      style={{ width: "100%", textAlign: "center", margin: "20px 0" }}
    >
      {/* Ad placeholder will be injected by service worker */}
      <div data-zone-id="10726668"></div>
    </div>
  );
}
