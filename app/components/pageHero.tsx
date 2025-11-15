// app/components/PageHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

type BreadcrumbItem = { label: string; href?: string };
type Cta = { label: string; href: string; variant?: "default" | "secondary" | "outline" | "ghost" | "link" };

type PageHeroProps = {
  title: string;
  bgSrc: string; // public path to image
  breadcrumbs?: BreadcrumbItem[]; // e.g. [{label:"Home", href:"/"}, {label:"Quick Shine"}]
  ctas?: Cta[]; // e.g. [{label:"Book Now", href:"/book/quick-shine"}]
  className?: string;
  overlayClassName?: string; // override overlay color/gradient if needed
  heightClassName?: string; // override height e.g. "h-[60vh]"
  align?: "center" | "left"; // content alignment
  subtitle?: string | React.ReactNode;
  children?: React.ReactNode; // extra custom content under buttons
};

export default function PageHero({
  title,
  bgSrc,
  breadcrumbs = [{ label: "Home", href: "/" }],
  ctas = [],
  className,
  overlayClassName,
  heightClassName = "h-[50vh] min-h-[320px]",
  align = "center",
  subtitle,
  children,
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section className={cn("relative w-full overflow-hidden", heightClassName, className)}>
      <Image src={bgSrc} alt={`${title} background`} fill priority className="object-cover" />

      {/* Overlay (customizable) */}
      <div />

      <div
        className={cn(
          "relative z-10 flex h-full w-full px-4 md:px-8",
          isCenter ? "items-center justify-center text-center" : "items-center justify-start text-left"
        )}
      >
        <div className={cn("text-white", isCenter ? "max-w-3xl" : "max-w-4xl")}>
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className={cn("mb-3 text-white/80", isCenter ? "justify-center" : "")}>
              <ol className={cn("flex items-center gap-2 text-sm md:text-base", isCenter ? "justify-center" : "")}>
                {breadcrumbs.map((bc, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <li key={`${bc.label}-${idx}`} className="flex items-center gap-2">
                      {idx === 0 && <Home className="h-4 w-4" />}
                      {bc.href && !isLast ? (
                        <Link href={bc.href} className="hover:text-white transition">
                          {bc.label}
                        </Link>
                      ) : (
                        <span className={cn(isLast ? "text-white" : "")}>{bc.label}</span>
                      )}
                      {!isLast && <span>/</span>}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {/* Title + optional subtitle */}
          <h1 className="text-4xl font-extrabold md:text-6xl tracking-tight">{title}</h1>
          {subtitle && <div className="mt-2 text-white/90 md:text-lg">{subtitle}</div>}

          {/* CTAs */}
          {ctas.length > 0 && (
            <div className={cn("mt-6 flex gap-3", isCenter ? "justify-center" : "")}>
              {ctas.map((cta) => (
                <Button
                  key={cta.label}
                  asChild
                  variant={cta.variant ?? "default"}
                  className={cn(
                    cta.variant === "default" ? "bg-[#8CE63A] text-black hover:bg-[#7bd72f]" : ""
                  )}
                >
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ))}
            </div>
          )}

          {/* Extra custom content area */}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
