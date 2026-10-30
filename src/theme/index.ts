import { useRevealedTribeId } from '@/state/onboarding';
import { darkColors, lightColors, palette, type ThemeColors } from './colors';
import { accentForTribe } from './tribeAccent';
import { fonts, textVariants, type TextVariant } from './typography';
import { layout, radius, spacing } from './spacing';

export type Theme = {
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  layout: typeof layout;
  fonts: typeof fonts;
  isDark: boolean;
};

/**
 * The app is locked to the dark "ink" palette — the OS color scheme is
 * intentionally ignored (isDark is always true). The only variable color is
 * `accent`, which resolves to the member's revealed tribe (or the Seekers
 * default before reveal).
 */
export function useTheme(): Theme {
  const tribeId = useRevealedTribeId();
  const { accent, accentContent } = accentForTribe(tribeId);
  return {
    colors: { ...darkColors, accent, accentContent },
    spacing,
    radius,
    layout,
    fonts,
    isDark: true,
  };
}

export { palette, lightColors, darkColors, spacing, radius, layout, fonts, textVariants };
export { accentForTribe, designSystemAccents, tribeAccentById } from './tribeAccent';
export type { ThemeColors, TextVariant };
