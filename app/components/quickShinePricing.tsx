// app/components/PricingGrid.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  img: string;
  popular?: boolean;
  href?: string;
};

const BASE_TIERS: Tier[] = [
  { name: "Hatchback",   img: "/cars/hatchback.jpg", popular: true,  href: "/booking" },
  { name: "Sedan",       img: "/cars/sedan.jpg",                         href: "/booking" },
  { name: "Compact SUV", img: "/cars/compact-suv.jpg",                   href: "/booking" },
  { name: "5 Seater SUV",img: "/cars/suv-5-seater.jpg",                  href: "/booking" },
  { name: "7 Seater SUV",img: "/cars/suv-7-seater.jpg",                  href: "/booking" },
];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function QuickShinePricing({
  prices,
  className,
  title = "Pricing",
}: {
  prices: number[];   // ✅ The new prop
  className?: string;
  title?: string;
}) {
  // Merge prices with tier base info. If price missing → skip that tier.
  const tiersWithPrices = BASE_TIERS.map((tier, index) =>
    prices[index] ? { ...tier, price: prices[index] } : null
  ).filter(Boolean) as (Tier & { price: number })[];

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>

      <div className="w-full bg-[#8CE63A]/90 py-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-5">
          {tiersWithPrices.map((t) => (
            <a key={t.name} href={t.href ?? "#"} className="group">
              <Card className={cn(
                "relative h-full overflow-hidden rounded-xl border border-white/40 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50"
              )}>
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
                      alt={t.name}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
