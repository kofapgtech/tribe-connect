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
  | 'enterprise';

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
}

/** A short note from the concierge, tappable to message them. */
export interface NoteMoment {
  type: 'note';
  id: string;
  title: string;
  text: string;
}

export type Moment = MediaMoment | GatheringMoment | NoteMoment;
