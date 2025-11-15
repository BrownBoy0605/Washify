"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export type Metric = {
  label: string;
  value: number; // 0–100
};

interface WhyChooseUsProps {
  brand?: string; // small kicker text e.g., 
  title?: string; // main headline
  description?: string;
  metrics?: Metric[];
  imageSrc: string;
  imageAlt?: string;
}

export default function WhyChooseUs({
  brand = "WASHIFY",
  title = "WHY CHOOSE US //",
  description =
    "WASHIFY provides professional car cleaning services at your doorstep whenever you want, so you can spend your time doing the things you love.",
  metrics = [
    { label: "QUALITY SERVICES", value: 90 },
    { label: "EXPERIENCED TECHNICIANS", value: 85 },
    { label: "CUSTOMER SATISFACTION", value: 95 },
  ],
  imageSrc,
  imageAlt = "Green car with detailing tools",
}: WhyChooseUsProps) {
  return (
    <section className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-10 md:py-16">
      {/* Left image */}
      <Card className="overflow-hidden border-0 bg-transparent shadow-none md:shadow">
        <CardContent className="p-0">
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* Right content */}
      <div className="max-w-xl md:ml-auto">
        <Badge variant="secondary" className="mb-2 bg-transparent px-0 text-xs tracking-[0.25em] text-[#E81E25]">
          {brand}
        </Badge>

        <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
          {title}
        </h2>

        <p className="mt-3 text-muted-foreground md:text-lg">{description}</p>

        <div className="mt-6 space-y-6">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-tight">
                  {m.label}
                </span>
                <span className="text-sm font-bold tabular-nums">{m.value}%</span>
              </div>

              {/* Progress styled to match the red bar with pale track */}
              <Progress
                value={m.value}
                className="h-2 rounded-full bg-rose-100 [&>div]:rounded-full [&>div]:bg-[#E81E25]"
              />
            </div>
          ))}
        </div>

        <Separator className="mt-8" />

        {/* Optional bullets; keep it simple but ready to extend */}
        <ul className="mt-6 grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <li>Doorstep service at your convenience</li>
          <li>Eco-friendly products and methods</li>
          <li>Transparent pricing, no surprises</li>
          <li>Trusted by hundreds of happy customers</li>
        </ul>
      </div>
    </section>
  );
}
