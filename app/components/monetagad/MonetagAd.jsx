// components/MonetagAd.jsx
"use client";

import Script from "next/script";

export default function MonetagAd({ adUnitId }) {
  return (
    <div
      className="monetag-ad"
      style={{ width: "100%", textAlign: "center", margin: "20px 0" }}
    >
      <Script
        src="https://quge5.com/88/tag.min.js"
        data-zone={adUnitId}
        async
        data-cfasync="false"
      />
    </div>
  );
}
