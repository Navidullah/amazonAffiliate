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
  SquareArrowDownRight,
  Pen,
  Link2,
  Menu,
  User,
  RemoveFormatting,
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
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useCart } from "../cart/CartContext";
import { FaBackward, FaBloggerB, FaCompress } from "react-icons/fa";
import { Icon } from "@iconify/react";

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

  const handleLogin = () => signIn();
  const handleLogout = () => signOut();
  const isAdmin = session?.user?.role === "admin";

  return (
    <header className="fixed top-0 w-full z-50 py-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-black/10 dark:border-gray-700/30">
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 px-2 sm:px-6 py-2">
        {/* Logo */}
        <div className="flex items-center w-full sm:w-auto">
          <Link href="/" className="flex items-center">
            <Image src="/shopyor.png" width={40} height={40} alt="shopyor" />
            <span className="font-semibold text-xl sm:text-2xl ml-2">
              Shopyor
            </span>
          </Link>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto flex-1 flex items-center"
        >
          <div className="relative w-full max-w-[320px] sm:max-w-xs md:max-w-md mx-auto">
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
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/blogs" className="hover:text-primary">
              Blog
            </Link>
            <Link href="/product" className="hover:text-primary">
              Product
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Tools <SquareArrowDownRight className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/image-compressor">
                    <FaCompress className="mr-2" /> Image Compressor
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/background-remover">
                    <FaBackward className="mr-2" /> Background Remover
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/exif-remover">
                    <FaBackward className="mr-2" /> EXIF Remover
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/generate-link">
                    <Link2 className="mr-2" /> Affiliate Link Generator
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full w-9 h-9"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

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
                    href="/product"
                    className="text-lg font-semibold hover:text-primary"
                  >
                    Product
                  </Link>
                </SheetClose>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">Tools</span>
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link
                        href="/image-compressor"
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <FaCompress /> Image Compressor
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/background-remover"
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <FaBackward /> Background Remover
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/exif-remover"
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <RemoveFormatting /> EXIF Remover
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/generate-link"
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <Link2 /> Affiliate Link Generator
                      </Link>
                    </SheetClose>
                  </div>
                </div>
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
                  <Link href="/blogs">
                    <FaBloggerB /> Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/generate-link">
                    <Link2 /> Generate link
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/image-compressor">
                    <FaCompress /> Image compressor
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/background-remover">
                    <FaBackward /> Background Remover
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/orders">
                        <LayoutDashboard /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/add-product">
                        <Icon icon="formkit:add" width="16" height="16" /> Add
                        Product
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/write">
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
