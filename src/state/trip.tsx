import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  seedBookingItems,
  seedChapters,
  seedChecklist,
  seedCompanions,
  seedDateOptions,
  seedFavorites,
  seedJoinRequests,
  submittedBookingItems,
  type BookingItem,
  type Chapter,
  type ChecklistItem,
  type Companion,
  type DateOption,
  type JoinRequest,
  type Pace,
  type SharedFavorite,
  type Vibe,
} from '@/data/trip';

type TripState = {
  // Ideal journey
  vibe: Vibe[];
  toggleVibe: (v: Vibe) => void;
  pace: Pace;
  setPace: (p: Pace) => void;
  // Storybook
  chapters: Chapter[];
  // Group
  companions: Companion[];
  joinRequests: JoinRequest[];
  acceptRequest: (id: string) => void;
  declineRequest: (id: string) => void;
  // Voting
  dateOptions: DateOption[];
  myVote: string | null;
  voteDate: (id: string) => void;
  favorites: SharedFavorite[];
  // Plan lifecycle
  hasPlan: boolean;
  createPlan: () => void;
  // Booking lifecycle
  bookingItems: BookingItem[];
  hasBooking: boolean;
  submitBookings: () => void;
  confirmPending: () => void;
  pendingCount: number;
  // Arrival
  checklist: ChecklistItem[];
  toggleChecklist: (id: string) => void;
  reset: () => void;
};

const Ctx = createContext<TripState | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [vibe, setVibe] = useState<Vibe[]>(['coast', 'heritage']);
  const [pace, setPace] = useState<Pace>('balanced');
  const [companions, setCompanions] = useState<Companion[]>(seedCompanions);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(seedJoinRequests);
  const [dateOptions, setDateOptions] = useState<DateOption[]>(seedDateOptions);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [hasPlan, setHasPlan] = useState(false);
  const [bookingItems, setBookingItems] = useState<BookingItem[]>(seedBookingItems);
  const [hasBooking, setHasBooking] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(seedChecklist);

  const value = useMemo<TripState>(() => {
    const pendingCount = bookingItems.filter((b) => b.status === 'pending').length;
    return {
      vibe,
      toggleVibe: (v) =>
        setVibe((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])),
      pace,
      setPace,
      chapters: seedChapters,
      companions,
      joinRequests,
      acceptRequest: (id) =>
        setJoinRequests((reqs) => {
          const req = reqs.find((r) => r.id === id);
          if (req) {
            setCompanions((c) =>
              c.some((x) => x.id === req.id)
                ? c
                : [...c, { id: req.id, name: req.name, initial: req.initial, note: req.note }],
            );
          }
          return reqs.filter((r) => r.id !== id);
        }),
      declineRequest: (id) => setJoinRequests((reqs) => reqs.filter((r) => r.id !== id)),
      dateOptions,
      myVote,
      voteDate: (id) => {
        setDateOptions((opts) =>
          opts.map((o) => {
            if (o.id === id && myVote !== id) return { ...o, votes: o.votes + 1 };
            if (o.id === myVote && myVote !== id) return { ...o, votes: Math.max(0, o.votes - 1) };
            return o;
          }),
        );
        setMyVote(id);
      },
      favorites: seedFavorites,
      hasPlan,
      createPlan: () => setHasPlan(true),
      bookingItems,
      hasBooking,
      submitBookings: () => {
        setBookingItems(submittedBookingItems);
        setHasBooking(true);
      },
      confirmPending: () =>
        setBookingItems((items) =>
          items.map((b) => (b.status === 'pending' ? { ...b, status: 'confirmed' } : b)),
        ),
      pendingCount,
      checklist,
      toggleChecklist: (id) =>
        setChecklist((cs) => cs.map((c) => (c.id === id ? { ...c, done: !c.done } : c))),
      reset: () => {
        setVibe(['coast', 'heritage']);
        setPace('balanced');
        setCompanions(seedCompanions);
        setJoinRequests(seedJoinRequests);
        setDateOptions(seedDateOptions);
        setMyVote(null);
        setHasPlan(false);
        setBookingItems(seedBookingItems);
        setHasBooking(false);
        setChecklist(seedChecklist);
      },
    };
  }, [vibe, pace, companions, joinRequests, dateOptions, myVote, hasPlan, bookingItems, hasBooking, checklist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTrip(): TripState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTrip must be used within TripProvider');
  return ctx;
}
