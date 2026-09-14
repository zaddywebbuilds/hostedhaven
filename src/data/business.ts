// Single source of truth for business facts, links and claims.
// Anything marked `verified: false` must NOT render publicly until the owner confirms it (see OWNER-VERIFY.md).

export const business = {
  name: 'Hosted Havens LLC',
  shortName: 'Hosted Havens',
  tagline: 'Your Property. Our Priority.',
  guestTagline: 'Feel at home, anywhere.',
  founder: 'Megan Blount',
  phone: '+12102398773',
  displayPhone: '+1 (210) 239-8773',
  guestEmail: 'hello@hostedhavens.co',
  ownerEmail: 'owners@hostedhavens.co',
  city: 'San Antonio',
  state: 'TX',
  region: 'Texas',
  country: 'US',
  serviceArea: ['San Antonio', 'Converse', 'Universal City', 'Live Oak'],
  domain: 'https://hostedhavens.co',
};

export const links = {
  // Verified from the live site (2026-09-14)
  intakeForm: 'https://form.typeform.com/to/e4sXEear',
  calendlyAnalysisTour: 'https://calendly.com/hostedhavensco/property-analysis-tour',
  calendlyReviewMeeting: 'https://calendly.com/hostedhavens/property-review-meeting',
  calendlyIntakeMeeting: 'https://calendly.com/hostedhavens/co-hosting-intake',
  guestLounge: 'https://www.facebook.com/groups/hostedhavensguestlounge',
  airbnbProfile: 'https://www.airbnb.com/p/hostedhavensco',
  ownerSignIn: 'https://hostedhavens.co/sign-in',
  ownerPortal: 'https://owners.hostedhavens.co',
};

export const socials = [
  { name: 'Facebook', href: 'https://facebook.com/hostedhavensco', icon: 'facebook' },
  { name: 'Instagram', href: 'https://instagram.com/hostedhavensco', icon: 'instagram' },
  { name: 'TikTok', href: 'https://tiktok.com/@hostedhavensco', icon: 'tiktok' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/meganblount-hostedhavensco/', icon: 'linkedin' },
];

// Placeholders stay empty until real IDs are supplied. Nothing loads while empty.
export const analytics = {
  ga4Id: '',
  metaPixelId: '',
  googleSiteVerification: '',
  bingSiteVerification: '',
};

// Where the /property-analysis/ form posts. Leave empty to fall back to the verified Typeform intake.
export const formEndpoint = '';

export const pricing = {
  managementFee: '18%–22%',
  managementFeeUnit: 'per booking',
  setupFee: '$150–$500',
  setupFeeUnit: 'one-time listing setup',
  note: 'Final pricing depends on property type, condition, service requirements and agreed scope.',
  source: 'Published on hostedhavens.co owner FAQ',
};

export const credentials = [
  { label: 'Airbnb Promoted Co-Host', verified: false },
  { label: 'Volunteer Airbnb San Antonio Community Leader', verified: false },
  { label: 'Member, Short Term Rental Association of San Antonio', verified: false },
];

// Published on the current site but unverified — hidden until confirmed.
export const businessStats = {
  occupancyClaim: { value: '75%+', label: 'Typical occupancy on hosted properties', verified: false },
  annualRevenueLiftClaim: { value: '$15K', label: 'More per year vs. properties not hosted by Hosted Havens', verified: false },
  airbnbRating: { value: '', label: 'Average guest rating on Airbnb', verified: false },
  reviewCount: { value: '', label: 'Guest reviews', verified: false },
  propertyCount: { value: '', label: 'Properties hosted', verified: false },
};

export const resultsDisclaimer = 'Results vary by property, location, seasonality, amenities, pricing and market conditions.';

export const ownerTestimonials = [
  { quote: 'Thanks, Megan. I appreciate our partnership and your professionalism.', name: 'Kyle', role: 'Home owner and Airbnb host' },
];

export const guestReviews = [
  { quote: 'This was in a convenient location for our visit. Easy access to Loop 1604. Megan is very friendly and helpful… and quick… in her interactions. Would definitely stay here again if needed.', name: 'Melanie', from: 'Atlanta, GA' },
  { quote: 'Had a fantastic stay at Megan’s Airbnb! The place was clean, cozy, and pet-friendly, which was a huge plus. Megan was a great host — responsive and thoughtful. Highly recommend!', name: 'Chance', from: 'Wichita, KS' },
  { quote: 'The casita was in a convenient location, comfortable with modern updates inside and outside. We enjoyed our stay over the Labor Day weekend!', name: 'Abel', from: 'Lubbock, TX' },
  { quote: 'Ideal stop at Megan’s house. Easy to access and far from the hustle and bustle of San Antonio, we very much enjoyed the calm to sleep. Bedding, bathroom and kitchen — everything was spotless!', name: 'Stéphanie', from: 'Orléans, France' },
];

export const team = [
  { name: 'Megan', role: 'Founder', blurb: 'Leads strategy, owner relationships and the guest experience standard.', image: 'team/megan-blount-hosted-havens-founder.webp', photo: true },
  { name: 'Kemi', role: 'Guest Services', blurb: 'Customer service and virtual assistance — the voice guests hear first.', image: 'team/ks.svg', photo: false },
  { name: 'Christina', role: 'Maintenance Coordinator', blurb: 'Inspections, quality assurance and guest arrival setup.', image: 'team/cr.png', photo: false },
  { name: 'Pretty', role: 'Creative', blurb: 'Social media and website management.', image: 'team/pn.png', photo: false },
  { name: 'CS Outsourcing', role: 'Revenue Management', blurb: 'Listing and pricing optimization.', image: 'team/cs-outsourcing.png', photo: false },
  { name: 'Mark', role: 'Photographer', blurb: 'Professional residential and drone photography.', image: 'team/mm.png', photo: false },
];

export const values = [
  { title: 'Hospitality First', text: 'Every booking is a guest experience, and every guest experience affects your asset.' },
  { title: 'Quality Over Shortcuts', text: 'Cleanliness, presentation and communication shape both reviews and long-term performance.' },
  { title: 'Adapt Quickly', text: 'Pricing and guest demand move. Strategy should move with them.' },
  { title: 'Lead With Empathy', text: 'Owners and guests are people first. Problems get solved with patience, not scripts.' },
  { title: 'Clear, Honest Communication', text: 'You should always understand what is happening with your property — and why.' },
];
