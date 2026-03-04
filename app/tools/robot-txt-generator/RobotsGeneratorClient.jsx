"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function RobotsGeneratorClient() {
  const [domain, setDomain] = useState("");
  const [blockAdmin, setBlockAdmin] = useState(true);
  const [blockPrivate, setBlockPrivate] = useState(false);
  const [blockAll, setBlockAll] = useState(false);
  const [generated, setGenerated] = useState("");

  const generateFile = () => {
    let content = "User-agent: *\n";

    if (blockAll) {
      content += "Disallow: /\n";
    } else {
      content += "Allow: /\n";

      if (blockAdmin) content += "Disallow: /admin/\n";
      if (blockPrivate) content += "Disallow: /private/\n";
    }

    if (domain.trim()) {
      content += `\nSitemap: https://${domain}/sitemap.xml`;
    }

    setGenerated(content);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  const downloadFile = () => {
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="rounded-2xl shadow-2xl border bg-background">
      <CardContent className="p-10 space-y-8">
        <div>
          <Label className="mb-2 block">Website Domain</Label>
          <Input
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <Label>Disallow /admin/</Label>
          <Switch checked={blockAdmin} onCheckedChange={setBlockAdmin} />
        </div>

        <div className="flex justify-between items-center">
          <Label>Disallow /private/</Label>
          <Switch checked={blockPrivate} onCheckedChange={setBlockPrivate} />
        </div>

        <div className="flex justify-between items-center">
          <Label>Block All Search Engines</Label>
          <Switch checked={blockAll} onCheckedChange={setBlockAll} />
        </div>

        <Button onClick={generateFile} className="w-full text-lg">
          Generate Robots.txt
        </Button>

        {generated && (
          <div className="space-y-4">
            <Textarea
              value={generated}
              readOnly
              rows={8}
              className="font-mono"
            />

            <div className="flex flex-col gap-4">
              <Button
                variant="secondary"
                onClick={copyToClipboard}
                className="w-full"
              >
                Copy
              </Button>
              <Button onClick={downloadFile} className="w-full">
                Download File
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
