import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Listing {
  id: number;
  make_key: string | null;
  model_key: string | null;
  first_registration_year: number | null;
  mileage: string | null;
  price: string | null;
  fuel_type: string | null;
  transmission_type: string | null;
  condition_type: string | null;
  body_type: string | null;
  body_color_text: string | null;
  horse_power: string | null;
  consumption_combined: string | null;
  co2_emission: string | null;
  doors: string | null;
  seats: string | null;
  energy_label: string | null;
  description: string | null;
  teaser: string | null;
  is_live: boolean | null;
  is_deleted: boolean | null;
}

export interface ListingImage {
  listing_id: number | null;
  key: string;
  image_order: string | null;
}

export interface VehicleListing {
  id: number;
  make: string;
  model: string;
  year: number | null;
  price: number | null;
  mileage: number | null;
  title: string;
  description?: string;
  fuel_type?: string;
  transmission?: string;
  horse_power?: string;
  body_type?: string;
  color?: string;
  images: ListingImage[];
  primary_image?: string;
  raw?: Listing;
}

// Helper functions
function parseNumber(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''));
  return isNaN(parsed) ? null : parsed;
}

function transformListing(listing: Listing, images: ListingImage[]): VehicleListing {
  const make = listing.make_key || 'Unknown';
  const model = listing.model_key || 'Unknown';
  const year = listing.first_registration_year;

  return {
    id: listing.id,
    make,
    model,
    year,
    price: parseNumber(listing.price),
    mileage: parseNumber(listing.mileage),
    title: `${year || ''} ${make} ${model}`.trim(),
    description: listing.description || listing.teaser || undefined,
    fuel_type: listing.fuel_type || undefined,
    transmission: listing.transmission_type || undefined,
    horse_power: listing.horse_power || undefined,
    body_type: listing.body_type || undefined,
    color: listing.body_color_text || undefined,
    images,
    primary_image: images[0]?.key,
    raw: listing,
  };
}

// Vehicle Service
export class VehicleService {
  private static readonly TABLE_NAME = 'listings-db-24jul';
  private static readonly IMAGES_TABLE = 'images';

  private static async fetchImagesForListings(
    listingIds: number[]
  ): Promise<Map<number, ListingImage[]>> {
    if (listingIds.length === 0) return new Map();

    const { data, error } = await supabase
      .from(this.IMAGES_TABLE)
      .select('*')
      .in('listing_id', listingIds)
      .order('image_order', { ascending: true, nullsFirst: false });

    if (error) {
      console.warn('Failed to fetch images for listings:', error);
      return new Map();
    }

    const imageMap = new Map<number, ListingImage[]>();
    (data || []).forEach((image) => {
      if (image.listing_id) {
        if (!imageMap.has(image.listing_id)) {
          imageMap.set(image.listing_id, []);
        }
        imageMap.get(image.listing_id)!.push(image);
      }
    });

    // Sort each listing's images numerically since image_order is stored as text
    imageMap.forEach((images) => {
      images.sort((a, b) => {
        const orderA = parseInt(a.image_order || '999', 10);
        const orderB = parseInt(b.image_order || '999', 10);
        return orderA - orderB;
      });
    });

    return imageMap;
  }

  static async getAll(
    limit = 50,
    offset = 0
  ): Promise<{ data: VehicleListing[] | null; error: any }> {
    const { data: listings, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('is_live', true)
      .eq('is_deleted', false)
      .order('created_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) return { data: null, error };
    if (!listings) return { data: [], error: null };

    const listingIds = listings.map((l) => l.id);
    const imagesMap = await this.fetchImagesForListings(listingIds);

    const transformed = listings.map((listing) =>
      transformListing(listing, imagesMap.get(listing.id) || [])
    );

    return { data: transformed, error: null };
  }

  static async getById(
    id: number
  ): Promise<{ data: VehicleListing | null; error: any }> {
    const { data: listing, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return { data: null, error };
    if (!listing) return { data: null, error: null };

    const { data: images } = await supabase
      .from(this.IMAGES_TABLE)
      .select('*')
      .eq('listing_id', listing.id)
      .order('image_order', { ascending: true, nullsFirst: false });

    // Sort numerically since image_order is stored as text
    const sortedImages = (images || []).sort((a, b) => {
      const orderA = parseInt(a.image_order || '999', 10);
      const orderB = parseInt(b.image_order || '999', 10);
      return orderA - orderB;
    });

    return { data: transformListing(listing, sortedImages), error: null };
  }

  static async search(
    searchTerm: string,
    limit = 50,
    offset = 0
  ): Promise<{ data: VehicleListing[] | null; error: any }> {
    const { data: listings, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .or(
        `make_key.ilike.%${searchTerm}%,model_key.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      )
      .eq('is_live', true)
      .eq('is_deleted', false)
      .order('created_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) return { data: null, error };
    if (!listings) return { data: [], error: null };

    const listingIds = listings.map((l) => l.id);
    const imagesMap = await this.fetchImagesForListings(listingIds);

    const transformed = listings.map((listing) =>
      transformListing(listing, imagesMap.get(listing.id) || [])
    );

    return { data: transformed, error: null };
  }

  static async getMakes(): Promise<{ data: string[] | null; error: any }> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('make_key')
      .eq('is_live', true)
      .eq('is_deleted', false)
      .not('make_key', 'is', null);

    if (error) return { data: null, error };
    if (!data) return { data: [], error: null };

    const makes = [...new Set(data.map((row) => row.make_key).filter(Boolean))];
    return { data: makes.sort(), error: null };
  }
}
