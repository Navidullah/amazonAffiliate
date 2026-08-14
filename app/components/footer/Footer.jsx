// components/footer/Footer.jsx (Updated with complete legal compliance)
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Shield,
  Scale,
  FileText,
  AlertCircle,
  Eye,
  Download,
} from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Shopyor
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Printable digital worksheet packs for KS2 Year 6 Maths — plus
              free online tools for video, image, PDF, AI, and SEO. Pay once,
              download instantly.
            </p>
            <p className="text-xs text-muted-foreground">
              Â© {currentYear} Shopyor. All rights reserved.
            </p>
          </div>

          {/* Legal Links - IMPORTANT for AdSense */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/copyright"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Copyright Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/dmca"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  DMCA Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Worksheet Packs
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/voice-clone"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  AI Voice Cloner
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/convert-your-pdf-file-to-word"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  PDF to Word Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/image-compressor"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Compress Image Online
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/background-remover-image"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Remove Background from Image
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/compress-your-pdf-file"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Compress PDF File
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/video-downloader"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Video Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & DMCA */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              DMCA & Copyright
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              For copyright infringement notices:
            </p>
            <a
              href="mailto:shopyor.com@gmail.com"
              className="text-sm text-primary hover:underline break-all"
            >
              shopyor.com@gmail.com
            </a>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Response time: 24-48 hours
              </p>
            </div>
          </div>
        </div>

        {/* Compliance Banner - Critical for AdSense */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Scale className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-amber-800 dark:text-amber-400 mb-1">
                Copyright, Consent & Fair Use Disclaimer
              </p>
              <p className="text-amber-700 dark:text-amber-500">
                Digital worksheet packs sold on Shopyor are original content
                we create, licensed for personal, tutoring, or single-
                classroom use only — see our{" "}
                <Link href="/terms" className="underline hover:no-underline">
                  Terms of Service
                </Link>
                . For our free tools: users are solely responsible for
                ensuring they have the necessary rights, permissions, or
                consent for any content they download, upload, or generate —
                including the right to clone any voice with our AI tool. We
                do not host, store, or distribute copyrighted third-party
                content processed through those tools. All trademarks and
                copyrighted materials belong to their respective owners.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-green-500" />
            <span>No Card Details Stored</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-green-500" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-green-500" />
            <span>DMCA Ready</span>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="text-center text-xs text-muted-foreground pt-6 border-t">
          <p>
            Shopyor is not affiliated with Facebook, YouTube, TikTok, or any
            third-party platforms. All product names, logos, and brands are
            property of their respective owners.
          </p>
          <p className="mt-2">
            This website uses cookies to enhance user experience. By using our
            website, you consent to our use of cookies in accordance with our
            Cookie Policy.
          </p>
        </div>
      </div>
    </footer>
  );
}
