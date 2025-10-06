import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Text } from '@chakra-ui/react';
import Button from '../button';
import SimpleGrid from '../simpleGrid';
import VehicleReference from '../vehicleReference';
import { ThemeProvider } from '../themeProvider';

const meta: Meta = {
  title: 'Debug/ComponentImports',
  decorators: [
    (Story) => (
      <ThemeProvider theme="autoscout24">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/**
 * Test if Button component loads
 */
export const TestButton: Story = {
  render: () => (
    <Box p="lg">
      <Button onClick={() => alert('clicked')}>
        Test Button
      </Button>
    </Box>
  ),
};

/**
 * Test if SimpleGrid loads
 */
export const TestSimpleGrid: Story = {
  render: () => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="md">
      <Box bg="gray.100" p="md">Item 1</Box>
      <Box bg="gray.100" p="md">Item 2</Box>
      <Box bg="gray.100" p="md">Item 3</Box>
    </SimpleGrid>
  ),
};

/**
 * Test if VehicleReference loads
 */
export const TestVehicleReference: Story = {
  render: () => (
    <VehicleReference
      vehicleTitle="2020 BMW 3 Series"
      price="€ 45,000"
      sellerName="50,000 km"
      sellerAddress="diesel • automatic"
    />
  ),
};

/**
 * Test environment variables
 */
export const TestEnvVars: Story = {
  render: () => (
    <Box p="lg">
      <Text fontWeight="bold">Environment Variables:</Text>
      <Text>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Not set'}</Text>
      <Text>SUPABASE_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set'}</Text>
    </Box>
  ),
};

