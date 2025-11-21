import Image from "next/image";
import { SimpleCard } from "./components/simple-card";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import PackagesSection from "./components/PackagesSection";
import WhyChooseUs from "./components/why-choose-us";
import TestimonialsSection from "./components/testimonials-section";
import FooterSection from "./components/footer";
import HomeContent from "./components/home-content";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full max-w-full dark">
      <HomeContent />
    </div>
  );
}
