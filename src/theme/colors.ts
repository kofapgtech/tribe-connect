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
  red: '#DB1F26',
  green: '#008041',
  black: '#000000',
  cream: '#F2E8CE',

  redDeep: '#B3191F',
  greenDeep: '#00693A',
  ink: '#1A1712',
  charcoal: '#141210',
  paper: '#F4EACE',
  creamCard: '#FBF4DF',
  creamSoft: '#ECDFBA',
  border: '#D8C79B',
  mutedText: '#6E664F',
  white: '#FFFFFF',

  // The house color — brand red, reserved for the logo arc / brand moments.
  house: '#F0434A',
  houseContent: '#F2E8CE',
} as const;

export type ThemeColors = {
  background: string;
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
  background: '#0C0A07',
  surface: '#16120C',
  surfaceSoft: '#1E1811',
  surfaceInverse: '#0A0806',
  primary: '#1FA85F',
  primaryContent: '#06130B',
  secondary: '#1FA85F',
  accent: '#E0A43B',
  accentContent: '#1B1403',
  text: '#F2E8CE',
  textMuted: '#A49A84',
  textInverse: '#F2E8CE',
  border: '#2A2318',
  borderInverse: '#3A3123',
  tabBg: '#0A0806',
  tabActive: '#F2E8CE',
  tabInactive: '#766C58',
  success: '#1FA85F',
  warning: '#E0B64A',
  house: '#F0434A',
  houseContent: '#F2E8CE',
};
