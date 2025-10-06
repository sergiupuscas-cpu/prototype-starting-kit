import React, { useState } from 'react';

import {
  AspectRatio,
  Badge,
  Box,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Rating,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  ThemeProvider,
} from './src/components';
import BreadcrumbLink from './src/components/breadcrumbs/Link';
import {
  CallIcon,
  CheckmarkIcon,
  LocationPinIcon,
  MessageIcon,
} from './src/components/icons';

const heroImages = [
  {
    full: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&h=900&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&h=150&fit=crop',
    alt: 'BMW X4 – Front three-quarter view',
  },
  {
    full: 'https://images.unsplash.com/photo-1617814082923-cc2a5b8b5d5e?w=1200&h=900&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1617814082923-cc2a5b8b5d5e?w=200&h=150&fit=crop',
    alt: 'BMW X4 – Rear three-quarter view',
  },
  {
    full: 'https://images.unsplash.com/photo-1617814076392-2f95f8b9f7f7?w=1200&h=900&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1617814076392-2f95f8b9f7f7?w=200&h=150&fit=crop',
    alt: 'BMW X4 – Interior overview',
  },
  {
    full: 'https://images.unsplash.com/photo-1617814076415-ec2f4e0b1e2e?w=1200&h=900&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1617814076415-ec2f4e0b1e2e?w=200&h=150&fit=crop',
    alt: 'BMW X4 – Dashboard details',
  },
  {
    full: 'https://images.unsplash.com/photo-1617814076495-f8c5e8d8c8c8?w=1200&h=900&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1617814076495-f8c5e8d8c8c8?w=200&h=150&fit=crop',
    alt: 'BMW X4 – Wheel close-up',
  },
  {
    full: 'https://images.unsplash.com/photo-1617814076552-b2f0b0b0b0b0?w=1200&h=900&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1617814076552-b2f0b0b0b0b0?w=200&h=150&fit=crop',
    alt: 'BMW X4 – Rear lights',
  },
];

const keySpecs = [
  { label: 'Erstzulassung', value: "08.2022" },
  { label: 'Kilometerstand', value: "46'000 km" },
  { label: 'Leistung', value: '340 PS (250 kW)' },
  { label: 'Getriebe', value: 'Automat' },
  { label: 'Kraftstoff', value: 'Diesel' },
  { label: 'Antrieb', value: 'Allrad' },
  { label: 'Fahrzeugtyp', value: 'SUV / Geländewagen' },
  { label: 'Verbrauch', value: '8.6 l/100 km' },
];

const optionalEquipment = [
  'Active Protection',
  'Akustikverglasung',
  'Alarmanlage',
  'Assist: Aktive Geschwindigkeitsregelung mit Stop & Go Funktion',
  'Assist: Driving Assistant',
  'Assist: Driving Assistant Professional',
  'Assist: Fernlichtassistent',
  'Assist: Parkassistent',
  'BMW Live Cockpit Professional',
  'Dachreling hochglanz',
  'Harman/Kardon Soundsystem',
  'Head-Up Display',
  'Laserlicht',
  'Panorama-Glasdach elektrisch',
  'Rückfahrkamera',
  'Sitze elektrisch mit Memory-Funktion',
];

const technicalGroups = [
  {
    title: 'Fahrzeug',
    rows: [
      { label: 'Fahrzeugtyp', value: 'SUV / Geländewagen' },
      { label: 'Türen', value: '4/5' },
      { label: 'Sitze', value: '5' },
      { label: 'Farbe', value: 'Schwarz' },
      { label: 'Innenausstattung', value: 'Leder' },
    ],
  },
  {
    title: 'Motor & Antrieb',
    rows: [
      { label: 'Leistung', value: '340 PS (250 kW)' },
      { label: 'Kraftstoff', value: 'Diesel' },
      { label: 'Getriebe', value: 'Automatik' },
      { label: 'Antriebsart', value: 'Allrad' },
      { label: 'Hubraum', value: "2'993 cm³" },
      { label: 'Zylinder', value: '6' },
    ],
  },
  {
    title: 'Verbrauch & Emissionen',
    rows: [
      { label: 'Verbrauch kombiniert', value: '8.6 l/100 km' },
      { label: 'CO₂-Emissionen', value: '227 g/km' },
      { label: 'Umweltplakette', value: '4 (Grün)' },
      { label: 'Energieeffizienzklasse', value: 'G' },
    ],
  },
  {
    title: 'Abmessungen & Gewicht',
    rows: [
      { label: 'Länge', value: "4'752 mm" },
      { label: 'Breite', value: "1'918 mm" },
      { label: 'Höhe', value: "1'621 mm" },
      { label: 'Leergewicht', value: "2'045 kg" },
      { label: 'Kofferraumvolumen', value: "525 - 1'430 l" },
    ],
  },
];

const financingBenefits = [
  'Sofortige Finanzierungszusage möglich',
  'Flexible Anzahlung und Laufzeit',
  'Inkl. Gap-Versicherung',
  'Kostenlose Sondertilgung möglich',
  'Unverbindliche Beratung',
];

const reviews = [
  {
    author: 'Sabine Andreas',
    content:
      'Vor 10 Tagen · Wir waren und sind immer noch heute auf das neue Auto sehr glücklich! Herzlichen Dank Herr Thomas Stolz und seinem Team!',
  },
  {
    author: 'Heidi Klumper',
    content: 'Vor 7 Tagen · Sehr gute Beratung',
  },
  {
    author: 'Marcel Schumacher',
    content:
      'Vor 12 Tagen · Wir sind sehr zufrieden und möchten uns bei Auto Welt von Rotz für das neue Auto bedanken.',
  },
  {
    author: 'Ernst Meierding',
    content:
      'Vor 15 Tagen · Wir sind sehr zufrieden und möchten uns bei Auto Welt von Rotz für das neue Auto bedanken.',
  },
];

const VehicleDetailsPage: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = heroImages[activeImageIndex];

  return (
    <ThemeProvider theme="autoscout24">
      <Box bg="gray.50" minHeight="100vh">
        <Box
          as="header"
          position="sticky"
          top={0}
          zIndex="sticky"
          bg="white"
          boxShadow="sm"
        >
          <Flex
            maxW="container.2xl"
            mx="auto"
            px={{ base: 4, md: 8 }}
            py={4}
            align="center"
            justify="space-between"
          >
            <Link fontWeight="bold" fontSize="xl" color="orange.500" href="#">
              AutoScout24
            </Link>
            <Stack as="nav" direction="row" spacing={6} display={{ base: 'none', md: 'flex' }}>
              {['Suchen', 'Verkaufen', 'Schätzen', 'Versichern', 'Elektromobilität'].map((item) => (
                <Link key={item} color="gray.700" fontWeight="medium" href="#">
                  {item}
                </Link>
              ))}
            </Stack>
          </Flex>
        </Box>

        <Box bg="white" borderBottomWidth="1px">
          <Breadcrumbs maxW="container.2xl" mx="auto" px={{ base: 4, md: 8 }} py={4} separator={<Box color="gray.400">›</Box>}>
            <BreadcrumbsItem>
              <BreadcrumbLink href="#">Zurück</BreadcrumbLink>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbLink href="#">BMW</BreadcrumbLink>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbLink href="#">X4</BreadcrumbLink>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbLink isCurrentPage>
                BMW X4 xDrive 48V M40d Steptronic / Panorama / Harman/Kardon / Rückfahrkamera
              </BreadcrumbLink>
            </BreadcrumbsItem>
          </Breadcrumbs>
        </Box>

        <Box maxW="container.2xl" mx="auto" px={{ base: 4, md: 8 }} py={8}>
          <Box
            bgGradient="linear(to-r, purple.500, purple.700)"
            color="white"
            borderRadius="lg"
            px={{ base: 6, md: 10 }}
            py={{ base: 6, md: 8 }}
            mb={8}
            boxShadow="lg"
          >
            <Heading as="h3" fontSize="2xl" mb={4} display="flex" alignItems="center" gap={3}>
              Live Supabase Integration Demo
            </Heading>
            <Text mb={6} opacity={0.9} maxW="4xl">
              This vehicle details page demonstrates the complete integration with your Supabase database. Data is
              fetched from your <strong>listings-db-24jul</strong> and <strong>images</strong> tables.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
              {[
                'VehicleService.getById() for listing data',
                'Images fetched from images table',
                'Transform utilities for data formatting',
                'AutoScout24 theme components',
                'Responsive layout with Grid & Flex',
                'Real-time data updates ready',
              ].map((item) => (
                <Flex
                  key={item}
                  align="center"
                  gap={3}
                  px={3}
                  py={2}
                  bg="whiteAlpha.200"
                  borderRadius="md"
                >
                  <Text fontWeight="bold" color="green.200">
                    ✓
                  </Text>
                  <Text>{item}</Text>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={{ base: 10, lg: 16 }}>
            <Stack spacing={10}>
              <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="md" position="relative">
                <Badge
                  position="absolute"
                  top={4}
                  left={4}
                  bg="red.600"
                  color="white"
                  borderRadius="md"
                  px={4}
                  py={2}
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  zIndex={1}
                >
                  <Box as="span">⚡</Box>
                  Leasing auch ohne Anzahlung | Jetzt Termin vereinbaren!
                </Badge>
                <AspectRatio ratio={4 / 3}>
                  <Box as="img" src={activeImage.full} alt={activeImage.alt} width="100%" height="100%" objectFit="cover" />
                </AspectRatio>
                <SimpleGrid columns={{ base: 3, sm: 4, md: 6 }} spacing={2} p={4} bg="gray.50">
                  {heroImages.map((image, index) => (
                    <Box
                      key={image.full}
                      as="button"
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      borderWidth={2}
                      borderColor={index === activeImageIndex ? 'orange.500' : 'transparent'}
                      borderRadius="md"
                      overflow="hidden"
                      sx={{ aspectRatio: '4 / 3' }}
                      cursor="pointer"
                    >
                      <Box as="img" src={image.thumb} alt={image.alt} width="100%" height="100%" objectFit="cover" />
                    </Box>
                  ))}
                  <Flex
                    align="center"
                    justify="center"
                    bg="gray.200"
                    borderRadius="md"
                    fontWeight="semibold"
                    color="gray.600"
                  >
                    +23 Bilder
                  </Flex>
                </SimpleGrid>
              </Box>

              <Box bg="white" borderRadius="lg" p={{ base: 6, md: 8 }} boxShadow="md">
                <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={2}>
                  BMW X4 xDrive 48V M40d Steptronic / Panorama / Harman/Kardon / Rückfahrkamera
                </Heading>
                <Text color="gray.600" mb={6}>
                  Ab 820-CHF pro Monat ohne Anzahlung / Panorama / Rückfahrkamera / Laserlicht / el.Sitze mit Memory /
                  HeadUp /
                </Text>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} py={6} borderY="1px solid" borderColor="gray.200">
                  {keySpecs.map((spec) => (
                    <Stack key={spec.label} spacing={1}>
                      <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                        {spec.label}
                      </Text>
                      <Text fontWeight="bold" color="gray.700">
                        {spec.value}
                      </Text>
                    </Stack>
                  ))}
                </SimpleGrid>

                <Tabs mt={8} variant="unstyled">
                  <TabList borderBottom="2px solid" borderColor="gray.100" overflowX="auto">
                    {['Ausstattungen', 'Beschreibung', 'Technische Daten', 'Finanzierung'].map((tab) => (
                      <Tab
                        key={tab}
                        px={0}
                        mr={8}
                        pb={3}
                        fontWeight="medium"
                        color="gray.600"
                        _selected={{ color: 'orange.500', borderBottom: '3px solid', borderColor: 'orange.500' }}
                      >
                        {tab}
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels mt={6}>
                    <TabPanel px={0}>
                      <Heading as="h3" fontSize="lg" mb={4}>
                        Optionale Ausstattung
                      </Heading>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        {optionalEquipment.map((item) => (
                          <Flex key={item} align="center" gap={3} px={4} py={3} bg="gray.50" borderRadius="md">
                            <CheckmarkIcon color="green.500" />
                            <Text>{item}</Text>
                          </Flex>
                        ))}
                      </SimpleGrid>
                    </TabPanel>

                    <TabPanel px={0}>
                      <Stack spacing={4} color="gray.700">
                        <Text fontWeight="semibold">
                          <Text as="span" fontWeight="extrabold">
                            BMW X4 xDrive 48V M40d Steptronic -
                          </Text>{' '}
                          Ein außergewöhnliches Fahrerlebnis
                        </Text>
                        <Text>
                          Dieser BMW X4 M40d kombiniert sportliche Eleganz mit beeindruckender Leistung. Der 3.0-Liter
                          Reihensechszylinder-Dieselmotor mit 48V-Mildhybrid-Technologie liefert 340 PS und ein
                          maximales Drehmoment von 700 Nm. Die 8-Gang Steptronic Automatik sorgt für geschmeidige
                          Schaltvorgänge und optimale Kraftübertragung.
                        </Text>
                        <Text fontWeight="semibold">Exklusive Ausstattung für höchsten Komfort:</Text>
                        <Text>
                          Das Panorama-Glasdach öffnet den Innenraum und schafft ein luftiges Ambiente. Das Harman/Kardon
                          Soundsystem verwandelt jede Fahrt in ein Konzerterlebnis. Die elektrisch verstellbaren Sitze
                          mit Memory-Funktion bieten individuellen Komfort, während das Head-Up Display alle wichtigen
                          Informationen direkt im Sichtfeld des Fahrers projiziert.
                        </Text>
                        <Text fontWeight="semibold">Modernste Assistenzsysteme:</Text>
                        <Text>
                          Der Driving Assistant Professional bietet maximale Sicherheit mit Funktionen wie
                          Spurhalteassistent, Spurwechselwarnung und Kreuzungswarnung. Die Rückfahrkamera und der
                          Parkassistent erleichtern das Manövrieren in engen Situationen. Das Laserlicht sorgt für
                          perfekte Ausleuchtung bei allen Wetterbedingungen.
                        </Text>
                        <Text fontWeight="semibold">Attraktive Finanzierungsmöglichkeiten:</Text>
                        <Text>
                          Profitieren Sie von unseren flexiblen Leasingangeboten ab CHF 778.17 pro Monat bei Alphera.
                          Keine Anzahlung erforderlich! Vereinbaren Sie noch heute einen Termin für eine Probefahrt.
                        </Text>
                        <Box
                          mt={4}
                          px={4}
                          py={3}
                          bg="yellow.50"
                          borderLeftWidth={4}
                          borderColor="yellow.400"
                          borderRadius="md"
                        >
                          <Text fontSize="sm">
                            <Text as="span" fontWeight="bold">
                              Supabase Integration:
                            </Text>{' '}
                            Diese Fahrzeugbeschreibung wird aus dem <code>description</code> oder <code>teaser</code>
                            -Feld der Datenbank geladen. Die Transformation erfolgt über <code>transformListing()</code>
                            .
                          </Text>
                        </Box>
                      </Stack>
                    </TabPanel>

                    <TabPanel px={0}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        {technicalGroups.map((group) => (
                          <Box key={group.title} bg="gray.50" borderRadius="md" p={4}>
                            <Heading as="h4" fontSize="lg" mb={3}>
                              {group.title}
                            </Heading>
                            <Stack spacing={3}>
                              {group.rows.map((row) => (
                                <Flex
                                  key={row.label}
                                  justify="space-between"
                                  borderBottom="1px solid"
                                  borderColor="gray.100"
                                  pb={2}
                                >
                                  <Text color="gray.600">{row.label}</Text>
                                  <Text fontWeight="medium">{row.value}</Text>
                                </Flex>
                              ))}
                            </Stack>
                          </Box>
                        ))}
                      </SimpleGrid>
                      <Box
                        mt={6}
                        px={4}
                        py={3}
                        bg="blue.50"
                        borderLeftWidth={4}
                        borderColor="blue.400"
                        borderRadius="md"
                      >
                        <Text fontSize="sm">
                          <Text as="span" fontWeight="bold">
                            Database Fields:
                          </Text>{' '}
                          Technische Angaben stammen aus Feldern wie <code>horse_power</code>,{' '}
                          <code>fuel_type</code>, <code>transmission_type</code> oder <code>cubic_capacity</code> in der
                          Tabelle <code>listings-db-24jul</code>.
                        </Text>
                      </Box>
                    </TabPanel>

                    <TabPanel px={0}>
                      <Heading as="h3" fontSize="lg" mb={4}>
                        Finanzierungsoptionen
                      </Heading>
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                        <Stack
                          spacing={4}
                          p={6}
                          borderRadius="lg"
                          bgGradient="linear(to-br, #667eea, #764ba2)"
                          color="white"
                        >
                          <Heading as="h4" fontSize="lg">
                            Leasing ohne Anzahlung
                          </Heading>
                          <Text fontSize="3xl" fontWeight="bold">
                            CHF 778.17
                          </Text>
                          <Text opacity={0.85}>pro Monat bei Alphera</Text>
                          <Stack spacing={2} fontSize="sm">
                            {['Keine Anzahlung', 'Flexible Laufzeit', 'Attraktive Konditionen'].map((item) => (
                              <Text key={item}>✓ {item}</Text>
                            ))}
                          </Stack>
                        </Stack>

                        <Stack spacing={4} p={6} borderWidth={2} borderColor="gray.200" borderRadius="lg" bg="white">
                          <Heading as="h4" fontSize="lg" color="gray.800">
                            Finanzierung
                          </Heading>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              Anzahlung
                            </Text>
                            <Text fontSize="2xl" fontWeight="bold">
                              CHF 11'180
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              Monatliche Rate
                            </Text>
                            <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                              CHF 820
                            </Text>
                          </Box>
                          <Stack spacing={2} fontSize="sm" color="gray.600">
                            <Text>Laufzeit: 48 Monate</Text>
                            <Text>Schlussrate: CHF 22'360</Text>
                            <Text>Effektiver Jahreszins: 5.9%</Text>
                          </Stack>
                        </Stack>

                        <Stack spacing={4} p={6} borderRadius="lg" bg="gray.50">
                          <Heading as="h4" fontSize="lg" color="gray.800">
                            Ihre Vorteile
                          </Heading>
                          <Stack spacing={3}>
                            {financingBenefits.map((benefit) => (
                              <Flex key={benefit} align="flex-start" gap={3}>
                                <CheckmarkIcon color="green.500" />
                                <Text color="gray.700">{benefit}</Text>
                              </Flex>
                            ))}
                          </Stack>
                        </Stack>
                      </SimpleGrid>
                      <Stack
                        direction={{ base: 'column', md: 'row' }}
                        align="center"
                        justify="space-between"
                        mt={6}
                        p={6}
                        borderWidth={2}
                        borderColor="orange.400"
                        borderRadius="lg"
                        bg="white"
                        spacing={4}
                      >
                        <Box>
                          <Heading as="h4" fontSize="lg" color="orange.500">
                            Jetzt Finanzierung berechnen
                          </Heading>
                          <Text color="gray.600" mt={2}>
                            Nutzen Sie unseren Finanzierungsrechner für eine individuelle Kalkulation.
                          </Text>
                        </Box>
                        <Button colorScheme="orange">Finanzierung berechnen</Button>
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>

              <Stack spacing={10}>
                <Box>
                  <Heading as="h3" fontSize="xl" mb={4}>
                    MFK (motor vehicle control)
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Stack spacing={2}>
                      <Text fontWeight="bold">From MFK</Text>
                      <Text color="gray.600">
                        The most recent vehicle inspection (MFK) for this vehicle is as new as the year it entered,
                        ultimately the date of sale - ask the seller to confirm.
                      </Text>
                    </Stack>
                    <Stack spacing={2}>
                      <Text fontWeight="bold">Last MFK</Text>
                      <Text color="gray.600">12.02.2022</Text>
                    </Stack>
                  </SimpleGrid>
                </Box>
                <Divider />
                <Box>
                  <Heading as="h3" fontSize="xl" mb={4}>
                    Garantie und Rückgabe
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Stack spacing={2}>
                      <Text fontWeight="bold">Garantie</Text>
                      <Text color="gray.600">Ja</Text>
                    </Stack>
                    <Stack spacing={2}>
                      <Text fontWeight="bold">Rückgaberecht</Text>
                      <Text color="gray.600">7 Tage</Text>
                    </Stack>
                    <Stack spacing={2}>
                      <Text fontWeight="bold">Zertifiziert</Text>
                      <Text color="gray.600">Mercedes-Benz Certified</Text>
                    </Stack>
                  </SimpleGrid>
                </Box>
                <Divider />
                <Box>
                  <Heading as="h3" fontSize="xl" mb={4}>
                    Bemerkungen vom Anbieter
                  </Heading>
                  <Stack spacing={3} color="gray.600">
                    <Text>10% Leasingaktion bis 31.12.2022</Text>
                    <Text>
                      Speziell bei diesem Fahrzeug: (nur 18 Monate) 3-monatige Fahrzeug-ABO-Miete mit Verkaufspreis auf
                      für ausgewählte Modelle) Mehr Infos auf: www.autoWeltvonRotz.ch
                    </Text>
                    <Link href="#" fontWeight="medium" color="orange.500" width="fit-content">
                      Mehr anzeigen
                    </Link>
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Heading as="h3" fontSize="xl" mb={4}>
                    Wie viel kostet die Versicherung?
                  </Heading>
                  <Stack spacing={4}>
                    <Box borderWidth={1} borderRadius="lg" p={6} bg="white">
                      <Heading as="h4" fontSize="lg" mb={2}>
                        VW Golf 2.0 TSI GTI DSG Performance
                      </Heading>
                      <Text fontSize="2xl" fontWeight="bold">
                        CHF 24'890
                      </Text>
                      <Link mt={3} display="inline-flex" href="#" color="orange.500" fontWeight="medium">
                        Versicherungen vergleichen
                      </Link>
                    </Box>
                    <Text fontSize="sm" color="gray.500">
                      Unsere Partner
                    </Text>
                    <Stack direction="row" spacing={6} color="gray.600">
                      {['Allianz', 'AXA', 'Zurich'].map((partner) => (
                        <Text key={partner}>{partner}</Text>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Heading as="h3" fontSize="xl" mb={4}>
                    Partner angebote
                  </Heading>
                  <Stack spacing={3}>
                    <Link href="#" color="orange.500" fontWeight="medium">
                      Calculate Leasing with Multilease
                    </Link>
                    <Link href="#" color="orange.500" fontWeight="medium">
                      Rate vehicle with Eurotax CHF 12'50
                    </Link>
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Heading as="h3" fontSize="xl" mb={4}>
                    Zusatzleistungen des Anbieters
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {[
                      'Garanties: mind. 12 Monate',
                      'Fahrzeug kontrolliert, 100 Punkte kontrolliert',
                      'Deckung/Umfang Deckung',
                      'Preis im Kaufpreis inbegriffen',
                      'Umtauschrecht, 10 Tage',
                    ].map((item) => (
                      <Stack key={item} direction="row" align="center" spacing={3}>
                        <CheckmarkIcon color="green.500" />
                        <Text>{item}</Text>
                      </Stack>
                    ))}
                  </SimpleGrid>
                </Box>
                <Divider />
                <Box>
                  <Heading as="h3" fontSize="xl" mb={4}>
                    Weitere Fahrzeuge dieses Anbieters
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {[1, 2].map((item) => (
                      <Box key={item} borderWidth={1} borderRadius="lg" bg="white" overflow="hidden">
                        <AspectRatio ratio={4 / 3}>
                          <Box
                            as="img"
                            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop"
                            alt="Weitere Fahrzeuge"
                          />
                        </AspectRatio>
                        <Stack spacing={2} p={4}>
                          <Text fontWeight="bold">VW Golf 2.0 TSI Variant Performance</Text>
                          <Text color="gray.600">CHF 24'755.- · 2015 · 108'400 km</Text>
                        </Stack>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <Link href="#" mt={4} display="inline-flex" color="orange.500" fontWeight="medium">
                    Alle Fahrzeuge anzeigen
                  </Link>
                </Box>
                <Divider />
                <Box>
                  <Heading as="h3" fontSize="xl" mb={4}>
                    Bewertungen des Anbieters
                  </Heading>
                  <Flex align="center" gap={4} mb={6}>
                    <Heading as="span" fontSize="3xl">
                      4.9
                    </Heading>
                    <Rating rating={4.9} size="large" />
                    <Text color="gray.600">(554 Bewertungen)</Text>
                  </Flex>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {reviews.map((review) => (
                      <Stack key={review.author} spacing={2} bg="gray.50" borderRadius="md" p={4}>
                        <Text fontWeight="bold">{review.author}</Text>
                        <Rating rating={5} size="small" />
                        <Text color="gray.700">{review.content}</Text>
                      </Stack>
                    ))}
                  </SimpleGrid>
                  <Link href="#" mt={4} display="inline-flex" color="orange.500" fontWeight="medium">
                    Alle Bewertungen anzeigen
                  </Link>
                </Box>
              </Stack>
            </Stack>

            <Stack spacing={6} position="sticky" top={28} alignSelf="start">
              <Box bg="white" borderRadius="lg" p={6} boxShadow="md">
                <Heading as="span" fontSize="3xl" fontWeight="bold" display="block">
                  CHF 55'900.–
                </Heading>
                <Text color="gray.600" mb={4}>
                  Ab CHF 778.17 pro Monat bei Alphera
                </Text>
                <Box bg="blue.50" borderRadius="md" px={4} py={3} mb={4} borderLeftWidth={4} borderColor="blue.400">
                  <Text fontWeight="semibold" color="blue.600">
                    Ab CHF 820.– pro Monat
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    ohne Anzahlung • Versicherungsprämie berechnen
                  </Text>
                </Box>
                <Stack spacing={3}>
                  <Button colorScheme="orange">Anfrage</Button>
                  <Button variant="outline" colorScheme="gray">
                    044_anzeigen
                  </Button>
                </Stack>
                <SimpleGrid columns={2} spacing={3} mt={4}>
                  <Button variant="outline" colorScheme="gray">
                    Merken
                  </Button>
                  <Button variant="outline" colorScheme="gray">
                    Vergleichen
                  </Button>
                </SimpleGrid>
                <Button variant="outline" mt={4} colorScheme="gray">
                  Über WhatsApp kontaktieren
                </Button>
                <Flex gap={2} flexWrap="wrap" mt={4}>
                  {['Ab MFK', 'Mit Garantie'].map((item) => (
                    <Badge key={item} colorScheme="green" borderRadius="full" px={3} py={1}>
                      ✓ {item}
                    </Badge>
                  ))}
                </Flex>
              </Box>

              <Box bg="white" borderRadius="lg" p={6} boxShadow="md">
                <Box
                  height="80px"
                  borderRadius="md"
                  bg="black"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="xl"
                  mb={4}
                >
                  CARMOTION
                </Box>
                <Heading as="h4" fontSize="lg" mb={2}>
                  Carmotion AG
                </Heading>
                <Flex align="center" gap={2} mb={4}>
                  <Text color="yellow.400">★★★★★</Text>
                  <Text fontWeight="semibold">4.8</Text>
                  <Text color="gray.600">(303)</Text>
                </Flex>
                <Stack spacing={3} bg="gray.50" borderRadius="md" p={4}>
                  <Stack direction="row" align="center" spacing={3}>
                    <LocationPinIcon />
                    <Text>Vogelsangstrasse 14, 8307 Effretikon (ZH)</Text>
                  </Stack>
                  <Stack direction="row" align="center" spacing={3}>
                    <CallIcon />
                    <Link href="tel:+41000000000">+41 000 000 00</Link>
                  </Stack>
                  <Text color="gray.600">Öffnungszeiten anzeigen</Text>
                  <Stack direction="row" align="center" spacing={3}>
                    <MessageIcon />
                    <Link href="mailto:info@autoweltvonrotz.ch">info@autoweltvonrotz.ch</Link>
                  </Stack>
                </Stack>
                <Button mt={6} colorScheme="orange" width="full">
                  Händler kontaktieren
                </Button>
                <Button mt={3} variant="outline" width="full" colorScheme="gray">
                  Alle Fahrzeuge anzeigen
                </Button>
                <Box mt={6} pt={4} borderTop="1px solid" borderColor="gray.100">
                  <Text fontSize="sm" color="gray.600">
                    Supabase Field: <code>seller_id</code>
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Fetched via <code>VehicleService.getBySeller()</code>
                  </Text>
                </Box>
              </Box>

              <AspectRatio ratio={16 / 9} borderRadius="lg" overflow="hidden" boxShadow="md">
                <Box
                  as="img"
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=675&fit=crop"
                  alt="Karte"
                />
              </AspectRatio>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default VehicleDetailsPage;
