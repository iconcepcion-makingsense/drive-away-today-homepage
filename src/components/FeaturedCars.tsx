
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCarCategories } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface FeaturedCarsProps {
  className?: string;
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({ className }) => {
  const { data: carCategories = [], isLoading, error } = useCarCategories();
  const navigate = useNavigate();

  const categoryImages = {
    'economy': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
    'luxury': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70', 
    'suv': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b',
    'electric': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89'
  };

  const handleExploreCategory = (categoryId: string) => {
    navigate('/search-results', {
      state: {
        category: categoryId,
        location: 'new-york',
        startDate: new Date(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    });
  };

  if (isLoading) {
    return (
      <div id="featured-cars-section" className={`container mx-auto px-4 py-12 ${className}`}>
        <h2 id="featured-cars-title" className="text-3xl font-bold text-center mb-2">Featured Car Categories</h2>
        <div id="featured-cars-loading" className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Loading car categories...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="featured-cars-section" className={`container mx-auto px-4 py-12 ${className}`}>
        <h2 id="featured-cars-title" className="text-3xl font-bold text-center mb-2">Featured Car Categories</h2>
        <p id="featured-cars-error" className="text-red-500 text-center mb-10">Failed to load car categories</p>
      </div>
    );
  }

  return (
    <div id="featured-cars-section" className={`container mx-auto px-4 py-12 ${className}`}>
      <h2 id="featured-cars-title" className="text-3xl font-bold text-center mb-2">Featured Car Categories</h2>
      <p id="featured-cars-description" className="text-gray-600 text-center mb-10">Find the perfect vehicle for your needs</p>
      
      <div id="featured-cars-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {carCategories.map((car) => {
          const imageKey = car.id.toLowerCase() as keyof typeof categoryImages;
          const categoryImage = categoryImages[imageKey] || categoryImages.economy;
          
          return (
            <Card 
              key={car.id} 
              id={`featured-car-${car.id}`}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div id={`featured-car-image-${car.id}`} className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={categoryImage}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 id={`featured-car-name-${car.id}`} className="text-xl font-bold">{car.name}</h3>
                  <p id={`featured-car-price-${car.id}`} className="text-sm">From ${car.price}/day</p>
                </div>
              </div>
              <CardContent id={`featured-car-content-${car.id}`} className="p-4">
                <div id={`featured-car-features-${car.id}`} className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature, index) => (
                    <Badge 
                      key={index} 
                      id={`featured-car-feature-${car.id}-${index}`}
                      variant="outline" 
                      className="bg-blue-50 text-blue-700"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button 
                  id={`featured-car-explore-${car.id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleExploreCategory(car.id)}
                >
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCars;
