export type Service = {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroProperty: string;
  widget: 'revenue' | 'ops' | 'calendar' | 'listing' | 'care' | 'launch' | 'cohost';
  intro: { h2: string; paragraphs: string[] };
  pillars: { icon: string; title: string; hook: string; text: string }[];
  detail: { h2: string; paragraphs: string[]; bullets: string[] };
  steps?: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: 'airbnb-management-san-antonio',
    navLabel: 'Airbnb Management',
    metaTitle: 'Airbnb Management San Antonio, TX | Hosted Havens',
    metaDescription: 'Full-service Airbnb management and STR co-hosting in San Antonio. Hosted Havens handles pricing, guests, cleaning, listing optimization, and property care.',
    eyebrow: 'Owners · San Antonio, TX',
    h1: 'Airbnb & Short-Term Rental Management in <em>San Antonio</em>',
    lead: 'Hands-off short-term rental management support for San Antonio owners: pricing, guests, cleaning, maintenance, and your listing, run by a local team that treats your home like its own.',
    heroProperty: 'grass-hollow',
    widget: 'ops',
    intro: {
      h2: 'You keep the asset. <em>We run the stay.</em>',
      paragraphs: [
        'Owning a short-term rental in San Antonio can be rewarding. Running one day to day is a different job entirely: late-night guest questions, weekend pricing decisions, cleaner schedules, supply runs, repairs, and reviews that follow your listing for months.',
        'Hosted Havens provides full-service STR co-hosting: the day-to-day operations of an Airbnb or short-term rental, handled end to end, so you can stay the owner instead of becoming the front desk.',
      ],
    },
    pillars: [
      { icon: 'message', title: 'Guest Management', hook: 'Every guest message answered with care.', text: 'Prompt communication, check-in support, and fast issue resolution protect your reviews and your ranking.' },
      { icon: 'trending', title: 'Revenue Strategy', hook: 'Your rate moves with the market.', text: 'Dynamic pricing, calendar strategy, and real-time adjustments for San Antonio demand.' },
      { icon: 'camera', title: 'Listing Optimization', hook: 'Stand out before the first click.', text: 'Complimentary professional photography, full listing creation, and ongoing optimization.' },
      { icon: 'broom', title: 'Property Care', hook: 'Guest-ready, every turnover.', text: 'Professional cleaning after each stay, routine inspections, proactive maintenance, and restocking.' },
      { icon: 'eye', title: 'Owner Visibility', hook: 'Hands-off, never out of the loop.', text: 'Transparent access to professional hosting tools, real-time calendar visibility, and 7-day support.' },
      { icon: 'calendar', title: 'Short + Mid-Term Strategy', hook: 'More than one way to fill a calendar.', text: 'Nightly guests, 30+ day stays, or a blend, matched to your property and goals.' },
    ],
    detail: {
      h2: 'What full-service management actually includes',
      paragraphs: [
        'Some co-hosts handle only messaging. Full-service co-hosting means the operation is covered, from the first property assessment to the thank-you message after checkout.',
        'Hosted Havens is a co-hosting company, not a traditional long-term property manager. Long-term managers typically collect rent and handle tenancy. Our focus is short and mid-term stays: hospitality, pricing, and property care that keep a rental performing.',
      ],
      bullets: [
        'Customized property assessment and estimate',
        'Tailored action plan from start to finish',
        'Complimentary professional photography',
        'Complete listing creation and optimization',
        'Dynamic pricing and calendar optimization',
        'Guest communication and check-in coordination',
        'Thorough professional cleaning after each stay',
        'Routine inspections and proactive maintenance',
        'Low-inventory alerts and product restocking',
        'Custom home guidebook for guests',
        'Hotel occupancy tax collection and remittance support',
        'Owner access to hosting tools and your calendar',
        'Support team available 7 days a week',
        'Minimum contract length 4–12 months',
      ],
    },
    steps: [
      { title: 'Property Analysis', text: 'We review your home, location, guest appeal, and goals.' },
      { title: 'Strategy', text: 'You get a positioning plan, suggested upgrades and a tailored proposal.' },
      { title: 'Launch or Optimize', text: 'Photography, listing, pricing, and guest systems go live.' },
      { title: 'Operate', text: 'Guests, cleaning, maintenance, and the calendar are coordinated.' },
      { title: 'Improve', text: 'Pricing, presentation, and reviews keep getting refined.' },
    ],
    faqs: [
      { q: 'Is Hosted Havens a property manager or a co-host?', a: 'Hosted Havens is a full-service short-term rental co-host. A co-host manages the day-to-day operation of a short or mid-term rental. A traditional property manager usually handles long-term tenancies and rent collection. We are not a traditional property manager, but we perform the operational work that makes a short-term rental succeed.' },
      { q: 'How much does Airbnb management cost with Hosted Havens?', a: 'The typical ongoing fee is 19%–24% per booking, with a one-time listing setup fee of $150–$500. Final pricing depends on your property type, condition, service requirements, and agreed scope. See the <a href="/pricing/">pricing page</a> for details.' },
      { q: 'Can I still use my property for personal stays?', a: 'Yes. It is your property. With access to the hosting tools, you can block dates on the calendar and use your home whenever you choose.' },
      { q: 'What is the minimum contract length?', a: 'Contracts run a minimum of 4–12 months depending on property type and service scope. This gives both sides the time needed to build a strong, consistent operation.' },
      { q: 'How much can my property earn?', a: 'Every home is different, so there is no honest single number. A free property analysis looks at your home, location, amenities, and comparable rentals to identify its potential. Results vary by property, seasonality, and market conditions.' },
    ],
    related: ['airbnb-co-host-san-antonio', 'airbnb-revenue-management-san-antonio', 'str-property-care-san-antonio'],
  },
  {
    slug: 'airbnb-co-host-san-antonio',
    navLabel: 'STR Co-Hosting',
    metaTitle: 'Airbnb Co-Host San Antonio | Full-Service STR Co-Hosting',
    metaDescription: 'Full-service Airbnb co-hosting in San Antonio. Keep ownership of your listing while Hosted Havens handles guests, pricing, cleaning, and maintenance.',
    eyebrow: 'Owners · Co-Hosting',
    h1: 'Full-Service <em>Airbnb Co-Hosting</em> in San Antonio',
    lead: 'A co-host who does more than answer messages. Hosted Havens runs the whole operation behind your listing while you keep ownership and visibility.',
    heroProperty: 'de-soto-lighthouse',
    widget: 'cohost',
    intro: {
      h2: 'Not every co-host is <em>full-service</em>',
      paragraphs: [
        'On Airbnb, a co-host is someone the owner adds to help manage a listing. Some co-hosts only cover guest messaging or remote assistance. That can still leave you coordinating cleaners, chasing repairs and guessing at pricing.',
        'Full-service co-hosting means Hosted Havens takes on the day-to-day operation: guests, pricing, listing, cleaning, inspections, and maintenance, with a local San Antonio team, so the property runs without your time being tied up.',
      ],
    },
    pillars: [
      { icon: 'key', title: 'You Stay the Owner', hook: 'Your listing, your home, your call.', text: 'You keep ownership of the property and visibility into the calendar and hosting tools.' },
      { icon: 'users', title: 'A Local Team', hook: 'People who can actually get to the house.', text: 'Guest services, maintenance coordination, photography, and routine inspection.' },
      { icon: 'layers', title: 'Everything Connected', hook: 'One partner instead of five vendors.', text: 'Messaging, pricing, cleaning, and maintenance work from the same plan.' },
    ],
    detail: {
      h2: 'Full-service co-hosting vs. limited virtual assistance',
      paragraphs: [
        'A remote assistant can reply to guests. But when a guest needs new batteries at 8 PM, someone has to physically shop for those items and deliver them with care to the guests in a timely manner.',
        'That coordination is where most owner time disappears, and where full-service co-hosting earns its place.',
      ],
      bullets: [
        'Guest communication, check-in coordination, and issue resolution',
        'Dynamic pricing and calendar optimization',
        'Listing creation, photography, and ongoing optimization',
        'Cleaning after every stay and routine inspections',
        'Maintenance coordination and restocking',
        'Custom guest guidebook',
        'Transparent owner access to hosting tools',
        'Minimum contract length 4–12 months',
      ],
    },
    faqs: [
      { q: 'What does an Airbnb co-host do?', a: 'A co-host helps an owner manage a short or mid-term rental. At Hosted Havens, co-hosting is full-service: we perform the day-to-day operations so the owner can be hands-off.' },
      { q: 'Do I need to already have an Airbnb listing?', a: 'No. We can help launch a new short-term rental, including the property assessment, photography, and listing creation. See <a href="/airbnb-setup-san-antonio/">new host setup</a>.' },
      { q: 'Can I see what is happening with my property?', a: 'Yes. Owners have transparent access to our professional hosting tools, including real-time calendar visibility.' },
      { q: 'How do I get started?', a: 'Complete the <a href="/property-analysis/">property intake form</a>, watch our <a href="https://hostedhavens.co/training-video/">short service video</a>, and when you are ready, book your property analysis tour, which includes an onsite visit, extensive prep list, and a detailed analysis report with revenue projections.' },
    ],
    related: ['airbnb-management-san-antonio', 'airbnb-listing-optimization-san-antonio', 'pricing'],
  },
  {
    slug: 'mid-term-rental-management-san-antonio',
    navLabel: 'Mid-Term Rentals',
    metaTitle: 'Mid-Term Rental Management San Antonio | Hosted Havens',
    metaDescription: 'Mid-term rental management in San Antonio for 30+ day furnished stays: military PCS moves, traveling professionals, relocations, and extended visits.',
    eyebrow: 'Owners · 30+ Day Stays',
    h1: 'Mid-Term Rental Management in <em>San Antonio</em>',
    lead: 'Furnished 30+ day stays for military moves, traveling professionals, relocations, and extended visits, set up, and operated so longer bookings stay easy on you and comfortable for guests.',
    heroProperty: 's-park-1a',
    widget: 'calendar',
    intro: {
      h2: 'San Antonio has real <em>long-stay</em> demand',
      paragraphs: [
        'San Antonio is home to Joint Base San Antonio, including Lackland, Randolph, and Fort Sam Houston, plus a major medical center, and a steady flow of relocating families and traveling professionals. Many of those guests need a furnished home for weeks or months, not nights.',
        'Hosted Havens already operates properties designed around those stays, from renovated studios near downtown to private rooms minutes from Randolph AFB. That experience shapes how we set up and run mid-term rentals for owners.',
      ],
    },
    pillars: [
      { icon: 'plane', title: 'Military & PCS Moves', hook: 'Close to base, ready on arrival.', text: 'Furnished housing for service members and families moving in or out of San Antonio.' },
      { icon: 'briefcase', title: 'Traveling Professionals', hook: 'A home that works like an office.', text: 'Fast Wi-Fi, a real workspace, and a kitchen that handles weeknight cooking.' },
      { icon: 'home', title: 'Relocations & Transitions', hook: 'Somewhere to land between homes.', text: 'Comfortable, fully stocked stays for families in the middle of a move.' },
    ],
    detail: {
      h2: 'What changes when stays get longer',
      paragraphs: [
        'Mid-term guests live in the home. They cook, work, do laundry and notice every missing detail. The setup has to support daily living, and the operation has to keep quality high without the reset of a nightly turnover.',
        'A blended strategy can also help, combining nightly and 30+ day bookings to reduce empty weeks during slower seasons.',
      ],
      bullets: [
        'Setup for daily living: workspace, laundry, stocked kitchen',
        'Extended-stay pricing and length-of-stay strategy',
        'Mid-stay housekeeping options',
        'Screening and clear house guidance for longer stays',
        'Maintenance coordination during the stay',
        'Blended short- and mid-term calendar planning',
      ],
    },
    faqs: [
      { q: 'Do you manage mid-term rentals?', a: 'Yes. Hosted Havens supports short-term, mid-term (30+ day), and blended rental strategies depending on the property and the owner’s goals.' },
      { q: 'Who books mid-term rentals in San Antonio?', a: 'Common guests include military personnel on PCS moves, traveling professionals, families relocating to the area, and people who need temporary housing during a transition.' },
      { q: 'Is my home a good fit for 30+ day stays?', a: 'Location, layout, workspace, and storage all matter. A <a href="/property-analysis/">property analysis</a> is the best way to see whether short, mid-term or a blend fits your home.' },
    ],
    related: ['airbnb-management-san-antonio', 'airbnb-revenue-management-san-antonio', 'furnished-rentals-near-randolph-afb'],
  },
  {
    slug: 'airbnb-revenue-management-san-antonio',
    navLabel: 'Revenue Management',
    metaTitle: 'Airbnb Revenue Management San Antonio | Dynamic Pricing',
    metaDescription: 'Airbnb revenue management in San Antonio: dynamic pricing, seasonality, minimum stays, and gap-night strategy that keep your calendar and rates working.',
    eyebrow: 'Owners · Revenue Strategy',
    h1: 'Airbnb <em>Revenue Management</em> in San Antonio',
    lead: "Don’t leave your nightly rate on autopilot. Pricing adjusts to demand, seasonality, and booking patterns so your calendar and rate work together.",
    heroProperty: 'legislation-4br',
    widget: 'revenue',
    intro: {
      h2: 'One price all month is <em>a pricing decision</em> too',
      paragraphs: [
        'A rate that never moves is usually too low on the weekends people want most and too high on the nights nobody is traveling. Both cost you money: one in underpriced bookings, the other in empty nights.',
        'Revenue management keeps adjusting: nightly rates, minimum stays, and booking windows shift with San Antonio’s demand so your calendar and your rate work together.',
      ],
    },
    pillars: [
      { icon: 'chart', title: 'Dynamic Pricing', hook: 'Rates that follow real demand.', text: 'Nightly prices adjust with market trends, day of week, and how far out guests book.' },
      { icon: 'calendar', title: 'Calendar Strategy', hook: 'Fewer orphan nights.', text: 'Minimum-stay rules and gap-night pricing that keep short openings bookable.' },
      { icon: 'compass', title: 'Local Demand Awareness', hook: 'San Antonio moves in seasons.', text: 'Spring travel, summer family trips, conventions, graduations, and holidays all shift demand.' },
      { icon: 'eye', title: 'Clear Insights', hook: 'See what your pricing is doing.', text: 'Transparent pricing performance data with quarterly analysis.' },
    ],
    detail: {
      h2: 'What we watch on your calendar',
      paragraphs: [
        'Revenue strategy is a set of small, frequent decisions. Listing and pricing optimization is supported by a dedicated revenue management partner, with real-time adjustments based on market trends.',
      ],
      bullets: [
        'Dynamic nightly pricing',
        'Weekday vs. weekend rate strategy',
        'Seasonality and local event demand',
        'Minimum-stay and length-of-stay rules',
        'Booking-window and last-minute strategy',
        'Gap-night and orphan-night pricing',
        'Calendar optimized for peak booking times',
        'Revenue-boosting strategies tailored to your property',
      ],
    },
    faqs: [
      { q: 'How does Airbnb dynamic pricing work?', a: 'Dynamic pricing adjusts your nightly rate based on factors such as demand, seasonality, day of the week, booking lead time, and local events, rather than holding one fixed price.' },
      { q: 'Can you guarantee a revenue increase?', a: 'No honest operator can guarantee revenue. Performance depends on the property, location, amenities, reviews, and market conditions. The goal is a pricing strategy that consistently responds to demand.' },
      { q: 'Will I be able to see pricing performance?', a: 'Yes. Owners receive clear insight into pricing performance data through our hosting tools.' },
    ],
    related: ['airbnb-management-san-antonio', 'airbnb-listing-optimization-san-antonio', 'mid-term-rental-management-san-antonio'],
  },
  {
    slug: 'airbnb-listing-optimization-san-antonio',
    navLabel: 'Listing Optimization',
    metaTitle: 'Airbnb Listing Optimization San Antonio | Hosted Havens',
    metaDescription: 'Airbnb listing optimization in San Antonio: professional photography, titles, descriptions, and amenity positioning that help guests choose your stay.',
    eyebrow: 'Owners · Listing Optimization',
    h1: 'Airbnb <em>Listing Optimization</em> in San Antonio',
    lead: 'Guests decide in seconds while they scroll. Professional photos, clear positioning, and a listing that sets accurate expectations make those seconds count.',
    heroProperty: 'the-harding-place',
    widget: 'listing',
    intro: {
      h2: '“Furnished” is not the same as <em>optimized</em>',
      paragraphs: [
        'A furnished home has beds, seating and kitchenware. An optimized short-term rental is intentionally prepared to perform: it photographs well, guides guests intuitively and protects the property from avoidable wear.',
        'Your listing is the first version of your home guests experience. Photography, title, description, and amenity choices decide whether they click, book, and leave a favorable review that matches what they expected.',
      ],
    },
    pillars: [
      { icon: 'camera', title: 'Professional Photography', hook: 'Complimentary with onboarding.', text: 'Residential and drone photography that shows the space honestly and beautifully.' },
      { icon: 'file', title: 'Titles & Descriptions', hook: 'Say what makes it worth booking.', text: 'Clear, specific copy that highlights the features guests actually search for.' },
      { icon: 'star', title: 'Amenity Positioning', hook: 'Lead with what guests value.', text: 'Workspaces, pet-friendly setups, outdoor space, and family features, surfaced properly.' },
      { icon: 'compass', title: 'Built-In Guidance', hook: 'Fewer questions, fewer surprises.', text: 'A custom home guidebook and clear expectations before and during the stay.' },
    ],
    detail: {
      h2: 'Where we look for improvement',
      paragraphs: [
        'Optimization starts with an honest review of how your home appears online and how it works in person. Small, deliberate changes often make the biggest difference.',
      ],
      bullets: [
        'Photo order, lighting, composition, and coverage',
        'Listing title and first lines of the description',
        'Amenity accuracy and positioning',
        'Layout flow and focal points for photos',
        'House manual, signage, and supply placement',
        'Guest expectations that match reality, and the reviews that follow',
      ],
    },
    faqs: [
      { q: 'Is professional photography included?', a: 'Complimentary professional photography is part of onboarding, along with complete listing creation and optimization.' },
      { q: 'My home is already furnished. Is that enough?', a: 'Often not. Furnished homes can feel comfortable in person but look flat online or generate avoidable guest questions. A <a href="/property-analysis/">property analysis</a> shows where small changes could help.' },
    ],
    related: ['airbnb-setup-san-antonio', 'airbnb-revenue-management-san-antonio', 'airbnb-management-san-antonio'],
  },
  {
    slug: 'airbnb-setup-san-antonio',
    navLabel: 'New Host Setup',
    metaTitle: 'Airbnb Setup San Antonio | Launch a Short-Term Rental',
    metaDescription: 'Launching an Airbnb in San Antonio? Hosted Havens helps new hosts with property assessment, photography, listing creation, and guest-ready setup.',
    eyebrow: 'Owners · New Host Setup',
    h1: 'Launch Your <em>San Antonio</em> Short-Term Rental the Right Way',
    lead: 'From a home you own to a guest-ready listing: assessment, recommendations, photography, listing creation, and the systems that make the first bookings go smoothly.',
    heroProperty: 'la-maison-blount',
    widget: 'launch',
    intro: {
      h2: 'The first 90 days <em>shape the listing</em>',
      paragraphs: [
        'Early reviews, early photos, and early pricing decisions follow a listing for a long time. Launching carefully is far easier than repairing a slow start.',
        'Hosted Havens begins with a customized property assessment and a tailored action plan, then builds the listing, pricing and guest experience around what your home does best.',
      ],
    },
    pillars: [
      { icon: 'eye', title: 'Property Assessment', hook: 'Know where you stand.', text: 'A walkthrough of layout, condition, guest appeal, and suggested upgrades.' },
      { icon: 'layers', title: 'Action Plan', hook: 'A clear path to launch.', text: 'A tailored plan from start to finish, with no guessing at what comes next.' },
      { icon: 'camera', title: 'Photos & Listing', hook: 'Launch looking your best.', text: 'Complimentary professional photography and complete listing creation.' },
      { icon: 'shield', title: 'Guest-Ready Systems', hook: 'Ready before the first arrival.', text: 'Guidebook, supplies, cleaning standards, and check-in processes in place.' },
    ],
    detail: {
      h2: 'What goes into a launch',
      paragraphs: [
        'Operating an STR in San Antonio also involves local requirements such as permits and Hotel Occupancy Tax reporting. Our <a href="/resources/san-antonio-str-rules/">San Antonio STR rules guide</a> is a good starting point. Confirm current requirements with the City before launching.',
      ],
      bullets: [
        'Customized property assessment and estimate',
        'Upgrade and furnishing recommendations',
        'Complimentary professional photography',
        'Complete listing creation and optimization',
        'Opening pricing and calendar strategy',
        'Custom home guidebook',
        'Cleaning, restocking, and inspection standards',
        'Guest communication and check-in processes',
      ],
    },
    faqs: [
      { q: 'Can you launch a brand-new short-term rental?', a: 'Yes. Hosted Havens works with owners launching a new STR as well as owners with existing listings.' },
      { q: 'What is the setup fee?', a: 'The one-time listing setup fee is typically $150–$500, depending on the property and scope.' },
    ],
    related: ['airbnb-listing-optimization-san-antonio', 'airbnb-management-san-antonio', 'pricing'],
  },
  {
    slug: 'str-property-care-san-antonio',
    navLabel: 'Property Care',
    metaTitle: 'STR Property Care San Antonio | Cleaning & Maintenance',
    metaDescription: 'Short-term rental property care in San Antonio: professional cleaning, inspections, proactive maintenance, restocking, and guest arrival preparation.',
    eyebrow: 'Owners · Property Care',
    h1: 'Short-Term Rental <em>Property Care</em> in San Antonio',
    lead: 'Every turnover is an inspection, a reset and a first impression. Cleaning, inspections, maintenance, and restocking, all coordinated so your home is guest-ready and protected.',
    heroProperty: 'coastal-run',
    widget: 'care',
    intro: {
      h2: 'Cleaning is only <em>part of the turnover</em>',
      paragraphs: [
        'A great cleaner is essential. But professional property care goes further: consistent inspection checklists, supply restocking, damage prevention, and follow-through on the small issues before they become reviews.',
        'A smudge, a missing towel, or a slow repair can undo a five-star stay. Consistent standards protect both the guest experience and the long-term condition of your home.',
      ],
    },
    pillars: [
      { icon: 'broom', title: 'Professional Cleaning', hook: 'After every stay.', text: 'Thorough cleaning to hospitality standards, turnover after turnover.' },
      { icon: 'shield', title: 'Routine Inspections', hook: 'Catch it before a guest does.', text: 'Inspections and quality assurance that surface issues early.' },
      { icon: 'wrench', title: 'Proactive Maintenance', hook: 'Small fixes, fast.', text: 'Maintenance coordination that keeps the home in top condition.' },
      { icon: 'sparkle', title: 'Arrival Setup & Restocking', hook: 'Replenish before every stay.', text: 'Low-inventory alerts, restocking, and guest arrival preparation.' },
    ],
    detail: {
      h2: 'The details behind a guest-ready home',
      paragraphs: [],
      bullets: [
        'Thorough professional cleaning after each stay',
        'Inspection checklists and quality assurance',
        'Routine inspections and proactive maintenance',
        'Low-inventory alerts and product restocking',
        'Guest arrival setup',
        'Custom home guidebook',
        'Damage prevention and reporting',
      ],
    },
    faqs: [
      { q: 'Who handles cleaning?', a: 'Hosted Havens coordinates thorough professional cleaning after each stay as part of full-service co-hosting.' },
      { q: 'Who handles maintenance?', a: 'Our maintenance coordination covers routine inspections, proactive maintenance, urgent needs, and follow-ups, keeping owners informed on the bigger issues.' },
    ],
    related: ['airbnb-management-san-antonio', 'airbnb-co-host-san-antonio', 'airbnb-setup-san-antonio'],
  },
];

export const serviceLabel: Record<string, { label: string; href: string }> = {
  ...Object.fromEntries(services.map((s) => [s.slug, { label: s.navLabel, href: `/${s.slug}/` }])),
  pricing: { label: 'Pricing', href: '/pricing/' },
  'furnished-rentals-near-randolph-afb': { label: 'Stays Near Randolph AFB', href: '/furnished-rentals-near-randolph-afb/' },
};
