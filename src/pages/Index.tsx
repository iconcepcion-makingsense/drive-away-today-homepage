
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCars from "@/components/FeaturedCars";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import { useGrowthBook } from "@/contexts/GrowthBookContext";

const Index = () => {
  const { ready } = useGrowthBook();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCars />
        <BenefitsSection />
      </main>
      <Footer />
      
      {/* Add a discreet indicator showing GrowthBook status in development */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md">
          GrowthBook: {ready ? "✓ Ready" : "⏳ Loading"}
        </div>
      )}
    </div>
  );
};

export default Index;
