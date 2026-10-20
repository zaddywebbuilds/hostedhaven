// Single source of truth for business facts, links, and claims.
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
  // Megan's own "Co-Hosting Intake Form (2mins)" in Mailchimp. This is the real
  // intake: owners fill it in on /property-analysis/ and the response lands in her
  // audience, which is her CRM. The campaign link carries a trailing &e=*|UNIQID|*
  // merge tag that only resolves inside a Mailchimp email, so it is dropped here.
  intakeSurvey: 'https://us11.list-manage.com/survey?u=6eaf2d165e149563724adbda3&id=76ef1a1d11',
  calendlyAnalysisTour: 'https://calendly.com/hostedhavensco/property-analysis-tour',
  // Deliberately no property-review-meeting link: Megan uses it privately with
  // new leads after their tour and asked that it not be published.
  ownerCheckIn: 'https://calendly.com/hostedhavensco/owner-check-in',
  calendlyIntakeMeeting: 'https://calendly.com/hostedhavens/co-hosting-intake',
  serviceVideo: '/service-video/',
  guestLounge: 'https://www.facebook.com/groups/hostedhavensguestlounge',
  airbnbProfile: 'https://www.airbnb.com/p/hostedhavensco',
  ownerSignIn: 'https://hostedhavens.co/sign-in',
  ownerPortal: 'https://owners.hostedhavens.co',
};

/*
 * No Mailchimp integration here on purpose. Audience 7b29e79066 was wired up and
 * tested on 2026-10-13: a fully valid payload comes back as
 * {"result":"redirect","msg":"captcha"} from a real browser on our own origin, so
 * the hosted form will not take posts from this site and no contact is created.
 * Megan's survey link cannot be posted to either; it 404s on /subscribe. The
 * intake therefore reaches her by email through formAccessKey below, and contacts
 * are added to the CRM by hand. Reinstating this needs the Mailchimp API behind a
 * serverless endpoint, since a static host cannot hold an API key.
 */

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

// Where the /property-intake/ form posts. Leave empty to fall back to the verified Typeform intake.
export const formEndpoint = '';

// Web3Forms access key (free). Get one at https://web3forms.com by entering owners@hostedhavens.co;
// the key is emailed to that inbox. Submissions then arrive there directly.
// Web3Forms keys are designed to live in client-side markup: the key only routes
// mail to its own verified inbox, so it is not a secret.
export const formAccessKey = '5bf82241-03b3-405c-aaf6-a074ad6eede3';

export const pricing = {
  managementFee: '19%–24%',
  managementFeeUnit: 'per booking',
  setupFee: '$150–$500',
  setupFeeUnit: 'one-time listing setup',
  note: 'Final pricing depends on property type, condition, service requirements, and agreed scope. Minimum contract length 4–12 months.',
  source: 'Published on hostedhavens.co owner FAQ',
};

export const credentials = [
  { label: 'Airbnb Promoted Co-Host', verified: false },
  { label: 'Volunteer Airbnb San Antonio Community Leader', verified: false },
  { label: 'Member, Short Term Rental Association of San Antonio', verified: false },
];

// Published on the current site but unverified, hidden until confirmed.
export const businessStats = {
  occupancyClaim: { value: '75%+', label: 'Typical occupancy on hosted properties', verified: false },
  annualRevenueLiftClaim: { value: '$15K', label: 'More per year vs. properties not hosted by Hosted Havens', verified: false },
  airbnbRating: { value: '', label: 'Average guest rating on Airbnb', verified: false },
  reviewCount: { value: '', label: 'Guest reviews', verified: false },
  propertyCount: { value: '', label: 'Properties hosted', verified: false },
};

export const resultsDisclaimer = 'Results vary by property, location, seasonality, amenities, pricing, and market conditions.';

// Quotes are reproduced verbatim from the reviewer's own words. Do not tidy,
// shorten, or paraphrase them: they are attributed to real people.
export const ownerTestimonials = [
  // Google review, Hosted Havens LLC business profile, posted March 2026.
  {
    quote: 'I am so grateful to have found Hosted Havens as a property owner. I had been considering selling my property because I just couldn’t afford it with no rentals. Hosted Havens have turned around my rental from a complete non-earner to having the best 3 months we have had in 2 years of it being a short term rental. Megan really talks to you and listens and works with you to support your needs. I wanted a property manager that takes care of everything and Hosted Havens is that and I couldn’t be happier.',
    name: 'Lea',
    role: 'Property owner',
  },
  // Google review, posted by Kyle McAlpin. Replaces his earlier one-line quote,
  // which was the same person, so he is not listed twice.
  {
    quote: 'I’ve worked with Hosted Havens for a long time now and found them highly professional and effective. I’d strongly recommend them for hands-off property management.',
    name: 'Kyle',
    role: 'Home owner and Airbnb host',
  },
  // Google review, posted by Patrick Stefl.
  {
    quote: 'Hosted Havens has been a great property management organization to work with. They were always very responsive and proactive in handling issues, whether they be maintenance or tenant related. I highly recommend them.',
    name: 'Patrick',
    role: 'Property owner',
  },
  // Google review posted under the display name "Office Email"; Megan confirmed
  // (2026-10-07) that it is Andrew.
  {
    quote: 'Megan and her team are excellent at being cohosts. From booking the property to dealing with the occasional guest that makes us all cringe, she deals with it all! Highly recommended and wonderful to work with.',
    name: 'Andrew',
    role: 'Property owner',
  },
];

// Megan asked (2026-10-19) that the owner review change from page to page
// instead of Lea's showing on all of them: "if you read it here you don't need
// to read it on six other pages". Lea's stays on the home page and leads the
// results page; the service pages rotate through the others by their position
// in the services list, so a page always renders the same review build to build.
export const rotatingOwnerTestimonials = ownerTestimonials.slice(1);
export const ownerTestimonialAt = (i: number) =>
  rotatingOwnerTestimonials[((i % rotatingOwnerTestimonials.length) + rotatingOwnerTestimonials.length) % rotatingOwnerTestimonials.length];

export const guestReviews = [
  // Google review, posted by Michael Place.
  { quote: 'Fabulous accommodations in a perfect location in San Antonio! Hosts were always so hospitable! The units are spotless!', name: 'Michael', from: 'Google review' },
  { quote: 'This was in a convenient location for our visit. Easy access to Loop 1604. Megan is very friendly and helpful… and quick… in her interactions. Would definitely stay here again if needed.', name: 'Melanie', from: 'Atlanta, GA' },
  { quote: 'Had a fantastic stay at Megan’s Airbnb! The place was clean, cozy, and pet-friendly, which was a huge plus. Megan was a great host, responsive and thoughtful. Highly recommend!', name: 'Chance', from: 'Wichita, KS' },
  { quote: 'The casita was in a convenient location, comfortable with modern updates inside and outside. We enjoyed our stay over the Labor Day weekend!', name: 'Abel', from: 'Lubbock, TX' },
  { quote: 'Ideal stop at Megan’s house. Easy to access and far from the hustle and bustle of San Antonio, we very much enjoyed the calm to sleep. Bedding, bathroom, and kitchen: everything was spotless!', name: 'Stéphanie', from: 'Orléans, France' },
];

export const team = [
  { name: 'Megan', role: 'Founder', blurb: 'Leads strategy, owner relationships, and the guest experience standard.', image: 'team/megan-blount-hosted-havens-founder.webp', photo: true },
  { name: 'Christina', role: 'Operations Manager', blurb: 'Maintenance coordination, inspections, and quality assurance.', image: 'team/cr.png', photo: false },
  { name: 'Kemi & Trust', role: 'Virtual Assistants', blurb: 'Guest and owner services, and first point of contact for customer outreach.', image: 'team/ks.svg', photo: false },
  { name: 'CS Outsourcing', role: 'Revenue Management', blurb: 'Listing and pricing optimization.', image: 'team/cs-outsourcing.png', photo: false },
  { name: 'Johno', role: 'Web Developer', blurb: 'Website design, build, and social media management.', image: 'team/johno.svg', photo: false },
  { name: 'Mark', role: 'Photographer', blurb: 'Professional residential and drone photography.', image: 'team/mm.png', photo: false },
];

export const values = [
  { title: 'Hospitality First', text: 'Every booking is a guest experience, and every guest experience affects your asset.' },
  { title: 'Quality Over Shortcuts', text: 'Cleanliness, presentation, and communication shape both reviews and long-term performance.' },
  { title: 'Adapt Quickly', text: 'Pricing and guest demand move. Strategy should move with them.' },
  { title: 'Lead With Empathy', text: 'Owners and guests are people first. Problems get solved with patience, not scripts.' },
  { title: 'Clear, Honest Communication', text: 'You should always understand what is happening with your property, and why.' },
];
