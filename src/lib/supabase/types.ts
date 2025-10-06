/**
 * Database types for Supabase
 * These types represent the structure of your existing vehicle listings tables
 */

/**
 * Main listing type from listings-db-24jul table
 */
export interface Listing {
  id: number;
  seller_id: number | null;
  source: string | null;
  
  // Basic vehicle info
  make_key: string | null;
  model_key: string | null;
  version_full_name: string | null;
  body_type: string | null;
  body_color: string | null;
  body_color_text: string | null;
  condition_type: string | null;
  
  // Registration & mileage
  first_registration_date: string | null;
  first_registration_year: number | null;
  mileage: string | null;
  
  // Pricing
  price: string | null;
  list_price: string | null;
  
  // Vehicle category & identification
  seller_vehicle_id: string | null;
  vehicle_category: string | null;
  vehicle_identification_number: string | null;
  version_id: string | null;
  external_id: string | null;
  
  // Status & lifecycle
  status: string | null;
  status_last_modified_date: string | null;
  is_live: boolean | null;
  is_legacy: boolean | null;
  is_ready: boolean | null;
  is_deleted: boolean | null;
  verification_status: string | null;
  verification_date: string | null;
  
  // Technical specifications
  fuel_type: string | null;
  transmission_type: string | null;
  transmission_type_group: string | null;
  horse_power: string | null;
  kilo_watts: string | null;
  cubic_capacity: string | null;
  cylinders: string | null;
  cylinder_arrangement: string | null;
  gears: string | null;
  drive_type: string | null;
  drive_system: string | null;
  
  // Electric vehicle specs
  battery_capacity: string | null;
  battery_rent_price: string | null;
  battery_health_percentage: string | null;
  power_consumption: string | null;
  range: string | null;
  charging_plug_type: string | null;
  charging_time_0_to_100: string | null;
  charging_time_0_to_80: string | null;
  fast_charging_plug_type: string | null;
  fast_charging_time_0_to_100: string | null;
  fast_charging_time_0_to_80: string | null;
  charging_power: string | null;
  fast_charging_power: string | null;
  
  // Engine & performance
  combustion_engine_horse_power: string | null;
  electric_motor_horse_power: string | null;
  
  // Consumption & emissions
  consumption_combined: string | null;
  consumption_extra_urban: string | null;
  consumption_urban: string | null;
  gas_consumption_combined: string | null;
  gas_consumption_extra_urban: string | null;
  gas_consumption_urban: string | null;
  co2_emission: string | null;
  emission_standard: string | null;
  energy_label: string | null;
  
  // Dimensions
  length: string | null;
  width: string | null;
  height: string | null;
  wheelbase: string | null;
  weight_curb: string | null;
  weight_total: string | null;
  payload: string | null;
  
  // Interior
  seats: string | null;
  doors: string | null;
  interior_color: string | null;
  interior_color_text: string | null;
  sleeping_berths: string | null;
  
  // Features & condition
  metallic: boolean | null;
  had_accident: boolean | null;
  is_tuned: boolean | null;
  is_inspected: boolean | null;
  last_inspection_date: string | null;
  has_additional_set_of_tires: boolean | null;
  has_new_tires: string | null;
  handicapped_accessible: boolean | null;
  direct_import: boolean | null;
  is_racing_vehicle: boolean | null;
  
  // Commercial vehicle features
  is_transporter: string | null;
  is_furniture_transporter: string | null;
  is_refrigerator: string | null;
  is_school_bus: string | null;
  has_tail_lift: string | null;
  has_crane: string | null;
  has_winch: string | null;
  has_tarpaulin: string | null;
  boot_length: string | null;
  boot_width: string | null;
  boot_height: string | null;
  boot_volume: string | null;
  
  // Trading options
  available_for_exchange: string | null;
  available_for_leasing: string | null;
  
  // Warranty
  warranty_type: string | null;
  warranty_duration: string | null;
  warranty_mileage: string | null;
  warranty_start_date: string | null;
  warranty_details: string | null;
  
  // Description
  description: string | null;
  teaser: string | null;
  language: string | null;
  
  // Metadata
  created_by: string | null;
  created_date: string | null;
  last_modified_by: string | null;
  last_modified_date: string | null;
  deleted_by: string | null;
  deleted_date: string | null;
  record_version: number | null;
  
  // Source tracking
  data_source: string | null;
  data_source_details: string | null;
  initial_data_source: string | null;
  initial_data_source_details: string | null;
  
  // Additional fields
  axis: string | null;
  certification_number: string | null;
  license_category: string | null;
  serial_number: string | null;
  towing_capacity_braked: string | null;
  has_restrictor_kit_25_kw: string | null;
  has_restrictor_kit_35_kw: string | null;
  restrictor_kit_25_kw_applicable: string | null;
  restrictor_kit_35_kw_applicable: string | null;
  version_identification_method: string | null;
  verification_status_last_modified_date: string | null;
  live_first_modified_date: string | null;
  ready_first_modified_date: string | null;
  is_seller_live: boolean | null;
  is_marked_for_activation: boolean | null;
  marked_for_activation_last_modified_date: string | null;
  is_seller_profile_ready: boolean | null;
  live_last_modified_date: string | null;
  rn: number | null;
}

/**
 * Image type from images table
 */
export interface ListingImage {
  listing_id: number | null;
  key: string;
  image_order: string | null;
}

/**
 * Simplified vehicle listing type for display purposes
 * Combines listing data with images
 */
export interface VehicleListing {
  id: number;
  make: string;
  model: string;
  year: number | null;
  price: number | null;
  mileage: number | null;
  title: string;
  description?: string;
  
  // Technical
  fuel_type?: string;
  transmission?: string;
  horse_power?: string;
  body_type?: string;
  color?: string;
  
  // Images
  images: ListingImage[];
  primary_image?: string;
  
  // Status
  status?: string;
  is_live?: boolean;
  
  // Seller
  seller_id?: number;
  
  // Raw data (for advanced usage)
  raw?: Listing;
}

export interface Database {
  public: {
    Tables: {
      'listings-db-24jul': {
        Row: Listing;
        Insert: Partial<Listing>;
        Update: Partial<Listing>;
      };
      images: {
        Row: ListingImage;
        Insert: Partial<ListingImage>;
        Update: Partial<ListingImage>;
      };
    };
  };
}

/**
 * Filter options for querying vehicle listings
 */
export interface VehicleFilters {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  status?: string;
  isLive?: boolean;
  sellerId?: number;
  condition?: string;
}

/**
 * Sort options for vehicle listings
 */
export type VehicleSortField = 
  | 'price'
  | 'first_registration_year'
  | 'mileage'
  | 'created_date'
  | 'make_key'
  | 'model_key';

export type VehicleSortOrder = 'asc' | 'desc';

