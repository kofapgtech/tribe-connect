import { query } from './client';
import type { Thread, TribeFilter } from './types';

/** Filter lenses for the people/threads list. */
export const tribeFilters: TribeFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'group', label: 'Crew' },
  { id: 'connection', label: 'Tribe' },
  { id: 'navigator', label: 'Navigator' },
  { id: 'concierge', label: 'Concierge' },
];

/** Your people — chats, pinned first. */
export const threads: Thread[] = [
  { id: 'group', name: 'Crew', last: "Ama: can't wait for Friday dinner!", time: '12m', cat: 'group', tag: '5 people', tone: 'plum', unread: 3, pinned: true },
  { id: 'nav', name: 'Kwame · Navigator', last: "6 min away — I'll meet you at the lighthouse gate.", time: '2m', cat: 'navigator', tag: 'Navigator', tone: 'forest', vetted: true, unread: 1, crew: true },
  { id: 'concierge', name: 'Concierge', last: 'Your Kente workshop is confirmed ✓', time: '1h', cat: 'concierge', tag: 'Concierge', tone: 'gold', vetted: true, crew: true },
  { id: 'kwabena', name: 'Kwabena', last: 'Come by the loom whenever you like.', time: '3h', cat: 'connection', tag: 'Kente & craft', tone: 'gold', vetted: true },
  { id: 'efua', name: 'Efua', last: 'Sunrise at Cape Coast was unreal 🌅', time: '5h', cat: 'connection', tag: 'Heritage walks', tone: 'cool', vetted: true },
  { id: 'maya', name: 'Maya', last: 'Osu rooftop again tonight?', time: '1d', cat: 'connection', tag: 'City & sundowns', tone: 'night', vetted: false },
  { id: 'akosua', name: 'Akosua', last: 'Your indigo tote is ready to ship.', time: '2d', cat: 'connection', tag: 'Adinkra & craft', tone: 'heritage', vetted: true },
];

/** 24/7 help line. */
export const dispatch = {
  title: 'Dispatch',
  subtitle: '24/7 help line · tap if anything goes wrong',
  cta: 'Get help',
};

export function getThreads() {
  return query(() => threads);
}
