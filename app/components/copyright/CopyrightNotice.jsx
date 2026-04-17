// components/CopyrightNotice.jsx
import {
  Scale,
  Shield,
  AlertCircle,
  Mail,
  FileText,
  Globe,
  Eye,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export function CopyrightNotice() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-16 border-t pt-12">
      <div className="container mx-auto max-w-4xl">
        {/* Main Copyright Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Copyright Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Copyright Notice</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              © {currentYear} Shopyor. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Facebook Video Downloader is an independent tool and is not
              affiliated with Facebook or Meta Platforms, Inc.
            </p>
          </div>

          {/* Fair Use Disclaimer */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Fair Use Disclaimer</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              This tool is intended for downloading publicly available Facebook
              content for personal, non-commercial use only. Users are
              responsible for ensuring they have the necessary rights or
              permissions to download any content.
            </p>
          </div>

          {/* Contact for Copyright Issues */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Copyright Issues</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              If you believe your copyright has been infringed, please contact
              us:
            </p>
            <a
              href="mailto:copyright@shopyor.com"
              className="text-sm text-primary hover:underline break-all"
            >
              copyright@shopyor.com
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Response time: 24-48 hours
            </p>
          </div>
        </div>

        {/* DMCA Compliance Notice */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-400 text-sm mb-1">
                DMCA Compliance
              </p>
              <p className="text-amber-700 dark:text-amber-500 text-xs">
                We comply with the Digital Millennium Copyright Act (DMCA). Upon
                receipt of a valid DMCA notice, we will promptly remove or
                disable access to the allegedly infringing content. Repeat
                infringers will have their access terminated.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <FileText className="h-3.5 w-3.5" />
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <Shield className="h-3.5 w-3.5" />
            Privacy Policy
          </Link>
          <Link
            href="/copyright"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <Scale className="h-3.5 w-3.5" />
            Copyright Policy
          </Link>
          <Link
            href="/dmca"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <AlertCircle className="h-3.5 w-3.5" />
            DMCA Notice
          </Link>
          <Link
            href="/disclaimer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <Eye className="h-3.5 w-3.5" />
            Disclaimer
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>100% Free Tool</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>No Data Storage</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>Privacy Protected</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>No Registration</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" />
            <span>Works Worldwide</span>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center text-xs text-muted-foreground pt-6 border-t">
          <p>
            Shopyor provides online tools for educational and personal use. All
            trademarks and logos are property of their respective owners.
          </p>
          <p className="mt-2">
            Built with ❤️ for creators, developers, and everyday users
          </p>
        </div>
      </div>
    </div>
  );
}
