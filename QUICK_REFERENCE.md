# 🚀 Quick Reference - Vehicle Details Page

This is a cheat sheet for quickly implementing vehicle details pages with Supabase integration.

## ⚡ Quick Start (30 seconds)

### View the Demo
```bash
# Open the HTML demo
open vehicle-details-demo.html
```

### Use in React
```tsx
import VehicleDetailsPage from './vehicle-details-example';

<VehicleDetailsPage vehicleId={123} />
```

## 🗄️ Supabase Quick Reference

### Fetch One Vehicle
```typescript
import { VehicleService } from './src/lib/supabase';

const { data, error } = await VehicleService.getById(vehicleId);
```

### Fetch Multiple Vehicles
```typescript
// All vehicles
const { data } = await VehicleService.getAll(limit, offset);

// With filters
const { data } = await VehicleService.getFiltered({
  make: 'BMW',
  model: 'X4',
  minYear: 2020,
  fuelType: 'diesel'
});

// Search
const { data } = await VehicleService.search('BMW M40d');

// By dealer
const { data } = await VehicleService.getBySeller(sellerId);
```

### Get Filter Options
```typescript
// All makes
const { data: makes } = await VehicleService.getMakes();

// Models for a make
const { data: models } = await VehicleService.getModelsForMake('BMW');

// Total count
const { count } = await VehicleService.getCount({ make: 'BMW' });
```

## 🎨 Component Quick Reference

### Basic Layout
```tsx
<ThemeProvider theme="autoscout24">
  <Box bg="gray.50" minH="100vh">
    <Grid templateColumns={{ base: '1fr', lg: '1fr 400px' }} gap="4">
      {/* Main content */}
      <Stack spacing="4">
        {/* Your content */}
      </Stack>
      
      {/* Sidebar */}
      <Stack spacing="4">
        {/* Your sidebar */}
      </Stack>
    </Grid>
  </Box>
</ThemeProvider>
```

### Image Gallery
```tsx
<Box bg="white" borderRadius="md" boxShadow="md">
  <AspectRatio ratio={4 / 3}>
    <img src={imageUrl} alt="Vehicle" />
  </AspectRatio>
  
  <SimpleGrid columns={6} spacing="2" p="4">
    {images.map(img => (
      <Box key={img.key} cursor="pointer" onClick={() => selectImage(img)}>
        <AspectRatio ratio={4 / 3}>
          <img src={img.key} alt="Thumbnail" />
        </AspectRatio>
      </Box>
    ))}
  </SimpleGrid>
</Box>
```

### Price Card
```tsx
<Box bg="white" p="6" borderRadius="md" position="sticky" top="4">
  <Heading size="2xl" mb="2">
    {formatPrice(vehicle.price)}
  </Heading>
  
  <Stack spacing="3">
    <Button colorScheme="orange" size="lg" width="full">
      Request Information
    </Button>
    <Button variant="outline" size="lg" width="full">
      Call Dealer
    </Button>
  </Stack>
</Box>
```

### Specifications Grid
```tsx
<SimpleGrid columns={{ base: 2, md: 3 }} spacing="4">
  {specs.map(spec => (
    <Box key={spec.label}>
      <Text fontSize="2xl">{spec.icon}</Text>
      <Text fontSize="xs" color="gray.500" textTransform="uppercase">
        {spec.label}
      </Text>
      <Text fontWeight="bold" fontSize="lg">
        {spec.value}
      </Text>
    </Box>
  ))}
</SimpleGrid>
```

### Tabs
```tsx
<Tabs colorScheme="orange">
  <TabList>
    <Tab>Features</Tab>
    <Tab>Description</Tab>
    <Tab>Technical</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>{/* Features */}</TabPanel>
    <TabPanel>{/* Description */}</TabPanel>
    <TabPanel>{/* Technical */}</TabPanel>
  </TabPanels>
</Tabs>
```

## 🔧 Common Customizations

### Change Price Display
```typescript
// Default: € symbol
formatPrice(price)  // "€ 55,900"

// Custom currency
formatPrice(price, 'CHF')  // "CHF 55,900"

// Monthly calculation
const monthly = Math.round(price / 48);
```

### Filter Vehicles
```typescript
const filters = {
  make: 'BMW',              // Exact or partial match
  model: 'X4',              // Exact or partial match
  minYear: 2020,            // Minimum year
  maxYear: 2024,            // Maximum year
  minPrice: 30000,          // Not implemented (add to service)
  maxPrice: 80000,          // Not implemented (add to service)
  fuelType: 'diesel',       // Fuel type
  transmission: 'automatic', // Transmission type
  bodyType: 'SUV',          // Body type
  isLive: true,             // Show only live listings
  sellerId: 123,            // Filter by dealer
  condition: 'used',        // New or used
};

const { data } = await VehicleService.getFiltered(filters);
```

### Sort Results
```typescript
// By date (newest first)
const { data } = await VehicleService.getFiltered(
  filters,
  'created_date',  // Sort field
  'desc'           // Sort order
);

// By price (lowest first)
const { data } = await VehicleService.getFiltered(
  filters,
  'price',
  'asc'
);

// By mileage (lowest first)
const { data } = await VehicleService.getFiltered(
  filters,
  'mileage',
  'asc'
);
```

### Add Loading State
```tsx
function VehicleDetails({ vehicleId }) {
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await VehicleService.getById(vehicleId);
      setVehicle(data);
      setLoading(false);
    }
    fetchData();
  }, [vehicleId]);

  if (loading) return <Spinner />;
  return <VehicleContent vehicle={vehicle} />;
}
```

### Add Error Handling
```tsx
const [error, setError] = useState(null);

try {
  const { data, error: fetchError } = await VehicleService.getById(id);
  if (fetchError) throw fetchError;
  setVehicle(data);
} catch (err) {
  setError('Failed to load vehicle');
  console.error(err);
}

// Display error
{error && <Alert status="error">{error}</Alert>}
```

## 📊 Data Transformation

### Parse Numbers
```typescript
import { parseNumber, parseInteger } from './src/lib/supabase/transforms';

// Parse decimal numbers
const price = parseNumber(listing.price);  // "55900" → 55900

// Parse integers
const year = parseInteger(listing.first_registration_year);
```

### Format Display Values
```typescript
import { formatPrice, formatMileage } from './src/lib/supabase/transforms';

const priceDisplay = formatPrice(55900);       // "€ 55,900"
const mileageDisplay = formatMileage(46000);   // "46,000 km"
```

### Generate Title
```typescript
import { generateVehicleTitle } from './src/lib/supabase/transforms';

const title = generateVehicleTitle(listing);
// "2022 BMW X4 - xDrive 48V M40d"
```

### Transform Complete Listing
```typescript
import { transformListing } from './src/lib/supabase/transforms';

const vehicleListing = transformListing(rawListing, images);
// Returns VehicleListing object with all data formatted
```

## 🎨 Styling Quick Reference

### Colors (AutoScout24 Theme)
```tsx
// Brand colors
<Button colorScheme="orange">      // Primary action
<Badge colorScheme="green">        // Success
<Badge colorScheme="red">          // Error/Reserved
<Badge colorScheme="blue">         // Info

// Direct colors
<Box bg="brand.primary">           // #ff6600
<Text color="gray.600">            // Secondary text
<Box bg="gray.50">                 // Light background
```

### Spacing
```tsx
<Stack spacing="4">                // 1rem (16px)
<Box p="6">                        // Padding 1.5rem
<Box mt="4" mb="2">               // Margin top/bottom
<Grid gap="4">                     // Gap between items
```

### Responsive Values
```tsx
<Grid
  templateColumns={{ base: '1fr', lg: '1fr 400px' }}
  gap={{ base: '2', md: '4' }}
  p={{ base: '4', md: '6' }}
>
```

### Common Patterns
```tsx
// Card
<Box bg="white" p="6" borderRadius="md" boxShadow="md">

// Sticky sidebar
<Box position="sticky" top="4">

// Full width button
<Button width="full" size="lg">

// Image container
<AspectRatio ratio={4 / 3}>
  <img src={url} alt="..." />
</AspectRatio>
```

## 🔍 Debugging

### Check Supabase Connection
```bash
node test-supabase-connection.js
```

### Console Log Vehicle Data
```typescript
const { data } = await VehicleService.getById(123);
console.log('Vehicle:', data);
console.log('Images:', data?.images);
console.log('Price:', data?.price);
```

### Check Environment Variables
```typescript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Has Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
```

### Inspect Database
```sql
-- Check if vehicle exists
SELECT * FROM "listings-db-24jul" WHERE id = 123;

-- Check images
SELECT * FROM images WHERE listing_id = 123;

-- Count live listings
SELECT COUNT(*) FROM "listings-db-24jul" 
WHERE is_live = true AND is_deleted = false;
```

## 📱 Responsive Breakpoints

```typescript
// Use these in component props
{
  base: 'mobile',      // 0px+
  sm: 'small tablet',  // 480px+
  md: 'tablet',        // 768px+
  lg: 'desktop',       // 1024px+
  xl: 'large desktop', // 1280px+
}

// Example usage
<Grid
  templateColumns={{
    base: '1fr',           // Mobile: single column
    md: '1fr',             // Tablet: single column
    lg: '1fr 400px',       // Desktop: main + sidebar
  }}
  gap={{ base: '2', md: '4', lg: '6' }}
>
```

## 🚀 Performance Tips

### Image Optimization
```tsx
// Use smaller thumbnails
<img src={`${baseUrl}?w=200&h=150`} alt="Thumbnail" />

// Lazy load images
<img loading="lazy" src={url} alt="..." />
```

### Pagination
```typescript
// Load in batches
const { data } = await VehicleService.getAll(20, 0);   // First 20
const { data } = await VehicleService.getAll(20, 20);  // Next 20
```

### Memoization
```tsx
import { useMemo } from 'react';

const specs = useMemo(() => [
  { label: 'Year', value: vehicle.year },
  { label: 'Mileage', value: vehicle.mileage },
  // ...
], [vehicle]);
```

## 📚 Type Reference

### VehicleListing Interface
```typescript
interface VehicleListing {
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
  status?: string;
  is_live?: boolean;
  seller_id?: number;
  raw?: Listing;  // Full raw data
}
```

### VehicleFilters Interface
```typescript
interface VehicleFilters {
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  status?: string;
  isLive?: boolean;
  sellerId?: number;
  condition?: string;
}
```

## 🔗 Useful Links

- **HTML Demo**: `vehicle-details-demo.html`
- **React Example**: `vehicle-details-example.tsx`
- **Full Documentation**: `VEHICLE_DETAILS_EXAMPLE.md`
- **Supabase Integration**: `UPDATED_INTEGRATION_SUMMARY.md`
- **Components**: `src/components/`
- **Supabase Service**: `src/lib/supabase/vehicleService.ts`

---

**Pro Tip**: Start with the HTML demo for quick prototyping, then move to the React example for production implementation.

