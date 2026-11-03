import { query } from './client';
import type { ChatMessage, Thread, TribeFilter } from './types';

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

/** Mock conversation per thread (for the chat view). */
export const conversations: Record<string, ChatMessage[]> = {
  group: [
    { from: 'sys', text: 'Crew · 5 people' },
    { from: 'them', text: "Ama: can't wait for Friday dinner!" },
    { from: 'them', text: 'Kwame: I can run everyone there and back 🚗' },
    { from: 'me', text: "Same, counting down. What time are we meeting?" },
  ],
  nav: [
    { from: 'sys', text: 'Kwame is your Navigator for the whole stay.' },
    { from: 'them', text: "6 min away — I'll meet you at the lighthouse gate." },
    { from: 'me', text: 'Perfect, heading down now.' },
  ],
  concierge: [
    { from: 'sys', text: 'Concierge · vetted by Tribe Connect' },
    { from: 'them', text: 'Your Kente workshop is confirmed ✓' },
    { from: 'them', text: 'Anything else you need for tomorrow?' },
  ],
  kwabena: [
    { from: 'them', text: 'Come by the loom whenever you like.' },
    { from: 'me', text: 'Would love to — maybe Thursday afternoon?' },
  ],
  efua: [
    { from: 'them', text: 'Sunrise at Cape Coast was unreal 🌅' },
    { from: 'me', text: 'Adding it to my first morning!' },
  ],
  maya: [{ from: 'them', text: 'Osu rooftop again tonight?' }],
  akosua: [{ from: 'them', text: 'Your indigo tote is ready to ship.' }],
};

export function getThreads() {
  return query(() => threads);
}
