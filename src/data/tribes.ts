import { query } from './client';
import { categoriesForSelection, labelForCategory } from './interests';
import type {
  InterestCategoryId,
  TribeArchetype,
  TribeArchetypeId,
  TribeReveal,
} from './types';

export const tribeArchetypes: TribeArchetype[] = [
  {
    id: 'seeker',
    name: 'The Seeker',
    tagline: 'Curiosity leads the way.',
    blurb:
      'You came to discover. Trails, coastlines, and the places a map does not show — you want Ghana first-hand and unscripted.',
    icon: 'compass-outline',
    affinities: ['adventure', 'nature', 'tradition'],
  },
  {
    id: 'griot',
    name: 'The Griot',
    tagline: 'Every place has a story.',
    blurb:
      'You travel for meaning — heritage, rhythm, and the people who carry the culture. You want the story behind what you see.',
    icon: 'book-outline',
    affinities: ['tradition', 'music', 'community'],
  },
  {
    id: 'maker',
    name: 'The Maker',
    tagline: 'Drawn to how things are made.',
    blurb:
      'Studios, craft, and the creative economy pull you in. You connect through the work and the hands behind it.',
    icon: 'color-palette-outline',
    affinities: ['art', 'enterprise', 'music'],
  },
  {
    id: 'nourisher',
    name: 'The Nourisher',
    tagline: 'A slower, fuller kind of trip.',
    blurb:
      'Food, rest, and care set your pace. You want shared tables, good company, and time that feels restorative.',
    icon: 'leaf-outline',
    affinities: ['food', 'wellbeing', 'nature'],
  },
  {
    id: 'connector',
    name: 'The Connector',
    tagline: 'Here for the people.',
    blurb:
      'You find your people fast. Community, networking, and building something that lasts beyond the trip is the point.',
    icon: 'people-outline',
    affinities: ['community', 'enterprise', 'music'],
  },
];

const archetypeById = new Map(tribeArchetypes.map((a) => [a.id, a]));

/**
 * Deterministic interest -> tribe rule.
 * Each selected category scores its affinity archetypes; the highest total
 * wins. Ties break on the fixed archetype order above, so the reveal is
 * stable and explainable ("suggested because you chose …").
 */
export function computeTribe(subInterestIds: string[]): TribeReveal {
  const categories = categoriesForSelection(subInterestIds);
  const scores = new Map<TribeArchetypeId, number>();

  for (const archetype of tribeArchetypes) {
    let score = 0;
    archetype.affinities.forEach((cat, index) => {
      if (categories.includes(cat)) {
        // Earlier affinities weigh a little more.
        score += 3 - index * 0.5;
      }
    });
    scores.set(archetype.id, score);
  }

  let winner = tribeArchetypes[0];
  let best = -1;
  for (const archetype of tribeArchetypes) {
    const s = scores.get(archetype.id) ?? 0;
    if (s > best) {
      best = s;
      winner = archetype;
    }
  }

  const reasons = winner.affinities
    .filter((cat) => categories.includes(cat))
    .map((cat) => labelForCategory(cat));

  // If nothing matched the winner's affinities, fall back to the member's
  // own top categories so the explanation is never empty.
  const reasonLabels =
    reasons.length > 0
      ? reasons
      : categories.slice(0, 2).map((cat: InterestCategoryId) => labelForCategory(cat));

  return { archetype: winner, reasons: reasonLabels };
}

export function revealTribe(subInterestIds: string[]) {
  return query(() => computeTribe(subInterestIds));
}

export function getArchetype(id: TribeArchetypeId) {
  return archetypeById.get(id) ?? null;
}
