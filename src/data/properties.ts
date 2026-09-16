// Verified property inventory, sourced from hostedhavens.co listings (2026-09-14).
// Booking URLs are the exact Hospitable widgets embedded on the live property pages.

export type Property = {
  slug: string;
  name: string;
  title: string;
  city: string;
  area?: string;
  type: 'House' | 'Studio' | 'Private room';
  guests: number;
  bedrooms: number;
  beds: number;
  baths: string;
  petFriendly: boolean;
  extendedStay: boolean;
  workspace: boolean;
  familyFriendly: boolean;
  nearBase?: 'Randolph AFB' | 'Lackland AFB';
  group?: string;
  summary: string;
  highlights: string[];
  sleeping: string[];
  amenities: string[];
  distances?: string[];
  notes?: string[];
  bookingUrl: string;
  featured?: boolean;
};

const H1 = 'https://booking.hospitable.com/widget/9eb13f0b-a039-49cc-94f8-e8a349b0f0e9/';
const H2 = 'https://booking.hospitable.com/widget/9e221a57-a7a7-4dda-a5d9-4d4eddb6fc37/';
const H3 = 'https://booking.hospitable.com/widget/a172bb81-09b1-4a40-86cb-58ab5f6c1bf4/';

const studioShared = {
  city: 'San Antonio',
  area: 'Collins Garden Park',
  type: 'Studio' as const,
  guests: 2, bedrooms: 1, beds: 1, baths: '1',
  extendedStay: true,
  familyFriendly: false,
  nearBase: 'Lackland AFB' as const,
  group: 'Collins Garden Studios',
  sleeping: ['Queen bed with premium linens', 'Pack-n-play available on request'],
  amenities: ['Fully equipped kitchenette with induction stove & oven', 'Smart TV and loveseat', 'Keyless entry', 'Personal mini-split heating & air conditioning', 'Free Wi-Fi', 'Complimentary toiletries, linens & towels', 'Free parking'],
  distances: ['2 miles to Downtown San Antonio', '9 miles to Lackland AFB', '18 miles to Six Flags Fiesta Texas'],
};

const crashpadShared = {
  city: 'Converse',
  type: 'Private room' as const,
  guests: 2, bedrooms: 1, beds: 1, baths: '1',
  petFriendly: false,
  extendedStay: true,
  workspace: true,
  familyFriendly: false,
  nearBase: 'Randolph AFB' as const,
  group: 'The Crashpad',
  amenities: ['Mid-stay housekeeping', 'Two shared living rooms', 'Ping pong, shuffleboard, pool & poker tables', 'Coffee bar', '1,000 Mbps internet', 'In-unit washer & dryer', 'Fully equipped shared kitchen', 'Smart locks on exterior and bedroom doors', 'Free parking'],
  distances: ['About 4 minutes from Randolph AFB'],
};

export const properties: Property[] = [
  {
    slug: 'the-harding-place', name: 'The Harding Place', title: 'Spacious Family Home · Game Room · Fenced Yard',
    city: 'San Antonio', area: 'Near Downtown & the River Walk', type: 'House', guests: 7, bedrooms: 3, beds: 3, baths: '1.5',
    petFriendly: true, extendedStay: true, workspace: false, familyFriendly: true, featured: true,
    summary: 'A timeless Craftsman-style home near Downtown and the River Walk, nearly 2,000 sq. ft. of natural light, vintage character and room for the whole family.',
    highlights: ['Two king beds', 'Vintage clawfoot tub', 'Kids’ playroom', 'Pet friendly, park across the street', 'Stocked for extended stays'],
    sleeping: ['Bedroom 1: King bed + pack-n-play', 'Bedroom 2: King bed', 'Bedroom 3: Queen bed', 'Kids’ nook: Fold-out twin chair'],
    amenities: ['5-burner gas stove & oven', 'Dishwasher, crockpot & blender', 'Smart TVs', 'Blackout curtains', 'Ceiling fans in every bedroom', 'High-speed Wi-Fi', 'Half bath with laundry combo'],
    bookingUrl: `${H1}1979634`,
  },
  {
    slug: 'grass-hollow', name: 'Grass Hollow', title: 'Live Oak Family Escape · Pets OK · Near Live Oak Park',
    city: 'Live Oak', type: 'House', guests: 8, bedrooms: 4, beds: 5, baths: '2',
    petFriendly: true, extendedStay: true, workspace: true, familyFriendly: true, featured: true,
    summary: 'A warm, family-first home where kids can play, pets are welcome and everyone has space to spread out, a short walk from Live Oak Park.',
    highlights: ['King primary suite with spa-style en suite', 'Kids’ bunk room with climbing wall', 'Sunny courtyard + large covered patio', 'Dedicated work desk', 'Walkable to Live Oak Park'],
    sleeping: ['Bedroom 1: King bed', 'Bedroom 2: Twin-over-twin bunk', 'Bedroom 3: Queen bed', 'Bedroom 4: Full bed'],
    amenities: ['Crib and high chair', 'Coffee & tea bar', 'Induction stove, air fryer, crockpot & griddle', 'Full-size washer & dryer', 'Gym equipment', 'Garage storage + 2-car driveway'],
    bookingUrl: `${H1}1931230`,
  },
  {
    slug: 'de-soto-lighthouse', name: 'De Soto', title: 'Spacious Smart Home with Office & Covered Patio',
    city: 'Universal City', type: 'House', guests: 7, bedrooms: 4, beds: 4, baths: '2',
    petFriendly: false, extendedStay: true, workspace: true, familyFriendly: true, featured: true,
    summary: 'A freshly renovated, light-filled minimalist home designed for peace and connection, with a dedicated office, Google smart home controls and a covered patio.',
    highlights: ['Dedicated large office', 'Google smart home lighting', 'Two living rooms', 'Vaulted ceiling with fireplace', 'Smart TVs in every bedroom'],
    sleeping: ['Four bedrooms in a separate sleeping wing', 'Sleeps up to 7 guests'],
    amenities: ['Chef’s kitchen', 'High-speed internet', 'Covered back patio', 'Garage storage'],
    bookingUrl: `${H1}2031800`,
  },
  {
    slug: 'la-maison-blount', name: 'La Maison Blount', title: 'Beautifully Renovated Home Near I-10',
    city: 'San Antonio', type: 'House', guests: 7, bedrooms: 2, beds: 5, baths: '1.5',
    petFriendly: true, extendedStay: false, workspace: false, familyFriendly: true, featured: true,
    summary: 'A beautifully remodeled family home five miles from the heart of the city, with original hardwood floors, a coffee bar and a large private yard for pets and play.',
    highlights: ['Large private fenced yard', 'Coffee bar & granite countertops', 'Original hardwood floors', 'Charcoal grill, dart board & chimenea', 'Pets welcome (up to 3)'],
    sleeping: ['Bedroom 1: Queen bed', 'Bedroom 2: Twin/queen bunk bed', 'Lounge: Twin daybed with trundle', 'Pack-n-play available'],
    amenities: ['5-burner gas stove & oven', 'Ice maker & water filter', 'Reclining sectional & Smart TVs', 'In-unit washer & dryer', 'Board & card games', 'Two free driveways'],
    distances: ['5 miles to Downtown', '6 miles to the Medical Center', '12 miles to Six Flags Fiesta Texas'],
    bookingUrl: `${H2}1708018`,
  },
  {
    slug: 'coastal-run', name: 'Coastal Run', title: 'Cozy 3BR near Six Flags with BBQ, Backyard & Pets OK',
    city: 'San Antonio', area: 'Leon Valley', type: 'House', guests: 6, bedrooms: 3, beds: 3, baths: '2.5',
    petFriendly: true, extendedStay: false, workspace: false, familyFriendly: true, featured: true,
    summary: 'A modern townhome in a gated Leon Valley community with moody, stylish décor, a private fenced yard and a two-car garage with an EV charger. Private entry, no shared spaces.',
    highlights: ['Gated community', 'Private fenced backyard', '2-car garage with EV charger', 'Smart TVs in every bedroom', 'Pet friendly'],
    sleeping: ['Bedroom 1: Queen bed', 'Bedroom 2: Queen bed', 'Bedroom 3: Queen bed', 'Pack-n-play available'],
    amenities: ['Chef-ready kitchen', 'Memory foam mattresses', 'Blackout curtains', 'Free high-speed Wi-Fi'],
    bookingUrl: `${H1}2005408`,
  },
  {
    slug: 'legislation-4br', name: 'Legislation', title: 'Movie Night, Pool & Poker: 2 Living Rooms & Spacious',
    city: 'Converse', type: 'House', guests: 10, bedrooms: 4, beds: 4, baths: '2',
    petFriendly: false, extendedStay: true, workspace: false, familyFriendly: true, nearBase: 'Randolph AFB',
    summary: 'A stylish, spacious home made for group trips and PCS moves, two living rooms, a movie projector, pool and poker tables, and a covered patio with grill.',
    highlights: ['Two living rooms', 'Movie projector', 'Game room with pool & poker tables', 'Covered back patio with grill', 'About 4 minutes from Randolph AFB’s back gate'],
    sleeping: ['Four upstairs bedrooms with queen beds', 'Two couches (1 guest each)'],
    amenities: ['Large kitchen with walk-in pantry', 'Dishwasher, air fryer & crockpot', 'Samsung HDTVs in each bedroom', 'In-unit washer & dryer', 'Large fenced yard'],
    bookingUrl: `${H1}1630750`,
  },
  {
    slug: 'halliday-fig-trees', name: 'Halliday', title: 'Urban 2BR Escape Near Downtown SA with Fire Pit & Yard',
    city: 'San Antonio', area: 'Riverside', type: 'House', guests: 8, bedrooms: 2, beds: 4, baths: '2',
    petFriendly: true, extendedStay: false, workspace: false, familyFriendly: true, featured: true,
    summary: 'Renovated farmhouse charm minutes from downtown, a gathering-sized dining room, a fenced yard and a fire pit under string lights.',
    highlights: ['Fenced yard with gate code', 'Recently renovated in soothing earth tones', 'Dining room for the whole group', 'Fire pit & backyard string lights', 'Pet friendly'],
    sleeping: ['Bedroom 1: Two queen beds', 'Bedroom 2: Full-over-full bunk beds', 'Pack-n-play available'],
    amenities: ['4-burner gas stove', 'In-unit washer & dryer', 'Covered front porch', 'Grilling area with seating', 'Free high-speed Wi-Fi', 'Central air conditioning'],
    bookingUrl: `${H3}2247418`,
  },
  {
    slug: 'liberty-bell', name: 'Liberty Bell', title: '2BR Family Unit 10 Minutes from the Airport with Free Parking',
    city: 'San Antonio', type: 'House', guests: 4, bedrooms: 2, beds: 3, baths: '2',
    petFriendly: false, extendedStay: false, workspace: false, familyFriendly: true,
    summary: 'An open-concept family home built around a 10-foot kitchen island, two bedrooms, two full baths and space for the kids to play.',
    highlights: ['10-foot kitchen island', 'Kids’ play area', 'Screened-in front patio', 'Fenced side and back yard', 'Full-size washer & dryer'],
    sleeping: ['Bedroom 1: Queen bed with en suite', 'Bedroom 2: Queen bed', 'Pack-n-play on site'],
    amenities: ['Premium cookware', '4-burner gas stove', 'Smart TV in primary bedroom', 'Central heating & air', '2-car driveway'],
    distances: ['About 10 minutes from San Antonio International Airport'],
    bookingUrl: `${H1}2090920`,
  },
  {
    slug: 'discovery-mill-crash-pad', name: 'Discovery Mill', title: 'Modern Family Retreat · Pets OK · Near Randolph AFB',
    city: 'Converse', type: 'House', guests: 10, bedrooms: 5, beds: 5, baths: '3',
    petFriendly: true, extendedStay: true, workspace: false, familyFriendly: true, nearBase: 'Randolph AFB',
    summary: 'A five-bedroom, three-bath retreat near Randolph AFB with room for large families and groups, and your pets.',
    highlights: ['Five bedrooms, three baths', 'Sleeps up to 10', 'Pet friendly', 'Game room with shuffleboard', 'Near Randolph AFB'],
    sleeping: ['Five bedrooms', 'Sleeps up to 10 guests'],
    amenities: ['Full kitchen', 'Free parking'],
    bookingUrl: `${H1}1485370`,
  },
  {
    ...crashpadShared, slug: 'ccp-1', name: 'Crashpad · Room 1', title: 'Master Suite Room Rental with En Suite & Fridge', petFriendly: false,
    summary: 'The Crashpad’s primary suite, a private room with its own en suite and fridge, minutes from Randolph AFB. Built for PCS moves, traveling professionals and remote workers.',
    highlights: ['Private en suite bathroom', 'In-room fridge', 'Private workspace', 'Pin-code door lock', 'Mid-stay housekeeping'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1522582`,
  },
  {
    ...crashpadShared, slug: 'ccp-2', name: 'Crashpad · Room 2', title: 'The Crashpad Room #2 · 2nd Floor',
    summary: 'A second-floor private room at The Crashpad with a private vanity and closet, a dedicated workspace and access to shared living and game rooms.',
    highlights: ['Queen bed & TV in room', 'Private workspace', 'Private vanity & closet', 'Pin-code bedroom & bathroom locks', 'Shower area shared with one other room'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1525504`,
  },
  {
    ...crashpadShared, slug: 'ccp-3', name: 'Crashpad · Room 3', title: 'Spacious & Tidy Room Rental near Randolph AFB',
    summary: 'A spacious private room with a walk-in closet and workspace, four minutes from Randolph AFB and perfect for military personnel, nomads and remote workers.',
    highlights: ['Queen bed & TV in room', 'Walk-in closet', 'Private workspace', 'Pin-code door lock', 'Hall bath shared with one other room'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1525810`,
  },
  {
    ...crashpadShared, slug: 'ccp-4', name: 'Crashpad · Room 4', title: 'The Crashpad Room #4 · 2nd Floor',
    summary: 'A second-floor private room with a walk-in closet and workspace, plus shared access to two living rooms, a coffee bar and a game room.',
    highlights: ['Queen bed & TV in room', 'Walk-in closet', 'Private workspace', 'Pin-code door lock', 'Hall bath shared with one other room'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1525812`,
  },
  {
    ...crashpadShared, slug: 'ccp-5', name: 'Crashpad · Room 5', title: 'Natural Light Room Rental near Randolph AFB',
    summary: 'A bright private room with natural light, a workspace and a private vanity, four miles from Randolph AFB.',
    highlights: ['Queen bed & TV in room', 'Natural light', 'Private workspace', 'Private vanity & closet', 'Shower area shared with one other room'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1525720`,
  },
  {
    ...studioShared, slug: 's-park-1a', name: 'Collins Garden Studio 1A', title: 'Facing Collins Garden Park · 1st Floor Access',
    petFriendly: true, workspace: true,
    summary: 'A renovated first-floor studio facing Collins Garden Park, smart home tech and fast Wi-Fi by day, tennis, basketball and grilling across the street by evening.',
    highlights: ['First-floor access', 'Faces Collins Garden Park', 'Pets welcome', 'Remote-work ready Wi-Fi', 'Keyless entry'],
    bookingUrl: `${H1}1713534`,
  },
  {
    ...studioShared, slug: 's-park-1b', name: 'Collins Garden Studio 1B', title: 'Collins Garden First-Floor Room · Pet Friendly',
    petFriendly: true, workspace: false,
    summary: 'A newly remodeled first-floor studio near downtown, minutes from H-E-B, the freeways, the River Walk, the Pearl and Fort Sam Houston.',
    highlights: ['First-floor room', 'Pets welcome', 'Close to highways & downtown', 'Equipped kitchenette', 'Keyless entry'],
    bookingUrl: `${H1}1713504`,
  },
  {
    ...studioShared, slug: 's-park-1c', name: 'Collins Garden Studio 1C', title: 'First-Floor Private Studio Minutes from Lackland',
    petFriendly: false, workspace: true,
    summary: 'A cozy first-floor studio for solo travelers or couples, with a sleek kitchen, a comfortable sleeping area and fast Wi-Fi for remote work.',
    highlights: ['First-floor private studio', 'Minutes from Lackland AFB', 'Remote-work ready Wi-Fi', 'Pet-free unit', 'Keyless entry'],
    bookingUrl: `${H1}1713310`,
  },
  {
    ...studioShared, slug: 's-park-1d', name: 'Collins Garden Studio 1D', title: 'Collins Garden Studio Near Downtown',
    petFriendly: false, workspace: true,
    summary: 'A recently refurbished studio minutes from H-E-B, downtown attractions, military bases and the Medical Center, with the park just across the street.',
    highlights: ['Near downtown & the Medical Center', 'Smart home tech', 'Remote-work ready Wi-Fi', 'Pet-free unit', 'Park across the street'],
    bookingUrl: `${H1}1713308`,
  },
  {
    ...studioShared, slug: 's-park-2a', name: 'Collins Garden Studio 2A', title: 'Park Facing · Pet Friendly · Free Parking · Studio',
    petFriendly: true, workspace: false,
    summary: 'A park-facing downtown studio close to the highway, easy access to conventions, Air Force graduations and every corner of San Antonio.',
    highlights: ['Faces the park', 'Pets welcome', 'Close to highway access', 'Great for Air Force graduations', 'Free parking'],
    bookingUrl: `${H1}1713536`,
  },
  {
    ...studioShared, slug: 's-park-2b', name: 'Collins Garden Studio 2B', title: 'Facing Collins Garden Park · 2nd Floor Access',
    petFriendly: true, workspace: false,
    summary: 'A second-floor studio with modern amenities and stylish décor, steps from a large two-story H-E-B, restaurants and downtown.',
    highlights: ['Second-floor access', 'Faces Collins Garden Park', 'Pets welcome', 'Walk to H-E-B', 'Keyless entry'],
    bookingUrl: `${H1}1713306`,
  },
  {
    ...studioShared, slug: 's-park-2c', name: 'Collins Garden Studio 2C', title: 'Updated Studio with Free Parking · Pet-Free',
    petFriendly: false, workspace: true,
    summary: 'An updated studio with a sleek design, fully equipped kitchen and smart home tech, work remotely by day, walk to the park’s tennis and basketball courts by evening.',
    highlights: ['Recently updated', 'Smart home tech', 'Remote-work ready Wi-Fi', 'Pet-free unit', 'Free parking'],
    bookingUrl: `${H1}2119144`,
  },
  {
    ...studioShared, slug: 's-park-2d', name: 'Collins Garden Studio 2D', title: 'Pet-Free Studio on the 2nd Floor with Parking',
    petFriendly: false, workspace: true,
    summary: 'A newly renovated second-floor studio for solo travelers or couples, fast Wi-Fi for work and the park just across the street.',
    highlights: ['Second-floor studio', 'Newly renovated', 'Remote-work ready Wi-Fi', 'Pet-free unit', 'Free parking'],
    bookingUrl: `${H1}1713984`,
  },
];

export const featuredProperties = properties.filter((p) => p.featured);
export const cities = [...new Set(properties.map((p) => p.city))];
export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
