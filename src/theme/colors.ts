/**
 * Tribe Connect color system — dark "ink" design system.
 *
 * Ground is ink: the app is dark everywhere (see theme/index.ts — the OS
 * color scheme is ignored and the dark palette is always returned).
 *
 * Color roles:
 *   Green  — action / confirmed, fixed on every screen.
 *   Red    — "the house": logo arc and rare brand moments only (the `house`
 *            token), never a generic accent.
 *   Accent — the one variable color, set from the member's revealed tribe
 *            (see theme/tribeAccent.ts). Defaults to the Seekers gold.
 *
 * Screens read semantic tokens only — never raw hex.
 */

export const palette = {
  // Master palette — base colors (dark "ink" design system).
  green: '#22B26A', // action (also the logo-arc green)
  greenBright: '#34C878', // the confirm pop only
  gold: '#E7AC45', // accent (default tribe)
  ochre: '#C2862F', // accent-2, for gradients / depth
  black: '#000000',
  white: '#FFFFFF',

  // The house color — brand red, reserved for the logo arc / brand moments.
  house: '#FF4A50',
  houseContent: '#F4EEE1',

  // Legacy cream-theme values — referenced only by the (unused) light palette.
  red: '#DB1F26',
  cream: '#F2E8CE',
  greenDeep: '#00693A',
  ink: '#1A1712',
  charcoal: '#141210',
  paper: '#F4EACE',
  creamCard: '#FBF4DF',
  creamSoft: '#ECDFBA',
  border: '#D8C79B',
  mutedText: '#6E664F',
} as const;

export type ThemeColors = {
  background: string;
  stage: string; // deepest ground — the app-wide gradient base behind every view
  surface: string;
  surfaceSoft: string;
  surfaceInverse: string; // deepest panels / immersive hero blocks
  primary: string;
  primaryContent: string;
  secondary: string; // positive / confirm (green)
  accent: string; // tribe color (dynamic — resolved in useTheme)
  accentContent: string; // readable text on the accent fill
  text: string;
  textMuted: string;
  textInverse: string; // text on immersive hero blocks
  border: string;
  borderInverse: string;
  tabBg: string;
  tabActive: string;
  tabInactive: string;
  success: string;
  warning: string;
  house: string; // the house red — logo arc / brand only
  houseContent: string; // text on the house fill
};

export const lightColors: ThemeColors = {
  background: palette.paper,
  stage: '#E9DCBB',
  surface: palette.creamCard,
  surfaceSoft: palette.creamSoft,
  surfaceInverse: palette.charcoal,
  primary: palette.green,
  primaryContent: palette.cream,
  secondary: palette.green,
  accent: '#E0A43B',
  accentContent: '#1B1403',
  text: palette.ink,
  textMuted: palette.mutedText,
  textInverse: palette.cream,
  border: palette.border,
  borderInverse: '#2E2A20',
  tabBg: palette.charcoal,
  tabActive: palette.cream,
  tabInactive: '#8A8068',
  success: palette.green,
  warning: '#C9962B',
  house: palette.red,
  houseContent: palette.cream,
};

// Dark "ink" palette — the active palette everywhere. Values are fixed by the
// design system; the `accent` here is the default (Seekers gold) and is
// overridden per revealed tribe in useTheme().
export const darkColors: ThemeColors = {
  background: '#0A0807',
  stage: '#050403', // near-black ground; the warm radial glow is layered over it
  surface: '#221B10',
  surfaceSoft: '#342816',
  surfaceInverse: '#060504',
  primary: '#22B26A',
  primaryContent: '#06130B',
  secondary: '#22B26A',
  accent: '#E7AC45',
  accentContent: '#1B1403',
  text: '#F4EEE1',
  textMuted: '#A79E8C',
  textInverse: '#F4EEE1',
  border: '#4B3B21',
  borderInverse: '#5A4A2B',
  tabBg: '#060504',
  tabActive: '#E7AC45',
  tabInactive: '#6E6655',
  success: '#22B26A',
  warning: '#E7AC45',
  house: '#FF4A50',
  houseContent: '#F4EEE1',
};
