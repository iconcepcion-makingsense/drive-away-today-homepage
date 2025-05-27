
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import CarCard from "@/components/CarCard";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSearchCars } from "@/hooks/useApi";
import type { SearchParams } from "@/services/carsApi";

const SearchResults = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  
  const urlSearchParams = location.state as { 
    location: string;
    startDate: Date;
    endDate: Date;
  } | null;

  useEffect(() => {
    if (urlSearchParams) {
      setSearchParams({
        location: urlSearchParams.location,
        startDate: new Date(urlSearchParams.startDate),
        endDate: new Date(urlSearchParams.endDate)
      });
    }
  }, [urlSearchParams]);

  const { data: cars = [], isLoading, error } = useSearchCars(
    searchParams as SearchParams, 
    !!searchParams
  );

  const renderSearchSummary = () => {
    if (!searchParams) return null;

    const startDateFormatted = format(searchParams.startDate, "MMM d, yyyy");
    const endDateFormatted = format(searchParams.endDate, "MMM d, yyyy");

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

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Searching for available cars...</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <h3 className="text-xl font-medium mb-2">Error loading cars</h3>
            <p className="text-gray-600">
              There was an error loading the search results. Please try again.
            </p>
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
