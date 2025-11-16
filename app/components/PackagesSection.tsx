"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Brush, Sparkles, Wind, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as React from "react";

type Package = {
  id: string;
  title: string;
  desc: string;
  time: string;
  price: string;
  icon: React.ReactNode;
  href?: string;
  detailHref?: string; // minimal addition for detail page URL
};

const DEFAULT_PACKAGES: Package[] = [
  {
    id: "quick",
    title: "QUICK SHINE",
    desc: "Keep your ride shining bright and rolling right with regular car cleaning!",
    time: "Time · Around 1 hr",
    price: "₹349/-",
    icon: <Sparkles className="h-6 w-6" aria-hidden />,
    href: "/booking",
    detailHref: "/quick-shine",
  },
  {
    id: "deep",
    title: "DEEP CLEANING",
    desc: "Revitalize your ride with a deep clean that'll make it shine like new!",
    time: "Time · Around 2–3 hrs",
    price: "₹799/-",
    icon: <Brush className="h-6 w-6" aria-hidden />,
    href: "/booking",
    detailHref: "/deep-cleaning",
  },
  {
    id: "rubbing",
    title: "RUBBING & POLISHING",
    desc: "Elevate your drive with detailing that brings out the best in every detail.",
    time: "Time · Around 2–3 hrs",
    price: "₹1399/-",
    icon: <Car className="h-6 w-6" aria-hidden />,
    href: "/booking",
    detailHref: "/rubbing-polishing",
  },
  {
    id: "windshield",
    title: "WINDSHIELD POLISH",
    desc: "Clear the way to perfection with glass polishing that turns foggy into fabulous!",
    time: "Time · Around 2 hrs",
    price: "₹799/-",
    icon: <Wind className="h-6 w-6" aria-hidden />,
    href: "/booking",
    detailHref: "/windshield-polishing",
  },
];

interface PackagesSectionProps {
  heading?: string;
  sub?: string;
  ctaHref?: string;
  packages?: Package[];
  backgroundImageUrl?: string;
}

export default function PackagesSection({
  heading = "Packages for Every Ride",
  sub = "OUR PACKAGES",
  ctaHref = "/booking",
  packages = DEFAULT_PACKAGES,
  backgroundImageUrl,
}: PackagesSectionProps) {
  return (
    <section className="relative w-full min-h-screen">
      {/* Red banner background with optional tire track image */}
      <div className="relative z-0 overflow-hidden bg-[#E81E25] text-white w-full">
        {/* Gradient sheen */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_90%_-10%,rgba(255,255,255,0.35),transparent_55%)]" />

        {/* Optional decorative image (tire tracks) */}
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt="Decorative tire track"
            fill
            priority
            className="object-cover opacity-20 select-none"
          />
        ) : null}

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase/5 opacity-90">
                {sub}
              </p>
              <h2 className="mt-2 text-3xl md:text-5xl font-extrabold leading-[1.1]">
                {heading}
              </h2>
            </div>

            <Link href={ctaHref} className="sm:translate-y-1">
              <Button
                variant="secondary"
                className="bg-white text-[#E81E25] hover:bg-white/90 hover:text-[#c4171d] font-semibold shadow-sm"
                aria-label="Book now"
              >
                BOOK NOW
              </Button>
            </Link>
          </div>
        </div>

        {/* angled divider */}
      </div>

      {/* Cards wrapper that overlaps the red banner (white panel look) */}
      <div className="relative z-10 -mt-10 md:-mt-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-black/5 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-900 sm:mt-2 md:mt-7">
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 md:p-8"
            >
              {packages.map((pkg, idx) => (
                <motion.li
                  key={pkg.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: idx * 0.05, duration: 0.35 },
                    },
                  }}
                >
                  <Link href={pkg.href ?? ctaHref} className="group block h-full">
                    <Card className="h-full border-0 bg-white p-0 shadow-none dark:from-zinc-900 dark:to-zinc-900/60">
                      <div className="rounded-xl h-full bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all group-hover:-translate-y-0.5 group-hover:shadow md:group-hover:shadow-lg dark:bg-zinc-900 dark:ring-white/10">
                        <CardContent className="p-0">
                          {/* Icon + ribbon */}
                          <div className="mb-3 flex items-center gap-2">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 shadow-sm">
                              {pkg.icon}
                            </span>
                            {idx === 1 && (
                              <Badge className="rounded-full" variant="secondary">
                                Popular
                              </Badge>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-extrabold tracking-tight">
                            {pkg.title}
                          </h3>

                          {/* Description */}
                          <p className="mt-2 text-sm text-muted-foreground">
                            {pkg.desc}
                          </p>

                          {/* Time */}
                          <p className="mt-4 text-xs text-muted-foreground">
                            {pkg.time}
                          </p>

                          {/* Price */}
                          <div className="mt-3 inline-flex items-baseline gap-2 rounded-lg border border-emerald-200/60 bg-emerald-50 px-3 py-1.5 text-emerald-900 dark:border-emerald-800/50 dark:bg-emerald-900/30 dark:text-emerald-200">
                            <span className="text-xl font-extrabold leading-none">{pkg.price}</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-70">incl. taxes</span>
                          </div>

                          {/* Actions */}
                          <div className="mt-5 flex items-center gap-3">
                            <Button size="sm" className="font-semibold">
                              BOOK NOW
                            </Button>

                            {/* Minimal change: button that prevents outer Link from triggering
                                and navigates to the detail page via window.location */}
                            <button
                              onClick={(e) => {
                                // stop the outer Link (booking) from handling this click
                                e.preventDefault();
                                e.stopPropagation();
                                const target = pkg.detailHref ?? ctaHref;
                                // navigate
                                if (typeof window !== "undefined") {
                                  window.location.href = target;
                                }
                              }}
                              className="inline-flex items-center text-sm font-medium text-primary/90 group-hover:text-primary"
                              aria-label={`More about ${pkg.title}`}
                            >
                              More
                              <ChevronRight className="ml-0.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                          </div>

                          {/* Decorative underline */}
                          <div className="mt-3 h-1 w-12 rounded-full bg-emerald-500/80 group-hover:w-16 transition-[width]" />
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Mobile CTA button (since the top-right is hidden on small screens) */}
          <div className="sm:hidden mt-6 flex justify-center">
            <Link href={ctaHref}>
              <Button size="lg" className="px-8">BOOK NOW</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
