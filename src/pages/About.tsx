
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-600">
          Learn more about Drive Away Today and our mission to provide exceptional car rental services.
          This page is currently under construction.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
