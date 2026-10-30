/**
 * Tribe accent — the one variable color in the system.
 *
 * `accent` is set from the member's revealed tribe. This file is the single
 * source of truth for that mapping; update it here if tribe colors change.
 *
 * Two layers:
 *   1. `designSystemAccents` — the canonical 8-tribe accent palette from the
 *      design system (accent fill + a readable on-accent text color).
 *   2. `tribeAccentById` — maps the app's *real* tribe ids (see
 *      src/data/tribes.ts: seeker / griot / maker / nourisher / connector)
 *      onto that palette, by closest thematic fit.
 *
 * NOTE: the design system names 8 tribes (Seekers, Builders, Makers,
 * Revelers, Keepers, Connectors, Restorers, Stewards) but the app currently
 * defines only 5. The three unused entries (builders, revelers, stewards)
 * are kept here for when those tribes land.
 */
import type { TribeArchetypeId } from '@/data/types';

export type AccentPair = {
  /** accent fill color */
  accent: string;
  /** readable text/icon color when placed ON the accent fill */
  accentContent: string;
};

/** The design system's canonical 8-tribe accent palette. */
export const designSystemAccents = {
  seekers: { accent: '#E0A43B', accentContent: '#1B1403' },
  builders: { accent: '#B07426', accentContent: '#1B1403' },
  makers: { accent: '#BF5A33', accentContent: '#22100A' },
  revelers: { accent: '#E07856', accentContent: '#2A0F06' },
  keepers: { accent: '#7E4A6E', accentContent: '#FBEEF7' },
  connectors: { accent: '#8C72AE', accentContent: '#140B22' },
  restorers: { accent: '#2E8F6A', accentContent: '#EEFAF2' },
  stewards: { accent: '#6E8B57', accentContent: '#0C1407' },
} as const satisfies Record<string, AccentPair>;

/** Default accent before a tribe is revealed (Seekers gold). */
export const defaultAccent: AccentPair = designSystemAccents.seekers;

/** App tribe id -> design-system accent (closest thematic match). */
export const tribeAccentById: Record<TribeArchetypeId, AccentPair> = {
  seeker: designSystemAccents.seekers, // curiosity / discovery
  griot: designSystemAccents.keepers, // keeper of heritage + story
  maker: designSystemAccents.makers, // craft / creative economy
  nourisher: designSystemAccents.restorers, // food / rest / restorative
  connector: designSystemAccents.connectors, // community / networks
};

/** Resolve the accent for a (possibly null) revealed tribe id. */
export function accentForTribe(id: TribeArchetypeId | null | undefined): AccentPair {
  if (!id) return defaultAccent;
  return tribeAccentById[id] ?? defaultAccent;
}
