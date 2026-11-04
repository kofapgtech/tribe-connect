/** Core domain models. Field shapes mirror the planned Supabase schema. */

export type InterestCategoryId =
  | 'tradition'
  | 'music'
  | 'adventure'
  | 'food'
  | 'art'
  | 'wellbeing'
  | 'community'
  | 'nature'
  | 'enterprise'
  | 'reflection';

export type TribeArchetypeId =
  | 'seeker'
  | 'griot'
  | 'maker'
  | 'nourisher'
  | 'connector';

export interface SubInterest {
  id: string;
  categoryId: InterestCategoryId;
  label: string;
}

export interface InterestCategory {
  id: InterestCategoryId;
  label: string;
  icon: string; // Ionicons name (placeholder for future Adinkra symbols)
  blurb: string;
  subInterests: SubInterest[];
}

export interface TribeArchetype {
  id: TribeArchetypeId;
  name: string; // e.g. "The Seeker"
  tagline: string; // e.g. "Curiosity leads the way."
  blurb: string;
  icon: string;
  /** Categories that pull a member toward this archetype. */
  affinities: InterestCategoryId[];
}

export interface TribeReveal {
  archetype: TribeArchetype;
  /** Category labels that drove the match, for the "suggested because…" line. */
  reasons: string[];
}

export interface Host {
  id: string;
  name: string;
  role: string; // "studio host", "driver + guide"
  bio: string;
  interests: InterestCategoryId[];
  verified: boolean;
  rating: number;
  reviewCount: number;
}

export type BookingStatus = 'pending' | 'confirmed';

export interface Experience {
  id: string;
  title: string;
  summary: string;
  location: string;
  priceLabel: string;
  hostId: string;
  categoryId: InterestCategoryId;
}

// ---------------- TribeConnect feed (moments) ----------------

/** Where a moment's action button sends the member (a main-app tab). */
export type MomentActionDest = 'MyJourney' | 'Exchange' | 'MyTribe';

export interface MomentAction {
  label: string; // "Add to your Journey" | "Buy" | "Book"
  dest: MomentActionDest;
}

/** A maker/member post with media, a caption, an optional price + action. */
export interface MediaMoment {
  type: 'media';
  id: string;
  hostId: string; // the maker/member behind the post
  tone: 'gold' | 'warm' | 'cool'; // placeholder-gradient tone (token-based)
  mediaCaption: string; // caption on the media itself
  caption: string; // the post caption / "read more" body
  price?: string;
  action?: MomentAction; // the primary action (absent for a plain traveler post)
  mine?: boolean; // true = shown under "My tribe"; false = Everyone-only
}

/** An event the member can join. */
export interface GatheringMoment {
  type: 'gathering';
  id: string;
  day: string; // "Fri"
  place: string; // "Osu"
  title: string;
  going: number;
  attendees: string[]; // initials for the avatar row
  action: MomentAction; // dest: MyTribe (or Exchange for the market)
  mine?: boolean;
}

/** A short note from the concierge, tappable to message them. */
export interface NoteMoment {
  type: 'note';
  id: string;
  title: string;
  text: string;
  mine?: boolean;
}

export type Moment = MediaMoment | GatheringMoment | NoteMoment;

/** Placeholder-gradient tone, mapped to token colors in theme/tones.ts. */
export type Tone = 'gold' | 'warm' | 'cool' | 'forest' | 'clay' | 'night' | 'plum' | 'heritage';

/** The pinned Lead card at the top of the TribeConnect feed. */
export interface PinnedLead {
  hostId: string;
  headline: string;
  body: string;
  cta: string;
  tone: Tone;
}

// ---------------- MyJourney ----------------

export type ServiceId = 'transport' | 'meals' | 'wellness';
export interface Service {
  id: ServiceId;
  name: string;
  tone: Tone;
  icon: string; // Ionicons name
  desc: string;
  action: string;
  hot?: boolean;
  hint?: string;
}

export type ExploreKind = 'experience' | 'activity' | 'space' | 'event' | 'service';
export interface ExploreCategory {
  id: 'all' | ExploreKind;
  label: string;
}
export interface ExplorePick {
  id: string;
  title: string;
  meta: string; // "Full-day · ★ 4.98"
  tone: Tone;
  kind: ExploreKind;
  availability: string; // "Concierge confirms" | "Book any time"
  bookable: 'confirm' | 'anytime';
  section: 'picks' | 'excursions';
}

export type ItineraryStatus = 'conf' | 'await';
export interface ItineraryItem {
  time: string;
  title: string;
  detail: string;
  status: ItineraryStatus;
  kind: string;
  audience: 'you' | 'crew';
  addLabel?: string; // "Add a guide" | "Add-on services"
}
export interface ItineraryDay {
  rel: string; // "Today"
  date: string; // "Wed · 18 Mar"
  items: ItineraryItem[];
}
export interface NavDay {
  wd: string; // "W"
  dn: number; // 18
  state: 'past' | 'today' | 'future';
}

// ---------------- MyTribe ----------------

export type ThreadCat = 'navigator' | 'concierge' | 'group' | 'connection';
export interface Thread {
  id: string;
  name: string;
  last: string;
  time: string;
  cat: ThreadCat;
  tag: string; // "Navigator" | "5 people" | "Kente & craft"
  tone: Tone;
  vetted?: boolean;
  unread?: number;
  crew?: boolean;
  pinned?: boolean;
}
export interface TribeFilter {
  id: 'all' | ThreadCat;
  label: string;
}

/** A single message in a thread's mock conversation. */
export interface ChatMessage {
  from: 'them' | 'me' | 'sys';
  text: string;
}
