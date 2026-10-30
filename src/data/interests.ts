import { query } from './client';
import type { InterestCategory, InterestCategoryId, SubInterest } from './types';

const sub = (
  categoryId: InterestCategoryId,
  id: string,
  label: string,
): SubInterest => ({ id, categoryId, label });

export const interestCategories: InterestCategory[] = [
  {
    id: 'tradition',
    label: 'Tradition',
    icon: 'book-outline',
    blurb: 'Heritage, roots, and ancestral story.',
    subInterests: [
      sub('tradition', 'tradition-heritage', 'Heritage + ancestry'),
      sub('tradition', 'tradition-festivals', 'Festivals + ceremony'),
      sub('tradition', 'tradition-history', 'History + landmarks'),
      sub('tradition', 'tradition-language', 'Language + proverbs'),
    ],
  },
  {
    id: 'music',
    label: 'Music',
    icon: 'musical-notes-outline',
    blurb: 'Rhythm, nightlife, and live sound.',
    subInterests: [
      sub('music', 'music-live', 'Live shows'),
      sub('music', 'music-drumming', 'Drumming + dance'),
      sub('music', 'music-afrobeats', 'Afrobeats + nightlife'),
      sub('music', 'music-vinyl', 'Record digging'),
    ],
  },
  {
    id: 'adventure',
    label: 'Adventure',
    icon: 'compass-outline',
    blurb: 'Trails, coast, and the unexpected.',
    subInterests: [
      sub('adventure', 'adventure-hiking', 'Hiking + trails'),
      sub('adventure', 'adventure-waterfalls', 'Waterfalls'),
      sub('adventure', 'adventure-coastal', 'Coastal adventures'),
      sub('adventure', 'adventure-night', 'Guided night journeys'),
    ],
  },
  {
    id: 'food',
    label: 'Food',
    icon: 'restaurant-outline',
    blurb: 'Markets, kitchens, and shared tables.',
    subInterests: [
      sub('food', 'food-street', 'Street food'),
      sub('food', 'food-home', 'Home cooking'),
      sub('food', 'food-markets', 'Markets + sourcing'),
      sub('food', 'food-fine', 'Chefs + fine dining'),
    ],
  },
  {
    id: 'art',
    label: 'Art + design',
    icon: 'color-palette-outline',
    blurb: 'Makers, studios, and craft.',
    subInterests: [
      sub('art', 'art-textiles', 'Textiles + kente'),
      sub('art', 'art-studios', 'Studio visits'),
      sub('art', 'art-galleries', 'Galleries'),
      sub('art', 'art-craft', 'Craft + objects'),
    ],
  },
  {
    id: 'wellbeing',
    label: 'Wellbeing',
    icon: 'leaf-outline',
    blurb: 'Rest, care, and a slower pace.',
    subInterests: [
      sub('wellbeing', 'wellbeing-spa', 'Spa + massage'),
      sub('wellbeing', 'wellbeing-yoga', 'Yoga + movement'),
      sub('wellbeing', 'wellbeing-beauty', 'Hair + beauty'),
      sub('wellbeing', 'wellbeing-retreat', 'Quiet + retreat'),
    ],
  },
  {
    id: 'community',
    label: 'Community',
    icon: 'people-outline',
    blurb: 'People, gatherings, and belonging.',
    subInterests: [
      sub('community', 'community-meetups', 'Meetups + socials'),
      sub('community', 'community-faith', 'Faith + fellowship'),
      sub('community', 'community-service', 'Service + giving back'),
      sub('community', 'community-diaspora', 'Diaspora circles'),
    ],
  },
  {
    id: 'nature',
    label: 'Nature',
    icon: 'sunny-outline',
    blurb: 'Land, water, and open air.',
    subInterests: [
      sub('nature', 'nature-wildlife', 'Wildlife + parks'),
      sub('nature', 'nature-beaches', 'Beaches'),
      sub('nature', 'nature-gardens', 'Gardens + farms'),
      sub('nature', 'nature-sunrise', 'Sunrise + sunset spots'),
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    icon: 'briefcase-outline',
    blurb: 'Business, building, and investing.',
    subInterests: [
      sub('enterprise', 'enterprise-startups', 'Startups + tech'),
      sub('enterprise', 'enterprise-realestate', 'Real estate'),
      sub('enterprise', 'enterprise-invest', 'Investing + trade'),
      sub('enterprise', 'enterprise-networking', 'Networking'),
    ],
  },
];

const byId = new Map(interestCategories.map((c) => [c.id, c]));
const subById = new Map(
  interestCategories.flatMap((c) => c.subInterests.map((s) => [s.id, s] as const)),
);

export function getInterestCategories() {
  return query(() => interestCategories);
}

export function getCategory(id: InterestCategoryId) {
  return query(() => byId.get(id) ?? null);
}

/** Pure helper (no latency) for mapping selections back to their categories. */
export function categoriesForSelection(subIds: string[]): InterestCategoryId[] {
  const set = new Set<InterestCategoryId>();
  for (const id of subIds) {
    const s = subById.get(id);
    if (s) set.add(s.categoryId);
  }
  return [...set];
}

export function labelForCategory(id: InterestCategoryId): string {
  return byId.get(id)?.label ?? id;
}
