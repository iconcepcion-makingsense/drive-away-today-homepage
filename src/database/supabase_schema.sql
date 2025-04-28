
-- Create the locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create the car_categories table
CREATE TABLE IF NOT EXISTS car_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create the car_features table
CREATE TABLE IF NOT EXISTS car_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_category_id TEXT NOT NULL REFERENCES car_categories(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  CONSTRAINT unique_feature_per_car UNIQUE (car_category_id, feature)
);

-- Enable Row Level Security
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_features ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Allow public read access to locations" 
  ON locations FOR SELECT USING (true);
  
CREATE POLICY "Allow public read access to car categories" 
  ON car_categories FOR SELECT USING (true);
  
CREATE POLICY "Allow public read access to car features" 
  ON car_features FOR SELECT USING (true);

-- Sample data for locations
INSERT INTO locations (value, label) VALUES 
  ('new-york', 'New York City'),
  ('los-angeles', 'Los Angeles'),
  ('chicago', 'Chicago'),
  ('miami', 'Miami'),
  ('san-francisco', 'San Francisco'),
  ('las-vegas', 'Las Vegas');

-- Sample data for car categories
INSERT INTO car_categories (id, name, image, price) VALUES 
  ('economy', 'Economy', '/car-economy.jpg', 29),
  ('suv', 'SUV', '/car-suv.jpg', 59),
  ('luxury', 'Luxury', '/car-luxury.jpg', 99),
  ('electric', 'Electric', '/car-electric.jpg', 49);

-- Sample data for car features
INSERT INTO car_features (car_category_id, feature) VALUES 
  ('economy', 'Fuel Efficient'),
  ('economy', 'Budget Friendly'),
  ('economy', 'Compact'),
  ('suv', 'Spacious'),
  ('suv', 'All-terrain'),
  ('suv', 'Family Friendly'),
  ('luxury', 'Premium Experience'),
  ('luxury', 'High Performance'),
  ('luxury', 'Advanced Features'),
  ('electric', 'Zero Emissions'),
  ('electric', 'Modern Technology'),
  ('electric', 'Cost Effective');
