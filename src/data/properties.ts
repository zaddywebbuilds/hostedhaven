// Verified property inventory, sourced from hostedhavens.co listings (2026-09-14).
// Booking URLs are the exact Hospitable widgets embedded on the live property pages.

export type Property = {
  slug: string;
  name: string;
  title: string;
  city: string;
  area?: string;
  /** Neighbourhood-level map query. Never an exact address: these are occupied rentals. */
  mapQuery?: string;
  type: 'House' | 'Studio' | 'Private room' | 'Casita' | 'Apartment';
  guests: number;
  bedrooms: number;
  beds: number;
  baths: string;
  /** Minimum nights for a monthly booking, where the owner has confirmed it.
   *  Megan 2026-10-06: S Park 30, Liberty Bell 28, Santa Anna 30 (the Santa
   *  Anna minimum drops once the owner's permit comes through). */
  monthlyMinNights?: number;
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
  monthlyMinNights: 30,
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
  guests: 2, bedrooms: 1, beds: 1, baths: '1.5',
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
    summary: 'A timeless Craftsman-style home near Downtown and the River Walk, nearly 2,000 sq. ft. of natural light, vintage character, and room for the whole family.',
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
    summary: 'A freshly renovated, light-filled minimalist home designed for peace and connection, with a dedicated office, Google smart home controls, and a covered patio.',
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
    summary: 'A modern townhome in a gated Leon Valley community with moody, stylish décor, a private fenced yard, and a two-car garage with an EV charger. Private entry, no shared spaces.',
    highlights: ['Gated community', 'Private fenced backyard', '2-car garage with EV charger', 'Smart TVs in every bedroom', 'Pet friendly'],
    sleeping: ['Bedroom 1: Queen bed', 'Bedroom 2: Queen bed', 'Bedroom 3: Queen bed', 'Pack-n-play available'],
    amenities: ['Chef-ready kitchen', 'Memory foam mattresses', 'Blackout curtains', 'Free high-speed Wi-Fi'],
    bookingUrl: `${H1}2005408`,
  },
  {
    slug: 'halliday-fig-trees', name: 'Halliday', title: 'Urban 2BR Escape Near Downtown SA with Fire Pit & Yard',
    city: 'San Antonio', area: 'Riverside', type: 'House', guests: 8, bedrooms: 2, beds: 4, baths: '2',
    petFriendly: true, extendedStay: false, workspace: false, familyFriendly: true,
    summary: 'Renovated farmhouse charm minutes from downtown, a gathering-sized dining room, a fenced yard, and a fire pit under string lights.',
    highlights: ['Fenced yard with gate code', 'Recently renovated in soothing earth tones', 'Dining room for the whole group', 'Fire pit & backyard string lights', 'Pet friendly'],
    sleeping: ['Bedroom 1: Two queen beds', 'Bedroom 2: Full-over-full bunk beds', 'Pack-n-play available'],
    amenities: ['4-burner gas stove', 'In-unit washer & dryer', 'Covered front porch', 'Grilling area with seating', 'Free high-speed Wi-Fi', 'Central air conditioning'],
    bookingUrl: `${H3}2247418`,
  },
  {
    slug: 'liberty-bell', monthlyMinNights: 28, name: 'Liberty Bell', title: '2BR Family Unit 10 Minutes from the Airport with Free Parking',
    city: 'San Antonio', type: 'House', guests: 4, bedrooms: 2, beds: 3, baths: '2',
    petFriendly: false, extendedStay: false, workspace: false, familyFriendly: true,
    summary: 'An open-concept family home built around a 10-foot kitchen island, two bedrooms, two full baths, and space for the kids to play.',
    highlights: ['10-foot kitchen island', 'Kids’ play area', 'Screened-in front patio', 'Fenced side and back yard', 'Full-size washer & dryer'],
    sleeping: ['Bedroom 1: Queen bed with en suite', 'Bedroom 2: Queen bed', 'Pack-n-play on site'],
    amenities: ['Premium cookware', '4-burner gas stove', 'Smart TV in primary bedroom', 'Central heating & air', '2-car driveway'],
    distances: ['About 10 minutes from San Antonio International Airport'],
    bookingUrl: `${H1}2090920`,
  },
  {
    slug: 'discovery-mill-crash-pad', name: 'Discovery Mill', title: 'Modern Family Retreat · Pets OK · Near Randolph AFB',
    city: 'Converse', type: 'House', guests: 10, bedrooms: 5, beds: 5, baths: '3.5',
    petFriendly: true, extendedStay: true, workspace: false, familyFriendly: true, nearBase: 'Randolph AFB',
    summary: 'A five-bedroom retreat near Randolph AFB with room for large families and groups, and your pets.',
    highlights: ['Five bedrooms, three and a half baths', 'Sleeps up to 10', 'Pet friendly', 'Game room with shuffleboard', 'Near Randolph AFB'],
    sleeping: ['Five bedrooms', 'Sleeps up to 10 guests'],
    amenities: ['Full kitchen', 'Free parking'],
    bookingUrl: `${H1}1485370`,
  },
  {
    ...crashpadShared, slug: 'ccp-1', name: 'Crashpad · Room 1', title: 'Master Suite Room Rental with En Suite & Fridge', petFriendly: false,
    summary: 'The Crashpad’s primary suite, a private room with its own en suite and fridge, minutes from Randolph AFB. Built for PCS moves, traveling professionals, and remote workers.',
    highlights: ['Private en suite bathroom', 'In-room fridge', 'Private workspace', 'Pin-code door lock', 'Mid-stay housekeeping'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1522582`,
  },
  {
    ...crashpadShared, slug: 'ccp-2', name: 'Crashpad · Room 2', title: 'The Crashpad Room #2 · 2nd Floor',
    summary: 'A second-floor private room at The Crashpad with a private vanity and closet, a dedicated workspace, and access to shared living and game rooms.',
    highlights: ['Queen bed & TV in room', 'Private workspace', 'Private vanity & closet', 'Pin-code bedroom & bathroom locks', 'Shower area shared with one other room'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1525504`,
  },
  {
    ...crashpadShared, slug: 'ccp-3', name: 'Crashpad · Room 3', title: 'Spacious & Tidy Room Rental near Randolph AFB',
    summary: 'A spacious private room with a walk-in closet and workspace, four minutes from Randolph AFB, and perfect for military personnel, nomads, and remote workers.',
    highlights: ['Queen bed & TV in room', 'Walk-in closet', 'Private workspace', 'Pin-code door lock', 'Hall bath shared with one other room'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1525810`,
  },
  {
    ...crashpadShared, slug: 'ccp-4', name: 'Crashpad · Room 4', title: 'The Crashpad Room #4 · 2nd Floor',
    summary: 'A second-floor private room with a walk-in closet and workspace, plus shared access to two living rooms, a coffee bar, and a game room.',
    highlights: ['Queen bed & TV in room', 'Walk-in closet', 'Private workspace', 'Pin-code door lock', 'Hall bath shared with one other room'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1525812`,
  },
  {
    ...crashpadShared, slug: 'ccp-5', name: 'Crashpad · Room 5', title: 'Natural Light Room Rental near Randolph AFB',
    summary: 'A bright private room with natural light, a workspace, and a private vanity, four miles from Randolph AFB.',
    highlights: ['Queen bed & TV in room', 'Natural light', 'Private workspace', 'Private vanity & closet', 'Shower area shared with one other room'],
    sleeping: ['Queen bed'],
    bookingUrl: `${H2}1525720`,
  },
  {
    ...studioShared, slug: 's-park-1a', name: 'Collins Garden Studio 1A', title: 'Facing Collins Garden Park · 1st Floor Access',
    petFriendly: true, workspace: true,
    summary: 'A renovated first-floor studio facing Collins Garden Park, smart home tech, and fast Wi-Fi by day, tennis, basketball, and grilling across the street by evening.',
    highlights: ['First-floor access', 'Faces Collins Garden Park', 'Pets welcome', 'Remote-work ready Wi-Fi', 'Keyless entry'],
    bookingUrl: `${H1}1713534`,
  },
  {
    ...studioShared, slug: 's-park-1b', name: 'Collins Garden Studio 1B', title: 'Collins Garden First-Floor Room · Pet Friendly',
    petFriendly: true, workspace: false,
    summary: 'A newly remodeled first-floor studio near downtown, minutes from H-E-B, the freeways, the River Walk, the Pearl, and Fort Sam Houston.',
    highlights: ['First-floor room', 'Pets welcome', 'Close to highways & downtown', 'Equipped kitchenette', 'Keyless entry'],
    bookingUrl: `${H1}1713504`,
  },
  {
    ...studioShared, slug: 's-park-1c', name: 'Collins Garden Studio 1C', title: 'First-Floor Private Studio Minutes from Lackland',
    petFriendly: false, workspace: true,
    summary: 'A cozy first-floor studio for solo travelers or couples, with a sleek kitchen, a comfortable sleeping area, and fast Wi-Fi for remote work.',
    highlights: ['First-floor private studio', 'Minutes from Lackland AFB', 'Remote-work ready Wi-Fi', 'Pet-free unit', 'Keyless entry'],
    bookingUrl: `${H1}1713310`,
  },
  {
    ...studioShared, slug: 's-park-1d', name: 'Collins Garden Studio 1D', title: 'Collins Garden Studio Near Downtown',
    petFriendly: false, workspace: true,
    summary: 'A recently refurbished studio minutes from H-E-B, downtown attractions, military bases, and the Medical Center, with the park just across the street.',
    highlights: ['Near downtown & the Medical Center', 'Smart home tech', 'Remote-work ready Wi-Fi', 'Pet-free unit', 'Park across the street'],
    bookingUrl: `${H1}1713308`,
  },
  {
    ...studioShared, slug: 's-park-2a', name: 'Collins Garden Studio 2A', title: 'Park Facing · Pet Friendly · Free Parking · Studio',
    petFriendly: true, workspace: false,
    summary: 'A park-facing downtown studio close to the highway, easy access to conventions, Air Force graduations, and every corner of San Antonio.',
    highlights: ['Faces the park', 'Pets welcome', 'Close to highway access', 'Great for Air Force graduations', 'Free parking'],
    bookingUrl: `${H1}1713536`,
  },
  {
    ...studioShared, slug: 's-park-2b', name: 'Collins Garden Studio 2B', title: 'Facing Collins Garden Park · 2nd Floor Access',
    petFriendly: true, workspace: false,
    summary: 'A second-floor studio with modern amenities and stylish décor, steps from a large two-story H-E-B, restaurants, and downtown.',
    highlights: ['Second-floor access', 'Faces Collins Garden Park', 'Pets welcome', 'Walk to H-E-B', 'Keyless entry'],
    bookingUrl: `${H1}1713306`,
  },
  {
    ...studioShared, slug: 's-park-2c', name: 'Collins Garden Studio 2C', title: 'Updated Studio with Free Parking · Pet-Free',
    petFriendly: false, workspace: true,
    summary: 'An updated studio with a sleek design, fully equipped kitchen, and smart home tech, work remotely by day, walk to the park’s tennis, and basketball courts by evening.',
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

  // Added 2026-10-01. These six were live and taking bookings in Hospitable but
  // had never been published on the site. Facts below are pulled from the
  // Hospitable API (capacity, bed configuration, amenities, check-in times).
  // mapQuery stays neighbourhood-level: the API returns exact street addresses
  // and these are occupied rentals.
  {
    slug: 'quiet-fox', name: 'Quiet Fox', title: 'Single-Level 4BR with Gamer Room · Pets OK · Fire Pit',
    city: 'San Antonio', area: 'Far West Side', mapQuery: 'Far West Side, San Antonio, TX',
    type: 'House', guests: 8, bedrooms: 4, beds: 4, baths: '2',
    petFriendly: true, extendedStay: true, workspace: true, familyFriendly: true,
    summary: 'An open-concept, single-level home built around an 81-inch smart TV and a kitchen island, with four bedrooms including a dedicated gamer room, and a fire pit out back. Families and their pets are both welcome.',
    highlights: ['81-inch smart TV', 'Dedicated gamer room', 'Large primary suite', 'Patio with fire pit', 'Pets welcome'],
    sleeping: ['Bedroom 1: King bed', 'Bedroom 2: Queen bed', 'Bedroom 3: Queen bed', 'Bedroom 4: Full bed'],
    amenities: ['Kitchen island with full appliances', 'Dishwasher', 'In-unit washer & dryer', 'EV charger', 'Dedicated workspace', 'Central air conditioning', 'Free on-site parking'],
    bookingUrl: `${H1}2355845`,
  },
  {
    slug: 'retama-hollow', name: 'Retama Hollow', title: 'Family Stay Near Live Oak Park · Patio & Game Room',
    city: 'Live Oak', mapQuery: 'Live Oak, TX',
    type: 'House', guests: 11, bedrooms: 4, beds: 6, baths: '2.5',
    petFriendly: true, extendedStay: true, workspace: true, familyFriendly: true,
    summary: 'A spacious four-bedroom retreat near Live Oak Park, designed for comfort, connection, and large groups. Six beds across four bedrooms sleep up to eleven, with a game room, a covered patio, and a garden.',
    highlights: ['Sleeps up to 11', 'Game room', 'Covered patio & garden', 'High chair on site', 'Pets welcome'],
    sleeping: ['Bedroom 1: King bed + queen bed', 'Bedroom 2: Queen bed', 'Bedroom 3: Queen bed', 'Bedroom 4: Full bed + twin bed'],
    amenities: ['Full kitchen with dishwasher', 'In-unit washer & dryer', 'High chair', 'Dedicated workspace', 'Central air conditioning', 'Free on-site parking'],
    distances: ['Walkable to Live Oak Park'],
    bookingUrl: `${H1}2341389`,
  },
  {
    slug: 'evergreen-1', name: 'Evergreen Loft', title: 'Chic 1BR Loft with Backyard Near the Pearl & Downtown',
    city: 'San Antonio', area: 'Tobin Hill', mapQuery: 'Tobin Hill, San Antonio, TX',
    type: 'Casita', guests: 2, bedrooms: 1, beds: 1, baths: '1',
    petFriendly: false, extendedStay: true, workspace: true, familyFriendly: false,
    group: 'Evergreen',
    summary: 'A loft casita in vibrant Tobin Hill, within walking distance of the Pearl, the River Walk, and the Saint Mary’s strip. City living with a quiet home to retreat to.',
    highlights: ['Walk to the Pearl', 'Walk to the Saint Mary’s strip', 'Quiet retreat in a central neighbourhood', 'Dedicated workspace', 'Free on-site parking'],
    sleeping: ['Queen bed'],
    amenities: ['Full kitchen', 'Smart TV', 'Free Wi-Fi', 'Dedicated workspace', 'Central air conditioning', 'Free on-site parking'],
    distances: ['Walking distance to the Pearl, the River Walk, and the Saint Mary’s strip'],
    bookingUrl: `${H1}2339351`,
  },
  {
    slug: 'evergreen-2', name: 'Evergreen Apartment', title: 'Tobin Hill 1BR Apartment · Walk to the Pearl',
    city: 'San Antonio', area: 'Tobin Hill', mapQuery: 'Tobin Hill, San Antonio, TX',
    type: 'Apartment', guests: 3, bedrooms: 1, beds: 2, baths: '1',
    petFriendly: false, extendedStay: true, workspace: true, familyFriendly: false,
    group: 'Evergreen',
    summary: 'A one-bedroom apartment in vibrant Tobin Hill, within walking distance of the Pearl, the River Walk, and the Saint Mary’s strip, with room for a third guest.',
    highlights: ['Walk to the Pearl', 'Sleeps up to 3', 'Central Tobin Hill location', 'Dedicated workspace', 'Free on-site parking'],
    sleeping: ['Bedroom: Queen bed', 'Living area: Twin bed'],
    amenities: ['Full kitchen', 'Smart TV', 'Free Wi-Fi', 'Dedicated workspace', 'Central air conditioning', 'Free on-site parking'],
    distances: ['Walking distance to the Pearl, the River Walk, and the Saint Mary’s strip'],
    bookingUrl: `${H1}2339352`,
  },
  // Santa Anna, re-listed in Hospitable 2026-10. The previous "Santa Anna Main"
  // and "Santa Anna Casita" listings were deleted; these three replace them.
  // The combo books the main house and casita together as a rare 4BR for the area.
  {
    slug: 'santa-anna-combo', monthlyMinNights: 30, name: 'Santa Anna', title: 'Main House & Casita Together · 4BR · 7 Minutes to Downtown',
    city: 'San Antonio', area: 'Los Angeles Heights', mapQuery: 'Los Angeles Heights, San Antonio, TX',
    type: 'House', guests: 11, bedrooms: 4, beds: 5, baths: '3',
    petFriendly: false, extendedStay: true, workspace: true, familyFriendly: true,
    group: 'Santa Anna', featured: true,
    summary: 'The main house and the private casita booked together, giving a four-bedroom with room for eleven, seven minutes from downtown San Antonio.',
    highlights: ['Main house and casita together', 'Four bedrooms, three baths', 'Sleeps up to 11', 'Separate casita for privacy', '7 minutes to downtown'],
    sleeping: ['Main house: three queen bedrooms', 'Casita: queen bedroom', 'Sleeps up to 11 guests'],
    amenities: ['Two full kitchens', 'In-unit washer & dryer', 'Dedicated workspace', 'Private patio', 'Central air conditioning', 'Free on-site parking'],
    distances: ['7 minutes to Downtown San Antonio', 'Minutes from the Pearl and the Medical Center'],
    bookingUrl: `${H1}2360273`,
  },
  {
    slug: 'santa-anna-main', monthlyMinNights: 30, name: 'Santa Anna Main House', title: 'Beautifully Renovated 3BR · 7 Minutes to Downtown',
    city: 'San Antonio', area: 'Los Angeles Heights', mapQuery: 'Los Angeles Heights, San Antonio, TX',
    type: 'House', guests: 7, bedrooms: 3, beds: 3, baths: '2',
    petFriendly: false, extendedStay: true, workspace: true, familyFriendly: true,
    group: 'Santa Anna',
    summary: 'A beautifully renovated three-bedroom home on a large corner lot in Los Angeles Heights, an established family neighbourhood seven minutes from downtown.',
    highlights: ['Three queen bedrooms', 'Large corner lot', 'Dedicated workspace', '7 minutes to downtown', 'Free on-site parking'],
    sleeping: ['Bedroom 1: Queen bed', 'Bedroom 2: Queen bed', 'Bedroom 3: Queen bed'],
    amenities: ['Full kitchen with dishwasher', 'In-unit washer & dryer', 'Smart TV', 'Dedicated workspace', 'Central air conditioning', 'Free on-site parking'],
    distances: ['7 minutes to Downtown San Antonio', 'Minutes from the Pearl, the Medical Center, and North Star Mall'],
    bookingUrl: `${H1}2360274`,
  },
  {
    slug: 'santa-anna-casita', monthlyMinNights: 30, name: 'Santa Anna Casita', title: 'Private Casita with Patio · Near Downtown & Bus Line',
    city: 'San Antonio', area: 'Los Angeles Heights', mapQuery: 'Los Angeles Heights, San Antonio, TX',
    type: 'Casita', guests: 4, bedrooms: 1, beds: 2, baths: '1',
    petFriendly: false, extendedStay: true, workspace: true, familyFriendly: false,
    group: 'Santa Anna',
    summary: 'A private renovated casita with its own patio, close to downtown and on the bus line, with room for up to four guests.',
    highlights: ['Private entrance and patio', 'Sleeps up to 4', 'On the bus line', 'Dedicated workspace', 'Free on-site parking'],
    sleeping: ['Bedroom: Queen bed', 'Living area: additional bed'],
    amenities: ['Full kitchen', 'Smart TV', 'Free Wi-Fi', 'Dedicated workspace', 'Private patio', 'Free on-site parking'],
    distances: ['7 minutes to Downtown San Antonio', 'On the bus line'],
    bookingUrl: `${H1}2360275`,
  },
];

export const featuredProperties = properties.filter((p) => p.featured);
export const cities = [...new Set(properties.map((p) => p.city))];
export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
