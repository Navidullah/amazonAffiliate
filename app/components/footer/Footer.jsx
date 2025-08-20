// components/Footer.jsx
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t dark:border-muted px-4 sm:px-6  mx-auto w-full">
      <div className=" flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo or Site Name */}
        <div className="  sm:w-auto mb-2 sm:mb-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/shopyor.png"
              width={100}
              height={100}
              alt="shopyor-logo"
              className="text-3xl font-serif font-bold tracking-tight"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition">
            Home
          </Link>

          <Link href="/blogs" className="hover:text-foreground transition">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-foreground transition">
            Contact
          </Link>
          <Link
            href="/write-for-us"
            className="hover:text-foreground transition"
          >
            Write for us
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-foreground transition"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-muted-foreground">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground mt-4">
        © {new Date().getFullYear()} Shopyor. All rights reserved.
      </div>
    </footer>
  );
}
