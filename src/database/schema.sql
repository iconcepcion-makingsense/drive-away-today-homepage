
-- Create the car_rental database
CREATE DATABASE IF NOT EXISTS car_rental;
USE car_rental;

-- Create the locations table
CREATE TABLE IF NOT EXISTS locations (
  id VARCHAR(36) PRIMARY KEY,
  value VARCHAR(255) NOT NULL UNIQUE,
  label VARCHAR(255) NOT NULL
);

-- Create the car_categories table
CREATE TABLE IF NOT EXISTS car_categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the car_features table
CREATE TABLE IF NOT EXISTS car_features (
  id VARCHAR(36) PRIMARY KEY,
  car_category_id VARCHAR(36) NOT NULL,
  feature VARCHAR(255) NOT NULL,
  FOREIGN KEY (car_category_id) REFERENCES car_categories(id) ON DELETE CASCADE,
  UNIQUE KEY unique_feature_per_car (car_category_id, feature)
);

-- Insert sample location data
INSERT INTO locations (id, value, label) VALUES 
  (UUID(), 'new-york', 'New York City'),
  (UUID(), 'los-angeles', 'Los Angeles'),
  (UUID(), 'chicago', 'Chicago'),
  (UUID(), 'miami', 'Miami'),
  (UUID(), 'san-francisco', 'San Francisco'),
  (UUID(), 'las-vegas', 'Las Vegas');

-- Insert sample car category data
INSERT INTO car_categories (id, name, image, price) VALUES 
  ('economy', 'Economy', '/car-economy.jpg', 29),
  ('suv', 'SUV', '/car-suv.jpg', 59),
  ('luxury', 'Luxury', '/car-luxury.jpg', 99),
  ('electric', 'Electric', '/car-electric.jpg', 49);

-- Insert sample car features data
INSERT INTO car_features (id, car_category_id, feature) VALUES 
  (UUID(), 'economy', 'Fuel Efficient'),
  (UUID(), 'economy', 'Budget Friendly'),
  (UUID(), 'economy', 'Compact'),
  (UUID(), 'suv', 'Spacious'),
  (UUID(), 'suv', 'All-terrain'),
  (UUID(), 'suv', 'Family Friendly'),
  (UUID(), 'luxury', 'Premium Experience'),
  (UUID(), 'luxury', 'High Performance'),
  (UUID(), 'luxury', 'Advanced Features'),
  (UUID(), 'electric', 'Zero Emissions'),
  (UUID(), 'electric', 'Modern Technology'),
  (UUID(), 'electric', 'Cost Effective');
