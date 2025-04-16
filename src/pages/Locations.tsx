
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Locations = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Our Locations</h1>
        <p className="text-lg text-gray-600">
          Find a Drive Away Today location near you.
          This page is currently under construction.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Locations;
