// app/contact/ContactForm.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // simple honeypot to reduce spam
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (website) return; // bot trap
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) throw new Error("Request failed");
      setEmail("");
      setMessage("");
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-4 bg-white dark:bg-gray-900 rounded shadow p-6"
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      <label className="sr-only" htmlFor="email">
        Your Email
      </label>
      <Input
        id="email"
        type="email"
        placeholder="Your Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <label className="sr-only" htmlFor="message">
        Your Message
      </label>
      <Textarea
        id="message"
        placeholder="Your Message"
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
      />

      {/* Honeypot field (hidden from users) */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Button type="submit" disabled={loading} className="cursor-pointer">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
