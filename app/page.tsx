import Image from "next/image";
import { SimpleCard } from "./components/simple-card";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import PackagesSection from "./components/PackagesSection";
import WhyChooseUs from "./components/why-choose-us";
import TestimonialsSection from "./components/testimonials-section";
import FooterSection from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark">
      <Navbar />
       <Hero
        city="Jaipur"
        slides={[
          { src: "/videos/car.mp4", alt: "Blue sports car" },
          { src: "/hero/skyline-car-2.jpg", alt: "City backdrop car" },
        ]}
      />
      <PackagesSection
        backgroundImageUrl="/photos/horizontalBackground.png" // optional
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
      {/* <SimpleCard /> */}
    </div>
  );
}
