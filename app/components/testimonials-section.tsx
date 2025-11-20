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
      "Exceptional attention to detail — my car looked like it just rolled off the showroom floor. The team was punctual and professional.",
    name: "Rohit Kapoor",
    image: "/photos/user-rahul.jpg",
    rating: 5,
  },
  {
    quote:
      "Great value and flawless finish. They went above and beyond to treat minor paint blemishes — highly recommended.",
    name: "Rohini Malik",
    image: "/photos/user-geeta.jpg",
    rating: 5,
  },
  {
    quote:
      "Smooth booking, fast turnaround, and the interior smelled brand new. Lovely service — will use Washify again.",
    name: "Priya Nair",
    image: "/photos/user-aman.jpg",
    rating: 5,
  },
];

interface Props {
  items?: Testimonial[];
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 transition-colors ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
      <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">{rating}.0</span>
    </div>
  );
}

export default function TestimonialsCarousel({ items = DATA, className }: Props) {
  return (
    <section className={"relative py-14 max-w-full " + (className ?? "")}>
      <div className="container mx-auto px-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#E81E25]">Reviews</p>
        <h2 className="mb-8 text-3xl font-extrabold md:text-4xl">What our clients say</h2>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[
            Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true }),
          ]}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {items.map((t, idx) => (
              <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="relative overflow-visible border-0 bg-white/90 dark:bg-gray-900/80 p-6 shadow-lg rounded-xl md:p-8">
                  {/* subtle decorative quotes */}
                  <Quote className="pointer-events-none absolute -top-3 -left-3 h-20 w-20 opacity-6 text-gray-400 dark:text-white/10" />
                  <Quote className="pointer-events-none absolute -bottom-6 -right-4 h-20 w-20 rotate-180 opacity-6 text-gray-400 dark:text-white/10" />

                  <blockquote className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed md:text-base mb-5">
                    {t.quote}
                  </blockquote>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <StarRating rating={t.rating} />
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 ring-1 ring-gray-200 dark:ring-gray-700">
                        <AvatarImage src={t.image} alt={t.name} />
                        <AvatarFallback>{initials(t.name)}</AvatarFallback>
                      </Avatar>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100"> {t.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Verified client</div>
                      </div>
                    </div>
                  </div>

                  {/* subtle shadow / grounding */}
                  <div className="pointer-events-none absolute inset-x-6 -bottom-2 h-2 rounded-full bg-black/6 dark:bg-white/6 blur-[3px]" />
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
