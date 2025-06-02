
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, Check, ArrowLeft } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { pushEvent } from "@/utils/gtm";
import { useCarById } from "@/hooks/useApi";
import { useState } from "react";

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const { data: car, isLoading, error } = useCarById(id as string);

  const handleBookNow = () => {
    if (car) {
      pushEvent('car_booking', {
        car_id: car.id,
        car_title: car.title,
        car_category: car.category_name,
        price: car.daily_rate
      });
    }
    
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Fallback image based on category
  const getFallbackImage = (categoryName: string) => {
    const categoryMap: { [key: string]: string } = {
      'economy': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
      'luxury': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
      'suv': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop',
      'electric': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
    };
    
    const category = categoryName.toLowerCase();
    return categoryMap[category] || categoryMap['economy'];
  };

  if (isLoading) {
    return (
      <div id="car-detail-page" className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div id="car-detail-loading" className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Loading car details...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div id="car-detail-page" className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div id="car-detail-error" className="flex-1 container mx-auto px-4 py-12 text-center">
          <h2 id="car-detail-error-title" className="text-2xl font-bold mb-4">Car Not Found</h2>
          <p id="car-detail-error-message" className="mb-6">Sorry, the car you're looking for doesn't exist or has been removed.</p>
          <Button id="car-detail-back-button-error" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const imageUrl = car.image_url || getFallbackImage(car.category_name);

  return (
    <div id="car-detail-page" className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main id="car-detail-main" className="flex-1 container mx-auto px-4 py-8">
        <div id="car-detail-navigation" className="mb-4">
          <Button id="car-detail-back-button" variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to search results
          </Button>
        </div>

        <div id="car-detail-content" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="car-detail-image-container" className="rounded-lg overflow-hidden shadow-lg">
            <img 
              id="car-detail-image"
              src={imageUrl} 
              alt={car.title} 
              className="w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImage(car.category_name);
              }}
            />
          </div>

          <div id="car-detail-info">
            <div id="car-detail-header" className="flex items-start justify-between mb-2">
              <h1 id="car-detail-title" className="text-3xl font-bold">{car.title}</h1>
              <span id="car-detail-price" className="text-lg font-bold text-blue-600">${car.daily_rate}/day</span>
            </div>
            
            <div id="car-detail-meta" className="flex items-center text-gray-600 mb-4">
              <span id="car-detail-category" className="bg-gray-200 px-3 py-1 rounded-full mr-2">{car.category_name}</span>
              <span id="car-detail-location">{car.location_name}</span>
            </div>

            <div id="car-detail-description-section" className="prose max-w-none mb-6">
              <h3 id="car-detail-description-title" className="text-xl font-semibold mb-2">Description</h3>
              <p id="car-detail-description" className="text-gray-700">{car.description}</p>
            </div>

            <div id="car-detail-features-section" className="mb-6">
              <h3 id="car-detail-features-title" className="text-xl font-semibold mb-2">Features</h3>
              <ul id="car-detail-features-list" className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['Bluetooth', 'Air Conditioning', 'GPS Navigation', 'Automatic'].map((feature, index) => (
                  <li key={feature} id={`car-detail-feature-${index}`} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              id="car-detail-book-now-button"
              className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg" 
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      
      <Dialog open={showDialog} onOpenChange={handleDialogClose}>
        <DialogContent id="car-detail-success-dialog">
          <DialogHeader>
            <DialogTitle id="car-detail-success-title">Success</DialogTitle>
          </DialogHeader>
          <div id="car-detail-success-message" className="py-4">Conversion registered</div>
          <DialogFooter>
            <Button id="car-detail-success-accept" onClick={handleDialogClose}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarDetail;
