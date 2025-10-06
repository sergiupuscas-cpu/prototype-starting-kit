/**
 * Vehicle Details Page Example
 * 
 * This is a React/TypeScript implementation showing how to build a vehicle
 * details page using the components from this package and Supabase integration.
 * 
 * This example demonstrates:
 * - Fetching vehicle data from Supabase using VehicleService
 * - Using AutoScout24 themed components
 * - Responsive layout with Grid and Flex
 * - Image gallery with thumbnails
 * - Tabbed interface for vehicle details
 * - Dealer information display
 * - Call-to-action buttons
 */

import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Badge,
  Divider,
  SimpleGrid,
  AspectRatio,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Spinner,
  Alert,
  ThemeProvider,
  VehicleReference,
} from './src/components';

import { VehicleService } from './src/lib/supabase';
import type { VehicleListing } from './src/lib/supabase/types';
import { formatPrice, formatMileage } from './src/lib/supabase/transforms';

interface VehicleDetailsPageProps {
  vehicleId: number;
  onContactDealer?: () => void;
  onRequestInfo?: () => void;
}

const VehicleDetailsPage: React.FC<VehicleDetailsPageProps> = ({
  vehicleId,
  onContactDealer,
  onRequestInfo,
}) => {
  const [vehicle, setVehicle] = useState<VehicleListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch vehicle data from Supabase
  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await VehicleService.getById(vehicleId);

      if (fetchError) {
        setError('Failed to load vehicle details');
        console.error('Error fetching vehicle:', fetchError);
      } else {
        setVehicle(data);
      }

      setLoading(false);
    };

    fetchVehicle();
  }, [vehicleId]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="brand.primary" />
      </Flex>
    );
  }

  if (error || !vehicle) {
    return (
      <Alert status="error" variant="left-accent">
        <Text>{error || 'Vehicle not found'}</Text>
      </Alert>
    );
  }

  // Get images or use placeholder
  const images = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images 
    : [{ key: 'https://via.placeholder.com/800x600?text=No+Image', image_order: '1' }];

  const currentImage = images[selectedImageIndex]?.key || images[0]?.key;

  // Vehicle specifications
  const keySpecs = [
    { icon: '📅', label: 'Year', value: vehicle.year || 'N/A' },
    { icon: '🛣️', label: 'Mileage', value: vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'N/A' },
    { icon: '⚡', label: 'Power', value: vehicle.horse_power ? `${vehicle.horse_power} PS` : 'N/A' },
    { icon: '⚙️', label: 'Transmission', value: vehicle.transmission || 'N/A' },
    { icon: '⛽', label: 'Fuel Type', value: vehicle.fuel_type || 'N/A' },
    { icon: '🚗', label: 'Body Type', value: vehicle.body_type || 'N/A' },
  ];

  // Sample features - in production, these would come from the database
  const features = [
    'Navigation System',
    'Leather Seats',
    'Panoramic Sunroof',
    'Parking Sensors',
    'Bluetooth',
    'Climate Control',
    'Cruise Control',
    'ABS',
    'ESP',
    'Airbags',
  ];

  return (
    <ThemeProvider theme="autoscout24">
      <Box bg="gray.50" minH="100vh" py="4">
        <Box maxW="1400px" mx="auto" px="4">
          {/* Supabase Integration Info Banner */}
          <Box
            mb="4"
            p="4"
            bgGradient="linear(to-r, purple.500, purple.700)"
            color="white"
            borderRadius="md"
            boxShadow="lg"
          >
            <Heading size="md" mb="2">
              🗄️ Live Supabase Integration
            </Heading>
            <Text fontSize="sm" opacity="0.9">
              This vehicle data is fetched from your Supabase <strong>listings-db-24jul</strong> table.
              Vehicle ID: {vehicle.id} | Using VehicleService.getById()
            </Text>
          </Box>

          {/* Main Layout Grid */}
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 400px' }}
            gap="4"
          >
            {/* Main Content */}
            <Stack spacing="4">
              {/* Image Gallery */}
              <Box bg="white" borderRadius="md" overflow="hidden" boxShadow="md">
                <Box position="relative">
                  {vehicle.status === 'reserved' && (
                    <Badge
                      position="absolute"
                      top="4"
                      left="4"
                      colorScheme="red"
                      fontSize="md"
                      px="4"
                      py="2"
                      zIndex="1"
                    >
                      Reserved
                    </Badge>
                  )}
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={currentImage}
                      alt={vehicle.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </AspectRatio>
                </Box>

                {/* Thumbnail Grid */}
                {images.length > 1 && (
                  <Box p="4" bg="gray.50">
                    <SimpleGrid columns={{ base: 4, md: 6 }} spacing="2">
                      {images.slice(0, 6).map((image, index) => (
                        <Box
                          key={image.key}
                          cursor="pointer"
                          border="2px"
                          borderColor={index === selectedImageIndex ? 'brand.primary' : 'transparent'}
                          borderRadius="sm"
                          overflow="hidden"
                          onClick={() => setSelectedImageIndex(index)}
                          transition="all 0.2s"
                          _hover={{ borderColor: 'brand.primary' }}
                        >
                          <AspectRatio ratio={4 / 3}>
                            <img
                              src={image.key}
                              alt={`View ${index + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </AspectRatio>
                        </Box>
                      ))}
                      {images.length > 6 && (
                        <Flex
                          align="center"
                          justify="center"
                          bg="gray.200"
                          borderRadius="sm"
                          fontWeight="bold"
                          color="gray.600"
                          aspectRatio={4 / 3}
                        >
                          +{images.length - 6}
                        </Flex>
                      )}
                    </SimpleGrid>
                  </Box>
                )}
              </Box>

              {/* Title Section */}
              <Box bg="white" p="6" borderRadius="md" boxShadow="md">
                <Heading size="lg" mb="2">
                  {vehicle.title}
                </Heading>
                {vehicle.description && (
                  <Text color="gray.600" mb="4">
                    {vehicle.description.substring(0, 150)}...
                  </Text>
                )}

                <Divider my="4" />

                {/* Key Specifications */}
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing="4">
                  {keySpecs.map((spec) => (
                    <Box key={spec.label}>
                      <Text fontSize="2xl" mb="1">
                        {spec.icon}
                      </Text>
                      <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                        {spec.label}
                      </Text>
                      <Text fontWeight="bold" fontSize="lg">
                        {spec.value}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Details Tabs */}
              <Box bg="white" p="6" borderRadius="md" boxShadow="md">
                <Tabs variant="enclosed" colorScheme="orange">
                  <TabList>
                    <Tab>Features</Tab>
                    <Tab>Description</Tab>
                    <Tab>Technical Data</Tab>
                  </TabList>

                  <TabPanels>
                    {/* Features Panel */}
                    <TabPanel>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="3">
                        {features.map((feature, index) => (
                          <Flex key={index} align="center" gap="2" p="2" bg="gray.50" borderRadius="sm">
                            <Text color="green.500" fontWeight="bold">
                              ✓
                            </Text>
                            <Text>{feature}</Text>
                          </Flex>
                        ))}
                      </SimpleGrid>
                    </TabPanel>

                    {/* Description Panel */}
                    <TabPanel>
                      <Text lineHeight="tall" color="gray.700">
                        {vehicle.description || 'No description available.'}
                      </Text>

                      <Box mt="4" p="4" bg="yellow.50" borderLeft="4px" borderColor="yellow.400" borderRadius="sm">
                        <Text fontSize="sm">
                          <strong>🗄️ Supabase Field:</strong> This content is loaded from the{' '}
                          <code>description</code> or <code>teaser</code> field in your database.
                        </Text>
                      </Box>
                    </TabPanel>

                    {/* Technical Data Panel */}
                    <TabPanel>
                      <Stack spacing="4">
                        <Box p="4" bg="gray.50" borderRadius="md">
                          <Heading size="sm" mb="3">
                            Engine & Performance
                          </Heading>
                          <Stack spacing="2">
                            <Flex justify="space-between">
                              <Text color="gray.600">Power</Text>
                              <Text fontWeight="bold">{vehicle.horse_power || 'N/A'} PS</Text>
                            </Flex>
                            <Flex justify="space-between">
                              <Text color="gray.600">Fuel Type</Text>
                              <Text fontWeight="bold">{vehicle.fuel_type || 'N/A'}</Text>
                            </Flex>
                            <Flex justify="space-between">
                              <Text color="gray.600">Transmission</Text>
                              <Text fontWeight="bold">{vehicle.transmission || 'N/A'}</Text>
                            </Flex>
                          </Stack>
                        </Box>

                        <Box p="4" bg="gray.50" borderRadius="md">
                          <Heading size="sm" mb="3">
                            Vehicle Information
                          </Heading>
                          <Stack spacing="2">
                            <Flex justify="space-between">
                              <Text color="gray.600">Make</Text>
                              <Text fontWeight="bold">{vehicle.make}</Text>
                            </Flex>
                            <Flex justify="space-between">
                              <Text color="gray.600">Model</Text>
                              <Text fontWeight="bold">{vehicle.model}</Text>
                            </Flex>
                            <Flex justify="space-between">
                              <Text color="gray.600">Year</Text>
                              <Text fontWeight="bold">{vehicle.year}</Text>
                            </Flex>
                            <Flex justify="space-between">
                              <Text color="gray.600">Color</Text>
                              <Text fontWeight="bold">{vehicle.color || 'N/A'}</Text>
                            </Flex>
                            <Flex justify="space-between">
                              <Text color="gray.600">Body Type</Text>
                              <Text fontWeight="bold">{vehicle.body_type || 'N/A'}</Text>
                            </Flex>
                          </Stack>
                        </Box>
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Stack>

            {/* Sidebar */}
            <Stack spacing="4">
              {/* Price Card */}
              <Box bg="white" p="6" borderRadius="md" boxShadow="md" position="sticky" top="4">
                <Heading size="2xl" color="gray.800" mb="2">
                  {formatPrice(vehicle.price) || 'Price on request'}
                </Heading>
                
                {vehicle.price && (
                  <Text fontSize="sm" color="gray.600" mb="4">
                    Monthly from CHF {Math.round((vehicle.price || 0) / 48).toLocaleString()}
                  </Text>
                )}

                {vehicle.price && (
                  <Box
                    p="4"
                    mb="4"
                    bg="blue.50"
                    borderLeft="4px"
                    borderColor="blue.400"
                    borderRadius="sm"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="blue.600">
                      From CHF {Math.round((vehicle.price || 0) / 60).toLocaleString()} / month
                    </Text>
                    <Text fontSize="xs" color="gray.600" mt="1">
                      Financing available • Calculate now
                    </Text>
                  </Box>
                )}

                <Stack spacing="3">
                  <Button
                    size="lg"
                    colorScheme="orange"
                    width="full"
                    onClick={onRequestInfo}
                  >
                    ✉️ Request Information
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    width="full"
                    onClick={onContactDealer}
                  >
                    📱 Call Dealer
                  </Button>

                  <Grid templateColumns="1fr 1fr" gap="2">
                    <Button size="md" variant="outline">
                      ⭐ Save
                    </Button>
                    <Button size="md" variant="outline">
                      📊 Compare
                    </Button>
                  </Grid>

                  <Button size="md" variant="outline" width="full">
                    💬 WhatsApp
                  </Button>
                </Stack>

                <Flex gap="2" mt="4">
                  <Badge colorScheme="green">✓ Verified</Badge>
                  <Badge colorScheme="green">✓ Warranty</Badge>
                </Flex>
              </Box>

              {/* Dealer Card */}
              <Box bg="white" p="6" borderRadius="md" boxShadow="md">
                <Box h="80px" bg="black" borderRadius="md" mb="4" display="flex" alignItems="center" justifyContent="center">
                  <Text color="white" fontWeight="bold" fontSize="lg">
                    DEALER LOGO
                  </Text>
                </Box>

                <Heading size="md" mb="2">
                  Premium Auto Dealer
                </Heading>

                <Flex align="center" gap="2" mb="4">
                  <Text color="yellow.400" fontSize="lg">
                    ★★★★★
                  </Text>
                  <Text fontWeight="bold">4.8</Text>
                  <Text color="gray.600" fontSize="sm">
                    (303 reviews)
                  </Text>
                </Flex>

                <Box p="3" bg="gray.50" borderRadius="md" mb="4">
                  <Stack spacing="2" fontSize="sm">
                    <Flex align="center" gap="2">
                      <Text>📍</Text>
                      <Text>Main Street 123, City</Text>
                    </Flex>
                    <Flex align="center" gap="2">
                      <Text>🕐</Text>
                      <Text>View opening hours</Text>
                    </Flex>
                  </Stack>
                </Box>

                <Stack spacing="2">
                  <Button colorScheme="orange" width="full">
                    Contact Dealer
                  </Button>
                  <Button variant="outline" width="full">
                    View All Vehicles
                  </Button>
                </Stack>

                <Divider my="4" />

                <Box fontSize="xs" color="gray.600">
                  <Text mb="1">🗄️ Supabase Field: <code>seller_id</code></Text>
                  <Text>Fetch via <code>VehicleService.getBySeller()</code></Text>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default VehicleDetailsPage;

/**
 * Usage Example:
 * 
 * import VehicleDetailsPage from './vehicle-details-example';
 * 
 * function App() {
 *   return (
 *     <VehicleDetailsPage
 *       vehicleId={123}
 *       onContactDealer={() => console.log('Contact dealer clicked')}
 *       onRequestInfo={() => console.log('Request info clicked')}
 *     />
 *   );
 * }
 * 
 * 
 * Advanced Usage with Router:
 * 
 * import { useParams } from 'react-router-dom';
 * 
 * function VehicleDetailsRoute() {
 *   const { id } = useParams<{ id: string }>();
 *   
 *   return (
 *     <VehicleDetailsPage
 *       vehicleId={parseInt(id, 10)}
 *       onContactDealer={() => {
 *         // Open contact modal or redirect
 *       }}
 *       onRequestInfo={() => {
 *         // Open inquiry form
 *       }}
 *     />
 *   );
 * }
 */

