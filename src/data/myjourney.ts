import { query } from './client';
import type {
  ExploreCategory,
  ExplorePick,
  ItineraryDay,
  NavDay,
  Service,
} from './types';

/** Concierge services, surfaced on the Journey view and from "Add-on services". */
export const services: Service[] = [
  {
    id: 'transport',
    name: 'Transport',
    tone: 'forest',
    icon: 'car-outline',
    desc: "A private car with a Navigator who stays with you. No Navigator yet? Book one and we'll assign them for the rest of your stay.",
    action: 'Book a car',
    hot: true,
    hint: "Don't have a Navigator? This is where you get one.",
  },
  {
    id: 'meals',
    name: 'Meals & orders',
    tone: 'clay',
    icon: 'restaurant-outline',
    desc: 'Restaurant tables, a private chef, or food brought to you.',
    action: 'Order',
  },
  {
    id: 'wellness',
    name: 'Wellness',
    tone: 'gold',
    icon: 'sparkles-outline',
    desc: 'Spa, massage and recovery, arranged around your days.',
    action: 'Book',
  },
];

/** Explore filter lenses. */
export const exploreCategories: ExploreCategory[] = [
  { id: 'all', label: 'Explore' },
  { id: 'experience', label: 'Experiences' },
  { id: 'activity', label: 'Activities' },
  { id: 'space', label: 'Spaces' },
  { id: 'event', label: 'Events' },
  { id: 'service', label: 'Services' },
];

/** "Chosen for your tribe" picks + Excursions. */
export const explorePicks: ExplorePick[] = [
  { id: 'nzulezu', title: 'Nzulezu stilt village', meta: 'Full-day · ★ 4.98', tone: 'forest', kind: 'experience', availability: 'Concierge confirms', bookable: 'confirm', section: 'picks' },
  { id: 'jamestown-photo', title: 'Jamestown photo walk', meta: '2 hrs · in-city', tone: 'clay', kind: 'experience', availability: 'Book any time', bookable: 'anytime', section: 'picks' },
  { id: 'osu-sundown', title: 'Osu rooftop sundown', meta: '2 hrs · evening', tone: 'night', kind: 'activity', availability: 'Book any time', bookable: 'anytime', section: 'picks' },
  { id: 'cape-kakum', title: 'Cape Coast & Kakum', meta: 'Full-day · ★ 4.97', tone: 'forest', kind: 'experience', availability: 'Concierge confirms', bookable: 'confirm', section: 'excursions' },
  { id: 'volta-sail', title: 'Volta estuary sail', meta: 'Half-day · ★ 4.95', tone: 'cool', kind: 'experience', availability: 'Concierge confirms', bookable: 'confirm', section: 'excursions' },
  { id: 'aburi-hills', title: 'Aburi hills & gardens', meta: 'Half-day · in the hills', tone: 'heritage', kind: 'activity', availability: 'Book any time', bookable: 'anytime', section: 'excursions' },
];

export const liveMapCopy = 'Your live map — you & your Navigator — appears here the moment you land in Ghana.';

/** The week strip above the itinerary. */
export const navWeek: NavDay[] = [
  { wd: 'S', dn: 15, state: 'past' },
  { wd: 'M', dn: 16, state: 'past' },
  { wd: 'T', dn: 17, state: 'past' },
  { wd: 'W', dn: 18, state: 'today' },
  { wd: 'T', dn: 19, state: 'future' },
  { wd: 'F', dn: 20, state: 'future' },
  { wd: 'S', dn: 21, state: 'past' },
];

/** The day-by-day itinerary. */
export const itineraryDays: ItineraryDay[] = [
  {
    rel: 'Today',
    date: 'Wed · 18 Mar',
    items: [
      { time: '07:00', title: 'Sunrise jog along Labadi', detail: 'A quiet run on the sand before the city wakes — just you.', status: 'conf', kind: 'activity', audience: 'you', addLabel: 'Add a guide' },
      { time: '08:30', title: 'Jamestown heritage walk', detail: 'Lighthouse, fishing harbour and the old colonial quarter, on foot with a local griot.', status: 'conf', kind: 'experience', audience: 'crew', addLabel: 'Add-on services' },
      { time: '13:00', title: 'Lunch at Buka, Osu', detail: 'Jollof, grilled tilapia and kelewele. Table held under your name.', status: 'conf', kind: 'activity', audience: 'crew' },
      { time: '15:30', title: 'Kente weaving at the loom', detail: 'A two-hour sit with a master weaver near Teshie. Your strip is yours to keep.', status: 'await', kind: 'experience', audience: 'crew', addLabel: 'Add-on services' },
      { time: '18:30', title: 'In-suite massage', detail: 'An hour of deep-tissue in your room with Akosua, after the day on foot.', status: 'conf', kind: 'service', audience: 'you' },
    ],
  },
  {
    rel: 'Tomorrow',
    date: 'Thu · 19 Mar',
    items: [
      { time: '07:00', title: 'Drive to Cape Coast', detail: 'Early start with Kwame, your Navigator.', status: 'conf', kind: 'service', audience: 'crew' },
      { time: '10:30', title: 'Cape Coast Castle', detail: 'Guided tour of the castle and the Door of No Return.', status: 'conf', kind: 'experience', audience: 'crew', addLabel: 'Add-on services' },
      { time: '14:00', title: 'Kakum canopy walkway', detail: 'The seven rope bridges above the rainforest canopy.', status: 'await', kind: 'activity', audience: 'crew' },
      { time: '16:30', title: 'Solo sunset sail, Volta estuary', detail: 'A small boat out at golden hour — a moment to yourself.', status: 'await', kind: 'experience', audience: 'you', addLabel: 'Add a guide' },
    ],
  },
  {
    rel: 'Fri',
    date: 'Fri · 20 Mar',
    items: [
      { time: '09:00', title: 'Aburi botanical gardens', detail: 'Cool-air morning in the hills above Accra.', status: 'conf', kind: 'activity', audience: 'crew' },
      { time: '11:00', title: 'Barber — fresh line-up', detail: 'A clean cut before the farewell dinner, in your suite.', status: 'conf', kind: 'service', audience: 'you' },
      { time: '13:30', title: 'Open afternoon', detail: 'Nothing booked. Tap Add to fill it, or keep it free.', status: 'await', kind: 'empty', audience: 'you' },
    ],
  },
];

export function getServices() {
  return query(() => services);
}
export function getExplorePicks() {
  return query(() => explorePicks);
}
export function getItinerary() {
  return query(() => itineraryDays);
}
