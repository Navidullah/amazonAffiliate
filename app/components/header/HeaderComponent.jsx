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
  SquarePen,
  User,
  Menu,
} from "lucide-react";
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
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import { useCart } from "../cart/CartContext";
// <-- Cart context import

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const handleWrite = () => {
    if (!session) signIn();
    else router.push("/write");
  };

  const handleLogin = () => signIn();
  const handleLogout = () => signOut();

  // Check if admin
  const isAdmin = session?.user?.role === "admin";

  return (
    <header className="fixed top-0 w-full z-50 py-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-black/10 dark:border-gray-700/30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6 px-2 sm:px-6 h-auto sm:h-16">
        {/* Logo */}

        <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Brain-sparks-Logo"
              className="font-serif font-bold tracking-tight"
            />
          </Link>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto flex-1 flex items-center mb-2 sm:mb-0"
        >
          <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border bg-gray-100 focus:bg-white dark:bg-zinc-900 dark:focus:bg-zinc-800 text-sm sm:text-base"
              autoComplete="off"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <Link href="/account" className="hover:text-primary">
              Account
            </Link>
          </div>
          {/* cart badge */}
          <Link href="/cart" className="relative">
            <Button size="icon" variant="outline" className="rounded-full">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          <div className="flex md:hidden items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Open menu"
                  className="rounded-full border"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pt-8 flex flex-col gap-5">
                <Link
                  href="/products"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Products
                </Link>
                <Link
                  href="/account"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Account
                </Link>
              </SheetContent>
            </Sheet>
          </div>

          {/* Write Button */}
          <Button
            size="icon"
            variant="outline"
            className="flex items-center justify-center rounded-full hover:cursor-pointer"
            onClick={handleWrite}
          >
            <SquarePen />
          </Button>

          {/* Mode toggle Button */}
          <ModeToggle />

          {/* Login / Avatar Dropdown */}
          {!session ? (
            <Button
              onClick={handleLogin}
              className="ml-1 px-3 py-1 text-sm sm:text-base hover:cursor-pointer"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt="User avatar" />
                    ) : (
                      <AvatarFallback>
                        <User className="w-8 h-8" />
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
                  <Link href="/admin/orders">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {/* Admin-only menu */}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LucideLogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
