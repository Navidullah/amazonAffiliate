"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Image from "next/image";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/app/cart/CartContext";
import { FaBloggerB } from "react-icons/fa";

export default function HeaderComponent() {
  const router = useRouter();
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const { cartItems } = useCart();
  const cartCount = (cartItems || []).reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const isAdmin = session?.user?.role === "admin";

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const handleLogin = () => signIn();
  const handleLogout = () => signOut();

  return (
    <header className="fixed top-0 w-full z-50 py-1 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md border-b border-black/10 dark:border-gray-700/30">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex items-center gap-3 justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/shopyor.png"
              width={40}
              height={40}
              alt="Health & fitness"
              priority
              sizes="40px"
            />
            <span className="font-semibold text-xl sm:text-2xl ml-2">
              Shopyor
            </span>
          </Link>

          {/* Search */}
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="pl-9 pr-3 h-10"
                autoComplete="off"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <ModeToggle />

            {!session ? (
              <Button onClick={handleLogin} size="sm" variant="default">
                Sign in
              </Button>
            ) : (
              <>
                <Link href="/dashboard">
                  <Button size="sm" variant="outline" className="gap-2">
                    <LayoutDashboard size={16} /> Dashboard
                  </Button>
                </Link>

                <Link href="/share" className="hidden lg:block">
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Link2 size={16} /> Share Link
                  </Button>
                </Link>

                {/* Profile Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label="User menu"
                      className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>
                          {(session.user?.name || "U").slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {session.user?.name || "User"}
                      {isAdmin && (
                        <span className="ml-2 text-xs text-purple-600 font-bold">
                          (Admin)
                        </span>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/blogs" className="flex items-center gap-2">
                        <FaBloggerB /> Blog
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/admin/products/add"
                            className="flex items-center gap-2"
                          >
                            <img
                              src="/icons/plus.svg"
                              alt="add"
                              width="16"
                              height="16"
                            />{" "}
                            Add Product
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/write"
                            className="flex items-center gap-2"
                          >
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
              </>
            )}

            <Link href="/cart" className="relative">
              <Button size="icon" variant="outline" aria-label="Open cart">
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-cyan-500 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center">
            <Link href="/cart" className="relative mr-2">
              <Button size="icon" variant="outline" aria-label="Open cart">
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-cyan-500 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

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
                    Blogs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="text-lg font-semibold hover:text-primary"
                  >
                    Contact
                  </Link>
                </SheetClose>

                <div className="flex items-center gap-3">
                  <ModeToggle />
                  {!session ? (
                    <Button onClick={handleLogin} size="sm" className="ml-2">
                      Sign in
                    </Button>
                  ) : (
                    <Button onClick={handleLogout} size="sm" className="ml-2">
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
