
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { Car, searchAvailableCars } from "@/services/searchService";
import CarCard from "@/components/CarCard";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

const SearchResults = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const searchParams = location.state as { 
    location: string;
    startDate: Date;
    endDate: Date;
  } | null;

  useEffect(() => {
    async function fetchResults() {
      if (!searchParams) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const formattedStartDate = new Date(searchParams.startDate);
        const formattedEndDate = new Date(searchParams.endDate);
        
        const results = await searchAvailableCars({
          location: searchParams.location,
          startDate: formattedStartDate,
          endDate: formattedEndDate
        });
        
        setCars(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [searchParams]);

  const renderSearchSummary = () => {
    if (!searchParams) return null;

    const startDateFormatted = format(new Date(searchParams.startDate), "MMM d, yyyy");
    const endDateFormatted = format(new Date(searchParams.endDate), "MMM d, yyyy");

    return (
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Search Results</h2>
        <div className="text-gray-600">
          <p>
            Location: <span className="font-medium">{searchParams.location}</span>
          </p>
          <p>
            Dates: <span className="font-medium">{startDateFormatted} - {endDateFormatted}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderSearchSummary()}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Searching for available cars...</span>
          </div>
        ) : cars.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="text-xl font-medium mb-2">No cars available</h3>
            <p className="text-gray-600">
              Try different dates or location for more options
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
