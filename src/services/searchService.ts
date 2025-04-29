
import { supabase } from "@/integrations/supabase/client";

export interface SearchParams {
  location: string;
  startDate: Date;
  endDate: Date;
}

export interface Car {
  id: string;
  car_category_id: string;
  location_id: string;
  title: string;
  description: string;
  daily_rate: number;
  image_url: string;
  location_name: string;
  category_name: string;
}

export const searchAvailableCars = async (params: SearchParams): Promise<Car[]> => {
  try {
    const { location, startDate, endDate } = params;
    
    // Format dates for the database
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    // Call the database function we created in SQL
    const { data, error } = await supabase.rpc(
      'search_available_cars',
      { 
        location_value: location,
        start_date: formattedStartDate,
        end_date: formattedEndDate
      }
    );

    if (error) {
      console.error("Error searching for cars:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Failed to search for cars:", error);
    return [];
  }
};

export const getCarById = async (carId: string): Promise<Car | null> => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select(`
        id,
        car_category_id,
        location_id,
        title,
        description,
        daily_rate,
        image_url,
        locations(label),
        car_categories(name)
      `)
      .eq('id', carId)
      .single();

    if (error) {
      console.error("Error fetching car details:", error);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      car_category_id: data.car_category_id,
      location_id: data.location_id,
      title: data.title,
      description: data.description,
      daily_rate: data.daily_rate,
      image_url: data.image_url,
      location_name: data.locations.label,
      category_name: data.car_categories.name
    };
  } catch (error) {
    console.error("Failed to fetch car details:", error);
    return null;
  }
};
