
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have questions or need assistance? Get in touch with our team.
          This page is currently under construction.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
