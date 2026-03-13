"use client";

import { useEffect } from "react";

export default function MonetagAd({ adUnitId }) {
  useEffect(() => {
    // Register service worker once
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Monetag service worker registered:", registration);
        })
        .catch((err) => {
          console.error("Service worker registration failed:", err);
        });
    }

    // Optionally, you can trigger Monetag ads if needed
    // window.monetag && window.monetag.load && window.monetag.load();
  }, []);

  return (
    <div
      className="monetag-ad"
      data-ad-unit={adUnitId}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
      }}
    ></div>
  );
}
