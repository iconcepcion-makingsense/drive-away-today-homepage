
import { carsApi, type CarCategory } from "./carsApi";

export type { CarCategory };
export const getCarCategories = () => carsApi.getCarCategories();
