"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function MetaTagGeneratorClient() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [generated, setGenerated] = useState("");

  const generateTags = () => {
    const tags = `
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />
<meta name="robots" content="index, follow" />

<!-- Open Graph -->
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
`;

    setGenerated(tags);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    alert("Meta tags copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <Input
            placeholder="Page Title (Recommended 50-60 characters)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Meta Description (Recommended 150-160 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            placeholder="Keywords (comma separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <Input
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <Input
            placeholder="Page URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Input
            placeholder="Image URL (for social sharing)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <Button onClick={generateTags} className="w-full">
            Generate Meta Tags
          </Button>
        </CardContent>
      </Card>

      {generated && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Textarea value={generated} readOnly rows={16} />
            <Button onClick={copyToClipboard} className="w-full">
              Copy Code
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
