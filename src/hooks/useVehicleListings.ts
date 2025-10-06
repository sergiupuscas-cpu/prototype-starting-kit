import { useState, useEffect, useCallback } from 'react';
import { VehicleService } from '../lib/supabase';
import type {
  VehicleListing,
  VehicleFilters,
  VehicleSortField,
  VehicleSortOrder,
} from '../lib/supabase';

interface UseVehicleListingsOptions {
  filters?: VehicleFilters;
  sortField?: VehicleSortField;
  sortOrder?: VehicleSortOrder;
  limit?: number;
  autoFetch?: boolean;
}

interface UseVehicleListingsReturn {
  listings: VehicleListing[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

/**
 * Hook to fetch and manage vehicle listings
 */
export const useVehicleListings = (
  options: UseVehicleListingsOptions = {}
): UseVehicleListingsReturn => {
  const {
    filters,
    sortField = 'created_at',
    sortOrder = 'desc',
    limit = 20,
    autoFetch = true,
  } = options;

  const [listings, setListings] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchListings = useCallback(
    async (currentOffset: number, append = false) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = filters
          ? await VehicleService.getFiltered(
              filters,
              sortField,
              sortOrder,
              limit,
              currentOffset
            )
          : await VehicleService.getAll(limit, currentOffset);

        if (fetchError) {
          throw new Error(fetchError.message || 'Failed to fetch listings');
        }

        if (data) {
          setListings((prev) => (append ? [...prev, ...data] : data));
          setHasMore(data.length === limit);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('An unknown error occurred')
        );
      } finally {
        setLoading(false);
      }
    },
    [filters, sortField, sortOrder, limit]
  );

  const refresh = useCallback(async () => {
    setOffset(0);
    await fetchListings(0, false);
  }, [fetchListings]);

  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      await fetchListings(newOffset, true);
    }
  }, [fetchListings, loading, hasMore, offset, limit]);

  useEffect(() => {
    if (autoFetch) {
      refresh();
    }
  }, [autoFetch, refresh]);

  return {
    listings,
    loading,
    error,
    refresh,
    loadMore,
    hasMore,
  };
};

/**
 * Hook to fetch a single vehicle listing by ID
 */
export const useVehicleListing = (id: number | null) => {
  const [listing, setListing] = useState<VehicleListing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchListing = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await VehicleService.getById(id);

      if (fetchError) {
        throw new Error(fetchError.message || 'Failed to fetch listing');
      }

      setListing(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred')
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  return {
    listing,
    loading,
    error,
    refresh: fetchListing,
  };
};

/**
 * Hook to search vehicle listings
 */
export const useVehicleSearch = (searchTerm: string, limit = 20) => {
  const [listings, setListings] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const searchListings = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setListings([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await VehicleService.search(
          searchTerm,
          limit
        );

        if (fetchError) {
          throw new Error(fetchError.message || 'Failed to search listings');
        }

        setListings(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('An unknown error occurred')
        );
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(searchListings, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, limit]);

  return {
    listings,
    loading,
    error,
  };
};

