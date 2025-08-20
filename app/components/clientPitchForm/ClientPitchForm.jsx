"use client";

import { useState } from "react";

export default function ClientPitchForm() {
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      title: fd.get("title"),
      outline: fd.get("outline"),
      samples: fd.get("samples"),
      website: fd.get("website"), // honeypot field
    };

    try {
      const res = await fetch("/api/guest-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("ok");
        e.currentTarget.reset();
        // optional: window.location.href = "/thank-you";
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="md:col-span-1">
        <label className="block text-sm font-medium">Your Name*</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="md:col-span-1">
        <label className="block text-sm font-medium">Email*</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium">Proposed Title*</label>
        <input
          name="title"
          required
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium">
          Outline (3–6 bullet points)*
        </label>
        <textarea
          name="outline"
          required
          rows={5}
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium">
          Sample Links (portfolio or published work)
        </label>
        <input
          name="samples"
          placeholder="https://example.com, https://another.com"
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white shadow-sm hover:bg-emerald-700"
        >
          Submit Pitch
        </button>
        {status === "ok" && (
          <span className="ml-3 align-middle text-emerald-700">
            Thanks! Your pitch has been received.
          </span>
        )}
        {status === "err" && (
          <span className="ml-3 align-middle text-red-600">
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}
