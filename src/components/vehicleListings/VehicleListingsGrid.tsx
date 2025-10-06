import React, { FC } from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import Button from '../button';
import SimpleGrid from '../simpleGrid';
import VehicleReference from '../vehicleReference';
import { useVehicleListings } from '../../hooks/useVehicleListings';
import type { VehicleFilters } from '../../lib/supabase';

interface VehicleListingsGridProps {
  filters?: VehicleFilters;
  columns?: { base?: number; sm?: number; md?: number; lg?: number };
  onVehicleClick?: (id: number) => void;
}

/**
 * Grid component to display vehicle listings from Supabase
 */
const VehicleListingsGrid: FC<VehicleListingsGridProps> = ({
  filters,
  columns = { base: 1, sm: 2, md: 3, lg: 4 },
  onVehicleClick,
}) => {
  const { listings, loading, error, loadMore, hasMore } = useVehicleListings({
    filters,
    limit: 12,
  });

  if (loading && listings.length === 0) {
    return (
      <Box textAlign="center" py="2xl">
        <Spinner size="xl" />
        <Text mt="md">Loading vehicles...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py="2xl">
        <Text color="red.500" fontSize="lg">
          Error loading vehicles: {error.message}
        </Text>
        <Text mt="sm" color="gray.600">
          Please check your Supabase configuration and try again.
        </Text>
      </Box>
    );
  }

  if (listings.length === 0) {
    return (
      <Box textAlign="center" py="2xl">
        <Text fontSize="lg" color="gray.600">
          No vehicles found
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <SimpleGrid columns={columns} spacing="lg">
        {listings.map((listing) => {
          const priceDisplay = listing.price 
            ? `€ ${listing.price.toLocaleString()}` 
            : null;
          
          const mileageDisplay = listing.mileage 
            ? `${listing.mileage.toLocaleString()} km` 
            : null;

          return (
            <Box
              key={listing.id}
              onClick={() => onVehicleClick?.(listing.id)}
              cursor={onVehicleClick ? 'pointer' : 'default'}
              transition="transform 0.2s"
              _hover={
                onVehicleClick
                  ? {
                      transform: 'translateY(-4px)',
                    }
                  : undefined
              }
            >
              <VehicleReference
                image={
                  listing.primary_image ? (
                    <img
                      src={listing.primary_image}
                      alt={listing.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : undefined
                }
                vehicleTitle={listing.title}
                price={priceDisplay}
                sellerName={mileageDisplay}
                sellerAddress={
                  listing.fuel_type && listing.transmission
                    ? `${listing.fuel_type} • ${listing.transmission}`
                    : listing.fuel_type || listing.transmission || undefined
                }
              />
            </Box>
          );
        })}
      </SimpleGrid>

      {hasMore && (
        <Box textAlign="center" mt="xl">
          <Button
            onClick={loadMore}
            isDisabled={loading}
          >
            {loading ? 'Loading more...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VehicleListingsGrid;

