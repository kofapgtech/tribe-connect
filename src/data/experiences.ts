import { query } from './client';
import type { Experience, Host } from './types';

export const hosts: Host[] = [
  {
    id: 'host-abena',
    name: 'Abena',
    role: 'studio host',
    bio: 'Textile maker in Osu. Shares the process, the people, and the stories woven into the cloth.',
    interests: ['art', 'tradition'],
    verified: true,
    rating: 4.9,
    reviewCount: 42,
  },
  {
    id: 'host-kojo',
    name: 'Kojo',
    role: 'driver + guide',
    bio: 'Accra born and raised. Two-day minimum so there is time to actually know the city together.',
    interests: ['adventure', 'community'],
    verified: true,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: 'host-esi',
    name: 'Esi',
    role: 'home kitchen host',
    bio: 'Cooks the dishes she grew up with and sends you home knowing how to make one yourself.',
    interests: ['food', 'wellbeing'],
    verified: true,
    rating: 5.0,
    reviewCount: 31,
  },
];

export const experiences: Experience[] = [
  {
    id: 'exp-studio',
    title: 'Studio visit + shared lunch',
    summary: 'Meet a maker, see the craft, and stay for a meal.',
    location: 'Osu, Accra',
    priceLabel: 'from GHS 450',
    hostId: 'host-abena',
    categoryId: 'art',
  },
  {
    id: 'exp-citydrive',
    title: 'A day across Accra',
    summary: 'Jamestown, markets, and the coast — with someone who knows them.',
    location: 'Greater Accra',
    priceLabel: 'from GHS 900 / day',
    hostId: 'host-kojo',
    categoryId: 'adventure',
  },
  {
    id: 'exp-kitchen',
    title: 'Home kitchen table',
    summary: 'Cook and eat jollof, red-red, and kelewele in a family kitchen.',
    location: 'East Legon, Accra',
    priceLabel: 'from GHS 380',
    hostId: 'host-esi',
    categoryId: 'food',
  },
];

const hostById = new Map(hosts.map((h) => [h.id, h]));

export function getExperiences() {
  return query(() => experiences);
}

export function getHost(id: string) {
  return query(() => hostById.get(id) ?? null);
}

export function hostForExperienceSync(exp: Experience): Host | null {
  return hostById.get(exp.hostId) ?? null;
}
