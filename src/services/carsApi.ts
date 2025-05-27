
import ApiService from "./api";

export interface CarCategory {
  id: string;
  name: string;
  image: string;
  price: string | number;
  features: string[];
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

export interface SearchParams {
  location: string;
  startDate: Date;
  endDate: Date;
}

class CarsApiService extends ApiService {
  async getCarCategories(): Promise<CarCategory[]> {
    try {
      // Get all car categories
      const { data: categories, error: categoriesError } = await this.supabase
        .from('car_categories')
        .select('id, name, image, price');

      if (categoriesError) {
        this.handleError(categoriesError, 'getCarCategories');
      }

      if (!categories) return [];

      // Get features for each category
      const result = await Promise.all(
        categories.map(async (category) => {
          const { data: features, error: featuresError } = await this.supabase
            .from('car_features')
            .select('feature')
            .eq('car_category_id', category.id);

          if (featuresError) {
            console.error('Error fetching features for category:', category.id, featuresError);
            return {
              ...category,
              price: category.price.toString(),
              features: []
            };
          }

          return {
            ...category,
            price: category.price.toString(),
            features: features?.map(f => f.feature) || []
          };
        })
      );

      return result;
    } catch (error) {
      this.handleError(error, 'getCarCategories');
      return [];
    }
  }

  async searchAvailableCars(params: SearchParams): Promise<Car[]> {
    try {
      const { location, startDate, endDate } = params;
      
      // Format dates for the database
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      
      // Call the database function
      const { data, error } = await this.supabase.rpc(
        'search_available_cars',
        { 
          location_value: location,
          start_date: formattedStartDate,
          end_date: formattedEndDate
        }
      );

      if (error) {
        this.handleError(error, 'searchAvailableCars');
      }

      return data || [];
    } catch (error) {
      this.handleError(error, 'searchAvailableCars');
      return [];
    }
  }

  async getCarById(carId: string): Promise<Car | null> {
    try {
      const { data, error } = await this.supabase
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
      this.handleError(error, 'getCarById');
      return null;
    }
  }
}

export const carsApi = new CarsApiService();
