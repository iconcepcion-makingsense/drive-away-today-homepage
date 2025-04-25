
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCars from "@/components/FeaturedCars";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import { useGrowthBook } from "@/contexts/GrowthBookContext";
import { DatabaseToggle } from "@/config/database";

const Index = () => {
  const { ready, growthbook } = useGrowthBook();
  
  // Check if we're using the placeholder client key
  const isUsingPlaceholder = !growthbook.getClientKey() || growthbook.getClientKey() === "sdk-UJg9fpEtmfOWmn";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCars />
        <BenefitsSection />
        
        <div className="container mx-auto px-4 mb-8">
          <DatabaseToggle className="max-w-md mx-auto" />
        </div>
      </main>
      <Footer />
      
      {/* Add a discreet indicator showing GrowthBook status in development */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${ready ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          GrowthBook: {ready ? (isUsingPlaceholder ? "Local Mode" : "✓ Connected") : "⏳ Loading"}
        </div>
      )}
    </div>
  );
};

export default Index;
