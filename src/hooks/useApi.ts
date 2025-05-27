
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { locationsApi, type Location } from '@/services/locationsApi';
import { carsApi, type SearchParams, type Car, type CarCategory } from '@/services/carsApi';

// Custom hooks for API calls with React Query
export const useLocations = (options?: Omit<UseQueryOptions<Location[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () => locationsApi.getLocations(),
    ...options
  });
};

export const useCarCategories = (options?: Omit<UseQueryOptions<CarCategory[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['car-categories'],
    queryFn: () => carsApi.getCarCategories(),
    ...options
  });
};

export const useSearchCars = (params: SearchParams, enabled: boolean = true, options?: Omit<UseQueryOptions<Car[]>, 'queryKey' | 'queryFn' | 'enabled'>) => {
  return useQuery({
    queryKey: ['search-cars', params],
    queryFn: () => carsApi.searchAvailableCars(params),
    enabled,
    ...options
  });
};

export const useCarById = (carId: string, options?: Omit<UseQueryOptions<Car | null>, 'queryKey' | 'queryFn' | 'enabled'>) => {
  return useQuery({
    queryKey: ['car', carId],
    queryFn: () => carsApi.getCarById(carId),
    enabled: !!carId,
    ...options
  });
};
