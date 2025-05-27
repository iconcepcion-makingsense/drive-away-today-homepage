
import { carsApi, type Car, type SearchParams } from "./carsApi";

export type { SearchParams, Car };
export const searchAvailableCars = (params: SearchParams) => carsApi.searchAvailableCars(params);
export const getCarById = (carId: string) => carsApi.getCarById(carId);
