
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCarCategories } from "@/hooks/useApi";

interface FeaturedCarsProps {
  className?: string;
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({ className }) => {
  const { data: carCategories = [], isLoading, error } = useCarCategories();

  if (isLoading) {
    return (
      <div className={`container mx-auto px-4 py-12 ${className}`}>
        <h2 className="text-3xl font-bold text-center mb-2">Featured Car Categories</h2>
        <p className="text-gray-600 text-center mb-10">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`container mx-auto px-4 py-12 ${className}`}>
        <h2 className="text-3xl font-bold text-center mb-2">Featured Car Categories</h2>
        <p className="text-red-500 text-center mb-10">Failed to load car categories</p>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-12 ${className}`}>
      <h2 className="text-3xl font-bold text-center mb-2">Featured Car Categories</h2>
      <p className="text-gray-600 text-center mb-10">Find the perfect vehicle for your needs</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {carCategories.map((car) => (
          <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p className="text-sm">From ${car.price}/day</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2 mt-2">
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
