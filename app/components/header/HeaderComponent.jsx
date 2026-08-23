"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  LayoutDashboard,
  LucideLogOut,
  Search,
  Pen,
  Menu,
  User,
  Calculator,
} from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";

import Image from "next/image";
import { FaBloggerB } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_LINKS = [
  { href: "/", label: "Store" },
  { href: "/maths", label: "Maths Challenge" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = session?.user?.role === "admin";

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const handleLogin = () => signIn();
  const handleLogout = () => signOut();

  const SearchBox = ({ className = "" }) => (
    <form
      onSubmit={handleSearch}
      role="search"
      aria-label="Site search"
      className={className}
    >
      <div className="relative w-full">
        <label htmlFor="header-search" className="sr-only">
          Search
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
          aria-hidden="true"
        />
        <Input
          id="header-search"
          type="text"
          placeholder="Search blogs . . ."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border bg-gray-100 pl-10 pr-4 text-sm focus:bg-white dark:bg-zinc-900 dark:focus:bg-zinc-800"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />
      </div>
    </form>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-gray-700/30 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-2">
          {/* Mobile hamburger (with search + nav inside) */}
          <div className="md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Open menu"
                  className="h-9 w-9 rounded-full border"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex w-72 flex-col gap-6 pt-10">
                <SearchBox />
                <nav className="flex flex-col gap-4">
                  {NAV_LINKS.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <Link
                        href={l.href}
                        className="text-lg font-semibold transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo (height-constrained so the header stays a consistent height) */}
          <Link href="/" className="flex items-center" aria-label="Shopyor home">
            <Image
              src="/shopyor.png"
              width={120}
              height={120}
              alt="Shopyor"
              priority
              sizes="120px"
              className="h-8 w-auto sm:h-9"
            />
          </Link>
        </div>

        {/* Center: search (desktop only) */}
        <div className="hidden flex-1 justify-center px-4 md:flex">
          <SearchBox className="w-full max-w-md" />
        </div>

        {/* Right: nav + actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-5 md:flex">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-primary">
                {l.label}
              </Link>
            ))}
          </nav>

          <ModeToggle />

          {!session ? (
            <Button
              onClick={handleLogin}
              className="px-3 py-1 text-sm sm:text-base"
              aria-label="Login"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer" aria-label="Open user menu">
                  <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt="User avatar" />
                    ) : (
                      <AvatarFallback>
                        <User className="h-5 w-5" aria-hidden="true" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-2 w-44">
                <DropdownMenuLabel>
                  {session.user?.name || "User"}
                  {isAdmin && (
                    <span className="ml-2 text-xs font-bold text-purple-600">(Admin)</span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/blog" className="flex items-center gap-2">
                    <FaBloggerB /> Blog
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/maths/dashboard" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" /> My Maths Progress
                  </Link>
                </DropdownMenuItem>

                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/blogs" className="flex items-center gap-2">
                        <LayoutDashboard /> Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/write" className="flex items-center gap-2">
                        <Pen /> Write
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LucideLogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
