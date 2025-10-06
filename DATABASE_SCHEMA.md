# Database Schema Documentation

## Available Tables

This document describes the Supabase database schema available for the vehicle listings application.

---

## Table: `listings-db-24jul`

Main table containing all vehicle listing information.

### Primary Key
- `id` (bigint) - Unique listing identifier

### Basic Information
| Column | Type | Description |
|--------|------|-------------|
| `seller_id` | bigint | Reference to seller |
| `source` | text | Data source identifier |
| `external_id` | text | External system ID |
| `seller_vehicle_id` | text | Seller's internal vehicle ID |
| `vehicle_category` | text | Category of vehicle |

### Status & Lifecycle
| Column | Type | Description |
|--------|------|-------------|
| `status` | text | Current listing status |
| `status_last_modified_date` | timestamp | Last status change |
| `is_live` | boolean | **Whether listing is publicly visible** |
| `is_legacy` | boolean | Legacy listing flag |
| `is_deleted` | boolean | **Soft delete flag** |
| `is_ready` | boolean | Ready for publication |
| `verification_status` | text | Verification status |
| `verification_date` | timestamp | Last verification date |
| `is_seller_live` | boolean | Seller status |
| `is_marked_for_activation` | boolean | Pending activation |
| `is_seller_profile_ready` | boolean | Seller profile status |

### Vehicle Identification
| Column | Type | Description |
|--------|------|-------------|
| `make_key` | text | **Vehicle manufacturer** (e.g., "BMW") |
| `model_key` | text | **Vehicle model** (e.g., "X4") |
| `version_full_name` | text | **Complete version name** |
| `version_id` | text | Version identifier |
| `version_identification_method` | text | How version was identified |
| `vehicle_identification_number` | text | VIN number |
| `serial_number` | text | Serial number |

### Basic Specs
| Column | Type | Description |
|--------|------|-------------|
| `first_registration_date` | text | Registration date |
| `first_registration_year` | bigint | **Registration year** |
| `mileage` | text | **Mileage in km** (stored as text, needs parsing) |
| `condition_type` | text | New/Used condition |
| `body_type` | text | **Body style** (SUV, Sedan, etc.) |
| `body_color` | text | Color code |
| `body_color_text` | text | **Color name** (human readable) |
| `interior_color` | text | Interior color code |
| `interior_color_text` | text | Interior color name |
| `metallic` | boolean | Metallic paint |

### Pricing
| Column | Type | Description |
|--------|------|-------------|
| `price` | text | **Selling price** (stored as text, needs parsing) |
| `list_price` | text | Original list price |

### Engine & Performance
| Column | Type | Description |
|--------|------|-------------|
| `fuel_type` | text | **Fuel type** (diesel, petrol, electric, etc.) |
| `transmission_type` | text | **Transmission type** (manual, automatic) |
| `transmission_type_group` | text | Transmission group |
| `horse_power` | text | **Power in PS** |
| `kilo_watts` | text | Power in kW |
| `cubic_capacity` | text | Engine displacement |
| `cylinders` | text | Number of cylinders |
| `cylinder_arrangement` | text | Cylinder configuration |
| `gears` | text | Number of gears |
| `drive_type` | text | Drive type (FWD, RWD, AWD) |
| `drive_system` | text | Drive system details |
| `axis` | text | Axle configuration |

### Electric Vehicle Specs
| Column | Type | Description |
|--------|------|-------------|
| `battery_capacity` | text | Battery capacity in kWh |
| `battery_rent_price` | text | Monthly battery rent |
| `battery_health_percentage` | text | Battery health % |
| `power_consumption` | text | Energy consumption |
| `range` | text | Electric range in km |
| `charging_plug_type` | text | Charging connector type |
| `charging_time_0_to_100` | text | Full charge time |
| `charging_time_0_to_80` | text | Fast charge time (80%) |
| `charging_power` | text | Charging power in kW |
| `fast_charging_plug_type` | text | Fast charging connector |
| `fast_charging_time_0_to_100` | text | DC fast charge time (100%) |
| `fast_charging_time_0_to_80` | text | DC fast charge time (80%) |
| `fast_charging_power` | text | Fast charging power |
| `electric_motor_horse_power` | text | Electric motor power |
| `combustion_engine_horse_power` | text | ICE power (hybrids) |

### Consumption & Emissions
| Column | Type | Description |
|--------|------|-------------|
| `consumption_combined` | text | Combined fuel consumption |
| `consumption_urban` | text | Urban fuel consumption |
| `consumption_extra_urban` | text | Highway fuel consumption |
| `gas_consumption_combined` | text | Gas consumption (CNG/LPG) |
| `gas_consumption_urban` | text | Urban gas consumption |
| `gas_consumption_extra_urban` | text | Highway gas consumption |
| `co2_emission` | text | CO2 emissions g/km |
| `emission_standard` | text | Emission standard (Euro 6, etc.) |
| `energy_label` | text | Energy efficiency label |

### Dimensions & Weights
| Column | Type | Description |
|--------|------|-------------|
| `length` | text | Vehicle length |
| `width` | text | Vehicle width |
| `height` | text | Vehicle height |
| `wheelbase` | text | Wheelbase length |
| `weight_curb` | text | Curb weight |
| `weight_total` | text | Total weight |
| `payload` | text | Maximum payload |
| `towing_capacity_braked` | text | Towing capacity with brakes |

### Interior & Capacity
| Column | Type | Description |
|--------|------|-------------|
| `doors` | text | Number of doors |
| `seats` | text | Number of seats |
| `sleeping_berths` | text | Sleeping berths (motorhomes) |
| `boot_volume` | text | Trunk volume |
| `boot_length` | text | Trunk length |
| `boot_width` | text | Trunk width |
| `boot_height` | text | Trunk height |

### Special Features & Flags
| Column | Type | Description |
|--------|------|-------------|
| `direct_import` | boolean | Directly imported |
| `had_accident` | boolean | Accident history |
| `is_tuned` | boolean | Modified/tuned |
| `is_racing_vehicle` | boolean | Racing vehicle |
| `is_inspected` | boolean | Inspection status |
| `handicapped_accessible` | boolean | Wheelchair accessible |
| `available_for_exchange` | text | Trade-in accepted |
| `available_for_leasing` | text | Leasing available |

### Commercial Vehicle Features
| Column | Type | Description |
|--------|------|-------------|
| `is_transporter` | text | Is a transporter |
| `is_furniture_transporter` | text | Furniture transporter |
| `is_refrigerator` | text | Refrigerated vehicle |
| `is_school_bus` | text | School bus |
| `has_crane` | text | Has crane |
| `has_tail_lift` | text | Has tail lift |
| `has_tarpaulin` | text | Has tarpaulin |
| `has_winch` | text | Has winch |
| `license_category` | text | License category required |

### Maintenance & Condition
| Column | Type | Description |
|--------|------|-------------|
| `last_inspection_date` | text | Last inspection date |
| `certification_number` | text | Certification number |
| `has_new_tires` | text | Has new tires |
| `has_additional_set_of_tires` | boolean | Additional tire set |

### Warranty
| Column | Type | Description |
|--------|------|-------------|
| `warranty_type` | text | Warranty type |
| `warranty_duration` | text | Warranty duration |
| `warranty_mileage` | text | Warranty mileage |
| `warranty_start_date` | text | Warranty start |
| `warranty_details` | text | Warranty details |

### Motorcycle Specific
| Column | Type | Description |
|--------|------|-------------|
| `has_restrictor_kit_25_kw` | text | Has 25kW restrictor |
| `has_restrictor_kit_35_kw` | text | Has 35kW restrictor |
| `restrictor_kit_25_kw_applicable` | text | Can use 25kW restrictor |
| `restrictor_kit_35_kw_applicable` | text | Can use 35kW restrictor |

### Description & Marketing
| Column | Type | Description |
|--------|------|-------------|
| `description` | text | **Full vehicle description** |
| `teaser` | text | **Short description/headline** |
| `language` | text | Content language |

### Data Management
| Column | Type | Description |
|--------|------|-------------|
| `created_by` | text | Creator |
| `created_date` | timestamp | Creation date |
| `last_modified_by` | text | Last modifier |
| `last_modified_date` | timestamp | Last modification |
| `deleted_by` | text | Who deleted |
| `deleted_date` | text | Deletion date |
| `record_version` | bigint | Version number |
| `data_source` | text | Data source |
| `data_source_details` | text | Source details |
| `initial_data_source` | text | Original source |
| `initial_data_source_details` | text | Original source details |
| `verification_status_last_modified_date` | timestamp | Verification change date |
| `live_first_modified_date` | timestamp | First went live |
| `live_last_modified_date` | timestamp | Last live change |
| `ready_first_modified_date` | timestamp | First ready |
| `marked_for_activation_last_modified_date` | text | Activation mark date |
| `rn` | bigint | Row number |

---

## Table: `images`

Contains vehicle images with ordering information.

### Schema
```sql
CREATE TABLE public.images (
  listing_id bigint NULL,
  key text NOT NULL,
  image_order text NULL,
  CONSTRAINT images_pkey PRIMARY KEY (key)
);
```

### Columns
| Column | Type | Description |
|--------|------|-------------|
| `listing_id` | bigint | **Reference to listings-db-24jul.id** |
| `key` | text | **Image URL or storage key** (Primary Key) |
| `image_order` | text | Display order (numeric string) |

### Usage
```sql
-- Get all images for a listing, ordered
SELECT * FROM images 
WHERE listing_id = 123 
ORDER BY CAST(image_order AS INTEGER);

-- Get primary image (first image)
SELECT * FROM images 
WHERE listing_id = 123 
ORDER BY CAST(image_order AS INTEGER) 
LIMIT 1;
```

---

## Common Queries

### Get Active Listings
```sql
SELECT * FROM "listings-db-24jul"
WHERE is_live = true 
  AND is_deleted = false
ORDER BY created_date DESC;
```

### Get Listing with Images
```sql
SELECT 
  l.*,
  json_agg(json_build_object('key', i.key, 'order', i.image_order)) as images
FROM "listings-db-24jul" l
LEFT JOIN images i ON i.listing_id = l.id
WHERE l.id = 123
GROUP BY l.id;
```

### Filter by Make and Model
```sql
SELECT * FROM "listings-db-24jul"
WHERE is_live = true 
  AND is_deleted = false
  AND make_key ILIKE '%BMW%'
  AND model_key ILIKE '%X4%'
ORDER BY created_date DESC;
```

### Get Unique Makes
```sql
SELECT DISTINCT make_key 
FROM "listings-db-24jul"
WHERE is_live = true 
  AND is_deleted = false
  AND make_key IS NOT NULL
ORDER BY make_key;
```

---

## Important Notes

### Text Fields Requiring Parsing
These fields are stored as text but contain numeric values:
- `price` → Parse to number for calculations
- `mileage` → Parse to number for filtering/display
- `horse_power` → Parse to number for specs
- `kilo_watts` → Parse to number for specs
- `first_registration_year` → Already stored as bigint
- All consumption/emission values
- All dimension values
- `image_order` → Parse to integer for sorting

### Filtering Best Practices
Always include in WHERE clause:
```sql
WHERE is_live = true 
  AND is_deleted = false
```

### Performance Considerations
- Index on `make_key`, `model_key` for faster filtering
- Index on `is_live`, `is_deleted` for status queries
- Index on `created_date` for sorting
- Join with `images` table efficiently using listing_id

### Data Quality Notes
- Many fields can be NULL
- Text fields may contain empty strings
- Numeric text fields may contain non-numeric values
- Always validate and parse data on frontend
- Use ILIKE for case-insensitive text searches

---

## VehicleService Methods

The `VehicleService` class provides convenient methods to work with this schema:

```typescript
// Get single listing with images
VehicleService.getById(id)

// Get all live listings
VehicleService.getAll(limit, offset)

// Filter listings
VehicleService.getFiltered({
  make: 'BMW',
  model: 'X4',
  minYear: 2020,
  fuelType: 'diesel'
}, sortField, sortOrder, limit, offset)

// Search
VehicleService.search('BMW M40d', limit, offset)

// Get by seller
VehicleService.getBySeller(sellerId, limit, offset)

// Get unique makes
VehicleService.getMakes()

// Get models for make
VehicleService.getModelsForMake('BMW')

// Get count
VehicleService.getCount(filters)
```

See `src/lib/supabase/vehicleService.ts` for implementation details.

