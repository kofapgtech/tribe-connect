/**
 * Fonts (loaded in app/_layout.tsx):
 *   Display / headlines -> Zen Dots  (brand headline face)
 *   Body / UI           -> Lato      (brand body face)
 * Note: the logo face "Bocures" is proprietary and logo-only — never set
 * UI text in it. The wordmark ships as an image asset.
 */
export const fonts = {
  display: 'ZenDots_400Regular',
  body: 'Lato_400Regular',
  bodyBold: 'Lato_700Bold',
  bodyBlack: 'Lato_900Black',
} as const;

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'title'
  | 'body'
  | 'bodyStrong'
  | 'muted'
  | 'label'
  | 'small';

type VariantStyle = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: 'uppercase' | 'none';
};

export const textVariants: Record<TextVariant, VariantStyle> = {
  display: { fontFamily: fonts.display, fontSize: 28, lineHeight: 36 },
  h1: { fontFamily: fonts.display, fontSize: 22, lineHeight: 30 },
  h2: { fontFamily: fonts.bodyBlack, fontSize: 19, lineHeight: 26 },
  title: { fontFamily: fonts.bodyBold, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24 },
  bodyStrong: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 24 },
  muted: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21 },
  label: {
    fontFamily: fonts.bodyBlack,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  small: { fontFamily: fonts.body, fontSize: 12, lineHeight: 17 },
};
