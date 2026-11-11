import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useTheme } from '@/theme';

/**
 * The app-wide ground. Replaces the flat black panel behind every view with a
 * deep "stage" base, tinted by the member's active tribe accent (the one
 * variable color in the system). Mounted once at the root behind the
 * navigator; every screen renders transparently on top of it, so the ground
 * stays put while views cross-fade.
 *
 * Two layers so the gradient reads on dense screens, not just open ones:
 *   1. a continuous warm wash down the full height — keeps mid/lower screen
 *      areas from falling back to flat black behind content (e.g. the
 *      interests grid), and
 *   2. a brighter branded radial glow anchored at the top — the focal warmth.
 */
export function AppBackground() {
  const { colors } = useTheme();
  const a = colors.accent;
  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: colors.stage }]}
      pointerEvents="none"
    >
      <Svg width="100%" height="100%">
        <Defs>
          {/* full-height wash — no screen falls back to flat black */}
          <LinearGradient id="tribeWash" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={a} stopOpacity={0.1} />
            <Stop offset="0.5" stopColor={a} stopOpacity={0.045} />
            <Stop offset="1" stopColor={a} stopOpacity={0.02} />
          </LinearGradient>
          {/* branded radial glow anchored at the top */}
          <RadialGradient
            id="tribeGlow"
            cx="0.5"
            cy="-0.05"
            rx="1.25"
            ry="0.82"
            fx="0.5"
            fy="-0.05"
            gradientUnits="objectBoundingBox"
          >
            <Stop offset="0" stopColor={a} stopOpacity={0.22} />
            <Stop offset="0.4" stopColor={a} stopOpacity={0.09} />
            <Stop offset="0.68" stopColor={a} stopOpacity={0} />
            <Stop offset="1" stopColor={a} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#tribeWash)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#tribeGlow)" />
      </Svg>
    </View>
  );
}
