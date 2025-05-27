
import ApiService from "./api";

export interface Location {
  value: string;
  label: string;
}

class LocationsApiService extends ApiService {
  async getLocations(): Promise<Location[]> {
    try {
      const { data, error } = await this.supabase
        .from('locations')
        .select('value, label');

      if (error) {
        this.handleError(error, 'getLocations');
      }

      return data || [];
    } catch (error) {
      this.handleError(error, 'getLocations');
      return [];
    }
  }
}

export const locationsApi = new LocationsApiService();
