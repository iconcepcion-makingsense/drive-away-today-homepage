
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from '@/services/searchService';
import { useNavigate } from 'react-router-dom';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/car/${car.id}`);
  };

  // Fallback image based on category
  const getFallbackImage = (categoryName: string) => {
    const categoryMap: { [key: string]: string } = {
      'economy': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      'luxury': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
      'suv': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop',
      'electric': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    };
    
    const category = categoryName.toLowerCase();
    return categoryMap[category] || categoryMap['economy'];
  };

  const imageUrl = car.image_url || getFallbackImage(car.category_name);

  return (
    <Card id={`car-card-${car.id}`} className="overflow-hidden h-full flex flex-col">
      <div id={`car-card-image-container-${car.id}`} className="relative h-48 overflow-hidden">
        <img 
          id={`car-card-image-${car.id}`}
          src={imageUrl} 
          alt={car.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getFallbackImage(car.category_name);
          }}
        />
        <div id={`car-card-price-badge-${car.id}`} className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded">
          ${car.daily_rate}/day
        </div>
      </div>
      <CardContent id={`car-card-content-${car.id}`} className="flex-grow p-4">
        <div id={`car-card-header-${car.id}`} className="flex items-center justify-between mb-2">
          <h3 id={`car-card-title-${car.id}`} className="text-lg font-bold">{car.title}</h3>
          <span id={`car-card-category-${car.id}`} className="text-sm bg-gray-200 px-2 py-1 rounded">
            {car.category_name}
          </span>
        </div>
        <p id={`car-card-location-${car.id}`} className="text-gray-500 text-sm mb-2">
          {car.location_name}
        </p>
        <p id={`car-card-description-${car.id}`} className="text-sm text-gray-600 line-clamp-2">
          {car.description}
        </p>
      </CardContent>
      <CardFooter id={`car-card-footer-${car.id}`} className="p-4 pt-0">
        <Button 
          id={`car-card-view-details-${car.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700" 
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
