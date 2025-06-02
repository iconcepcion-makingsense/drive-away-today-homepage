
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCarCategories } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const { data: carCategories = [], isLoading, error } = useCarCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categoryImages = {
    'economy': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
    'luxury': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70', 
    'suv': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b',
    'electric': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89'
  };

  const handleExploreCategory = (categoryId: string) => {
    // Navigate to search with category filter
    navigate('/search-results', {
      state: {
        category: categoryId,
        location: 'new-york', // Default location
        startDate: new Date(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days later
      }
    });
  };

  return (
    <div id="cars-page" className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main id="cars-main" className="flex-1 container mx-auto px-4 py-12">
        <div id="cars-header" className="text-center mb-12">
          <h1 id="cars-title" className="text-4xl font-bold mb-6">Our Fleet</h1>
          <p id="cars-description" className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our selection of vehicles to find the perfect car for your next trip.
            From economical options to luxury vehicles, we have something for every need.
          </p>
        </div>

        {isLoading ? (
          <div id="cars-loading" className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Loading car categories...</span>
          </div>
        ) : error ? (
          <div id="cars-error" className="py-12 text-center">
            <h3 className="text-xl font-medium mb-2">Error loading car categories</h3>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        ) : (
          <div id="cars-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carCategories.map((category) => {
              const imageKey = category.id.toLowerCase() as keyof typeof categoryImages;
              const categoryImage = categoryImages[imageKey] || categoryImages.economy;
              
              return (
                <Card 
                  key={category.id} 
                  id={`car-category-card-${category.id}`}
                  className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <div id={`car-category-image-${category.id}`} className="h-48 bg-gray-200 relative overflow-hidden">
                    <img 
                      src={categoryImage}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 id={`car-category-name-${category.id}`} className="text-xl font-bold">{category.name}</h3>
                      <p id={`car-category-price-${category.id}`} className="text-sm">From ${category.price}/day</p>
                    </div>
                  </div>
                  <CardContent id={`car-category-content-${category.id}`} className="p-6">
                    <div id={`car-category-features-${category.id}`} className="flex flex-wrap gap-2 mb-4">
                      {category.features.map((feature, index) => (
                        <Badge 
                          key={index} 
                          id={`car-category-feature-${category.id}-${index}`}
                          variant="outline" 
                          className="bg-blue-50 text-blue-700"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      id={`car-category-explore-${category.id}`}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExploreCategory(category.id);
                      }}
                    >
                      Explore {category.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {selectedCategory && (
          <div id="category-details" className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 id="category-details-title" className="text-xl font-bold mb-2">
              {carCategories.find(c => c.id === selectedCategory)?.name} Details
            </h3>
            <p id="category-details-description" className="text-gray-600 mb-4">
              Perfect for city driving and long trips alike. This category offers excellent value and reliability.
            </p>
            <Button 
              id="category-details-book-button"
              onClick={() => handleExploreCategory(selectedCategory)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Now
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cars;
