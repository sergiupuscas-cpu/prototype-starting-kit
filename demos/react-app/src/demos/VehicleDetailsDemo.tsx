import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Spinner,
  Center,
  Grid,
  HStack,
  VStack,
  Flex,
  Icon,
} from '@chakra-ui/react';

import supabase from '../../../../src/lib/supabase/client';
import {
  CallIcon,
  MessageIcon,
  LocationPinIcon,
  CalendarIcon,
  CarIcon,
  RoadIcon,
  TransmissionIcon,
  StarIcon,
  VehiclePowerIcon,
} from '../../../../src/components/icons';

import {
  HeaderNavigation,
  H1 as Heading,
  Text,
  Stack,
  SimpleGrid,
  Button,
  Badge,
  Divider,
  Card,
  CardBody,
  Carousel,
} from '../../../../src/components';

import { Listing, ListingImage } from '../../../../src/lib/supabase/types';

// Icon components using existing icons
const PhoneIcon = () => <Icon as={CallIcon} boxSize={5} />;
const EmailIcon = () => <Icon as={MessageIcon} boxSize={5} />;
const LocationIcon = () => <Icon as={LocationPinIcon} boxSize={5} />;
const CalendarIconComponent = () => <Icon as={CalendarIcon} boxSize={5} />;
const SpeedometerIcon = () => <Icon as={CarIcon} boxSize={5} />;
const FuelIcon = () => <Icon as={RoadIcon} boxSize={5} />;
const GearIcon = () => <Icon as={TransmissionIcon} boxSize={5} />;
const PaletteIcon = () => <Text as="span" fontSize="xl">🎨</Text>; // Keep this as emoji for now
const DoorIcon = () => <Text as="span" fontSize="xl">🚪</Text>; // Keep this as emoji for now
const SeatIcon = () => <Text as="span" fontSize="xl">💺</Text>; // Keep this as emoji for now
const StarIconComponent = () => <Icon as={StarIcon} boxSize={5} />;
const PowerIcon = () => <Icon as={VehiclePowerIcon} boxSize={5} />;

type Vehicle = Listing & { images: ListingImage[] };

function VehicleDetailsDemo() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVehicle() {
      setLoading(true);

      if (!id) {
        setLoading(false);
        return;
      }

      const { data: vehicleData, error: vehicleError } = await supabase
        .from('listings-db-24jul')
        .select('*')
        .eq('id', id)
        .single();

      if (vehicleError || !vehicleData) {
        console.error('Error fetching vehicle:', vehicleError);
        setVehicle(null);
        setLoading(false);
        return;
      }

      const { data: imagesData, error: imagesError } = await supabase
        .from('images')
        .select('key')
        .eq('listing_id', id);

      if (imagesError) {
        console.error('Error fetching images:', imagesError);
      }

      setVehicle({ ...vehicleData, images: imagesData || [] });
      setLoading(false);
    }

    loadVehicle();
  }, [id]);

  if (loading) {
    return (
      <Container maxW="container.xl">
        <Center py={20}>
          <Stack align="center" spacing={4}>
            <Spinner size="xl" color="orange.500" thickness="4px" />
            <Text color="gray.600">Loading vehicle data from Supabase...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (!vehicle) {
    return (
      <Container maxW="container.xl">
        <Center py={20}>
          <Stack align="center" spacing={4}>
            <Heading size="lg" color="gray.600">
              No Vehicle Found
            </Heading>
            <Text color="gray.500">
              Unable to load vehicle data. Make sure your Supabase connection is configured.
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <>
      <HeaderNavigation />
      <Container maxW="container.xl" py={6}>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          {/* Left Column - Main Content */}
          <Stack spacing={6}>
            {/* Vehicle Title & Price */}
            <Card>
              <CardBody>
                <Flex justify="space-between" align="start" mb={4}>
                  <Box flex="1">
                    <Heading size="xl" mb={2} color="gray.800">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </Heading>
                    <HStack spacing={2} mb={3} flexWrap="wrap">
                      <Badge colorScheme="gray" fontSize="sm">{vehicle.condition}</Badge>
                      <Badge colorScheme="blue" fontSize="sm">{vehicle.fuelType}</Badge>
                      <Badge colorScheme="purple" fontSize="sm">{vehicle.transmission}</Badge>
                      {vehicle.energyLabel && (
                        <Badge colorScheme="green" fontSize="sm">Energy: {vehicle.energyLabel}</Badge>
                      )}
                    </HStack>
                  </Box>
                  <VStack align="end" spacing={0}>
                    <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                      €{vehicle.price.toLocaleString()}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      VAT deductible
                    </Text>
                  </VStack>
                </Flex>

                <Text color="gray.600" mb={4}>
                  {vehicle.description}
                </Text>

                <Divider my={4} />

                {/* Quick Info */}
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <SpeedometerIcon />
                      <Text fontSize="sm" color="gray.500">Mileage</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.mileage.toLocaleString()} km</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <CalendarIconComponent />
                      <Text fontSize="sm" color="gray.500">Year</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.year}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <FuelIcon />
                      <Text fontSize="sm" color="gray.500">Fuel</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.fuelType}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <GearIcon />
                      <Text fontSize="sm" color="gray.500">Transmission</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.transmission}</Text>
                  </VStack>
                </SimpleGrid>
              </CardBody>
            </Card>

            {/* Images Gallery */}
            <Card>
              <CardBody>
                <Heading size="md" mb={4}>Vehicle Images</Heading>
                {vehicle.images.length > 0 ? (
                  <Carousel>
                    {vehicle.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.key}
                        alt={`${vehicle.make_key} ${vehicle.model_key} - ${index + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: 'md',
                        }}
                      />
                    ))}
                  </Carousel>
                ) : (
                  <Box bg="gray.50" p={12} borderRadius="md" textAlign="center">
                    <Text color="gray.400">No images available</Text>
                  </Box>
                )}
              </CardBody>
            </Card>

            {/* Technical Specifications */}
            <Card>
              <CardBody>
                <Heading size="md" mb={4}>Technical Specifications</Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <PowerIcon />
                      <Text fontSize="sm" color="gray.500">Power</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.specifications.power}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <PaletteIcon />
                      <Text fontSize="sm" color="gray.500">Color</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.specifications.color}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <DoorIcon />
                      <Text fontSize="sm" color="gray.500">Doors</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.specifications.doors}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <SeatIcon />
                      <Text fontSize="sm" color="gray.500">Seats</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.specifications.seats}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <SpeedometerIcon />
                      <Text fontSize="sm" color="gray.500">Body Type</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.specifications.bodyType}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={2}>
                      <FuelIcon />
                      <Text fontSize="sm" color="gray.500">CO₂ Emissions</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.specifications.co2Emissions}</Text>
                  </VStack>
                  <VStack align="start" spacing={1} gridColumn="1 / -1">
                    <HStack spacing={2}>
                      <FuelIcon />
                      <Text fontSize="sm" color="gray.500">Fuel Consumption</Text>
                    </HStack>
                    <Text fontWeight="semibold">{vehicle.specifications.fuelConsumption}</Text>
                  </VStack>
                </Grid>
              </CardBody>
            </Card>
          </Stack>

          {/* Right Column - Sidebar */}
          <Stack spacing={6}>
            {/* Contact Actions */}
            <Card>
              <CardBody>
                <Stack spacing={3}>
                  <Button colorScheme="orange" size="lg" width="full" leftIcon={<Icon as={CallIcon} />}>
                    Contact Dealer
                  </Button>
                  <Button variant="outline" colorScheme="orange" size="md" width="full">
                    Request Info
                  </Button>
                  <Button variant="outline" colorScheme="gray" size="md" width="full">
                    Save Favorite
                  </Button>
                  <Button variant="ghost" colorScheme="gray" size="md" width="full">
                    Share Vehicle
                  </Button>
                </Stack>
              </CardBody>
            </Card>

            {/* Dealer Information */}
            {vehicle.dealer && (
              <Card>
                <CardBody>
                  <Heading size="sm" mb={4}>Dealer Information</Heading>
                  <VStack align="stretch" spacing={3}>
                    <Box>
                      <Text fontWeight="bold" fontSize="lg">
                        {/* Placeholder for dealer name */}
                        Prestige Motors
                      </Text>
                      <HStack spacing={1} mt={1}>
                        <Icon as={StarIcon} color="orange.400" />
                        <Text fontWeight="semibold" color="orange.500">
                          {/* Placeholder for rating */}
                          4.8
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {/* Placeholder for review count */}
                          (120 reviews)
                        </Text>
                      </HStack>
                    </Box>
                    <Divider />
                    <VStack align="start" spacing={2}>
                      <HStack spacing={2}>
                        <Icon as={LocationPinIcon} />
                        <Text fontSize="sm">
                          {/* Placeholder for location */}
                          123 Luxury Lane, Car City
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={CallIcon} />
                        <Text fontSize="sm" color="orange.500" fontWeight="medium">
                          {/* Placeholder for phone */}
                          +1 234 567 890
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={MessageIcon} />
                        <Text fontSize="sm" color="blue.500">
                          {/* Placeholder for email */}
                          contact@prestigemotors.com
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            )}

            {/* Live Data Info */}
            <Card bg="orange.50" borderColor="orange.200" borderWidth="2px">
              <CardBody>
                <HStack spacing={3} align="start">
                  <Text fontSize="2xl">🗄️</Text>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="sm" color="orange.800">
                      Real-Time Supabase Data
                    </Text>
                    <Text fontSize="xs" color="orange.700">
                      This vehicle is loaded from your live database
                    </Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Stack>
        </Grid>
      </Container>
    </>
  );
}

export default VehicleDetailsDemo;
