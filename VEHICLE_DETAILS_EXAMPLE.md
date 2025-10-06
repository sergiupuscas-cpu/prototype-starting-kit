# 🚗 Vehicle Details Page Example

This directory contains complete examples of a vehicle details page for AutoScout24, showcasing the integration between your component library and Supabase database.

## 📁 Files Included

### 1. `vehicle-details-demo.html`
A standalone HTML file with inline styles that demonstrates the complete vehicle details page layout.

**Features:**
- ✅ Fully functional image gallery with thumbnails
- ✅ Tabbed interface (Features, Description, Technical Data, Financing)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ AutoScout24 branding and color scheme
- ✅ Price display with financing options
- ✅ Dealer information card
- ✅ Call-to-action buttons
- ✅ Real vehicle data structure matching your Supabase schema

**To View:**
Simply open the file in any modern web browser:
```bash
open vehicle-details-demo.html
# or
firefox vehicle-details-demo.html
# or
chrome vehicle-details-demo.html
```

### 2. `vehicle-details-example.tsx`
A React/TypeScript implementation using your actual component library and Supabase integration.

**Features:**
- ✅ Live data fetching from Supabase using `VehicleService.getById()`
- ✅ Uses components from `@smg-automotive/components`
- ✅ AutoScout24 theme via `ThemeProvider`
- ✅ TypeScript typed with `VehicleListing` interface
- ✅ Loading and error states
- ✅ Image gallery with state management
- ✅ Responsive layout with Chakra UI Grid
- ✅ Callback props for interactions

**To Use in Your Project:**
```tsx
import VehicleDetailsPage from './vehicle-details-example';

function App() {
  return (
    <VehicleDetailsPage
      vehicleId={123}
      onContactDealer={() => {
        // Your contact dealer logic
        console.log('Opening contact form...');
      }}
      onRequestInfo={() => {
        // Your request info logic
        console.log('Opening inquiry form...');
      }}
    />
  );
}
```

## 🗄️ Supabase Integration

Both examples demonstrate how data flows from your Supabase database:

### Data Flow
```
Supabase Database
  ├── listings-db-24jul table (vehicle data)
  └── images table (vehicle images)
       ↓
VehicleService.getById(id)
       ↓
Transform with transformListing()
       ↓
VehicleListing object
       ↓
React Components / HTML Display
```

### Key Supabase Methods Used

#### Fetch Single Vehicle
```typescript
import { VehicleService } from './src/lib/supabase';

const { data, error } = await VehicleService.getById(123);
// Returns: VehicleListing with all images
```

#### Fetch All Vehicles with Filters
```typescript
const { data, error } = await VehicleService.getFiltered({
  make: 'BMW',
  model: 'X4',
  minYear: 2020,
  maxYear: 2024,
  fuelType: 'diesel',
  isLive: true
});
```

#### Search Vehicles
```typescript
const { data, error } = await VehicleService.search('BMW M40d');
```

#### Get Vehicles by Dealer
```typescript
const { data, error } = await VehicleService.getBySeller(sellerId);
```

## 🎨 Component Architecture

### Layout Structure
```
VehicleDetailsPage
├── Header (navigation)
├── Breadcrumbs
├── Supabase Integration Banner
└── Main Grid Layout
    ├── Main Content (left column)
    │   ├── Image Gallery
    │   │   ├── Main Image Display
    │   │   └── Thumbnail Grid
    │   ├── Title Section
    │   │   ├── Vehicle Title
    │   │   ├── Subtitle/Description
    │   │   └── Key Specifications Grid
    │   └── Details Tabs
    │       ├── Features Tab
    │       ├── Description Tab
    │       ├── Technical Data Tab
    │       └── Financing Tab
    └── Sidebar (right column)
        ├── Price Card
        │   ├── Price Display
        │   ├── Financing Info
        │   ├── CTA Buttons
        │   └── Trust Badges
        └── Dealer Card
            ├── Dealer Logo
            ├── Rating Display
            ├── Contact Information
            └── Action Buttons
```

### Components Used (from your library)

```tsx
import {
  Box,              // Container component
  Grid,             // Layout grid
  GridItem,         // Grid items
  Flex,             // Flexbox layout
  Stack,            // Vertical/horizontal stack
  Heading,          // Headings
  Text,             // Text content
  Button,           // Action buttons
  Badge,            // Status badges
  Divider,          // Visual separator
  SimpleGrid,       // Simple grid layout
  AspectRatio,      // Image aspect ratio
  Tabs,             // Tab navigation
  Tab,              // Individual tab
  TabList,          // Tab list container
  TabPanel,         // Tab content panel
  TabPanels,        // Tab panels container
  Spinner,          // Loading indicator
  Alert,            // Error/info messages
  ThemeProvider,    // Theme wrapper
  VehicleReference, // Vehicle card component
} from '@smg-automotive/components';
```

## 🎨 AutoScout24 Theme

The examples use the AutoScout24 theme which includes:

### Brand Colors
- **Primary Orange**: `#ff6600` (buttons, highlights, active states)
- **Text**: `#333` (primary text), `#666` (secondary text)
- **Backgrounds**: `#fff` (white), `#f5f5f5` (light gray)
- **Borders**: `#e0e0e0` (light borders)
- **Success Green**: `#4caf50` (badges, checkmarks)
- **Error Red**: `#d32f2f` (alerts, warnings)

### Typography
- **Font Family**: System fonts for optimal performance
- **Heading Sizes**: 2xl (2rem), xl (1.5rem), lg (1.25rem)
- **Body Text**: Base (1rem), Small (0.875rem), Extra Small (0.75rem)

### Spacing
- **Extra Small**: `0.5rem` (8px)
- **Small**: `1rem` (16px)
- **Medium**: `1.5rem` (24px)
- **Large**: `2rem` (32px)
- **Extra Large**: `3rem` (48px)

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First */
base: 0px           /* Mobile devices */
sm: 480px           /* Small tablets */
md: 768px           /* Tablets */
lg: 1024px          /* Desktops */
xl: 1280px          /* Large desktops */
2xl: 1536px         /* Extra large screens */
```

### Layout Changes
- **Desktop (lg+)**: Two-column layout (main content + sidebar)
- **Tablet (md)**: Single column, full-width components
- **Mobile (base)**: Single column, stacked elements, optimized touch targets

## 🔧 Customization Guide

### Modify the Vehicle Data
In `vehicle-details-example.tsx`, the data comes from Supabase. To customize:

1. **Change the vehicle ID**:
```tsx
<VehicleDetailsPage vehicleId={456} />
```

2. **Add filters**:
```tsx
const { data } = await VehicleService.getFiltered({
  make: 'Mercedes-Benz',
  minPrice: 30000,
  maxPrice: 80000
});
```

### Customize the Layout
In `vehicle-details-example.tsx`:

```tsx
// Change grid layout
<Grid
  templateColumns={{ base: '1fr', lg: '2fr 1fr' }}  // Wider main content
  gap="6"  // Larger gap between columns
>
```

### Add Custom Features
```tsx
// Add a new tab
<TabPanels>
  <TabPanel>Features content...</TabPanel>
  <TabPanel>Description content...</TabPanel>
  <TabPanel>Technical Data content...</TabPanel>
  <TabPanel>
    {/* Your custom tab */}
    <CustomContent />
  </TabPanel>
</TabPanels>
```

### Style Customization
```tsx
// Customize button colors
<Button
  colorScheme="orange"  // Use theme color
  bg="brand.primary"    // Or custom color
  size="lg"
  width="full"
>
  Request Information
</Button>
```

## 🚀 Integration Steps

### Step 1: Set Up Supabase
Ensure your `.env` file has the correct credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 2: Add Sample Data
Insert a test vehicle in your Supabase dashboard:
```sql
INSERT INTO "listings-db-24jul" (
  make_key, model_key, first_registration_year, 
  price, mileage, is_live, is_deleted,
  fuel_type, transmission_type, horse_power,
  body_type, body_color_text, description
) VALUES (
  'BMW', 'X4', 2022,
  '55900', '46000', true, false,
  'diesel', 'automatic', '340',
  'SUV', 'Black', 'Beautiful BMW X4 in excellent condition...'
);

-- Add images
INSERT INTO images (listing_id, key, image_order)
VALUES 
  (1, 'https://example.com/image1.jpg', '1'),
  (1, 'https://example.com/image2.jpg', '2'),
  (1, 'https://example.com/image3.jpg', '3');
```

### Step 3: Import the Component
```tsx
import VehicleDetailsPage from './vehicle-details-example';
import { ThemeProvider } from '@smg-automotive/components';

function App() {
  return (
    <ThemeProvider theme="autoscout24">
      <VehicleDetailsPage
        vehicleId={1}  // Your vehicle ID
        onContactDealer={() => alert('Contact dealer')}
        onRequestInfo={() => alert('Request info')}
      />
    </ThemeProvider>
  );
}
```

### Step 4: Run Your App
```bash
npm run dev
# or
npm start
```

## 📊 Data Mapping Reference

### From Supabase to Display

| Supabase Field | Display Location | Transformation |
|----------------|------------------|----------------|
| `make_key` | Title, Specs | Direct |
| `model_key` | Title, Specs | Direct |
| `first_registration_year` | Key Specs | Direct |
| `price` | Price Card | `parseNumber()` → `formatPrice()` |
| `mileage` | Key Specs | `parseNumber()` → `formatMileage()` |
| `horse_power` | Key Specs | Direct with "PS" unit |
| `fuel_type` | Key Specs | Capitalized |
| `transmission_type` | Key Specs | Capitalized |
| `body_type` | Key Specs | Capitalized |
| `body_color_text` | Technical Data | Direct |
| `description` | Description Tab | Direct |
| `images.key` | Image Gallery | Array of URLs |
| `images.image_order` | Image Gallery | Sort order |
| `seller_id` | Dealer Card | `getBySeller()` |
| `is_live` | Display Status | Boolean filter |

## 🧪 Testing

### Test the HTML Version
1. Open `vehicle-details-demo.html` in a browser
2. Test image gallery (click thumbnails)
3. Test tabs (switch between tabs)
4. Test responsive layout (resize browser)
5. Check mobile view (developer tools)

### Test the React Version
```tsx
// Create a test component
import { render, screen, waitFor } from '@testing-library/react';
import VehicleDetailsPage from './vehicle-details-example';

test('renders vehicle details', async () => {
  render(<VehicleDetailsPage vehicleId={123} />);
  
  await waitFor(() => {
    expect(screen.getByText(/BMW/i)).toBeInTheDocument();
  });
});
```

## 🐛 Troubleshooting

### Issue: Vehicle data not loading
**Solution:**
1. Check Supabase credentials in `.env`
2. Verify vehicle ID exists in database
3. Check browser console for errors
4. Ensure `is_live = true` and `is_deleted = false`

### Issue: Images not displaying
**Solution:**
1. Verify image URLs in `images` table
2. Check image URLs are accessible (CORS)
3. Ensure `image_order` is numeric
4. Check browser network tab for 404 errors

### Issue: TypeScript errors
**Solution:**
```bash
npm run build  # Regenerate types
```

### Issue: Styling looks wrong
**Solution:**
1. Ensure `ThemeProvider` wraps your app
2. Check theme is set to "autoscout24"
3. Verify Chakra UI is installed
4. Clear browser cache

## 📚 Additional Resources

### Related Files
- `src/lib/supabase/vehicleService.ts` - Data fetching methods
- `src/lib/supabase/types.ts` - TypeScript interfaces
- `src/lib/supabase/transforms.ts` - Data transformation utilities
- `src/components/vehicleReference/index.tsx` - Vehicle card component
- `src/themes/autoscout24/` - Theme configuration

### Documentation
- [Supabase Integration Summary](./UPDATED_INTEGRATION_SUMMARY.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Main README](./README.md)

### Component Library
- [Chakra UI Docs](https://chakra-ui.com/)
- [AutoScout24 Components](./src/components/)

## 🎯 Next Steps

1. **Customize the design** - Adjust colors, spacing, and layout
2. **Add more features** - Reviews, similar vehicles, comparison tools
3. **Implement interactions** - Contact forms, test drive booking, favorites
4. **Add analytics** - Track user behavior, popular vehicles
5. **Optimize performance** - Image lazy loading, code splitting
6. **Add SEO** - Meta tags, structured data, sitemaps

## 💡 Tips

- Use the HTML version for quick prototyping and design approval
- Use the React version for production implementations
- Keep the Supabase structure consistent with the examples
- Test on real devices for mobile experience
- Monitor Supabase usage and optimize queries
- Use image CDN for better performance
- Implement proper error boundaries in production

---

**Questions?** Check the [UPDATED_INTEGRATION_SUMMARY.md](./UPDATED_INTEGRATION_SUMMARY.md) for detailed Supabase integration information.

