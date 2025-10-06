-- Supabase Database Setup for Vehicle Listings
-- Run this script in your Supabase SQL Editor to set up the database

-- Create the vehicle_listings table
CREATE TABLE IF NOT EXISTS public.vehicle_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Vehicle details
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2100),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    currency TEXT DEFAULT 'EUR',
    mileage INTEGER CHECK (mileage >= 0),
    mileage_unit TEXT CHECK (mileage_unit IN ('km', 'miles')),
    
    -- Vehicle description
    title TEXT NOT NULL,
    description TEXT,
    vin TEXT,
    color TEXT,
    fuel_type TEXT CHECK (fuel_type IN ('petrol', 'diesel', 'electric', 'hybrid', 'other')),
    transmission TEXT CHECK (transmission IN ('manual', 'automatic')),
    body_type TEXT,
    
    -- Images
    image_url TEXT,
    images TEXT[],
    
    -- Seller information
    seller_name TEXT,
    seller_address TEXT,
    seller_phone TEXT,
    seller_email TEXT,
    
    -- Location
    location_city TEXT,
    location_country TEXT,
    location_zip TEXT,
    
    -- Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'reserved', 'inactive')),
    
    -- Additional features
    features TEXT[],
    
    -- Metadata
    views INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vehicle_listings_make ON public.vehicle_listings(make);
CREATE INDEX IF NOT EXISTS idx_vehicle_listings_model ON public.vehicle_listings(model);
CREATE INDEX IF NOT EXISTS idx_vehicle_listings_year ON public.vehicle_listings(year);
CREATE INDEX IF NOT EXISTS idx_vehicle_listings_price ON public.vehicle_listings(price);
CREATE INDEX IF NOT EXISTS idx_vehicle_listings_status ON public.vehicle_listings(status);
CREATE INDEX IF NOT EXISTS idx_vehicle_listings_created_at ON public.vehicle_listings(created_at);
CREATE INDEX IF NOT EXISTS idx_vehicle_listings_is_featured ON public.vehicle_listings(is_featured);
CREATE INDEX IF NOT EXISTS idx_vehicle_listings_location_city ON public.vehicle_listings(location_city);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_vehicle_listings_updated_at ON public.vehicle_listings;
CREATE TRIGGER update_vehicle_listings_updated_at
    BEFORE UPDATE ON public.vehicle_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a function to increment views
CREATE OR REPLACE FUNCTION increment_vehicle_views(vehicle_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.vehicle_listings
    SET views = views + 1
    WHERE id = vehicle_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security (RLS)
ALTER TABLE public.vehicle_listings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view active vehicle listings"
    ON public.vehicle_listings
    FOR SELECT
    USING (status = 'active');

-- Optional: Create policy for authenticated users to create/update listings
-- Uncomment if you want authenticated users to manage listings
-- CREATE POLICY "Authenticated users can insert vehicle listings"
--     ON public.vehicle_listings
--     FOR INSERT
--     TO authenticated
--     WITH CHECK (true);

-- CREATE POLICY "Authenticated users can update their own vehicle listings"
--     ON public.vehicle_listings
--     FOR UPDATE
--     TO authenticated
--     USING (true);

-- Insert sample data (optional - remove or modify as needed)
INSERT INTO public.vehicle_listings 
    (make, model, year, price, currency, mileage, mileage_unit, title, description, 
     fuel_type, transmission, body_type, image_url, seller_name, location_city, 
     location_country, status, features, is_featured)
VALUES 
    ('BMW', '3 Series', 2022, 45000, 'EUR', 15000, 'km', 
     'BMW 3 Series 320d Sport', 
     'Excellent condition BMW 3 Series with full service history. Features include leather seats, navigation system, and parking sensors.',
     'diesel', 'automatic', 'Sedan',
     'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
     'Premium Motors', 'Munich', 'Germany', 'active',
     ARRAY['Leather Seats', 'Navigation', 'Parking Sensors', 'Bluetooth'],
     true),
    
    ('Mercedes-Benz', 'C-Class', 2021, 42000, 'EUR', 20000, 'km',
     'Mercedes-Benz C-Class C200',
     'Beautiful Mercedes C-Class in excellent condition. Well maintained with complete service records.',
     'petrol', 'automatic', 'Sedan',
     'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
     'Luxury Auto Sales', 'Stuttgart', 'Germany', 'active',
     ARRAY['Sunroof', 'Climate Control', 'LED Headlights'],
     true),
    
    ('Audi', 'A4', 2020, 38000, 'EUR', 25000, 'km',
     'Audi A4 2.0 TDI Quattro',
     'Sporty Audi A4 with quattro all-wheel drive. Perfect condition inside and out.',
     'diesel', 'automatic', 'Sedan',
     'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800&h=600&fit=crop',
     'Auto World', 'Berlin', 'Germany', 'active',
     ARRAY['All-Wheel Drive', 'Heated Seats', 'Apple CarPlay'],
     false),
    
    ('Volkswagen', 'Golf', 2023, 28000, 'EUR', 5000, 'km',
     'Volkswagen Golf GTI',
     'Nearly new VW Golf GTI with all the latest features. Still under warranty.',
     'petrol', 'manual', 'Hatchback',
     'https://images.unsplash.com/photo-1622353219448-46a00b7d6c84?w=800&h=600&fit=crop',
     'City Motors', 'Hamburg', 'Germany', 'active',
     ARRAY['Sport Package', 'Digital Cockpit', 'Adaptive Cruise Control'],
     false),
    
    ('Tesla', 'Model 3', 2022, 52000, 'EUR', 10000, 'km',
     'Tesla Model 3 Long Range',
     'Electric sedan with long range capability. Autopilot included.',
     'electric', 'automatic', 'Sedan',
     'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
     'EV Motors', 'Frankfurt', 'Germany', 'active',
     ARRAY['Autopilot', 'Premium Sound', 'Glass Roof'],
     true);

-- Create a view for active listings (optional)
CREATE OR REPLACE VIEW public.active_vehicle_listings AS
SELECT * FROM public.vehicle_listings
WHERE status = 'active'
ORDER BY created_at DESC;

-- Grant necessary permissions
GRANT SELECT ON public.vehicle_listings TO anon, authenticated;
GRANT ALL ON public.vehicle_listings TO authenticated;
GRANT EXECUTE ON FUNCTION increment_vehicle_views TO anon, authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Vehicle listings database setup completed successfully!';
    RAISE NOTICE 'Sample data has been inserted. You can now use the VehicleListingsGrid component.';
END $$;

