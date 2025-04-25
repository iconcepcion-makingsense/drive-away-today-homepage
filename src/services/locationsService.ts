
import { getUseDatabase, query } from '@/utils/database';

export interface Location {
  value: string;
  label: string;
}

// Local data
const localLocations: Location[] = [
  { value: "new-york", label: "New York City" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "miami", label: "Miami" },
  { value: "san-francisco", label: "San Francisco" },
  { value: "las-vegas", label: "Las Vegas" },
];

export const getLocations = async (): Promise<Location[]> => {
  if (getUseDatabase()) {
    try {
      return await query<Location>('SELECT value, label FROM locations');
    } catch (error) {
      console.error('Failed to fetch locations from database:', error);
      return localLocations; // Fallback to local data
    }
  } else {
    return localLocations;
  }
};
