import { useColorScheme } from 'react-native';
import { darkColors, lightColors, palette, type ThemeColors } from './colors';
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

export function useTheme(): Theme {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return {
    colors: isDark ? darkColors : lightColors,
    spacing,
    radius,
    layout,
    fonts,
    isDark,
  };
}

export { palette, spacing, radius, layout, fonts, textVariants };
export type { ThemeColors, TextVariant };
