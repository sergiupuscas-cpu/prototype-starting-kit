import { supabase } from './client';
import type {
  Listing,
  ListingImage,
  VehicleListing,
  VehicleFilters,
  VehicleSortField,
  VehicleSortOrder,
} from './types';
import { transformListing, parseNumber, parseInteger } from './transforms';

/**
 * Service for interacting with vehicle listings in Supabase
 * Works with existing listings-db-24jul and images tables
 */
export class VehicleService {
  private static readonly TABLE_NAME = 'listings-db-24jul';
  private static readonly IMAGES_TABLE = 'images';

  /**
   * Fetch images for a listing
   */
  private static async fetchImagesForListing(
    listingId: number
  ): Promise<ListingImage[]> {
    const { data, error } = await supabase
      .from(this.IMAGES_TABLE)
      .select('*')
      .eq('listing_id', listingId)
      .order('image_order', { ascending: true });

    if (error) {
      console.warn(`Failed to fetch images for listing ${listingId}:`, error);
      return [];
    }

    return data || [];
  }

  /**
   * Fetch images for multiple listings
   */
  private static async fetchImagesForListings(
    listingIds: number[]
  ): Promise<Map<number, ListingImage[]>> {
    if (listingIds.length === 0) return new Map();

    const { data, error } = await supabase
      .from(this.IMAGES_TABLE)
      .select('*')
      .in('listing_id', listingIds)
      .order('image_order', { ascending: true });

    if (error) {
      console.warn('Failed to fetch images for listings:', error);
      return new Map();
    }

    // Group images by listing_id
    const imageMap = new Map<number, ListingImage[]>();
    (data || []).forEach((image) => {
      if (image.listing_id) {
        if (!imageMap.has(image.listing_id)) {
          imageMap.set(image.listing_id, []);
        }
        imageMap.get(image.listing_id)!.push(image);
      }
    });

    return imageMap;
  }

  /**
   * Fetch all vehicle listings
   * @param limit - Maximum number of listings to fetch (default: 50)
   * @param offset - Offset for pagination (default: 0)
   */
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

    // Fetch images for all listings
    const listingIds = listings.map((l) => l.id);
    const imagesMap = await this.fetchImagesForListings(listingIds);

    // Transform listings with images
    const transformed = listings.map((listing) =>
      transformListing(listing, imagesMap.get(listing.id) || [])
    );

    return { data: transformed, error: null };
  }

  /**
   * Fetch a single vehicle listing by ID
   */
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

    // Fetch images
    const images = await this.fetchImagesForListing(listing.id);

    return { data: transformListing(listing, images), error: null };
  }

  /**
   * Fetch vehicle listings with filters
   */
  static async getFiltered(
    filters: VehicleFilters,
    sortField: VehicleSortField = 'created_date',
    sortOrder: VehicleSortOrder = 'desc',
    limit = 50,
    offset = 0
  ): Promise<{ data: VehicleListing[] | null; error: any }> {
    let query = supabase.from(this.TABLE_NAME).select('*');

    // Base filters
    query = query.eq('is_deleted', false);
    
    if (filters.isLive !== undefined) {
      query = query.eq('is_live', filters.isLive);
    } else {
      query = query.eq('is_live', true);
    }

    // Apply filters
    if (filters.make) {
      query = query.ilike('make_key', `%${filters.make}%`);
    }
    if (filters.model) {
      query = query.ilike('model_key', `%${filters.model}%`);
    }
    if (filters.minYear !== undefined) {
      query = query.gte('first_registration_year', filters.minYear);
    }
    if (filters.maxYear !== undefined) {
      query = query.lte('first_registration_year', filters.maxYear);
    }
    if (filters.fuelType) {
      query = query.ilike('fuel_type', `%${filters.fuelType}%`);
    }
    if (filters.transmission) {
      query = query.ilike('transmission_type', `%${filters.transmission}%`);
    }
    if (filters.bodyType) {
      query = query.ilike('body_type', `%${filters.bodyType}%`);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.sellerId !== undefined) {
      query = query.eq('seller_id', filters.sellerId);
    }
    if (filters.condition) {
      query = query.eq('condition_type', filters.condition);
    }

    // Apply sorting
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: listings, error } = await query;

    if (error) return { data: null, error };
    if (!listings) return { data: [], error: null };

    // Fetch images for all listings
    const listingIds = listings.map((l) => l.id);
    const imagesMap = await this.fetchImagesForListings(listingIds);

    // Transform listings with images
    const transformed = listings.map((listing) =>
      transformListing(listing, imagesMap.get(listing.id) || [])
    );

    return { data: transformed, error: null };
  }

  /**
   * Search vehicle listings by text
   */
  static async search(
    searchTerm: string,
    limit = 50,
    offset = 0
  ): Promise<{ data: VehicleListing[] | null; error: any }> {
    const { data: listings, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .or(
        `make_key.ilike.%${searchTerm}%,model_key.ilike.%${searchTerm}%,version_full_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,teaser.ilike.%${searchTerm}%`
      )
      .eq('is_live', true)
      .eq('is_deleted', false)
      .order('created_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) return { data: null, error };
    if (!listings) return { data: [], error: null };

    // Fetch images for all listings
    const listingIds = listings.map((l) => l.id);
    const imagesMap = await this.fetchImagesForListings(listingIds);

    // Transform listings with images
    const transformed = listings.map((listing) =>
      transformListing(listing, imagesMap.get(listing.id) || [])
    );

    return { data: transformed, error: null };
  }

  /**
   * Get vehicle listings by make
   */
  static async getByMake(
    make: string,
    limit = 50,
    offset = 0
  ): Promise<{ data: VehicleListing[] | null; error: any }> {
    return this.getFiltered({ make }, 'created_date', 'desc', limit, offset);
  }

  /**
   * Get vehicle listings by seller
   */
  static async getBySeller(
    sellerId: number,
    limit = 50,
    offset = 0
  ): Promise<{ data: VehicleListing[] | null; error: any }> {
    return this.getFiltered({ sellerId }, 'created_date', 'desc', limit, offset);
  }

  /**
   * Get total count of vehicle listings
   */
  static async getCount(
    filters?: VehicleFilters
  ): Promise<{ count: number | null; error: any }> {
    let query = supabase
      .from(this.TABLE_NAME)
      .select('*', { count: 'exact', head: true })
      .eq('is_deleted', false);

    if (filters) {
      if (filters.isLive !== undefined) {
        query = query.eq('is_live', filters.isLive);
      } else {
        query = query.eq('is_live', true);
      }

      if (filters.make) {
        query = query.ilike('make_key', `%${filters.make}%`);
      }
      if (filters.model) {
        query = query.ilike('model_key', `%${filters.model}%`);
      }
      if (filters.minYear !== undefined) {
        query = query.gte('first_registration_year', filters.minYear);
      }
      if (filters.maxYear !== undefined) {
        query = query.lte('first_registration_year', filters.maxYear);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.sellerId !== undefined) {
        query = query.eq('seller_id', filters.sellerId);
      }
    } else {
      query = query.eq('is_live', true);
    }

    const { count, error } = await query;

    return { count, error };
  }

  /**
   * Get unique makes from the database
   */
  static async getMakes(): Promise<{ data: string[] | null; error: any }> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('make_key')
      .eq('is_live', true)
      .eq('is_deleted', false)
      .not('make_key', 'is', null);

    if (error) return { data: null, error };
    if (!data) return { data: [], error: null };

    // Extract unique makes
    const makes = [...new Set(data.map((row) => row.make_key).filter(Boolean))];
    return { data: makes.sort(), error: null };
  }

  /**
   * Get unique models for a specific make
   */
  static async getModelsForMake(
    make: string
  ): Promise<{ data: string[] | null; error: any }> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('model_key')
      .ilike('make_key', make)
      .eq('is_live', true)
      .eq('is_deleted', false)
      .not('model_key', 'is', null);

    if (error) return { data: null, error };
    if (!data) return { data: [], error: null };

    // Extract unique models
    const models = [...new Set(data.map((row) => row.model_key).filter(Boolean))];
    return { data: models.sort(), error: null };
  }
}

export default VehicleService;

