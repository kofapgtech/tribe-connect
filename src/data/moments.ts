import { query } from './client';
import type { Moment } from './types';

/**
 * TribeConnect feed — a vertical scroll of "moments." Three kinds:
 *   media     — a maker/member post (references a host in experiences.ts)
 *   gathering — an event the member can join
 *   note      — a short concierge note
 *
 * Mock data only; same repository pattern as the other data modules.
 */
export const seedMoments: Moment[] = [
  {
    type: 'media',
    id: 'm-efua-sunrise',
    hostId: 'host-efua',
    tone: 'cool',
    mediaCaption: 'Sunrise over Cape Coast',
    caption:
      'A two-hour sunrise walk of Cape Coast before the crowds — the castle, the fishing bay, and the quiet morning light Efua grew up with. Small groups, led on foot.',
    action: { label: 'Add to your Journey', dest: 'MyJourney' },
  },
  {
    type: 'gathering',
    id: 'g-welcome-dinner',
    day: 'Fri',
    place: 'Osu',
    title: 'Welcome dinner for arriving travelers',
    going: 6,
    attendees: ['A', 'K', 'M'],
    action: { label: 'See the gathering', dest: 'MyTribe' },
  },
  {
    type: 'media',
    id: 'm-kwabena-kente',
    hostId: 'host-kwabena',
    tone: 'gold',
    mediaCaption: "Today's warp on the loom",
    caption:
      'Hand-woven kente strips, each pattern carrying a proverb. Made to order on the loom in Teshie — ships worldwide, or meet Kwabena in person to choose your cloth.',
    price: '₵240',
    action: { label: 'Buy', dest: 'Exchange' },
  },
  {
    type: 'media',
    id: 'm-maya-rooftop',
    hostId: 'host-maya',
    tone: 'warm',
    mediaCaption: 'Rooftop sundown, Osu',
    caption: 'First trip home and already a favourite spot. Golden hour over Osu never misses.',
  },
  {
    type: 'note',
    id: 'n-harmattan',
    title: 'A note from your concierge',
    text: 'Harmattan season is here — pack a light scarf for the dusty evenings. Tap to ask us anything.',
  },
  {
    type: 'gathering',
    id: 'g-seeker-circle',
    day: 'Sat',
    place: 'J-town',
    title: 'Seeker circle with Nana Ama',
    going: 9,
    attendees: ['A', 'E', 'K'],
    action: { label: 'See the gathering', dest: 'MyTribe' },
  },
  {
    type: 'media',
    id: 'm-akosua-tote',
    hostId: 'host-akosua',
    tone: 'cool',
    mediaCaption: 'Fresh indigo totes, off the vats',
    caption:
      'A hand-dyed indigo tote, adinkra-stamped by hand in Ntonso. One of a kind — no two stamps ever fall the same. Natural dye, sturdy cotton canvas.',
    price: '₵180',
    action: { label: 'Buy', dest: 'Exchange' },
  },
  {
    type: 'gathering',
    id: 'g-makers-market',
    day: 'Sun',
    place: 'J-town',
    title: "Makers' market — meet the artisans",
    going: 14,
    attendees: ['K', 'A', 'E'],
    action: { label: 'See the market', dest: 'Exchange' },
  },
];

export function getMoments() {
  return query(() => seedMoments);
}
