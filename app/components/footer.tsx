"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Instagram, BadgeCheck } from "lucide-react";

const ACCENT_RED = "#E81E25"; // banner
const ACCENT_GREEN = "#8CE63A"; // CTA / subscribe

export default function FooterSection() {
  return (
    <footer className="mt-16 text-white w-full">
      {/* Top red contact strip */}
      <div className="w-full" style={{ backgroundColor: ACCENT_RED }}>
        <div className="container mx-auto grid grid-cols-1 items-center gap-4 px-4 py-4 text-sm md:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4" />
            <div>
              <p className="font-semibold">3 K Shivpura Kota (Raj.)</p>
              <p className="opacity-90">near Saras Dairy Shivpura</p>
              <p className="opacity-90">Pincode : 324010</p>
            </div>
          </div>

          <div className="flex flex-col md:items-center md:justify-center">
            <div className="flex items-center gap-6">
              <a href="tel:9982210776" className="font-semibold hover:underline">
                9982210776
              </a>
              <a href="tel:9982210779" className="font-semibold hover:underline">
                9982210779
              </a>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 md:justify-end">
            <Mail className="h-4 w-4" />
            <a href="mailto:info@washify.com" className="font-semibold hover:underline">
              info@washify.com
            </a>
          </div>
        </div>
      </div>

      {/* Main dark footer area */}
      <div className="bg-[#16181b]">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-12 md:grid-cols-3">
          {/* Company Column */}
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">COMPANY <span className="text-lime-400">//</span></h3>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              Need a special car cleaning service? We’re happy to fulfil every request in order to exceed your expectations.
            </p>

            <Card className="mt-6 grid grid-cols-[auto_1fr] items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: ACCENT_GREEN }}>
                <Phone className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/70">Talk To Our Support</p>
                <a href="tel:9982210776" className="text-xl font-bold hover:underline">
                  9982210776
                </a>
              </div>
            </Card>

            <Button variant="link" asChild className="mt-4 px-0 text-white/90 hover:text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">OUR SOLUTIONS <span className="text-lime-400">//</span></h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-white/90">
              <li>
                <Link href="/booking" className="hover:underline">Deep Cleaning</Link>
              </li>
              <li className="text-white/70">BOOKING</li>
              <li>
                <Link href="/booking" className="hover:underline">Rubbing &amp; Polishing</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:underline">Quick Shine</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:underline">Windshield Polish</Link>
              </li>
            </ul>
          </div>

          {/* Subscribe Column */}
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">SUBSCRIBE NOW <span className="text-lime-400">//</span></h3>
            <p className="mt-4 text-sm text-white/80 max-w-md">
              Subscribe to our newsletter and be the first to know about exclusive deals, new services, and car care tips.
            </p>

            <form
              className="mt-5 flex overflow-hidden rounded-md border border-white/10"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const input = form.querySelector("input[name=email]") as HTMLInputElement | null;
                if (input) {
                  alert(`Subscribed: ${input.value}`);
                  input.value = "";
                }
              }}
            >
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                className="rounded-none border-0 bg-white/10 text-white placeholder:text-white/60"
                required
              />
              <Button
                type="submit"
                className="h-10 rounded-none font-bold"
                style={{ backgroundColor: ACCENT_GREEN, color: "#0a0a0a" }}
              >
                SEND
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <Link aria-label="Instagram" href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link aria-label="WhatsApp" href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <BadgeCheck className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="border-white/10" />

        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/70 md:flex-row">
          <p>© {new Date().getFullYear()} Washify. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
