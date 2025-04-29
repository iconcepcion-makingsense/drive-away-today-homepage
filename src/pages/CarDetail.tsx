
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Car, getCarById } from "@/services/searchService";
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

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    async function fetchCarDetail() {
      if (!id) return;

      try {
        setLoading(true);
        const carData = await getCarById(id);
        setCar(carData);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCarDetail();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Loading car details...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Car Not Found</h2>
          <p className="mb-6">Sorry, the car you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to search results
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={car.image_url} 
              alt={car.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold">{car.title}</h1>
              <span className="text-lg font-bold text-blue-600">${car.daily_rate}/day</span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <span className="bg-gray-200 px-3 py-1 rounded-full mr-2">{car.category_name}</span>
              <span>{car.location_name}</span>
            </div>

            <div className="prose max-w-none mb-6">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{car.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['Bluetooth', 'Air Conditioning', 'GPS Navigation', 'Automatic'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <div className="py-4">Conversion registered</div>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarDetail;
