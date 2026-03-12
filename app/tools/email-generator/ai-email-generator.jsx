"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Loader2, FileText, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function AIEmailGenerator() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [copied, setCopied] = useState({ subject: false, body: false });

  const tones = [
    {
      value: "professional",
      label: "Professional",
      description: "Formal business tone",
    },
    {
      value: "friendly",
      label: "Friendly",
      description: "Warm and approachable",
    },
    { value: "casual", label: "Casual", description: "Relaxed, informal" },
    {
      value: "persuasive",
      label: "Persuasive",
      description: "Convincing and compelling",
    },
    { value: "urgent", label: "Urgent", description: "Time-sensitive" },
  ];

  const examples = [
    "Follow up with a client who hasn't responded to my proposal",
    "Request time off for next week",
    "Introduce myself to a new team member",
    "Apologize for missing a deadline",
    "Ask for a price quote on new software",
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please describe what email you need");
      return;
    }

    setGenerating(true);
    setError(null);
    setGeneratedEmail(null);

    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tone }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Generation failed");
      }

      const data = await response.json();
      setGeneratedEmail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate email");
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const handleExampleClick = (example) => {
    setPrompt(example);
  };

  const handleClear = () => {
    setPrompt("");
    setGeneratedEmail(null);
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">AI Email Generator</CardTitle>
          <Badge variant="secondary" className="ml-2">
            Beta
          </Badge>
        </div>
        <CardDescription>
          Describe what you need, and AI will write a complete email for you in
          seconds.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">What's this email about?</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., Follow up with John about the contract proposal we discussed last week..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Email Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    <div className="flex flex-col">
                      <span>{t.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {t.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Example prompts */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              Try an example:
            </Label>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(ex)}
                  className="text-xs"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  {ex.length > 30 ? ex.substring(0, 30) + "..." : ex}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Generated Email Output */}
        {generatedEmail && (
          <div className="space-y-4 rounded-lg border p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Generated Email
              </h3>
              <Badge variant="outline" className="capitalize">
                {tone}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">
                    Subject
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() =>
                      copyToClipboard(generatedEmail.subject, "subject")
                    }
                  >
                    {copied.subject ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <div className="rounded-md bg-background p-2 text-sm border">
                  {generatedEmail.subject}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Body</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => copyToClipboard(generatedEmail.body, "body")}
                  >
                    {copied.body ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <div className="rounded-md bg-background p-3 border whitespace-pre-wrap text-sm">
                  {generatedEmail.body}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          className="min-w-[120px]"
        >
          {generating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Email
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
