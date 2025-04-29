
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCars from "@/components/FeaturedCars";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import { useGrowthBook } from "@/contexts/GrowthBookContext";
import { experiments } from "@/contexts/GrowthBookContext";

const Index = () => {
  const { ready, growthbook } = useGrowthBook();
  
  // Check if we're using the placeholder client key
  const isUsingPlaceholder = !growthbook.getClientKey() || growthbook.getClientKey() === "sdk-UJg9fpEtmfOWmn";

  // Get active experiment values
  const activeExperiments = experiments.map(exp => ({
    id: exp.id,
    value: growthbook.getFeatureValue(exp.id, exp.defaultValue)
  }));

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
        <div className="fixed bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${ready ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            GrowthBook: {ready ? (isUsingPlaceholder ? "Local Mode" : "✓ Connected") : "⏳ Loading"}
          </div>
          
          {/* Show active experiments */}
          {activeExperiments.length > 0 && (
            <div className="border-t border-gray-600 mt-1 pt-1 text-[10px]">
              <div className="font-semibold">Active Experiments:</div>
              {activeExperiments.map(exp => (
                <div key={exp.id} className="flex justify-between">
                  <span>{exp.id}:</span>
                  <span className="font-mono">{exp.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
