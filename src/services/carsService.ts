
import { getUseDatabase, query } from '@/utils/database';

export interface CarCategory {
  id: string;
  name: string;
  image: string;
  price: string | number;
  features: string[];
}

// Local data for fallback
const localCarCategories: CarCategory[] = [
  {
    id: "economy",
    name: "Economy",
    image: "/car-economy.jpg",
    price: "29",
    features: ["Fuel Efficient", "Budget Friendly", "Compact"],
  },
  {
    id: "suv",
    name: "SUV",
    image: "/car-suv.jpg",
    price: "59",
    features: ["Spacious", "All-terrain", "Family Friendly"],
  },
  {
    id: "luxury",
    name: "Luxury",
    image: "/car-luxury.jpg",
    price: "99",
    features: ["Premium Experience", "High Performance", "Advanced Features"],
  },
  {
    id: "electric",
    name: "Electric",
    image: "/car-electric.jpg",
    price: "49",
    features: ["Zero Emissions", "Modern Technology", "Cost Effective"],
  },
];

export const getCarCategories = async (): Promise<CarCategory[]> => {
  if (!getUseDatabase()) {
    return localCarCategories;
  }

  try {
    // Get all car categories
    const categories = await query<{ id: string; name: string; image: string; price: number }>(
      'SELECT id, name, image, price FROM car_categories'
    );
    
    // For each category, get its features
    const result: CarCategory[] = [];
    
    for (const category of categories) {
      const features = await query<{ feature: string }>(
        'SELECT feature FROM car_features WHERE car_category_id = ?',
        [category.id]
      );
      
      result.push({
        ...category,
        price: category.price.toString(), // Convert to string to match existing format
        features: features.map(f => f.feature)
      });
    }
    
    return result;
  } catch (error) {
    console.error('Failed to fetch car categories from database:', error);
    return localCarCategories; // Fallback to local data
  }
};
