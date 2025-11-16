// app/components/navbar.tsx
"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, MapPin } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-700 bg-gray-900/80 text-white backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 fixed top-0 z-50">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-white">
          WASHIFY
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                <Link href="/" className="hover:text-gray-300 text-sm font-medium">
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                {/* Non-modal dropdown prevents scroll hijack */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-sm font-medium">
                      Packages
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="bg-gray-800 text-white border border-gray-700"
                    align="start"
                  >
                    <DropdownMenuItem asChild>
                      <Link href="/quick-shine">QUICK SHINE</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/deep-cleaning">DEEP CLEANING</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/rubbing-polishing">RUBBING &amp; POLISHING</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/windshield-polishing">WINDSHIELD POLISHING</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/booking" className="hover:text-gray-300 text-sm font-medium">
                  Contact Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Location Badge */}
          <Badge className="flex items-center gap-1 px-3 py-1 text-sm">
            <MapPin size={14} /> Jaipur
          </Badge>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden" aria-label="Open menu">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="right" className="p-6">
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link href="/">Home</Link>

              {/* Simple list for mobile (keeps routing client-side, avoids nested dropdown in Sheet) */}
              <div className="flex flex-col gap-2">
                <span className="text-sm uppercase text-gray-400">Packages</span>
                <Link href="/quick-shine">QUICK SHINE</Link>
                <Link href="/deep-cleaning">DEEP CLEANING</Link>
                <Link href="/rubbing-polishing">RUBBING &amp; POLISHING</Link>
                <Link href="/windshield-polishing">WINDSHIELD POLISHING</Link>
              </div>

              <Link href="/booking">Contact Us</Link>

              <Badge className="w-fit flex items-center gap-1 px-3 py-1 text-sm">
                <MapPin size={14} /> Jaipur
              </Badge>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
