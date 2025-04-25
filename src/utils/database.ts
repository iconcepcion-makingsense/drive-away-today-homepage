
import mysql from 'mysql2/promise';
import databaseConfig from '@/config/database';

// Global configuration flag to determine data source
let useDatabase = false;

export const setUseDatabase = (value: boolean) => {
  useDatabase = value;
};

export const getUseDatabase = () => {
  return useDatabase;
};

// Create a connection pool
export const pool = mysql.createPool({
  host: databaseConfig.host,
  port: databaseConfig.port,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection function
export const testConnection = async (): Promise<boolean> => {
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
  try {
    const [rows] = await pool.query(sql, params);
    return rows as T[];
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};
