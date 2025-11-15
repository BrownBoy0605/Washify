"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, ChevronRight, MessageCircle } from "lucide-react";
import { useState } from "react";

type Slide = {
  src: string;
  alt?: string;
};

interface HeroProps {
  slides?: Slide[]; // pass multiple images if you want the dots to switch
  city?: string;
}

export default function Hero({
  slides = [
    { src: "/hero/car-1.jpg", alt: "Blue sports car" },
    { src: "/hero/car-2.jpg", alt: "Detailing" },
    { src: "/hero/car-3.jpg", alt: "Clean interior" },
  ],
  city = "Jaipur",
}: HeroProps) {
  const [index, setIndex] = useState(0);

  const current = slides[index];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        {/* next/image for perf, with object-cover */}
        <video
    src={current.src}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  />
        {/* Dark overlay + subtle gradient from bottom */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Navbar offset safety if fixed header is used */}
      <div className="pointer-events-none h-14 w-full md:h-16" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Tagline */}
            <p className="tracking-[0.35em] text-xs font-semibold text-white/80 md:text-sm">
              DOORSTEP CAR CLEANING SERVICES
            </p>

            {/* Brand */}
            <h1 className="mt-3 text-5xl font-extrabold leading-tight text-white md:text-7xl">
              WASHIFY
            </h1>

            {/* City badge like screenshot */}
            <div className="mt-4">
              <Badge className="bg-white text-gray-900 hover:bg-white">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                {city}
              </Badge>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-2">
                View Packages <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <Phone className="h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right-side dots (slide indicators) */}
      {/* <div className="absolute right-6 top-1/2 z-10 -translate-y-1/2 space-y-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={[
              "block h-3 w-3 rounded-full border border-white/70 transition",
              i === index ? "bg-white" : "bg-white/20 hover:bg-white/40",
            ].join(" ")}
          />
        ))}
      </div> */}

      {/* Floating WhatsApp button (bottom-left) */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        className="fixed left-4 bottom-4 z-20"
      >
        <Button size="icon" className="h-12 w-12 rounded-full shadow-lg" aria-label="Contact on WhatsApp">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </a>
    </section>
  );
}
