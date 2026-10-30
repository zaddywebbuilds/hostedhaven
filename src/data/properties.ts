// Property inventory. Each listing is one JSON file in ./properties/, editable from
// the admin at /admin/ so Megan can add or remove a stay without a code change.
// Originally sourced from hostedhavens.co listings (2026-09-14).

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
  widgetId: number;
  featured?: boolean;
};

// Every Hospitable booking widget sits under this one base, so the booking URL is
// derived from widgetId rather than stored. Keeps it out of the admin form.
const BOOKING_BASE = 'https://booking.hospitable.com/widget/a172bb81-09b1-4a40-86cb-58ab5f6c1bf4/';

/** Shape on disk: no bookingUrl (derived), plus the sort key. */
type PropertyFile = Omit<Property, 'bookingUrl'> & { order?: number };

const files = import.meta.glob<{ default: PropertyFile }>('./properties/*.json', { eager: true });

// The admin writes "" for an optional field left blank and [] for an empty list.
// Templates test these with `&&` and `!== undefined`, where "" and [] read as
// "present" and would show empty blocks or put a stay on the wrong base page.
function normalise(p: PropertyFile): PropertyFile {
  const out = { ...p } as Record<string, unknown>;
  for (const k of ['area', 'mapQuery', 'group', 'nearBase']) {
    if (out[k] === '' || out[k] === null) delete out[k];
  }
  for (const k of ['distances', 'notes']) {
    if (!(out[k] as unknown[] | undefined)?.length) delete out[k];
  }
  if (!out.monthlyMinNights) delete out.monthlyMinNights;
  return out as PropertyFile;
}

export const properties: Property[] = Object.values(files)
  .map((m) => normalise(m.default))
  .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || a.slug.localeCompare(b.slug))
  .map(({ order: _order, ...p }) => ({ ...p, bookingUrl: `${BOOKING_BASE}${p.widgetId}` }));

export const featuredProperties = properties.filter((p) => p.featured);
export const cities = [...new Set(properties.map((p) => p.city))];
export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
