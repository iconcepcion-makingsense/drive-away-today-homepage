
import { locationsApi, type Location } from "./locationsApi";

export type { Location };
export const getLocations = () => locationsApi.getLocations();
