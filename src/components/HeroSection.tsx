
import React from "react";
import SearchPanel from "./SearchPanel";

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <div id="hero-section" className={`relative w-full ${className}`}>
      {/* Hero Background */}
      <div id="hero-overlay" className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90" />
      <div id="hero-background-image" className="absolute inset-0 bg-[url('/hero-car.jpg')] bg-cover bg-center mix-blend-overlay" />
      
      {/* Content */}
      <div id="hero-content" className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-center">
        <h1 id="hero-title" className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
          Drive Away Today
        </h1>
        <p id="hero-subtitle" className="text-xl text-white text-center mb-8 max-w-2xl">
          Find and book your perfect rental car in just a few clicks
        </p>
        
        {/* Search Panel */}
        <SearchPanel className="w-full max-w-4xl" />
      </div>
    </div>
  );
};

export default HeroSection;
