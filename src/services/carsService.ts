
import { supabase } from "@/integrations/supabase/client";

export interface CarCategory {
  id: string;
  name: string;
  image: string;
  price: string | number;
  features: string[];
}

export const getCarCategories = async (): Promise<CarCategory[]> => {
  try {
    // First, get all car categories
    const { data: categories, error: categoriesError } = await supabase
      .from('car_categories')
      .select('id, name, image, price');

    if (categoriesError) {
      console.error('Error fetching car categories:', categoriesError);
      throw categoriesError;
    }

    if (!categories) return [];

    // Then, for each category, get its features
    const result = await Promise.all(
      categories.map(async (category) => {
        const { data: features, error: featuresError } = await supabase
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
    console.error('Failed to fetch car categories:', error);
    throw error;
  }
};

