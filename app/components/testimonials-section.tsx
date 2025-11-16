"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  image?: string;
  rating: number;
};

const DATA: Testimonial[] = [
  {
    quote:
      "The overall appearance of the vehicle after cleaning is very good. The attitude and professionalism of the staff is good.",
    name: "Rahul Sherewala",
    image: "/photos/user-rahul.jpg",
    rating: 5,
  },
  {
    quote:
      "If you want quality service for car detailing, then Washify is the one where they offer high-quality services, without stressing their budget at the same time.",
    name: "Geeta Kumari",
    image: "/photos/user-geeta.jpg",
    rating: 5,
  },
  {
    quote:
      "Fast, reliable, and super convenient. Booking was easy and the results exceeded expectations.",
    name: "Aman Verma",
    image: "/photos/user-aman.jpg",
    rating: 4,
  },
];

interface Props {
  items?: Testimonial[];
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({ items = DATA, className }: Props) {
  return (
    <section className={"relative py-14 " + (className ?? "")}>      
      <div className="container mx-auto px-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#E81E25]">Testimonial</p>
        <h2 className="mb-8 text-3xl font-extrabold md:text-5xl">WHAT CLIENTS SAY</h2>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[
            Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true }),
          ]}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {items.map((t, idx) => (
              <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <Card className="relative overflow-visible border-0 bg-[#8CE63A] p-6 shadow-md md:p-8">
                  {/* Watermark quotes */}
                  <Quote className="pointer-events-none absolute -top-3 -left-2 h-28 w-28 opacity-10" />
                  <Quote className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-28 rotate-180 opacity-10" />

                  <blockquote className="text-white/95 text-sm leading-relaxed md:text-base italic mb-4">
                    {t.quote}
                  </blockquote>

                  <div className="mt-auto">
                    <div className="mb-4">
                      <StarRating rating={t.rating} />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="relative ml-4 h-14 w-14">
                        <Avatar className="h-14 w-14 ring-2 ring-white">
                          <AvatarImage src={t.image} alt={t.name} />
                          <AvatarFallback>{initials(t.name)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="ml-2 text-white text-sm font-semibold md:text-base">- {t.name}</span>
                    </div>
                  </div>

                  {/* subtle drop shadow under card to mimic screenshot */}
                  <div className="pointer-events-none absolute inset-x-6 -bottom-2 h-2 rounded-full bg-black/10 blur-[2px]" />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-2 md:-left-4" />
          <CarouselNext className="-right-2 md:-right-4" />
        </Carousel>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
