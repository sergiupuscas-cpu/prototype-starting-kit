import type { Listing, ListingImage, VehicleListing } from './types';

/**
 * Helper functions to transform raw database data into display-friendly formats
 */

/**
 * Parse numeric string values from database
 */
export function parseNumber(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Parse integer string values from database
 */
export function parseInteger(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Generate a display title for a vehicle
 */
export function generateVehicleTitle(listing: Listing): string {
  const parts: string[] = [];
  
  if (listing.first_registration_year) {
    parts.push(listing.first_registration_year.toString());
  }
  
  if (listing.make_key) {
    parts.push(listing.make_key);
  }
  
  if (listing.model_key) {
    parts.push(listing.model_key);
  }
  
  if (listing.version_full_name && parts.length > 0) {
    return `${parts.join(' ')} - ${listing.version_full_name}`;
  }
  
  return parts.length > 0 ? parts.join(' ') : 'Vehicle Listing';
}

/**
 * Get the primary image from a list of images
 */
export function getPrimaryImage(images: ListingImage[]): string | undefined {
  if (!images || images.length === 0) return undefined;
  
  // Sort by image_order if available
  const sorted = [...images].sort((a, b) => {
    const orderA = parseInteger(a.image_order) || 999;
    const orderB = parseInteger(b.image_order) || 999;
    return orderA - orderB;
  });
  
  return sorted[0]?.key;
}

/**
 * Transform raw listing data with images into a simplified VehicleListing
 */
export function transformListing(
  listing: Listing,
  images: ListingImage[] = []
): VehicleListing {
  return {
    id: listing.id,
    make: listing.make_key || 'Unknown',
    model: listing.model_key || 'Unknown',
    year: listing.first_registration_year,
    price: parseNumber(listing.price),
    mileage: parseNumber(listing.mileage),
    title: generateVehicleTitle(listing),
    description: listing.description || listing.teaser || undefined,
    
    // Technical
    fuel_type: listing.fuel_type || undefined,
    transmission: listing.transmission_type || undefined,
    horse_power: listing.horse_power || undefined,
    body_type: listing.body_type || undefined,
    color: listing.body_color_text || listing.body_color || undefined,
    
    // Images
    images,
    primary_image: getPrimaryImage(images),
    
    // Status
    status: listing.status || undefined,
    is_live: listing.is_live || false,
    
    // Seller
    seller_id: listing.seller_id || undefined,
    
    // Raw data for advanced usage
    raw: listing,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number | null, currency = '€'): string | null {
  if (price === null || price === undefined) return null;
  return `${currency} ${price.toLocaleString()}`;
}

/**
 * Format mileage for display
 */
export function formatMileage(mileage: number | null, unit = 'km'): string | null {
  if (mileage === null || mileage === undefined) return null;
  return `${mileage.toLocaleString()} ${unit}`;
}

