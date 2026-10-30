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
