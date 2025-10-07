import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AppLayout,
  AppLayoutContent,
  AppLayoutFooter,
  AppLayoutHeader,
  ArticleTeaser,
  AutoScout24AppLogo,
  Badge,
  Box,
  BreadcrumbLink,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckmarkCircleIcon,
  DocumentCheckIcon,
  Divider,
  Grid,
  H2,
  H3,
  H4,
  Input,
  Link,
  Radio,
  RadioGroup,
  Section,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from '@smg-automotive/components';

const categoryBadges = [
  { label: 'Buttons', variant: 'navigationLinkBadge' },
  { label: 'Form Controls', variant: 'navigationLinkBadge' },
  { label: 'Data Display', variant: 'navigationLinkBadge' },
  { label: 'Navigation', variant: 'navigationLinkBadge' },
];

const cardShowcase = [
  {
    title: 'Primary CTA',
    description: 'Demonstrates the primary call-to-action button with default state.',
  },
  {
    title: 'Secondary CTA',
    description: 'Secondary button styling for complementary actions.',
  },
  {
    title: 'Ghost CTA',
    description: 'Transparent button used on emphasised backgrounds.',
  },
];

const ComponentsShowcase: React.FC = () => {
  const toast = useToast();

  return (
    <AppLayout bg="gray.50">
      <AppLayoutHeader borderBottom="1px" borderColor="gray.200" bg="white">
        <Box paddingY="xl">
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'auto 1fr auto' }} gap="lg" alignItems="center">
            <AutoScout24AppLogo boxSize="48px" />
            <Stack spacing="xs">
              <H2>AutoScout24 Components Showcase</H2>
              <Text color="gray.600">
                Reference layouts and interactive blocks using the production design system.
              </Text>
            </Stack>
            <Stack direction="row" gap="sm" flexWrap="wrap" justifyContent="flex-end">
              {categoryBadges.map((badge) => (
                <Badge key={badge.label} variant={badge.variant} text={badge.label} />
              ))}
            </Stack>
          </Grid>
        </Box>
      </AppLayoutHeader>

      <AppLayoutContent>
        <Box paddingY="5xl" paddingX={{ base: 'lg', md: '5xl' }}>
          <Stack spacing="5xl">
            <Stack spacing="xl">
              <Section
                variant="hero"
                title="Build immersive experiences faster"
                text="Every component in this showcase is rendered using the production AutoScout24 theme. Reuse layout, typography and surface patterns to keep products consistent."
                image={
                  <ArticleTeaser
                    title="Design once, scale everywhere"
                    text="Explore ready-made templates, copy guidelines and accessibility guardrails in our documentation."
                    url="https://design.autoscout24.com"
                    imageUrl="https://images.unsplash.com/photo-1519648023493-d82b5f8d7fd9?auto=format&fit=crop&w=1200&q=80"
                    maxImgW="4xl"
                  />
                }
              />
            </Stack>

            <Box bg="white" borderRadius="md" boxShadow="base" padding="3xl">
              <Stack spacing="xl">
                <Stack spacing="xs">
                  <H3>Core call to actions</H3>
                  <Text color="gray.600">
                    Buttons ship with responsive sizing and proper focus outlines. Use <code>variant="primary"</code> for the dominant action and keep alternatives minimal.
                  </Text>
                </Stack>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing="lg">
                  {cardShowcase.map((card) => (
                    <Card key={card.title} height="full" border="1px solid" borderColor="gray.100">
                      <CardHeader>
                        <H4>{card.title}</H4>
                      </CardHeader>
                      <CardBody>
                        <Stack spacing="lg">
                          <Text color="gray.600">{card.description}</Text>
                          <Stack direction="row" gap="md">
                            <Button
                              onClick={() =>
                                toast({
                                  type: 'success',
                                  title: card.title,
                                  description: 'Primary action executed successfully.',
                                })
                              }
                            >
                              Primary
                            </Button>
                            <Button variant="secondary">Secondary</Button>
                          </Stack>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>

                <Divider />

                <Stack direction={{ base: 'column', lg: 'row' }} spacing="4xl">
                  <Stack spacing="md" flex="1">
                    <H4>Form pattern</H4>
                    <Text color="gray.600">
                      Group labels and inputs consistently. Use <code>Stack</code> for spacing and include helper text when necessary.
                    </Text>
                    <Stack spacing="md">
                      <Input placeholder="Vehicle model" name="model" />
                      <Select
                        name="make"
                        placeholder="Select make"
                        options={[
                          { value: 'bmw', label: 'BMW' },
                          { value: 'audi', label: 'Audi' },
                          { value: 'mercedes', label: 'Mercedes-Benz' },
                        ]}
                      />
                      <Textarea placeholder="Additional notes" rows={4} />
                    </Stack>
                  </Stack>

                  <Stack spacing="lg" flex="1">
                    <H4>Choices</H4>
                    <Text color="gray.600">
                      Use switches for binary preferences and radio groups when options are mutually exclusive. Tooltips reinforce context.
                    </Text>
                    <Stack spacing="md">
                      <Stack direction="row" alignItems="center" gap="sm">
                        <Switch defaultChecked id="notify" />
                        <Tooltip label="Send alerts when the listing changes">
                          <Text>Notifications enabled</Text>
                        </Tooltip>
                      </Stack>
                      <Divider />
                      <RadioGroup defaultValue="auto">
                        <Stack spacing="sm">
                          <Radio value="auto">Automatic</Radio>
                          <Radio value="manual">Manual</Radio>
                          <Radio value="any" isDisabled>
                            Any transmission
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Box>

            <Box bg="white" borderRadius="md" boxShadow="base" padding="3xl">
              <Stack spacing="xl">
                <Stack spacing="xs">
                  <H3>Information surfaces</H3>
                  <Text color="gray.600">
                    Combine cards, tabs and badges to present structured content. Use <code>Stack</code> to manage responsive spacing.
                  </Text>
                </Stack>

                <Tabs variant="enclosed">
                  <TabList>
                    <Tab>Cards</Tab>
                    <Tab>Accordions</Tab>
                    <Tab>Skeletons</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="lg">
                        <Card border="1px solid" borderColor="gray.100">
                          <CardHeader>
                            <Stack direction="row" alignItems="center" gap="sm">
                              <CheckmarkCircleIcon boxSize="20px" color="brand.primary" />
                              <H4>Vehicle condition</H4>
                            </Stack>
                          </CardHeader>
                          <CardBody>
                            <Text color="gray.600">
                              Highlight key selling points with concise bullet points and supporting icons.
                            </Text>
                          </CardBody>
                        </Card>
                        <Card border="1px solid" borderColor="gray.100">
                          <CardHeader>
                            <Stack direction="row" alignItems="center" gap="sm">
                              <DocumentCheckIcon boxSize="20px" color="brand.primary" />
                              <H4>Documentation</H4>
                            </Stack>
                          </CardHeader>
                          <CardBody>
                            <Text color="gray.600">
                              Communicate regulatory or compliance information with clear CTA links to detail pages.
                            </Text>
                            <Link href="#" variant="baseLink" aria-label="View registration history">
                              View registration history
                            </Link>
                          </CardBody>
                        </Card>
                      </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                      <Stack spacing="md">
                        <Stack spacing="xs">
                          <H4>Frequently asked</H4>
                          <Text color="gray.600">Use accordions for grouped FAQs or contextual help.</Text>
                        </Stack>
                        <Stack spacing="sm">
                          {['Finance options', 'Delivery timeline', 'Warranty coverage'].map((item) => (
                            <Accordion key={item} allowToggle border="0" boxShadow="sm" borderRadius="sm">
                              <AccordionItem>
                                <AccordionButton paddingY="md" paddingX="lg">
                                  <Box flex="1" textAlign="left">
                                    <Text fontWeight="bold">{item}</Text>
                                  </Box>
                                </AccordionButton>
                                <AccordionPanel paddingX="lg" paddingBottom="lg">
                                  <Text color="gray.600">
                                    Provide actionable details, link to relevant tools, and keep copy direct.
                                  </Text>
                                </AccordionPanel>
                              </AccordionItem>
                            </Accordion>
                          ))}
                        </Stack>
                      </Stack>
                    </TabPanel>
                    <TabPanel>
                      <Stack spacing="md">
                        <Text color="gray.600">
                          Placeholder states help maintain layout stability while content loads.
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="lg">
                          {[0, 1, 2].map((index) => (
                            <Card key={index} padding="lg">
                              <Skeleton height="20px" width="60%" borderRadius="sm" />
                              <Skeleton height="14px" width="90%" marginTop="sm" borderRadius="sm" />
                              <Skeleton height="14px" width="70%" marginTop="xs" borderRadius="sm" />
                            </Card>
                          ))}
                        </SimpleGrid>
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Stack>
            </Box>

            <Box bg="white" borderRadius="md" boxShadow="base" padding="3xl">
              <Stack spacing="xl">
                <Stack spacing="xs">
                  <H3>Navigation primitives</H3>
                  <Text color="gray.600">
                    Breadcrumbs reinforce hierarchy while action buttons keep secondary tasks accessible.
                  </Text>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing="lg">
                  <Breadcrumbs>
                    <BreadcrumbsItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem>
                      <BreadcrumbLink href="#">Inventory</BreadcrumbLink>
                    </BreadcrumbsItem>
                    <BreadcrumbsItem isCurrentPage>
                      <BreadcrumbLink href="#">Listing</BreadcrumbLink>
                    </BreadcrumbsItem>
                  </Breadcrumbs>
                  <Stack direction="row" gap="md">
                    <Button variant="secondary">Back to overview</Button>
                    <Button
                      onClick={() =>
                        toast({
                          type: 'success',
                          title: 'Listing published',
                          description: 'The vehicle is now visible in search results.',
                        })
                      }
                    >
                      Publish listing
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </AppLayoutContent>

      <AppLayoutFooter bg="gray.900" color="white">
        <Box paddingY="lg" textAlign="center">
          <Text fontSize="sm" color="gray.300">
            © {new Date().getFullYear()} AutoScout24 Design System. Crafted with the SMG Automotive component library.
          </Text>
        </Box>
      </AppLayoutFooter>
    </AppLayout>
  );
};

export default ComponentsShowcase;
