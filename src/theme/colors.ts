/**
 * Tribe Connect color system — logo-faithful.
 * Brand: Red #DB1F26 · Green #008041 · Black #000000 · Cream #F2E8CE
 *
 * Direction: high-contrast black + cream, with green as the primary action
 * color and red as a co-accent (identity moments, highlights, the arc motif).
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
} as const;

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceSoft: string;
  surfaceInverse: string; // black hero blocks
  primary: string;
  primaryContent: string;
  secondary: string; // positive / confirm (green)
  accent: string; // red co-accent
  accentContent: string;
  text: string;
  textMuted: string;
  textInverse: string; // text on black heroes
  border: string;
  borderInverse: string;
  tabBg: string;
  tabActive: string;
  tabInactive: string;
  success: string;
  warning: string;
};

export const lightColors: ThemeColors = {
  background: palette.paper,
  surface: palette.creamCard,
  surfaceSoft: palette.creamSoft,
  surfaceInverse: palette.charcoal,
  primary: palette.green,
  primaryContent: palette.cream,
  secondary: palette.green,
  accent: palette.red,
  accentContent: palette.cream,
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
};

export const darkColors: ThemeColors = {
  background: palette.charcoal,
  surface: '#1E1B16',
  surfaceSoft: '#241F18',
  surfaceInverse: '#0C0B09',
  primary: '#1E9E5E',
  primaryContent: '#07130D',
  secondary: '#2FA368',
  accent: '#F0564B',
  accentContent: '#140B0A',
  text: palette.cream,
  textMuted: '#A99F82',
  textInverse: palette.cream,
  border: '#2E2A22',
  borderInverse: '#3A352B',
  tabBg: '#0C0B09',
  tabActive: palette.cream,
  tabInactive: '#6E664F',
  success: '#2FA368',
  warning: '#E0B64A',
};
