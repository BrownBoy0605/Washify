"use client";

import { useState } from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import PackagesSection from "./PackagesSection";
import WhyChooseUs from "./why-choose-us";
import TestimonialsSection from "./testimonials-section";
import FooterSection from "./footer";
import LoadingScreen from "./loading-screen";

export default function HomeContent() {
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleVideoReady = () => {
    setIsVideoReady(true);
  };

  return (
    <>
      <LoadingScreen isVisible={!isVideoReady} />
      <Navbar />
      <Hero
        city="Jaipur"
        slides={[
          { src: "/videos/car.mp4", alt: "Blue sports car" },
          { src: "/hero/skyline-car-2.jpg", alt: "City backdrop car" },
        ]}
        onVideoReady={handleVideoReady}
      />
      <PackagesSection
        backgroundImageUrl="/photos/horizontalBackground.png"
        ctaHref="/booking"
      />
      <WhyChooseUs
        imageSrc="/photos/carWasher.jpg"
        brand="WASHIFY"
        title="WHY CHOOSE US"
        description="WASHIFY provides professional car cleaning services at your doorstep whenever you want, so you can spend your time doing the things you love."
        metrics={[
          { label: "QUALITY SERVICES", value: 90 },
          { label: "EXPERIENCED TECHNICIANS", value: 85 },
          { label: "CUSTOMER SATISFACTION", value: 95 },
        ]}
      />
      <TestimonialsSection />
      <FooterSection />
    </>
  );
}
