import type { TribeArchetypeId } from './types';

export type Vibe = 'coast' | 'city' | 'nature' | 'heritage';
export type Pace = 'slow' | 'balanced' | 'full';

export interface Chapter {
  id: string;
  order: number;
  title: string;
  subtitle: string;
}

export interface Companion {
  id: string;
  name: string;
  initial: string;
  note?: string;
  isMe?: boolean;
}

export interface JoinRequest {
  id: string;
  name: string;
  initial: string;
  note: string;
}

export interface DateOption {
  id: string;
  range: string;
  votes: number;
}

export interface SharedFavorite {
  id: string;
  title: string;
  mustDo: number;
  interested: number;
  optional?: boolean;
}

export const vibeOptions: { id: Vibe; label: string }[] = [
  { id: 'coast', label: 'Coast' },
  { id: 'city', label: 'City' },
  { id: 'nature', label: 'Nature' },
  { id: 'heritage', label: 'Heritage' },
];

export const paceOptions: { id: Pace; label: string }[] = [
  { id: 'slow', label: 'Slow' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'full', label: 'Full' },
];

export const seedChapters: Chapter[] = [
  { id: 'ch1', order: 1, title: 'Arrive + belong', subtitle: 'A home base and a warm welcome' },
  { id: 'ch2', order: 2, title: 'Create + discover', subtitle: 'A studio visit and a shared meal' },
  { id: 'ch3', order: 3, title: 'Explore + recharge', subtitle: 'Coastal time and guided discovery' },
];

export const seedCompanions: Companion[] = [
  { id: 'me', name: 'You', initial: 'M', isMe: true },
  { id: 'james', name: 'James', initial: 'J', note: 'Photography + coast' },
  { id: 'kai', name: 'Kai', initial: 'K', note: 'Slow mornings' },
];

export const seedJoinRequests: JoinRequest[] = [
  { id: 'ama', name: 'Ama', initial: 'A', note: 'Makers / likes textiles + food' },
];

export const seedDateOptions: DateOption[] = [
  { id: 'd1', range: 'Feb 14 – 21', votes: 2 },
  { id: 'd2', range: 'Mar 7 – 14', votes: 1 },
];

export const seedFavorites: SharedFavorite[] = [
  { id: 'f1', title: 'Studio visit + shared lunch', mustDo: 3, interested: 1 },
  { id: 'f2', title: 'Morning hike', mustDo: 2, interested: 2, optional: true },
];

/** A storybook title suggested from the member's tribe, for a personal touch. */
export function storybookTitleForTribe(tribeId: TribeArchetypeId | undefined): string {
  switch (tribeId) {
    case 'griot':
      return 'Our Ghana chapter';
    case 'maker':
      return 'A week of craft + connection';
    case 'nourisher':
      return 'A slow week in Ghana';
    case 'connector':
      return 'Our people, our Ghana';
    case 'seeker':
    default:
      return 'A week of coast, craft, and connection';
  }
}

// ---------------- Booking + arrival (Phase 3) ----------------

export type BookingItemStatus = 'review' | 'pending' | 'confirmed';

export interface BookingItem {
  id: string;
  title: string;
  detail: string;
  status: BookingItemStatus;
  hostId?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface TodayItem {
  id: string;
  time: string;
  title: string;
  detail?: string;
  hostId?: string;
}

export const countdownDays = 21;

export const priceSummary = {
  total: 'GHS 9,480',
  dueNow: 'GHS 2,370',
  note: 'Who pays · inclusions · cancellation. Fuel is guest responsibility.',
};

export const seedBookingItems: BookingItem[] = [
  { id: 'rooms', title: 'Rooms + meals', detail: 'Availability checked', status: 'review' },
  {
    id: 'car',
    title: 'Car + driver',
    detail: '2-day minimum · selected service days',
    status: 'review',
    hostId: 'host-kojo',
  },
  {
    id: 'studio',
    title: 'Studio experience',
    detail: 'Awaiting partner confirmation',
    status: 'review',
    hostId: 'host-abena',
  },
];

/** After submitting: rooms + car confirm immediately; the studio sits pending. */
export const submittedBookingItems: BookingItem[] = [
  { id: 'rooms', title: 'Rooms + meals', detail: 'Receipt and arrival details saved', status: 'confirmed' },
  {
    id: 'car',
    title: 'Car + driver',
    detail: 'Your assigned person appears here',
    status: 'confirmed',
    hostId: 'host-kojo',
  },
  {
    id: 'studio',
    title: 'Studio experience',
    detail: 'We will notify you when the partner confirms',
    status: 'pending',
    hostId: 'host-abena',
  },
];

export const seedChecklist: ChecklistItem[] = [
  { id: 'c1', label: 'Add arrival details', done: false },
  { id: 'c2', label: 'Share meal preferences', done: false },
  { id: 'c3', label: 'Meet your concierge', done: false },
  { id: 'c4', label: 'Review outstanding requests', done: false },
];

export const seedToday: TodayItem[] = [
  {
    id: 't1',
    time: '10:00',
    title: 'Studio visit',
    detail: 'Meet Abena · craft + cultural stories',
    hostId: 'host-abena',
  },
  { id: 't2', time: '14:00', title: 'Shared lunch' },
  { id: 't3', time: '17:00', title: 'Free time' },
];
