// components/MonetagAd.jsx
"use client";

import Script from "next/script";

export default function MonetagAd({ zoneId }) {
  return (
    <div
      className="monetag-ad"
      style={{ width: "100%", textAlign: "center", margin: "20px 0" }}
    >
      <Script
        src="https://quge5.com/88/tag.min.js"
        data-zone={zoneId}
        async
        data-cfasync="false"
      />
    </div>
  );
}
