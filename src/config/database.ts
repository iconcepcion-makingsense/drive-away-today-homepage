
export interface DatabaseConfig {
  host: 'test-driveawaytoday-test-driveawaytoday.l.aivencloud.com';
  port: 18287;
  user: 'avnadmin';
  password: 'AVNS_LOoEtbTCLsPIDNydWmW';
  database: 'car_rental';
  
}

// Default database configuration
const databaseConfig: DatabaseConfig = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  port: import.meta.env.VITE_DB_PORT || 3306,
  user: import.meta.env.VITE_DB_USER || 'root',
  password: import.meta.env.VITE_DB_PASSWORD || '',
  database: import.meta.env.VITE_DB_NAME || 'car_rental',
};

export default databaseConfig;
