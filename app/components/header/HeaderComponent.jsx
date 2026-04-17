"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  LayoutDashboard,
  LucideLogOut,
  Search,
  ShoppingCart,
  Pen,
  Link2,
  Menu,
  User,
} from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";

import Image from "next/image";
import { useCart } from "../cart/CartContext";
import { FaBackward, FaBloggerB, FaCompress } from "react-icons/fa";
import { Icon } from "@iconify/react";

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

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = session?.user?.role === "admin";

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      // setSearch(""); // keep filled for convenience; uncomment to clear
    }
  };

  const handleLogin = () => signIn();
  const handleLogout = () => signOut();

  return (
    <header className="fixed top-0 w-full z-50 py-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-black/10 dark:border-gray-700/30">
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 px-2 sm:px-6 py-2">
        {/* Logo */}
        <div className="flex items-center w-full sm:w-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="/shopyor.png"
              width={120}
              height={120}
              alt="tools"
              priority
              sizes="120px"
            />
          </Link>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          role="search"
          aria-label="Site search"
          className="w-full sm:w-auto flex-1 flex items-center"
        >
          <div className="relative w-full max-w-[320px] sm:max-w-xs md:max-w-md mx-auto">
            <label htmlFor="header-search" className="sr-only">
              Search
            </label>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
              aria-hidden="true"
            />
            <Input
              id="header-search"
              type="text"
              placeholder="Search blogs . . ."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border bg-gray-100 focus:bg-white dark:bg-zinc-900 dark:focus:bg-zinc-800 text-sm sm:text-base"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>

            <Link href="/tools" className="hover:text-primary">
              Tools
            </Link>
          </nav>

          {/* Cart */}

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Open menu"
                  className="rounded-full border w-9 h-9"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pt-8 flex flex-col gap-5">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="text-lg font-semibold hover:text-primary"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/blogs"
                    className="text-lg font-semibold hover:text-primary"
                  >
                    Blog
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/tools"
                    className="text-lg font-semibold hover:text-primary"
                  >
                    Tools
                  </Link>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Login / Avatar */}
          {!session ? (
            <Button
              onClick={handleLogin}
              className="ml-1 px-3 py-1 text-sm sm:text-base"
              aria-label="Login"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer" aria-label="Open user menu">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt="User avatar" />
                    ) : (
                      <AvatarFallback>
                        <User className="w-8 h-8" aria-hidden="true" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 mt-2">
                <DropdownMenuLabel>
                  {session.user?.name || "User"}
                  {isAdmin && (
                    <span className="ml-2 text-xs text-purple-600 font-bold">
                      (Admin)
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/blog" className="flex items-center gap-2">
                    <FaBloggerB /> Blog
                  </Link>
                </DropdownMenuItem>

                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/blogs"
                        className="flex items-center gap-2"
                      >
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
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
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
