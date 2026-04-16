// components/CopyrightFooter.jsx
import {
  Scale,
  Shield,
  FileText,
  Eye,
  Globe,
  Mail,
  AlertCircle,
} from "lucide-react";

export function CopyrightFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/20 mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              About Us
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Facebook Video Downloader is a free tool that helps users download
              public Facebook videos and reels for personal use. We respect
              intellectual property rights and encourage users to use this tool
              responsibly.
            </p>
            <p className="text-xs text-muted-foreground">
              Not affiliated with Facebook or Meta Platforms, Inc.
            </p>
          </div>

          {/* Legal Pages Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/copyright"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Copyright Policy
                </a>
              </li>
              <li>
                <a
                  href="/dmca"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  DMCA Notice
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright & Usage */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Copyright Notice
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                © {currentYear} Facebook Video Downloader. All rights reserved.
              </p>
              <p>
                This tool is intended for personal use only. Users are solely
                responsible for ensuring they have the necessary rights or
                permissions to download and use any content.
              </p>
              <p className="text-xs">
                All trademarks, logos, and brand names are the property of their
                respective owners.
              </p>
            </div>
          </div>

          {/* Contact & Report */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact & Reporting
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                For copyright infringement notices or DMCA takedown requests:
              </p>
              <a
                href="mailto:copyright@facebookvideodownloader.com"
                className="text-primary hover:underline block"
              >
                copyright@facebookvideodownloader.com
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                Response time: 24-48 hours
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Compliance Banner */}
        <div className="mt-8 pt-8 border-t">
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-400 mb-1">
                  Fair Use & Copyright Disclaimer
                </p>
                <p className="text-amber-700 dark:text-amber-500 text-xs">
                  This website provides a tool to download publicly available
                  Facebook videos. We do not host any copyrighted content on our
                  servers. Users are responsible for complying with copyright
                  laws and Facebook's Terms of Service. If you believe your
                  copyright has been infringed, please contact us immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>100% Free Tool</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>No Data Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>Privacy Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
