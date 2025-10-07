import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Container, Flex, Heading, Link, Stack, Text, Badge, Divider } from '@chakra-ui/react';

function DemoLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Components Showcase' },
    { path: '/vehicle-details', label: 'Vehicle Details Demo' },
  ];

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" borderBottom="1px solid" borderColor="gray.200" py={4} px={4} boxShadow="sm">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Box>
              <Heading size="lg" color="orange.500" mb={1}>
                AutoScout24 Components
              </Heading>
              <Text fontSize="sm" color="gray.600">
                React Component Demos with Real Supabase Data
              </Text>
            </Box>
            <Flex gap={2} align="center">
              <Badge colorScheme="green" fontSize="sm" px={2} py={1}>
                Live Data
              </Badge>
              <Badge colorScheme="orange" fontSize="sm" px={2} py={1}>
                AutoScout24 Theme
              </Badge>
            </Flex>
          </Flex>

          <Divider my={4} />

          {/* Navigation */}
          <Stack direction="row" spacing={6} wrap="wrap">
            {navItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                fontWeight={location.pathname === item.path ? 'semibold' : 'medium'}
                color={location.pathname === item.path ? 'orange.500' : 'gray.600'}
                borderBottom={location.pathname === item.path ? '3px solid' : 'none'}
                borderColor="orange.500"
                pb={2}
                px={2}
                fontSize="md"
                _hover={{
                  color: 'orange.500',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Box py={6}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box bg="white" borderTop="1px solid" borderColor="gray.200" py={6} mt={12}>
        <Container maxW="container.xl">
          <Text textAlign="center" fontSize="sm" color="gray.600">
            © 2025 SMG Automotive Components - Built with AutoScout24 Theme
          </Text>
        </Container>
      </Box>
    </Box>
  );
}

export default DemoLayout;
