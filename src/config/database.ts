
import { create } from 'zustand';

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface DatabaseStore {
  useDatabase: boolean;
  setUseDatabase: (value: boolean) => void;
}

// Create a store for managing database toggle state
export const useDatabaseStore = create<DatabaseStore>((set) => ({
  useDatabase: false,
  setUseDatabase: (value: boolean) => set({ useDatabase: value }),
}));

// Default database configuration
const databaseConfig: DatabaseConfig = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  port: Number(import.meta.env.VITE_DB_PORT) || 3306,
  user: import.meta.env.VITE_DB_USER || 'root',
  password: import.meta.env.VITE_DB_PASSWORD || '',
  database: import.meta.env.VITE_DB_NAME || 'car_rental',
};

export default databaseConfig;
