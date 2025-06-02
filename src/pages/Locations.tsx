
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";
import { useLocations } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";

const Locations = () => {
  const { data: locations = [], isLoading, error } = useLocations();

  const locationDetails = [
    {
      value: "new-york",
      image: "https://images.unsplash.com/photo-1496442929976-97f336a657be",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM",
      address: "123 Broadway, New York, NY 10001"
    },
    {
      value: "los-angeles", 
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      phone: "+1 (555) 234-5678",
      hours: "Mon-Fri: 7AM-9PM, Sat-Sun: 8AM-7PM",
      address: "456 Sunset Blvd, Los Angeles, CA 90028"
    },
    {
      value: "chicago",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      phone: "+1 (555) 345-6789", 
      hours: "Mon-Fri: 8AM-7PM, Sat-Sun: 9AM-5PM",
      address: "789 Michigan Ave, Chicago, IL 60611"
    },
    {
      value: "miami",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      phone: "+1 (555) 456-7890",
      hours: "Mon-Sun: 24/7",
      address: "321 Ocean Drive, Miami, FL 33139"
    }
  ];

  return (
    <div id="locations-page" className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main id="locations-main" className="flex-1 container mx-auto px-4 py-12">
        <div id="locations-header" className="text-center mb-12">
          <h1 id="locations-title" className="text-4xl font-bold mb-6">Our Locations</h1>
          <p id="locations-description" className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find a Drive Away Today location near you. We have convenient pickup points 
            across major cities to make your car rental experience seamless.
          </p>
        </div>

        {isLoading ? (
          <div id="locations-loading" className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Loading locations...</span>
          </div>
        ) : error ? (
          <div id="locations-error" className="py-12 text-center">
            <h3 className="text-xl font-medium mb-2">Error loading locations</h3>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        ) : (
          <div id="locations-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {locations.map((location) => {
              const details = locationDetails.find(d => d.value === location.value) || locationDetails[0];
              return (
                <Card key={location.value} id={`location-card-${location.value}`} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div id={`location-image-${location.value}`} className="h-48 bg-gray-200 relative overflow-hidden">
                    <img 
                      src={details.image}
                      alt={location.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 id={`location-name-${location.value}`} className="text-xl font-bold">{location.label}</h3>
                    </div>
                  </div>
                  <CardContent id={`location-content-${location.value}`} className="p-6">
                    <div id={`location-address-${location.value}`} className="flex items-start mb-4">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{details.address}</span>
                    </div>
                    <div id={`location-phone-${location.value}`} className="flex items-center mb-4">
                      <Phone className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{details.phone}</span>
                    </div>
                    <div id={`location-hours-${location.value}`} className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{details.hours}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Locations;
