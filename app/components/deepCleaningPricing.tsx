// app/components/deepCleaningPricing.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: number;      // INR
  img: string;        // /public path
  popular?: boolean;
  href?: string;
};

const TIERS: Tier[] = [
  { name: "Hatchback",     price: 799,  img: "/cars/hatchback.jpg",       href: "/book/hatchback" },
  { name: "Sedan",         price: 999,  img: "/cars/sedan.jpg",           href: "/book/sedan" },
  { name: "Compact SUV",   price: 999,  img: "/cars/compact-suv.jpg",     href: "/book/compact-suv" },
  { name: "5 Seater SUV",  price: 1199, img: "/cars/suv-5-seater.jpg",    href: "/book/5-seater-suv" },
  { name: "7 Seater SUV",  price: 1399, img: "/cars/suv-7-seater.jpg",    href: "/book/7-seater-suv" },
];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function DeepCleaningPricing({
  tiers = TIERS,
  className,
  title = "Pricing",
}: {
  tiers?: Tier[];
  className?: string;
  title?: string;
}) {
  return (
    <section className={cn("w-full", className)}>
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>

      {/* Lime band like your reference */}
      <div className="w-full bg-[#8CE63A]/90 py-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-5">
          {tiers.map((t) => (
            <Link key={t.name} href={t.href ?? "#"} className="group block">
              <Card
                className={cn(
                  "relative h-full overflow-hidden rounded-xl border border-white/40 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  "dark:border-white/10 dark:bg-zinc-900"
                )}
                aria-label={`Book ${t.name} deep cleaning for ${formatINR(t.price)}`}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(1200px_300px_at_10%_-20%,rgba(140,230,58,0.22),transparent)]" />

                <CardHeader className="items-center pb-0">
                  {t.popular && (
                    <Badge className="absolute right-3 top-3 rounded-full px-2 text-xs">
                      Popular
                    </Badge>
                  )}
                  <div className="mt-4 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
                    <Image
                      src={t.img}
                      alt={`${t.name} illustration`}
                      width={220}
                      height={120}
                      className="mx-auto h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-1 pb-6 pt-4">
                  <CardTitle className="text-sm font-bold tracking-widest text-zinc-800 dark:text-zinc-100">
                    {t.name.toUpperCase()}
                  </CardTitle>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {formatINR(t.price)}
                  </p>

                  <Button
                    size="sm"
                    className="mt-3 w-full rounded-md bg-[#8CE63A] text-black hover:bg-[#79d431]"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
