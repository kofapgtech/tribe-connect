import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useTheme } from '@/theme';

/**
 * The app-wide ground. Replaces the flat black panel behind every view with a
 * deep "stage" base and a soft warm radial glow bleeding down from the top,
 * tinted by the member's active tribe accent (the one variable color in the
 * system). Mounted once at the root behind the navigator; every screen renders
 * transparently on top of it, so the glow stays put while views cross-fade.
 *
 * Mirrors the design-system spec:
 *   radial glow at 50% -8%, accent @ ~13% -> transparent by 62%, over `stage`.
 */
export function AppBackground() {
  const { colors } = useTheme();
  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: colors.stage }]}
      pointerEvents="none"
    >
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient
            id="tribeGlow"
            cx="0.5"
            cy="-0.08"
            rx="1.3"
            ry="0.7"
            fx="0.5"
            fy="-0.08"
            gradientUnits="objectBoundingBox"
          >
            <Stop offset="0" stopColor={colors.accent} stopOpacity={0.16} />
            <Stop offset="0.38" stopColor={colors.accent} stopOpacity={0.07} />
            <Stop offset="0.62" stopColor={colors.accent} stopOpacity={0} />
            <Stop offset="1" stopColor={colors.accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#tribeGlow)" />
      </Svg>
    </View>
  );
}
