
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

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image_url} 
          alt={car.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded">
          ${car.daily_rate}/day
        </div>
      </div>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">{car.title}</h3>
          <span className="text-sm bg-gray-200 px-2 py-1 rounded">
            {car.category_name}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-2">
          {car.location_name}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {car.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
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
