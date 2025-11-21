// app/components/navbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Menu, MapPin } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  return (
    <header className="w-full border-b border-gray-700 bg-gray-900/80 text-white backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 fixed top-0 z-50">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <button onClick={() => router.push("/")} className="font-bold text-xl text-white hover:opacity-80 transition">
          WASHIFY
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                <button onClick={() => router.push("/")} className="hover:text-gray-300 text-sm font-medium">
                  Home
                </button>
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
                    <DropdownMenuItem onClick={() => router.push("/quick-shine")}>
                      QUICK SHINE
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/deep-cleaning")}>
                      DEEP CLEANING
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/rubbing-polishing")}>
                      RUBBING &amp; POLISHING
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/windshield-polishing")}>
                      WINDSHIELD POLISHING
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button onClick={() => router.push("/booking")} className="hover:text-gray-300 text-sm font-medium">
                  Contact Us
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button onClick={() => router.push("/allBookings")} className="hover:text-gray-300 text-sm font-medium">
                  Bookings
                </button>
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
            <VisuallyHidden asChild>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <button onClick={() => router.push("/")} className="text-left hover:text-gray-300">Home</button>

              {/* Simple list for mobile (keeps routing client-side, avoids nested dropdown in Sheet) */}
              <div className="flex flex-col gap-2">
                <span className="text-sm uppercase text-gray-400">Packages</span>
                <button onClick={() => router.push("/quick-shine")} className="text-left hover:text-gray-300">QUICK SHINE</button>
                <button onClick={() => router.push("/deep-cleaning")} className="text-left hover:text-gray-300">DEEP CLEANING</button>
                <button onClick={() => router.push("/rubbing-polishing")} className="text-left hover:text-gray-300">RUBBING &amp; POLISHING</button>
                <button onClick={() => router.push("/windshield-polishing")} className="text-left hover:text-gray-300">WINDSHIELD POLISHING</button>
              </div>

              <button onClick={() => router.push("/booking")} className="text-left hover:text-gray-300">Contact Us</button>

              
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
