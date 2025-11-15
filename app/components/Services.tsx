// app/components/ServicesGrid.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  href?: string;
  icon: string; // path under /public
};

type FeatureInput = string | { title: string; href?: string };

// --- Icon map (paths are under /public/services) ---
const FEATURE_ICON_MAP: Record<string, string> = {
  // cleaning / interior
  "vacuum-cleaning": "/services/vaccum.png", // file is spelled 'vaccum.png'
  "interior-dusting": "/services/interiorDusting.png",
  "shampoo-washing": "/services/exterior.png",
  "dashboard-polishing": "/services/dashboard.png",
  "tyre-polish": "/services/tyre.png",
  "seats-drycleaning": "/services/seats.png",
  "doors-drycleaning": "/services/doors.png",
  "roof-drycleaning": "/services/roof.png",
  "matts-drycleaning": "/services/matts.png",
  "trunk-drycleaning": "/services/boot.png",
  "interior-polishing": "/services/interior.png",

  // rubbing / polishing / exterior
  "sandpaper-rubbing": "/services/sandpaper.png",
  "roof-rubbing": "/services/roof-rubbing.png",
  "bonnet-rubbing": "/services/bonnet.png", // mapping "Bonet" -> "Bonnet"
  "doors-rubbing": "/services/doorsRub.png",
  "headlight-rubbing": "/services/headlight-rubbing.png",
  "boot-buffing": "/services/boot-buffing .png", // file includes a space as provided
  "exterior-wax-polishing": "/services/exteriorWAX.png",
  "windshield-rubbing": "/services/windshield.png", // mapping "Windsheild" -> "Windshield"
};

// optional fallback image if a feature isn’t mapped
const FALLBACK_ICON = "/services/default.png";

// --- Helpers ---
function normalizeFeatureKey(raw: string) {
  // Lowercase, trim, collapse spaces, replace non-word with hyphens
  const base = raw
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // fix common variants/typos
  const fixes: Record<string, string> = {
    "vaccume-cleaning": "vacuum-cleaning",
    "vacume-cleaning": "vacuum-cleaning",
    "vacuum": "vacuum-cleaning",
    "bonet-rubbing": "bonnet-rubbing",
    "windsheild-rubbing": "windshield-rubbing",
    "trunk-dry-cleaning": "trunk-drycleaning",
    "mats-drycleaning": "matts-drycleaning", // if someone writes "mats"
  };

  return fixes[base] || base;
}

function resolveIconFor(title: string) {
  const key = normalizeFeatureKey(title);
  return FEATURE_ICON_MAP[key] || FALLBACK_ICON;
}

// --- Default sample services (can be overridden via props) ---
const DEFAULT_SERVICES: Service[] = [
  { title: "Vacuum Cleaning", icon: resolveIconFor("Vacuum Cleaning"), href: "/services/vaccum" },
  { title: "Interior Dusting", icon: resolveIconFor("Interior Dusting"), href: "/services/interiorDusting" },
  { title: "Shampoo Washing", icon: resolveIconFor("Shampoo Washing"), href: "/services/shampoo-washing" },
  { title: "Dashboard Polishing", icon: resolveIconFor("Dashboard Polishing"), href: "/services/dashboard" },
  { title: "Tyre Polish", icon: resolveIconFor("Tyre Polish"), href: "/services/tyre-polish" },
];

export default function ServicesGrid({
  className,
  features, // optional: array of strings or { title, href }
  services, // optional: direct Service[]
  columns = { base: 1, sm: 2, lg: 3 },
}: {
  className?: string;
  features?: FeatureInput[];
  services?: Service[];
  columns?: { base?: number; sm?: number; lg?: number };
}) {
  // Build the final list:
  // 1) If `services` given, use as-is.
  // 2) Else if `features` given, map to Service with icon resolution.
  // 3) Else use DEFAULT_SERVICES.
  const finalServices: Service[] = services
    ? services
    : features
    ? features.map((f) => {
        const title = typeof f === "string" ? f : f.title;
        const href = typeof f === "string" ? undefined : f.href;
        const icon = resolveIconFor(title);
        if (icon === FALLBACK_ICON) {
          console.warn(`[ServicesGrid] No icon mapping found for "${title}". Using fallback.`);
        }
        return { title, href, icon };
      })
    : DEFAULT_SERVICES;

  const gridCols = [
    `grid-cols-${columns.base ?? 1}`,
    columns.sm ? `sm:grid-cols-${columns.sm}` : "",
    columns.lg ? `lg:grid-cols-${columns.lg}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={cn("w-full", className)}>
      <div className={cn("mx-auto grid max-w-6xl gap-5 p-4", gridCols)}>
        {finalServices.map((s) => {
          const card = (
            <Card
              key={s.title}
              className="
                group relative overflow-hidden border bg-card/60
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                dark:border-white/10
              "
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(1200px_300px_at_10%_-10%,rgba(140,230,58,0.18),transparent)]" />
              <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
                <div
                  className="
                    rounded-2xl p-4 shadow-sm ring-1 ring-black/5
                    transition-transform duration-300 group-hover:scale-105
                    dark:ring-white/10
                    bg-white/90 dark:bg-zinc-900/60
                  "
                >
                  <Image
                    src={s.icon}
                    alt={s.title}
                    width={96}
                    height={96}
                    className="h-20 w-20 object-contain"
                    priority={false}
                  />
                </div>
                <h3 className="text-center text-base font-semibold tracking-tight md:text-lg">
                  {s.title}
                </h3>
                <span className="h-0.5 w-8 origin-center scale-x-0 bg-[#8CE63A] transition-transform duration-300 group-hover:scale-x-100" />
              </CardContent>
            </Card>
          );

          return s.href ? (
            <Link key={s.title} href={s.href} className="focus:outline-none">
              {card}
            </Link>
          ) : (
            card
          );
        })}
      </div>
    </section>
  );
}

// Optional: export the map if you want to reuse it elsewhere
export { FEATURE_ICON_MAP, resolveIconFor, normalizeFeatureKey };
