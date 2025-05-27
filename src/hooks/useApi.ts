
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { locationsApi } from '@/services/locationsApi';
import { carsApi, type SearchParams } from '@/services/carsApi';

// Custom hooks for API calls with React Query
export const useLocations = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () => locationsApi.getLocations(),
    ...options
  });
};

export const useCarCategories = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['car-categories'],
    queryFn: () => carsApi.getCarCategories(),
    ...options
  });
};

export const useSearchCars = (params: SearchParams, enabled: boolean = true, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['search-cars', params],
    queryFn: () => carsApi.searchAvailableCars(params),
    enabled,
    ...options
  });
};

export const useCarById = (carId: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['car', carId],
    queryFn: () => carsApi.getCarById(carId),
    enabled: !!carId,
    ...options
  });
};
