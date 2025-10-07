import { VehicleService, type VehicleListing } from '../lib/supabase';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: string;
  images: string[];
  description: string;
  features: string[];
  specifications: {
    power: string;
    torque?: string;
    acceleration?: string;
    topSpeed?: string;
    fuelConsumption: string;
    co2Emissions: string;
    doors: number;
    seats: number;
    color: string;
    bodyType: string;
  };
  dealer?: {
    name: string;
    rating: number;
    reviewCount: number;
    location: string;
    phone: string;
    email: string;
  };
  energyLabel?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  isTopListing?: boolean;
}

/**
 * Transform Supabase VehicleListing to our demo Vehicle format
 */
function transformToVehicle(listing: VehicleListing): Vehicle {
  return {
    id: listing.id.toString(),
    make: listing.make || 'Unknown',
    model: listing.model || 'Unknown',
    year: listing.year || new Date().getFullYear(),
    price: listing.price || 0,
    mileage: listing.mileage || 0,
    fuelType: listing.fuel_type || 'Unknown',
    transmission: listing.transmission || 'Unknown',
    condition: listing.raw?.condition_type || 'Used',
    images: listing.images.map((img) => img.key),
    description: listing.description || listing.raw?.teaser || 'No description available',
    features: [], // Could be extracted from description or added separately
    specifications: {
      power: listing.horse_power || 'N/A',
      fuelConsumption: listing.raw?.consumption_combined || 'N/A',
      co2Emissions: listing.raw?.co2_emission || 'N/A',
      doors: parseInt(listing.raw?.doors || '4'),
      seats: parseInt(listing.raw?.seats || '5'),
      color: listing.color || listing.raw?.body_color_text || 'Unknown',
      bodyType: listing.body_type || 'Unknown',
    },
    energyLabel: listing.raw?.energy_label as any,
    isTopListing: false, // Could be determined by some criteria
  };
}

/**
 * Fetch all vehicles from Supabase
 */
export async function getAllVehicles(limit = 50, offset = 0): Promise<Vehicle[]> {
  const { data, error } = await VehicleService.getAll(limit, offset);
  
  if (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
  
  return (data || []).map(transformToVehicle);
}

/**
 * Get a single vehicle by ID
 */
export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const { data, error } = await VehicleService.getById(parseInt(id));
  
  if (error) {
    console.error('Error fetching vehicle:', error);
    return null;
  }
  
  return data ? transformToVehicle(data) : null;
}

/**
 * Filter vehicles with various criteria
 */
export async function filterVehicles(filters: {
  make?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string[];
  transmission?: string[];
  condition?: string[];
}, limit = 50, offset = 0): Promise<Vehicle[]> {
  // For now, fetch all and filter client-side
  // In production, you'd want to pass these filters to Supabase
  const vehicles = await getAllVehicles(limit, offset);
  
  return vehicles.filter((vehicle) => {
    if (filters.make && filters.make.length > 0 && !filters.make.includes(vehicle.make)) {
      return false;
    }
    if (filters.minPrice && vehicle.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && vehicle.price > filters.maxPrice) {
      return false;
    }
    if (filters.minYear && vehicle.year < filters.minYear) {
      return false;
    }
    if (filters.maxYear && vehicle.year > filters.maxYear) {
      return false;
    }
    if (filters.fuelType && filters.fuelType.length > 0 && !filters.fuelType.includes(vehicle.fuelType)) {
      return false;
    }
    if (filters.transmission && filters.transmission.length > 0 && !filters.transmission.includes(vehicle.transmission)) {
      return false;
    }
    if (filters.condition && filters.condition.length > 0 && !filters.condition.includes(vehicle.condition)) {
      return false;
    }
    return true;
  });
}

/**
 * Get unique makes from database
 */
export async function getAvailableMakes(): Promise<string[]> {
  const { data, error } = await VehicleService.getMakes();
  
  if (error) {
    console.error('Error fetching makes:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Search vehicles by text
 */
export async function searchVehicles(searchTerm: string, limit = 50, offset = 0): Promise<Vehicle[]> {
  const { data, error } = await VehicleService.search(searchTerm, limit, offset);
  
  if (error) {
    console.error('Error searching vehicles:', error);
    return [];
  }
  
  return (data || []).map(transformToVehicle);
}
