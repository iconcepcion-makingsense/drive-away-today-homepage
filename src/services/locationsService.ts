
import { supabase } from "@/integrations/supabase/client";

export interface Location {
  value: string;
  label: string;
}

export const getLocations = async (): Promise<Location[]> => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('value, label');

    if (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    throw error;
  }
};

