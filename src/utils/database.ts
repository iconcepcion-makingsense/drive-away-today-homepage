
import databaseConfig, { useDatabaseStore } from '@/config/database';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Only create a pool if we're not in a browser
let pool: any = null;

// Only import mysql2 if we're not in a browser
if (!isBrowser) {
  try {
    const mysql = require('mysql2/promise');
    
    // Create a connection pool
    pool = mysql.createPool({
      host: databaseConfig.host,
      port: databaseConfig.port,
      user: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  } catch (error) {
    console.error('Failed to initialize MySQL connection:', error);
  }
}

// Test connection function
export const testConnection = async (): Promise<boolean> => {
  const { useDatabase } = useDatabaseStore.getState();
  
  if (!useDatabase || isBrowser) {
    console.log('Database connections are not enabled or running in browser environment');
    return false;
  }
  
  if (!pool) {
    console.error('MySQL pool not initialized');
    return false;
  }
  
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Generic query function
export const query = async <T>(sql: string, params?: any[]): Promise<T[]> => {
  const { useDatabase } = useDatabaseStore.getState();
  
  if (!useDatabase || isBrowser || !pool) {
    console.log('Database queries are not enabled or running in browser environment');
    throw new Error('Database connection not available');
  }
  
  try {
    const [rows] = await pool.query(sql, params);
    return rows as T[];
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

// Export the store hook for components to use
export { useDatabaseStore };
