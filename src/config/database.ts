
export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const databaseConfig: DatabaseConfig = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  port: Number(import.meta.env.VITE_DB_PORT) || 3306,
  user: import.meta.env.VITE_DB_USER || 'root',
  password: import.meta.env.VITE_DB_PASSWORD || '',
  database: import.meta.env.VITE_DB_NAME || 'car_rental',
};

export default databaseConfig;

// Add DatabaseToggle component export
export { default as DatabaseToggle } from '../components/DatabaseToggle';
