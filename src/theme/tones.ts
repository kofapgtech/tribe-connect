import type { Tone } from '@/data/types';
import type { ThemeColors } from './colors';
import { palette } from './colors';

/**
 * Maps a placeholder "tone" to a two-stop gradient built from design tokens
 * only (no new colors). Used for media blocks, picks, lead and group avatars.
 */
export function toneColors(tone: Tone, c: ThemeColors): [string, string] {
  switch (tone) {
    case 'gold':
      return [c.accent, palette.ochre];
    case 'warm':
      return [palette.ochre, c.surfaceInverse];
    case 'forest':
      return [c.primary, c.surfaceInverse];
    case 'clay':
      return [palette.ochre, c.surfaceInverse];
    case 'night':
      return [c.surfaceSoft, c.surfaceInverse];
    case 'plum':
      return [c.accent, c.surfaceInverse];
    case 'heritage':
      return [palette.ochre, c.accent];
    case 'cool':
    default:
      return [c.accent, c.surfaceInverse];
  }
}
