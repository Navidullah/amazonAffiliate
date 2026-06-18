// app/contact/page.jsx (Updated with actual email sending)
"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Shield,
  Loader2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with our support team
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            Whether you have a question about one of Shopyor's 21+ free tools,
            found a bug, want to request a feature, or need to file a DMCA or
            privacy notice, reach us using the form below or email one of the
            addresses listed under Contact Information. We read every message
            and reply within 24-48 hours on business days.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <div className="bg-muted/30 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email (General)</p>
                    <a
                      href="mailto:support@shopyor.com"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      support@shopyor.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">DMCA & Copyright Issues</p>
                    <a
                      href="mailto:dmca@shopyor.com"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      dmca@shopyor.com
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      Response within 24-48 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Privacy Concerns</p>
                    <a
                      href="mailto:privacy@shopyor.com"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      privacy@shopyor.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                <p>Sunday: Closed</p>
                <p className="text-xs mt-2">
                  Support responses within 24-48 hours on business days
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>

            {submitted && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">
                  Message sent successfully! We'll respond within 24-48 hours.
                </span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  disabled={loading}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="dmca">DMCA / Copyright Issue</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="privacy">Privacy Concern</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-lg border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={loading}
                  placeholder="Please provide details about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
