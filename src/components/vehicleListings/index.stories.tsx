import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import VehicleListingsGrid from './VehicleListingsGrid';
import { ThemeProvider } from '../themeProvider';

const meta: Meta<typeof VehicleListingsGrid> = {
  title: 'Components/VehicleListingsGrid',
  component: VehicleListingsGrid,
  decorators: [
    (Story) => (
      <ThemeProvider theme="autoscout24">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof VehicleListingsGrid>;

/**
 * Default vehicle listings grid
 * Note: This requires Supabase to be configured with the NEXT_PUBLIC_SUPABASE_URL
 * and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables
 */
export const Default: Story = {
  args: {},
};

/**
 * Vehicle listings grid with filters
 */
export const WithFilters: Story = {
  args: {
    filters: {
      make: 'bmw',
      minYear: 2015,
      maxYear: 2024,
    },
  },
};

/**
 * Vehicle listings grid with custom columns
 */
export const CustomColumns: Story = {
  args: {
    columns: { base: 1, sm: 1, md: 2, lg: 3 },
  },
};

/**
 * Vehicle listings grid with click handler
 */
export const WithClickHandler: Story = {
  args: {
    onVehicleClick: (id: number) => {
      console.log('Vehicle clicked:', id);
      alert(`Vehicle clicked: ${id}`);
    },
  },
};

